import { Camera, Utensils, Music, Flower2, HeartHandshake, MapPin } from 'lucide-react';

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
    <section id="services" className="py-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-maroon mb-4 font-serif">
            {lang === 'en' ? 'Our Premium Services' : 'எங்கள் பிரீமியம் சேவைகள்'}
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border-t-4 border-gold group cursor-pointer overflow-hidden"
              onClick={() => {
                try {
                  localStorage.setItem('selectedCategory', s.id);
                } catch {}
                window.location.hash = '#service-details';
                const el = document.getElementById('service-details');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <img src={images[s.id]} alt={lang==='en'?s.title.en:s.title.ta} className="w-full h-40 object-cover" loading="lazy" />
              <div className="p-8">
                <div className="bg-maroon-light w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-gold transition">
                  <s.icon className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-maroon mb-3">{lang === 'en' ? s.title.en : s.title.ta}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {lang === 'en' ? s.desc.en : s.desc.ta}
                </p>
                <div className="mt-6 flex justify-between">
                  <span className="text-sm text-gray-500">{lang==='en'?'Click for details':'விவரங்களுக்கு கிளிக் செய்யவும்'}</span>
                  <a href="#book" className="bg-maroon text-white px-4 py-2 rounded-full hover:bg-maroon-dark transition">
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
