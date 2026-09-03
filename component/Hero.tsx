import React from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen bg-neutral-900 text-white flex flex-col justify-between overflow-hidden font-sans">
      {/* Background Image Layer with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url('/images/main-page-hero-bg.avif')`, // Replace with your image path
        }}
      >
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 pt-24 md:pt-36 flex-1 flex flex-col justify-center">
        <div className="max-w-xl space-y-6">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-extralight tracking-tight leading-[1.15]">
            BE CONFIDENT WITH<br />
            EV.
          </h1>

          {/* Subtitle */}
          <p className="text-gray-200 text-base md:text-lg font-normal max-w-md leading-relaxed">
            Reliable EV charging at hotels, stays and highway destinations making every journey easier.
          </p>

          {/* Primary CTA Button */}
          <div className="pt-2">
            <a
              href="/map"
              className="inline-flex items-center gap-3 bg-primary-600 hover:bg-primary-700 text-white px-10 py-3.5 rounded-full text-xs font-semibold uppercase transition-all duration-300 shadow-lg shadow-primary-600/30 border border-primary-500/30"
            >
              FIND A CHARGER
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Floating Bar / Widgets Section */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 pb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Scroll Indicator (Centered on larger screens via flex alignment) */}
        <div className="w-full md:w-auto flex justify-center md:justify-start">
          <a
            href="#explore"
            className="inline-flex items-center gap-2 bg-black/40 hover:bg-primary-950/40 hover:border-primary-500/40 hover:text-primary-300 backdrop-blur-md text-gray-300 px-5 py-2.5 rounded-full text-xs tracking-wider uppercase border border-white/10 transition-all"
          >
            SCROLL TO EXPLORE
            <ArrowDown className="w-3.5 h-3.5 text-primary-400" />
          </a>
        </div>

        {/* Feature Card / Floating Glass Box */}
        <div className="bg-black/40 backdrop-blur-xl border border-primary-500/20 p-4 sm:p-6 rounded-2xl flex items-center gap-4 max-w-md w-full md:w-auto shadow-2xl">
          {/* Card Thumbnail */}
          <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-neutral-800 border border-primary-500/30">
            <img
              src="/images/dkjgrbk4wds27g.avif" // Replace with thumbnail image
              alt="Charging Port"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Card Details */}
          <div className="flex flex-col justify-center space-y-1 pr-2">
            <span className="text-xs font-medium tracking-wide text-primary-400 uppercase">
              EV STAY NETWORK
            </span>
            <h3 className="text-base sm:text-lg font-medium text-white leading-snug">
              Charge While You Stay
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-normal max-sm:line-clamp-2">
              Smart charging at hotels and highway destinations.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;