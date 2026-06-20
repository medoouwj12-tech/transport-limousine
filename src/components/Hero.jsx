import React from 'react';
import { Calendar, Compass, ShieldAlert, Award, Star, Compass as CompassIcon, Shield } from 'lucide-react';
import { translations } from '../data/translations';

export default function Hero({ theme, lang, onBookClick, onFleetClick }) {
  const t = translations[lang];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with slow zoom and overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/images/hero_bg.png"
          alt="Luxury Limousine Pyramids Egypt"
          className="w-full h-full object-cover animate-slow-zoom filter brightness-[0.45] contrast-[1.05]"
        />
        <div className={`absolute inset-0 ${
          theme === 'dark'
            ? 'bg-gradient-to-t from-pure-black via-pure-black/60 to-transparent'
            : 'bg-gradient-to-t from-[#F9F8F6] via-[#F9F8F6]/30 to-transparent'
        }`} />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        {/* Animated Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-gold-400/30 bg-pure-black/75 backdrop-blur-md mb-8 animate-fade-in gold-shadow">
          <Star className="w-4 h-4 text-gold-400 animate-spin-slow" />
          <span className="text-[11px] font-extrabold tracking-widest text-gold-400 font-serif uppercase">
            {t.brandSubtitle}
          </span>
        </div>

        {/* Cinematic Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-serif mb-6 leading-tight tracking-wide animate-fade-in-up">
          <span className="gold-gradient-text block drop-shadow-md">
            {t.heroTitleGold}
          </span>
          <span className="text-white block font-light mt-2 drop-shadow">
            {t.heroTitleWhite}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-sm sm:text-lg text-gray-300 mb-10 leading-relaxed font-sans font-light drop-shadow animate-fade-in">
          {t.heroSubtitle}
        </p>

        {/* Floating Feature Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up max-w-4xl mx-auto">
          <div className="flex items-center space-x-2 bg-pure-black/70 backdrop-blur-md border border-gold-500/25 px-5 py-3 rounded-2xl gold-shadow-hover transition-all duration-300">
            <div className="w-2.5 h-2.5 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold text-white tracking-wide">{t.badgeSupport}</span>
          </div>
          <div className="flex items-center space-x-2 bg-pure-black/70 backdrop-blur-md border border-gold-500/25 px-5 py-3 rounded-2xl gold-shadow-hover transition-all duration-300">
            <Compass className="w-4 h-4 text-gold-400" />
            <span className="text-xs sm:text-sm font-semibold text-white tracking-wide">{t.badgeCoverage}</span>
          </div>
          <div className="flex items-center space-x-2 bg-pure-black/70 backdrop-blur-md border border-gold-500/25 px-5 py-3 rounded-2xl gold-shadow-hover transition-all duration-300">
            <Shield className="w-4 h-4 text-gold-400" />
            <span className="text-xs sm:text-sm font-semibold text-white tracking-wide">{t.badgeChauffeur}</span>
          </div>
        </div>

        {/* Dual Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20 animate-fade-in">
          <button
            onClick={onBookClick}
            className="w-full sm:w-auto gold-gradient text-black font-extrabold px-10 py-4.5 rounded-xl text-sm tracking-wider hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl hover:shadow-gold flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4 mr-2" />
            <span>{t.bookNow}</span>
          </button>
          <button
            onClick={onFleetClick}
            className="w-full sm:w-auto border border-gold-400 text-gold-400 hover:bg-gold-400/10 font-bold px-10 py-4.5 rounded-xl text-sm tracking-wider hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>{t.exploreFleet}</span>
          </button>
        </div>

        {/* Quick Brand Stats Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto px-6 py-6 border border-gold-500/20 bg-pure-black/80 backdrop-blur-md rounded-3xl animate-fade-in gold-shadow">
          <div className="flex flex-col items-center py-2 border-b sm:border-b-0 sm:border-r border-gold-500/10 last:border-0">
            <span className="text-xl sm:text-2xl font-bold gold-gradient-text font-serif">50,000+</span>
            <span className="text-[10px] sm:text-xs text-gray-400 font-semibold tracking-wider mt-1">{t.statTrips}</span>
          </div>
          <div className="flex flex-col items-center py-2 border-b sm:border-b-0 sm:border-r border-gold-500/10 last:border-0">
            <span className="text-xl sm:text-2xl font-bold gold-gradient-text font-serif">120+</span>
            <span className="text-[10px] sm:text-xs text-gray-400 font-semibold tracking-wider mt-1">{t.statVehicles}</span>
          </div>
          <div className="flex flex-col items-center py-2 last:border-0">
            <span className="text-xl sm:text-2xl font-bold gold-gradient-text font-serif">4.9 / 5.0</span>
            <span className="text-[10px] sm:text-xs text-gray-400 font-semibold tracking-wider mt-1">{t.statRating}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
