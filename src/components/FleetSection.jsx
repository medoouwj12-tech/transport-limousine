import { useState } from 'react';
import { Users, Briefcase, Wifi, ShieldCheck, MapPin, Sparkles, Heart, HelpCircle, Check, ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { fleetData } from '../data/fleetData';
import { translations } from '../data/translations';

export default function FleetSection({ theme, lang, onSelectVehicle }) {
  const [activeTab, setActiveTab] = useState('family'); // 'family' or 'wedding'
  const [selectedSpecCar, setSelectedSpecCar] = useState(null); // for details popup
  const [activeGalleryIndex, setActiveGalleryIndex] = useState({});
  const [selectedGallery, setSelectedGallery] = useState(null);
  const t = translations[lang];

  const filteredFleet = fleetData.filter(car => car.category === activeTab);
  const galleryText = {
    view: lang === 'en' ? 'View gallery' : 'عرض الصور',
    close: lang === 'en' ? 'Close' : 'إغلاق',
    photo: lang === 'en' ? 'Photo' : 'صورة',
    next: lang === 'en' ? 'Next photo' : 'الصورة التالية',
    previous: lang === 'en' ? 'Previous photo' : 'الصورة السابقة'
  };

  const getCarImages = (car) => car.images?.length ? car.images : [car.image];

  const getActiveImageIndex = (car) => {
    const images = getCarImages(car);
    return Math.min(activeGalleryIndex[car.id] ?? 0, images.length - 1);
  };

  const setCarImage = (carId, imageIndex) => {
    setActiveGalleryIndex(prev => ({
      ...prev,
      [carId]: imageIndex
    }));
  };

  const moveCarImage = (car, direction) => {
    const images = getCarImages(car);
    const currentIndex = getActiveImageIndex(car);
    const nextIndex = (currentIndex + direction + images.length) % images.length;
    setCarImage(car.id, nextIndex);
  };

  const moveGalleryImage = (direction) => {
    setSelectedGallery(prev => {
      if (!prev) return prev;
      const images = getCarImages(prev.car);
      return {
        ...prev,
        imageIndex: (prev.imageIndex + direction + images.length) % images.length
      };
    });
  };

  // Helper to render icon for badge key
  const getBadgeIcon = (badgeKey) => {
    switch (badgeKey) {
      case 'specsHighSpeedWifi':
        return <Wifi className="w-3.5 h-3.5 text-gold-400" />;
      case 'specsGpsTracked':
        return <MapPin className="w-3.5 h-3.5 text-gold-400" />;
      case 'specsChildSeat':
        return <HelpCircle className="w-3.5 h-3.5 text-gold-400" />;
      case 'specsProfessionalChauffeur':
      case 'specsSuitAndTie':
        return <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />;
      case 'specsLuggage':
        return <Briefcase className="w-3.5 h-3.5 text-gold-400" />;
      case 'specsFlowerDecor':
        return <Heart className="w-3.5 h-3.5 text-gold-400" />;
      case 'specsRedCarpet':
      case 'specsSoundSystem':
        return <Sparkles className="w-3.5 h-3.5 text-gold-400" />;
      default:
        return <Check className="w-3.5 h-3.5 text-gold-400" />;
    }
  };

  return (
    <section id="fleet" className={`py-24 transition-colors duration-500 ease-in-out ${
      theme === 'dark' ? 'bg-[#080808] text-white' : 'bg-white text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold font-serif mb-4 tracking-wider uppercase">
            {t.fleetTitle}
          </h2>
          <div className="w-24 h-[1px] bg-gold-400 mx-auto mb-6" />
          <p className={`max-w-2xl mx-auto text-sm sm:text-base font-light ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {t.fleetSubtitle}
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-12">
          <div className={`inline-flex rounded-full p-1 border ${
            theme === 'dark' ? 'bg-pure-black/50 border-gold-500/20' : 'bg-gray-100 border-gray-300/60'
          }`}>
            <button
              onClick={() => setActiveTab('family')}
              className={`px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 uppercase cursor-pointer ${
                activeTab === 'family'
                  ? 'gold-gradient text-black font-extrabold shadow-md'
                  : theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
              }`}
            >
              {t.tabFamily}
            </button>
            <button
              onClick={() => setActiveTab('wedding')}
              className={`px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 uppercase cursor-pointer ${
                activeTab === 'wedding'
                  ? 'gold-gradient text-black font-extrabold shadow-md'
                  : theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
              }`}
            >
              {t.tabWedding}
            </button>
          </div>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFleet.map((car) => {
            const images = getCarImages(car);
            const activeImageIndex = getActiveImageIndex(car);
            const activeImage = images[activeImageIndex];

            return (
            <div
              key={car.id}
              className={`group rounded-3xl overflow-hidden border transition-all duration-500 hover:-translate-y-2 flex flex-col ${
                theme === 'dark'
                  ? 'bg-luxury-card/60 hover:bg-luxury-card/90 border-gold-500/10 hover:border-gold-500/30 shadow-2xl hover:shadow-gold/10'
                  : 'bg-[#FAF9F6] hover:bg-white border-gold-500/20 hover:border-gold-500/40 shadow-xl hover:shadow-gold/15'
              }`}
            >
              {/* Image Container with Zoom effect */}
              <div className="relative h-64 overflow-hidden bg-black/10">
                <button
                  type="button"
                  onClick={() => setSelectedGallery({ car, imageIndex: activeImageIndex })}
                  className="block w-full h-full cursor-zoom-in"
                  aria-label={`${galleryText.view}: ${lang === 'en' ? car.nameEn : car.nameAr}`}
                >
                  <img
                    src={activeImage}
                    alt={lang === 'en' ? car.nameEn : car.nameAr}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                  />
                </button>
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
                <div className="absolute top-4 right-4 bg-pure-black/75 backdrop-blur-md border border-gold-400/40 px-3.5 py-1.5 rounded-full">
                  <span className="text-xs font-bold text-gold-400">
                    {t.governorateCoverage}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedGallery({ car, imageIndex: activeImageIndex })}
                  className="absolute top-4 left-4 w-9 h-9 rounded-full bg-pure-black/75 border border-white/15 backdrop-blur-md flex items-center justify-center text-white hover:text-gold-400 hover:border-gold-400/40 transition-colors cursor-pointer"
                  aria-label={`${galleryText.view}: ${lang === 'en' ? car.nameEn : car.nameAr}`}
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => moveCarImage(car, -1)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-pure-black/70 border border-white/10 backdrop-blur-md flex items-center justify-center text-white hover:text-gold-400 hover:border-gold-400/40 transition-colors cursor-pointer"
                      aria-label={galleryText.previous}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveCarImage(car, 1)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-pure-black/70 border border-white/10 backdrop-blur-md flex items-center justify-center text-white hover:text-gold-400 hover:border-gold-400/40 transition-colors cursor-pointer"
                      aria-label={galleryText.next}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
                <div className="absolute left-4 bottom-4 rounded-full bg-pure-black/75 border border-white/10 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur-md">
                  {activeImageIndex + 1} / {images.length}
                </div>
                {images.length > 1 && (
                  <div className="absolute right-4 bottom-4 flex max-w-[62%] gap-1.5 overflow-hidden rounded-full bg-pure-black/65 border border-white/10 p-1.5 backdrop-blur-md">
                    {images.slice(0, 6).map((image, imageIndex) => (
                      <button
                        key={image}
                        type="button"
                        onClick={() => setCarImage(car.id, imageIndex)}
                        className={`h-8 w-8 flex-shrink-0 overflow-hidden rounded-full border transition-all cursor-pointer ${
                          imageIndex === activeImageIndex ? 'border-gold-400 opacity-100' : 'border-white/15 opacity-65 hover:opacity-100'
                        }`}
                        aria-label={`${galleryText.photo} ${imageIndex + 1}`}
                      >
                        <img src={image} alt="" className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Details */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-4">
                  <h3 className="text-xl font-bold font-serif tracking-wide">
                    {lang === 'en' ? car.nameEn : car.nameAr}
                  </h3>
                  <p className={`text-xs mt-1 font-light italic ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {lang === 'en' ? car.taglineEn : car.taglineAr}
                  </p>
                </div>

                {/* Capacity Badges */}
                <div className={`flex items-center space-x-4 mb-6 py-2.5 px-4 rounded-xl border text-xs font-semibold ${
                  theme === 'dark' ? 'bg-pure-black/35 border-white/5 text-gray-300' : 'bg-gray-50 border-black/5 text-gray-700'
                }`}>
                  <div className="flex items-center space-x-1.5">
                    <Users className="w-4 h-4 text-gold-400" />
                    <span>{car.passengers} {t.capacityPerson}</span>
                  </div>
                  <div className="h-4 w-[1px] bg-gold-400/30" />
                  <div className="flex items-center space-x-1.5">
                    <Briefcase className="w-4 h-4 text-gold-400" />
                    <span>{car.luggage} {t.capacityLuggage}</span>
                  </div>
                </div>

                {/* Service Highlights (Dynamic Badges) */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {car.badges.slice(0, 3).map((badgeKey) => (
                    <span
                      key={badgeKey}
                      className={`inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                        theme === 'dark'
                          ? 'bg-pure-black/55 border border-gold-500/10 text-gray-300'
                          : 'bg-white border border-gold-500/20 text-gray-700'
                      }`}
                    >
                      {getBadgeIcon(badgeKey)}
                      <span>{t[badgeKey]}</span>
                    </span>
                  ))}
                  {car.badges.length > 3 && (
                    <button
                      onClick={() => setSelectedSpecCar(car)}
                      className="inline-flex items-center space-x-1 px-2 py-1 rounded-lg text-[10px] font-bold text-gold-400 hover:text-gold-300 underline uppercase tracking-wider cursor-pointer"
                    >
                      <span>+{car.badges.length - 3} More</span>
                    </button>
                  )}
                </div>

                {/* Pricing & Booking Select */}
                <div className="mt-auto pt-6 border-t border-gold-500/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gold-500 tracking-widest block">{t.summaryPriceTitle}</span>
                    <div className="flex items-baseline space-x-1 mt-0.5">
                      <span className="text-xl sm:text-2xl font-serif font-extrabold gold-gradient-text">
                        {car.basePriceEgp.toLocaleString()}
                      </span>
                      <span className={`text-[10px] font-bold uppercase ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>EGP</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onSelectVehicle(car)}
                    className="gold-gradient hover:scale-105 active:scale-95 text-black font-extrabold text-xs px-5 py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-gold cursor-pointer"
                  >
                    {t.selectVehicle}
                  </button>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>

      {/* Vehicle VIP Specs Modal popup */}
      {selectedSpecCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className={`relative max-w-lg w-full rounded-3xl border p-8 shadow-2xl ${
            theme === 'dark' ? 'bg-[#0b0b0b] border-gold-500/30 text-white' : 'bg-white border-gold-500/40 text-black'
          }`}>
            <h3 className="text-2xl font-bold font-serif mb-2 gold-gradient-text">
              {lang === 'en' ? selectedSpecCar.nameEn : selectedSpecCar.nameAr}
            </h3>
            <p className={`text-xs italic mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              {lang === 'en' ? selectedSpecCar.taglineEn : selectedSpecCar.taglineAr}
            </p>

            <h4 className="text-xs uppercase font-extrabold text-gold-500 tracking-wider mb-4">
              {t.viewSpecs}
            </h4>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {selectedSpecCar.badges.map((badgeKey) => (
                <div
                  key={badgeKey}
                  className={`flex items-center space-x-2.5 p-3 rounded-xl border text-xs font-semibold ${
                    theme === 'dark' ? 'bg-pure-black/40 border-white/5' : 'bg-gray-50 border-black/5'
                  }`}
                >
                  <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-gold-400/10 flex items-center justify-center border border-gold-400/25">
                    {getBadgeIcon(badgeKey)}
                  </div>
                  <span className="text-[11px] font-bold text-gray-300 dark:text-gray-100">{t[badgeKey]}</span>
                </div>
              ))}
            </div>

            <h4 className="text-xs uppercase font-extrabold text-gold-500 tracking-wider mb-4">
              VIP Comfort Highlights
            </h4>
            <ul className="space-y-2 mb-8 text-xs font-medium text-gray-400 dark:text-gray-300">
              {(lang === 'en' ? selectedSpecCar.featuresEn : selectedSpecCar.featuresAr).map((feat, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between pt-6 border-t border-gold-500/10">
              <button
                onClick={() => setSelectedSpecCar(null)}
                className={`text-xs font-extrabold uppercase px-5 py-3.5 rounded-xl border transition-all duration-300 ${
                  theme === 'dark'
                    ? 'border-white/10 hover:bg-white/5 text-gray-300 hover:text-white'
                    : 'border-black/10 hover:bg-black/5 text-gray-700 hover:text-black'
                }`}
              >
                Close
              </button>
              <button
                onClick={() => {
                  onSelectVehicle(selectedSpecCar);
                  setSelectedSpecCar(null);
                }}
                className="gold-gradient text-black font-extrabold text-xs px-6 py-3.5 rounded-xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-md hover:shadow-gold"
              >
                {t.selectVehicle}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen vehicle gallery */}
      {selectedGallery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-6xl">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <h3 className="truncate text-lg sm:text-2xl font-bold font-serif text-white">
                  {lang === 'en' ? selectedGallery.car.nameEn : selectedGallery.car.nameAr}
                </h3>
                <p className="mt-1 text-xs font-bold text-gold-400">
                  {selectedGallery.imageIndex + 1} / {getCarImages(selectedGallery.car).length}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedGallery(null)}
                className="w-11 h-11 flex-shrink-0 rounded-full border border-white/15 bg-white/10 text-white hover:text-gold-400 hover:border-gold-400/40 transition-colors flex items-center justify-center cursor-pointer"
                aria-label={galleryText.close}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-gold-500/25 bg-pure-black">
              <img
                src={getCarImages(selectedGallery.car)[selectedGallery.imageIndex]}
                alt={lang === 'en' ? selectedGallery.car.nameEn : selectedGallery.car.nameAr}
                className="h-[68vh] w-full object-contain"
              />
              {getCarImages(selectedGallery.car).length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => moveGalleryImage(-1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-pure-black/75 border border-white/15 backdrop-blur-md flex items-center justify-center text-white hover:text-gold-400 hover:border-gold-400/40 transition-colors cursor-pointer"
                    aria-label={galleryText.previous}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveGalleryImage(1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-pure-black/75 border border-white/15 backdrop-blur-md flex items-center justify-center text-white hover:text-gold-400 hover:border-gold-400/40 transition-colors cursor-pointer"
                    aria-label={galleryText.next}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
              {getCarImages(selectedGallery.car).map((image, imageIndex) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setSelectedGallery(prev => ({ ...prev, imageIndex }))}
                  className={`h-16 w-20 flex-shrink-0 overflow-hidden rounded-xl border transition-all cursor-pointer ${
                    imageIndex === selectedGallery.imageIndex ? 'border-gold-400 opacity-100' : 'border-white/15 opacity-65 hover:opacity-100'
                  }`}
                  aria-label={`${galleryText.photo} ${imageIndex + 1}`}
                >
                  <img src={image} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
