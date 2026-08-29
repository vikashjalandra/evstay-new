import React from 'react';

export const WhyPartnerWithUsSection: React.FC = () => {
  return (
    <section className="w-full bg-[#fcfcfc] text-gray-900 py-16 md:py-24 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Section Tag */}
          <div className="md:col-span-4 text-sm font-light text-green-600 uppercase pt-2 tracking-wide">
            [01] WHY PARTNER WITH US
          </div>

          {/* Title & Subtitle Container */}
          <div className="md:col-span-8 space-y-6">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-gray-950 leading-[1.05]">
              Make Your Property Part of the EV Journey
            </h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl">
              EV Stay helps hotels, resorts, restaurants and highway properties offer convenient EV charging-adding a valuable guest amenity while preparing your destination for the future of electric travel.
            </p>
          </div>
        </div>

        {/* Hero Image Box */}
        <div className="relative rounded-3xl overflow-hidden min-h-[420px] md:min-h-[660px] w-full shadow-sm border border-gray-100">
          <img
            src="/images/LXhfQAsaS3UY.avif" // Replace with your image asset path
            alt="Guests arriving at The Serenity Resort & Spa with EV charging station"
            className="w-full h-full object-cover object-center absolute inset-0"
          />
        </div>
      </div>
    </section>
  );
};

export default WhyPartnerWithUsSection;