'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Footer from '../components/Footer';

export default function Home() {
  const [lang, setLang] = useState('en');

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <Services lang={lang} />
      
      {/* Testimonial Section (Quick Add) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold text-maroon mb-12">
            {lang === 'en' ? 'Happy Couples' : 'மகிழ்ச்சியான தம்பதிகள்'}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-ivory p-8 rounded-lg italic text-gray-700 shadow">
              "The decoration was absolutely stunning! Mile Vaganan made our wedding look like a movie scene."
              <div className="mt-4 font-bold text-maroon">- Priya & Karthik</div>
            </div>
            <div className="bg-ivory p-8 rounded-lg italic text-gray-700 shadow">
              "எங்கள் திருமணத்தை மிகச் சிறப்பாக நடத்தியதற்கு நன்றி. உணவு மிகவும் சுவையாக இருந்தது!"
              <div className="mt-4 font-bold text-maroon">- Lakshmi & Ravi</div>
            </div>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
    </main>
  );
}
