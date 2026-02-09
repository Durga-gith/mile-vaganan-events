'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Footer from '../components/Footer';
import ReviewForm from '../components/ReviewForm';
import Offers from '../components/Offers';

export default function Home() {
  const [lang, setLang] = useState('en');

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <Services lang={lang} />
      <Offers lang={lang} />
      
      <ReviewForm lang={lang} />
    </main>
  );
}
