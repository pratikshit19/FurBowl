'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      setSubmitted(true);
    } catch {
      alert('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-padding bg-gray-50/50">
      <div className="container-main max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-turquoise-600 text-sm font-semibold uppercase tracking-wider mb-2">Get in Touch</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">We'd Love to Hear From You</h1>
          <p className="text-gray-500 max-w-md mx-auto">Have questions about our food, subscriptions, or orders? Drop us a message.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-turquoise-50 text-turquoise-600 flex items-center justify-center mb-3">
                📍
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Our Location</h3>
              <p className="text-sm text-gray-500">India (Shipping nationwide)</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-turquoise-50 text-turquoise-600 flex items-center justify-center mb-3">
                ✉️
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
              <p className="text-sm text-gray-500">hello@furbowl.in</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-turquoise-50 text-turquoise-600 flex items-center justify-center mb-3">
                ⏰
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Support Hours</h3>
              <p className="text-sm text-gray-500">Mon - Sat: 10 AM - 6 PM IST</p>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Message Received!</h3>
                <p className="text-gray-500 text-sm mb-6">Thank you for reaching out. Our team will respond within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} className="text-turquoise-600 font-semibold text-sm hover:underline">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-plum-900/70 uppercase tracking-wider mb-1.5">Your Name *</label>
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-plum-900/10 rounded-xl px-3.5 py-2.5 text-sm text-plum-900 focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500/30 transition-all" placeholder="Priya Sharma" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-plum-900/70 uppercase tracking-wider mb-1.5">Email *</label>
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-plum-900/10 rounded-xl px-3.5 py-2.5 text-sm text-plum-900 focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500/30 transition-all" placeholder="priya@example.com" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-plum-900/70 uppercase tracking-wider mb-1.5">Phone Number</label>
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-plum-900/10 rounded-xl px-3.5 py-2.5 text-sm text-plum-900 focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500/30 transition-all" placeholder="8860503685 (optional)" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-plum-900/70 uppercase tracking-wider mb-1.5">Subject</label>
                  <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full border border-plum-900/10 rounded-xl px-3.5 py-2.5 text-sm text-plum-900 focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500/30 transition-all" placeholder="Question about feeding guide..." />
                </div>

                <div>
                  <label className="block text-xs font-bold text-plum-900/70 uppercase tracking-wider mb-1.5">Message *</label>
                  <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-plum-900/10 rounded-xl px-3.5 py-2.5 text-sm text-plum-900 focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500/30 transition-all" placeholder="How can we help you?" />
                </div>

                <button type="submit" disabled={loading}
                  className="w-full bg-coral-500 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-coral-600 disabled:opacity-50 transition-all shadow-md shadow-coral-500/20">
                  {loading ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
