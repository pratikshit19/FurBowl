import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/constants';

const PLACEHOLDER_PRODUCTS = [
  {
    id: '1',
    name: 'Chicken Rice with Vegetables',
    slug: 'chicken-rice-with-vegetables',
    shortDescription: 'Complete meal with real chicken, rice & amla.',
    isVeg: false,
    isFeatured: true,
    foodType: 'WET',
    images: [{ url: '/images/products/chicken-rice-front.jpg', altText: 'Chicken Rice with Vegetables' }],
    variants: [{ mrp: 99, sellingPrice: 89 }],
  },
  {
    id: '2',
    name: 'Chicken Broth',
    slug: 'chicken-broth',
    shortDescription: 'Warm bone broth for hydration & digestion.',
    isVeg: false,
    isFeatured: true,
    foodType: 'BROTH',
    images: [{ url: '/images/products/chicken-broth-front.jpg', altText: 'Chicken Broth' }],
    variants: [{ mrp: 129, sellingPrice: 109 }],
  },
  {
    id: '3',
    name: 'Paneer Medley',
    slug: 'paneer-medley',
    shortDescription: 'Vegetarian meal with paneer, quinoa & superfoods.',
    isVeg: true,
    isFeatured: true,
    foodType: 'WET',
    images: [{ url: '/images/products/paneer-medley-front.jpg', altText: 'Paneer Medley' }],
    variants: [{ mrp: 109, sellingPrice: 99 }],
  },
  {
    id: '4',
    name: 'Lamb & Lentils with Vegetables',
    slug: 'lamb-lentils-with-vegetables',
    shortDescription: 'Premium lamb with lentils & rosemary.',
    isVeg: false,
    isFeatured: true,
    foodType: 'WET',
    images: [{ url: '/images/products/lamb-lentils-front.jpg', altText: 'Lamb & Lentils' }],
    variants: [{ mrp: 119, sellingPrice: 109 }],
  },
  {
    id: '5',
    name: 'Egg Superfood',
    slug: 'egg-superfood',
    shortDescription: 'Highest-protein meal with turmeric & ashwagandha.',
    isVeg: true,
    isFeatured: true,
    foodType: 'WET',
    images: [{ url: '/images/products/egg-superfood-front.jpg', altText: 'Egg Superfood' }],
    variants: [{ mrp: 109, sellingPrice: 99 }],
  },
];

function ProductCard({ product }) {
  const primaryImage = product.images?.[0];
  const primaryVariant = product.variants?.[0];
  const hasDiscount = primaryVariant && Number(primaryVariant.mrp) > Number(primaryVariant.sellingPrice);

  return (
    <div className="group block bg-[#fefdf9] border border-plum-900/10 rounded-2xl p-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center flex flex-col justify-between">
      <div>
        {/* Image Container */}
        <Link href={`/shop/${product.slug}`} className="relative block aspect-square bg-[#faf6ed] rounded-xl overflow-hidden mb-3 flex items-center justify-center p-3">
          {primaryImage ? (
            <Image
              src={primaryImage.url}
              alt={primaryImage.altText || product.name}
              fill
              className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-plum-900/20">
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}

          {/* Discount badge */}
          {hasDiscount && (
            <div className="absolute top-2 left-2 bg-coral-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm">
              {Math.round(((Number(primaryVariant.mrp) - Number(primaryVariant.sellingPrice)) / Number(primaryVariant.mrp)) * 100)}% OFF
            </div>
          )}
        </Link>

        {/* Info */}
        <div className="flex items-center justify-center gap-1.5 mb-1">
          <div className={product.isVeg ? 'veg-indicator' : 'nonveg-indicator'} title={product.isVeg ? 'Vegetarian' : 'Non-vegetarian'} />
          <span className="text-[11px] text-plum-900/60 font-semibold">{product.isVeg ? 'Veg' : 'Non-veg'}</span>
        </div>

        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-extrabold text-plum-900 text-sm leading-snug mb-1 group-hover:text-coral-500 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Star Rating */}
        <div className="flex items-center justify-center gap-0.5 text-butter-500 mb-2">
          {[...Array(5)].map((_, idx) => (
            <svg key={idx} className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
          ))}
          <span className="text-[10px] text-plum-900/50 font-bold ml-1">(5.0)</span>
        </div>

        {/* Pricing */}
        {primaryVariant && (
          <div className="flex items-baseline justify-center gap-2 mb-3">
            <span className="text-base font-extrabold text-plum-900">
              {formatPrice(primaryVariant.sellingPrice)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-plum-900/40 line-through font-medium">
                {formatPrice(primaryVariant.mrp)}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Add to Cart Action */}
      <Link
        href={`/shop/${product.slug}`}
        className="w-full inline-block border-2 border-coral-500 text-coral-500 hover:bg-coral-500 hover:text-white font-extrabold text-xs py-2 rounded-xl transition-all shadow-sm active:scale-95"
      >
        Add to Cart
      </Link>
    </div>
  );
}

export default function FeaturedProducts({ products }) {
  const displayProducts = products || PLACEHOLDER_PRODUCTS;

  return (
    <section className="section-padding bg-[#faf6ed]" aria-labelledby="featured-products-heading">
      <div className="container-main">
        
        {/* Section Header */}
        <div className="flex items-end justify-between mb-10 pb-4 border-b border-plum-900/10">
          <div>
            <span className="text-coral-500 text-xs font-extrabold uppercase tracking-widest bg-coral-50 px-3 py-1 rounded-full inline-block mb-2 border border-coral-100">
              Fresh Meals
            </span>
            <h2 id="featured-products-heading" className="text-3xl sm:text-4xl font-extrabold text-plum-900 tracking-tight">
              Best Sellers
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs sm:text-sm font-extrabold text-coral-500 hover:text-plum-900 flex items-center gap-1 transition-colors"
          >
            View all <span>→</span>
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
}
