'use client';

import { useState } from 'react';
import { Mail, Clock, CheckCircle2, Phone, AlertCircle } from 'lucide-react';
import api from '@/lib/api';

export default function ContactClient() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const validate = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = 'Please enter your name';
    if (!form.email.trim()) {
      errors.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }
    if (form.phone.trim() && !/^[6-9]\d{9}$/.test(form.phone.trim().replace(/\D/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit Indian phone number';
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      errors.message = 'Please enter a message of at least 10 characters';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    try {
      setError('');
      await api.submitContact(form);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'We could not send your message. Please try again or reach us on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-padding bg-butter-50/40 min-h-screen py-12 sm:py-16">
      <div className="container-main max-w-5xl">
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-[11px] font-bold uppercase tracking-widest text-teal-700 bg-teal-50 px-3.5 py-1 rounded-full border border-teal-200/60 inline-block mb-3">
            Here For You &amp; Your Dog
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-plum-900 tracking-tight mb-3">
            Get in Touch
          </h1>
          <p className="text-plum-900/65 font-medium max-w-xl mx-auto text-sm sm:text-base">
            Have questions about our fresh recipes, meal plans, delivery tracking, or transition diets? Our canine dietitians are ready to help.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-start">
          {/* Contact Info Sidebar */}
          <div className="md:col-span-5 space-y-4">
            {/* Direct Phone & WhatsApp */}
            <div className="bg-white rounded-2xl p-6 border border-plum-900/10 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-peach-50 text-peach-600 flex items-center justify-center mb-3">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-plum-900 text-sm mb-1">Direct Call &amp; WhatsApp</h3>
              <a
                href="tel:+918076400762"
                className="text-xs sm:text-sm font-semibold text-teal-700 hover:text-teal-800 transition-colors block"
              >
                +91 8076400762
              </a>
              <p className="text-xs text-plum-900/50 mt-1">Instant support for feeding advice</p>
            </div>

            {/* Email Support */}
            <div className="bg-white rounded-2xl p-6 border border-plum-900/10 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-plum-900 text-sm mb-1">Email Us</h3>
              <a
                href="mailto:support.furbowl@gmail.com"
                className="text-xs sm:text-sm font-semibold text-teal-700 hover:text-teal-800 transition-colors block"
              >
                support.furbowl@gmail.com
              </a>
              <p className="text-xs text-plum-900/50 mt-1">Instagram/Facebook: @furbowl.in • 24hr response</p>
            </div>

            {/* Support Hours */}
            <div className="bg-white rounded-2xl p-6 border border-plum-900/10 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-peach-50 text-peach-600 flex items-center justify-center mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-plum-900 text-sm mb-1">Support Hours</h3>
              <p className="text-xs sm:text-sm text-plum-900/75">Monday &ndash; Saturday: 9:00 AM &ndash; 9:00 PM IST</p>
              <p className="text-xs text-plum-900/50 mt-1">Closed on National Holidays</p>
            </div>
          </div>

          {/* Form Card */}
          <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-plum-900/10 shadow-xs">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200/60 shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-plum-900 mb-2">Message Received!</h3>
                <p className="text-plum-900/70 text-sm max-w-md mx-auto mb-6">
                  Thank you for reaching out to FurBowl. A member of our pet care team will review your query and get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
                  }}
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-peach-500 hover:bg-peach-600 text-white font-bold text-sm transition-all shadow-xs cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-bold text-plum-900/70 uppercase tracking-wider mb-1.5">
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      required
                      value={form.name}
                      onChange={(e) => {
                        setForm({ ...form, name: e.target.value });
                        if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: null });
                      }}
                      className={`w-full border rounded-xl px-4 py-3 text-sm text-plum-900 placeholder:text-plum-900/35 focus:outline-none transition-all ${
                        fieldErrors.name
                          ? 'border-red-400 bg-red-50/20 focus:border-red-500'
                          : 'border-plum-900/15 focus:border-peach-500 focus:ring-1 focus:ring-peach-500/30'
                      }`}
                      placeholder="e.g. Priya Sharma"
                    />
                    {fieldErrors.name && (
                      <p role="alert" className="text-xs text-red-600 mt-1 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{fieldErrors.name}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-bold text-plum-900/70 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => {
                        setForm({ ...form, email: e.target.value });
                        if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: null });
                      }}
                      className={`w-full border rounded-xl px-4 py-3 text-sm text-plum-900 placeholder:text-plum-900/35 focus:outline-none transition-all ${
                        fieldErrors.email
                          ? 'border-red-400 bg-red-50/20 focus:border-red-500'
                          : 'border-plum-900/15 focus:border-peach-500 focus:ring-1 focus:ring-peach-500/30'
                      }`}
                      placeholder="e.g. priya@example.com"
                    />
                    {fieldErrors.email && (
                      <p role="alert" className="text-xs text-red-600 mt-1 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{fieldErrors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-bold text-plum-900/70 uppercase tracking-wider mb-1.5">
                      Phone Number
                    </label>
                    <input
                      id="contact-phone"
                      value={form.phone}
                      onChange={(e) => {
                        setForm({ ...form, phone: e.target.value });
                        if (fieldErrors.phone) setFieldErrors({ ...fieldErrors, phone: null });
                      }}
                      className={`w-full border rounded-xl px-4 py-3 text-sm text-plum-900 placeholder:text-plum-900/35 focus:outline-none transition-all ${
                        fieldErrors.phone
                          ? 'border-red-400 bg-red-50/20 focus:border-red-500'
                          : 'border-plum-900/15 focus:border-peach-500 focus:ring-1 focus:ring-peach-500/30'
                      }`}
                      placeholder="e.g. 9876543210"
                    />
                    {fieldErrors.phone && (
                      <p role="alert" className="text-xs text-red-600 mt-1 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{fieldErrors.phone}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-bold text-plum-900/70 uppercase tracking-wider mb-1.5">
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full border border-plum-900/15 rounded-xl px-4 py-3 text-sm text-plum-900 placeholder:text-plum-900/35 focus:outline-none focus:border-peach-500 focus:ring-1 focus:ring-peach-500/30 transition-all"
                      placeholder="Feeding guide, order help, etc."
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-bold text-plum-900/70 uppercase tracking-wider mb-1.5">
                    How can we help your pet? *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => {
                      setForm({ ...form, message: e.target.value });
                      if (fieldErrors.message) setFieldErrors({ ...fieldErrors, message: null });
                    }}
                    className={`w-full border rounded-xl px-4 py-3 text-sm text-plum-900 placeholder:text-plum-900/35 focus:outline-none transition-all ${
                      fieldErrors.message
                        ? 'border-red-400 bg-red-50/20 focus:border-red-500'
                        : 'border-plum-900/15 focus:border-peach-500 focus:ring-1 focus:ring-peach-500/30'
                    }`}
                    placeholder="Tell us about your dog's breed, dietary preferences, or order number..."
                  />
                  {fieldErrors.message && (
                    <p role="alert" className="text-xs text-red-600 mt-1 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{fieldErrors.message}</span>
                    </p>
                  )}
                </div>

                {error && (
                  <div role="alert" className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-peach-500 hover:bg-peach-600 active:scale-98 text-white py-3.5 rounded-xl font-bold text-sm disabled:opacity-50 transition-all shadow-md shadow-peach-500/25 cursor-pointer"
                >
                  {loading ? 'Sending Your Message…' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
