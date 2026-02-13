'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function BookingForm({ lang }: { lang: string }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [city, setCity] = useState('');
  const [packageType, setPackageType] = useState('Basic');
  const [services, setServices] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');
    try {
      const apiBase = (process.env.NEXT_PUBLIC_API_URL || 'https://mile-vaganan-events-xaxq.onrender.com').replace(/\/$/, '');
      const apiUrl = `${apiBase}/services/lead`;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, date, city, packageType, services, notes }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server responded with ${response.status}: ${errorText}`);
      }
      
      setStatus('success');
      setName('');
      setEmail('');
      setPhone('');
      setDate('');
      setCity('');
      setNotes('');
      setServices([]);
    } catch (err: any) {
      console.error('Submission error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Unknown error occurred');
    }
  };

  const t = {
    en: {
      title: 'Begin Your Journey',
      subtitle: 'Tell us about your dream event and let us make it a royal reality.',
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      date: 'Event Date',
      city: 'City',
      package: 'Package Preference',
      services: 'Services Interested In',
      notes: 'Notes / Special Requests',
      submit: 'Request a Consultation',
      submitting: 'Sending Request...',
      success: 'Thank you for choosing Mile Vaganan!',
      successDesc: 'Your request has been received. Our royal planners will contact you within 24 hours.',
      error: 'Something went wrong',
      tryAgain: 'Please try again or contact us directly at milevagananevents@gmail.com',
    },
    ta: {
      title: 'உங்கள் பயணத்தைத் தொடங்குங்கள்',
      subtitle: 'உங்கள் கனவு நிகழ்வைப் பற்றி எங்களிடம் கூறுங்கள், நாங்கள் அதை ராஜகம்பீரமான உண்மையாக மாற்றுவோம்.',
      name: 'முழு பெயர்',
      email: 'மின்னஞ்சல் முகவரி',
      phone: 'தொலைபேசி எண்',
      date: 'நிகழ்வு தேதி',
      city: 'ஊர்',
      package: 'பேக்கேஜ் முன்னுரிமை',
      services: 'ஆர்வமுள்ள சேவைகள்',
      notes: 'குறிப்புகள் / சிறப்பு கோரிக்கைகள்',
      submit: 'ஆலோசனையை கோருங்கள்',
      submitting: 'அனுப்பப்படுகிறது...',
      success: 'மைல் வகானனைத் தேர்ந்தெடுத்ததற்கு நன்றி!',
      successDesc: 'உங்கள் கோரிக்கை பெறப்பட்டது. எங்கள் ராஜகம்பீரத் திட்டமிடுபவர்கள் 24 மணி நேரத்திற்குள் உங்களைத் தொடர்பு கொள்வார்கள்.',
      error: 'ஏதோ தவறு நடந்துவிட்டது',
      tryAgain: 'மீண்டும் முயற்சிக்கவும் அல்லது எங்களை நேரடியாக தொடர்பு கொள்ளவும்.',
    }
  }[lang as 'en' | 'ta'];

  const inputClasses = "w-full px-5 py-4 bg-ivory-dark/30 border-b-2 border-gold/20 focus:border-gold outline-none transition-all duration-300 placeholder:text-gray-400 font-medium";
  const labelClasses = "block text-xs uppercase tracking-widest font-bold text-maroon-light mb-2";

  return (
    <section id="book" className="py-24 px-4 bg-white relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto glass-card p-8 md:p-16 relative z-10"
      >
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">{t.title}</h2>
          <p className="text-gray-600 max-w-xl mx-auto italic">{t.subtitle}</p>
        </div>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-maroon mb-4">{t.success}</h3>
              <p className="text-gray-600 mb-8">{t.successDesc}</p>
              <button 
                onClick={() => setStatus('idle')}
                className="btn-gold px-8 py-3"
              >
                Send Another Request
              </button>
            </motion.div>
          ) : (
            <motion.form 
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit} 
              className="space-y-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                <div className="space-y-2">
                  <label className={labelClasses}>{t.name}</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClasses}
                  />
                </div>
                <div className="space-y-2">
                  <label className={labelClasses}>{t.email}</label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClasses}
                  />
                </div>
                <div className="space-y-2">
                  <label className={labelClasses}>{t.phone}</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 00000 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputClasses}
                  />
                </div>
                <div className="space-y-2">
                  <label className={labelClasses}>{t.date}</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={inputClasses}
                  />
                </div>
                <div className="space-y-2">
                  <label className={labelClasses}>{t.city}</label>
                  <input
                    type="text"
                    required
                    placeholder="Event location"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={inputClasses}
                  />
                </div>
                <div className="space-y-2">
                  <label className={labelClasses}>{t.package}</label>
                  <select
                    value={packageType}
                    onChange={(e) => setPackageType(e.target.value)}
                    className={inputClasses}
                  >
                    <option value="Basic">Classic Collection</option>
                    <option value="Premium">Royal Heritage</option>
                    <option value="Elite">Imperial Signature</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <label className={labelClasses}>{t.services}</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Decoration', 'Catering', 'Photography', 'Music', 'Venues', 'Planning'].map((s) => (
                    <label key={s} className="flex items-center gap-3 group cursor-pointer">
                      <input
                        type="checkbox"
                        checked={services.includes(s)}
                        onChange={(e) => {
                          if (e.target.checked) setServices([...services, s]);
                          else setServices(services.filter((x) => x !== s));
                        }}
                        className="w-5 h-5 rounded border-gold/30 text-gold focus:ring-gold"
                      />
                      <span className="text-gray-700 group-hover:text-maroon transition-colors">{s}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className={labelClasses}>{t.notes}</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your vision..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className={inputClasses + " resize-none"}
                ></textarea>
              </div>

              {status === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-red-50 border-l-4 border-red-500 p-4 flex items-start gap-3"
                >
                  <AlertCircle className="text-red-500 mt-0.5" size={20} />
                  <div>
                    <p className="text-red-800 font-bold">{t.error}</p>
                    <p className="text-red-700 text-sm">{errorMessage || t.tryAgain}</p>
                  </div>
                </motion.div>
              )}

              <div className="flex justify-center pt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={status === 'submitting'}
                  type="submit"
                  className="btn-gold px-12 py-5 text-xl shadow-2xl relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="animate-spin" size={24} />
                        {t.submitting}
                      </>
                    ) : (
                      <>
                        <Send size={24} />
                        {t.submit}
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </motion.button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
