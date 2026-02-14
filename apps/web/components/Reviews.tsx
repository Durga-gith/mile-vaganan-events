'use client';

import { useEffect, useState } from 'react';

type Review = {
  id: string;
  name: string;
  email?: string | null;
  rating: number;
  comment: string;
  createdAt?: string;
};

export default function Reviews({ lang }: { lang: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const api = process.env.NEXT_PUBLIC_API_URL || 'https://mile-vaganan-events-xaxq.onrender.com';
    fetch(`${api}/reviews`, { cache: 'no-store' })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Review[]) => {
        setReviews(Array.isArray(data) ? data : []);
      })
      .catch((err) => setError(err.message || 'Failed to load'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="approved-reviews" className="py-20 bg-ivory">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold text-maroon mb-8">
          {lang === 'en' ? 'What Couples Say' : 'மணமக்கள் சொல்வது'}
        </h2>

        {loading && (
          <div className="text-center text-gray-600">{lang === 'en' ? 'Loading reviews…' : 'விமர்சனங்கள் ஏற்றப்படுகிறது…'}</div>
        )}

        {!loading && error && (
          <div className="text-center text-red-600">
            {lang === 'en' ? 'Unable to load reviews.' : 'விமர்சனங்களை ஏற்ற முடியவில்லை.'}
          </div>
        )}

        {!loading && !error && reviews.length === 0 && (
          <p className="text-center text-gray-700">
            {lang === 'en' ? 'No reviews yet.' : 'இன்னும் விமர்சனங்கள் இல்லை.'}
          </p>
        )}

        {!loading && !error && reviews.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white border-2 border-gold rounded-lg p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold text-maroon">{review.name}</h4>
                  <div className="text-gold" aria-label={`Rating ${review.rating} out of 5`}>
                    {'★'.repeat(review.rating)}{'☆'.repeat(Math.max(0, 5 - review.rating))}
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

