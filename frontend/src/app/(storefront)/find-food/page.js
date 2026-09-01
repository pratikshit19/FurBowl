'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';

const QUESTIONS = [
  {
    id: 1,
    title: "How old is your dog?",
    subtitle: "Nutrition requirements change as dogs grow.",
    options: [
      { label: "Puppy (Under 1 year)", value: "puppy" },
      { label: "Adult (1–7 years)", value: "adult" },
      { label: "Senior (7+ years)", value: "senior" },
    ],
  },
  {
    id: 2,
    title: "How much does your dog weigh?",
    subtitle: "Helps us calculate optimal portion sizes.",
    options: [
      { label: "Small (Under 5 kg)", value: "small" },
      { label: "Medium (5 – 15 kg)", value: "medium" },
      { label: "Large (15 – 30 kg)", value: "large" },
      { label: "Giant (30+ kg)", value: "giant" },
    ],
  },
  {
    id: 3,
    title: "Does your dog have dietary preferences?",
    subtitle: "We offer both non-veg and 100% vegetarian options.",
    options: [
      { label: "Non-Vegetarian (Chicken, Lamb)", value: "nonveg" },
      { label: "Vegetarian (Paneer, Egg)", value: "veg" },
      { label: "No preference (Loves everything!)", value: "any" },
    ],
  },
  {
    id: 4,
    title: "What's your primary health goal for your pet?",
    subtitle: "Our superfoods are tailored to specific benefits.",
    options: [
      { label: "High Protein & Active Muscles", value: "protein" },
      { label: "Better Digestion & Immunity", value: "digestion" },
      { label: "Hydration & Joint Support", value: "hydration" },
      { label: "General Overall Vitality", value: "vitality" },
    ],
  },
];

const RECOMMENDATIONS = {
  protein: {
    name: 'Egg Superfood',
    slug: 'egg-superfood',
    shortDescription: 'Highest-protein meal with turmeric & ashwagandha (16% protein).',
    isVeg: true,
    foodType: 'WET',
    images: [{ url: '/images/products/egg-superfood-front.jpg', altText: 'Egg Superfood' }],
    variants: [{ mrp: 109, sellingPrice: 99 }],
    reason: 'Packed with 16% protein, egg, quinoa, and ashwagandha for active muscle build and recovery.',
  },
  digestion: {
    name: 'Chicken Rice with Vegetables',
    slug: 'chicken-rice-with-vegetables',
    shortDescription: 'Complete fresh meal with real chicken, rice, amla & flax seed.',
    isVeg: false,
    foodType: 'WET',
    images: [{ url: '/images/products/chicken-rice-front.jpg', altText: 'Chicken Rice' }],
    variants: [{ mrp: 99, sellingPrice: 89 }],
    reason: 'Enriched with amla and flax seed to support gut health and smooth digestion.',
  },
  hydration: {
    name: 'Chicken Broth',
    slug: 'chicken-broth',
    shortDescription: 'Warm bone broth for hydration & digestion.',
    isVeg: false,
    foodType: 'BROTH',
    images: [{ url: '/images/products/chicken-broth-front.jpg', altText: 'Chicken Broth' }],
    variants: [{ mrp: 129, sellingPrice: 109 }],
    reason: 'Slow-simmered bone broth rich in collagen and moisture for healthy joints and hydration.',
  },
  vitality: {
    name: 'Paneer Medley',
    slug: 'paneer-medley',
    shortDescription: 'Vegetarian meal with paneer, quinoa & superfoods.',
    isVeg: true,
    foodType: 'WET',
    images: [{ url: '/images/products/paneer-medley-front.jpg', altText: 'Paneer Medley' }],
    variants: [{ mrp: 109, sellingPrice: 99 }],
    reason: 'Balanced vegetarian meal combining paneer, chia seeds, and fresh garden veggies for daily energy.',
  },
};

export default function FindFoodPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSelect = (value) => {
    const nextAnswers = { ...answers, [QUESTIONS[currentStep].id]: value };
    setAnswers(nextAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const selectedGoal = answers[4] || 'protein';
  const recommendedProduct = RECOMMENDATIONS[selectedGoal] || RECOMMENDATIONS.protein;

  return (
    <div className="section-padding bg-gray-50/50">
      <div className="container-main max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-turquoise-600 text-sm font-semibold uppercase tracking-wider mb-2">
            Interactive Quiz
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Find the Perfect Bowl for Your Dog 🐾
          </h1>
        </div>

        {!isCompleted ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex justify-between text-xs text-gray-400 font-medium mb-2">
                <span>Question {currentStep + 1} of {QUESTIONS.length}</span>
                <span>{Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-turquoise-600 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {QUESTIONS[currentStep].title}
              </h2>
              <p className="text-gray-500 text-sm">
                {QUESTIONS[currentStep].subtitle}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {QUESTIONS[currentStep].options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-turquoise-600 hover:bg-turquoise-50/50 transition-colors font-medium text-gray-800 flex items-center justify-between group"
                >
                  <span>{opt.label}</span>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-turquoise-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              ))}
            </div>

            {/* Back button */}
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="mt-6 text-sm text-gray-400 hover:text-gray-600 font-medium transition-colors"
              >
                ← Previous question
              </button>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm text-center">
            <div className="w-16 h-16 bg-turquoise-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              🎯
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              We Found Your Dog's Perfect Match!
            </h2>
            <p className="text-gray-600 text-sm mb-8 max-w-lg mx-auto leading-relaxed">
              Based on your answers, here is our top recommendation for your pet:
            </p>

            <div className="max-w-xs mx-auto mb-6 text-left">
              <ProductCard product={recommendedProduct} />
            </div>

            <div className="bg-turquoise-50 rounded-xl p-4 mb-8 text-left text-xs text-turquoise-900 max-w-md mx-auto">
              <strong>Why this fits:</strong> {recommendedProduct.reason}
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => { setCurrentStep(0); setAnswers({}); setIsCompleted(false); }}
                className="px-6 py-3 border border-gray-200 text-gray-700 rounded-full font-medium text-sm hover:border-gray-400 transition-colors"
              >
                Retake Quiz
              </button>
              <Link
                href={`/shop/${recommendedProduct.slug}`}
                className="px-6 py-3 bg-turquoise-600 text-white rounded-full font-semibold text-sm hover:bg-turquoise-700 transition-colors"
              >
                View Product Details
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
