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

  return prisma.$transaction(async (tx) => {
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
}
