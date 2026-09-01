'use client';

import { useState } from 'react';

const FAQS = [
  {
    id: 1,
    question: 'What is FurBowl food made of?',
    answer: 'FurBowl meals are made with 100% real, human-grade ingredients — real meats (chicken, lamb, egg), fresh vegetables, and superfoods like amla, turmeric, and ashwagandha. No fillers, no artificial additives, no preservatives.',
  },
  {
    id: 2,
    question: 'Is FurBowl suitable for puppies?',
    answer: 'Yes! All FurBowl meals are formulated for both puppies and adult dogs of all breeds and sizes. Simply adjust the serving quantity based on your puppy\'s weight using our feeding guide on each product.',
  },
  {
    id: 3,
    question: 'How do I transition my dog to FurBowl?',
    answer: 'We recommend a 7-day gradual transition: Mix 25% FurBowl with 75% old food for Days 1-2, then 50/50 for Days 3-4, then 75% FurBowl for Days 5-6, and 100% FurBowl from Day 7 onwards.',
  },
  {
    id: 4,
    question: 'Do you offer free shipping?',
    answer: 'Yes! We offer free shipping on all orders above ₹499. Orders below ₹499 carry a flat shipping fee of ₹49.',
  },
  {
    id: 5,
    question: 'What is your return policy?',
    answer: 'We offer a 7-day return policy for unopened and undamaged products. If your order arrives damaged or incorrect, contact us within 24 hours and we will resolve it immediately.',
  },
];

function AccordionItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
        id={`faq-question-${faq.id}`}
      >
        <span className="font-medium text-gray-900">{faq.question}</span>
        <span className={`flex-shrink-0 w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center transition-colors ${isOpen ? 'border-turquoise-500 bg-turquoise-50' : ''}`}>
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-turquoise-600' : 'text-gray-500'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
      </button>
      <div
        id={`faq-answer-${faq.id}`}
        role="region"
        aria-labelledby={`faq-question-${faq.id}`}
        className={`overflow-hidden transition-all duration-200 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="pb-5 text-gray-600 text-sm leading-relaxed pr-8">
          {faq.answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQSection({ faqs }) {
  const [openId, setOpenId] = useState(1);
  const displayFaqs = faqs || FAQS;

  return (
    <section className="section-padding bg-offwhite" aria-labelledby="faq-heading">
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — Title */}
          <div className="lg:sticky lg:top-28">
            <p className="text-turquoise-600 text-sm font-semibold uppercase tracking-wider mb-3">
              FAQs
            </p>
            <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Questions? We've got answers.
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              Everything you need to know about FurBowl, our ingredients, delivery, and more.
            </p>
            <a
              href="/faq"
              className="inline-flex items-center gap-2 text-sm font-medium text-turquoise-600 hover:text-turquoise-700 transition-colors"
            >
              View all FAQs
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>

          {/* Right — Accordion */}
          <div className="bg-white rounded-2xl border border-gray-100 px-6">
            {displayFaqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
