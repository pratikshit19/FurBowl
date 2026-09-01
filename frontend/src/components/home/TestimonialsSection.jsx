'use client';

import { useState } from 'react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Mumbai',
    dog: 'Bruno, 2-year-old Labrador',
    rating: 5,
    text: 'Bruno used to be a picky eater. The moment we switched to FurBowl Chicken Rice, he finished his bowl in under a minute! His coat is shinier and his digestion has improved noticeably.',
  },
  {
    id: 2,
    name: 'Rahul Mehta',
    location: 'Bangalore',
    dog: 'Coco, 8-month-old Beagle',
    rating: 5,
    text: 'I was worried about finding good food for Coco as a puppy. FurBowl\'s Egg Superfood has been amazing — she loves the taste and her vet is impressed with her growth.',
  },
  {
    id: 3,
    name: 'Ananya Krishnan',
    location: 'Chennai',
    dog: 'Max, 5-year-old Golden Retriever',
    rating: 5,
    text: 'The Chicken Broth has been a game-changer for Max. He had low appetite but now laps it up eagerly. The transparency in ingredients is what sold me — I know exactly what he\'s eating.',
  },
  {
    id: 4,
    name: 'Vikram Singh',
    location: 'Delhi',
    dog: 'Simba, 3-year-old Indie',
    rating: 5,
    text: 'Simba used to get stomach upset with processed food. FurBowl Paneer Medley has been perfect — no digestive issues, and he absolutely loves the taste. Highly recommend!',
  },
  {
    id: 5,
    name: 'Deepika Nair',
    location: 'Pune',
    dog: 'Bella, 6-year-old Shih Tzu',
    rating: 5,
    text: 'Finally a food I feel good about serving. I love that the ingredient list is simple and honest — no "animal meal" or mystery ingredients. Bella has never been healthier.',
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= rating ? 'text-amber-400' : 'text-gray-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const visibleCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 3;

  return (
    <section className="section-padding bg-white" aria-labelledby="testimonials-heading">
      <div className="container-main">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-turquoise-600 text-sm font-semibold uppercase tracking-wider mb-3">
            Happy Dogs
          </p>
          <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold text-gray-900">
            Dogs (and Their Humans) Love FurBowl
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="bg-gray-50 border border-gray-100 rounded-xl p-6"
            >
              <StarRating rating={review.rating} />
              <blockquote className="mt-4 text-gray-700 text-sm leading-relaxed">
                "{review.text}"
              </blockquote>
              <div className="mt-5 pt-5 border-t border-gray-200">
                <p className="font-semibold text-gray-900 text-sm">{review.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{review.dog} · {review.location}</p>
              </div>
            </div>
          ))}
        </div>

        {/* All reviews link */}
        <div className="text-center mt-10">
          <a
            href="/reviews"
            className="inline-flex items-center gap-2 text-sm font-medium text-turquoise-600 hover:text-turquoise-700 transition-colors"
          >
            Read all reviews
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
