'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Check, 
  CalendarCheck, 
  Truck, 
  RefreshCw, 
  ShieldCheck, 
  ArrowRight, 
  Star,
  PackageCheck,
  Flame,
  HelpCircle
} from 'lucide-react';
import ScrollReveal from '@/components/common/ScrollReveal';
import useCartStore from '@/store/cartStore';

const MONTHLY_PLANS = [
  {
    id: 'topper-plan',
    name: 'Half-Bowl Topper Plan',
    subtitle: 'Fresh nutrition mixed with your dog\'s current routine',
    mealsCount: '14 Fresh Pouches',
    servingNote: '1 pouch every other day or 1/2 pouch daily topper',
    badge: 'Flexible Starter',
    badgeStyle: 'bg-teal-50 text-teal-800 border-teal-200',
    accentColor: 'text-teal-600',
    cardBorder: 'border-plum-900/10 hover:border-teal-500/50',
    popular: false,
    price: 1199,
    mrp: 1399,
    perMeal: '₹85 / pouch',
    savings: 'Save ₹200 / mo',
    features: [
      '14 fresh single-serve 100g pouches',
      'Choose any mix of chicken, egg, lamb, or paneer',
      'Gently steam-cooked human-grade ingredients',
      'Pause, skip a cycle, or cancel anytime with 1 click',
      'Free temperature-controlled cold-chain delivery',
    ],
    buttonText: 'Subscribe to 14-Pack',
    buttonStyle: 'bg-teal-500 hover:bg-teal-600 text-white',
    image: '/images/home/puppy-trial-tasting.jpg',
  },
  {
    id: 'vitality-plan',
    name: 'Full Fresh Vitality Plan',
    subtitle: '100% fresh, complete daily nutrition for active & happy dogs',
    mealsCount: '28 Fresh Pouches',
    servingNote: '1 pouch daily — complete 4-week supply',
    badge: 'Most Popular • Best Value',
    badgeStyle: 'bg-peach-50 text-peach-700 border-peach-200',
    accentColor: 'text-peach-600',
    cardBorder: 'border-2 border-peach-400 shadow-xl',
    popular: true,
    price: 2299,
    mrp: 2799,
    perMeal: '₹82 / pouch',
    savings: 'Save ₹500 / mo (18% OFF)',
    features: [
      '28 fresh single-serve 100g pouches (4 full weeks)',
      'Curated rotation of all 6 chef-crafted recipes',
      'Bonus 1x slow-simmered bone broth booster included',
      'Priority kitchen batching & guaranteed delivery dates',
      'Pause, skip, or cancel anytime — zero lock-in',
      'Free insulated cold-chain shipping across India',
    ],
    buttonText: 'Get Full Fresh Plan',
    buttonStyle: 'bg-peach-500 hover:bg-peach-600 text-white shadow-md hover:shadow-lg',
    image: '/images/home/furbowl-golden-retriever-feast.jpg',
  },
  {
    id: 'custom-box-plan',
    name: 'Custom 30-Pouch Box',
    subtitle: 'Fully customized recipe box delivered fresh every month',
    mealsCount: '30 Fresh Pouches',
    servingNote: '1 pouch daily plus weekend extra treats',
    badge: '100% Customized',
    badgeStyle: 'bg-teal-50 text-teal-800 border-teal-200',
    accentColor: 'text-teal-600',
    cardBorder: 'border-plum-900/10 hover:border-teal-500/50',
    popular: false,
    price: 2499,
    mrp: 2999,
    perMeal: '₹83 / pouch',
    savings: 'Save ₹500 / mo (17% OFF)',
    features: [
      '30 fresh single-serve pouches of your choice',
      'Select your exact recipe quantities every month',
      'Includes wet stews + collagen bone broths',
      'Personalized feeding schedule for your dog\'s weight',
      'Pause, delay, or cancel anytime from your account',
      'Free insulated delivery with dry ice protection',
    ],
    buttonText: 'Build Custom Monthly Box',
    buttonStyle: 'bg-teal-500 hover:bg-teal-600 text-white',
    image: '/images/products/furbowl-6-products-lineup.jpg',
  },
];

const PERKS = [
  {
    icon: CalendarCheck,
    title: 'Auto-Delivered on Schedule',
    desc: 'Fresh pouches arrive at your door before you run out. No last-minute emergency pet store trips.',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
  },
  {
    icon: Truck,
    title: 'Free Cold-Chain Shipping',
    desc: 'Vacuum-sealed pouches packed in insulated thermal boxes stay frosty cold across all Indian cities.',
    color: 'text-peach-600',
    bg: 'bg-peach-50',
  },
  {
    icon: RefreshCw,
    title: 'Pause, Skip, or Cancel Anytime',
    desc: 'Traveling or have extra food? Pause or skip with 1 click in your account dashboard. Zero lock-in.',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
  },
  {
    icon: ShieldCheck,
    title: 'Save 15% – 20% on Every Box',
    desc: 'Subscribers unlock automatic discounted monthly pricing compared to single pouch retail orders.',
    color: 'text-peach-600',
    bg: 'bg-peach-50',
  },
];

const PLAN_FAQS = [
  {
    q: 'How does the monthly subscription work?',
    a: 'Choose your preferred monthly plan (14, 28, or 30 pouches). Your fresh batch is gently cooked and delivered to your doorstep in cold insulated packs. Your plan renews automatically every 30 days unless you pause or cancel.',
  },
  {
    q: 'Can I change the recipes in my monthly box?',
    a: 'Yes! You can adjust your flavor selections, increase quantities, or add seasonal broths anytime through your account before your next delivery ships.',
  },
  {
    q: 'What if I am traveling or have leftover pouches?',
    a: 'You have complete control. Simply log in and click "Skip Next Delivery" or "Pause Subscription". We will hold shipments until you are ready.',
  },
  {
    q: 'How do I store the pouches once they arrive?',
    a: 'Store the sealed single-serve pouches in your refrigerator or freezer. When it is mealtime, cut the pouch open and pour directly into your dog\'s bowl. No defrosting microwave or cooking required!',
  },
];

export default function PlansPage() {
  const [addedPlanId, setAddedPlanId] = useState(null);
  const addItem = useCartStore((state) => state.addItem);

  const handleSubscribe = (plan) => {
    addItem(
      {
        id: `plan-${plan.id}`,
        name: `FurBowl Monthly: ${plan.name}`,
        slug: 'shop',
        isVeg: plan.id === 'topper-plan',
        images: [{ url: plan.image, altText: plan.name }],
      },
      {
        id: `variant-plan-${plan.id}`,
        mrp: plan.mrp,
        sellingPrice: plan.price,
        size: plan.mealsCount,
      },
      1,
      true // isSubscription flag
    );
    setAddedPlanId(plan.id);
    setTimeout(() => setAddedPlanId(null), 2000);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Header Banner */}
      <section className="bg-[#ffe3db] border-b border-plum-900/5 py-14 sm:py-20">
        <div className="container-main text-center max-w-3xl">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-extrabold uppercase tracking-widest mb-3">
            <span>Monthly Fresh Feeding</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-plum-900 tracking-tight mb-4">
            FurBowl Monthly Plans
          </h1>

          <p className="text-plum-900/70 text-sm sm:text-base leading-relaxed font-normal">
            Never run out of real food. Choose your dog&apos;s monthly fresh batch, enjoy auto-savings of up to 20%, and pause or adjust anytime with complete peace of mind.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-xs font-bold text-plum-900/70">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Free Doorstep Delivery</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-peach-600 shrink-0" />
              <span>Zero Lock-in (Cancel Anytime)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-teal-600 shrink-0" />
              <span>100% Human-Grade Quality</span>
            </span>
          </div>
        </div>
      </section>

      {/* 2. Three Monthly Plan Cards Grid */}
      <section className="py-16 sm:py-24">
        <div className="container-main max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {MONTHLY_PLANS.map((plan, idx) => (
              <ScrollReveal key={plan.id} delay={idx * 90} className="h-full">
                <div
                  className={`bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 relative h-full ${plan.cardBorder}`}
                >
                  {/* Top: Badges & Title */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full border shadow-2xs ${plan.badgeStyle}`}>
                        {plan.badge}
                      </span>
                      <span className="text-xs font-bold text-plum-900/50">
                        {plan.savings}
                      </span>
                    </div>

                    <h2 className="text-2xl font-black text-plum-900 leading-tight mb-1">
                      {plan.name}
                    </h2>
                    <p className="text-xs text-plum-900/65 font-normal leading-relaxed mb-4">
                      {plan.subtitle}
                    </p>

                    {/* Image Window */}
                    <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-cream-100 mb-5 border border-plum-900/5">
                      <Image
                        src={plan.image}
                        alt={plan.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-2.5 left-3 bg-white/95 backdrop-blur-xs text-plum-900 px-2.5 py-0.5 rounded-full text-[11px] font-black shadow-xs">
                        {plan.mealsCount}
                      </div>
                    </div>

                    {/* Price Block */}
                    <div className="p-4 rounded-2xl bg-[#ffe3db] border border-plum-900/5 mb-6">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-plum-900">
                          ₹{plan.price}
                        </span>
                        <span className="text-xs text-plum-900/50 line-through font-semibold">
                          ₹{plan.mrp}
                        </span>
                        <span className="text-xs text-plum-900/70 font-medium">
                          / month
                        </span>
                      </div>
                      <div className="text-[11px] font-bold text-plum-900/60 mt-1">
                        {plan.perMeal} • {plan.servingNote}
                      </div>
                    </div>

                    {/* Feature Checkpoints */}
                    <div className="space-y-3 mb-6">
                      <p className="text-[10px] font-extrabold uppercase tracking-wider text-plum-900/50">
                        What&apos;s Included:
                      </p>
                      {plan.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-xs text-plum-900/80 font-medium leading-snug">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${plan.popular ? 'bg-peach-100 text-peach-600' : 'bg-teal-100 text-teal-600'}`}>
                            <Check className="w-3 h-3 stroke-[2.5]" />
                          </div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Button */}
                  <div className="pt-4 border-t border-plum-900/5">
                    <button
                      type="button"
                      onClick={() => handleSubscribe(plan)}
                      className={`w-full py-3.5 px-6 rounded-full font-bold text-sm transition-all flex items-center justify-center gap-2 ${plan.buttonStyle}`}
                    >
                      {addedPlanId === plan.id ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Plan Added to Cart!</span>
                        </>
                      ) : (
                        <>
                          <span>{plan.buttonText}</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <p className="text-[10px] text-plum-900/40 text-center mt-2">
                      Auto-renews monthly • Cancel anytime with 1 click
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Subscription Perks Grid */}
      <section className="py-16 sm:py-20 bg-[#ffe3db] border-t border-b border-plum-900/5">
        <div className="container-main max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600 block mb-1">
              Hassle-Free Feeding
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-plum-900 tracking-tight">
              Why Subscribe with FurBowl?
            </h2>
            <p className="text-xs sm:text-sm text-plum-900/70 mt-2">
              Designed to take all the friction and stress out of feeding fresh, real dog food.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PERKS.map((perk, idx) => {
              const Icon = perk.icon;
              return (
                <ScrollReveal key={perk.title} delay={idx * 70} className="h-full">
                  <div className="bg-white rounded-2xl p-6 border border-plum-900/10 shadow-xs h-full flex flex-col justify-between">
                    <div>
                      <div className={`w-12 h-12 rounded-xl ${perk.bg} ${perk.color} flex items-center justify-center mb-4`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-bold text-plum-900 mb-1.5">
                        {perk.title}
                      </h3>
                      <p className="text-xs text-plum-900/65 leading-relaxed font-normal">
                        {perk.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Three Steps: How It Works */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container-main max-w-4xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-peach-600 block mb-1">
            Easy Routine
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-plum-900 mb-10">
            How Your Monthly Box Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal delay={0}>
              <div className="p-6 rounded-2xl bg-[#fdfbf7] border border-plum-900/5">
                <div className="w-10 h-10 rounded-full bg-teal-500 text-white font-black text-sm flex items-center justify-center mx-auto mb-3">
                  1
                </div>
                <h3 className="text-base font-bold text-plum-900 mb-1">Select Your Plan</h3>
                <p className="text-xs text-plum-900/65">Pick 14, 28, or 30 pouches calibrated to your dog&apos;s routine and appetite.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={90}>
              <div className="p-6 rounded-2xl bg-[#fdfbf7] border border-plum-900/5">
                <div className="w-10 h-10 rounded-full bg-peach-500 text-white font-black text-sm flex items-center justify-center mx-auto mb-3">
                  2
                </div>
                <h3 className="text-base font-bold text-plum-900 mb-1">Delivered Cold</h3>
                <p className="text-xs text-plum-900/65">Freshly cooked and shipped in cold-insulated thermal boxes straight to your door.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={180}>
              <div className="p-6 rounded-2xl bg-[#fdfbf7] border border-plum-900/5">
                <div className="w-10 h-10 rounded-full bg-teal-500 text-white font-black text-sm flex items-center justify-center mx-auto mb-3">
                  3
                </div>
                <h3 className="text-base font-bold text-plum-900 mb-1">Cut, Pour &amp; Smile</h3>
                <p className="text-xs text-plum-900/65">Tear open single-serve pouches and watch your dog lick the bowl completely clean!</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 5. Frequently Asked Questions */}
      <section className="py-16 sm:py-20 bg-[#ffe3db] border-t border-plum-900/5">
        <div className="container-main max-w-3xl">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600 block mb-1">
              Common Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-plum-900">
              Subscription FAQs
            </h2>
          </div>

          <div className="space-y-4">
            {PLAN_FAQS.map((faq, idx) => (
              <ScrollReveal key={idx} delay={idx * 60}>
                <div className="bg-white rounded-2xl p-5 border border-plum-900/10 shadow-xs">
                  <h3 className="text-sm sm:text-base font-bold text-plum-900 mb-1.5 flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-plum-900/70 leading-relaxed pl-6">
                    {faq.a}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/faq"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800 underline"
            >
              <span>Have more questions? Read our full FAQ page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
