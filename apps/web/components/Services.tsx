import { Camera, Utensils, Music, Flower2, HeartHandshake, MapPin, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Services({ lang }: { lang: string }) {
  const services = [
    { 
      id: 'venues',
      icon: MapPin,
      title: { en: 'Venues', ta: 'திருமண மண்டபங்கள்' }, 
      desc: { en: 'Exclusive halls, resorts & destination venues.', ta: 'பிரத்யேக அரங்குகள், ஓய்வு விடுதிகள் & திருமண இடங்கள்.' } 
    },
    { 
      id: 'catering',
      icon: Utensils,
      title: { en: 'Catering', ta: 'உணவு சேவைகள்' }, 
      desc: { en: 'Authentic South Indian & multi-cuisine menus.', ta: 'அசல் தென்னிந்திய & பலவகை உணவு வகைகள்.' } 
    },
    { 
      id: 'decoration',
      icon: Flower2,
      title: { en: 'Decoration', ta: 'அலங்காரம்' }, 
      desc: { en: 'Grand stage, floral & theme decorations.', ta: 'பிரம்மாண்ட மேடை, மலர் & கருப்பொருள் அலங்காரங்கள்.' } 
    },
    { 
      id: 'photography',
      icon: Camera,
      title: { en: 'Photography', ta: 'புகைப்படம்' }, 
      desc: { en: 'Candid shots, cinematic video & drone coverage.', ta: 'இயல்பான புகைப்படங்கள், சினிமாத் தர வீடியோ & ட்ரோன்.' } 
    },
    { 
      id: 'entertainment',
      icon: Music,
      title: { en: 'Entertainment', ta: 'பொழுதுபோக்கு' }, 
      desc: { en: 'DJ, Nadaswaram, Live bands & Sangeet.', ta: 'DJ, நாதஸ்வரம், நேரடி இசைக்குழுக்கள் & சங்கீத்.' } 
    },
    { 
      id: 'planning',
      icon: HeartHandshake,
      title: { en: 'Planning', ta: 'திட்டமிடல்' }, 
      desc: { en: 'End-to-end wedding coordination & support.', ta: 'முழுமையான திருமண ஒருங்கிணைப்பு & ஆதரவு.' } 
    },
  ];

  const images: Record<string,string> = {
    venues: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    catering: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    decoration: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    photography: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    entertainment: 'https://images.unsplash.com/photo-1508970436-8b7bfa0e3fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    planning: 'https://images.unsplash.com/photo-1529336953121-dc2d0bbf0a99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  };

  return (
    <section id="services" className="py-24 bg-ivory relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] -mr-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-maroon/5 rounded-full blur-[100px] -ml-48"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold font-bold tracking-[0.2em] uppercase text-sm mb-4 block"
          >
            {lang === 'en' ? 'What We Offer' : 'நாங்கள் வழங்குபவை'}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            {lang === 'en' ? 'Our Premium Services' : 'எங்கள் பிரீமியம் சேவைகள்'}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-card group cursor-pointer overflow-hidden flex flex-col h-full"
              onClick={() => {
                try {
                  localStorage.setItem('selectedCategory', s.id);
                } catch {}
                window.location.hash = '#service-details';
                const el = document.getElementById('service-details');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={images[s.id]} 
                  alt={lang==='en'?s.title.en:s.title.ta} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  loading="lazy" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <span className="text-white font-medium flex items-center gap-2">
                    {lang === 'en' ? 'View Details' : 'விவரங்களைப் பார்க்கவும்'}
                    <ArrowUpRight size={18} />
                  </span>
                </div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg">
                  <s.icon className="text-maroon w-5 h-5" />
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-maroon mb-4 group-hover:text-gold transition-colors duration-300">
                  {lang === 'en' ? s.title.en : s.title.ta}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-8 flex-grow">
                  {lang === 'en' ? s.desc.en : s.desc.ta}
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-gold/10">
                  <span className="text-maroon font-serif italic text-sm opacity-60">
                    {lang==='en'?'Royal Excellence':'ராஜகம்பீர மேன்மை'}
                  </span>
                  <motion.a 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="#book" 
                    className="bg-maroon text-white px-6 py-2.5 rounded-full hover:bg-gold transition-colors duration-300 font-semibold text-sm shadow-md"
                    onClick={(e: React.MouseEvent) => e.stopPropagation()}
                  >
                    {lang==='en'?'Book Now':'இப்போதே முன்பதிவு'}
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
