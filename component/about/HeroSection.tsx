import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-[85vh] md:min-h-[90vh] flex flex-col justify-between overflow-hidden font-sans">
      {/* Background Image Layer with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/about-page-hero-bg.avif" // Replace with your hero image path
          alt="EV charging station at hotel & resort entrance"
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle Dark Gradient Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/10 to-black/5" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 py-16 md:py-24 flex-1 flex flex-col justify-between">
        
        {/* Top Headline */}
        <div className="pt-8 md:pt-12 max-w-2xl">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extralight text-white tracking-tight leading-[1.05]">
            Charging Hospitality <br />
            Forward.
          </h1>
        </div>

        {/* Bottom Description (Positioned on the Right Side) */}
        <div className="flex justify-end pt-16 md:pt-0">
          <div className="max-w-md space-y-2">
            <p className="text-base md:text-lg text-gray-200 font-light leading-relaxed text-left md:text-left drop-shadow-sm">
              EV Stay brings intelligent, seamless charging infrastructure to the world's finest hotels and resorts, ensuring your journey never pauses for power.
            </p>
          </div>
        </div>

      </div>lg
    </section>
  );
};

export default HeroSection;