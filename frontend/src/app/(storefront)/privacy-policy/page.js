export const metadata = { title: 'Privacy Policy | FurBowl' };

export default function PrivacyPolicyPage() {
  return (
    <div className="section-padding">
      <div className="container-main max-w-3xl mx-auto prose prose-turquoise">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        <p className="text-gray-500 text-xs mb-8">Last updated: August 31, 2026</p>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          FurBowl values your privacy. This Privacy Policy describes how we collect, use, and share your personal information when you visit or make a purchase from our store.
        </p>
        <h2 className="text-xl font-bold text-gray-800 mt-6 mb-3">Information We Collect</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          We collect your name, phone number, delivery address, and payment information when you place an order or log in via Phone OTP.
        </p>
        <h2 className="text-xl font-bold text-gray-800 mt-6 mb-3">How We Use Your Information</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          We use your information to fulfill orders, process payments via Razorpay, send order updates via SMS/email, and improve our services.
        </p>
      </div>
    </div>
  );
}
