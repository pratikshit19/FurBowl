import { Router } from 'express';
import prisma from '../config/database.js';
import { authenticate } from '../middleware/auth.js';
import { createOrderFromItems, computeAndSyncUserOrderStats } from '../services/orders.js';

const router = Router();

router.get('/stats', authenticate, async (req, res, next) => {
  try {
    const stats = await computeAndSyncUserOrderStats(req.userId);
    res.json({ stats });
  } catch (error) { next(error); }
});

router.post('/', authenticate, async (req, res, next) => {
  try {
    const { items, address, couponCode, paymentMethod } = req.body;
    if (paymentMethod !== 'COD') return res.status(400).json({ error: 'Use the online payment endpoint for card, UPI, and wallet payments.' });
    const order = await createOrderFromItems({ userId: req.userId, items, address, couponCode, paymentMethod });
    res.status(201).json({ orderNumber: order.orderNumber, orderId: order.id, total: Number(order.total) });
  } catch (error) { next(error); }
});

router.get('/', authenticate, async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany({ where: { userId: req.userId }, orderBy: { createdAt: 'desc' }, include: { items: true } });
    res.json({ orders });
  } catch (error) { next(error); }
});

router.get('/:orderNumber', authenticate, async (req, res, next) => {
  try {
    const order = await prisma.order.findFirst({ where: { orderNumber: req.params.orderNumber, userId: req.userId }, include: { items: true } });
    if (!order) return res.status(404).json({ error: 'Order not found.' });
    res.json({ order });
  } catch (error) { next(error); }
});

export default router;
