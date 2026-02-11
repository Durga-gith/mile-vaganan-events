'use client';

import { useState } from 'react';

export default function BookingForm({ lang }: { lang: string }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [city, setCity] = useState('');
  const [packageType, setPackageType] = useState('Basic');
  const [services, setServices] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const toggleService = (value: string) => {
    setServices((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const api = process.env.NEXT_PUBLIC_API_URL || 'https://mile-vaganan-events.onrender.com';
      console.log('Submitting to:', `${api}/services/lead`);
      const response = await fetch(`${api}/services/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, date, city, packageType, services, notes }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'No error details' }));
        console.error('API Error Response:', errorData);
        throw new Error(`Submission failed: ${response.status} ${response.statusText}`);
      }
      
      setStatus('success');
      setName(''); setEmail(''); setPhone(''); setDate(''); setCity(''); setServices([]); setNotes('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="book" className="py-20 bg-ivory">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold text-maroon mb-8">
          {lang === 'en' ? 'Book Your Wedding' : 'உங்கள் திருமணத்தை முன்பதிவு செய்யுங்கள்'}
        </h2>
        <form onSubmit={submit} className="space-y-6 bg-white p-6 rounded-lg shadow">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-maroon font-medium mb-2">{lang === 'en' ? 'Name' : 'பெயர்'}</label>
              <input value={name} onChange={e => setName(e.target.value)} className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block text-maroon font-medium mb-2">Email</label>
              <input value={email} onChange={e => setEmail(e.target.value)} className="w-full border rounded px-3 py-2" type="email" required />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-maroon font-medium mb-2">{lang === 'en' ? 'Phone' : 'தொலைபேசி'}</label>
              <input value={phone} onChange={e => setPhone(e.target.value)} className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block text-maroon font-medium mb-2">{lang === 'en' ? 'Wedding Date' : 'திருமண தேதி'}</label>
              <input value={date} onChange={e => setDate(e.target.value)} className="w-full border rounded px-3 py-2" type="date" required />
            </div>
            <div>
              <label className="block text-maroon font-medium mb-2">{lang === 'en' ? 'City' : 'நகரம்'}</label>
              <input value={city} onChange={e => setCity(e.target.value)} className="w-full border rounded px-3 py-2" required />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-maroon font-medium mb-2">{lang === 'en' ? 'Package' : 'தொகுப்பு'}</label>
              <select value={packageType} onChange={e => setPackageType(e.target.value)} className="w-full border rounded px-3 py-2">
                <option>Basic</option>
                <option>Premium</option>
                <option>Luxury</option>
              </select>
            </div>
            <div>
              <label className="block text-maroon font-medium mb-2">{lang === 'en' ? 'Interested Services' : 'தேவையான சேவைகள்'}</label>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {['Venues','Catering','Decoration','Photography','Entertainment','Planning'].map(s => (
                  <label key={s} className="flex items-center gap-2">
                    <input type="checkbox" checked={services.includes(s)} onChange={() => toggleService(s)} />
                    <span>{s}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-maroon font-medium mb-2">{lang === 'en' ? 'Notes / Special Requests' : 'குறிப்புகள் / சிறப்பு கோரிக்கைகள்'}</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} className="w-full border rounded px-3 py-2" rows={3} />
          </div>

          <button type="submit" className="bg-maroon text-white px-6 py-3 rounded-full hover:bg-maroon-dark transition" disabled={status==='submitting'}>
            {status==='submitting' ? (lang==='en' ? 'Submitting...' : 'சமர்ப்பிக்கிறது...') : (lang==='en' ? 'Submit Booking Request' : 'முன்பதிவு கோரிக்கை சமர்ப்பிக்கவும்')}
          </button>
          {status==='success' && (
            <p className="text-green-700 mt-2">
              {lang==='en'
                ? 'Thank you for booking with Mile Vaganan Events. We will contact you by email within 24 hours.'
                : 'Mile Vaganan Events-ஐ முன்பதிவு செய்ததற்கு நன்றி. 24 மணி நேரத்திற்குள் உங்கள் மின்னஞ்சலில் நாங்கள் தொடர்புகொள்வோம்.'}
            </p>
          )}
          {status==='error' && <p className="text-red-700 mt-2">{lang==='en' ? 'Failed to submit. Try again.' : 'சமர்ப்பிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.'}</p>}
        </form>
      </div>
    </section>
  );
}
