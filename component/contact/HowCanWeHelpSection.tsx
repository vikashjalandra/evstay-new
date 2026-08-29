import React from 'react';

interface HelpOption {
  number: string;
  title: string;
  description: string;
}

const options: HelpOption[] = [
  {
    number: '01',
    title: 'Become a Partner',
    description:
      'Join our network of premium destinations. Add high-speed EV charging to your property amenities.',
  },
  {
    number: '02',
    title: 'Charging Solutions',
    description:
      'Explore our range of AC and DC fast chargers designed for commercial deployment and reliability.',
  },
  {
    number: '03',
    title: 'Partner Support',
    description:
      'Already an EV Stay partner? Access technical support, maintenance requests, and dashboard assistance.',
  },
];

export const HowCanWeHelpSection: React.FC = () => {
  return (
    <section className="w-full bg-white text-gray-900 py-16 md:py-24 px-6 md:px-12 font-sans relative">
      {/* Decorative center plus icon at the top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400 text-xs font-mono">
        +
      </div>

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Section Tag */}
          <div className="md:col-span-3 text-base font-light text-green-600 uppercase pt-2 tracking-wide">
            [02] HOW CAN WE HELP?
          </div>

          {/* Main Headline */}
          <div className="md:col-span-5">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-gray-950 leading-[1.02]">
              What You <br />
              want
            </h2>
          </div>

          {/* Subtitle / Side Text */}
          <div className="md:col-span-4 pt-2">
            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-xs">
              From bringing EV charging to your property to getting help with an existing installation, connect with the right EV Stay team.
            </p>
          </div>
        </div>

        {/* 3-Column Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {options.map((item) => (
            <div
              key={item.number}
              className="relative bg-white rounded-3xl p-8 md:p-10 border border-gray-100/80 shadow-[0_2px_16px_-4px_rgba(0,0,0,0.03)] flex flex-col justify-between overflow-hidden min-h-[240px] group hover:border-green-300 transition-colors"
            >
              {/* Content Container */}
              <div className="space-y-4 z-10 max-w-[75%]">
                <h3 className="text-xl md:text-2xl font-normal text-gray-950 tracking-tight group-hover:text-green-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              {/* Large Faded Number Watermark in Background */}
              <span className="absolute right-4 bottom-2 text-8xl md:text-9xl font-light text-green-100/60 select-none pointer-events-none tracking-tight leading-none z-0">
                {item.number}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowCanWeHelpSection;