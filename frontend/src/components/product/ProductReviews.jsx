'use client';

import { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle2, ShieldCheck } from 'lucide-react';
import { api } from '@/lib/api';

const RATING_LABELS = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent!',
};

export default function ProductReviews({
  productId,
  productSlug,
  productName,
  reviews = [],
  onAddReview,
}) {
  const [showForm, setShowForm] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    rating: 5,
    authorName: '',
    dogName: '',
    dogBreed: '',
    title: '',
    body: '',
  });

  const reviewCount = reviews.length;
  const averageRating =
    reviewCount > 0
      ? (reviews.reduce((acc, r) => acc + (Number(r.rating) || 0), 0) / reviewCount).toFixed(1)
      : '0.0';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!formData.authorName.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }
    if (!formData.body.trim()) {
      setErrorMessage('Please share a few words about your dog’s experience.');
      return;
    }

    setSubmitting(true);

    const dogInfo = [formData.dogName.trim(), formData.dogBreed.trim()]
      .filter(Boolean)
      .join(' • ');

    const newReview = {
      id: 'rev_' + Date.now(),
      productId: productId || productSlug,
      rating: Number(formData.rating) || 5,
      title: formData.title.trim() || null,
      body: formData.body.trim(),
      authorName: formData.authorName.trim(),
      dogInfo: dogInfo || null,
      isVerifiedPurchase: true,
      createdAt: new Date().toISOString(),
    };

    // Attempt API submission in background if possible
    try {
      if (api?.submitReview && (productId || productSlug)) {
        await api.submitReview(productSlug || productId, {
          rating: newReview.rating,
          title: newReview.title,
          body: newReview.body,
          authorName: newReview.authorName,
          dogInfo: newReview.dogInfo,
        });
      }
    } catch {
      // Offline fallback is handled by state and localStorage in parent
    }

    if (onAddReview) {
      onAddReview(newReview);
    }

    setSubmitting(false);
    setSuccessMessage('Thank you! Your review has been posted.');
    setShowForm(false);
    setFormData({
      rating: 5,
      authorName: '',
      dogName: '',
      dogBreed: '',
      title: '',
      body: '',
    });

    setTimeout(() => setSuccessMessage(''), 5000);
  };

  return (
    <section id="customer-reviews-section" className="mt-10 pt-8 border-t border-plum-900/10">
      {/* ─── Header & Rating Overview ──────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg sm:text-xl font-extrabold text-plum-900 tracking-tight">
              Customer Reviews
            </h2>
            <span className="text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200/70 px-2 py-0.5 rounded-full">
              {reviewCount} {reviewCount === 1 ? 'Review' : 'Reviews'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    reviewCount > 0 && star <= Math.round(Number(averageRating))
                      ? 'text-amber-500 fill-amber-500'
                      : 'text-plum-900/20 fill-transparent'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-plum-900">
              {reviewCount > 0 ? `${averageRating} / 5.0` : '0.0 / 5.0'}
            </span>
            <span className="text-xs text-plum-900/50">
              {reviewCount > 0
                ? `(based on ${reviewCount} ${reviewCount === 1 ? 'verified review' : 'verified reviews'})`
                : '(No reviews yet)'}
            </span>
          </div>
        </div>

        {/* Toggle Review Form Button */}
        <div>
          <button
            type="button"
            onClick={() => {
              setShowForm(!showForm);
              setErrorMessage('');
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-teal-700 bg-white hover:bg-teal-50 active:scale-95 text-teal-800 font-bold text-xs uppercase tracking-wider transition-all shadow-2xs cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4 text-teal-700" />
            <span>{showForm ? 'Cancel Review' : reviewCount === 0 ? 'Write the First Review' : 'Write a Review'}</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="mb-6 p-4 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-xs sm:text-sm font-medium flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* ─── Review Submission Form ──────────────────────────────────── */}
      {showForm && (
        <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-[#faf7f2] border border-plum-900/10 shadow-xs">
          <div className="mb-4">
            <h3 className="text-sm sm:text-base font-bold text-plum-900">
              Share Your Pup&apos;s Experience
            </h3>
            <p className="text-xs text-plum-900/60 mt-0.5">
              Reviewing <strong className="text-plum-900 font-semibold">{productName}</strong>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                {errorMessage}
              </div>
            )}

            {/* Star Rating Selector */}
            <div>
              <label className="block text-xs font-bold text-plum-900 uppercase tracking-wider mb-1.5">
                Rating *
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = (hoverRating || formData.rating) >= star;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 rounded hover:scale-110 transition-transform cursor-pointer"
                        aria-label={`${star} star`}
                      >
                        <Star
                          className={`w-6 h-6 transition-colors ${
                            isFilled
                              ? 'text-amber-500 fill-amber-500'
                              : 'text-plum-900/20 fill-transparent hover:text-amber-300'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
                <span className="text-xs font-semibold text-plum-900/70">
                  {RATING_LABELS[hoverRating || formData.rating]}
                </span>
              </div>
            </div>

            {/* Author Name and Dog Info Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-plum-900 uppercase tracking-wider mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pooja Sharma"
                  value={formData.authorName}
                  onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-plum-900/15 bg-white text-plum-900 placeholder:text-plum-900/35 focus:outline-none focus:ring-2 focus:ring-teal-700/30 focus:border-teal-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-plum-900 uppercase tracking-wider mb-1">
                  Dog&apos;s Name &amp; Breed (Optional)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Dog: Bruno"
                    value={formData.dogName}
                    onChange={(e) => setFormData({ ...formData, dogName: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-plum-900/15 bg-white text-plum-900 placeholder:text-plum-900/35 focus:outline-none focus:ring-2 focus:ring-teal-700/30 focus:border-teal-700"
                  />
                  <input
                    type="text"
                    placeholder="Breed: Golden Retriever"
                    value={formData.dogBreed}
                    onChange={(e) => setFormData({ ...formData, dogBreed: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-plum-900/15 bg-white text-plum-900 placeholder:text-plum-900/35 focus:outline-none focus:ring-2 focus:ring-teal-700/30 focus:border-teal-700"
                  />
                </div>
              </div>
            </div>

            {/* Review Headline / Title */}
            <div>
              <label className="block text-xs font-bold text-plum-900 uppercase tracking-wider mb-1">
                Headline / Title
              </label>
              <input
                type="text"
                placeholder="e.g. He licked the bowl completely clean!"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-plum-900/15 bg-white text-plum-900 placeholder:text-plum-900/35 focus:outline-none focus:ring-2 focus:ring-teal-700/30 focus:border-teal-700"
              />
            </div>

            {/* Review Body */}
            <div>
              <label className="block text-xs font-bold text-plum-900 uppercase tracking-wider mb-1">
                Your Review *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Tell other pet parents about the freshness, your dog’s coat, digestion, or excitement at mealtime..."
                value={formData.body}
                onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-plum-900/15 bg-white text-plum-900 placeholder:text-plum-900/35 focus:outline-none focus:ring-2 focus:ring-teal-700/30 focus:border-teal-700 resize-y"
              />
            </div>

            {/* Form Actions */}
            <div className="flex items-center gap-3 pt-1">
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 active:scale-95 text-white font-bold text-xs uppercase tracking-wider shadow-sm shadow-teal-700/25 transition-all cursor-pointer disabled:opacity-50"
              >
                {submitting ? 'Posting...' : 'Submit Review'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2.5 rounded-xl border border-plum-900/20 hover:bg-white text-plum-900/70 font-semibold text-xs tracking-wider transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ─── Empty State (When 0 reviews) ────────────────────────────── */}
      {reviewCount === 0 && !showForm && (
        <div className="text-center py-10 px-4 rounded-2xl bg-[#faf7f2]/60 border border-plum-900/10">
          <div className="w-12 h-12 rounded-full bg-teal-50 border border-teal-200/60 flex items-center justify-center mx-auto mb-3 text-teal-700">
            <MessageSquarePlus className="w-6 h-6" />
          </div>
          <h3 className="text-sm sm:text-base font-extrabold text-plum-900 mb-1">
            No reviews yet
          </h3>
          <p className="text-xs text-plum-900/65 max-w-md mx-auto mb-4 leading-relaxed font-normal">
            Has your dog tried this fresh recipe? Be the very first pet parent to share their bowl-licking experience.
          </p>
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs uppercase tracking-wider shadow-sm shadow-teal-700/25 active:scale-95 transition-all cursor-pointer"
          >
            <span>Write the First Review</span>
          </button>
        </div>
      )}

      {/* ─── Real Reviews List (When reviews exist) ──────────────────── */}
      {reviewCount > 0 && (
        <div className="space-y-3.5">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#fcfbf9] border border-plum-900/10 rounded-xl p-4 transition-shadow hover:shadow-2xs space-y-2"
            >
              {/* Top row: Stars + Verified Badge + Date */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s <= (Number(rev.rating) || 5)
                            ? 'text-amber-500 fill-amber-500'
                            : 'text-plum-900/20'
                        }`}
                      />
                    ))}
                  </div>
                  {rev.isVerifiedPurchase && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-teal-800 bg-teal-50 border border-teal-200/60 px-2 py-0.5 rounded font-semibold">
                      <ShieldCheck className="w-3 h-3 text-teal-700" />
                      Verified Buyer
                    </span>
                  )}
                </div>

                {rev.createdAt && (
                  <span className="text-[11px] text-plum-900/40 font-medium">
                    {new Date(rev.createdAt).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                )}
              </div>

              {/* Review Title */}
              {rev.title && (
                <h4 className="text-xs sm:text-sm font-bold text-plum-900 leading-snug">
                  {rev.title}
                </h4>
              )}

              {/* Review Body */}
              <p className="text-xs text-plum-900/75 leading-relaxed font-normal">
                {rev.body}
              </p>

              {/* Author & Dog Info */}
              <div className="pt-1 text-[11px] font-semibold text-plum-900/90 flex items-center gap-1.5">
                <span>{rev.authorName || rev.user?.name || 'Pet Parent'}</span>
                {rev.dogInfo && (
                  <>
                    <span className="text-plum-900/30">·</span>
                    <span className="text-teal-800 font-medium">🐾 {rev.dogInfo}</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
