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

  // ─── Products ───────────────────────────────────────────────────────────

  // 1. Chicken Rice with Vegetables
  const chickenRice = await prisma.product.upsert({
    where: { slug: 'chicken-rice-with-vegetables' },
    update: {},
    create: {
      categoryId: meals.id,
      name: 'Chicken Rice with Vegetables',
      slug: 'chicken-rice-with-vegetables',
      shortDescription: 'Complete fresh meal with real chicken, rice, and garden vegetables. Enriched with amla & flax seed.',
      description: 'A wholesome, ready-to-eat meal crafted with real chicken as the primary ingredient, combined with nutritious rice, pumpkin, sweet potato, carrot, and green peas. Enriched with the goodness of amla and flax seed for immunity and digestion support. Made with human-grade ingredients — no artificial colors, flavors, or preservatives.',
      keyBenefits: [
        'Real chicken as #1 ingredient',
        'High protein for muscle health',
        'Amla & flax seed for immunity',
        'Easy to digest',
        'No added preservatives',
        'Human-grade ingredients',
      ],
      ingredients: 'Chicken, Rice, Pumpkin, Sweet Potato, Carrot, Green Peas, Amla, Flax Seed, Fish Oil, Minerals & Vitamins.',
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
      dietChangeGuide: 'Introduce Furbowl gradually over 7 days to help your pet adjust to the new food. Day 1-2: 25%, Day 3-4: 50%, Day 5-6: 75%, Day 7: 100%',
      suitableFor: 'Puppy & Adult Dogs – All Breeds & Sizes',
      lifeStages: ['puppy', 'adult'],
      foodType: 'WET',
      isVeg: false,
      isFeatured: true,
      sortOrder: 1,
      metaTitle: 'Chicken Rice with Vegetables | Fresh Dog Food | FurBowl',
      metaDescription: 'Ready-to-eat chicken rice with vegetables for dogs. Made with real chicken, amla & flax seed. No preservatives. Shop FurBowl fresh dog food.',
    },
  });

  await prisma.productVariant.upsert({
    where: { sku: 'FB-CRV-100G' },
    update: {},
    create: {
      productId: chickenRice.id,
      sku: 'FB-CRV-100G',
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
    where: { id: 'img-crv-1' },
    update: {},
    create: {
      id: 'img-crv-1',
      productId: chickenRice.id,
      url: '/images/products/chicken-rice-front.jpg',
      altText: 'FurBowl Chicken Rice with Vegetables - Front',
      sortOrder: 1,
      isPrimary: true,
    },
  });

  await prisma.productImage.upsert({
    where: { id: 'img-crv-2' },
    update: {},
    create: {
      id: 'img-crv-2',
      productId: chickenRice.id,
      url: '/images/products/chicken-rice-back.jpg',
      altText: 'FurBowl Chicken Rice with Vegetables - Back with nutritional info',
      sortOrder: 2,
      isPrimary: false,
    },
  });

  // 2. Chicken Broth
  const chickenBroth = await prisma.product.upsert({
    where: { slug: 'chicken-broth' },
    update: {},
    create: {
      categoryId: broth.id,
      name: 'Chicken Broth',
      slug: 'chicken-broth',
      shortDescription: 'Warm, nourishing bone broth made with real chicken bones and apple cider vinegar. Easy to digest.',
      description: 'A warm, nourishing bone broth made from real chicken bones, chicken neck, and chicken feet, simmered with apple cider vinegar to extract maximum nutrition. This hydrating supplement supports digestion, joint health, and overall well-being. Can be served warm or at room temperature.',
      keyBenefits: [
        'Real bone broth — not powder-based',
        'Supports digestion',
        'Hydrating & nourishing',
        'Joint health support',
        'No added preservatives',
        'Easy to digest',
      ],
      ingredients: 'Chicken Bones, Chicken Neck, Chicken Feet, Apple Cider Vinegar, Water.',
      nutritionalInfo: {
        crudeProtein: '<1.0%',
        crudeFat: '<0.5%',
        crudeFiber: '<0.5%',
        moisture: '>98.0%',
        ash: '<2.0%',
      },
      formulation: {
        protein: { min: 1, unit: '%' },
        fat: { min: 0.5, unit: '%' },
        fiber: { max: 0.5, unit: '%' },
        moisture: { max: 98, unit: '%' },
        ash: { max: 2, unit: '%' },
      },
      feedingGuide: [
        { weight: 'Up to 5 kg', daily: '50 – 100 ml' },
        { weight: '5 – 15 kg', daily: '100 – 200 ml' },
        { weight: '15 – 30 kg', daily: '200 – 300 ml' },
        { weight: '30 kg & above', daily: '300+ ml' },
      ],
      suitableFor: 'Puppy & Adult Dogs – All Breeds & Sizes',
      lifeStages: ['puppy', 'adult'],
      foodType: 'BROTH',
      isVeg: false,
      isFeatured: true,
      sortOrder: 2,
      metaTitle: 'Chicken Broth for Dogs | Bone Broth Supplement | FurBowl',
      metaDescription: 'Real chicken bone broth for dogs. Warm, nourishing, and easy to digest. Supports hydration and joint health. Shop FurBowl.',
    },
  });

  await prisma.productVariant.upsert({
    where: { sku: 'FB-CB-200ML' },
    update: {},
    create: {
      productId: chickenBroth.id,
      sku: 'FB-CB-200ML',
      name: '200ml',
      weightValue: 200,
      weightUnit: 'ml',
      mrp: 129,
      sellingPrice: 109,
      discountPercent: 15.5,
      stockQuantity: 80,
      sortOrder: 1,
    },
  });

  await prisma.productImage.upsert({
    where: { id: 'img-cb-1' },
    update: {},
    create: {
      id: 'img-cb-1',
      productId: chickenBroth.id,
      url: '/images/products/chicken-broth-front.jpg',
      altText: 'FurBowl Chicken Broth - Front',
      sortOrder: 1,
      isPrimary: true,
    },
  });

  await prisma.productImage.upsert({
    where: { id: 'img-cb-2' },
    update: {},
    create: {
      id: 'img-cb-2',
      productId: chickenBroth.id,
      url: '/images/products/chicken-broth-back.jpg',
      altText: 'FurBowl Chicken Broth - Back with nutritional info',
      sortOrder: 2,
      isPrimary: false,
    },
  });

  // 3. Paneer Medley
  const paneerMedley = await prisma.product.upsert({
    where: { slug: 'paneer-medley' },
    update: {},
    create: {
      categoryId: meals.id,
      name: 'Paneer Medley',
      slug: 'paneer-medley',
      shortDescription: 'Vegetarian fresh meal with paneer, quinoa, and superfoods. Enriched with chia seed & flax seed.',
      description: 'A delicious vegetarian meal featuring paneer as the primary protein source, combined with quinoa, rice, and a medley of vegetables including carrot, green peas, pumpkin, and spinach. Enriched with yellow dal, chia seed, and flax seed for complete nutrition. Perfect for dogs with poultry sensitivities.',
      keyBenefits: [
        '100% vegetarian',
        'Paneer as primary protein',
        'Quinoa & chia seed superfoods',
        'High protein for muscle health',
        'Easy to digest',
        'No added preservatives',
      ],
      ingredients: 'Paneer, Rice, Quinoa, Carrot, Green Peas, Pumpkin, Spinach, Yellow Dal, Chia Seed, Flax Seed & Minerals.',
      nutritionalInfo: {
        energy: '120 kcal/100g',
        crudeProtein: '12%',
        crudeFat: '6%',
        crudeFiber: '1.5%',
        moisture: '72%',
      },
      formulation: {
        protein: { min: 12, unit: '%' },
        fat: { min: 6, unit: '%' },
        fiber: { max: 1.5, unit: '%' },
        moisture: { max: 72, unit: '%' },
        ash: { max: 2, unit: '%' },
      },
      feedingGuide: [
        { weight: 'Up to 5 kg', daily: '1/2 – 1 pack' },
        { weight: '5 – 15 kg', daily: '1 – 1.5 packs' },
        { weight: '15 – 30 kg', daily: '1.5 – 2 packs' },
        { weight: '30 kg & above', daily: '2.5 – 3.5 packs' },
      ],
      dietChangeGuide: 'Introduce Furbowl gradually over 7 days to help your pet adjust to the new food. Day 1-2: 25%, Day 3-4: 50%, Day 5-6: 75%, Day 7: 100%',
      suitableFor: 'Puppy & Adult Dogs – All Breeds & Sizes',
      lifeStages: ['puppy', 'adult'],
      foodType: 'WET',
      isVeg: true,
      isFeatured: true,
      sortOrder: 3,
      metaTitle: 'Paneer Medley | Vegetarian Dog Food | FurBowl',
      metaDescription: 'Vegetarian fresh dog food with paneer, quinoa & superfoods. High protein, easy to digest. No preservatives. Shop FurBowl.',
    },
  });

  await prisma.productVariant.upsert({
    where: { sku: 'FB-PM-100G' },
    update: {},
    create: {
      productId: paneerMedley.id,
      sku: 'FB-PM-100G',
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
    where: { id: 'img-pm-1' },
    update: {},
    create: {
      id: 'img-pm-1',
      productId: paneerMedley.id,
      url: '/images/products/paneer-medley-front.jpg',
      altText: 'FurBowl Paneer Medley - Front',
      sortOrder: 1,
      isPrimary: true,
    },
  });

  await prisma.productImage.upsert({
    where: { id: 'img-pm-2' },
    update: {},
    create: {
      id: 'img-pm-2',
      productId: paneerMedley.id,
      url: '/images/products/paneer-medley-back.jpg',
      altText: 'FurBowl Paneer Medley - Back with nutritional info',
      sortOrder: 2,
      isPrimary: false,
    },
  });

  // 4. Lamb & Lentils with Vegetables
  const lambLentils = await prisma.product.upsert({
    where: { slug: 'lamb-lentils-with-vegetables' },
    update: {},
    create: {
      categoryId: meals.id,
      name: 'Lamb & Lentils with Vegetables',
      slug: 'lamb-lentils-with-vegetables',
      shortDescription: 'Premium fresh meal with boneless lamb, lentils, and superfoods. Rich in antioxidants & essential nutrients.',
      description: 'A premium, protein-rich meal featuring boneless lamb as the primary ingredient, paired with masoor lentils for sustained energy. Enriched with pumpkin, carrot, sweet potato, peas, lamb liver, flax seeds, fish oil, rosemary, and essential minerals & vitamins. Rich in antioxidants and essential nutrients for overall health.',
      keyBenefits: [
        'Real boneless lamb as #1 ingredient',
        'Lentils for sustained energy',
        'Rich in antioxidants',
        'Rosemary for natural freshness',
        'Lamb liver for organ nutrition',
        'No added preservatives',
      ],
      ingredients: 'Lamb (Boneless), Lentils (Masoor), Pumpkin, Carrot, Sweet Potato, Peas, Lamb Liver, Flax Seeds, Fish Oil, Minerals & Vitamins, Rosemary.',
      nutritionalInfo: {
        energy: '125 kcal/100g',
        crudeProtein: '11%',
        crudeFat: '6%',
        crudeFiber: '1.5%',
        moisture: '76%',
      },
      formulation: {
        protein: { min: 11, unit: '%' },
        fat: { min: 6, unit: '%' },
        fiber: { max: 1.5, unit: '%' },
        moisture: { max: 76, unit: '%' },
        ash: { max: 2, unit: '%' },
      },
      feedingGuide: [
        { weight: 'Up to 5 kg', daily: '1/2 – 1 pack' },
        { weight: '5 – 15 kg', daily: '1 – 1.5 packs' },
        { weight: '15 – 30 kg', daily: '1.5 – 2 packs' },
        { weight: '30 kg & above', daily: '2.5 – 3.5 packs' },
      ],
      dietChangeGuide: 'Introduce Furbowl gradually over 7 days to help your pet adjust to the new food. Day 1-2: 25%, Day 3-4: 50%, Day 5-6: 75%, Day 7: 100%',
      suitableFor: 'Puppy & Adult Dogs – All Breeds & Sizes',
      lifeStages: ['puppy', 'adult'],
      foodType: 'WET',
      isVeg: false,
      isFeatured: true,
      sortOrder: 4,
      metaTitle: 'Lamb & Lentils with Vegetables | Fresh Dog Food | FurBowl',
      metaDescription: 'Premium lamb & lentils fresh dog food with superfoods & herbs. High protein, rich in antioxidants. No preservatives. Shop FurBowl.',
    },
  });

  await prisma.productVariant.upsert({
    where: { sku: 'FB-LLV-100G' },
    update: {},
    create: {
      productId: lambLentils.id,
      sku: 'FB-LLV-100G',
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
    where: { id: 'img-llv-1' },
    update: {},
    create: {
      id: 'img-llv-1',
      productId: lambLentils.id,
      url: '/images/products/lamb-lentils-front.jpg',
      altText: 'FurBowl Lamb & Lentils with Vegetables - Front',
      sortOrder: 1,
      isPrimary: true,
    },
  });

  await prisma.productImage.upsert({
    where: { id: 'img-llv-2' },
    update: {},
    create: {
      id: 'img-llv-2',
      productId: lambLentils.id,
      url: '/images/products/lamb-lentils-back.jpg',
      altText: 'FurBowl Lamb & Lentils with Vegetables - Back with nutritional info',
      sortOrder: 2,
      isPrimary: false,
    },
  });

  // 5. Egg Superfood
  const eggSuperfood = await prisma.product.upsert({
    where: { slug: 'egg-superfood' },
    update: {},
    create: {
      categoryId: meals.id,
      name: 'Egg Superfood',
      slug: 'egg-superfood',
      shortDescription: 'Highest-protein vegetarian meal with egg, quinoa, turmeric & ashwagandha. Superfood-powered nutrition.',
      description: 'Our highest-protein fresh meal, featuring egg as the primary ingredient combined with quinoa, carrot, spinach, sweet potato, and pumpkin. Supercharged with turmeric and ashwagandha for anti-inflammatory benefits and overall vitality. Flax seed adds omega-3 fatty acids for skin & coat health.',
      keyBenefits: [
        'Highest protein (16%) in range',
        'Turmeric & ashwagandha superfoods',
        'Quinoa for complete amino acids',
        'Anti-inflammatory benefits',
        'Omega-3 from flax seed',
        'No added preservatives',
      ],
      ingredients: 'Egg, Quinoa, Carrot, Spinach, Sweet Potato, Pumpkin, Flax Seed, Turmeric, Ashwagandha & Minerals.',
      nutritionalInfo: {
        energy: '130 kcal/100g',
        crudeProtein: '16%',
        crudeFat: '6%',
        crudeFiber: '1.5%',
        moisture: '72%',
      },
      formulation: {
        protein: { min: 16, unit: '%' },
        fat: { min: 6, unit: '%' },
        fiber: { max: 1.5, unit: '%' },
        moisture: { max: 72, unit: '%' },
        ash: { max: 2, unit: '%' },
      },
      feedingGuide: [
        { weight: 'Up to 5 kg', daily: '1/2 – 1 pack' },
        { weight: '5 – 15 kg', daily: '1 – 1.5 packs' },
        { weight: '15 – 30 kg', daily: '1.5 – 2 packs' },
        { weight: '30 kg & above', daily: '2.5 – 3.5 packs' },
      ],
      dietChangeGuide: 'Introduce Furbowl gradually over 7 days to help your pet adjust to the new food. Day 1-2: 25%, Day 3-4: 50%, Day 5-6: 75%, Day 7: 100%',
      suitableFor: 'Puppy & Adult Dogs – All Breeds & Sizes',
      lifeStages: ['puppy', 'adult'],
      foodType: 'WET',
      isVeg: true,
      isFeatured: true,
      sortOrder: 5,
      metaTitle: 'Egg Superfood | High-Protein Dog Food | FurBowl',
      metaDescription: 'Egg superfood fresh dog food with quinoa, turmeric & ashwagandha. 16% protein, anti-inflammatory superfoods. No preservatives. Shop FurBowl.',
    },
  });

  await prisma.productVariant.upsert({
    where: { sku: 'FB-ES-100G' },
    update: {},
    create: {
      productId: eggSuperfood.id,
      sku: 'FB-ES-100G',
      name: '100g',
      weightValue: 100,
      weightUnit: 'g',
      mrp: 109,
      sellingPrice: 99,
      discountPercent: 9.2,
      stockQuantity: 85,
      sortOrder: 1,
    },
  });

  await prisma.productImage.upsert({
    where: { id: 'img-es-1' },
    update: {},
    create: {
      id: 'img-es-1',
      productId: eggSuperfood.id,
      url: '/images/products/egg-superfood-front.jpg',
      altText: 'FurBowl Egg Superfood - Front',
      sortOrder: 1,
      isPrimary: true,
    },
  });

  await prisma.productImage.upsert({
    where: { id: 'img-es-2' },
    update: {},
    create: {
      id: 'img-es-2',
      productId: eggSuperfood.id,
      url: '/images/products/egg-superfood-back.jpg',
      altText: 'FurBowl Egg Superfood - Back with nutritional info',
      sortOrder: 2,
      isPrimary: false,
    },
  });

  console.log('✅ All 5 products created with variants and images');

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
