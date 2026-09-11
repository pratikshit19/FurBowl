import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding FurBowl database...\n');

  // ─── Admin User ─────────────────────────────────────────────────────────
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { phone: '9999999999' },
    update: {},
    create: {
      phone: '9999999999',
      email: 'admin@furbowl.in',
      name: 'FurBowl Admin',
      passwordHash: adminPassword,
      role: 'ADMIN',
      phoneVerified: true,
      emailVerified: true,
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // ─── Categories ─────────────────────────────────────────────────────────
  const meals = await prisma.category.upsert({
    where: { slug: 'meals' },
    update: {},
    create: {
      name: 'Meals',
      slug: 'meals',
      description: 'Complete ready-to-eat fresh meals for your dog. Made with real ingredients, high protein, and no preservatives.',
      sortOrder: 1,
    },
  });

  const broth = await prisma.category.upsert({
    where: { slug: 'broth' },
    update: {},
    create: {
      name: 'Broth',
      slug: 'broth',
      description: 'Warm, nourishing bone broth — a hydrating supplement your dog will love.',
      sortOrder: 2,
    },
  });
  console.log('✅ Categories created: Meals, Broth');

  // ─── Products (6 Core Packaging Lineup) ───────────────────────────────────

  // 1. Chicken Harvest
  const chickenHarvest = await prisma.product.upsert({
    where: { slug: 'chicken-harvest' },
    update: {},
    create: {
      categoryId: meals.id,
      name: 'Chicken Harvest',
      slug: 'chicken-harvest',
      shortDescription: 'Wholesome nutrition with real chicken, pumpkin & garden veggies.',
      description: 'A vibrant, complete meal made with high-protein fresh chicken, pumpkin, sweet potatoes, and farm-fresh carrots. Packed with wholesome nutrition and zero artificial preservatives to keep your dog energized and thriving.',
      keyBenefits: [
        'Real chicken as #1 ingredient',
        'Complete & balanced nutrition',
        'Pumpkin for healthy digestion',
        '100% human-grade ingredients',
        'Zero artificial preservatives',
      ],
      ingredients: 'Fresh Chicken, Pumpkin, Sweet Potato, Carrots, Peas, Brown Rice, Flaxseed Oil, Essential Vitamins & Chelated Minerals.',
      nutritionalInfo: {
        energy: '110 kcal/100g',
        crudeProtein: '10%',
        crudeFat: '5%',
        crudeFiber: '1.5%',
        moisture: '78%',
      },
      formulation: {
        protein: { min: 10, unit: '%' },
        fat: { min: 5, unit: '%' },
        fiber: { max: 1.5, unit: '%' },
        moisture: { max: 78, unit: '%' },
        ash: { max: 2, unit: '%' },
      },
      feedingGuide: [
        { weight: 'Up to 5 kg', daily: '1/2 – 1 pack' },
        { weight: '5 – 15 kg', daily: '1 – 1.5 packs' },
        { weight: '15 – 30 kg', daily: '1.5 – 2 packs' },
        { weight: '30 kg & above', daily: '2.5 – 3.5 packs' },
      ],
      dietChangeGuide: 'Introduce FurBowl gradually over 7 days to help your pet adjust to the new food.',
      suitableFor: 'Puppy & Adult Dogs – All Breeds & Sizes',
      lifeStages: ['puppy', 'adult'],
      foodType: 'WET',
      isVeg: false,
      isFeatured: true,
      sortOrder: 1,
      metaTitle: 'Chicken Harvest | Fresh Dog Food | FurBowl',
      metaDescription: 'Wholesome Chicken Harvest fresh dog food. Real chicken, pumpkin, sweet potato & carrots. Shop FurBowl.',
    },
  });

  await prisma.productVariant.upsert({
    where: { sku: 'FB-CH-100G' },
    update: {},
    create: {
      productId: chickenHarvest.id,
      sku: 'FB-CH-100G',
      name: '100g',
      weightValue: 100,
      weightUnit: 'g',
      mrp: 99,
      sellingPrice: 89,
      discountPercent: 10.1,
      stockQuantity: 100,
      sortOrder: 1,
    },
  });

  await prisma.productImage.upsert({
    where: { id: 'img-ch-1' },
    update: {},
    create: {
      id: 'img-ch-1',
      productId: chickenHarvest.id,
      url: '/images/products/chicken-harvest-front.jpg',
      altText: 'FurBowl Chicken Harvest - Front',
      sortOrder: 1,
      isPrimary: true,
    },
  });

  // 2. Chicken Homestyle
  const chickenHomestyle = await prisma.product.upsert({
    where: { slug: 'chicken-homestyle' },
    update: {},
    create: {
      categoryId: meals.id,
      name: 'Chicken Homestyle',
      slug: 'chicken-homestyle',
      shortDescription: 'Homestyle slow-cooked chicken with rice, peas & pumpkin.',
      description: 'Inspired by comforting home-cooked meals, Chicken Homestyle combines tender shredded chicken with soft-steamed brown rice, tender green peas, and golden pumpkin. Gentle on the stomach and loved by picky eaters.',
      keyBenefits: [
        'Gentle on sensitive tummies',
        'Lean, bioavailable chicken protein',
        'High fiber for digestive regularity',
        'Human-grade ingredients',
        'Zero fillers or preservatives',
      ],
      ingredients: 'Chicken, Steamed Brown Rice, Green Peas, Pumpkin, Carrots, Cold-Pressed Coconut Oil, Mineral & Vitamin Blend.',
      nutritionalInfo: {
        energy: '108 kcal/100g',
        crudeProtein: '9.5%',
        crudeFat: '4.8%',
        crudeFiber: '1.8%',
        moisture: '77%',
      },
      formulation: {
        protein: { min: 9.5, unit: '%' },
        fat: { min: 4.8, unit: '%' },
        fiber: { max: 1.8, unit: '%' },
        moisture: { max: 77, unit: '%' },
        ash: { max: 2, unit: '%' },
      },
      feedingGuide: [
        { weight: 'Up to 5 kg', daily: '1/2 – 1 pack' },
        { weight: '5 – 15 kg', daily: '1 – 1.5 packs' },
        { weight: '15 – 30 kg', daily: '1.5 – 2 packs' },
        { weight: '30 kg & above', daily: '2.5 – 3.5 packs' },
      ],
      dietChangeGuide: 'Introduce FurBowl gradually over 7 days.',
      suitableFor: 'Puppy & Adult Dogs – All Breeds & Sizes',
      lifeStages: ['puppy', 'adult'],
      foodType: 'WET',
      isVeg: false,
      isFeatured: true,
      sortOrder: 2,
      metaTitle: 'Chicken Homestyle | Fresh Dog Food | FurBowl',
      metaDescription: 'Comforting Chicken Homestyle fresh dog food with rice, peas and pumpkin. 100% human grade. Shop FurBowl.',
    },
  });

  await prisma.productVariant.upsert({
    where: { sku: 'FB-CHS-100G' },
    update: {},
    create: {
      productId: chickenHomestyle.id,
      sku: 'FB-CHS-100G',
      name: '100g',
      weightValue: 100,
      weightUnit: 'g',
      mrp: 99,
      sellingPrice: 89,
      discountPercent: 10.1,
      stockQuantity: 100,
      sortOrder: 1,
    },
  });

  await prisma.productImage.upsert({
    where: { id: 'img-chs-1' },
    update: {},
    create: {
      id: 'img-chs-1',
      productId: chickenHomestyle.id,
      url: '/images/products/chicken-homestyle-front.jpg',
      altText: 'FurBowl Chicken Homestyle - Front',
      sortOrder: 1,
      isPrimary: true,
    },
  });

  // 3. Golden Egg & Quinoa
  const goldenEggQuinoa = await prisma.product.upsert({
    where: { slug: 'golden-egg-quinoa' },
    update: {},
    create: {
      categoryId: meals.id,
      name: 'Golden Egg & Quinoa',
      slug: 'golden-egg-quinoa',
      shortDescription: 'Farm-fresh eggs with superfood quinoa & pumpkin for active pups.',
      description: 'A protein-rich vegetarian power bowl combining farm-fresh whole eggs with ancient quinoa, fiber-dense pumpkin, and crisp zucchini. An optimal amino acid profile that builds lean muscle and supports sustained play.',
      keyBenefits: [
        'Complete amino acid profile from farm eggs',
        'Antioxidant-rich quinoa superfood',
        'Supports active energy & stamina',
        'Omega-3 fatty acids for coat shine',
        '100% human-grade ingredients',
      ],
      ingredients: 'Whole Farm-Fresh Eggs, Ancient Quinoa, Pumpkin, Zucchini, Chia Seeds, Spinach, Flaxseed, Calcium & Trace Minerals.',
      nutritionalInfo: {
        energy: '115 kcal/100g',
        crudeProtein: '11%',
        crudeFat: '6%',
        crudeFiber: '2%',
        moisture: '75%',
      },
      formulation: {
        protein: { min: 11, unit: '%' },
        fat: { min: 6, unit: '%' },
        fiber: { max: 2, unit: '%' },
        moisture: { max: 75, unit: '%' },
        ash: { max: 2, unit: '%' },
      },
      feedingGuide: [
        { weight: 'Up to 5 kg', daily: '1/2 – 1 pack' },
        { weight: '5 – 15 kg', daily: '1 – 1.5 packs' },
        { weight: '15 – 30 kg', daily: '1.5 – 2 packs' },
        { weight: '30 kg & above', daily: '2.5 – 3.5 packs' },
      ],
      dietChangeGuide: 'Introduce FurBowl gradually over 7 days.',
      suitableFor: 'Puppy & Adult Dogs – All Breeds & Sizes',
      lifeStages: ['puppy', 'adult'],
      foodType: 'WET',
      isVeg: true,
      isFeatured: true,
      sortOrder: 3,
      metaTitle: 'Golden Egg & Quinoa | Vegetarian Dog Food | FurBowl',
      metaDescription: 'High-protein egg & quinoa fresh dog food with pumpkin & zucchini. 100% human-grade. Shop FurBowl.',
    },
  });

  await prisma.productVariant.upsert({
    where: { sku: 'FB-GEQ-100G' },
    update: {},
    create: {
      productId: goldenEggQuinoa.id,
      sku: 'FB-GEQ-100G',
      name: '100g',
      weightValue: 100,
      weightUnit: 'g',
      mrp: 109,
      sellingPrice: 99,
      discountPercent: 9.2,
      stockQuantity: 90,
      sortOrder: 1,
    },
  });

  await prisma.productImage.upsert({
    where: { id: 'img-geq-1' },
    update: {},
    create: {
      id: 'img-geq-1',
      productId: goldenEggQuinoa.id,
      url: '/images/products/golden-egg-quinoa-front.jpg',
      altText: 'FurBowl Golden Egg & Quinoa - Front',
      sortOrder: 1,
      isPrimary: true,
    },
  });

  // 4. Paneer & Greens
  const paneerGreens = await prisma.product.upsert({
    where: { slug: 'paneer-greens' },
    update: {},
    create: {
      categoryId: meals.id,
      name: 'Paneer & Greens',
      slug: 'paneer-greens',
      shortDescription: 'Fresh paneer cubes with spinach, carrots & green beans.',
      description: 'A delicious vegetarian recipe featuring premium paneer cubes rich in calcium and clean protein, gently tossed with tender spinach, garden green beans, and sweet carrots. Crafted for optimal gut health and glowing coats.',
      keyBenefits: [
        'Fresh paneer rich in natural calcium',
        'Antioxidant greens (spinach & beans)',
        'Supports gut health & smooth digestion',
        'Ideal for meat-sensitive dogs',
        'Zero preservatives or artificial colors',
      ],
      ingredients: 'Fresh Paneer (Cottage Cheese), Baby Spinach, Green Beans, Carrots, Brown Rice, Turmeric, Cold-Pressed Flaxseed Oil, Vitamins & Minerals.',
      nutritionalInfo: {
        energy: '112 kcal/100g',
        crudeProtein: '9%',
        crudeFat: '6.5%',
        crudeFiber: '2.2%',
        moisture: '76%',
      },
      formulation: {
        protein: { min: 9, unit: '%' },
        fat: { min: 6.5, unit: '%' },
        fiber: { max: 2.2, unit: '%' },
        moisture: { max: 76, unit: '%' },
        ash: { max: 2, unit: '%' },
      },
      feedingGuide: [
        { weight: 'Up to 5 kg', daily: '1/2 – 1 pack' },
        { weight: '5 – 15 kg', daily: '1 – 1.5 packs' },
        { weight: '15 – 30 kg', daily: '1.5 – 2 packs' },
        { weight: '30 kg & above', daily: '2.5 – 3.5 packs' },
      ],
      dietChangeGuide: 'Introduce FurBowl gradually over 7 days.',
      suitableFor: 'Puppy & Adult Dogs – All Breeds & Sizes',
      lifeStages: ['puppy', 'adult'],
      foodType: 'WET',
      isVeg: true,
      isFeatured: true,
      sortOrder: 4,
      metaTitle: 'Paneer & Greens | Vegetarian Dog Food | FurBowl',
      metaDescription: 'Vegetarian fresh dog food with paneer, spinach, carrots & green beans. Calcium-rich. Shop FurBowl.',
    },
  });

  await prisma.productVariant.upsert({
    where: { sku: 'FB-PG-100G' },
    update: {},
    create: {
      productId: paneerGreens.id,
      sku: 'FB-PG-100G',
      name: '100g',
      weightValue: 100,
      weightUnit: 'g',
      mrp: 109,
      sellingPrice: 99,
      discountPercent: 9.2,
      stockQuantity: 90,
      sortOrder: 1,
    },
  });

  await prisma.productImage.upsert({
    where: { id: 'img-pg-1' },
    update: {},
    create: {
      id: 'img-pg-1',
      productId: paneerGreens.id,
      url: '/images/products/paneer-greens-front.jpg',
      altText: 'FurBowl Paneer & Greens - Front',
      sortOrder: 1,
      isPrimary: true,
    },
  });

  // 5. Lamb Lentil Harvest
  const lambLentilHarvest = await prisma.product.upsert({
    where: { slug: 'lamb-lentil-harvest' },
    update: {},
    create: {
      categoryId: meals.id,
      name: 'Lamb Lentil Harvest',
      slug: 'lamb-lentil-harvest',
      shortDescription: 'Hearty slow-cooked lamb with red lentils, sweet potato & broccoli.',
      description: 'A nutrient-dense gourmet feast featuring succulent, slow-cooked lamb paired with hearty lentils, vitamin-rich sweet potatoes, and fresh broccoli. Packed with bioavailable iron, zinc, and B-vitamins to build strength and fuel vitality.',
      keyBenefits: [
        'Rich red meat protein from tender lamb',
        'Iron and B-vitamins for stamina',
        'Dietary fiber from hearty lentils',
        'Supports joint mobility & strength',
        'No artificial additives or preservatives',
      ],
      ingredients: 'Fresh Lamb, Red Lentils, Sweet Potato, Broccoli, Green Peas, Sunflower Oil, Rosemary Extract, Essential Vitamins & Chelated Minerals.',
      nutritionalInfo: {
        energy: '122 kcal/100g',
        crudeProtein: '12%',
        crudeFat: '7%',
        crudeFiber: '1.6%',
        moisture: '74%',
      },
      formulation: {
        protein: { min: 12, unit: '%' },
        fat: { min: 7, unit: '%' },
        fiber: { max: 1.6, unit: '%' },
        moisture: { max: 74, unit: '%' },
        ash: { max: 2, unit: '%' },
      },
      feedingGuide: [
        { weight: 'Up to 5 kg', daily: '1/2 – 1 pack' },
        { weight: '5 – 15 kg', daily: '1 – 1.5 packs' },
        { weight: '15 – 30 kg', daily: '1.5 – 2 packs' },
        { weight: '30 kg & above', daily: '2.5 – 3.5 packs' },
      ],
      dietChangeGuide: 'Introduce FurBowl gradually over 7 days.',
      suitableFor: 'Adult & Senior Dogs – All Breeds',
      lifeStages: ['puppy', 'adult'],
      foodType: 'WET',
      isVeg: false,
      isFeatured: true,
      sortOrder: 5,
      metaTitle: 'Lamb Lentil Harvest | Premium Dog Food | FurBowl',
      metaDescription: 'Hearty slow-cooked lamb with red lentils, sweet potato & broccoli. High iron and protein. Shop FurBowl.',
    },
  });

  await prisma.productVariant.upsert({
    where: { sku: 'FB-LLH-100G' },
    update: {},
    create: {
      productId: lambLentilHarvest.id,
      sku: 'FB-LLH-100G',
      name: '100g',
      weightValue: 100,
      weightUnit: 'g',
      mrp: 119,
      sellingPrice: 109,
      discountPercent: 8.4,
      stockQuantity: 75,
      sortOrder: 1,
    },
  });

  await prisma.productImage.upsert({
    where: { id: 'img-llh-1' },
    update: {},
    create: {
      id: 'img-llh-1',
      productId: lambLentilHarvest.id,
      url: '/images/products/lamb-lentil-harvest-front.jpg',
      altText: 'FurBowl Lamb Lentil Harvest - Front',
      sortOrder: 1,
      isPrimary: true,
    },
  });

  // 6. Golden Chicken Broth
  const goldenChickenBroth = await prisma.product.upsert({
    where: { slug: 'golden-chicken-broth' },
    update: {},
    create: {
      categoryId: broth.id,
      name: 'Golden Chicken Broth',
      slug: 'golden-chicken-broth',
      shortDescription: 'Warm bone broth for hydration, digestion & joint care.',
      description: 'Slow-simmered for over 12 hours with chicken bones, sweet carrots, fresh herbs, and a touch of turmeric. Collagen-rich broth that promotes flexible joints, soothes sensitive stomachs, and turns everyday meals into an irresistible treat.',
      keyBenefits: [
        'Rich in natural collagen & gelatin',
        'Supports joint flexibility & gut lining',
        'Boosts daily hydration naturally',
        'Tempting aroma for picky eaters',
        '100% natural, no preservatives',
      ],
      ingredients: 'Slow-Simmered Chicken Bone Broth, Fresh Carrots, Turmeric, Parsley, Apple Cider Vinegar.',
      nutritionalInfo: {
        energy: '35 kcal/100g',
        crudeProtein: '4.5%',
        crudeFat: '1.2%',
        crudeFiber: '0.2%',
        moisture: '92%',
      },
      formulation: {
        protein: { min: 4.5, unit: '%' },
        fat: { min: 1.2, unit: '%' },
        fiber: { max: 0.2, unit: '%' },
        moisture: { max: 92, unit: '%' },
        ash: { max: 1.5, unit: '%' },
      },
      feedingGuide: [
        { weight: 'Up to 5 kg', daily: '50 – 100 ml as topper' },
        { weight: '5 – 15 kg', daily: '100 – 150 ml as topper' },
        { weight: '15 – 30 kg', daily: '150 – 200 ml as topper' },
        { weight: '30 kg & above', daily: '200 – 300 ml as topper' },
      ],
      dietChangeGuide: 'Can be poured over dry food or served warm alone.',
      suitableFor: 'All Dogs & Puppies – Especially Picky Eaters & Seniors',
      lifeStages: ['puppy', 'adult'],
      foodType: 'BROTH',
      isVeg: false,
      isFeatured: true,
      sortOrder: 6,
      metaTitle: 'Golden Chicken Broth | Bone Broth Supplement | FurBowl',
      metaDescription: 'Slow-simmered chicken bone broth for dogs with turmeric and carrots. Supports joint care & hydration. Shop FurBowl.',
    },
  });

  await prisma.productVariant.upsert({
    where: { sku: 'FB-GCB-100G' },
    update: {},
    create: {
      productId: goldenChickenBroth.id,
      sku: 'FB-GCB-100G',
      name: '100g',
      weightValue: 100,
      weightUnit: 'g',
      mrp: 129,
      sellingPrice: 109,
      discountPercent: 15.5,
      stockQuantity: 80,
      sortOrder: 1,
    },
  });

  await prisma.productImage.upsert({
    where: { id: 'img-gcb-1' },
    update: {},
    create: {
      id: 'img-gcb-1',
      productId: goldenChickenBroth.id,
      url: '/images/products/golden-chicken-broth-front.jpg',
      altText: 'FurBowl Golden Chicken Broth - Front',
      sortOrder: 1,
      isPrimary: true,
    },
  });

  console.log('✅ All 6 packaging lineup products created with variants and images');

  // ─── FAQs ───────────────────────────────────────────────────────────────
  const faqs = [
    {
      question: 'What is FurBowl?',
      answer: 'FurBowl is a fresh, ready-to-eat dog food brand made with real, human-grade ingredients. We believe your dog deserves real food — not processed kibble loaded with fillers and preservatives.',
      category: 'General',
      sortOrder: 1,
    },
    {
      question: 'Is FurBowl food cooked or raw?',
      answer: 'All FurBowl meals are fully cooked and ready to eat. Simply cut open the pouch and serve — no cooking, no preparation needed.',
      category: 'General',
      sortOrder: 2,
    },
    {
      question: 'Is FurBowl suitable for puppies?',
      answer: 'Yes! All FurBowl meals are formulated for both puppy and adult dogs of all breeds and sizes. Adjust the portion size based on your dog\'s weight using our feeding guide.',
      category: 'Feeding',
      sortOrder: 3,
    },
    {
      question: 'How should I store FurBowl food?',
      answer: 'Store unopened pouches in a cool, dry place. Once opened, refrigerate and consume within 24 hours for best freshness.',
      category: 'Storage',
      sortOrder: 4,
    },
    {
      question: 'Can I mix FurBowl with my dog\'s current food?',
      answer: 'Yes! We recommend transitioning gradually over 7 days. Start with 25% FurBowl mixed with 75% current food, increasing the ratio every 2 days until your dog is fully on FurBowl.',
      category: 'Feeding',
      sortOrder: 5,
    },
    {
      question: 'Does FurBowl contain any artificial preservatives?',
      answer: 'No. All FurBowl products are free from artificial colors, artificial flavors, and added preservatives. We use only real, natural ingredients.',
      category: 'Ingredients',
      sortOrder: 6,
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 7-day return policy for unopened and undamaged products. If you\'re not satisfied with your purchase, contact us within 7 days of delivery for a refund or replacement.',
      category: 'Orders',
      sortOrder: 7,
    },
    {
      question: 'Do you offer free shipping?',
      answer: 'Yes! We offer free shipping on all orders above ₹499. Orders below ₹499 have a flat shipping fee of ₹49.',
      category: 'Shipping',
      sortOrder: 8,
    },
  ];

  for (const faq of faqs) {
    await prisma.fAQ.upsert({
      where: { id: faq.sortOrder.toString() },
      update: faq,
      create: { ...faq, id: faq.sortOrder.toString() },
    });
  }
  console.log('✅ FAQs created');

  // ─── Hero Banners ───────────────────────────────────────────────────────
  await prisma.heroBanner.upsert({
    where: { id: 'banner-1' },
    update: {},
    create: {
      id: 'banner-1',
      title: 'Real Food. Pure Love.',
      subtitle: 'Fresh, ready-to-eat meals made with human-grade ingredients your dog will love.',
      ctaText: 'Shop Now',
      ctaLink: '/shop',
      desktopImageUrl: '/images/banners/hero-desktop-1.jpg',
      mobileImageUrl: '/images/banners/hero-mobile-1.jpg',
      sortOrder: 1,
      isActive: true,
    },
  });

  await prisma.heroBanner.upsert({
    where: { id: 'banner-2' },
    update: {},
    create: {
      id: 'banner-2',
      title: 'Find the Perfect Food',
      subtitle: 'Take our quick quiz and discover the ideal FurBowl meal for your dog.',
      ctaText: 'Take the Quiz',
      ctaLink: '/find-food',
      desktopImageUrl: '/images/banners/hero-desktop-2.jpg',
      mobileImageUrl: '/images/banners/hero-mobile-2.jpg',
      sortOrder: 2,
      isActive: true,
    },
  });
  console.log('✅ Hero banners created');

  console.log('\n🎉 Seed complete!\n');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
