'use client';

import { Crown, HeartHandshake, Flower2, Camera, Music, Calendar } from 'lucide-react';

export default function RoyalTimeline({ lang }: { lang: string }) {
  const steps = [
    {
      icon: Crown,
      title: { en: 'Royal Concept', ta: 'ராஜகம்பீரக் கான்செப்ட்' },
      desc: {
        en: 'We craft a signature theme that reflects your story.',
        ta: 'உங்கள் கதையை பிரதிபலிக்கும் தனித்துவமான கருப்பொருளை வடிவமைக்கிறோம்.'
      }
    },
    {
      icon: Flower2,
      title: { en: 'Tradition & Decor', ta: 'பாரம்பரியம் & அலங்காரம்' },
      desc: {
        en: 'Mandap, florals and elements curated with heritage.',
        ta: 'மண்டபம், மலர்கள் மற்றும் பாரம்பரிய அம்சங்கள் கவனமாக தேர்ந்தெடுக்கப்படுகின்றன.'
      }
    },
    {
      icon: Camera,
      title: { en: 'Cinematic Memories', ta: 'சினிமாடிக் நினைவுகள்' },
      desc: {
        en: 'Premium photography and film to preserve your moments.',
        ta: 'உங்கள் தருணங்களை பாதுகாக்க பிரீமியம் புகைப்படம் & படம்.'
      }
    },
    {
      icon: Music,
      title: { en: 'Celebration & Rhythm', ta: 'கொண்டாட்டம் & இசை' },
      desc: {
        en: 'Live music, dance and rituals beautifully orchestrated.',
        ta: 'நேரடி இசை, நடனம் மற்றும் சடங்குகள் அழகாக ஒருங்கிணைக்கப்படுகின்றன.'
      }
    },
    {
      icon: Calendar,
      title: { en: 'Flawless Coordination', ta: 'வழுக்காத ஒருங்கிணைப்பு' },
      desc: {
        en: 'From invitations to send-off, a seamless royal flow.',
        ta: 'அழைப்பிதழ் முதல் விடை கொடுக்கும் வரை, ராஜகம்பீரமான ஓட்டம்.'
      }
    },
  ];

  return (
    <section id="story" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-serif font-bold text-maroon mb-3">
            {lang === 'en' ? 'Royal Storyline' : 'ராஜகம்பீரக் கதையோட்டம்'}
          </h2>
          <p className="text-gray-600">
            {lang === 'en'
              ? 'A unique journey designed exclusively for your wedding.'
              : 'உங்கள் திருமணத்திற்காக தனிப்பட்ட முறையில் வடிவமைக்கப்பட்ட ஒரு தனித்துவமான பயணம்.'}
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gold/40 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {steps.map((s, i) => {
              const Side = i % 2 === 0 ? 'md:justify-self-end' : 'md:justify-self-start';
              return (
                <div key={i} className={`relative ${Side}`}>
                  <div className="bg-ivory p-6 rounded-xl shadow hover:shadow-lg transition max-w-md">
                    <div className="flex items-center gap-3 mb-2">
                      <s.icon className="text-gold" size={24} />
                      <h3 className="text-xl font-semibold text-maroon">
                        {lang === 'en' ? s.title.en : s.title.ta}
                      </h3>
                    </div>
                    <p className="text-gray-700">{lang === 'en' ? s.desc.en : s.desc.ta}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-12 text-center">
            <a href="#book" className="inline-block bg-maroon text-white px-8 py-3 rounded-full hover:bg-maroon-dark transition">
              {lang === 'en' ? 'Begin Your Royal Journey' : 'உங்கள் ராஜகம்பீரப் பயணத்தை தொடங்குங்கள்'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
