import React from 'react';

export const ChargingSolutionSection: React.FC = () => {
  return (
    <section className="w-full font-sans overflow-hidden">
      {/* Upper White Section */}
      <div className="bg-[#fcfcfc] text-gray-900 py-20 md:py-28 px-6 md:px-12 relative flex flex-col items-center">
        {/* Subtle Side Typography Watermarks */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-200 text-5xl md:text-6xl font-extralight tracking-widest -rotate-90 select-none hidden lg:block">
          7.5 kW
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-200 text-5xl md:text-6xl font-extralight tracking-widest rotate-90 select-none hidden lg:block">
          EV STAY
        </div>

        {/* Central Charger Image Mockup Card */}
        <div className="relative z-10 p-8 sm:m-10 max-w-xl w-full flex justify-center mb-12">
          <img
            src="/images/evstay-charger-7.5kw-transparent.avif" // Replace with EV Stay 7.5kW charger image asset
            alt="EV Stay 7.5 kW Smart Charging Unit"
            className="h-64 sm:h-96 object-contain drop-shadow-md"
          />
        </div>

        {/* Text Details Below Hardware */}
        <div className="max-w-xl text-center space-y-3 z-10">
          <span className="text-sm text-green-600 uppercase block">
            EV STAY CHARGING SOLUTION
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-gray-950">
            7.5 kW. Built for Hospitality.
          </h2>
          <p className="text-sm md:text-base text-gray-500 leading-relaxed font-normal max-w-lg mx-auto">
            A Smart EV Charging Solution Designed For Hotels, Resorts And Travel Destinations Combining Convenient Charging, Simple Operation And Integrated Billing In One Streamlined System.
          </p>
        </div>
      </div>

      {/* Lower Black CTA Card Section */}
      <div className="bg-white py-16 md:py-20 px-6 md:px-12 flex justify-center">
        <div className="max-w-7xl w-full bg-[#0a0a0a] border border-green-900/40 rounded-4xl p-8 sm:p-12 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          
          {/* Left Text */}
          <div className="space-y-3 max-w-2xl">
            <h3 className="text-3xl sm:text-4xl font-extralight tracking-tight text-white">
              Stay Ready for What's Next
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-neutral-400 font-normal leading-relaxed">
              Our scalable solutions ensure your property remains competitive as electric mobility becomes the global standard.
            </p>
          </div>

          {/* Right CTA Button */}
          <a href="/contact" className="shrink-0">
            <div className="bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-600/30 transition-all px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-tight">
              Partner With Us
            </div>
          </a>

        </div>
      </div>
    </section>
  );
};

export default ChargingSolutionSection;