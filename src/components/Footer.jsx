import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Shield } from 'lucide-react';
import { translations } from '../data/translations';

export default function Footer({ theme, lang }) {
  const t = translations[lang];
  const [inquiry, setInquiry] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setInquiry({ name: '', email: '', message: '' });
    }, 4000);
  };

  const handleInquiryChange = (e) => {
    const { name, value } = e.target;
    setInquiry(prev => ({ ...prev, [name]: value }));
  };

  return (
    <footer id="contact" className={`pt-24 pb-8 transition-colors duration-500 ease-in-out border-t ${
      theme === 'dark'
        ? 'bg-pure-black border-gold-500/10 text-white'
        : 'bg-[#FAF9F6] border-gold-500/25 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16 pb-12 border-b border-gold-500/10">
          
          {/* Brand Info & Governorate List */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full border border-gold-400 bg-gold-400/10">
                <Shield className="w-4 h-4 text-gold-400" />
              </div>
              <span className="font-serif text-xl tracking-wider font-extrabold gold-gradient-text uppercase">
                {t.brandName}
              </span>
            </div>
            <p className={`text-xs font-light leading-relaxed max-w-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              {t.footerSubtitle}. Providing gold-standard transport logistics for national events, VIP delegations, and executive travelers since 2012.
            </p>

            {/* Coverage List */}
            <div>
              <span className="text-[10px] uppercase font-extrabold text-gold-500 tracking-wider block mb-3">
                {t.badgeCoverage}
              </span>
              <div className="flex flex-wrap gap-2">
                {["Cairo", "Giza", "Alexandria", "Sahel", "El Gouna", "Sharm El Sheikh", "Luxor", "Aswan"].map(gov => (
                  <span
                    key={gov}
                    className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-lg border ${
                      theme === 'dark' ? 'bg-luxury-card/30 border-white/5 text-gray-300' : 'bg-white border-black/5 text-gray-700'
                    }`}
                  >
                    {gov}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Details & Mock Map */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold font-serif uppercase tracking-wider text-gold-400">
              {t.contactTitle}
            </h4>

            <div className="space-y-3.5 text-xs font-semibold text-gray-300 dark:text-gray-200">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4.5 h-4.5 text-gold-400 flex-shrink-0 mt-0.5" />
                <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{t.officeLocation}</span>
              </div>
              <a href="tel:+201117252213" className="flex items-center space-x-3 hover:text-gold-400 transition-colors">
                <Phone className="w-4.5 h-4.5 text-gold-400 flex-shrink-0" />
                <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{t.officePhone}</span>
              </a>
              <a href="https://wa.me/201009419290" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 hover:text-green-400 transition-colors">
                <MessageSquare className="w-4.5 h-4.5 text-green-400 flex-shrink-0" />
                <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{t.officeWhatsApp}</span>
              </a>
              <div className="flex items-center space-x-3">
                <Mail className="w-4.5 h-4.5 text-gold-400 flex-shrink-0" />
                <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{t.officeEmail}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4.5 h-4.5 text-gold-400 flex-shrink-0" />
                <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{t.officeHours}</span>
              </div>
            </div>

            {/* Office Location Map */}
            <div className={`rounded-2xl overflow-hidden border ${
              theme === 'dark' ? 'border-gold-500/20' : 'border-gold-500/30'
            } shadow-lg`}>
              <iframe
                title="Office Location - 6th of October City"
                src="https://www.google.com/maps?q=XVH9%2BJW9+6th+of+October+City&output=embed"
                width="100%"
                height="180"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Quick WhatsApp Action */}
            <a
              href="https://wa.me/201009419290"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-[#25D366] text-white font-extrabold text-xs px-5 py-3 rounded-xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-md shadow-green-500/10 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact WhatsApp Chauffeur Concierge</span>
            </a>
          </div>

          {/* Quick Inquiry Form */}
          <div className={`p-6 rounded-3xl border ${
            theme === 'dark' ? 'bg-luxury-card/30 border-gold-500/15' : 'bg-white border-gold-500/25 shadow-lg'
          }`}>
            <h4 className="text-sm font-bold font-serif uppercase tracking-wider text-gold-400 mb-4">
              Private Concierge Inquiry
            </h4>
            
            {submitted ? (
              <div className="text-center py-8 text-gold-400 space-y-2 animate-fade-in">
                <Shield className="w-8 h-8 text-gold-400 mx-auto animate-pulse" />
                <h5 className="font-serif text-sm font-bold">Inquiry Transmitted Successfully</h5>
                <p className="text-[10px] text-gray-400 font-light">An elite travel consultant will contact you within 15 minutes.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={inquiry.name}
                  onChange={handleInquiryChange}
                  placeholder="Your Name (VIP)"
                  required
                  className={`w-full p-3 rounded-xl border text-xs font-semibold focus:outline-none focus:border-gold-400 ${
                    theme === 'dark' ? 'bg-pure-black border-white/10 text-white' : 'bg-gray-50 border-black/10 text-black'
                  }`}
                />
                <input
                  type="email"
                  name="email"
                  value={inquiry.email}
                  onChange={handleInquiryChange}
                  placeholder="Your Email"
                  required
                  className={`w-full p-3 rounded-xl border text-xs font-semibold focus:outline-none focus:border-gold-400 ${
                    theme === 'dark' ? 'bg-pure-black border-white/10 text-white' : 'bg-gray-50 border-black/10 text-black'
                  }`}
                />
                <textarea
                  name="message"
                  value={inquiry.message}
                  onChange={handleInquiryChange}
                  rows="3"
                  placeholder="Tell us about your logistics needs..."
                  required
                  className={`w-full p-3 rounded-xl border text-xs font-semibold focus:outline-none focus:border-gold-400 ${
                    theme === 'dark' ? 'bg-pure-black border-white/10 text-white' : 'bg-gray-50 border-black/10 text-black'
                  }`}
                />
                <button
                  type="submit"
                  className="w-full gold-gradient text-black font-extrabold text-xs py-3 rounded-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-md hover:shadow-gold flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Transmit Inquiry</span>
                  <Send className="w-3.5 h-3.5 text-black" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Footer Bottom Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
          <p className={`text-[10px] font-semibold ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
            {t.footerCopy}
          </p>
          <div className="flex items-center space-x-3 text-[10px] font-bold text-gold-500 uppercase tracking-widest">
            <a href="https://www.facebook.com/share/1Ws8ENTYWS/" target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook</a>
            <span>•</span>
            <span className="cursor-pointer hover:underline">Privacy Charter</span>
            <span>•</span>
            <span className="cursor-pointer hover:underline">Chauffeur Agreement</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
