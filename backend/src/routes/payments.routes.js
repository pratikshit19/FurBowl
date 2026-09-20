import { Router } from 'express';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import prisma from '../config/database.js';
import env from '../config/env.js';
import { authenticate } from '../middleware/auth.js';
import { createOrderFromItems, computeAndSyncUserOrderStats } from '../services/orders.js';

const router = Router();
const paymentGateway = () => new Razorpay({ key_id: env.razorpayKeyId, key_secret: env.razorpayKeySecret });

router.post('/create-razorpay-order', authenticate, async (req, res, next) => {
  try {
    if (!env.razorpayKeyId || !env.razorpayKeySecret) {
      return res.status(503).json({ error: 'Online payments are not configured yet. Please use Cash on Delivery or contact support.' });
    }

    const order = await createOrderFromItems({ ...req.body, userId: req.userId, paymentMethod: 'RAZORPAY' });

    let razorpayOrder;
    try {
      razorpayOrder = await paymentGateway().orders.create({
        amount: Math.round(Number(order.total) * 100),
        currency: 'INR',
        receipt: order.orderNumber,
        notes: { furbowlOrderId: order.id },
      });
    } catch (gatewayErr) {
      // If Razorpay API call fails, mark order as failed and restore reserved stock
      await prisma.$transaction([
        prisma.order.update({ where: { id: order.id }, data: { paymentStatus: 'FAILED' } }),
        ...order.items.map((item) =>
          prisma.productVariant.update({
            where: { id: item.variantId },
            data: { stockQuantity: { increment: item.quantity } },
          })
        ),
      ]).catch(() => {});

      const desc = gatewayErr.error?.description || gatewayErr.message || 'Payment gateway initialization failed';
      return res.status(502).json({ error: desc });
    }

    await prisma.$transaction([
      prisma.order.update({ where: { id: order.id }, data: { razorpayOrderId: razorpayOrder.id } }),
      prisma.payment.create({
        data: {
          orderId: order.id,
          razorpayOrderId: razorpayOrder.id,
          amount: order.total,
          status: 'created',
        },
      }),
    ]);

    res.status(201).json({
      orderId: order.id,
      orderNumber: order.orderNumber,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/verify', authenticate, async (req, res, next) => {
  try {
    const { orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;
    if (!orderId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return res.status(400).json({ error: 'Payment verification details are incomplete.' });
    }

    const order = await prisma.order.findFirst({ where: { id: orderId, userId: req.userId } });
    if (!order || order.razorpayOrderId !== razorpayOrderId) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    const expected = crypto
      .createHmac('sha256', env.razorpayKeySecret)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');

    const expectedBuf = Buffer.from(expected);
    const signatureBuf = Buffer.from(razorpaySignature);

    if (expectedBuf.length !== signatureBuf.length || !crypto.timingSafeEqual(expectedBuf, signatureBuf)) {
      return res.status(400).json({ error: 'Payment signature could not be verified.' });
    }

    await prisma.$transaction([
      prisma.order.update({ where: { id: order.id }, data: { paymentStatus: 'PAID', razorpayPaymentId } }),
      prisma.payment.update({
        where: { orderId: order.id },
        data: { razorpayPaymentId, razorpaySignature, status: 'captured' },
      }),
    ]);

    if (req.userId) {
      computeAndSyncUserOrderStats(req.userId).catch(() => {});
    }

    res.json({ orderNumber: order.orderNumber, message: 'Payment verified successfully.' });
  } catch (error) {
    next(error);
  }
});

// Razorpay Webhook handler
router.post('/webhook', async (req, res, next) => {
  try {
    const webhookSignature = req.headers['x-razorpay-signature'];
    if (!webhookSignature) {
      return res.status(400).json({ error: 'Missing webhook signature' });
    }

    const webhookSecret = env.razorpayWebhookSecret;
    if (!webhookSecret) {
      return res.status(500).json({ error: 'Webhook secret not configured' });
    }

    const bodyPayload = req.rawBody ? req.rawBody.toString('utf8') : JSON.stringify(req.body);
    const expected = crypto.createHmac('sha256', webhookSecret).update(bodyPayload).digest('hex');
    const expectedBuf = Buffer.from(expected);
    const signatureBuf = Buffer.from(webhookSignature);

    if (expectedBuf.length !== signatureBuf.length || !crypto.timingSafeEqual(expectedBuf, signatureBuf)) {
      return res.status(400).json({ error: 'Invalid webhook signature' });
    }

    const { event, payload } = req.body;

    if (event === 'payment.captured' || event === 'order.paid') {
      const paymentEntity = payload?.payment?.entity;
      const razorpayOrderId = paymentEntity?.order_id || payload?.order?.entity?.id;
      const razorpayPaymentId = paymentEntity?.id;

      if (razorpayOrderId) {
        const order = await prisma.order.findFirst({ where: { razorpayOrderId } });
        if (order && order.paymentStatus !== 'PAID') {
          await prisma.$transaction([
            prisma.order.update({
              where: { id: order.id },
              data: {
                paymentStatus: 'PAID',
                razorpayPaymentId: razorpayPaymentId || order.razorpayPaymentId,
              },
            }),
            prisma.payment.updateMany({
              where: { razorpayOrderId },
              data: {
                status: 'captured',
                razorpayPaymentId: razorpayPaymentId || undefined,
                method: paymentEntity?.method || undefined,
              },
            }),
          ]);
        }
      }
    } else if (event === 'payment.failed') {
      const paymentEntity = payload?.payment?.entity;
      const razorpayOrderId = paymentEntity?.order_id;
      if (razorpayOrderId) {
        await prisma.payment.updateMany({
          where: { razorpayOrderId },
          data: { status: 'failed' },
        });
      }
    }

    res.json({ status: 'ok' });
  } catch (error) {
    next(error);
  }
});

export default router;
