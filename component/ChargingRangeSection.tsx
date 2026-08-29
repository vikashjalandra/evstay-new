import React from 'react';
import { Plus } from 'lucide-react';

interface ChargerOption {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  specs: {
    label1: string;
    sub1: string;
    label2: string;
    sub2: string;
    label3: string;
    sub3: string;
  };
  bestFor: string;
}

const chargerData: ChargerOption[] = [
  {
    title: '3.5 kW Charger',
    description:
      'A compact charging solution for properties looking to offer convenient everyday EV charging.',
    imageSrc: '/images/evstay-charger-3.5kw.avif', // Replace with your image path
    imageAlt: '3.5 kW EV STAY Wall Charger',
    specs: {
      label1: '3.5',
      sub1: 'KW',
      label2: 'Compact',
      sub2: 'Setup',
      label3: 'Staff',
      sub3: 'Assisted',
    },
    bestFor: 'Hotels & Small Properties',
  },
  {
    title: '7.5 kW Charger',
    description:
      'A balanced charging solution offering greater power for regular guest and traveller charging.',
    imageSrc: '/images/evstay-charger-7.5kw.avif', // Replace with your image path
    imageAlt: '7.5 kW EV STAY Wall Charger',
    specs: {
      label1: '7.5',
      sub1: 'KW',
      label2: 'Faster',
      sub2: 'Charging',
      label3: 'Smart',
      sub3: 'Display',
    },
    bestFor: 'Hotels, Resorts & Restaurants',
  },
  {
    title: '7.5 kW + 7.5 kW Charger',
    description:
      'A higher-power charging solution designed for properties with greater EV traffic and charging demand.',
    imageSrc: '/images/evstay-charger-double-side-7.5kw.avif', // Replace with your image path
    imageAlt: 'Dual 7.5 kW EV STAY Wall Charger',
    specs: {
      label1: '7.5 + 7.5',
      sub1: 'KW',
      label2: 'High',
      sub2: 'Power',
      label3: 'High',
      sub3: 'Demand',
    },
    bestFor: 'Premium & Highway Properties',
  },
];

export const ChargingRangeSection: React.FC = () => {
  return (
    <section className="w-full bg-[#fcfcfc] text-gray-900 py-16 md:py-24 px-6 md:px-12 font-sans relative">
      {/* Top Center Plus Accent */}
      <div className="flex justify-center mb-12">
        <Plus className="w-4 h-4 text-primary-500 stroke-[1.5]" />
      </div>

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Section Tag */}
          <div className="md:col-span-4 text-sm font-light text-primary-600 uppercase pt-2 tracking-wide">
            [05] OUR CHARGING RANGE
          </div>

          {/* Main Title */}
          <div className="md:col-span-5">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-normal tracking-tight leading-[1.05] text-gray-950">
              Choose Your <br />
              Charger
            </h2>
          </div>

          {/* Description */}
          <div className="md:col-span-3 pt-2">
            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-xs">
              Choose the right EV Stay charging setup for your property-from a simple 3.5 kW socket to higher-capacity dual charging solutions.
            </p>
          </div>
        </div>

        {/* 3-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
          {chargerData.map((charger, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-primary-300 transition-colors shadow-sm"
            >
              {/* Image Box */}
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-neutral-900 mb-6 border border-primary-500/20">
                <img
                  src={charger.imageSrc}
                  alt={charger.imageAlt}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Text Info */}
              <div className="space-y-3 px-1 mb-6">
                <h3 className="text-lg font-medium text-gray-950">
                  {charger.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed min-h-[3rem]">
                  {charger.description}
                </p>
              </div>

              {/* Key Specifications Green Bar */}
              <div className="bg-primary-50/70 border border-primary-100 rounded-xl p-3 grid grid-cols-3 text-center divide-x divide-primary-200/80 mb-4">
                <div className="flex flex-col justify-center px-1">
                  <span className="text-sm font-semibold text-primary-700 leading-tight pb-2">
                    {charger.specs.label1}
                  </span>
                  <span className="text-xs text-primary-800 font-medium">
                    {charger.specs.sub1}
                  </span>
                </div>
                <div className="flex flex-col justify-center px-1">
                  <span className="text-sm font-semibold text-primary-700 leading-tight pb-2">
                    {charger.specs.label2}
                  </span>
                  <span className="text-xs text-primary-800 font-medium">
                    {charger.specs.sub2}
                  </span>
                </div>
                <div className="flex flex-col justify-center px-1">
                  <span className="text-sm font-semibold text-primary-700 leading-tight pb-2">
                    {charger.specs.label3}
                  </span>
                  <span className="text-xs text-primary-800 font-medium">
                    {charger.specs.sub3}
                  </span>
                </div>
              </div>

              {/* Best For Footer Tag */}
              <div className="px-1 text-xs sm:text-sm text-gray-500">
                <span className="text-primary-700 font-medium">Best for : </span>
                <span className="text-gray-800">{charger.bestFor}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChargingRangeSection;