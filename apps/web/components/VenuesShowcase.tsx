'use client';

import { MapPin, Calendar, ArrowRight } from 'lucide-react';

export default function VenuesShowcase({ lang }: { lang: string }) {
  const cards = [
    {
      title: { en: 'Royal Palace Convention Hall', ta: 'ராயல் பாலஸ் மாநாட்டு மண்டபம்' },
      city: 'Chennai',
      img: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      price: '₹75,000 - ₹1,50,000'
    },
    {
      title: { en: 'Heritage Garden Resort', ta: 'பாரம்பரிய தோட்ட ரிசார்ட்' },
      city: 'Coimbatore',
      img: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      price: '₹50,000 - ₹1,00,000'
    },
    {
      title: { en: 'Classic Grand Hall', ta: 'கிளாசிக் கிராண்ட் ஹால்' },
      city: 'Madurai',
      img: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      price: '₹60,000 - ₹1,20,000'
    },
  ];

  return (
    <section id="venues" className="py-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-maroon mb-3">
            {lang === 'en' ? 'Signature Venues' : 'ஒப்பற்ற திருமண இடங்கள்'}
          </h2>
          <p className="text-gray-600">
            {lang === 'en' ? 'Handpicked destinations to host your royal celebration.' : 'உங்கள் ராஜகம்பீரக் கொண்டாட்டத்திற்கான தேர்ந்தெடுக்கப்பட்ட இடங்கள்.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((c, i) => (
            <div key={i} className="group rounded-xl overflow-hidden shadow hover:shadow-xl transition bg-white">
              <div className="relative">
                <img src={c.img} alt={lang==='en'?c.title.en:c.title.ta} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-3 left-3 bg-gold text-maroon-dark px-3 py-1 rounded-full text-sm font-semibold">{c.price}</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-maroon mb-2">{lang==='en'?c.title.en:c.title.ta}</h3>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MapPin size={18} className="text-gold" />
                  <span>{c.city}</span>
                </div>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => {
                      try { localStorage.setItem('selectedCategory','venues'); } catch {}
                      window.location.hash = '#service-details';
                      const el = document.getElementById('service-details');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 bg-maroon text-white px-5 py-2 rounded-full hover:bg-maroon-dark transition"
                  >
                    <ArrowRight size={18} />
                    {lang==='en'?'Explore Venue':'இடத்தை காண'}
                  </button>
                  <a href="#book" className="inline-flex items-center gap-2 text-maroon hover:text-maroon-dark transition">
                    <Calendar size={18} />
                    {lang==='en'?'Book Now':'இப்போதே முன்பதிவு'}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
