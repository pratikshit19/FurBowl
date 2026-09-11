import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';

const PLACEHOLDER_PRODUCTS = [
  {
    id: '1',
    name: 'Chicken Harvest',
    slug: 'chicken-harvest',
    shortDescription: 'Wholesome nutrition with real chicken, pumpkin & garden veggies.',
    isVeg: false,
    isFeatured: true,
    foodType: 'WET',
    images: [{ url: '/images/products/chicken-harvest-front.jpg', altText: 'Chicken Harvest' }],
    variants: [{ mrp: 99, sellingPrice: 89 }],
  },
  {
    id: '2',
    name: 'Chicken Homestyle',
    slug: 'chicken-homestyle',
    shortDescription: 'Homestyle slow-cooked chicken with rice, peas & pumpkin.',
    isVeg: false,
    isFeatured: true,
    foodType: 'WET',
    images: [{ url: '/images/products/chicken-homestyle-front.jpg', altText: 'Chicken Homestyle' }],
    variants: [{ mrp: 99, sellingPrice: 89 }],
  },
  {
    id: '3',
    name: 'Golden Egg & Quinoa',
    slug: 'golden-egg-quinoa',
    shortDescription: 'Farm-fresh eggs with superfood quinoa & pumpkin for active pups.',
    isVeg: true,
    isFeatured: true,
    foodType: 'WET',
    images: [{ url: '/images/products/golden-egg-quinoa-front.jpg', altText: 'Golden Egg & Quinoa' }],
    variants: [{ mrp: 109, sellingPrice: 99 }],
  },
  {
    id: '4',
    name: 'Paneer & Greens',
    slug: 'paneer-greens',
    shortDescription: 'Fresh paneer cubes with spinach, carrots & green beans.',
    isVeg: true,
    isFeatured: true,
    foodType: 'WET',
    images: [{ url: '/images/products/paneer-greens-front.jpg', altText: 'Paneer & Greens' }],
    variants: [{ mrp: 109, sellingPrice: 99 }],
  },
  {
    id: '5',
    name: 'Lamb Lentil Harvest',
    slug: 'lamb-lentil-harvest',
    shortDescription: 'Hearty slow-cooked lamb with red lentils, sweet potato & broccoli.',
    isVeg: false,
    isFeatured: true,
    foodType: 'WET',
    images: [{ url: '/images/products/lamb-lentil-harvest-front.jpg', altText: 'Lamb Lentil Harvest' }],
    variants: [{ mrp: 119, sellingPrice: 109 }],
  },
  {
    id: '6',
    name: 'Golden Chicken Broth',
    slug: 'golden-chicken-broth',
    shortDescription: 'Warm bone broth for hydration, digestion & joint care.',
    isVeg: false,
    isFeatured: true,
    foodType: 'BROTH',
    images: [{ url: '/images/products/golden-chicken-broth-front.jpg', altText: 'Golden Chicken Broth' }],
    variants: [{ mrp: 129, sellingPrice: 109 }],
  },
];

export default function FeaturedProducts({ products }) {
  const displayProducts = products || PLACEHOLDER_PRODUCTS;

  return (
    <section className="section-padding bg-white" aria-labelledby="featured-products-heading">
      <div className="container-main">
        
        {/* Section Header */}
        <div className="text-center mb-10 pb-4 border-b border-plum-900/10">
          <span className="text-[#15aec0] text-xs font-extrabold uppercase tracking-widest bg-[#f0fafb] px-3.5 py-1 rounded-sm inline-block mb-2 border border-[#cff0f3]">
            Fresh Meals
          </span>
          <h2 id="featured-products-heading" className="text-3xl sm:text-4xl font-extrabold text-plum-900 tracking-tight mb-2">
            Shop by Meals (Each Product)
          </h2>
          <p className="text-plum-900/60 text-xs sm:text-sm font-normal max-w-xl mx-auto mb-3">
            Single ready-to-eat 100g human-grade recipes. Gently cooked and ready straight from the pouch.
          </p>
          <div className="flex justify-center">
            <Link
              href="/shop"
              className="text-xs sm:text-sm font-extrabold text-coral-500 hover:text-plum-900 inline-flex items-center gap-1 transition-colors"
            >
              View all <span>→</span>
            </Link>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-5">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
}
