import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, User, ChevronRight, ChevronLeft, Check, Smartphone, FileText, Sparkles, Printer, ShieldCheck } from 'lucide-react';
import { translations } from '../data/translations';
import { fleetData } from '../data/fleetData';

const EGYPT_GOVERNORATES = [
  "Cairo (القاهرة)",
  "Giza (الجيزة)",
  "Alexandria (الإسكندرية)",
  "North Coast / Sahel (الساحل الشمالي)",
  "El Gouna (الجونة)",
  "Hurghada (الغردقة)",
  "Sharm El Sheikh (شرم الشيخ)",
  "Dahab (دهب)",
  "Luxor (الأقصر)",
  "Aswan (أسوان)",
  "Suez (السويس)",
  "Port Said (بورسعيد)",
  "Qalyubia (القليوبية)",
  "Gharbia / Tanta (الغربية)",
  "Dakahlia / Mansoura (الدقهلية)"
];

export default function BookingWizard({ theme, lang, selectedCar, setSelectedCar }) {
  const t = translations[lang];
  const [step, setStep] = useState(1);
  const [serviceType, setServiceType] = useState('family'); // family (Intercity) or wedding (Wedding/Events)
  const [formData, setFormData] = useState({
    pickupGov: '',
    dropoffGov: '',
    pickupAddress: '',
    dropoffAddress: '',
    pickupDate: '',
    pickupTime: '',
    passengers: 1,
    luggage: 0,
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    specialRequests: ''
  });

  // Calculate dynamic pricing based on distance/governorates and car base rate
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  useEffect(() => {
    if (!selectedCar) return;
    let base = selectedCar.basePriceEgp;
    
    // Add additional charge if long distance governorate is chosen
    let distanceMultiplier = 1;
    if (formData.pickupGov && formData.dropoffGov && formData.pickupGov !== formData.dropoffGov) {
      distanceMultiplier = 1.6; // Intercity extra charge
    }
    
    setEstimatedPrice(Math.round(base * distanceMultiplier));
  }, [selectedCar, formData.pickupGov, formData.dropoffGov]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNextStep = () => {
    if (step === 1 && !selectedCar) {
      alert(lang === 'en' ? 'Please select a vehicle to proceed.' : 'برجاء اختيار السيارة للمتابعة.');
      return;
    }
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(4); // Show confirmation ticket/boarding pass
  };

  const handleReset = () => {
    setStep(1);
    setFormData({
      pickupGov: '',
      dropoffGov: '',
      pickupAddress: '',
      dropoffAddress: '',
      pickupDate: '',
      pickupTime: '',
      passengers: 1,
      luggage: 0,
      clientName: '',
      clientPhone: '',
      clientEmail: '',
      specialRequests: ''
    });
    setSelectedCar(null);
  };

  return (
    <section id="booking" className={`py-24 transition-colors duration-500 ease-in-out ${
      theme === 'dark' ? 'bg-pure-black text-white' : 'bg-[#FAF9F6] text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold font-serif mb-4 tracking-wider uppercase">
            {t.bookingTitle}
          </h2>
          <div className="w-24 h-[1px] bg-gold-400 mx-auto mb-6" />
          <p className={`max-w-2xl mx-auto text-sm sm:text-base font-light ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {t.bookingSubtitle}
          </p>
        </div>

        {/* Booking Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* Main Wizard Form Container */}
          <div className={`lg:col-span-2 rounded-3xl p-6 sm:p-10 border ${
            theme === 'dark' ? 'bg-luxury-card/55 border-gold-500/15 gold-shadow' : 'bg-white border-gold-500/25 shadow-xl'
          }`}>
            
            {/* Step Progress Indicators */}
            {step < 4 && (
              <div className="flex items-center justify-between mb-10 border-b border-gold-500/10 pb-6">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="flex items-center space-x-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      step >= num
                        ? 'gold-gradient text-black font-extrabold shadow-md'
                        : theme === 'dark' ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {step > num ? <Check className="w-4 h-4 text-black" /> : num}
                    </div>
                    <span className={`text-[10px] sm:text-xs font-semibold uppercase tracking-wider hidden sm:inline ${
                      step === num ? 'text-gold-400' : 'text-gray-400'
                    }`}>
                      {num === 1 ? t.step1Name : num === 2 ? t.step2Name : t.step3Name}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* STEP 1: Fleet & Service Type */}
            {step === 1 && (
              <div className="space-y-8 animate-fade-in">
                {/* Service Type Selection */}
                <div>
                  <label className="block text-xs uppercase font-extrabold text-gold-500 tracking-widest mb-4">
                    {t.labelServiceType}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setServiceType('family');
                        if (selectedCar && selectedCar.category !== 'family') setSelectedCar(null);
                      }}
                      className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                        serviceType === 'family'
                          ? 'border-gold-400 bg-gold-400/5 shadow-md shadow-gold/5'
                          : theme === 'dark' ? 'border-white/5 bg-pure-black/30 hover:border-gold-500/20' : 'border-black/5 bg-gray-50 hover:border-gold-500/30'
                      }`}
                    >
                      <span className="text-sm font-bold">{t.serviceIntercity}</span>
                      <span className={`text-[10px] mt-2 block font-light ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {lang === 'en' ? "Spacious SUVs and executive VIP vans with certified chauffeurs." : "سيارات دفع رباعي وميكروباصات VIP مريحة مع سائق معتمد."}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setServiceType('wedding');
                        if (selectedCar && selectedCar.category !== 'wedding') setSelectedCar(null);
                      }}
                      className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                        serviceType === 'wedding'
                          ? 'border-gold-400 bg-gold-400/5 shadow-md shadow-gold/5'
                          : theme === 'dark' ? 'border-white/5 bg-pure-black/30 hover:border-gold-500/20' : 'border-black/5 bg-gray-50 hover:border-gold-500/30'
                      }`}
                    >
                      <span className="text-sm font-bold">{t.serviceWedding}</span>
                      <span className={`text-[10px] mt-2 block font-light ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {lang === 'en' ? "Elite sedans and convertibles decorated with suit-and-tie chauffeur." : "صالونات فارهة وسيارات مكشوفة للزفاف والمواكب الفخمة."}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Fleet Visual Selection */}
                <div>
                  <label className="block text-xs uppercase font-extrabold text-gold-500 tracking-widest mb-4">
                    {t.labelVehicleClass}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {fleetData.filter(car => car.category === serviceType).map((car) => (
                      <div
                        key={car.id}
                        onClick={() => setSelectedCar(car)}
                        className={`group relative rounded-2xl overflow-hidden border p-4 flex items-center space-x-4 cursor-pointer transition-all duration-300 ${
                          selectedCar?.id === car.id
                            ? 'border-gold-400 bg-gold-400/5 shadow-glow'
                            : theme === 'dark' ? 'border-white/5 bg-pure-black/30 hover:border-gold-500/25' : 'border-black/5 bg-gray-50 hover:border-gold-500/35'
                        }`}
                      >
                        <div className="w-24 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-black/10">
                          <img src={car.image} alt={car.nameEn} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold truncate">
                            {lang === 'en' ? car.nameEn : car.nameAr}
                          </h4>
                          <span className="text-xs gold-gradient-text font-serif font-extrabold mt-0.5 block">
                            {car.basePriceEgp.toLocaleString()} EGP
                          </span>
                        </div>
                        {selectedCar?.id === car.id && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full gold-gradient flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 text-black" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Next CTA */}
                <div className="flex justify-end pt-4 border-t border-gold-500/10">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="gold-gradient text-black font-extrabold text-xs px-8 py-3.5 rounded-xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-md hover:shadow-gold flex items-center cursor-pointer"
                  >
                    <span>{t.btnNext}</span>
                    <ChevronRight className="w-4 h-4 ml-1.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Trip Details */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Pickup Governorate */}
                  <div>
                    <label className="block text-[10px] uppercase font-extrabold text-gold-500 tracking-wider mb-2">
                      {t.labelPickupGov}
                    </label>
                    <select
                      name="pickupGov"
                      value={formData.pickupGov}
                      onChange={handleInputChange}
                      required
                      className={`w-full p-3.5 rounded-xl border text-xs font-semibold focus:outline-none focus:border-gold-400 ${
                        theme === 'dark' ? 'bg-pure-black border-white/10 text-white' : 'bg-white border-black/10 text-black'
                      }`}
                    >
                      <option value="">-- Choose Governorate --</option>
                      {EGYPT_GOVERNORATES.map(gov => (
                        <option key={gov} value={gov}>{gov}</option>
                      ))}
                    </select>
                  </div>

                  {/* Drop-off Governorate */}
                  <div>
                    <label className="block text-[10px] uppercase font-extrabold text-gold-500 tracking-wider mb-2">
                      {t.labelDropoffGov}
                    </label>
                    <select
                      name="dropoffGov"
                      value={formData.dropoffGov}
                      onChange={handleInputChange}
                      required
                      className={`w-full p-3.5 rounded-xl border text-xs font-semibold focus:outline-none focus:border-gold-400 ${
                        theme === 'dark' ? 'bg-pure-black border-white/10 text-white' : 'bg-white border-black/10 text-black'
                      }`}
                    >
                      <option value="">-- Choose Governorate --</option>
                      {EGYPT_GOVERNORATES.map(gov => (
                        <option key={gov} value={gov}>{gov}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Pickup Address */}
                <div>
                  <label className="block text-[10px] uppercase font-extrabold text-gold-500 tracking-wider mb-2">
                    {t.labelPickupAddress}
                  </label>
                  <input
                    type="text"
                    name="pickupAddress"
                    value={formData.pickupAddress}
                    onChange={handleInputChange}
                    placeholder="e.g. Marriott Mena House Hotel, Room 302"
                    required
                    className={`w-full p-3.5 rounded-xl border text-xs font-semibold focus:outline-none focus:border-gold-400 ${
                      theme === 'dark' ? 'bg-pure-black border-white/10 text-white' : 'bg-white border-black/10 text-black'
                    }`}
                  />
                </div>

                {/* Dropoff Address */}
                <div>
                  <label className="block text-[10px] uppercase font-extrabold text-gold-500 tracking-wider mb-2">
                    {t.labelDropoffAddress}
                  </label>
                  <input
                    type="text"
                    name="dropoffAddress"
                    value={formData.dropoffAddress}
                    onChange={handleInputChange}
                    placeholder="e.g. Borg El Arab International Airport terminal"
                    required
                    className={`w-full p-3.5 rounded-xl border text-xs font-semibold focus:outline-none focus:border-gold-400 ${
                      theme === 'dark' ? 'bg-pure-black border-white/10 text-white' : 'bg-white border-black/10 text-black'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Date Picker */}
                  <div>
                    <label className="block text-[10px] uppercase font-extrabold text-gold-500 tracking-wider mb-2">
                      {t.labelDate}
                    </label>
                    <input
                      type="date"
                      name="pickupDate"
                      value={formData.pickupDate}
                      onChange={handleInputChange}
                      required
                      className={`w-full p-3.5 rounded-xl border text-xs font-semibold focus:outline-none focus:border-gold-400 ${
                        theme === 'dark' ? 'bg-pure-black border-white/10 text-white' : 'bg-white border-black/10 text-black'
                      }`}
                    />
                  </div>

                  {/* Time Picker */}
                  <div>
                    <label className="block text-[10px] uppercase font-extrabold text-gold-500 tracking-wider mb-2">
                      {t.labelTime}
                    </label>
                    <input
                      type="time"
                      name="pickupTime"
                      value={formData.pickupTime}
                      onChange={handleInputChange}
                      required
                      className={`w-full p-3.5 rounded-xl border text-xs font-semibold focus:outline-none focus:border-gold-400 ${
                        theme === 'dark' ? 'bg-pure-black border-white/10 text-white' : 'bg-white border-black/10 text-black'
                      }`}
                    />
                  </div>
                </div>

                {/* Back / Next CTAs */}
                <div className="flex items-center justify-between pt-6 border-t border-gold-500/10">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className={`px-6 py-3.5 rounded-xl border text-xs font-bold uppercase transition-all duration-300 ${
                      theme === 'dark' ? 'border-white/10 text-gray-300 hover:bg-white/5' : 'border-black/10 text-gray-700 hover:bg-black/5'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4 inline mr-1" />
                    <span>{t.btnBack}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="gold-gradient text-black font-extrabold text-xs px-8 py-3.5 rounded-xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-md hover:shadow-gold flex items-center cursor-pointer"
                  >
                    <span>{t.btnNext}</span>
                    <ChevronRight className="w-4 h-4 ml-1.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Client Info */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Client Name */}
                  <div>
                    <label className="block text-[10px] uppercase font-extrabold text-gold-500 tracking-wider mb-2">
                      {t.labelName}
                    </label>
                    <input
                      type="text"
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleInputChange}
                      placeholder="His Excellency/Name"
                      required
                      className={`w-full p-3.5 rounded-xl border text-xs font-semibold focus:outline-none focus:border-gold-400 ${
                        theme === 'dark' ? 'bg-pure-black border-white/10 text-white' : 'bg-white border-black/10 text-black'
                      }`}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[10px] uppercase font-extrabold text-gold-500 tracking-wider mb-2">
                      {t.labelPhone}
                    </label>
                    <input
                      type="tel"
                      name="clientPhone"
                      value={formData.clientPhone}
                      onChange={handleInputChange}
                      placeholder="+20 100 000 0000"
                      required
                      className={`w-full p-3.5 rounded-xl border text-xs font-semibold focus:outline-none focus:border-gold-400 ${
                        theme === 'dark' ? 'bg-pure-black border-white/10 text-white' : 'bg-white border-black/10 text-black'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {/* Email */}
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] uppercase font-extrabold text-gold-500 tracking-wider mb-2">
                      {t.labelEmail}
                    </label>
                    <input
                      type="email"
                      name="clientEmail"
                      value={formData.clientEmail}
                      onChange={handleInputChange}
                      placeholder="client@luxury.eg"
                      required
                      className={`w-full p-3.5 rounded-xl border text-xs font-semibold focus:outline-none focus:border-gold-400 ${
                        theme === 'dark' ? 'bg-pure-black border-white/10 text-white' : 'bg-white border-black/10 text-black'
                      }`}
                    />
                  </div>

                  {/* Passengers & Luggage */}
                  <div className="flex space-x-3">
                    <div className="flex-1">
                      <label className="block text-[10px] uppercase font-extrabold text-gold-500 tracking-wider mb-2">
                        {t.labelPassengers}
                      </label>
                      <input
                        type="number"
                        name="passengers"
                        min="1"
                        max="20"
                        value={formData.passengers}
                        onChange={handleInputChange}
                        required
                        className={`w-full p-3.5 rounded-xl border text-xs font-semibold focus:outline-none focus:border-gold-400 ${
                          theme === 'dark' ? 'bg-pure-black border-white/10 text-white' : 'bg-white border-black/10 text-black'
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-[10px] uppercase font-extrabold text-gold-500 tracking-wider mb-2">
                        {t.labelLuggage}
                      </label>
                      <input
                        type="number"
                        name="luggage"
                        min="0"
                        max="20"
                        value={formData.luggage}
                        onChange={handleInputChange}
                        required
                        className={`w-full p-3.5 rounded-xl border text-xs font-semibold focus:outline-none focus:border-gold-400 ${
                          theme === 'dark' ? 'bg-pure-black border-white/10 text-white' : 'bg-white border-black/10 text-black'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-[10px] uppercase font-extrabold text-gold-500 tracking-wider mb-2">
                    {t.labelSpecialRequests}
                  </label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Armed security detail request, specialized champagne or floral arrangements, temperature pre-sets..."
                    className={`w-full p-3.5 rounded-xl border text-xs font-semibold focus:outline-none focus:border-gold-400 ${
                      theme === 'dark' ? 'bg-pure-black border-white/10 text-white' : 'bg-white border-black/10 text-black'
                    }`}
                  />
                </div>

                {/* Back / Submit CTAs */}
                <div className="flex items-center justify-between pt-6 border-t border-gold-500/10">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className={`px-6 py-3.5 rounded-xl border text-xs font-bold uppercase transition-all duration-300 ${
                      theme === 'dark' ? 'border-white/10 text-gray-300 hover:bg-white/5' : 'border-black/10 text-gray-700 hover:bg-black/5'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4 inline mr-1" />
                    <span>{t.btnBack}</span>
                  </button>
                  <button
                    type="submit"
                    className="gold-gradient text-black font-extrabold text-xs px-8 py-3.5 rounded-xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-md hover:shadow-gold flex items-center cursor-pointer"
                  >
                    <span>{t.btnSubmit}</span>
                    <Sparkles className="w-4 h-4 ml-1.5 text-black" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 4: Success Ticket Boarding Pass */}
            {step === 4 && (
              <div className="space-y-8 animate-fade-in text-center">
                {/* Boarding Pass Container */}
                <div className={`max-w-md mx-auto rounded-3xl border overflow-hidden relative shadow-2xl ${
                  theme === 'dark'
                    ? 'bg-[#0f0f0f] border-gold-400/40 text-white'
                    : 'bg-white border-gold-400/50 text-black'
                }`}>
                  {/* Decorative Ticket Header */}
                  <div className="gold-gradient py-4 text-black text-center relative">
                    <span className="font-serif text-sm font-extrabold tracking-widest block uppercase">
                      ELITE BOARDING PASS
                    </span>
                    <span className="text-[9px] font-bold tracking-wider block opacity-75">
                      ROYAL TRANSIT SERVICE EGYPT
                    </span>
                    <div className="absolute -bottom-3 left-4 w-6 h-6 rounded-full bg-[#050505] border-r border-gold-400/40 z-10 hidden sm:block" />
                    <div className="absolute -bottom-3 right-4 w-6 h-6 rounded-full bg-[#050505] border-l border-gold-400/40 z-10 hidden sm:block" />
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Simulated Barcode */}
                    <div className="flex flex-col items-center border-b border-gold-500/10 pb-4">
                      <div className="h-10 w-48 bg-black/10 dark:bg-white/10 flex items-center justify-between px-2 py-1 rounded">
                        {[...Array(24)].map((_, i) => (
                          <div
                            key={i}
                            className={`h-full bg-black dark:bg-white`}
                            style={{ width: `${Math.max(1, Math.round(Math.random() * 4))}px` }}
                          />
                        ))}
                      </div>
                      <span className="text-[8px] font-mono tracking-widest mt-1 opacity-70">
                        ELITE-EGY-{Math.floor(100000 + Math.random() * 900000)}
                      </span>
                    </div>

                    {/* Details Rows */}
                    <div className="grid grid-cols-2 gap-4 text-left">
                      <div>
                        <span className="text-[9px] uppercase font-bold text-gold-500 tracking-wider block">{t.labelName}</span>
                        <span className="text-xs font-bold">{formData.clientName}</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase font-bold text-gold-500 tracking-wider block">Service Class</span>
                        <span className="text-xs font-bold">{lang === 'en' ? selectedCar?.nameEn : selectedCar?.nameAr}</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase font-bold text-gold-500 tracking-wider block">{t.summaryPickup}</span>
                        <span className="text-xs font-semibold truncate block">{formData.pickupGov}</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase font-bold text-gold-500 tracking-wider block">{t.summaryDropoff}</span>
                        <span className="text-xs font-semibold truncate block">{formData.dropoffGov}</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase font-bold text-gold-500 tracking-wider block">{t.labelDate}</span>
                        <span className="text-xs font-bold">{formData.pickupDate}</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase font-bold text-gold-500 tracking-wider block">{t.labelTime}</span>
                        <span className="text-xs font-bold">{formData.pickupTime}</span>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="border-t border-gold-500/10 pt-4 text-center">
                      <span className="text-[9px] uppercase font-bold text-gold-500 tracking-wider block">Est. Royal Tariff</span>
                      <span className="text-2xl sm:text-3xl font-serif font-extrabold gold-gradient-text block mt-1">
                        {estimatedPrice.toLocaleString()} EGP
                      </span>
                      <span className="text-[9px] text-gray-400 block mt-1 leading-normal max-w-xs mx-auto">
                        All inclusive of chauffeur, taxes, fuel, and Cairo toll gates.
                      </span>
                    </div>

                    {/* Seal / Logo */}
                    <div className="flex items-center justify-center space-x-2 text-gold-400">
                      <ShieldCheck className="w-5 h-5 text-gold-400" />
                      <span className="font-serif text-[10px] font-extrabold tracking-widest">VERIFIED VIP DETAIL</span>
                    </div>
                  </div>
                </div>

                {/* Confirm Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto pt-4">
                  <button
                    onClick={() => window.print()}
                    className={`w-full sm:w-auto px-6 py-3.5 rounded-xl border text-xs font-extrabold uppercase transition-all duration-300 flex items-center justify-center ${
                      theme === 'dark' ? 'border-white/10 text-gray-300 hover:bg-white/5' : 'border-black/10 text-gray-700 hover:bg-black/5'
                    }`}
                  >
                    <Printer className="w-4 h-4 mr-2" />
                    <span>Print Ticket</span>
                  </button>
                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto gold-gradient text-black font-extrabold text-xs px-8 py-3.5 rounded-xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-md hover:shadow-gold cursor-pointer"
                  >
                    {t.btnNewBooking}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sticky Live Summary Sidebar */}
          <div className="lg:sticky lg:top-28">
            <div className={`rounded-3xl p-6 border ${
              theme === 'dark' ? 'bg-luxury-card/65 border-gold-500/15 gold-shadow' : 'bg-white border-gold-500/25 shadow-xl'
            }`}>
              <h3 className="text-lg font-bold font-serif mb-6 border-b border-gold-500/10 pb-3 flex items-center justify-between">
                <span>{t.summaryTitle}</span>
                <span className="w-2.5 h-2.5 rounded-full bg-gold-400 animate-pulse" />
              </h3>

              {/* Show Live summary state */}
              {selectedCar ? (
                <div className="space-y-5 text-xs font-semibold text-gray-300 dark:text-gray-200">
                  {/* Selected Car Small Panel */}
                  <div className={`p-4 rounded-2xl border flex items-center space-x-3 ${
                    theme === 'dark' ? 'bg-pure-black/40 border-white/5' : 'bg-gray-50 border-black/5 text-gray-800'
                  }`}>
                    <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-black/10">
                      <img src={selectedCar.image} alt={selectedCar.nameEn} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-gold-500 tracking-wider block">{t.summaryVehicle}</span>
                      <span className="font-bold text-sm block leading-tight mt-0.5">{lang === 'en' ? selectedCar.nameEn : selectedCar.nameAr}</span>
                    </div>
                  </div>

                  {/* Service Type */}
                  <div className="border-b border-gold-500/5 pb-3">
                    <span className="text-[9px] uppercase font-bold text-gold-500 tracking-wider block">{t.summaryService}</span>
                    <span className={`block font-semibold mt-0.5 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                      {serviceType === 'family' ? 'Intercity Travel' : 'Weddings & Events'}
                    </span>
                  </div>

                  {/* Pickup Dropoff */}
                  <div className="border-b border-gold-500/5 pb-3 space-y-1">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-gold-500 tracking-wider block">{t.summaryPickup}</span>
                      <span className={`block font-semibold mt-0.5 truncate ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                        {formData.pickupGov || '---'} {formData.pickupAddress && `(${formData.pickupAddress})`}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-gold-500 tracking-wider block">{t.summaryDropoff}</span>
                      <span className={`block font-semibold mt-0.5 truncate ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                        {formData.dropoffGov || '---'} {formData.dropoffAddress && `(${formData.dropoffAddress})`}
                      </span>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="border-b border-gold-500/5 pb-3">
                    <span className="text-[9px] uppercase font-bold text-gold-500 tracking-wider block">{t.summaryDateTime}</span>
                    <span className={`block font-semibold mt-0.5 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                      {formData.pickupDate || '---'} @ {formData.pickupTime || '---'}
                    </span>
                  </div>

                  {/* Pricing Display */}
                  <div className="pt-2 text-center">
                    <span className="text-[9px] uppercase font-bold text-gold-500 tracking-wider block">{t.summaryPriceTitle}</span>
                    <div className="flex items-baseline justify-center space-x-1 mt-1">
                      <span className="text-3xl font-serif font-extrabold gold-gradient-text">
                        {estimatedPrice.toLocaleString()}
                      </span>
                      <span className="text-[10px] font-bold uppercase text-gold-500">EGP</span>
                    </div>
                    <p className={`text-[9px] font-light leading-relaxed mt-2.5 max-w-xs mx-auto ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {t.summaryPriceDisclaimer}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10">
                  <FileText className="w-10 h-10 text-gold-500/30 mx-auto mb-3" />
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {t.placeholderSelectVehicle}
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
