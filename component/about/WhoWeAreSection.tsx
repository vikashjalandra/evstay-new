import React from 'react';
import { Zap } from 'lucide-react';

export const WhoWeAreSection: React.FC = () => {
  return (
    <section className="w-full bg-[#fcfcfc] text-gray-900 py-16 md:py-24 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Section Tag */}
          <div className="md:col-span-4 text-sm font-light text-primary-600 uppercase pt-2 tracking-wide">
            [01] WHO WE ARE
          </div>

          {/* Title & Subtitle Container */}
          <div className="md:col-span-8 space-y-6">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-gray-950 leading-[1.05]">
              Where Hospitality Meets Mobility
            </h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl">
              EV Stay connects electric mobility with hospitality, making EV charging simple for properties and convenient for travellers wherever they stay, dine or pause along their journey.
            </p>
          </div>
        </div>

        {/* Bento Box Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">

          {/* Left Column: Large Vertical Image */}
          <div className="md:col-span-4 relative rounded-2xl overflow-hidden min-h-[480px] md:min-h-full">
            <img
              src="/images/QAsaS3UY.avif" // Replace with your image asset
              alt="Guests arriving at luxury hotel property"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>

          {/* Right Area Grid (2x2 Grid Layout) */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Box 1: Green Hospitality First Banner */}
            <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white rounded-2xl p-8 flex flex-col justify-between min-h-[400px] relative overflow-hidden shadow-md">
              {/* Minimalist Geometric / Triangle Outline Accent */}
              <div className="absolute top-6 right-6 opacity-40 pointer-events-none">
                <svg
                  width="54"
                  height="54"
                  viewBox="0 0 54 54"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <polygon points="27,6 48,46 6,46" />
                </svg>
                <svg
                  width="70"
                  height="70"
                  viewBox="0 0 54 54"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className='absolute top-0'
                >
                  <polygon points="27,6 48,46 6,46" />
                </svg>
              </div>

              {/* Box Text Content */}
              <div className="mt-auto space-y-2">
                <h3 className="text-2xl md:text-3xl font-light tracking-tight text-white">
                  Hospitality First
                </h3>
                <p className="text-sm md:text-base text-emerald-100 font-normal leading-relaxed">
                  Designed for hotels, resorts, restaurants & highway properties.
                </p>
              </div>
            </div>

            {/* Box 2: EV Car Charging Image */}
            <div className="relative rounded-2xl overflow-hidden min-h-[260px]">
              <img
                src="/images/ev-charging-representation.avif" // Replace with staff & hotel image asset
                alt="Luxury EV charging at hotel parking"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>

            {/* Box 3: Staff & Hotel Exterior Image */}
            <div className="relative rounded-2xl overflow-hidden min-h-[260px]">
              <img
                src="/images/2EJbP4LXAs.avif" // Replace with EV charging car image asset
                alt="Hotel staff standing outside hotel entrance"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>

            {/* Box 4: Black Simple by Design Card */}
            <div className="bg-black text-white rounded-2xl p-8 flex flex-col justify-between min-h-[260px] relative">
              {/* Icon Badge */}
              <div className="self-end">
                <div className="w-10 h-10 rounded-full border border-neutral-800 bg-neutral-900/50 flex items-center justify-center text-neutral-300">
                  <Zap className="w-6 h-6 stroke-[1.5]" />
                </div>
              </div>

              {/* Box Text Content */}
              <div className="mt-auto space-y-2">
                <h3 className="text-2xl md:text-3xl font-light tracking-tight text-white">
                  Simple by <br />
                  Design
                </h3>
                <p className="text-sm md:text-base text-neutral-400 font-normal leading-relaxed">
                  Easy charging for guests. Straightforward operation for staff.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;