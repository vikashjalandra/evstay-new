import React from 'react';

export const PowerYourPropertySection: React.FC = () => {
  return (
    <section className="relative w-full min-h-[85vh] md:min-h-[90vh] flex flex-col justify-start items-start overflow-hidden font-sans">
      {/* Background Image Layer with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/partnerWithUs-page-hero-bg.avif" // Replace with your image asset path
          alt="EV charging at hotel property entrance"
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle Dark Gradient Overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-black/30" />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-5xl mx-auto w-full px-6 md:px-12 py-32 text-center space-y-6 flex flex-col items-center">
        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extralight text-white tracking-tight leading-[1.05]">
          Power Your Property. <br />
          Elevate Every Stay.
        </h1>

        {/* Subtitle Paragraph */}
        <p className="text-base md:text-lg text-gray-200 font-normal leading-relaxed max-w-xl drop-shadow-sm">
          Bring convenient EV charging to your property and create a better experience for the growing community of EV travellers.
        </p>
      </div>
    </section>
  );
};

export default PowerYourPropertySection;