import Link from 'next/link';

export default function OrderConfirmationPage({ params }) {
  const { orderNumber } = params;

  return (
    <div className="section-padding">
      <div className="container-main max-w-2xl mx-auto text-center py-16">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3">Order Confirmed! 🐾</h1>
        <p className="text-gray-600 mb-2">Thank you for your order.</p>
        <p className="text-gray-500 text-sm mb-8">
          Order number: <span className="font-semibold text-gray-900">#{orderNumber}</span>
        </p>

        <div className="bg-turquoise-50 rounded-2xl p-6 mb-8 text-left">
          <h2 className="font-semibold text-turquoise-900 mb-3">What happens next?</h2>
          <ol className="space-y-3">
            {[
              { step: '1', text: 'You\'ll receive an SMS/email confirmation shortly.' },
              { step: '2', text: 'Our team will prepare your FurBowl order with care.' },
              { step: '3', text: 'We\'ll dispatch your order within 1-2 business days.' },
              { step: '4', text: 'Tracking details will be shared once your order ships.' },
            ].map((item) => (
              <li key={item.step} className="flex items-start gap-3 text-sm text-turquoise-800">
                <span className="w-5 h-5 rounded-full bg-turquoise-200 text-turquoise-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{item.step}</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/account/orders"
            className="inline-flex items-center justify-center gap-2 bg-turquoise-600 text-white px-8 py-3 rounded-xl font-semibold text-sm hover:bg-turquoise-700 transition-colors"
          >
            View My Orders
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 border border-plum-900/20 text-plum-900 px-8 py-3 rounded-xl font-medium text-sm hover:border-plum-900/40 hover:bg-plum-900/5 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
