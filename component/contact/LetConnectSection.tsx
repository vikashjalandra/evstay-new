import React from 'react';

export const LetConnectSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-[85vh] md:min-h-[90vh] flex flex-col justify-between overflow-hidden font-sans">
      {/* Background Image Layer with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/contact-page-hero-bg.avif" // Replace with your image asset path
          alt="Luxury hotel entrance with staff member and charging EV"
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle Dark Gradient Overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-black/20" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 py-16 md:py-24 flex-1 flex flex-col justify-between">
        
        {/* Left Headline & Section Tag */}
        <div className="pt-8 md:pt-12 max-w-2xl space-y-4">
          <span className="text-sm text-green-400 font-medium uppercase block">
            LET'S CONNECT
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extralight text-white tracking-tight leading-[1.05]">
            Power Your Property <br />
            Forward.
          </h1>
        </div>

        {/* Right Paragraph Content */}
        <div className="flex justify-end pt-16 md:pt-0">
          <div className="max-w-md">
            <p className="text-sm md:text-lg text-gray-200 font-normal leading-relaxed text-left drop-shadow-sm">
              Whether you're exploring EV charging for a hotel, resort, restaurant or highway property, our team is here to help you find the right EV Stay solution.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LetConnectSection;