import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { translations } from '../data/translations';

const TESTIMONIALS_DATA = {
  en: [
    {
      name: "General Mansour K.",
      role: "Diplomatic Attache, Cairo State Escort",
      quote: "Al Awadi Tourism has been our trusted partner for international delegation transfers. The bilingual chauffeurs are masterfully trained in high-profile diplomat protocols and safety standards. Absolute discretion.",
      rating: 5
    },
    {
      name: "Hassan & Amina A.",
      role: "Newlyweds (Katameya Heights, Cairo)",
      quote: "The Mercedes Cabriolet Wedding service was spectacular! The red carpet arrival, the elegant silk flower decor, and the chauffeur in a perfect suite and tie made our wedding entrance unforgettable. Worth every single EGP.",
      rating: 5
    },
    {
      name: "Dr. Sarah Miller",
      role: "Regional Director, Tech Corp",
      quote: "The Mercedes V-Class is a mobile first-class office. Traveling between Cairo and Alexandria was completely seamless—the high-speed Wi-Fi worked flawlessly, and the driver kept us perfectly on schedule.",
      rating: 5
    },
    {
      name: "Eng. Sherif H.",
      role: "Founder, Capital Investments",
      quote: "Excellent 24/7 concierge response. I booked a Range Rover Sport at 2:00 AM for an urgent trip to Hurghada, and the chauffeur was waiting outside my residence by 3:00 AM. Impeccable punctuality and driving.",
      rating: 5
    }
  ],
  ar: [
    {
      name: "سيادة اللواء منصور ك.",
      role: "الملحق الدبلوماسي، موكب القاهرة الرسمي",
      quote: "إيليت ليموزين شريكنا الموثوق لانتقالات الوفود الدبلوماسية الدولية. السائقون مدربون باحترافية تامة على بروتوكولات تأمين وخدمة كبار الشخصيات والسرية المطلقة.",
      rating: 5
    },
    {
      name: "حسن وأمينة أ.",
      role: "حديثي الزواج (القطامية هايتس، القاهرة)",
      quote: "خدمة سيارة الزفاف المكشوفة كانت مبهرة! السجادة الحمراء، والورد الحريري الفخم، والسائق المرتدي للبدلة الرسمية جعلوا ليلة زفافنا حدثاً استثنائياً لا ينسى. يستحق كل قرش.",
      rating: 5
    },
    {
      name: "د. سارة ميلر",
      role: "المدير الإقليمي لشركة تكنولوجيا دولية",
      quote: "سيارة مرسيدس V-Class هي مكتب طائر متنقل. السفر بين القاهرة والإسكندرية كان مريحاً للغاية—شبكة الواي فاي عملت دون انقطاع، والسائق كان قمة في الأدب والاحترافية.",
      rating: 5
    },
    {
      name: "م. شريف هـ.",
      role: "مؤسس شركة كابيتال للاستثمار",
      quote: "خدمة عملاء ممتازة على مدار 24 ساعة. قمت بحجز رينج روفر سبورت في الثانية صباحاً لرحلة طارئة للغردقة، وكان السائق أمام فيلتي في تمام الثالثة صباحاً. انضباط رائع.",
      rating: 5
    }
  ]
};

export default function Testimonials({ theme, lang }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const t = translations[lang];
  const list = TESTIMONIALS_DATA[lang];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % list.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [list.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + list.length) % list.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % list.length);
  };

  return (
    <section id="testimonials" className={`py-24 transition-colors duration-500 ease-in-out ${
      theme === 'dark' ? 'bg-[#080808] text-white' : 'bg-white text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase font-extrabold text-gold-500 tracking-widest block mb-2">
            VIP ENDORSEMENTS
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif mb-4 tracking-wider uppercase">
            {t.testimonialsTitle}
          </h2>
          <div className="w-24 h-[1px] bg-gold-400 mx-auto mb-6" />
          <p className={`max-w-2xl mx-auto text-sm sm:text-base font-light ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {t.testimonialsSubtitle}
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className={`relative max-w-4xl mx-auto rounded-3xl p-8 sm:p-12 border overflow-hidden ${
          theme === 'dark'
            ? 'bg-luxury-card/65 border-gold-500/15 gold-shadow'
            : 'bg-[#FAF9F6] border-gold-500/25 shadow-xl'
        }`}>
          {/* Quote Icon */}
          <div className="absolute top-6 right-6 opacity-10">
            <Quote className="w-28 h-28 text-gold-400" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center">
            
            {/* Stars */}
            <div className="flex items-center space-x-1 mb-6">
              {[...Array(list[activeIndex].rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-gold-400 fill-gold-400" />
              ))}
            </div>

            {/* Quote Body */}
            <p className="text-base sm:text-xl font-medium leading-relaxed italic mb-8 max-w-2xl">
              "{list[activeIndex].quote}"
            </p>

            {/* Reviewer Details */}
            <div>
              <h4 className="text-base sm:text-lg font-bold font-serif gold-gradient-text tracking-wide">
                {list[activeIndex].name}
              </h4>
              <span className={`text-xs mt-1 block font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {list[activeIndex].role}
              </span>
            </div>

            {/* Slider Dots */}
            <div className="flex items-center space-x-2 mt-8">
              {list.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    activeIndex === idx ? 'w-6 gold-gradient' : 'bg-gold-500/30'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className={`absolute top-1/2 -translate-y-1/2 left-4 p-2 rounded-xl border transition-all duration-300 opacity-60 hover:opacity-100 hidden sm:block ${
              theme === 'dark' ? 'border-white/10 hover:bg-white/5 text-white' : 'border-black/10 hover:bg-black/5 text-black'
            }`}
            aria-label="Previous Review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className={`absolute top-1/2 -translate-y-1/2 right-4 p-2 rounded-xl border transition-all duration-300 opacity-60 hover:opacity-100 hidden sm:block ${
              theme === 'dark' ? 'border-white/10 hover:bg-white/5 text-white' : 'border-black/10 hover:bg-black/5 text-black'
            }`}
            aria-label="Next Review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
