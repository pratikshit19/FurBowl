export const metadata = {
  title: 'Shipping & Returns Policy | FurBowl',
  description:
    'Learn about FurBowl nationwide express delivery, insulated packaging, free shipping thresholds, and our 100% freshness guarantee.',
  openGraph: {
    title: 'Shipping & Returns Policy | FurBowl',
    description: 'Learn about FurBowl nationwide delivery and 100% freshness guarantee.',
  },
};

export default function ShippingReturnsPage() {
  return (
    <div className="section-padding bg-butter-50/30 min-h-screen py-12 sm:py-16">
      <div className="container-main max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-12 border border-plum-900/10 shadow-xs">
        <h1 className="text-3xl sm:text-4xl font-black text-plum-900 mb-3 tracking-tight">
          Shipping &amp; Returns Policy
        </h1>
        <p className="text-plum-900/50 text-xs sm:text-sm mb-8">
          Fresh, chilled delivery direct from kitchen to bowl • FurBowl Petcare Pvt. Ltd.
        </p>

        <div className="space-y-8 text-plum-900/80 text-sm sm:text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-plum-900 mb-3">1. Nationwide Fresh Delivery</h2>
            <p className="mb-3">
              FurBowl ships fresh, vacuum-sealed packets to pet parents across 18,000+ pin codes in India. Every batch is cooked fresh in our certified kitchen, rapidly cooled, and packed in eco-insulated thermal cartons with food-grade dry ice/ice gel packs to keep meals at optimum chill temperatures throughout transit.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-4">
              <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-200/60">
                <p className="text-xs font-bold text-teal-800 uppercase tracking-wider mb-1">FREE SHIPPING</p>
                <p className="text-sm font-semibold text-plum-900">On all orders above ₹499</p>
                <p className="text-xs text-plum-900/60 mt-0.5">Applied automatically at checkout</p>
              </div>
              <div className="p-4 rounded-xl bg-peach-50/60 border border-peach-200/60">
                <p className="text-xs font-bold text-peach-800 uppercase tracking-wider mb-1">STANDARD DELIVERY</p>
                <p className="text-sm font-semibold text-plum-900">Flat ₹49 on orders below ₹499</p>
                <p className="text-xs text-plum-900/60 mt-0.5">Express air dispatch</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-plum-900 mb-3">2. Processing &amp; Delivery Timelines</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-plum-900/75">
              <li><strong>Kitchen Processing:</strong> Fresh orders placed before 2:00 PM are packaged and dispatched the same or next business day.</li>
              <li><strong>Transit Times:</strong> Delhi NCR &amp; North Metros (1–2 days); Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata (2–3 days); Other regions (3–4 business days).</li>
              <li><strong>Tracking:</strong> Real-time tracking link is sent via WhatsApp and SMS the moment your thermal box is picked up by our courier partner.</li>
            </ul>
          </section>

          <section id="returns">
            <h2 className="text-xl font-bold text-plum-900 mb-3">3. 100% Freshness Guarantee &amp; Replacements</h2>
            <p className="mb-2">
              We want your pup to fall in love with real food. If for any reason your order arrives:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-plum-900/75">
              <li>With broken vacuum seals or punctured packets</li>
              <li>Defrosted / warm due to courier delays</li>
              <li>Incorrect recipes differing from your order summary</li>
            </ul>
            <p className="mt-3">
              Simply snap a quick photo and contact us within <strong>24 hours of delivery</strong>. We will immediately dispatch a fresh replacement package or issue a 100% refund — no stressful return packaging needed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-plum-900 mb-3">4. Order Cancellation</h2>
            <p>
              Orders can be canceled free of charge before the kitchen batch has been packed and dispatched (typically within 2 hours of placing the order). Once an order has been dispatched with our logistics partner, cancellations cannot be processed due to the perishable nature of chilled food.
            </p>
          </section>

          <section className="bg-peach-50/50 p-6 rounded-2xl border border-peach-200/50">
            <h2 className="text-lg font-bold text-plum-900 mb-2">5. Need Help with an Order?</h2>
            <div className="text-xs sm:text-sm text-plum-900/90 space-y-1 font-medium">
              <p><strong>Customer Care:</strong> +91 8860503685 (WhatsApp &amp; Voice)</p>
              <p><strong>Email Support:</strong> care@furbowl.com / hello@furbowl.in</p>
              <p><strong>Support Hours:</strong> Monday – Saturday, 9:00 AM – 9:00 PM IST</p>
              <p><strong>Kitchen &amp; Office:</strong> Plot No. 42, Sector 18, Udyog Vihar, Phase IV, Gurugram, Haryana 122015, India</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
