export const metadata = {
  title: 'Privacy Policy | FurBowl',
  description:
    'Learn how FurBowl collects, uses, and protects your personal and pet information in compliance with Indian privacy laws.',
  openGraph: {
    title: 'Privacy Policy | FurBowl',
    description: 'Learn how FurBowl collects, uses, and protects your personal information.',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="section-padding bg-butter-50/30 min-h-screen py-12 sm:py-16">
      <div className="container-main max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-12 border border-plum-900/10 shadow-xs">
        <h1 className="text-3xl sm:text-4xl font-black text-plum-900 mb-3 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-plum-900/50 text-xs sm:text-sm mb-8">
          Last updated: October 2026 • FurBowl Petcare Pvt. Ltd.
        </p>

        <div className="space-y-8 text-plum-900/80 text-sm sm:text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-plum-900 mb-3">1. Introduction</h2>
            <p>
              FurBowl Petcare Pvt. Ltd. (&ldquo;FurBowl&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting your privacy and personal data. This Privacy Policy outlines how we collect, process, store, and safeguard information when you visit our website (<strong>https://furbowl.co.in</strong>), use our pet nutrition quiz, order fresh meals, or communicate with our customer support team.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-plum-900 mb-3">2. Information We Collect</h2>
            <p className="mb-2">We collect information to provide and deliver fresh dog food to your doorstep:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-plum-900/75">
              <li><strong>Contact &amp; Account Details:</strong> Name, phone number, email address, and shipping addresses.</li>
              <li><strong>Pet Profile Information:</strong> Pet name, breed, age, weight, activity level, and dietary sensitivities provided during the FurBowl Finder quiz or order customization.</li>
              <li><strong>Payment &amp; Transaction Details:</strong> Order history, billing records, and payment confirmations processed securely through RBI-licensed payment gateways (Razorpay). We never store full credit/debit card numbers or UPI PINs on our servers.</li>
              <li><strong>Device &amp; Usage Data:</strong> IP address, browser type, device information, and pages viewed, collected via cookies and analytics to enhance site performance.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-plum-900 mb-3">3. How We Use Your Information</h2>
            <p className="mb-2">We use your data exclusively for legitimate e-commerce operations, including:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-plum-900/75">
              <li>Preparing freshly cooked meals tailored to your dog’s caloric requirements.</li>
              <li>Fulfilling and delivering temperature-controlled orders across India.</li>
              <li>Sending transactional updates via SMS/WhatsApp/email (e.g., OTP login, order dispatch, delivery alerts).</li>
              <li>Managing customer support queries, dietary consultations, and refund requests.</li>
              <li>Optimizing site usability, security, and fraud prevention.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-plum-900 mb-3">4. Cookies and Tracking Technologies</h2>
            <p>
              We use functional and analytical cookies to remember your active shopping cart, maintain login state, and assess site performance. You can manage cookie preferences via our cookie banner or your browser settings. Declining essential cookies may limit certain shopping features such as cart persistence.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-plum-900 mb-3">5. Third-Party Service Providers</h2>
            <p className="mb-2">
              We never sell or rent your personal data to advertisers. We share information only with trusted partners essential for service execution:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-plum-900/75">
              <li><strong>Payment Processing:</strong> Razorpay Software Pvt. Ltd. (PCI-DSS Level 1 compliant).</li>
              <li><strong>Communications:</strong> MSG91 (transactional SMS &amp; phone OTPs) and Resend (email receipts).</li>
              <li><strong>Cold-Chain Logistics:</strong> Reputable nationwide express courier partners for perishable food delivery.</li>
              <li><strong>Analytics:</strong> Privacy-conscious Google Analytics 4 for aggregate visitor traffic statistics.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-plum-900 mb-3">6. Data Security &amp; Retention</h2>
            <p>
              We implement industry-standard encryption (TLS/HTTPS), strict access controls, and regular vulnerability audits. Personal data is retained only for as long as necessary to maintain your account, fulfill warranty/refund obligations, and satisfy statutory tax and accounting regulations in India.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-plum-900 mb-3">7. Your Rights</h2>
            <p>
              Under applicable Indian data protection laws, you have the right to access, correct, update, or request deletion of your personal data. You may also opt out of promotional emails and messages at any time using the unsubscribe link or contacting our support desk.
            </p>
          </section>

          <section className="bg-peach-50/50 p-6 rounded-2xl border border-peach-200/50">
            <h2 className="text-lg font-bold text-plum-900 mb-2">8. Grievance Officer &amp; Customer Support</h2>
            <p className="text-sm text-plum-900/80 mb-3">
              In accordance with the Information Technology Act, 2000 and rules made thereunder:
            </p>
            <div className="text-xs sm:text-sm text-plum-900/90 space-y-1 font-medium">
              <p><strong>Entity:</strong> FurBowl Petcare Pvt. Ltd.</p>
              <p><strong>Grievance Email:</strong> support.furbowl@gmail.com</p>
              <p><strong>Customer Helpline:</strong> +91 8076400762 (Monday – Saturday, 9:00 AM – 9:00 PM IST)</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
