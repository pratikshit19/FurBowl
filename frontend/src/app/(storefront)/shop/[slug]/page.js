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
  // ─── 5 Official Recipes ───
  'chicken-vegetables': {
    id: 'chicken-vegetables',
    name: 'Chicken & Vegetables Wet Dog Food',
    slug: 'chicken-vegetables',
    shortDescription: 'A nutritious wet dog food made with whole chicken, chicken liver, heart and gizzard, combined with pumpkin, carrot, peas and sweet potato.',
    description: 'A nutritious wet dog food made with whole chicken, chicken liver, heart and gizzard, combined with pumpkin, carrot, peas and sweet potato for a wholesome everyday meal.',
    keyBenefits: ['Whole chicken as #1 ingredient', 'Rich in natural organ meats (liver, heart, gizzard)', 'Pumpkin & sweet potato for gentle digestion', '100% human-grade ingredients', 'Zero artificial preservatives'],
    ingredients: 'Whole Chicken, Chicken Liver, Chicken Heart, Chicken Gizzard, Pumpkin, Carrot, Peas, Sweet Potato, Cold-Pressed Flaxseed Oil, Essential Vitamins & Minerals.',
    nutritionalInfo: { energy: '112 kcal/100g', crudeProtein: '10.5%', crudeFat: '5.2%', crudeFiber: '1.4%', moisture: '77%' },
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
    images: [{ url: '/images/products/chicken-harvest-front.jpg', altText: 'Chicken & Vegetables Wet Dog Food' }],
    variants: [{ id: 'v-cv', name: '100g Pouch', mrp: 219, sellingPrice: 199, stockQuantity: 100 }],
  },
  'chicken-rice-vegetables': {
    id: 'chicken-rice-vegetables',
    name: 'Chicken Rice & Vegetables Wet Dog Food',
    slug: 'chicken-rice-vegetables',
    shortDescription: 'A wholesome chicken and rice wet dog food made with whole chicken, chicken liver and heart, along with pumpkin, carrot, peas and sweet potato.',
    description: 'A wholesome chicken and rice wet dog food made with whole chicken, chicken liver and heart, along with pumpkin, carrot, peas and sweet potato.',
    keyBenefits: ['Gentle on delicate stomachs', 'Wholesome rice for easily digestible energy', 'Chicken organ meats for vital nutrients', 'Carrot and pumpkin for gut motility', 'Zero fillers or chemical stabilizers'],
    ingredients: 'Whole Chicken, Chicken Liver, Chicken Heart, Rice, Pumpkin, Carrot, Peas, Sweet Potato, Cold-Pressed Flaxseed Oil, Essential Minerals.',
    nutritionalInfo: { energy: '110 kcal/100g', crudeProtein: '9.8%', crudeFat: '4.8%', crudeFiber: '1.5%', moisture: '78%' },
    feedingGuide: [
      { weight: 'Up to 5 kg', daily: '1/2 – 1 pack' },
      { weight: '5 – 15 kg', daily: '1 – 1.5 packs' },
      { weight: '15 – 30 kg', daily: '1.5 – 2 packs' },
      { weight: '30 kg & above', daily: '2.5 – 3.5 packs' },
    ],
    dietChangeGuide: 'Introduce FurBowl gradually over 7 days.',
    suitableFor: 'Puppy & Adult Dogs – Especially Sensitive Stomachs',
    isVeg: false,
    foodType: 'WET',
    category: { name: 'Meals', slug: 'meals' },
    images: [{ url: '/images/products/chicken-homestyle-front.jpg', altText: 'Chicken Rice & Vegetables Wet Dog Food' }],
    variants: [{ id: 'v-crv', name: '100g Pouch', mrp: 219, sellingPrice: 199, stockQuantity: 100 }],
  },
  'egg-superfood': {
    id: 'egg-superfood',
    name: 'Egg Superfood Wet Dog Food with Quinoa & Vegetables',
    slug: 'egg-superfood',
    shortDescription: 'A nutrient-packed egg wet dog food combining egg and quinoa with sweet potato, pumpkin, spinach, carrots, green peas and zucchini.',
    description: 'A nutrient-packed egg wet dog food combining egg and quinoa with sweet potato, pumpkin, spinach, carrots, green peas and zucchini for a delicious meal.',
    keyBenefits: ['Complete amino acid profile from farm eggs', 'Organic quinoa for sustained play stamina', 'Spinach, zucchini and pumpkin for antioxidants', 'Omega fatty acids for shiny coat', '100% human-grade ingredients'],
    ingredients: 'Egg, Quinoa, Sweet Potato, Pumpkin, Carrot, Spinach, Green Peas, Zucchini, Chia Seeds, Flaxseed Oil, Essential Vitamins.',
    nutritionalInfo: { energy: '115 kcal/100g', crudeProtein: '11%', crudeFat: '6%', crudeFiber: '2%', moisture: '75%' },
    feedingGuide: [
      { weight: 'Up to 5 kg', daily: '1/2 – 1 pack' },
      { weight: '5 – 15 kg', daily: '1 – 1.5 packs' },
      { weight: '15 – 30 kg', daily: '1.5 – 2 packs' },
      { weight: '30 kg & above', daily: '2.5 – 3.5 packs' },
    ],
    dietChangeGuide: 'Introduce FurBowl gradually over 7 days.',
    suitableFor: 'Puppy & Adult Dogs – All Breeds',
    isVeg: true,
    foodType: 'WET',
    category: { name: 'Meals', slug: 'meals' },
    images: [{ url: '/images/products/golden-egg-quinoa-front.jpg', altText: 'Egg Superfood Wet Dog Food' }],
    variants: [{ id: 'v-es', name: '100g Pouch', mrp: 209, sellingPrice: 189, stockQuantity: 100 }],
  },
  'paneer-vegetables': {
    id: 'paneer-vegetables',
    name: 'Paneer & Vegetables Wet Dog Food',
    slug: 'paneer-vegetables',
    shortDescription: 'A wholesome vegetarian wet dog food made with paneer, rice and nutritious vegetables including pumpkin, carrot, green peas and spinach.',
    description: 'A wholesome vegetarian wet dog food made with paneer, rice and nutritious vegetables including pumpkin, carrot, green peas and spinach.',
    keyBenefits: ['Fresh paneer rich in natural calcium and protein', 'Chia seeds for digestive lubricity and Omega-3', 'Nutrient-dense spinach and carrots', 'Ideal for vegetarian households & sensitive pups', 'Zero artificial colors, flavors or preservatives'],
    ingredients: 'Paneer, Rice, Pumpkin, Carrot, Green Peas, Spinach, Chia Seeds, Cold-Pressed Coconut Oil, Mineral & Vitamin Blend.',
    nutritionalInfo: { energy: '114 kcal/100g', crudeProtein: '9.5%', crudeFat: '6.5%', crudeFiber: '2%', moisture: '76%' },
    feedingGuide: [
      { weight: 'Up to 5 kg', daily: '1/2 – 1 pack' },
      { weight: '5 – 15 kg', daily: '1 – 1.5 packs' },
      { weight: '15 – 30 kg', daily: '1.5 – 2 packs' },
      { weight: '30 kg & above', daily: '2.5 – 3.5 packs' },
    ],
    dietChangeGuide: 'Introduce FurBowl gradually over 7 days.',
    suitableFor: 'Puppy & Adult Dogs – All Breeds',
    isVeg: true,
    foodType: 'WET',
    category: { name: 'Meals', slug: 'meals' },
    images: [{ url: '/images/products/paneer-greens-front.jpg', altText: 'Paneer & Vegetables Wet Dog Food' }],
    variants: [{ id: 'v-pv', name: '100g Pouch', mrp: 209, sellingPrice: 189, stockQuantity: 100 }],
  },
  'lamb-lentils': {
    id: 'lamb-lentils',
    name: 'Lamb & Lentils Wet Dog Food with Vegetables',
    slug: 'lamb-lentils',
    shortDescription: 'A hearty lamb wet dog food made with lean lamb meat and lamb liver, combined with red lentils, sweet potato and wholesome vegetables.',
    description: 'A hearty lamb wet dog food made with lean lamb meat and lamb liver, combined with red lentils, sweet potato and wholesome vegetables.',
    keyBenefits: ['Lean pasture lamb & nutrient-rich lamb liver', 'Red lentils for gentle soluble fiber', 'Broccoli, cauliflower and green beans for antioxidants', 'Naturally hypoallergenic red meat source', 'Zero rendered meat meals'],
    ingredients: 'Lean Lamb, Lamb Liver, Red Lentils, Sweet Potato, Carrot, Green Beans, Broccoli, Cauliflower, Sunflower Oil, Chelated Minerals.',
    nutritionalInfo: { energy: '122 kcal/100g', crudeProtein: '12%', crudeFat: '7%', crudeFiber: '1.6%', moisture: '74%' },
    feedingGuide: [
      { weight: 'Up to 5 kg', daily: '1/2 – 1 pack' },
      { weight: '5 – 15 kg', daily: '1 – 1.5 packs' },
      { weight: '15 – 30 kg', daily: '1.5 – 2 packs' },
      { weight: '30 kg & above', daily: '2.5 – 3.5 packs' },
    ],
    dietChangeGuide: 'Introduce FurBowl gradually over 7 days.',
    suitableFor: 'Adult & Senior Dogs – Especially Picky Eaters',
    isVeg: false,
    foodType: 'WET',
    category: { name: 'Meals', slug: 'meals' },
    images: [{ url: '/images/products/lamb-lentil-harvest-front.jpg', altText: 'Lamb & Lentils Wet Dog Food' }],
    variants: [{ id: 'v-ll', name: '100g Pouch', mrp: 249, sellingPrice: 229, stockQuantity: 100 }],
  },

  // ─── Curated Trial Packs ───
  'all-recipes-trial-pack': {
    id: 'all-recipes-trial-pack',
    name: 'All Recipes Wet Dog Food Trial Pack – 5 x 100g',
    slug: 'all-recipes-trial-pack',
    shortDescription: '1 of each recipe (Chicken, Lamb, Egg & Paneer). ⭐ Best first-time discovery pack.',
    description: 'The ultimate tasting discovery pack for first-time FurBowl pups! Contains 1 pouch of all 5 chef-crafted recipes: Chicken & Vegetables, Chicken Rice & Vegetables, Egg Superfood with Quinoa, Paneer & Vegetables, and Lamb & Lentils.',
    keyBenefits: ['1 of each recipe included (5 total pouches)', 'Find your dog’s favorite flavor effortlessly', '100% human-grade whole food ingredients', 'Vacuum-sealed freshness with cold delivery', '100% money-back taste guarantee'],
    ingredients: 'Chicken, Lamb, Egg, Paneer, Pumpkin, Carrot, Sweet Potato, Green Peas, Rice, Quinoa, Spinach, Broccoli, Lentils.',
    nutritionalInfo: { energy: '110–122 kcal/100g', crudeProtein: '9.5% – 12%', crudeFat: '4.8% – 7%', crudeFiber: '1.5%', moisture: '76%' },
    feedingGuide: [
      { weight: 'Up to 5 kg', daily: '1/2 – 1 pack' },
      { weight: '5 – 15 kg', daily: '1 – 1.5 packs' },
      { weight: '15 – 30 kg', daily: '1.5 – 2 packs' },
      { weight: '30 kg & above', daily: '2.5 – 3.5 packs' },
    ],
    dietChangeGuide: 'Feed 1 pouch daily to explore different flavor preferences.',
    suitableFor: 'All Breeds & Life Stages',
    isVeg: false,
    foodType: 'TRIAL_PACK',
    category: { name: 'Trial Packs', slug: 'trial-packs' },
    images: [{ url: '/images/products/chicken-harvest-front.jpg', altText: 'All Recipes Wet Dog Food Trial Pack' }],
    variants: [{ id: 'v-tp-5', name: '5 x 100g Pack', mrp: 599, sellingPrice: 499, stockQuantity: 100 }],
  },
  'chicken-lovers-trial-pack': {
    id: 'chicken-lovers-trial-pack',
    name: 'Chicken Wet Dog Food Trial Pack – 4 x 100g',
    slug: 'chicken-lovers-trial-pack',
    shortDescription: '2x Chicken & Vegetables + 2x Chicken Rice with Vegetables. For poultry lovers.',
    description: 'Designed specifically for dogs who adore classic chicken flavours. Contains 2 pouches of Chicken & Vegetables and 2 pouches of Chicken Rice with Vegetables.',
    keyBenefits: ['2x Chicken & Veg + 2x Chicken Rice', 'Real chicken meat & organ meats', 'Packed with pumpkin, carrots and peas', 'High digestibility protein', 'Gentle on stomachs'],
    ingredients: 'Whole Chicken, Chicken Liver, Chicken Heart, Rice, Pumpkin, Carrot, Green Peas, Sweet Potato.',
    nutritionalInfo: { energy: '110 kcal/100g', crudeProtein: '10%', crudeFat: '5%', crudeFiber: '1.5%', moisture: '77%' },
    feedingGuide: [
      { weight: 'Up to 5 kg', daily: '1/2 – 1 pack' },
      { weight: '5 – 15 kg', daily: '1 – 1.5 packs' },
      { weight: '15 – 30 kg', daily: '1.5 – 2 packs' },
      { weight: '30 kg & above', daily: '2.5 – 3.5 packs' },
    ],
    dietChangeGuide: 'Introduce over 7 days.',
    suitableFor: 'All Breeds & Life Stages',
    isVeg: false,
    foodType: 'TRIAL_PACK',
    category: { name: 'Trial Packs', slug: 'trial-packs' },
    images: [{ url: '/images/products/chicken-homestyle-front.jpg', altText: 'Chicken Wet Dog Food Trial Pack' }],
    variants: [{ id: 'v-tp-4c', name: '4 x 100g Pack', mrp: 479, sellingPrice: 399, stockQuantity: 100 }],
  },
  'meat-lovers-trial-pack': {
    id: 'meat-lovers-trial-pack',
    name: 'Chicken & Lamb Wet Dog Food Trial Pack – 4 x 100g',
    slug: 'meat-lovers-trial-pack',
    shortDescription: '1x Chicken & Veg + 1x Chicken Rice + 2x Lamb & Lentils. Protein-focused.',
    description: 'A protein-focused power pack pairing succulent chicken with rich pasture lamb and red lentils. Ideal for active dogs and muscle maintenance.',
    keyBenefits: ['1x Chicken Veg, 1x Chicken Rice, 2x Lamb & Lentils', 'High protein red and white meat duo', 'Nutrient-rich liver for natural vitamins', 'Supports stamina and agility', 'Zero meal or byproducts'],
    ingredients: 'Chicken, Lamb, Liver, Pumpkin, Carrot, Red Lentils, Green Peas, Sweet Potato.',
    nutritionalInfo: { energy: '118 kcal/100g', crudeProtein: '11.5%', crudeFat: '6.2%', crudeFiber: '1.5%', moisture: '75%' },
    feedingGuide: [
      { weight: 'Up to 5 kg', daily: '1/2 – 1 pack' },
      { weight: '5 – 15 kg', daily: '1 – 1.5 packs' },
      { weight: '15 – 30 kg', daily: '1.5 – 2 packs' },
      { weight: '30 kg & above', daily: '2.5 – 3.5 packs' },
    ],
    dietChangeGuide: 'Introduce over 7 days.',
    suitableFor: 'Adult & Active Dogs',
    isVeg: false,
    foodType: 'TRIAL_PACK',
    category: { name: 'Trial Packs', slug: 'trial-packs' },
    images: [{ url: '/images/products/lamb-lentil-harvest-front.jpg', altText: 'Chicken & Lamb Wet Dog Food Trial Pack' }],
    variants: [{ id: 'v-tp-4cl', name: '4 x 100g Pack', mrp: 519, sellingPrice: 429, stockQuantity: 100 }],
  },
  'chicken-egg-trial-pack': {
    id: 'chicken-egg-trial-pack',
    name: 'Chicken & Egg Wet Dog Food Trial Pack – 4 x 100g',
    slug: 'chicken-egg-trial-pack',
    shortDescription: '1x Chicken & Veg + 1x Chicken Rice + 2x Egg SuperFood with Quinoa.',
    description: 'Combines comforting chicken recipes with farm-fresh egg and superfood quinoa for optimal coat health and muscle repair.',
    keyBenefits: ['1x Chicken Veg, 1x Chicken Rice, 2x Egg SuperFood', 'Egg choline and Omega fatty acids for fur shine', 'Quinoa complex carbohydrates for sustained energy', 'Gentle on stomachs', 'Zero preservatives'],
    ingredients: 'Chicken, Egg, Pumpkin, Carrot, Green Peas, Quinoa, Spinach, Sweet Potato.',
    nutritionalInfo: { energy: '112 kcal/100g', crudeProtein: '10.5%', crudeFat: '5.5%', crudeFiber: '1.8%', moisture: '76%' },
    feedingGuide: [
      { weight: 'Up to 5 kg', daily: '1/2 – 1 pack' },
      { weight: '5 – 15 kg', daily: '1 – 1.5 packs' },
      { weight: '15 – 30 kg', daily: '1.5 – 2 packs' },
      { weight: '30 kg & above', daily: '2.5 – 3.5 packs' },
    ],
    dietChangeGuide: 'Introduce over 7 days.',
    suitableFor: 'Puppy & Adult Dogs',
    isVeg: false,
    foodType: 'TRIAL_PACK',
    category: { name: 'Trial Packs', slug: 'trial-packs' },
    images: [{ url: '/images/products/golden-egg-quinoa-front.jpg', altText: 'Chicken & Egg Wet Dog Food Trial Pack' }],
    variants: [{ id: 'v-tp-4ce', name: '4 x 100g Pack', mrp: 479, sellingPrice: 399, stockQuantity: 100 }],
  },
  'meat-veggie-variety-pack': {
    id: 'meat-veggie-variety-pack',
    name: 'Meat & Veggie Wet Dog Food Trial Pack – 6 x 100g',
    slug: 'meat-veggie-variety-pack',
    shortDescription: '2x Chicken Veg + 1x Chicken Rice + 1x Lamb + 1x Egg + 1x Paneer.',
    description: 'Our most comprehensive tasting pack featuring 6 pouches. Includes an extra pouch of our bestselling Chicken & Vegetables alongside Lamb, Egg, Paneer, and Chicken Rice.',
    keyBenefits: ['6 pouches total: 2x Chicken Veg + 1 of each other flavor', 'Complete variety across all poultry, meat & veg proteins', 'High bioavailability and 100% human-grade whole foods', 'Ideal for multifold taste exploration', 'Vacuum sealed freshness'],
    ingredients: 'Chicken, Lamb, Egg, Paneer, Pumpkin, Carrot, Sweet Potato, Peas, Rice, Quinoa, Spinach.',
    nutritionalInfo: { energy: '112–122 kcal/100g', crudeProtein: '9.5% – 12%', crudeFat: '5% – 7%', crudeFiber: '1.6%', moisture: '76%' },
    feedingGuide: [
      { weight: 'Up to 5 kg', daily: '1/2 – 1 pack' },
      { weight: '5 – 15 kg', daily: '1 – 1.5 packs' },
      { weight: '15 – 30 kg', daily: '1.5 – 2 packs' },
      { weight: '30 kg & above', daily: '2.5 – 3.5 packs' },
    ],
    dietChangeGuide: 'Introduce over 7 days.',
    suitableFor: 'All Breeds & Life Stages',
    isVeg: false,
    foodType: 'TRIAL_PACK',
    category: { name: 'Trial Packs', slug: 'trial-packs' },
    images: [{ url: '/images/products/chicken-harvest-front.jpg', altText: 'Meat & Veggie Wet Dog Food Trial Pack' }],
    variants: [{ id: 'v-tp-6mv', name: '6 x 100g Pack', mrp: 699, sellingPrice: 579, stockQuantity: 100 }],
  },

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
