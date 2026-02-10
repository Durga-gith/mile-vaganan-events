import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Hero({ lang }: { lang: string }) {
  const images = [
    'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % images.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <div id="home" className="relative bg-gradient-to-r from-maroon-dark to-maroon text-ivory py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="hero"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ${i===idx?'opacity-25':'opacity-0'}`}
            loading="eager"
          />
        ))}
      </div>
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]"></div>
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gold blur-3xl opacity-20"></div>
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-maroon-light blur-3xl opacity-20"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6 leading-tight">
          {lang === 'en' ? 'Crafting Royal Weddings' : 'ராஜகம்பீரமான திருமணங்களை உருவாக்குதல்'}
        </h1>
        <p className="text-xl md:text-2xl mb-10 text-gold-light max-w-3xl mx-auto">
          {lang === 'en' 
            ? 'From traditional rituals to modern celebrations, we bring your dream wedding to life with elegance and perfection.'
            : 'பாரம்பரிய சடங்குகள் முதல் நவீன கொண்டாட்டங்கள் வரை, உங்கள் கனவுத் திருமணத்தை நேர்த்தியுடனும் முழுமையுடனும் நிஜமாக்குகிறோம்.'}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="#book" className="bg-gold hover:bg-gold-dark text-maroon-dark font-bold py-3 px-8 rounded-full transition flex items-center justify-center gap-2">
            {lang === 'en' ? 'Book Now' : 'இப்போதே முன்பதிவு செய்யுங்கள்'}
            <ArrowRight size={20} />
          </a>
          <a href="#packages" className="border-2 border-gold text-gold hover:bg-gold hover:text-maroon-dark font-bold py-3 px-8 rounded-full transition">
            {lang === 'en' ? 'View Packages' : 'தொகுப்புகளைப் பார்க்கவும்'}
          </a>
        </div>
        <div className="mt-8 inline-flex items-center gap-3 px-4 py-2 rounded-full border border-gold/40 bg-white/10 backdrop-blur">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
          <span className="text-gold-light">{lang==='en'?'Royal Experience, Tailored for You':'உங்களுக்காக தனிப்பயன் ராஜ அனுபவம்'}</span>
        </div>
      </div>
    </div>
  );
}
