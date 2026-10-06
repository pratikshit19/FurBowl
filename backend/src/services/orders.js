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
  // Fetch all active products & variants to resolve any legacy or synthetic variant IDs
  const allVariants = await prisma.productVariant.findMany({
    where: { isActive: true, product: { isActive: true } },
    include: { product: { select: { id: true, name: true, slug: true } } },
  });

  const variantById = new Map(allVariants.map((v) => [v.id, v]));
  const variantBySku = new Map(allVariants.map((v) => [v.sku.toLowerCase(), v]));
  const variantByProductSlug = new Map(allVariants.map((v) => [v.product.slug.toLowerCase(), v]));

  const SLUG_ALIASES = {
    'paneer-vegetables': 'paneer-greens',
    'lamb-lentils': 'lamb-lentil-harvest',
    'chicken-vegetables': 'chicken-harvest',
    'bone-broth': 'golden-chicken-broth',
  };

  const resolvedItems = [];
  for (const item of items) {
    const quantity = Number.parseInt(item.quantity, 10);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 50) {
      throw Object.assign(new Error('One or more cart quantities are invalid.'), { statusCode: 400 });
    }

    let matchedVariant = item.variantId ? variantById.get(item.variantId) : null;

    if (!matchedVariant && item.variantId) {
      const vidLower = String(item.variantId).toLowerCase();
      matchedVariant = variantBySku.get(vidLower);

      if (!matchedVariant) {
        for (const [slug, variant] of variantByProductSlug.entries()) {
          if (vidLower.includes(slug)) {
            matchedVariant = variant;
            break;
          }
        }
      }

      if (!matchedVariant) {
        for (const [alias, canonicalSlug] of Object.entries(SLUG_ALIASES)) {
          if (vidLower.includes(alias)) {
            matchedVariant = variantByProductSlug.get(canonicalSlug);
            break;
          }
        }
      }
    }

    if (!matchedVariant && item.slug) {
      const sLower = String(item.slug).toLowerCase();
      matchedVariant = variantByProductSlug.get(sLower) || variantByProductSlug.get(SLUG_ALIASES[sLower]);
    }

    if (!matchedVariant && allVariants.length > 0) {
      matchedVariant = allVariants[0];
    }

    if (!matchedVariant) {
      throw Object.assign(new Error('A product in your cart is no longer available.'), { statusCode: 409 });
    }

    resolvedItems.push({
      variant: matchedVariant,
      quantity,
      isSubscription: Boolean(item.isSubscription),
      requestedPrice: item.price ? Number(item.price) : null,
    });
  }

  const quantities = new Map();
  for (const r of resolvedItems) {
    quantities.set(r.variant.id, (quantities.get(r.variant.id) || 0) + r.quantity);
  }

  for (const [variantId, qty] of quantities.entries()) {
    const variant = variantById.get(variantId);
    if (variant && variant.stockQuantity < qty) {
      throw Object.assign(new Error('One or more items are currently out of stock.'), { statusCode: 409 });
    }
  }

  const subtotal = resolvedItems.reduce((sum, r) => {
    const unitPrice = (r.requestedPrice && r.requestedPrice > 0) ? r.requestedPrice : Number(r.variant.sellingPrice);
    return sum + unitPrice * r.quantity;
  }, 0);

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
        orderNumber: orderNumber(),
        userId,
        shippingAddressSnapshot: address,
        billingAddressSnapshot: address,
        subtotal,
        discountAmount: discount,
        shippingAmount: shipping,
        taxAmount: 0,
        total,
        couponId: coupon?.id,
        couponCode: coupon?.code,
        paymentMethod,
        paymentStatus: paymentMethod === 'COD' ? 'COD_PENDING' : 'PENDING',
        items: {
          create: resolvedItems.map((r) => {
            const unitPrice = (r.requestedPrice && r.requestedPrice > 0) ? r.requestedPrice : Number(r.variant.sellingPrice);
            return {
              productId: r.variant.product.id,
              variantId: r.variant.id,
              productNameSnapshot: r.variant.product.name,
              variantNameSnapshot: r.variant.name,
              priceSnapshot: unitPrice,
              quantity: r.quantity,
              total: unitPrice * r.quantity,
              isSubscription: r.isSubscription,
            };
          }),
        },
      },
      include: { items: true },
    });

    await Promise.all(
      [...quantities.entries()].map(([variantId, qty]) =>
        tx.productVariant.update({
          where: { id: variantId },
          data: { stockQuantity: { decrement: qty } },
        })
      )
    );

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
    where: {
      userId,
      OR: [
        { paymentStatus: 'PAID' },
        { paymentMethod: 'COD', fulfillmentStatus: { not: 'CANCELLED' } },
      ],
    },
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
