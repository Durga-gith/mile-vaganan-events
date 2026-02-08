import { Camera, Utensils, Music, Flower2, HeartHandshake, MapPin } from 'lucide-react';

export default function Services({ lang }: { lang: string }) {
  const services = [
    { 
      icon: MapPin,
      title: { en: 'Venues', ta: 'திருமண மண்டபங்கள்' }, 
      desc: { en: 'Exclusive halls, resorts & destination venues.', ta: 'பிரத்யேக அரங்குகள், ஓய்வு விடுதிகள் & திருமண இடங்கள்.' } 
    },
    { 
      icon: Utensils,
      title: { en: 'Catering', ta: 'உணவு சேவைகள்' }, 
      desc: { en: 'Authentic South Indian & multi-cuisine menus.', ta: 'அசல் தென்னிந்திய & பலவகை உணவு வகைகள்.' } 
    },
    { 
      icon: Flower2,
      title: { en: 'Decoration', ta: 'அலங்காரம்' }, 
      desc: { en: 'Grand stage, floral & theme decorations.', ta: 'பிரம்மாண்ட மேடை, மலர் & கருப்பொருள் அலங்காரங்கள்.' } 
    },
    { 
      icon: Camera,
      title: { en: 'Photography', ta: 'புகைப்படம்' }, 
      desc: { en: 'Candid shots, cinematic video & drone coverage.', ta: 'இயல்பான புகைப்படங்கள், சினிமாத் தர வீடியோ & ட்ரோன்.' } 
    },
    { 
      icon: Music,
      title: { en: 'Entertainment', ta: 'பொழுதுபோக்கு' }, 
      desc: { en: 'DJ, Nadaswaram, Live bands & Sangeet.', ta: 'DJ, நாதஸ்வரம், நேரடி இசைக்குழுக்கள் & சங்கீத்.' } 
    },
    { 
      icon: HeartHandshake,
      title: { en: 'Planning', ta: 'திட்டமிடல்' }, 
      desc: { en: 'End-to-end wedding coordination & support.', ta: 'முழுமையான திருமண ஒருங்கிணைப்பு & ஆதரவு.' } 
    },
  ];

  return (
    <section className="py-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-maroon mb-4 font-serif">
            {lang === 'en' ? 'Our Premium Services' : 'எங்கள் பிரீமியம் சேவைகள்'}
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, idx) => (
            <div key={idx} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border-t-4 border-gold group">
              <div className="bg-maroon-light w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-gold transition">
                <s.icon className="text-white w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-maroon mb-3">{lang === 'en' ? s.title.en : s.title.ta}</h3>
              <p className="text-gray-600 leading-relaxed">
                {lang === 'en' ? s.desc.en : s.desc.ta}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
