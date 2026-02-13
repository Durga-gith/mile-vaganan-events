export default function Offers({ lang }: { lang: string }) {
  return (
    <section id="packages" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold text-maroon mb-8">
          {lang === 'en' ? 'Wedding Packages' : 'திருமண தொகுப்புகள்'}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-ivory p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold text-maroon mb-2">Basic</h3>
            <p className="text-gray-700 mb-4 font-semibold">{lang === 'en' ? 'Contact us for pricing' : 'விலை விவரங்களுக்கு எங்களை தொடர்பு கொள்ளவும்'}</p>
            <ul className="text-gray-700 space-y-2">
              <li>Hall</li>
              <li>Veg Catering (300 pax)</li>
              <li>Simple Decoration</li>
              <li>Traditional Photography</li>
              <li>Iyer</li>
            </ul>
          </div>
          <div className="bg-ivory p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold text-maroon mb-2">Premium</h3>
            <p className="text-gray-700 mb-4 font-semibold">{lang === 'en' ? 'Contact us for pricing' : 'விலை விவரங்களுக்கு எங்களை தொடர்பு கொள்ளவும்'}</p>
            <ul className="text-gray-700 space-y-2">
              <li>Premium Hall</li>
              <li>Catering (500 pax)</li>
              <li>Floral Decor</li>
              <li>Candid + Video</li>
              <li>Bridal Makeup, DJ</li>
            </ul>
          </div>
          <div className="bg-ivory p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold text-maroon mb-2">Luxury</h3>
            <p className="text-gray-700 mb-4 font-semibold">{lang === 'en' ? 'Contact us for pricing' : 'விலை விவரங்களுக்கு எங்களை தொடர்பு கொள்ளவும்'}</p>
            <ul className="text-gray-700 space-y-2">
              <li>Luxury Venue</li>
              <li>Premium Catering</li>
              <li>Theme Decor</li>
              <li>Cinematic + Drone</li>
              <li>Celebrity Makeup</li>
              <li>Full Wedding Planner</li>
            </ul>
          </div>
        </div>

        <div id="offers" className="mt-16 bg-ivory p-6 rounded-lg shadow">
          <h3 className="text-2xl font-serif font-bold text-maroon mb-4">
            FIRST 10 ROYAL WEDDING OFFER
          </h3>
          <p className="text-gray-800 mb-4 font-semibold">{lang === 'en' ? 'Exclusive Flat Discount + FREE Wedding Gift (choose one):' : 'பிரத்யேக தள்ளுபடி + இலவச திருமண பரிசு (ஒன்றைத் தேர்ந்தெடுக்கவும்):'}</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-800">
            <li>Free Digital Invitation</li>
            <li>Free Drone Shoot (15 mins)</li>
            <li>50 Return Gift Hampers</li>
            <li>Groom Makeup FREE</li>
            <li>Complimentary Personalized Wedding Website (bride & groom name, photos/videos, shareable link)</li>
          </ul>
          <a href="mailto:milevagananevents@gmail.com" className="inline-block mt-6 bg-maroon text-white px-6 py-3 rounded-full hover:bg-maroon-dark">
            {lang === 'en' ? 'Mail to Claim Offer' : 'சலுகையைப் பெற மின்னஞ்சல் செய்யவும்'}
          </a>
        </div>
      </div>
    </section>
  );
}
