import React from 'react';

interface Step {
  number: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

const stepsData: Step[] = [
  {
    number: '01',
    title: 'Arrive & Hand Over',
    description:
      'The guest arrives at the hotel or resort, parks the EV and hands the car key to the hotel staff. The staff connects the vehicle to the EV Stay charger and starts charging.',
    imageSrc: "/images/how-to-use-step-1.avif",
    imageAlt: 'Guest handing over EV keys to hotel staff',
  },
  {
    number: '02',
    title: 'Stay & Relax',
    description:
      'While the EV charges, the guest can check in, relax, dine or enjoy their stay. The hotel staff takes care of the charging process.',
    imageSrc: "/images/how-to-use-step-2.avif",
    imageAlt: 'Guest relaxing in hotel room while EV charges outside',
  },
  {
    number: '03',
    title: 'Charged & Ready',
    description:
      'Once charging is complete, the staff disconnects the charger and returns the key to the guest with the EV charged and ready for the journey.',
    imageSrc: "/images/how-to-use-step-3.avif",
    imageAlt: 'Hotel staff returning key to guest next to fully charged EV',
  },
];

export const HowToUseSection: React.FC = () => {
  return (
    <section className="w-full bg-[#fcfcfc] text-gray-900 py-16 md:py-24 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Header Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Section Tag */}
          <div className="md:col-span-3 text-sm font-light text-primary-600 uppercase pt-2 tracking-wide">
            [02] HOW TO USE
          </div>

          {/* Main Title */}
          <div className="md:col-span-5">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-normal tracking-tight leading-none text-gray-950">
              3 Simple <br />
              Steps
            </h2>
          </div>

          {/* Description */}
          <div className="md:col-span-4 pt-2">
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              From arrival to payment, EV Stay makes EV charging simple and convenient with a seamless, staff-assisted experience at hotels and resorts.
            </p>
          </div>
        </div>

        {/* 3-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {stepsData.map((step) => (
            <div
              key={step.number}
              className="relative bg-white border border-gray-100/80 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-primary-300 transition-all duration-300 group"
            >
              {/* Corner Bracket Accent */}
              <div className="absolute top-6 left-6 w-3 h-3 border-l-2 border-t-2 border-primary-500" />

              {/* Top Text Content */}
              <div className="text-center space-y-3 mb-8 pt-6">
                <span className="text-base font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full inline-block">
                  {step.number}
                </span>
                <h3 className="text-xl font-normal text-gray-950 tracking-tight group-hover:text-primary-700 transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>

              {/* Card Image */}
              <div className="w-full h-64 sm:h-72 rounded-xl overflow-hidden bg-neutral-100 shrink-0">
                <img
                  src={step.imageSrc}
                  alt={step.imageAlt}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowToUseSection;