'use client';

import { Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';

export default function Navbar({ lang, setLang }: { lang: string, setLang: (l: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { en: 'Venues', ta: 'மண்டபங்கள்', href: '#' },
    { en: 'Services', ta: 'சேவைகள்', href: '#' },
    { en: 'Packages', ta: 'தொகுப்புகள்', href: '#' },
    { en: 'Contact', ta: 'தொடர்புக்கு', href: '#' },
  ];

  return (
    <nav className="bg-ivory shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-maroon font-serif">
              Mile Vaganan
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, idx) => (
              <a key={idx} href={item.href} className="text-maroon hover:text-gold-dark transition font-medium">
                {lang === 'en' ? item.en : item.ta}
              </a>
            ))}
            <button 
              onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
              className="flex items-center gap-2 bg-maroon text-white px-4 py-2 rounded-full hover:bg-maroon-dark transition"
            >
              <Globe size={16} />
              {lang === 'en' ? 'தமிழ்' : 'English'}
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-maroon">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-ivory border-t border-gold-light">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item, idx) => (
              <a key={idx} href={item.href} className="block px-3 py-2 text-maroon hover:bg-gold-light rounded">
                {lang === 'en' ? item.en : item.ta}
              </a>
            ))}
            <button 
              onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
              className="w-full text-left flex items-center gap-2 px-3 py-2 text-maroon hover:bg-gold-light rounded"
            >
              <Globe size={16} />
              {lang === 'en' ? 'தமிழ்' : 'English'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
