import { useState } from 'react';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { translations } from '../data/translations';

export default function Navbar({ theme, toggleTheme, lang, toggleLang }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang];

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { name: t.navHome, id: 'home' },
    { name: t.navFleet, id: 'fleet' },
    { name: t.navBooking, id: 'booking' },
    { name: t.navVIP, id: 'vip' },
    { name: t.navTestimonials, id: 'testimonials' },
    { name: t.navContact, id: 'contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b ${
      theme === 'dark' 
        ? 'bg-pure-black/85 backdrop-blur-md border-gold-500/20 text-white' 
        : 'bg-white/85 backdrop-blur-md border-gold-500/30 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={(e) => handleNavClick(e, 'home')}>
            <img src="/images/elawadi_logo.png" alt="Al-Awadi Tourism Logo" className="w-12 h-12 object-contain" />
            <div className={`flex flex-col ${lang === 'ar' ? 'text-right pr-2' : 'text-left pl-2'}`}>
              <span className="font-serif text-lg tracking-wider font-extrabold gold-gradient-text">
                {t.brandName}
              </span>
              <span className="text-[9px] tracking-widest text-gold-500 font-semibold -mt-1">
                {t.brandSubtitle}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className={`flex items-center ${lang === 'ar' ? 'space-x-reverse space-x-6 font-arabic' : 'space-x-6'}`}>
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`text-sm font-medium transition-all duration-300 hover:text-gold-400 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold-400 after:transition-all after:duration-300 hover:after:w-full ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Language & Theme Controls */}
            <div className="flex items-center space-x-4 border-l border-gold-500/20 pl-4">
              {/* Language Switcher */}
              <button
                onClick={toggleLang}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-full border text-xs font-semibold tracking-wider transition-all duration-300 ${
                  theme === 'dark'
                    ? 'border-gold-500/30 text-gold-400 hover:bg-gold-500/10'
                    : 'border-gold-500/50 text-gold-600 hover:bg-gold-500/5'
                }`}
                title="Switch Language / تغيير اللغة"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'عربي' : 'EN'}</span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full border transition-all duration-300 ${
                  theme === 'dark'
                    ? 'border-gold-500/30 text-gold-400 hover:bg-gold-500/10 hover:shadow-glow'
                    : 'border-gold-500/40 text-gold-600 hover:bg-gold-500/5'
                }`}
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Quick Call to Action */}
              <button
                onClick={(e) => handleNavClick(e, 'booking')}
                className="gold-gradient hover:scale-105 active:scale-95 text-black font-semibold text-xs px-5 py-2.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-gold"
              >
                {t.bookNow}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-3">
            {/* Quick Language Toggle on Mobile */}
            <button
              onClick={toggleLang}
              className={`p-2 rounded-full border text-xs font-bold transition-all duration-300 ${
                theme === 'dark' ? 'border-gold-500/25 text-gold-400' : 'border-gold-500/45 text-gold-600'
              }`}
            >
              {lang === 'en' ? 'ع' : 'EN'}
            </button>

            {/* Quick Theme Toggle on Mobile */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full border transition-all duration-300 ${
                theme === 'dark' ? 'border-gold-500/25 text-gold-400' : 'border-gold-500/45 text-gold-600'
              }`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Burger Icon */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-md ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`lg:hidden fixed inset-0 top-20 z-40 transform transition-transform duration-500 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : (lang === 'ar' ? 'translate-x-full' : '-translate-x-full')
        } ${
          theme === 'dark' ? 'bg-[#080808]/98 border-t border-gold-500/20 text-white' : 'bg-white/98 border-t border-gold-500/20 text-black'
        }`}
      >
        <div className="px-4 pt-6 pb-8 space-y-4">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`block py-3 px-4 rounded-xl text-base font-semibold border-b ${
                  theme === 'dark'
                    ? 'border-white/5 hover:bg-gold-500/10 text-gray-200 hover:text-gold-400'
                    : 'border-black/5 hover:bg-gold-500/5 text-gray-800 hover:text-gold-600'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-gold-500/20 flex flex-col items-center">
            <button
              onClick={(e) => handleNavClick(e, 'booking')}
              className="w-full text-center gold-gradient text-black font-bold py-3.5 rounded-xl active:scale-95 transition-all duration-300 shadow-md hover:shadow-gold"
            >
              {t.bookNow}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
