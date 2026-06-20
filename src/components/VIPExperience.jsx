import { Shield, Languages, EyeOff, Award, Sparkles } from 'lucide-react';
import { translations } from '../data/translations';

export default function VIPExperience({ theme, lang }) {
  const t = translations[lang];

  const features = [
    {
      icon: <Languages className="w-6 h-6 text-gold-400" />,
      title: t.vipFeature1Title,
      desc: t.vipFeature1Desc
    },
    {
      icon: <EyeOff className="w-6 h-6 text-gold-400" />,
      title: t.vipFeature2Title,
      desc: t.vipFeature2Desc
    },
    {
      icon: <Shield className="w-6 h-6 text-gold-400" />,
      title: t.vipFeature3Title,
      desc: t.vipFeature3Desc
    },
    {
      icon: <Award className="w-6 h-6 text-gold-400" />,
      title: t.vipFeature4Title,
      desc: t.vipFeature4Desc
    }
  ];

  return (
    <section id="vip" className={`py-24 transition-colors duration-500 ease-in-out border-y ${
      theme === 'dark'
        ? 'bg-[#050505] border-gold-500/10 text-white'
        : 'bg-white border-gold-500/20 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase font-extrabold text-gold-500 tracking-widest block mb-2">
            PRESIDENTIAL TRAVEL STANDARDS
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif mb-4 tracking-wider uppercase">
            {t.vipTitle}
          </h2>
          <div className="w-24 h-[1px] bg-gold-400 mx-auto mb-6" />
          <p className={`max-w-2xl mx-auto text-sm sm:text-base font-light ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {t.vipSubtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, index) => (
            <div
              key={index}
              className={`p-8 rounded-3xl border flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 ${
                theme === 'dark'
                  ? 'bg-luxury-card/50 hover:bg-luxury-card/85 border-gold-500/10 hover:border-gold-500/30 shadow-xl hover:shadow-gold/10'
                  : 'bg-[#FAF9F6] hover:bg-white border-gold-500/20 hover:border-gold-500/40 shadow-lg hover:shadow-gold/15'
              }`}
            >
              {/* Icon Container */}
              <div className="w-14 h-14 rounded-2xl bg-gold-400/10 border border-gold-400/30 flex items-center justify-center mb-6 shadow-md shadow-gold/5">
                {feat.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold font-serif mb-3 tracking-wide">
                {feat.title}
              </h3>

              {/* Description */}
              <p className={`text-xs leading-relaxed font-light ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {feat.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Callout box */}
        <div className={`mt-20 p-8 rounded-3xl border text-center max-w-4xl mx-auto relative overflow-hidden ${
          theme === 'dark' ? 'bg-luxury-card/40 border-gold-500/15' : 'bg-[#FAF9F6] border-gold-500/25'
        }`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/5 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold-400/5 rounded-full blur-2xl" />
          <Sparkles className="w-6 h-6 text-gold-400 mx-auto mb-4 animate-bounce" />
          <p className="font-serif italic text-base sm:text-lg leading-relaxed text-gray-200 dark:text-gray-100 max-w-2xl mx-auto">
            {lang === 'en' 
              ? `"All VIP fleets are equipped with localized satellite GPS and direct communication links to our Elite Dispatch Center at Nile City Towers, Cairo. Real-time updates and flight tracking are monitored 24 hours a day."`
              : `"جميع أساطيلنا مزودة بنظام تتبع GPS عبر الأقمار الصناعية وربط مباشر بغرفة عمليات إيليت في أبراج نايل سيتي بالقاهرة. يتم رصد حركة الرحلات وتغير مواعيد الطيران على مدار الساعة."`
            }
          </p>
        </div>

      </div>
    </section>
  );
}
