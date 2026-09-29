import ComprehensiveFAQSection from '@/components/faq/ComprehensiveFAQSection';

export const metadata = {
  title: 'Frequently Asked Questions | FurBowl',
  description: 'Answers to common questions about FurBowl dog food, ingredients, feeding, delivery, and returns.',
};

export default function FAQPage() {
  return (
    <div>
      <div className="bg-turquoise-600 text-white py-12 text-center">
        <div className="container-main max-w-2xl">
          <h1 className="text-3xl font-bold mb-2 text-white">Frequently Asked Questions</h1>
          <p className="text-white/90 text-sm">Everything you need to know about FurBowl meals, feeding, and shipping.</p>
        </div>
      </div>
      <ComprehensiveFAQSection />
    </div>
  );
}
