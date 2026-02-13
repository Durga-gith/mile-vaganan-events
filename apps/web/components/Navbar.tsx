'use client';

import { Menu, X, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ lang, setLang }: { lang: string, setLang: (l: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { en: 'Home', ta: 'முகப்பு', href: '#home' },
    { en: 'Services', ta: 'சேவைகள்', href: '#services' },
    { en: 'Packages', ta: 'தொகுப்புகள்', href: '#packages' },
    { en: 'Offers', ta: 'சலுகைகள்', href: '#offers' },
    { en: 'Reviews', ta: 'விமர்சனங்கள்', href: '#reviews' },
    { en: 'Mail Us', ta: 'மின்னஞ்சல்', href: 'mailto:milevagananevents@gmail.com' },
  ];

  const leftNavItems = navItems.slice(0, 3);
  const rightNavItems = navItems.slice(3);

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg py-1' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24 md:h-28">
          {/* Desktop Left Nav */}
          <div className="hidden md:flex items-center space-x-8 flex-1 justify-end">
            {leftNavItems.map((item, idx) => (
              <motion.a 
                key={idx} 
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`transition-all duration-300 font-medium hover:text-gold relative group ${
                  scrolled ? 'text-maroon' : 'text-ivory'
                }`}
              >
                {lang === 'en' ? item.en : item.ta}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
          </div>

          {/* Logo - Center */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center px-4 md:px-12 z-10"
          >
            <div className={`relative transition-all duration-500 ${scrolled ? 'h-14 w-14' : 'h-20 w-20'} mb-2`}>
              <img 
                src="/logo.jpg" 
                alt="Mile Vaganan Events Logo" 
                className="h-full w-full object-contain rounded-full shadow-lg border-2 border-gold/20"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
            <div className="flex flex-col items-center">
              <span className={`text-lg md:text-2xl font-bold font-serif tracking-tighter transition-colors duration-300 text-center leading-tight ${
                scrolled ? 'text-maroon' : 'text-ivory'
              }`}>
                Mile <span className="text-gold">Vaganan</span>
              </span>
              <span className={`text-[10px] md:text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
                scrolled ? 'text-maroon/60' : 'text-gold-light'
              }`}>
                Events
              </span>
            </div>
          </motion.div>
          
          {/* Desktop Right Nav */}
          <div className="hidden md:flex items-center space-x-8 flex-1 justify-start">
            {rightNavItems.map((item, idx) => (
              <motion.a 
                key={idx} 
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (idx + 3) * 0.1 }}
                className={`transition-all duration-300 font-medium hover:text-gold relative group ${
                  scrolled ? 'text-maroon' : 'text-ivory'
                }`}
              >
                {lang === 'en' ? item.en : item.ta}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 border ${
                scrolled 
                  ? 'bg-maroon text-white border-maroon hover:bg-maroon-dark' 
                  : 'bg-white/10 text-ivory border-ivory/30 hover:bg-white/20'
              }`}
            >
              <Globe size={16} />
              <span className="text-xs font-semibold tracking-wide">
                {lang === 'en' ? 'தமிழ்' : 'English'}
              </span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className={`transition-colors duration-300 ${scrolled ? 'text-maroon' : 'text-ivory'}`}
            >
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gold-light/20 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-8 space-y-2">
              {navItems.map((item, idx) => (
                <a 
                  key={idx} 
                  href={item.href} 
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-maroon hover:bg-gold-light/10 rounded-xl transition-colors font-medium text-lg"
                >
                  {lang === 'en' ? item.en : item.ta}
                </a>
              ))}
              <button 
                onClick={() => {
                  setLang(lang === 'en' ? 'ta' : 'en');
                  setIsOpen(false);
                }}
                className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-4 bg-maroon text-white rounded-xl font-bold"
              >
                <Globe size={20} />
                {lang === 'en' ? 'தமிழ்' : 'English'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
