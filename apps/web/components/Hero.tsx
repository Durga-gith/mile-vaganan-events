import { ArrowRight } from 'lucide-react';

export default function Hero({ lang }: { lang: string }) {
  return (
    <div id="home" className="relative bg-gradient-to-r from-maroon-dark to-maroon text-ivory py-24 lg:py-32">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]"></div>
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
      </div>
    </div>
  );
}
