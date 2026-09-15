import { Router } from 'express';
import prisma from '../config/database.js';
import { verifyAccessToken } from '../utils/token.js';

const router = Router();

// Middleware to authenticate user via Bearer token or cookie
const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ')
      ? authHeader.slice(7)
      : req.cookies?.refreshToken; // fallback to cookie if access token not directly passed

    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const decoded = verifyAccessToken(token);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

/**
 * Format CartItem record for frontend consumption
 */
const formatCartItem = (item) => ({
  id: item.id,
  productId: item.productId,
  variantId: item.variantId,
  productName: item.product.name,
  variantName: item.variant.name,
  slug: item.product.slug,
  imageUrl: item.product.images?.[0]?.url || null,
  isVeg: item.product.isVeg,
  price: Number(item.variant.sellingPrice),
  mrp: Number(item.variant.mrp),
  quantity: item.quantity,
  isSubscription: item.isSubscription,
});

// GET /api/v1/cart — Fetch user's cart items
router.get('/', authenticate, async (req, res, next) => {
  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: req.userId },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
            isVeg: true,
            images: { select: { url: true }, take: 1 },
          },
        },
        variant: {
          select: {
            id: true,
            name: true,
            sellingPrice: true,
            mrp: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    res.json({
      items: cartItems.map(formatCartItem),
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/cart/items — Add or increment item in cart
router.post('/items', authenticate, async (req, res, next) => {
  try {
    const { productId, variantId, quantity = 1, isSubscription = false } = req.body;

    if (!productId || !variantId) {
      return res.status(400).json({ error: 'productId and variantId are required' });
    }

    const qty = Math.max(1, parseInt(quantity, 10) || 1);

    // Check if item already exists for this user
    const existing = await prisma.cartItem.findFirst({
      where: {
        userId: req.userId,
        variantId,
        isSubscription: Boolean(isSubscription),
      },
    });

    let savedItem;
    if (existing) {
      savedItem = await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + qty },
        include: {
          product: {
            select: {
              id: true,
              name: true,
              slug: true,
              isVeg: true,
              images: { select: { url: true }, take: 1 },
            },
          },
          variant: {
            select: {
              id: true,
              name: true,
              sellingPrice: true,
              mrp: true,
            },
          },
        },
      });
    } else {
      savedItem = await prisma.cartItem.create({
        data: {
          userId: req.userId,
          productId,
          variantId,
          quantity: qty,
          isSubscription: Boolean(isSubscription),
        },
        include: {
          product: {
            select: {
              id: true,
              name: true,
              slug: true,
              isVeg: true,
              images: { select: { url: true }, take: 1 },
            },
          },
          variant: {
            select: {
              id: true,
              name: true,
              sellingPrice: true,
              mrp: true,
            },
          },
        },
      });
    }

    res.status(200).json({
      item: formatCartItem(savedItem),
    });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/v1/cart/items/:id — Update item quantity (or remove if <= 0)
router.patch('/items/:id', authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const existing = await prisma.cartItem.findFirst({
      where: { id, userId: req.userId },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    const qty = parseInt(quantity, 10);
    if (qty <= 0) {
      await prisma.cartItem.delete({ where: { id } });
      return res.json({ message: 'Item removed', deletedId: id });
    }

    const updated = await prisma.cartItem.update({
      where: { id },
      data: { quantity: qty },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
            isVeg: true,
            images: { select: { url: true }, take: 1 },
          },
        },
        variant: {
          select: {
            id: true,
            name: true,
            sellingPrice: true,
            mrp: true,
          },
        },
      },
    });

    res.json({ item: formatCartItem(updated) });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/v1/cart/items/:id — Remove item
router.delete('/items/:id', authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await prisma.cartItem.findFirst({
      where: { id, userId: req.userId },
    });

    if (!existing) {
      // If id is in the frontend format (e.g. variantId-sub-timestamp), look it up by variantId
      const byVariant = await prisma.cartItem.findFirst({
        where: {
          userId: req.userId,
          variantId: id.split('-')[0],
        },
      });
      if (byVariant) {
        await prisma.cartItem.delete({ where: { id: byVariant.id } });
        return res.json({ message: 'Item removed', deletedId: id });
      }
      return res.status(404).json({ error: 'Cart item not found' });
    }

    await prisma.cartItem.delete({ where: { id } });
    res.json({ message: 'Item removed', deletedId: id });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/v1/cart — Clear user's entire cart
router.delete('/', authenticate, async (req, res, next) => {
  try {
    await prisma.cartItem.deleteMany({
      where: { userId: req.userId },
    });
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/cart/sync — Sync / merge local cart with database
router.post('/sync', authenticate, async (req, res, next) => {
  try {
    const { items = [] } = req.body;

    // For each incoming item, upsert into DB
    for (const item of items) {
      if (!item.productId || !item.variantId) continue;
      const existing = await prisma.cartItem.findFirst({
        where: {
          userId: req.userId,
          variantId: item.variantId,
          isSubscription: Boolean(item.isSubscription),
        },
      });

      if (existing) {
        await prisma.cartItem.update({
          where: { id: existing.id },
          data: {
            quantity: Math.max(existing.quantity, item.quantity || 1),
          },
        });
      } else {
        await prisma.cartItem.create({
          data: {
            userId: req.userId,
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity || 1,
            isSubscription: Boolean(item.isSubscription),
          },
        });
      }
    }

    // Return the full updated cart
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: req.userId },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
            isVeg: true,
            images: { select: { url: true }, take: 1 },
          },
        },
        variant: {
          select: {
            id: true,
            name: true,
            sellingPrice: true,
            mrp: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    res.json({
      items: cartItems.map(formatCartItem),
    });
  } catch (error) {
    next(error);
  }
});

export default router;
