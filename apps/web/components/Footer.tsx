import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer({ lang }: { lang: string }) {
  return (
    <footer className="bg-maroon-dark text-ivory pt-24 pb-12 relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5 bg-royal-pattern pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <h3 className="text-4xl font-serif font-bold tracking-tighter">
              Mile <span className="text-gold">Vaganan</span>
            </h3>
            <p className="text-ivory/70 leading-relaxed font-light">
              {lang === 'en' 
                ? 'Crafting extraordinary experiences for your most precious moments. We bring royal elegance and perfection to every event.'
                : 'உங்கள் மிக விலையுயர்ந்த தருணங்களுக்கு அசாதாரண அனுபவங்களை உருவாக்குதல். ஒவ்வொரு நிகழ்விற்கும் ராஜகம்பீர நேர்த்தியையும் முழுமையையும் கொண்டு வருகிறோம்.'}
            </p>
            <div className="flex space-x-6">
              {[Facebook, Instagram, Twitter].map((Icon, idx) => (
                <a 
                  key={idx} 
                  href={idx === 1 ? "https://instagram.com/mile_vaganan_events" : "#"} 
                  target={idx === 1 ? "_blank" : undefined}
                  rel={idx === 1 ? "noopener noreferrer" : undefined}
                  className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold hover:text-maroon-dark transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold text-gold mb-8 uppercase tracking-widest text-sm">{lang === 'en' ? 'Quick Navigation' : 'விரைவு வழிசெலுத்தல்'}</h4>
            <ul className="space-y-4 font-light">
              {[
                { en: 'Services', ta: 'சேவைகள்', href: '#services' },
                { en: 'Packages', ta: 'தொகுப்புகள்', href: '#packages' },
                { en: 'Offers', ta: 'சலுகைகள்', href: '#offers' },
                { en: 'Reviews', ta: 'விமர்சனங்கள்', href: '#reviews' },
                { en: 'Book Now', ta: 'முன்பதிவு', href: '#book' },
              ].map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="hover:text-gold transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-0 h-px bg-gold group-hover:w-4 transition-all duration-300"></span>
                    {lang === 'en' ? link.en : link.ta}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold text-gold mb-8 uppercase tracking-widest text-sm">{lang === 'en' ? 'Our Collections' : 'எங்கள் சேகரிப்புகள்'}</h4>
            <ul className="space-y-4 font-light">
              {[
                { en: 'Royal Weddings', ta: 'ராஜ திருமணங்கள்' },
                { en: 'Elite Catering', ta: 'எலைட் கேட்டரிங்' },
                { en: 'Floral Decoration', ta: 'மலர் அலங்காரம்' },
                { en: 'Cinematic Memories', ta: 'சினிமா நினைவுகள்' },
              ].map((item, idx) => (
                <li key={idx} className="hover:text-gold transition-colors duration-300 cursor-pointer flex items-center gap-2 group">
                  <span className="w-0 h-px bg-gold group-hover:w-4 transition-all duration-300"></span>
                  {lang === 'en' ? item.en : item.ta}
                </li>
              ))}
            </ul>
          </div>

          <div id="contact">
            <h4 className="text-xl font-bold text-gold mb-8 uppercase tracking-widest text-sm">{lang === 'en' ? 'Get In Touch' : 'தொடர்பு கொள்ள'}</h4>
            <ul className="space-y-6 font-light">
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                  <Phone className="text-gold" size={18} />
                </div>
                <div>
                  <p className="text-xs text-gold/60 uppercase tracking-widest mb-1 font-bold">Call Us</p>
                  <p className="text-lg">+91 9363345067</p>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                  <Mail className="text-gold" size={18} />
                </div>
                <div>
                  <p className="text-xs text-gold/60 uppercase tracking-widest mb-1 font-bold">Email Us</p>
                  <p className="text-lg">milevagananevents@gmail.com</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-gold/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-ivory/40 text-sm font-light">
              &copy; {new Date().getFullYear()} Mile Vaganan Events. Designed for Royal Excellence.
            </p>
            <p className="text-ivory/30 text-[10px] mt-1 italic uppercase tracking-wider">
              {lang === 'en' 
                ? 'Images are for representation purposes only.' 
                : 'படங்கள் விளக்கத்திற்காக மட்டுமே.'}
            </p>
          </div>
          <div className="flex gap-8 text-sm text-ivory/40 font-light">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
