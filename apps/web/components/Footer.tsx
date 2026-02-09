import { Facebook, Instagram, Twitter, Mail, Phone } from 'lucide-react';

export default function Footer({ lang }: { lang: string }) {
  return (
    <footer className="bg-maroon-dark text-ivory pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-serif font-bold text-gold mb-6">Mile Vaganan</h3>
            <p className="text-gray-300 mb-6">
              {lang === 'en' 
                ? 'Making your special moments unforgettable with our world-class event management services.'
                : 'எங்கள் உலகத்தரம் வாய்ந்த நிகழ்வு மேலாண்மை சேவைகளுடன் உங்கள் சிறப்புத் தருணங்களை மறக்க முடியாததாக்குகிறோம்.'}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gold transition"><Facebook size={20} /></a>
              <a href="https://instagram.com/mile_vaganan_events" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition"><Instagram size={20} /></a>
              <a href="#" className="hover:text-gold transition"><Twitter size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-gold mb-6">{lang === 'en' ? 'Quick Links' : 'விரைவு இணைப்புகள்'}</h4>
            <ul className="space-y-3">
              <li><a href="#services" className="hover:text-gold transition">{lang === 'en' ? 'Services' : 'சேவைகள்'}</a></li>
              <li><a href="#packages" className="hover:text-gold transition">{lang === 'en' ? 'Packages' : 'தொகுப்புகள்'}</a></li>
              <li><a href="#offers" className="hover:text-gold transition">{lang === 'en' ? 'Offers' : 'சலுகைகள்'}</a></li>
              <li><a href="#reviews" className="hover:text-gold transition">{lang === 'en' ? 'Reviews' : 'விமர்சனங்கள்'}</a></li>
              <li><a href="#contact" className="hover:text-gold transition">{lang === 'en' ? 'Contact' : 'தொடர்புக்கு'}</a></li>
            </ul>
          </div>

          <div id="contact">
            <h4 className="text-lg font-bold text-gold mb-6">{lang === 'en' ? 'Services' : 'சேவைகள்'}</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-gold transition">{lang === 'en' ? 'Wedding Planning' : 'திருமண திட்டமிடல்'}</a></li>
              <li><a href="#" className="hover:text-gold transition">{lang === 'en' ? 'Catering' : 'உணவு சேவைகள்'}</a></li>
              <li><a href="#" className="hover:text-gold transition">{lang === 'en' ? 'Decoration' : 'அலங்காரம்'}</a></li>
              <li><a href="#" className="hover:text-gold transition">{lang === 'en' ? 'Photography' : 'புகைப்படம்'}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-gold mb-6">{lang === 'en' ? 'Contact Us' : 'தொடர்பு கொள்ள'}</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="flex-shrink-0 text-gold" size={18} />
                <span>+91 9363345067</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="flex-shrink-0 text-gold" size={18} />
                <span>milevagananevents@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Mile Vaganan Events. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function MapPinIcon({ className, size }: { className?: string, size?: number }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
