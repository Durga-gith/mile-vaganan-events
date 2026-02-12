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
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');
    try {
      const api = process.env.NEXT_PUBLIC_API_URL || 'https://mile-vaganan-events-xaxq.onrender.com';
      console.log('Submitting to:', `${api}/services/lead`);
      const response = await fetch(`${api}/services/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, date, city, packageType, services, notes }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`Server responded with ${response.status}: ${errorText}`);
      }
      
      setStatus('success');
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setDate('');
      setCity('');
      setNotes('');
      setServices([]);
    } catch (err: any) {
      console.error('Submission error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Unknown error occurred');
    }
  };

  const t = {
    en: {
      title: 'Book Your Event',
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      date: 'Event Date',
      city: 'City',
      package: 'Package',
      services: 'Interested Services',
      notes: 'Notes / Special Requests',
      submit: 'Submit Booking Request',
      success: 'Thank you! We will contact you soon.',
      error: 'Failed to submit: ',
      tryAgain: 'Please try again or contact us directly.',
    },
    ta: {
      title: 'உங்கள் நிகழ்வை முன்பதிவு செய்யுங்கள்',
      name: 'முழு பெயர்',
      email: 'மின்னஞ்சல் முகவரி',
      phone: 'தொலைபேசி எண்',
      date: 'நிகழ்வு தேதி',
      city: 'ஊர்',
      package: 'பேக்கேஜ்',
      services: 'விருப்பமான சேவைகள்',
      notes: 'குறிப்புகள் / சிறப்பு கோரிக்கைகள்',
      submit: 'முன்பதிவு கோரிக்கையை சமர்ப்பிக்கவும்',
      success: 'நன்றி! விரைவில் உங்களைத் தொடர்பு கொள்வோம்.',
      error: 'சமர்ப்பிக்க முடியவில்லை: ',
      tryAgain: 'மீண்டும் முயற்சிக்கவும் அல்லது எங்களை நேரடியாக தொடர்பு கொள்ளவும்.',
    }
  }[lang as 'en' | 'ta'];

  return (
    <div id="book" className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 -mt-24 relative z-10 border border-gold/20">
      <h2 className="text-3xl font-serif font-bold text-wine mb-8 text-center">{t.title}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-wine mb-1">{t.name}</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gold/30 focus:ring-2 focus:ring-wine focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-wine mb-1">{t.email}</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gold/30 focus:ring-2 focus:ring-wine focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-wine mb-1">{t.phone}</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gold/30 focus:ring-2 focus:ring-wine focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-wine mb-1">{t.date}</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gold/30 focus:ring-2 focus:ring-wine focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-wine mb-1">{t.city}</label>
            <input
              type="text"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gold/30 focus:ring-2 focus:ring-wine focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-wine mb-1">{t.package}</label>
            <select
              value={packageType}
              onChange={(e) => setPackageType(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gold/30 focus:ring-2 focus:ring-wine focus:border-transparent"
            >
              <option value="Basic">Basic</option>
              <option value="Premium">Premium</option>
              <option value="Royal">Royal</option>
              <option value="Custom">Custom</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-wine mb-1">{t.services}</label>
            <div className="grid grid-cols-2 gap-2">
              {['Venues', 'Catering', 'Decoration', 'Photography', 'Entertainment', 'Planning'].map((service) => (
                <label key={service} className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={services.includes(service)}
                    onChange={(e) => {
                      if (e.target.checked) setServices([...services, service]);
                      else setServices(services.filter(s => s !== service));
                    }}
                    className="rounded border-gold/30 text-wine focus:ring-wine"
                  />
                  <span>{service}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-wine mb-1">{t.notes}</label>
          <textarea
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gold/30 focus:ring-2 focus:ring-wine focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full md:w-auto px-8 py-3 bg-wine text-white rounded-full font-bold hover:bg-wine/90 transition-colors disabled:bg-gray-400"
        >
          {status === 'submitting' ? '...' : t.submit}
        </button>

        {status === 'success' && (
          <p className="text-green-600 font-medium text-center">{t.success}</p>
        )}
        {status === 'error' && (
          <div className="text-red-600 text-center">
            <p className="font-medium">{t.error} {errorMessage}</p>
            <p className="text-sm">{t.tryAgain}</p>
          </div>
        )}
      </form>
    </div>
  );
}
