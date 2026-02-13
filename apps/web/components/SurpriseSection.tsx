'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function SurpriseSection({ lang }: { lang: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const t = {
    en: {
      preTitle: "We have a special surprise for our couples…",
      instruction: "Curious? Click the curtains to reveal.",
      giftTitle: "A Gift From Mile Vaganan Events",
      body1: "We don’t just plan your wedding.",
      body2: "We preserve your memories forever.",
      featureIntro: "We create a Complimentary Personalized Wedding Website just for you, including:",
      features: [
        "Bride & Groom Names",
        "Your Love Story",
        "Photos & Videos",
        "Shareable Link",
        "Guest Gallery"
      ],
      cta: "Claim My Digital Wedding Website"
    },
    ta: {
      preTitle: "எங்கள் ஜோடிகளுக்கு ஒரு சிறப்பு ஆச்சரியம் உள்ளது...",
      instruction: "ஆர்வமா? வெளிப்படுத்த திரைச்சீலைகளைக் கிளிக் செய்யவும்.",
      giftTitle: "மைல் வகானன் நிகழ்வுகளின் ஒரு பரிசு",
      body1: "நாங்கள் உங்கள் திருமணத்தை மட்டும் திட்டமிடவில்லை.",
      body2: "நாங்கள் உங்கள் நினைவுகளை என்றென்றும் பாதுகாக்கிறோம்.",
      featureIntro: "உங்களுக்காகவே ஒரு பாராட்டுக்குரிய தனிப்பயனாக்கப்பட்ட திருமண வலைத்தளத்தை நாங்கள் உருவாக்குகிறோம்:",
      features: [
        "மணமகன் மற்றும் மணமகள் பெயர்கள்",
        "உங்கள் காதல் கதை",
        "புகைப்படங்கள் மற்றும் வீடியோக்கள்",
        "பகிர்ந்து கொள்ளக்கூடிய இணைப்பு",
        "விருந்தினர் கேலரி"
      ],
      cta: "எனது டிஜிட்டல் திருமண வலைத்தளத்தைப் பெறுங்கள்"
    }
  }[lang as 'en' | 'ta'];

  return (
    <section className="relative py-24 bg-maroon-dark overflow-hidden min-h-[600px] flex items-center justify-center">
      {/* Sparkle background when open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 pointer-events-none"
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  opacity: 0, 
                  scale: 0,
                  x: Math.random() * 100 + "%", 
                  y: Math.random() * 100 + "%" 
                }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{ 
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
                className="absolute text-gold"
              >
                <Sparkles size={Math.random() * 20 + 10} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl w-full px-4 text-center relative z-10">
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h2 className="text-2xl md:text-3xl text-gold font-serif mb-4">
              {t.preTitle}
            </h2>
            <p className="text-ivory/80 italic animate-pulse">
              {t.instruction}
            </p>
          </motion.div>
        )}

        <div className="relative mx-auto w-full max-w-2xl aspect-[16/9] perspective-1000">
          {/* Revealed Content */}
          <div className="absolute inset-0 flex items-center justify-center bg-ivory/5 backdrop-blur-sm border-2 border-gold/30 rounded-lg p-8 shadow-2xl overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-ivory"
            >
              <h3 className="text-3xl md:text-4xl font-serif text-gold mb-6">
                {t.giftTitle}
              </h3>
              <p className="text-xl mb-2 font-medium">{t.body1}</p>
              <p className="text-xl mb-6 text-gold-light">{t.body2}</p>
              
              <div className="bg-white/10 p-6 rounded-xl border border-gold/20 mb-8 text-left inline-block mx-auto">
                <p className="mb-4 font-semibold text-gold-light">{t.featureIntro}</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm md:text-base">
                  {t.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="mailto:milevagananevents@gmail.com"
                  className="inline-block bg-gold hover:bg-gold-dark text-maroon-dark font-bold py-4 px-10 rounded-full transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                >
                  {t.cta}
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Curtains */}
          <motion.div
            onClick={() => setIsOpen(true)}
            className="absolute inset-0 z-20 cursor-pointer flex"
          >
            {/* Left Curtain */}
            <motion.div
              animate={isOpen ? { x: "-100%", rotateY: -30, opacity: 0 } : { x: "0%", rotateY: 0, opacity: 1 }}
              transition={{ duration: 2, ease: [0.45, 0.05, 0.55, 0.95] }}
              className="relative w-1/2 h-full bg-[#800000] border-r-4 border-gold/40 shadow-[inset_-30px_0_60px_rgba(0,0,0,0.7),10px_0_30px_rgba(0,0,0,0.5)] flex flex-col justify-between overflow-hidden"
              style={{
                backgroundImage: `url('https://www.transparenttextures.com/patterns/royal-lineage.png'), repeating-linear-gradient(90deg, #800000, #800000 30px, #700000 31px, #700000 60px)`,
                transformOrigin: "left center"
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent pointer-events-none" />
              {/* Decorative Border */}
              <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-b from-gold-light via-gold to-gold-dark shadow-lg" />
            </motion.div>

            {/* Right Curtain */}
            <motion.div
              animate={isOpen ? { x: "100%", rotateY: 30, opacity: 0 } : { x: "0%", rotateY: 0, opacity: 1 }}
              transition={{ duration: 2, ease: [0.45, 0.05, 0.55, 0.95] }}
              className="relative w-1/2 h-full bg-[#800000] border-l-4 border-gold/40 shadow-[inset_30px_0_60px_rgba(0,0,0,0.7),-10px_0_30px_rgba(0,0,0,0.5)] flex flex-col justify-between overflow-hidden"
              style={{
                backgroundImage: `url('https://www.transparenttextures.com/patterns/royal-lineage.png'), repeating-linear-gradient(90deg, #800000, #800000 30px, #700000 31px, #700000 60px)`,
                transformOrigin: "right center"
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-l from-black/20 via-transparent to-transparent pointer-events-none" />
              {/* Decorative Border */}
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-gold-light via-gold to-gold-dark shadow-lg" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
}
