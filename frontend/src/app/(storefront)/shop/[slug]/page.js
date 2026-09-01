import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProductDetail from '@/components/product/ProductDetail';
import ProductGrid from '@/components/product/ProductGrid';

// Placeholder for when API is unavailable
const PLACEHOLDER_PRODUCT = {
  id: '1',
  name: 'Chicken Rice with Vegetables',
  slug: 'chicken-rice-with-vegetables',
  shortDescription: 'Complete fresh meal with real chicken, rice, and garden vegetables.',
  description: 'A wholesome, ready-to-eat meal crafted with real chicken as the primary ingredient, combined with nutritious rice, pumpkin, sweet potato, carrot, and green peas. Enriched with the goodness of amla and flax seed for immunity and digestion support.',
  keyBenefits: ['Real chicken as #1 ingredient', 'High protein for muscle health', 'Amla & flax seed for immunity', 'Easy to digest', 'No added preservatives'],
  ingredients: 'Chicken, Rice, Pumpkin, Sweet Potato, Carrot, Green Peas, Amla, Flax Seed, Fish Oil, Minerals & Vitamins.',
  nutritionalInfo: { energy: '110 kcal/100g', crudeProtein: '10%', crudeFat: '5%', crudeFiber: '1.5%', moisture: '78%' },
  feedingGuide: [
    { weight: 'Up to 5 kg', daily: '1/2 – 1 pack' },
    { weight: '5 – 15 kg', daily: '1 – 1.5 packs' },
    { weight: '15 – 30 kg', daily: '1.5 – 2 packs' },
    { weight: '30 kg & above', daily: '2.5 – 3.5 packs' },
  ],
  dietChangeGuide: 'Introduce Furbowl gradually over 7 days.',
  suitableFor: 'Puppy & Adult Dogs – All Breeds & Sizes',
  isVeg: false,
  foodType: 'WET',
  category: { name: 'Meals', slug: 'meals' },
  images: [{ url: '/images/products/chicken-rice-front.jpg', altText: 'Chicken Rice Front' }],
  variants: [{ id: 'v1', name: '100g', mrp: 99, sellingPrice: 89, stockQuantity: 100 }],
  reviews: [],
  averageRating: 0,
  reviewCount: 0,
};

async function getProduct(slug) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`,
      { next: { revalidate: 300 } }
    );
    if (res.status === 404) return null;
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    return data;
  } catch {
    return { product: PLACEHOLDER_PRODUCT, relatedProducts: [] };
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await getProduct(slug);
  const product = data?.product;
  if (!product) return { title: 'Product Not Found' };

  return {
    title: product.metaTitle || `${product.name} | Fresh Dog Food`,
    description: product.metaDescription || product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: product.images?.[0] ? [product.images[0].url] : [],
      type: 'website',
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const data = await getProduct(slug);

  if (!data || data === null) notFound();

  const { product, relatedProducts } = data;

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container-main py-3">
          <nav className="text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 flex-wrap">
              <li><Link href="/" className="hover:text-turquoise-600 transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/shop" className="hover:text-turquoise-600 transition-colors">Shop</Link></li>
              {product.category && (
                <>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link href={`/shop?category=${product.category.slug}`} className="hover:text-turquoise-600 transition-colors capitalize">
                      {product.category.name}
                    </Link>
                  </li>
                </>
              )}
              <li aria-hidden="true">/</li>
              <li className="text-gray-900 font-medium truncate max-w-xs" aria-current="page">{product.name}</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <ProductDetail product={product} />

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="section-padding bg-gray-50" aria-labelledby="related-products-heading">
          <div className="container-main">
            <h2 id="related-products-heading" className="text-2xl font-bold text-gray-900 mb-8">
              You Might Also Like
            </h2>
            <ProductGrid products={relatedProducts} />
          </div>
        </section>
      )}
    </>
  );
}
