export const metadata = { title: 'Shipping & Returns Policy | FurBowl' };

export default function ShippingReturnsPage() {
  return (
    <div className="section-padding">
      <div className="container-main max-w-3xl mx-auto prose prose-turquoise">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Shipping &amp; Returns Policy</h1>

        <h2 className="text-xl font-bold text-gray-800 mt-8 mb-3">1. Shipping Policy</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          FurBowl ships to pin codes across India. Orders are processed within 1–2 business days.
        </p>
        <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1 mb-6">
          <li><strong>Free Shipping:</strong> On all orders above ₹499.</li>
          <li><strong>Flat Shipping Fee:</strong> ₹49 for orders below ₹499.</li>
          <li><strong>Delivery Time:</strong> Standard delivery takes 3–5 business days depending on location.</li>
        </ul>

        <h2 className="text-xl font-bold text-gray-800 mt-8 mb-3">2. 7-Day Return Policy</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          We want you and your pet to be completely happy. If you receive a damaged pouch or incorrect item, please notify us within 24 hours of delivery.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Unopened, sealed pouches in original packaging are eligible for return or replacement within 7 days of delivery.
        </p>

        <h2 className="text-xl font-bold text-gray-800 mt-8 mb-3">3. How to Initiate a Return</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          Contact our team at <strong>hello@furbowl.in</strong> with your Order Number and photos of the items. We will arrange a reverse pickup or send a replacement.
        </p>
      </div>
    </div>
  );
}
