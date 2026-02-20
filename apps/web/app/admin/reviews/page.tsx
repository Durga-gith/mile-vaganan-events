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

export default function AdminReviews() {
  const [adminSecret, setAdminSecret] = useState('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

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

  const remove = async (id: string) => {
    if (!adminSecret) {
      alert('Enter admin secret');
      return;
    }
    setDeleting(id);
    try {
      const api = process.env.NEXT_PUBLIC_API_URL || 'https://mile-vaganan-events-xaxq.onrender.com';
      const res = await fetch(`${api}/reviews/admin/delete/${id}`, {
        method: 'DELETE',
        headers: { 'admin-secret': adminSecret },
      });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(`HTTP ${res.status}: ${t}`);
      }
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch (e: any) {
      alert(e.message || 'Delete failed');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <main className="min-h-screen bg-ivory text-maroon-dark">
      <section className="border-b border-gold/30 bg-royal-pattern">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h1 className="text-3xl font-serif text-maroon-dark">Manage Reviews</h1>
          <p className="mt-2 text-sm text-maroon/80">Delete previously approved reviews from the website.</p>
          <div className="mt-6 flex flex-col gap-3 rounded-lg border border-gold/30 bg-white p-4 md:flex-row md:items-center">
            <label className="text-sm font-medium text-maroon-dark">Admin Secret</label>
            <input
              value={adminSecret}
              onChange={(e) => setAdminSecret(e.target.value)}
              type="password"
              placeholder="Enter admin secret"
              className="w-full rounded border border-gold/40 px-3 py-2 md:max-w-sm"
            />
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-10">
        {loading && <div className="text-gray-600">Loading…</div>}
        {!loading && error && <div className="text-red-600">Failed to load: {error}</div>}
        {!loading && !error && reviews.length === 0 && <div className="text-gray-700">No reviews.</div>}
        {!loading && !error && reviews.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <div key={r.id} className="rounded-lg border-2 border-gold bg-white p-6 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-maroon">{r.name}</h4>
                  <div className="text-gold">{'★'.repeat(r.rating)}{'☆'.repeat(Math.max(0, 5 - r.rating))}</div>
                </div>
                <p className="text-gray-700">{r.comment}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-500">{r.email || 'no-email'}</span>
                  <button
                    onClick={() => remove(r.id)}
                    disabled={deleting === r.id}
                    className="rounded-full bg-maroon px-4 py-2 text-sm font-semibold text-ivory transition hover:bg-maroon-dark disabled:opacity-60"
                  >
                    {deleting === r.id ? 'Deleting…' : 'Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

