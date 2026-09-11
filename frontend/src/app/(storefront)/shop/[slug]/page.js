import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProductDetail from '@/components/product/ProductDetail';
import ProductGrid from '@/components/product/ProductGrid';

// Placeholder for when API is unavailable
const MOCK_PRODUCTS = {
  'chicken-harvest': {
    id: '1',
    name: 'Chicken Harvest',
    slug: 'chicken-harvest',
    shortDescription: 'Wholesome nutrition with real chicken, pumpkin & garden veggies.',
    description: 'A vibrant, complete meal made with high-protein fresh chicken, pumpkin, sweet potatoes, and farm-fresh carrots. Packed with wholesome nutrition and zero artificial preservatives to keep your dog energized and thriving.',
    keyBenefits: ['Real chicken as #1 ingredient', 'Complete & balanced nutrition', 'Pumpkin for healthy digestion', '100% human-grade ingredients', 'Zero artificial preservatives'],
    ingredients: 'Fresh Chicken, Pumpkin, Sweet Potato, Carrots, Peas, Brown Rice, Flaxseed Oil, Essential Vitamins & Chelated Minerals.',
    nutritionalInfo: { energy: '110 kcal/100g', crudeProtein: '10%', crudeFat: '5%', crudeFiber: '1.5%', moisture: '78%' },
    feedingGuide: [
      { weight: 'Up to 5 kg', daily: '1/2 – 1 pack' },
      { weight: '5 – 15 kg', daily: '1 – 1.5 packs' },
      { weight: '15 – 30 kg', daily: '1.5 – 2 packs' },
      { weight: '30 kg & above', daily: '2.5 – 3.5 packs' },
    ],
    dietChangeGuide: 'Introduce FurBowl gradually over 7 days to help your pet adjust to the new food.',
    suitableFor: 'Puppy & Adult Dogs – All Breeds & Sizes',
    isVeg: false,
    foodType: 'WET',
    category: { name: 'Meals', slug: 'meals' },
    images: [{ url: '/images/products/chicken-harvest-front.jpg', altText: 'Chicken Harvest' }],
    variants: [{ id: 'v1', name: '100g', mrp: 99, sellingPrice: 89, stockQuantity: 100 }],
  },
  'chicken-homestyle': {
    id: '2',
    name: 'Chicken Homestyle',
    slug: 'chicken-homestyle',
    shortDescription: 'Homestyle slow-cooked chicken with rice, peas & pumpkin.',
    description: 'Inspired by comforting home-cooked meals, Chicken Homestyle combines tender shredded chicken with soft-steamed brown rice, tender green peas, and golden pumpkin. Gentle on the stomach and loved by picky eaters.',
    keyBenefits: ['Gentle on sensitive tummies', 'Lean, bioavailable chicken protein', 'High fiber for digestive regularity', 'Human-grade ingredients', 'Zero fillers or preservatives'],
    ingredients: 'Chicken, Steamed Brown Rice, Green Peas, Pumpkin, Carrots, Cold-Pressed Coconut Oil, Mineral & Vitamin Blend.',
    nutritionalInfo: { energy: '108 kcal/100g', crudeProtein: '9.5%', crudeFat: '4.8%', crudeFiber: '1.8%', moisture: '77%' },
    feedingGuide: [
      { weight: 'Up to 5 kg', daily: '1/2 – 1 pack' },
      { weight: '5 – 15 kg', daily: '1 – 1.5 packs' },
      { weight: '15 – 30 kg', daily: '1.5 – 2 packs' },
      { weight: '30 kg & above', daily: '2.5 – 3.5 packs' },
    ],
    dietChangeGuide: 'Introduce FurBowl gradually over 7 days.',
    suitableFor: 'Puppy & Adult Dogs – All Breeds & Sizes',
    isVeg: false,
    foodType: 'WET',
    category: { name: 'Meals', slug: 'meals' },
    images: [{ url: '/images/products/chicken-homestyle-front.jpg', altText: 'Chicken Homestyle' }],
    variants: [{ id: 'v2', name: '100g', mrp: 99, sellingPrice: 89, stockQuantity: 100 }],
  },
  'golden-egg-quinoa': {
    id: '3',
    name: 'Golden Egg & Quinoa',
    slug: 'golden-egg-quinoa',
    shortDescription: 'Farm-fresh eggs with superfood quinoa & pumpkin for active pups.',
    description: 'A protein-rich vegetarian power bowl combining farm-fresh whole eggs with ancient quinoa, fiber-dense pumpkin, and crisp zucchini. An optimal amino acid profile that builds lean muscle and supports sustained play.',
    keyBenefits: ['Complete amino acid profile from farm eggs', 'Antioxidant-rich quinoa superfood', 'Supports active energy & stamina', 'Omega-3 fatty acids for coat shine', '100% human-grade ingredients'],
    ingredients: 'Whole Farm-Fresh Eggs, Ancient Quinoa, Pumpkin, Zucchini, Chia Seeds, Spinach, Flaxseed, Calcium & Trace Minerals.',
    nutritionalInfo: { energy: '115 kcal/100g', crudeProtein: '11%', crudeFat: '6%', crudeFiber: '2%', moisture: '75%' },
    feedingGuide: [
      { weight: 'Up to 5 kg', daily: '1/2 – 1 pack' },
      { weight: '5 – 15 kg', daily: '1 – 1.5 packs' },
      { weight: '15 – 30 kg', daily: '1.5 – 2 packs' },
      { weight: '30 kg & above', daily: '2.5 – 3.5 packs' },
    ],
    dietChangeGuide: 'Introduce FurBowl gradually over 7 days.',
    suitableFor: 'Puppy & Adult Dogs – All Breeds & Sizes',
    isVeg: true,
    foodType: 'WET',
    category: { name: 'Meals', slug: 'meals' },
    images: [{ url: '/images/products/golden-egg-quinoa-front.jpg', altText: 'Golden Egg & Quinoa' }],
    variants: [{ id: 'v3', name: '100g', mrp: 109, sellingPrice: 99, stockQuantity: 100 }],
  },
  'paneer-greens': {
    id: '4',
    name: 'Paneer & Greens',
    slug: 'paneer-greens',
    shortDescription: 'Fresh paneer cubes with spinach, carrots & green beans.',
    description: 'A delicious vegetarian recipe featuring premium paneer cubes rich in calcium and clean protein, gently tossed with tender spinach, garden green beans, and sweet carrots. Crafted for optimal gut health and glowing coats.',
    keyBenefits: ['Fresh paneer rich in natural calcium', 'Antioxidant greens (spinach & beans)', 'Supports gut health & smooth digestion', 'Ideal for meat-sensitive dogs', 'Zero preservatives or artificial colors'],
    ingredients: 'Fresh Paneer (Cottage Cheese), Baby Spinach, Green Beans, Carrots, Brown Rice, Turmeric, Cold-Pressed Flaxseed Oil, Vitamins & Minerals.',
    nutritionalInfo: { energy: '112 kcal/100g', crudeProtein: '9%', crudeFat: '6.5%', crudeFiber: '2.2%', moisture: '76%' },
    feedingGuide: [
      { weight: 'Up to 5 kg', daily: '1/2 – 1 pack' },
      { weight: '5 – 15 kg', daily: '1 – 1.5 packs' },
      { weight: '15 – 30 kg', daily: '1.5 – 2 packs' },
      { weight: '30 kg & above', daily: '2.5 – 3.5 packs' },
    ],
    dietChangeGuide: 'Introduce FurBowl gradually over 7 days.',
    suitableFor: 'Puppy & Adult Dogs – All Breeds & Sizes',
    isVeg: true,
    foodType: 'WET',
    category: { name: 'Meals', slug: 'meals' },
    images: [{ url: '/images/products/paneer-greens-front.jpg', altText: 'Paneer & Greens' }],
    variants: [{ id: 'v4', name: '100g', mrp: 109, sellingPrice: 99, stockQuantity: 100 }],
  },
  'lamb-lentil-harvest': {
    id: '5',
    name: 'Lamb Lentil Harvest',
    slug: 'lamb-lentil-harvest',
    shortDescription: 'Hearty slow-cooked lamb with red lentils, sweet potato & broccoli.',
    description: 'A nutrient-dense gourmet feast featuring succulent, slow-cooked lamb paired with hearty lentils, vitamin-rich sweet potatoes, and fresh broccoli. Packed with bioavailable iron, zinc, and B-vitamins to build strength and fuel vitality.',
    keyBenefits: ['Rich red meat protein from tender lamb', 'Iron and B-vitamins for stamina', 'Dietary fiber from hearty lentils', 'Supports joint mobility & strength', 'No artificial additives or preservatives'],
    ingredients: 'Fresh Lamb, Red Lentils, Sweet Potato, Broccoli, Green Peas, Sunflower Oil, Rosemary Extract, Essential Vitamins & Chelated Minerals.',
    nutritionalInfo: { energy: '122 kcal/100g', crudeProtein: '12%', crudeFat: '7%', crudeFiber: '1.6%', moisture: '74%' },
    feedingGuide: [
      { weight: 'Up to 5 kg', daily: '1/2 – 1 pack' },
      { weight: '5 – 15 kg', daily: '1 – 1.5 packs' },
      { weight: '15 – 30 kg', daily: '1.5 – 2 packs' },
      { weight: '30 kg & above', daily: '2.5 – 3.5 packs' },
    ],
    dietChangeGuide: 'Introduce FurBowl gradually over 7 days.',
    suitableFor: 'Adult & Senior Dogs – All Breeds',
    isVeg: false,
    foodType: 'WET',
    category: { name: 'Meals', slug: 'meals' },
    images: [{ url: '/images/products/lamb-lentil-harvest-front.jpg', altText: 'Lamb Lentil Harvest' }],
    variants: [{ id: 'v5', name: '100g', mrp: 119, sellingPrice: 109, stockQuantity: 100 }],
  },
  'golden-chicken-broth': {
    id: '6',
    name: 'Golden Chicken Broth',
    slug: 'golden-chicken-broth',
    shortDescription: 'Warm bone broth for hydration, digestion & joint care.',
    description: 'Slow-simmered for over 12 hours with chicken bones, sweet carrots, fresh herbs, and a touch of turmeric. Collagen-rich broth that promotes flexible joints, soothes sensitive stomachs, and turns everyday meals into an irresistible treat.',
    keyBenefits: ['Rich in natural collagen & gelatin', 'Supports joint flexibility & gut lining', 'Boosts daily hydration naturally', 'Tempting aroma for picky eaters', '100% natural, no preservatives'],
    ingredients: 'Slow-Simmered Chicken Bone Broth, Fresh Carrots, Turmeric, Parsley, Apple Cider Vinegar.',
    nutritionalInfo: { energy: '35 kcal/100g', crudeProtein: '4.5%', crudeFat: '1.2%', crudeFiber: '0.2%', moisture: '92%' },
    feedingGuide: [
      { weight: 'Up to 5 kg', daily: '50 – 100 ml as topper' },
      { weight: '5 – 15 kg', daily: '100 – 150 ml as topper' },
      { weight: '15 – 30 kg', daily: '150 – 200 ml as topper' },
      { weight: '30 kg & above', daily: '200 – 300 ml as topper' },
    ],
    dietChangeGuide: 'Can be added directly to food or served warm alone.',
    suitableFor: 'All Dogs & Puppies – Especially Picky Eaters & Seniors',
    isVeg: false,
    foodType: 'BROTH',
    category: { name: 'Broth', slug: 'broth' },
    images: [{ url: '/images/products/golden-chicken-broth-front.jpg', altText: 'Golden Chicken Broth' }],
    variants: [{ id: 'v6', name: '100g', mrp: 129, sellingPrice: 109, stockQuantity: 100 }],
  },
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
    const fallback = MOCK_PRODUCTS[slug] || MOCK_PRODUCTS['chicken-harvest'];
    const related = Object.values(MOCK_PRODUCTS).filter((p) => p.slug !== slug);
    return { product: fallback, relatedProducts: related };
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
      <div className="bg-white border-b border-plum-900/10">
        <div className="container-main py-3.5">
          <nav className="text-xs md:text-sm text-plum-900/60" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 flex-wrap">
              <li><Link href="/" className="hover:text-coral-500 transition-colors">Home</Link></li>
              <li aria-hidden="true" className="text-plum-900/30">/</li>
              <li><Link href="/shop" className="hover:text-coral-500 transition-colors">Shop</Link></li>
              {product.category && (
                <>
                  <li aria-hidden="true" className="text-plum-900/30">/</li>
                  <li>
                    <Link href={`/shop?category=${product.category.slug}`} className="hover:text-coral-500 transition-colors capitalize">
                      {product.category.name}
                    </Link>
                  </li>
                </>
              )}
              <li aria-hidden="true" className="text-plum-900/30">/</li>
              <li className="text-plum-900 font-semibold truncate max-w-xs" aria-current="page">{product.name}</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <ProductDetail product={product} />

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="section-padding bg-[#f0fafb]/40 border-t border-plum-900/10" aria-labelledby="related-products-heading">
          <div className="container-main">
            <h2 id="related-products-heading" className="text-2xl font-extrabold text-plum-900 tracking-tight mb-8">
              You Might Also Like
            </h2>
            <ProductGrid products={relatedProducts} />
          </div>
        </section>
      )}
    </>
  );
}
