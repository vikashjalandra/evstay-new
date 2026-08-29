import React from 'react';
import { Plus } from 'lucide-react';

interface SolutionCard {
  title: string;
  category: string;
  imageSrc: string;
  imageAlt: string;
  wrapperClass: string; // Grid alignment aur width ke liye
  aspectRatio: string;  // Image aspect ratio ke liye
}

const solutionsData: SolutionCard[] = [
  {
    title: 'Premium Hotels',
    category: 'Guest Charging',
    imageSrc: '/images/Charge-anywhere-PremiumHotels.avif',
    imageAlt: 'EV charging at a luxury premium hotel entryway',
    wrapperClass: 'md:col-span-7', // Top-Left: Badi image (7 columns)
    aspectRatio: 'aspect-[16/10]',
  },
  {
    title: 'Resorts & Retreats',
    category: 'Destination Charging',
    imageSrc: '/images/Charge-anywhere-ResortsRetreats.avif',
    imageAlt: 'EV charging station at a resort retreat',
    wrapperClass: 'md:col-span-5 md:w-[85%] md:ml-auto', // Top-Right: Choti image (5 columns)
    aspectRatio: 'aspect-[4/3]',
  },
  {
    title: 'Restaurants',
    category: 'Dine & Charge',
    imageSrc: '/images/Charge-anywhere-Restaurants.avif',
    imageAlt: 'EV parked and charging outside a modern restaurant',
    wrapperClass: 'md:col-span-5 md:w-[85%]', // Bottom-Left: Choti image (5 columns)
    aspectRatio: 'aspect-[4/3]',
  },
  {
    title: 'Highway Properties',
    category: 'Journey Charging',
    imageSrc: '/images/Charge-anywhere-HighwayProperties.avif',
    imageAlt: 'EV charging at a highway stopover location at twilight',
    wrapperClass: 'md:col-span-7', // Bottom-Right: Badi image (7 columns)
    aspectRatio: 'aspect-[16/10]',
  },
];

export const SolutionsSection: React.FC = () => {
  return (
    <section className="w-full bg-white text-gray-900 py-16 md:py-24 px-6 md:px-12 font-sans relative">

      {/* Top Center Plus Separator Accent */}
      <div className="flex justify-center mb-12">
        <Plus className="w-4 h-4 text-primary-500 stroke-[1.5]" />
      </div>

      <div className="max-w-7xl mx-auto space-y-16">

        {/* Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-3 text-sm font-light text-primary-600 uppercase pt-2 tracking-wide">
            [03] EV STAY SOLUTIONS
          </div>

          <div className="md:col-span-5">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-normal tracking-tight leading-[1.05] text-gray-950">
              Charge <br />
              Anywhere
            </h2>
          </div>

          <div className="md:col-span-4 pt-2">
            <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-sm">
              From premium hotels to highway stopovers, EV Stay brings convenient charging to properties where travellers stay, dine and recharge.
            </p>
          </div>
        </div>

        {/* 12-Column Asymmetric Staggered Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-16 items-start">
          {solutionsData.map((item, index) => (
            <div key={index} className={`group flex flex-col space-y-3 cursor-pointer ${item.wrapperClass}`}>
              
              {/* Image Container */}
              <div className={`w-full ${item.aspectRatio} rounded-2xl overflow-hidden bg-neutral-100 shadow-sm border border-transparent group-hover:border-primary-200 transition-all duration-300`}>
                <img
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Minimal Text Label Below Image */}
              <div className="flex items-center justify-between pt-1 px-1 text-sm md:text-base">
                <h3 className="font-normal text-gray-900 group-hover:text-primary-700 transition-colors">
                  {item.title}
                </h3>
                <span className="font-normal text-gray-400">
                  {item.category}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SolutionsSection;