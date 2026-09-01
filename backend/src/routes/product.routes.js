import { Router } from 'express';
import prisma from '../config/database.js';

const router = Router();

// GET /api/v1/products — List products with filtering, search, pagination
router.get('/', async (req, res, next) => {
  try {
    const {
      search,
      category,
      foodType,
      lifeStage,
      isVeg,
      minPrice,
      maxPrice,
      sort = 'sortOrder',
      order = 'asc',
      page = 1,
      limit = 12,
      featured,
    } = req.query;

    const where = { isActive: true };

    // Search by name or description
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { shortDescription: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Filter by category slug
    if (category) {
      where.category = { slug: category };
    }

    // Filter by food type
    if (foodType) {
      where.foodType = foodType.toUpperCase();
    }

    // Filter by veg/non-veg
    if (isVeg !== undefined) {
      where.isVeg = isVeg === 'true';
    }

    // Filter by featured
    if (featured === 'true') {
      where.isFeatured = true;
    }

    // Filter by life stage
    if (lifeStage) {
      where.lifeStages = { array_contains: [lifeStage] };
    }

    // Price filtering (on variants)
    const variantFilter = {};
    if (minPrice || maxPrice) {
      variantFilter.sellingPrice = {};
      if (minPrice) variantFilter.sellingPrice.gte = parseFloat(minPrice);
      if (maxPrice) variantFilter.sellingPrice.lte = parseFloat(maxPrice);
    }

    // Sorting
    const sortMap = {
      name: { name: order },
      price: { variants: { _min: { sellingPrice: order } } },
      newest: { createdAt: 'desc' },
      sortOrder: { sortOrder: order },
    };
    const orderBy = sortMap[sort] || sortMap.sortOrder;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: { select: { id: true, name: true, slug: true } },
          variants: {
            where: { isActive: true, ...variantFilter },
            orderBy: { sortOrder: 'asc' },
          },
          images: {
            orderBy: { sortOrder: 'asc' },
          },
          _count: { select: { reviews: { where: { isApproved: true } } } },
        },
        orderBy,
        skip,
        take,
      }),
      prisma.product.count({ where }),
    ]);

    // Calculate average rating for each product
    const productsWithRating = await Promise.all(
      products.map(async (product) => {
        const avgRating = await prisma.review.aggregate({
          where: { productId: product.id, isApproved: true },
          _avg: { rating: true },
        });
        return {
          ...product,
          averageRating: avgRating._avg.rating || 0,
          reviewCount: product._count.reviews,
        };
      })
    );

    res.json({
      products: productsWithRating,
      pagination: {
        page: parseInt(page),
        limit: take,
        total,
        totalPages: Math.ceil(total / take),
      },
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/products/featured — Get featured products
router.get('/featured', async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true, isFeatured: true },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        variants: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' },
        },
        images: { orderBy: { sortOrder: 'asc' } },
      },
      orderBy: { sortOrder: 'asc' },
    });

    res.json({ products });
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/products/:slug — Get single product by slug
router.get('/:slug', async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: req.params.slug, isActive: true },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        variants: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' },
        },
        images: { orderBy: { sortOrder: 'asc' } },
        reviews: {
          where: { isApproved: true, isVisible: true },
          include: {
            user: { select: { name: true } },
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Get review stats
    const reviewStats = await prisma.review.aggregate({
      where: { productId: product.id, isApproved: true },
      _avg: { rating: true },
      _count: { rating: true },
    });

    // Get related products (same category, excluding current)
    const related = await prisma.product.findMany({
      where: {
        isActive: true,
        categoryId: product.categoryId,
        id: { not: product.id },
      },
      include: {
        variants: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' },
        },
        images: { orderBy: { sortOrder: 'asc' } },
      },
      take: 4,
    });

    res.json({
      product: {
        ...product,
        averageRating: reviewStats._avg.rating || 0,
        reviewCount: reviewStats._count.rating,
      },
      relatedProducts: related,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
