'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  ChevronDown,
  MessageCircle,
} from 'lucide-react';
import ScrollReveal from '@/components/common/ScrollReveal';

export const FAQ_CATEGORIES = [
  {
    id: 'about',
    label: 'ABOUT FURBOWL',
    faqs: [
      {
        id: 'about-1',
        category: 'ABOUT FURBOWL',
        question: 'What is FURBOWL fresh dog food?',
        answer:
          'FURBOWL is 100% human-grade, ready-to-eat fresh dog food gently steam-cooked using real whole meats, fresh farm vegetables, and essential canine superfoods. It contains zero preservatives, zero meat meals, and zero artificial additives, vacuum-sealed in single-serve 100g pouches for optimal daily nutrition.',
      },
      {
        id: 'about-2',
        category: 'ABOUT FURBOWL',
        question: 'How is FURBOWL different from regular kibble?',
        answer:
          'Unlike dry commercial kibble that is extruded at extreme temperatures (destroying natural enzymes, vitamins, and vital moisture), FURBOWL is gently cooked with real, identifiable whole food ingredients. It retains 75%+ natural moisture, easily digestible proteins, and clean nutrients for healthier digestion, firmer stools, and a shinier coat.',
      },
      {
        id: 'about-3',
        category: 'ABOUT FURBOWL',
        question: 'Is FURBOWL suitable for daily feeding?',
        answer:
          'Yes! Every FURBOWL recipe is formulated by canine nutritionists as a complete and balanced diet meeting daily canine nutritional requirements for puppies, adult dogs, and seniors across all breeds. You can feed it as a 100% full daily meal or as a nutrient-rich fresh topper.',
      },
    ],
  },
  {
    id: 'ingredients',
    label: 'INGREDIENTS & RECIPES',
    faqs: [
      {
        id: 'ing-1',
        category: 'INGREDIENTS & RECIPES',
        question: 'What ingredients do you use?',
        answer:
          'We use exclusively human-grade ingredients that you would eat yourself: whole chicken breast, chicken liver and heart, pasture-raised lamb, farm-fresh eggs, wholesome paneer, sweet potato, pumpkin, carrots, green peas, organic quinoa, cold-pressed oils, and essential canine vitamins & minerals.',
      },
      {
        id: 'ing-2',
        category: 'INGREDIENTS & RECIPES',
        question: 'What recipes are available?',
        answer:
          'We craft 5 core balanced recipes plus a slow-simmered bone broth: Chicken & Vegetables, Chicken Rice & Vegetables, Lamb & Lentils, Egg Superfood with Quinoa, Paneer & Vegetables, and our Golden Chicken Bone Broth for joint hydration.',
      },
      {
        id: 'ing-3',
        category: 'INGREDIENTS & RECIPES',
        question: "Can I choose recipes based on my dog's preferences?",
        answer:
          'Absolutely! You can choose specific single recipes, pick curated preference packs (like Chicken Lovers or Meat Lovers), or use our interactive "Find the Right FurBowl" quiz to calibrate recipes according to your pup’s daily vibe, weight, and protein tolerance.',
      },
    ],
  },
  {
    id: 'packs',
    label: 'PACKS & ORDERS',
    faqs: [
      {
        id: 'packs-1',
        category: 'PACKS & ORDERS',
        question: 'What pack sizes are available?',
        answer:
          'All FURBOWL packs are structured in convenient weekly multiples of 7 single-serve 100g pouches: 7-Pack (1-Week Starter Plan), 14-Pack (2-Week Routine Plan), 21-Pack (3-Week Transformation Plan), and 28-Pack (4-Week Complete Month Plan).',
      },
      {
        id: 'packs-2',
        category: 'PACKS & ORDERS',
        question: 'Can I mix different recipes in one pack?',
        answer:
          'Yes! Our All-Recipes 7-Pack and Variety Multi-Packs come pre-calibrated with an enticing rotational blend of chicken, lamb, egg, and paneer so your dog experiences healthy flavor variety throughout the week without digestive upset.',
      },
      {
        id: 'packs-3',
        category: 'PACKS & ORDERS',
        question: 'Can I buy FURBOWL in bulk?',
        answer:
          'Yes! Our 14-Pack, 21-Pack, and 28-Pack value bundles offer savings of up to 25% OFF. You can also subscribe to flexible monthly deliveries with free temperature-controlled shipping right to your doorstep.',
      },
    ],
  },
  {
    id: 'feeding',
    label: 'FEEDING & STORAGE',
    faqs: [
      {
        id: 'feed-1',
        category: 'FEEDING & STORAGE',
        question: 'How do I introduce FURBOWL to my dog?',
        answer:
          'We recommend a gradual 7-day transition: Days 1–2: 25% FURBOWL + 75% current food; Days 3–4: 50% FURBOWL + 50% current food; Days 5–6: 75% FURBOWL + 25% current food; Day 7 onwards: 100% FURBOWL. This lets your pup’s digestive tract adapt smoothly to real whole food.',
      },
      {
        id: 'feed-2',
        category: 'FEEDING & STORAGE',
        question: 'How should I store FURBOWL?',
        answer:
          'Unopened FURBOWL pouches can be stored in a cool, dry pantry at ambient room temperature thanks to our vacuum retort sterilization technology. No freezing or refrigeration is needed until the pouch is opened.',
      },
      {
        id: 'feed-3',
        category: 'FEEDING & STORAGE',
        question: 'How long does it stay fresh after opening?',
        answer:
          'Once a pouch is opened, transfer any unused food into an airtight container or seal the pouch, store it in your refrigerator, and serve it within 24 to 48 hours for optimal flavor and nutrient integrity.',
      },
    ],
  },
];

export default function ComprehensiveFAQSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openId, setOpenId] = useState('about-1');

  // Filter FAQs based on active category
  const activeFaqs =
    activeCategory === 'all'
      ? FAQ_CATEGORIES.flatMap((c) => c.faqs)
      : FAQ_CATEGORIES.find((c) => c.id === activeCategory)?.faqs || [];

  return (
    <section
      id="faq-section"
      className="py-14 sm:py-20 bg-white border-t border-plum-900/5 relative overflow-hidden"
      aria-labelledby="faq-section-heading"
    >
      <div className="container-main max-w-5xl mx-auto px-4 sm:px-6">
        {/* ─── Section Header ─── */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#15aec0] bg-[#15aec0]/10 border border-[#15aec0]/25 px-3 py-1 rounded-full mb-3 shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FAQs</span>
          </div>

          <h2
            id="faq-section-heading"
            className="text-2xl sm:text-4xl lg:text-[2.6rem] font-bold text-plum-900 tracking-tight leading-tight mb-3"
          >
            Before Choosing FURBOWL
          </h2>

          <p className="text-sm sm:text-base text-plum-900/70 font-normal leading-relaxed">
            Everything you need to know about our fresh meals, ingredients, weekly packs, and feeding instructions.
          </p>
        </div>

        {/* ─── Category Filter Tabs ─── */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-8 sm:mb-10">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-plum-900 text-white shadow-sm ring-2 ring-plum-900/10'
                : 'bg-butter-50/80 text-plum-900/70 border border-plum-900/10 hover:bg-butter-100 hover:text-plum-900'
            }`}
          >
            All Questions (12)
          </button>

          {FAQ_CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-plum-900 text-white shadow-sm ring-2 ring-plum-900/10'
                    : 'bg-butter-50/80 text-plum-900/70 border border-plum-900/10 hover:bg-butter-100 hover:text-plum-900'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* ─── Accordion Questions Grid ─── */}
        <ScrollReveal delay={50}>
          <div className="bg-cream-50/50 rounded-2xl border border-plum-900/10 divide-y divide-plum-900/10 shadow-xs overflow-hidden">
            {activeFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`transition-colors duration-200 ${
                    isOpen ? 'bg-white' : 'hover:bg-white/60'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    id={`faq-question-${faq.id}`}
                    className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left cursor-pointer transition-all"
                  >
                    <div className="flex-1 pr-2">
                      <span className="font-bold text-sm sm:text-base text-plum-900 leading-snug">
                        {faq.question}
                      </span>
                    </div>

                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                        isOpen
                          ? 'bg-[#15aec0] border-[#15aec0] text-white rotate-180 shadow-xs'
                          : 'border-plum-900/15 text-plum-900/60 bg-white'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </button>

                  <div
                    id={`faq-answer-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-question-${faq.id}`}
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-0 text-xs sm:text-sm text-plum-900/75 leading-relaxed font-normal pr-8 sm:pr-12">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        {/* ─── Bottom Help Card ─── */}
        <div className="mt-8 sm:mt-10 bg-butter-50/70 border border-plum-900/10 rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-bold text-sm sm:text-base text-plum-900 mb-0.5">
              Still have questions about your pup's unique diet?
            </h4>
            <p className="text-xs text-plum-900/60 font-normal">
              Our canine nutritional specialists are available to guide you on portion sizing, allergies, and recipes.
            </p>
          </div>

          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center gap-2 bg-[#15aec0] hover:bg-[#0f8e9d] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-lg shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat with us</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
