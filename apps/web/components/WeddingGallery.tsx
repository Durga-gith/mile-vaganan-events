'use client';

export default function WeddingGallery({ lang }: { lang: string }) {
  const images = [
    {
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: { en: 'Elegant Mandap Setup', ta: 'அழகான மண்டப அமைப்பு' }
    },
    {
      src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: { en: 'Beautiful Reception Hall', ta: 'அழகான வரவேற்பு மண்டபம்' }
    },
    {
      src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: { en: 'Traditional Wedding Decor', ta: 'பாரம்பரிய திருமண அலங்காரம்' }
    },
    {
      src: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: { en: 'Royal Wedding Stage', ta: 'ராஜகம்பீரமான திருமண மேடை' }
    },
    {
      src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: { en: 'Elegant Catering Setup', ta: 'அழகான கேட்டரிங் அமைப்பு' }
    },
    {
      src: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: { en: 'Beautiful Wedding Venue', ta: 'அழகான திருமண இடம்' }
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-maroon mb-4">
            {lang === 'en' ? 'Our Wedding Creations' : 'எங்கள் திருமண படைப்புகள்'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {lang === 'en'
              ? 'Explore our portfolio of stunning weddings we\'ve crafted with love and perfection.'
              : 'அன்புடன் மற்றும் சரியான முறையில் உருவாக்கிய அழகான திருமணங்களின் எங்கள் போர்ட்ஃபோலியோவை ஆராயுங்கள்.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                src={image.src}
                alt={image.title[lang as keyof typeof image.title]}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">
                    {image.title[lang as keyof typeof image.title]}
                  </h3>
                  <p className="text-sm opacity-90">
                    {lang === 'en' ? 'Click to view more details' : 'மேலும் விவரங்களைக் காண கிளிக் செய்யவும்'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-maroon text-white px-8 py-3 rounded-full hover:bg-maroon-dark transition font-medium">
            {lang === 'en' ? 'View Full Gallery' : 'முழு கேலரியைக் காண்க'}
          </button>
        </div>
      </div>
    </section>
  );
}