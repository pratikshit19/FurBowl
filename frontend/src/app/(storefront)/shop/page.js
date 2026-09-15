import Link from 'next/link';
import ShopCatalogVisual from '@/components/product/ShopCatalogVisual';

export const metadata = {
  title: 'Shop Fresh Dog Food',
  description:
    'Shop all FurBowl fresh dog food — Chicken Harvest, Chicken Homestyle, Golden Egg & Quinoa, Paneer & Greens, Lamb Lentil Harvest, Golden Chicken Broth. Made with real, human-grade ingredients.',
};

const PLACEHOLDER_PRODUCTS = [
  // ─── 5 Official Core Meals ───
  {
    id: 'chicken-vegetables',
    name: 'Chicken & Vegetables Wet Dog Food',
    slug: 'chicken-vegetables',
    shortDescription: 'Whole chicken, liver, gizzard, pumpkin, carrot, peas & sweet potato.',
    isVeg: false,
    isFeatured: true,
    foodType: 'WET',
    category: { slug: 'meals' },
    images: [{ url: '/images/products/chicken-harvest-front.jpg', altText: 'Chicken & Vegetables Wet Dog Food' }],
    variants: [{ mrp: 219, sellingPrice: 199, size: '100g Pouch' }],
  },
  {
    id: 'chicken-rice-vegetables',
    name: 'Chicken Rice & Vegetables Wet Dog Food',
    slug: 'chicken-rice-vegetables',
    shortDescription: 'Slow-cooked whole chicken, chicken liver, heart, rice & garden veggies.',
    isVeg: false,
    isFeatured: true,
    foodType: 'WET',
    category: { slug: 'meals' },
    images: [{ url: '/images/products/chicken-homestyle-front.jpg', altText: 'Chicken Rice & Vegetables Wet Dog Food' }],
    variants: [{ mrp: 219, sellingPrice: 199, size: '100g Pouch' }],
  },
  {
    id: 'egg-superfood',
    name: 'Egg Superfood Wet Dog Food with Quinoa & Vegetables',
    slug: 'egg-superfood',
    shortDescription: 'Farm eggs, organic quinoa, sweet potato, spinach, peas & zucchini.',
    isVeg: true,
    isFeatured: true,
    foodType: 'WET',
    category: { slug: 'meals' },
    images: [{ url: '/images/products/golden-egg-quinoa-front.jpg', altText: 'Egg Superfood Wet Dog Food' }],
    variants: [{ mrp: 209, sellingPrice: 189, size: '100g Pouch' }],
  },
  {
    id: 'paneer-vegetables',
    name: 'Paneer & Vegetables Wet Dog Food',
    slug: 'paneer-vegetables',
    shortDescription: 'Fresh paneer, rice, pumpkin, carrot, green peas, spinach & chia seeds.',
    isVeg: true,
    isFeatured: true,
    foodType: 'WET',
    category: { slug: 'meals' },
    images: [{ url: '/images/products/paneer-greens-front.jpg', altText: 'Paneer & Vegetables Wet Dog Food' }],
    variants: [{ mrp: 209, sellingPrice: 189, size: '100g Pouch' }],
  },
  {
    id: 'lamb-lentils',
    name: 'Lamb & Lentils Wet Dog Food with Vegetables',
    slug: 'lamb-lentils',
    shortDescription: 'Lean lamb, lamb liver, red lentils, sweet potato, green beans & broccoli.',
    isVeg: false,
    isFeatured: true,
    foodType: 'WET',
    category: { slug: 'meals' },
    images: [{ url: '/images/products/lamb-lentil-harvest-front.jpg', altText: 'Lamb & Lentils Wet Dog Food' }],
    variants: [{ mrp: 249, sellingPrice: 229, size: '100g Pouch' }],
  },

  // ─── Official Curated Trial Packs ───
  {
    id: 'all-recipes-trial-pack',
    name: 'All Recipes Wet Dog Food Trial Pack – 5 x 100g',
    slug: 'all-recipes-trial-pack',
    shortDescription: '1 of each recipe (Chicken, Lamb, Egg & Paneer). ⭐ Best discovery pack.',
    isVeg: false,
    isFeatured: true,
    foodType: 'TRIAL_PACK',
    category: { slug: 'trial-packs' },
    images: [{ url: '/images/products/chicken-harvest-front.jpg', altText: 'All Recipes Trial Pack' }],
    variants: [{ mrp: 599, sellingPrice: 499, size: '5 x 100g' }],
  },
  {
    id: 'chicken-lovers-trial-pack',
    name: 'Chicken Wet Dog Food Trial Pack – 4 x 100g',
    slug: 'chicken-lovers-trial-pack',
    shortDescription: '2x Chicken Veg + 2x Chicken Rice. For dogs who love poultry.',
    isVeg: false,
    isFeatured: true,
    foodType: 'TRIAL_PACK',
    category: { slug: 'trial-packs' },
    images: [{ url: '/images/products/chicken-homestyle-front.jpg', altText: 'Chicken Lovers Trial Pack' }],
    variants: [{ mrp: 479, sellingPrice: 399, size: '4 x 100g' }],
  },
  {
    id: 'meat-lovers-trial-pack',
    name: 'Chicken & Lamb Wet Dog Food Trial Pack – 4 x 100g',
    slug: 'meat-lovers-trial-pack',
    shortDescription: '1x Chicken Veg + 1x Chicken Rice + 2x Lamb & Lentils. Protein-focused.',
    isVeg: false,
    isFeatured: true,
    foodType: 'TRIAL_PACK',
    category: { slug: 'trial-packs' },
    images: [{ url: '/images/products/lamb-lentil-harvest-front.jpg', altText: 'Chicken & Lamb Trial Pack' }],
    variants: [{ mrp: 519, sellingPrice: 429, size: '4 x 100g' }],
  },
  {
    id: 'chicken-egg-trial-pack',
    name: 'Chicken & Egg Wet Dog Food Trial Pack – 4 x 100g',
    slug: 'chicken-egg-trial-pack',
    shortDescription: '1x Chicken Veg + 1x Chicken Rice + 2x Egg SuperFood. Familiar + variety.',
    isVeg: false,
    isFeatured: false,
    foodType: 'TRIAL_PACK',
    category: { slug: 'trial-packs' },
    images: [{ url: '/images/products/golden-egg-quinoa-front.jpg', altText: 'Chicken & Egg Trial Pack' }],
    variants: [{ mrp: 479, sellingPrice: 399, size: '4 x 100g' }],
  },
  {
    id: 'meat-veggie-variety-pack',
    name: 'Meat & Veggie Wet Dog Food Trial Pack – 6 x 100g',
    slug: 'meat-veggie-variety-pack',
    shortDescription: '2x Chicken Veg + 1x Chicken Rice + 1x Lamb + 1x Egg + 1x Paneer.',
    isVeg: false,
    isFeatured: false,
    foodType: 'TRIAL_PACK',
    category: { slug: 'trial-packs' },
    images: [{ url: '/images/products/chicken-harvest-front.jpg', altText: 'Meat & Veggie Trial Pack' }],
    variants: [{ mrp: 699, sellingPrice: 579, size: '6 x 100g' }],
  },
];

function applyFiltersAndSort(items, searchParams) {
  let filtered = [...items];

  // Category filter
  if (searchParams?.category) {
    const cat = searchParams.category.toLowerCase();
    if (cat === 'meals') {
      filtered = filtered.filter(
        (p) => p.foodType === 'WET' || p.category?.slug === 'meals'
      );
    } else if (cat === 'trial-packs') {
      filtered = filtered.filter(
        (p) => p.foodType === 'TRIAL_PACK' || p.category?.slug === 'trial-packs' || p.slug.includes('pack')
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
  
  // Determine initial active tab from query parameters
  let initialTab = 'meals';
  if (params?.category === 'trial-packs' || params?.tab === 'trial-packs') {
    initialTab = 'trial-packs';
  } else if (params?.category === 'custom-box' || params?.tab === 'value-bundles' || params?.category === 'monthly-packs') {
    initialTab = 'multi-packs';
  }

  return (
    <div className="py-8 sm:py-12 bg-white">
      <div className="container-main">
        {/* Header & Breadcrumb */}
        <div className="mb-8 pt-2">
          <nav className="text-xs font-bold text-plum-900/50 uppercase tracking-widest mb-3" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-teal-600 transition-colors">Home</Link></li>
              <li aria-hidden="true"><span>/</span></li>
              <li className="text-plum-900 font-extrabold" aria-current="page">All Products</li>
            </ol>
          </nav>

          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-plum-900/10 pb-5">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-plum-900 tracking-tight mb-2">
                All Products &amp; Fresh Meals
              </h1>
              <p className="text-sm sm:text-base text-plum-900/65 font-normal">
                100% human-grade, chef-crafted recipes gently cooked &amp; vacuum-sealed for fresh daily feeding.
              </p>
            </div>
            <span className="text-xs font-black text-teal-700 bg-teal-50 border border-teal-200 px-3.5 py-1.5 rounded-full shadow-xs">
              100% Human-Grade
            </span>
          </div>
        </div>

        {/* Visual Catalog (Fresh Meals, Curated Trial Packs & Multi-Pack Bundles) */}
        <ShopCatalogVisual initialTab={initialTab} />
      </div>
    </div>
  );
}
