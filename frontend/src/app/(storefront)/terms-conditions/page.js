export const metadata = {
  title: 'Terms & Conditions | FurBowl',
  description:
    'Read the terms of service, ordering guidelines, subscription rules, and cancellation policies for FurBowl fresh pet food.',
  openGraph: {
    title: 'Terms & Conditions | FurBowl',
    description: 'Read the terms of service, ordering guidelines, and cancellation policies for FurBowl.',
  },
};

export default function TermsConditionsPage() {
  return (
    <div className="section-padding bg-butter-50/30 min-h-screen py-12 sm:py-16">
      <div className="container-main max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-12 border border-plum-900/10 shadow-xs">
        <h1 className="text-3xl sm:text-4xl font-black text-plum-900 mb-3 tracking-tight">
          Terms &amp; Conditions
        </h1>
        <p className="text-plum-900/50 text-xs sm:text-sm mb-8">
          Effective date: October 2026 • FurBowl Petcare Pvt. Ltd.
        </p>

        <div className="space-y-8 text-plum-900/80 text-sm sm:text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-plum-900 mb-3">1. Agreement to Terms</h2>
            <p>
              These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&ldquo;you&rdquo;) and FurBowl Petcare Pvt. Ltd. (&ldquo;FurBowl&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), concerning your access to and use of the <strong>https://furbowl.co.in</strong> website as well as any related web applications, order workflows, and customer services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-plum-900 mb-3">2. Nature of Products &amp; Fresh Food Handling</h2>
            <p className="mb-2">
              FurBowl crafts gently cooked, human-grade dog food free from artificial preservatives. Because our meals are real, fresh food:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-plum-900/75">
              <li>Packets must be stored in refrigerator/freezer conditions as instructed on packaging upon delivery.</li>
              <li>Once opened, any unconsumed portion should be refrigerated and consumed within 48 hours.</li>
              <li>Recommended feeding guidelines are indicative based on typical metabolic needs. Individual canine requirements vary with age, breed, metabolism, and activity.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-plum-900 mb-3">3. Orders, Pricing &amp; Payments</h2>
            <p className="mb-2">
              All prices displayed on FurBowl are in Indian Rupees (INR) and inclusive of applicable Goods and Services Tax (GST).
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-plum-900/75">
              <li>Orders are subject to acceptance and kitchen batch availability.</li>
              <li>We accept payments via UPI, Net Banking, Credit/Debit cards, and Cash on Delivery (COD) for eligible pin codes.</li>
              <li>We reserve the right to modify prices, discontinue recipes, or limit order quantities without prior notice. Promotional coupon codes cannot be clubbed unless explicitly permitted.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-plum-900 mb-3">4. Shipping &amp; Delivery</h2>
            <p>
              We ship orders nationwide across India. Fresh batches are prepared in our certified kitchen and dispatched within 1–2 business days. Express delivery to major metros typically takes 2–4 business days. While we take every precaution with insulated packaging, delivery times are estimates and may occasionally be impacted by weather or logistical disruptions beyond our reasonable control.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-plum-900 mb-3" id="refunds">5. Returns, Replacements &amp; Refunds</h2>
            <p className="mb-2">
              Due to the perishable nature of our freshly prepared dog food:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-plum-900/75">
              <li>We cannot accept returns on opened, unsealed, or thawed packets once received.</li>
              <li>If you receive a package that is visibly damaged, leaking, incorrect, or defective, you must notify us within <strong>24 hours of delivery</strong> with photographic evidence at <strong>support.furbowl@gmail.com</strong> or via WhatsApp at <strong>+91 8076400762</strong>.</li>
              <li>Upon verification, we will promptly dispatch a replacement package or initiate a full refund to your original payment method within 5–7 business days.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-plum-900 mb-3">6. Intellectual Property Rights</h2>
            <p>
              Unless otherwise indicated, all brand trademarks, logos, recipe formulation names, product packaging designs, website text, photography, and UI software are the exclusive intellectual property of FurBowl Petcare Pvt. Ltd. and protected by copyright and trademark laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-plum-900 mb-3">7. Limitation of Liability &amp; Pet Health Advice</h2>
            <p>
              Information provided on FurBowl, including our calorie calculator and blog guides, is intended for general nutritional awareness and is not a substitute for clinical veterinary diagnosis. Always consult your veterinarian before making radical changes to diets of pets with acute medical conditions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-plum-900 mb-3">8. Governing Law &amp; Jurisdiction</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India. Any dispute arising out of or relating to these terms shall be subject to the exclusive jurisdiction of the courts in Gurugram / New Delhi, India.
            </p>
          </section>

          <section className="bg-peach-50/50 p-6 rounded-2xl border border-peach-200/50">
            <h2 className="text-lg font-bold text-plum-900 mb-2">9. Company Details &amp; Customer Support</h2>
            <div className="text-xs sm:text-sm text-plum-900/90 space-y-1 font-medium">
              <p><strong>Corporate Entity:</strong> FurBowl Petcare Pvt. Ltd.</p>
              <p><strong>Support Phone:</strong> +91 8076400762 (Mon – Sat, 9:00 AM – 9:00 PM IST)</p>
              <p><strong>Official Email:</strong> support.furbowl@gmail.com</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
