import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';

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

export default function FeaturedProducts({ products }) {
  const displayProducts = products || PLACEHOLDER_PRODUCTS;

  return (
    <section className="section-padding bg-[#faf6ed]" aria-labelledby="featured-products-heading">
      <div className="container-main">
        
        {/* Section Header */}
        <div className="text-center mb-10 pb-4 border-b border-plum-900/10">
          <span className="text-coral-500 text-xs font-extrabold uppercase tracking-widest bg-coral-50 px-3.5 py-1 rounded-full inline-block mb-2 border border-coral-100">
            Fresh Meals
          </span>
          <h2 id="featured-products-heading" className="text-3xl sm:text-4xl font-extrabold text-plum-900 tracking-tight mb-2">
            Our Products
          </h2>
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
}
