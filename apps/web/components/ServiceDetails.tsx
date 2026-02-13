'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Calendar, MapPin, Users, Phone, Mail } from 'lucide-react';

interface ServiceItem {
  id: string;
  category: 'venues' | 'catering' | 'decoration' | 'photography' | 'entertainment' | 'planning';
  name: { en: string; ta: string };
  description: { en: string; ta: string };
  price: string;
  image: string;
  features: { en: string[]; ta: string[] };
  capacity?: string;
  location?: string;
}

const services: ServiceItem[] = [
  {
    id: '1',
    category: 'venues',
    name: { en: 'Premium Wedding Venue – Chennai', ta: 'பிரீமியம் திருமண மண்டபம் – சென்னை' },
    description: {
      en: 'Elegant convention hall with traditional South Indian architecture, perfect for grand royal weddings.',
      ta: 'பாரம்பரிய தென்னிந்திய கட்டிடக்கலையுடன் கூடிய அழகான மாநாட்டு மண்டபம், பிரம்மாண்டமான திருமணங்களுக்கு சரியானது.'
    },
    price: 'For prices contact us',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    features: {
      en: ['AC Hall', 'Ample Parking', 'Stage decoration', 'Generator backup', 'Luxury Dressing rooms'],
      ta: ['ஏசி மண்டபம்', 'ஏராளமான பார்க்கிங்', 'மேடை அலங்காரம்', 'ஜெனரேட்டர் பேக்கப்', 'டிரஸ்ஸிங் ரூம்கள்']
    },
    capacity: '500-1000 guests',
    location: 'Chennai'
  },
  {
    id: '2',
    category: 'venues',
    name: { en: 'Luxury Resort – Coimbatore', ta: 'லக்ஸரி ரிசார்ட் – கோயம்புத்தூர்' },
    description: {
      en: 'Beautiful outdoor venue with lush gardens and traditional royal architecture.',
      ta: 'பசுமை தோட்டங்களுடன் கூடிய அழகான வெளிப்புற இடம் மற்றும் பாரம்பரிய கட்டிடக்கலை.'
    },
    price: 'For prices contact us',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    features: {
      en: ['Garden area', 'Outdoor mandap', 'Natural lighting', 'Photography spots', 'Green rooms'],
      ta: ['தோட்ட பகுதி', 'வெளிப்புற மண்டபம்', 'இயற்கை ஒளி', 'புகைப்பட இடங்கள்', 'கிரீன் ரூம்கள்']
    },
    capacity: '300-600 guests',
    location: 'Coimbatore'
  },
  {
    id: '3',
    category: 'catering',
    name: { en: 'Traditional South Indian Feast', ta: 'பாரம்பரிய தென்னிந்திய விருந்து' },
    description: {
      en: 'Authentic South Indian vegetarian cuisine with traditional serving style.',
      ta: 'பாரம்பரிய பரிமாறும் பாணியுடன் உண்மையான தென்னிந்திய சைவ உணவு.'
    },
    price: 'For prices contact us',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    features: {
      en: ['Traditional banana leaf service', '20+ varieties', 'Live dosa counter', 'Sweet varieties', 'Professional service'],
      ta: ['பாரம்பரிய வாழை இலை சேவை', '20+ வகைகள்', 'லைவ் தோசை கவுண்டர்', 'இனிப்பு வகைகள்', 'தொழில்முறை சேவை']
    }
  },
  {
    id: '4',
    category: 'decoration',
    name: { en: 'Royal Mandap Decoration', ta: 'ராஜகம்பீர மண்டப அலங்காரம்' },
    description: {
      en: 'Grand mandap setup with fresh flowers, traditional elements and modern lighting.',
      ta: 'புதிய பூக்கள், பாரம்பரிய உறுப்புகள் மற்றும் நவீன ஒளியுடன் பிரம்மாண்டமான மண்டப அமைப்பு.'
    },
    price: 'For prices contact us',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    features: {
      en: ['Fresh flower arrangements', 'Traditional motifs', 'LED lighting', 'Fabric draping', 'Entrance decoration'],
      ta: ['புதிய பூ அலங்காரங்கள்', 'பாரம்பரிய மோட்டிப்கள்', 'எல்இடி ஒளி', 'பேப்ரிக் டிராப்பிங்', 'நுழைவு அலங்காரம்']
    }
  },
  {
    id: '5',
    category: 'photography',
    name: { en: 'Premium Wedding Photography', ta: 'பிரீமியம் திருமண புகைப்படம்' },
    description: {
      en: 'Professional wedding photography with cinematic style and traditional coverage.',
      ta: 'சினிமாடிக் பாணி மற்றும் பாரம்பரிய கவரேஜுடன் தொழில்முறை திருமண புகைப்படம்.'
    },
    price: 'For prices contact us',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    features: {
      en: ['2 photographers + 1 videographer', 'Drone shots', 'Traditional poses', 'Candid moments', 'Edited album'],
      ta: ['2 புகைப்படகர்கள் + 1 வீடியோகிராபர்', 'ட்ரோன் ஷாட்கள்', 'பாரம்பரிய நிலைகள்', 'நேர்த்தியான தருணங்கள்', 'திருத்திய ஆல்பம்']
    }
  },
  {
    id: '6',
    category: 'entertainment',
    name: { en: 'Live Music & Entertainment', ta: 'நேரடி இசை & பொழுதுபோக்கு' },
    description: {
      en: 'Traditional Nadaswaram, live bands, and cinematic DJ performances for your special day.',
      ta: 'உங்கள் சிறப்பு நாளுக்காக பாரம்பரிய நாஸ்வரம், நேரடி இசைக்குழுக்கள் மற்றும் சினிமா டிஜே நிகழ்ச்சிகள்.'
    },
    price: 'For prices contact us',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    features: {
      en: ['Nadaswaram troupe', 'Live acoustic band', 'Professional DJ', 'Sound system included', 'Stage setup'],
      ta: ['நாதஸ்வரக் குழு', 'நேரடி இசைக்குழு', 'தொழில்முறை DJ', 'ஒலி அமைப்பு சேர்க்கப்பட்டுள்ளது', 'மேடை அமைப்பு']
    }
  },
  {
    id: '7',
    category: 'planning',
    name: { en: 'Full Wedding Coordination', ta: 'முழுமையான திருமண ஒருங்கிணைப்பு' },
    description: {
      en: 'End-to-end wedding planning and management services for a stress-free royal celebration.',
      ta: 'மன அழுத்தமில்லாத ராஜகம்பீர கொண்டாட்டத்திற்கான முழுமையான திருமணத் திட்டமிடல் மற்றும் மேலாண்மை சேவைகள்.'
    },
    price: 'For prices contact us',
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    features: {
      en: ['Budget management', 'Vendor coordination', 'Timeline planning', 'Guest hospitality', 'On-day support'],
      ta: ['பட்ஜெட் மேலாண்மை', 'விற்பனையாளர் ஒருங்கிணைப்பு', 'திட்டமிடல்', 'விருந்தினர் உபசரிப்பு', 'திருமண நாள் ஆதரவு']
    }
  }
];

export default function ServiceDetails({ lang }: { lang: string }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('venues');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  useEffect(() => {
    try {
      const saved = localStorage.getItem('selectedCategory');
      if (saved) setSelectedCategory(saved);
    } catch {}
  }, []);

  const categories = [
    { id: 'venues', en: 'Venues', ta: 'இடங்கள்' },
    { id: 'catering', en: 'Catering', ta: 'உணவு சேவைகள்' },
    { id: 'decoration', en: 'Decoration', ta: 'அலங்காரம்' },
    { id: 'photography', en: 'Photography', ta: 'புகைப்படம்' },
    { id: 'entertainment', en: 'Entertainment', ta: 'பொழுதுபோக்கு' },
    { id: 'planning', en: 'Planning', ta: 'திட்டமிடல்' }
  ];

  const filteredServices = services.filter(service => service.category === selectedCategory);

  if (selectedService) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => setSelectedService(null)}
            className="mb-6 flex items-center gap-2 text-maroon hover:text-maroon-dark transition"
          >
            ← {lang === 'en' ? 'Back to Services' : 'சேவைகளுக்கு திரும்பு'}
          </button>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <img
                  src={selectedService.image}
                  alt={selectedService.name[lang as keyof typeof selectedService.name]}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
              <div className="p-8">
                <h1 className="text-3xl font-bold text-maroon mb-4">
                  {selectedService.name[lang as keyof typeof selectedService.name]}
                </h1>
                <p className="text-gray-600 mb-6">
                  {selectedService.description[lang as keyof typeof selectedService.description]}
                </p>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-maroon mb-3">
                    {lang === 'en' ? 'Price Range' : 'விலை வரம்பு'}
                  </h3>
                  <p className="text-2xl font-bold text-gold">{selectedService.price}</p>
                </div>

                {selectedService.capacity && (
                  <div className="mb-4 flex items-center gap-2">
                    <Users className="text-gold" size={20} />
                    <span>{selectedService.capacity}</span>
                  </div>
                )}

                {selectedService.location && (
                  <div className="mb-4 flex items-center gap-2">
                    <MapPin className="text-gold" size={20} />
                    <span>{selectedService.location}</span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-maroon mb-3">
                    {lang === 'en' ? 'Features' : 'சிறப்பம்சங்கள்'}
                  </h3>
                  <ul className="space-y-2">
                    {selectedService.features[lang as keyof typeof selectedService.features].map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="text-gold">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-4">
                  <a
                    href="#book"
                    className="bg-maroon text-white px-6 py-3 rounded-full hover:bg-maroon-dark transition flex items-center gap-2"
                    onClick={() => {
                      // Store selected service in localStorage for booking form
                      localStorage.setItem('selectedService', JSON.stringify(selectedService));
                    }}
                  >
                    <Calendar size={20} />
                    {lang === 'en' ? 'Book This Service' : 'இந்த சேவையை முன்பதிவு செய்யுங்கள்'}
                  </a>
                  <a
                    href={`mailto:milevagananevents@gmail.com`}
                    className="bg-gold text-maroon-dark px-6 py-3 rounded-full hover:bg-gold-dark transition flex items-center gap-2"
                  >
                    <Mail size={20} />
                    {lang === 'en' ? 'Mail Us Now' : 'இப்போது எங்களுக்கு மின்னஞ்சல் அனுப்புங்கள்'}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section id="service-details" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-maroon mb-4">
            {lang === 'en' ? 'Our Services' : 'எங்கள் சேவைகள்'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {lang === 'en'
              ? 'Explore our premium wedding services with detailed pricing and stunning visuals.'
              : 'விலை மற்றும் அழகான காட்சிகளுடன் எங்கள் பிரீமியம் திருமண சேவைகளை ஆராயுங்கள்.'}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition ${
                selectedCategory === category.id
                  ? 'bg-maroon text-white'
                  : 'bg-white text-maroon hover:bg-maroon hover:text-white border border-maroon'
              }`}
            >
              {lang === 'en' ? category.en : category.ta}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => setSelectedService(service)}
            >
              <div className="relative">
                <img
                  src={service.image}
                  alt={service.name[lang as keyof typeof service.name]}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 bg-gold text-maroon-dark px-3 py-1 rounded-full text-sm font-semibold">
                  {service.price}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-maroon mb-2">
                  {service.name[lang as keyof typeof service.name]}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {service.description[lang as keyof typeof service.description]}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {lang === 'en' ? 'Click for details' : 'விவரங்களுக்கு கிளிக் செய்யவும்'}
                  </span>
                  <ArrowRight className="text-maroon" size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
