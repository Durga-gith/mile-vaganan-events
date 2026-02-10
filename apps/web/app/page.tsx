'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import ReviewForm from '../components/ReviewForm';
import Offers from '../components/Offers';
import BookingForm from '../components/BookingForm';
import WeddingGallery from '../components/WeddingGallery';
import RoyalTimeline from '../components/RoyalTimeline';
import VenuesShowcase from '../components/VenuesShowcase';
import ServiceDetails from '../components/ServiceDetails';

export default function Home() {
  const [lang, setLang] = useState('en');

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <RoyalTimeline lang={lang} />
      <Services lang={lang} />
      <VenuesShowcase lang={lang} />
      <ServiceDetails lang={lang} />
      <WeddingGallery lang={lang} />
      <BookingForm lang={lang} />
      <Offers lang={lang} />
      <ReviewForm lang={lang} />
    </main>
  );
}
