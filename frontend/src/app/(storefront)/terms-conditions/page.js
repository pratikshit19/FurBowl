export const metadata = { title: 'Terms & Conditions | FurBowl' };

export default function TermsConditionsPage() {
  return (
    <div className="section-padding">
      <div className="container-main max-w-3xl mx-auto prose prose-turquoise">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms &amp; Conditions</h1>
        <p className="text-gray-500 text-xs mb-8">Last updated: August 31, 2026</p>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          By accessing or using the FurBowl website and purchasing products, you agree to be bound by these Terms and Conditions.
        </p>
        <h2 className="text-xl font-bold text-gray-800 mt-6 mb-3">Product Availability &amp; Pricing</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Prices for our products are subject to change without notice. All prices are listed in Indian Rupees (INR) and include applicable taxes.
        </p>
        <h2 className="text-xl font-bold text-gray-800 mt-6 mb-3">Governing Law</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          These Terms shall be governed by and interpreted in accordance with the laws of India.
        </p>
      </div>
    </div>
  );
}
