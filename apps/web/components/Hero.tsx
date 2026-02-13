import { ArrowRight, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  }, [images.length]);

  return (
    <div id="home" className="relative h-screen flex items-center justify-center text-ivory overflow-hidden">
      {/* Background Image Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={idx}
            src={images[idx]}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.4, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-maroon-dark/60 mix-blend-multiply"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-20 bg-royal-pattern"></div>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-maroon-dark to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-maroon-dark to-transparent z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block text-gold-light tracking-[0.3em] uppercase text-sm mb-4 font-medium">
            {lang === 'en' ? 'Exquisite Event Planners' : 'நேர்த்தியான நிகழ்வு திட்டமிடுபவர்கள்'}
          </span>
          <h1 className="text-5xl md:text-8xl font-bold mb-8 leading-tight drop-shadow-2xl">
            {lang === 'en' ? 'Crafting Royal' : 'ராஜகம்பீரமான'}<br />
            <span className="text-gold italic font-serif">
              {lang === 'en' ? 'Weddings' : 'திருமணங்கள்'}
            </span>
          </h1>
          <p className="text-lg md:text-2xl mb-12 text-ivory/90 max-w-2xl mx-auto font-light leading-relaxed">
            {lang === 'en' 
              ? 'From traditional rituals to modern celebrations, we bring your dream wedding to life with elegance and perfection.'
              : 'பாரம்பரிய சடங்குகள் முதல் நவீன கொண்டாட்டங்கள் வரை, உங்கள் கனவுத் திருமணத்தை நேர்த்தியுடனும் முழுமையுடனும் நிஜமாக்குகிறோம்.'}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#book" 
              className="btn-gold px-10 py-4 text-lg"
            >
              {lang === 'en' ? 'Plan Your Event' : 'உங்கள் நிகழ்வைத் திட்டமிடுங்கள்'}
              <ArrowRight size={20} />
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#packages" 
              className="btn-outline-gold px-10 py-4 text-lg backdrop-blur-sm"
            >
              {lang === 'en' ? 'Our Collections' : 'எங்கள் சேகரிப்புகள்'}
            </motion.a>
          </div>
        </motion.div>

        {/* Floating elements */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-gold blur-[120px] opacity-20"
        ></motion.div>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full bg-maroon-light blur-[120px] opacity-20"
        ></motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-gold-light text-xs uppercase tracking-widest opacity-70">
          {lang === 'en' ? 'Scroll' : 'கீழே செல்லவும்'}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="text-gold" size={24} />
        </motion.div>
      </motion.div>
    </div>
  );
}
