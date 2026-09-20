import prisma from '../config/database.js';

const FREE_SHIPPING_THRESHOLD = 499;
const SHIPPING_FEE = 49;

function orderNumber() {
  return `FB${Date.now().toString().slice(-8)}${Math.floor(Math.random() * 900 + 100)}`;
}

export async function createOrderFromItems({ userId, items, address, couponCode, paymentMethod }) {
  if (!Array.isArray(items) || items.length === 0) throw Object.assign(new Error('Your cart is empty.'), { statusCode: 400 });
  if (!address?.fullName || !/^\d{10}$/.test(address.phone || '') || !address.addressLine1 || !address.city || !address.state || !/^\d{6}$/.test(address.pincode || '')) {
    throw Object.assign(new Error('Please provide a complete deliverable address.'), { statusCode: 400 });
  }
  const quantities = new Map();
  for (const item of items) {
    const quantity = Number.parseInt(item.quantity, 10);
    if (!item.variantId || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) throw Object.assign(new Error('One or more cart quantities are invalid.'), { statusCode: 400 });
    quantities.set(item.variantId, (quantities.get(item.variantId) || 0) + quantity);
  }
  const variants = await prisma.productVariant.findMany({
    where: { id: { in: [...quantities.keys()] }, isActive: true, product: { isActive: true } },
    include: { product: { select: { id: true, name: true } } },
  });
  if (variants.length !== quantities.size) throw Object.assign(new Error('A product in your cart is no longer available.'), { statusCode: 409 });
  if (variants.some((variant) => variant.stockQuantity < quantities.get(variant.id))) throw Object.assign(new Error('One or more items are currently out of stock.'), { statusCode: 409 });

  const subtotal = variants.reduce((sum, variant) => sum + Number(variant.sellingPrice) * quantities.get(variant.id), 0);
  let coupon = null;
  let discount = 0;
  if (couponCode) {
    coupon = await prisma.coupon.findUnique({ where: { code: couponCode.toUpperCase() } });
    const now = new Date();
    if (!coupon || !coupon.isActive || coupon.validFrom > now || coupon.validUntil < now || (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) || (coupon.minOrderValue && subtotal < Number(coupon.minOrderValue))) {
      throw Object.assign(new Error('This coupon is no longer valid.'), { statusCode: 400 });
    }
    discount = coupon.type === 'PERCENTAGE' ? subtotal * Number(coupon.value) / 100 : Number(coupon.value);
    if (coupon.maxDiscount) discount = Math.min(discount, Number(coupon.maxDiscount));
    discount = Math.min(discount, subtotal);
  }
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = Math.max(0, subtotal - discount + shipping);

  const createdOrder = await prisma.$transaction(async (tx) => {
    const created = await tx.order.create({
      data: {
        orderNumber: orderNumber(), userId, shippingAddressSnapshot: address, billingAddressSnapshot: address,
        subtotal, discountAmount: discount, shippingAmount: shipping, taxAmount: 0, total,
        couponId: coupon?.id, couponCode: coupon?.code, paymentMethod, paymentStatus: paymentMethod === 'COD' ? 'COD_PENDING' : 'PENDING',
        items: { create: variants.map((variant) => ({ productId: variant.product.id, variantId: variant.id, productNameSnapshot: variant.product.name, variantNameSnapshot: variant.name, priceSnapshot: variant.sellingPrice, quantity: quantities.get(variant.id), total: Number(variant.sellingPrice) * quantities.get(variant.id), isSubscription: Boolean(items.find((item) => item.variantId === variant.id)?.isSubscription) })) },
      },
      include: { items: true },
    });
    await Promise.all(variants.map((variant) => tx.productVariant.update({ where: { id: variant.id }, data: { stockQuantity: { decrement: quantities.get(variant.id) } } })));
    if (coupon) await tx.coupon.update({ where: { id: coupon.id }, data: { usedCount: { increment: 1 } } });
    return created;
  });

  if (userId) {
    try {
      await computeAndSyncUserOrderStats(userId);
    } catch (statsErr) {
      console.error('Failed to sync order stats after order creation:', statsErr.message);
    }
  }

  return createdOrder;
}

export async function computeAndSyncUserOrderStats(userId) {
  if (!userId) return null;

  const orders = await prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: { items: true },
  });

  if (!orders || orders.length === 0) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        mostOrderedProduct: null,
        lastOrderDate: null,
        lastOrderSummary: null,
        lastOrderStatus: null,
      },
    }).catch(() => {});

    return {
      mostOrderedProduct: null,
      lastOrderDate: null,
      lastOrderSummary: null,
      lastOrderStatus: null,
      triedRecipes: [],
      recipesTriedCount: 0,
      totalOrders: 0,
    };
  }

  const productCounts = {};
  const triedRecipesSet = new Set();

  for (const order of orders) {
    for (const item of order.items) {
      const name = (item.productNameSnapshot || '').trim();
      if (name) {
        productCounts[name] = (productCounts[name] || 0) + (item.quantity || 1);
        triedRecipesSet.add(name);
      }
    }
  }

  let mostOrderedProduct = null;
  let maxCount = -1;
  for (const [name, count] of Object.entries(productCounts)) {
    if (count > maxCount) {
      maxCount = count;
      mostOrderedProduct = name;
    }
  }

  const latestOrder = orders[0];
  const lastOrderDate = latestOrder ? latestOrder.createdAt : null;
  const lastOrderStatus = latestOrder ? latestOrder.fulfillmentStatus : null;
  let lastOrderSummary = null;

  if (latestOrder) {
    const d = new Date(latestOrder.createdAt);
    const monthYear = d.toLocaleString('en-US', { month: 'short', year: 'numeric' });
    let statusLabel = 'Fresh Order Placed';
    if (latestOrder.fulfillmentStatus === 'DELIVERED') {
      statusLabel = 'Delivered Fresh';
    } else if (latestOrder.fulfillmentStatus === 'SHIPPED') {
      statusLabel = 'Dispatched Fresh';
    } else if (latestOrder.fulfillmentStatus === 'PROCESSING') {
      statusLabel = 'Preparing Fresh';
    }
    lastOrderSummary = `${statusLabel} (${monthYear})`;
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      mostOrderedProduct,
      lastOrderDate,
      lastOrderSummary,
      lastOrderStatus,
    },
  }).catch((err) => {
    console.error('Failed to sync user order stats to Supabase:', err.message);
  });

  return {
    mostOrderedProduct,
    lastOrderDate,
    lastOrderSummary,
    lastOrderStatus,
    triedRecipes: Array.from(triedRecipesSet),
    recipesTriedCount: triedRecipesSet.size,
    totalOrders: orders.length,
  };
}
