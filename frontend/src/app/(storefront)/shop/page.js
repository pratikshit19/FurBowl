import { Suspense } from 'react';
import ProductGrid from '@/components/product/ProductGrid';
import ProductFilters from '@/components/product/ProductFilters';
import Link from 'next/link';

export const metadata = {
  title: 'Shop Fresh Dog Food',
  description:
    'Shop all FurBowl fresh dog food — Chicken Rice, Paneer Medley, Egg Superfood, Lamb & Lentils, Chicken Broth. Made with real, human-grade ingredients.',
};

const PLACEHOLDER_PRODUCTS = [
  {
    id: '1', name: 'Chicken Rice with Vegetables', slug: 'chicken-rice-with-vegetables',
    shortDescription: 'Complete meal with real chicken, rice & amla.',
    isVeg: false, isFeatured: true, foodType: 'WET',
    images: [{ url: '/images/products/chicken-rice-front.jpg', altText: 'Chicken Rice with Vegetables' }],
    variants: [{ mrp: 99, sellingPrice: 89 }],
  },
  {
    id: '2', name: 'Chicken Broth', slug: 'chicken-broth',
    shortDescription: 'Warm bone broth for hydration & digestion.',
    isVeg: false, isFeatured: true, foodType: 'BROTH',
    images: [{ url: '/images/products/chicken-broth-front.jpg', altText: 'Chicken Broth' }],
    variants: [{ mrp: 129, sellingPrice: 109 }],
  },
  {
    id: '3', name: 'Paneer Medley', slug: 'paneer-medley',
    shortDescription: 'Vegetarian meal with paneer, quinoa & superfoods.',
    isVeg: true, isFeatured: true, foodType: 'WET',
    images: [{ url: '/images/products/paneer-medley-front.jpg', altText: 'Paneer Medley' }],
    variants: [{ mrp: 109, sellingPrice: 99 }],
  },
  {
    id: '4', name: 'Lamb & Lentils with Vegetables', slug: 'lamb-lentils-with-vegetables',
    shortDescription: 'Premium lamb with lentils & rosemary.',
    isVeg: false, isFeatured: true, foodType: 'WET',
    images: [{ url: '/images/products/lamb-lentils-front.jpg', altText: 'Lamb & Lentils' }],
    variants: [{ mrp: 119, sellingPrice: 109 }],
  },
  {
    id: '5', name: 'Egg Superfood', slug: 'egg-superfood',
    shortDescription: 'Highest-protein meal with turmeric & ashwagandha.',
    isVeg: true, isFeatured: true, foodType: 'WET',
    images: [{ url: '/images/products/egg-superfood-front.jpg', altText: 'Egg Superfood' }],
    variants: [{ mrp: 109, sellingPrice: 99 }],
  },
];

async function getProducts(searchParams) {
  try {
    const params = new URLSearchParams();
    if (searchParams.search) params.set('search', searchParams.search);
    if (searchParams.category) params.set('category', searchParams.category);
    if (searchParams.isVeg) params.set('isVeg', searchParams.isVeg);
    if (searchParams.sort) {
      if (searchParams.sort === 'price_asc') { params.set('sort', 'price'); params.set('order', 'asc'); }
      else if (searchParams.sort === 'price_desc') { params.set('sort', 'price'); params.set('order', 'desc'); }
      else { params.set('sort', searchParams.sort); }
    }
    if (searchParams.page) params.set('page', searchParams.page);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products?${params.toString()}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return { products: PLACEHOLDER_PRODUCTS, pagination: null };
    return res.json();
  } catch {
    return { products: PLACEHOLDER_PRODUCTS, pagination: null };
  }
}

export default async function ShopPage({ searchParams }) {
  const params = await searchParams;
  const { products, pagination } = await getProducts(params);

  return (
    <div className="section-padding">
      <div className="container-main">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="hover:text-turquoise-600 transition-colors">Home</Link></li>
            <li aria-hidden="true"><span>/</span></li>
            <li className="text-gray-900 font-medium" aria-current="page">Shop</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-500">
            {pagination ? `${pagination.total} product${pagination.total !== 1 ? 's' : ''}` : `${products.length} products`}
          </p>
        </div>

        {/* Filters */}
        <Suspense>
          <ProductFilters />
        </Suspense>

        {/* Grid */}
        <div className="mt-8">
          <ProductGrid products={products} />
        </div>

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
              <Link
                key={page}
                href={`/shop?${new URLSearchParams({ ...params, page }).toString()}`}
                className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
                  page === pagination.page
                    ? 'bg-turquoise-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                aria-current={page === pagination.page ? 'page' : undefined}
              >
                {page}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
