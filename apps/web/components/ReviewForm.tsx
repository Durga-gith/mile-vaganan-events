'use client';

import { useState } from 'react';

export default function ReviewForm({ lang }: { lang: string }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const api = process.env.NEXT_PUBLIC_API_URL || 'https://mile-vaganan-events-xaxq.onrender.com';
      console.log('Submitting review to:', `${api}/reviews`);
      const response = await fetch(`${api}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, rating, comment }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'No error details' }));
        console.error('Review API Error:', errorData);
        throw new Error(`Review submission failed: ${response.status}`);
      }
      
      setStatus('success');
      setName(''); setEmail(''); setRating(5); setComment('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold text-maroon mb-8">
          {lang === 'en' ? 'Share Your Experience' : 'உங்கள் அனுபவத்தை பகிரவும்'}
        </h2>
        <form onSubmit={submit} className="space-y-6 bg-ivory p-6 rounded-lg shadow">
          <div>
            <label className="block text-maroon font-medium mb-2">{lang === 'en' ? 'Name' : 'பெயர்'}</label>
            <input value={name} onChange={e => setName(e.target.value)} className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block text-maroon font-medium mb-2">Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} className="w-full border rounded px-3 py-2" type="email" />
          </div>
          <div>
            <label className="block text-maroon font-medium mb-2">{lang === 'en' ? 'Rating' : 'மதிப்பீடு'}</label>
            <select value={rating} onChange={e => setRating(Number(e.target.value))} className="w-full border rounded px-3 py-2">
              {[1,2,3,4,5].map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-maroon font-medium mb-2">{lang === 'en' ? 'Review' : 'விமர்சனம்'}</label>
            <textarea value={comment} onChange={e => setComment(e.target.value)} className="w-full border rounded px-3 py-2" rows={4} required />
          </div>
          <button type="submit" className="bg-maroon text-white px-6 py-3 rounded-full hover:bg-maroon-dark transition" disabled={status==='submitting'}>
            {status==='submitting' ? (lang==='en' ? 'Submitting...' : 'சமர்ப்பிக்கிறது...') : (lang==='en' ? 'Submit Review' : 'விமர்சனத்தை சமர்ப்பிக்கவும்')}
          </button>
          {status==='success' && <p className="text-green-700 mt-2">{lang==='en' ? 'Thank you! Review submitted.' : 'நன்றி! உங்கள் விமர்சனம் சமர்ப்பிக்கப்பட்டது.'}</p>}
          {status==='error' && <p className="text-red-700 mt-2">{lang==='en' ? 'Failed to submit. Try again.' : 'சமர்ப்பிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.'}</p>}
        </form>
      </div>
    </section>
  );
}
