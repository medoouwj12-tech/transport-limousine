import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FleetSection from './components/FleetSection';
import BookingWizard from './components/BookingWizard';
import VIPExperience from './components/VIPExperience';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('en');
  const [selectedCar, setSelectedCar] = useState(null);

  // Toggle Theme
  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Toggle Language
  const toggleLang = () => {
    setLang(prev => (prev === 'en' ? 'ar' : 'en'));
  };

  // Apply language direction & theme body colors
  useEffect(() => {
    // Handle HTML elements dir attributes
    const htmlEl = document.documentElement;
    if (lang === 'ar') {
      htmlEl.setAttribute('dir', 'rtl');
      htmlEl.setAttribute('lang', 'ar');
    } else {
      htmlEl.setAttribute('dir', 'ltr');
      htmlEl.setAttribute('lang', 'en');
    }
  }, [lang]);

  useEffect(() => {
    // Handle theme colors on body
    const bodyEl = document.body;
    if (theme === 'dark') {
      bodyEl.classList.remove('bg-white', 'text-gray-900');
      bodyEl.classList.add('bg-pure-black', 'text-white');
    } else {
      bodyEl.classList.remove('bg-pure-black', 'text-white');
      bodyEl.classList.add('bg-[#F9F8F6]', 'text-gray-900');
    }
  }, [theme]);

  // Handle vehicle selection callback from Fleet list
  const handleSelectVehicle = (car) => {
    setSelectedCar(car);
    // Smooth scroll down to the booking wizard section
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookNowClick = () => {
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreFleetClick = () => {
    const fleetEl = document.getElementById('fleet');
    if (fleetEl) {
      fleetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen font-sans ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Premium Header/Nav */}
      <Navbar 
        theme={theme} 
        toggleTheme={toggleTheme} 
        lang={lang} 
        toggleLang={toggleLang} 
      />

      {/* Hero Intro */}
      <Hero 
        theme={theme} 
        lang={lang} 
        onBookClick={handleBookNowClick} 
        onFleetClick={handleExploreFleetClick} 
      />

      {/* Fleet Categories */}
      <FleetSection 
        theme={theme} 
        lang={lang} 
        onSelectVehicle={handleSelectVehicle} 
      />

      {/* Multi-step Booking Wizard */}
      <BookingWizard 
        theme={theme} 
        lang={lang} 
        selectedCar={selectedCar} 
        setSelectedCar={setSelectedCar} 
      />

      {/* VIP Standards */}
      <VIPExperience 
        theme={theme} 
        lang={lang} 
      />

      {/* Testimonials */}
      <Testimonials 
        theme={theme} 
        lang={lang} 
      />

      {/* Footer Contact Details */}
      <Footer 
        theme={theme} 
        lang={lang} 
      />
    </div>
  );
}
