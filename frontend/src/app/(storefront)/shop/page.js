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
    images: [{ url: '/images/products/only-chicken-rice-front.jpg', altText: 'Chicken Rice with Vegetables' }],
    variants: [{ mrp: 99, sellingPrice: 89 }],
  },
  {
    id: '2', name: 'Chicken Broth', slug: 'chicken-broth',
    shortDescription: 'Warm bone broth for hydration & digestion.',
    isVeg: false, isFeatured: true, foodType: 'BROTH',
    images: [{ url: '/images/products/only-chicken-broth-front.jpg', altText: 'Chicken Broth' }],
    variants: [{ mrp: 129, sellingPrice: 109 }],
  },
  {
    id: '3', name: 'Paneer Medley', slug: 'paneer-medley',
    shortDescription: 'Vegetarian meal with paneer, quinoa & superfoods.',
    isVeg: true, isFeatured: true, foodType: 'WET',
    images: [{ url: '/images/products/only-paneer-medley-front.jpg', altText: 'Paneer Medley' }],
    variants: [{ mrp: 109, sellingPrice: 99 }],
  },
  {
    id: '4', name: 'Lamb & Lentils with Vegetables', slug: 'lamb-lentils-with-vegetables',
    shortDescription: 'Premium lamb with lentils & rosemary.',
    isVeg: false, isFeatured: true, foodType: 'WET',
    images: [{ url: '/images/products/only-lamb-lentils-front.jpg', altText: 'Lamb & Lentils' }],
    variants: [{ mrp: 119, sellingPrice: 109 }],
  },
  {
    id: '5', name: 'Egg Superfood', slug: 'egg-superfood',
    shortDescription: 'Highest-protein meal with turmeric & ashwagandha.',
    isVeg: true, isFeatured: true, foodType: 'WET',
    images: [{ url: '/images/products/only-egg-superfood-front.jpg', altText: 'Egg Superfood' }],
    variants: [{ mrp: 109, sellingPrice: 99 }],
  },
];

function applyFiltersAndSort(items, searchParams) {
  let filtered = [...items];

  // Category filter
  if (searchParams?.category) {
    const cat = searchParams.category.toLowerCase();
    if (cat === 'meals') {
      filtered = filtered.filter(
        (p) => p.foodType === 'WET' || p.category?.slug === 'meals' || !p.slug.includes('broth')
      );
    } else if (cat === 'broth') {
      filtered = filtered.filter(
        (p) => p.foodType === 'BROTH' || p.category?.slug === 'broth' || p.slug.includes('broth')
      );
    }
  }

  // Veg / Non-Veg filter
  if (searchParams?.isVeg === 'true') {
    filtered = filtered.filter((p) => p.isVeg === true);
  } else if (searchParams?.isVeg === 'false') {
    filtered = filtered.filter((p) => p.isVeg === false);
  }

  // Search filter
  if (searchParams?.search) {
    const query = searchParams.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        (p.shortDescription && p.shortDescription.toLowerCase().includes(query))
    );
  }

  // Sorting
  if (searchParams?.sort) {
    if (searchParams.sort === 'price_asc') {
      filtered.sort((a, b) => {
        const priceA = Number(a.variants?.[0]?.sellingPrice || 0);
        const priceB = Number(b.variants?.[0]?.sellingPrice || 0);
        return priceA - priceB;
      });
    } else if (searchParams.sort === 'price_desc') {
      filtered.sort((a, b) => {
        const priceA = Number(a.variants?.[0]?.sellingPrice || 0);
        const priceB = Number(b.variants?.[0]?.sellingPrice || 0);
        return priceB - priceA;
      });
    } else if (searchParams.sort === 'newest') {
      filtered.sort((a, b) => Number(b.id || 0) - Number(a.id || 0));
    }
  }

  return filtered;
}

async function getProducts(searchParams) {
  let productsList = PLACEHOLDER_PRODUCTS;
  let pagination = null;

  try {
    const params = new URLSearchParams();
    if (searchParams?.search) params.set('search', searchParams.search);
    if (searchParams?.category) params.set('category', searchParams.category);
    if (searchParams?.isVeg) params.set('isVeg', searchParams.isVeg);
    if (searchParams?.sort) {
      if (searchParams.sort === 'price_asc') { params.set('sort', 'price'); params.set('order', 'asc'); }
      else if (searchParams.sort === 'price_desc') { params.set('sort', 'price'); params.set('order', 'desc'); }
      else { params.set('sort', searchParams.sort); }
    }
    if (searchParams?.page) params.set('page', searchParams.page);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products?${params.toString()}`,
      { next: { revalidate: 60 } }
    );
    if (res.ok) {
      const data = await res.json();
      if (data.products && data.products.length > 0) {
        productsList = data.products;
        pagination = data.pagination || null;
        return { products: productsList, pagination };
      }
    }
  } catch {
    // API not connected or failed, proceed with fallback filter/sort
  }

  const filteredProducts = applyFiltersAndSort(productsList, searchParams);
  return { products: filteredProducts, pagination: null };
}

export default async function ShopPage({ searchParams }) {
  const params = await searchParams;
  const { products, pagination } = await getProducts(params);

  return (
    <div className="section-padding bg-[#faf6ed]">
      <div className="container-main">
        {/* Clean Minimal Header */}
        <div className="mb-6 pt-2">
          <nav className="text-xs font-medium text-plum-900/50 uppercase tracking-widest mb-3" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-coral-500 transition-colors">Home</Link></li>
              <li aria-hidden="true"><span>/</span></li>
              <li className="text-plum-900 font-semibold" aria-current="page">Shop</li>
            </ol>
          </nav>

          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-plum-900/5 pb-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-plum-900 tracking-tight mb-1">
                All Products
              </h1>
              <p className="text-xs sm:text-sm text-plum-900/60 font-normal">
                Fresh, ready-to-eat dog food made with 100% human-grade ingredients.
              </p>
            </div>
            <span className="text-xs font-medium text-plum-900/60 bg-white border border-plum-900/5 px-3.5 py-1.5 rounded-full shadow-sm">
              {products.length} {products.length === 1 ? 'product' : 'products'}
            </span>
          </div>
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
                className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-extrabold transition-colors ${
                  page === pagination.page
                    ? 'bg-coral-500 text-white shadow-md'
                    : 'text-plum-900 bg-white border border-plum-900/10 hover:bg-plum-900/5'
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
