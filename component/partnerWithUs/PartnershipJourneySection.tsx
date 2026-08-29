import React from 'react';

interface JourneyStep {
  step: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
}

const steps: JourneyStep[] = [
  {
    step: '01',
    category: 'DISCOVER',
    title: 'Understand Your Property',
    subtitle: 'Start with the right foundation.',
    description:
      'We assess your property, parking and charging requirements to understand the ideal EV Stay setup.',
  },
  {
    step: '02',
    category: 'CONFIGURE',
    title: 'Choose Your Setup',
    subtitle: 'Designed around your destination.',
    description:
      'We recommend the charging configuration that best fits your property and guest requirements.',
  },
  {
    step: '03',
    category: 'INSTALL',
    title: 'Get EV-Ready',
    subtitle: 'From planning to installation.',
    description:
      'The EV Stay charging solution is professionally installed, configured and prepared for operation.',
  },
  {
    step: '04',
    category: 'ACTIVATE',
    title: 'Welcome EV Guests',
    subtitle: 'Charging becomes part of the stay.',
    description:
      'Your property can now offer convenient EV charging as an added hospitality amenity.',
  },
  {
    step: '05',
    category: 'OPERATE',
    title: 'Charge & Manage',
    subtitle: 'Simple for guests. Easy for staff.',
    description:
      'Manage charging sessions, monitor usage and handle billing through the EV Stay system.',
  },
  {
    step: '06',
    category: 'SUPPORT',
    title: 'Ongoing Support',
    subtitle: 'We stay connected.',
    description:
      'EV Stay continues to support your property with operational and maintenance assistance.',
  },
];

export const PartnershipJourneySection: React.FC = () => {
  return (
    <section className="w-full bg-[#fcfcf9] text-gray-900 py-16 md:py-24 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Section Tag */}
          <div className="md:col-span-4 text-sm font-light text-green-600 uppercase pt-2 tracking-wide">
            [03] PARTNERSHIP JOURNEY
          </div>

          {/* Headline & Subtitle Container */}
          <div className="md:col-span-8 space-y-4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-gray-950 leading-[1.05]">
              From Property to EV-Ready.
            </h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-xl">
              A simple, guided process to bring EV Stay to your property—from understanding your requirements and selecting the right setup to installation, guest charging and ongoing support.
            </p>
          </div>
        </div>

        {/* 2-Column Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-16 divide-y md:divide-y-0 divide-gray-200/60">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className={`pt-8 md:pt-0 space-y-3 relative pl-8 border-l border-green-200 ${index % 2 === 0 ? 'md:border-l-0 md:pl-0' : ''
                }`}
            >
              {/* Subtle Radio Bullet Dot */}
              <div className="flex items-center space-x-2 text-xs font-semibold tracking-wider text-green-600 uppercase">
                <span className='font-light'>
                  {item.step} / {item.category}
                </span>
              </div>

              {/* Step Title & Details */}
              <div className="space-y-1 pt-1">
                <h3 className="text-xl md:text-2xl font-medium text-gray-950 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base font-normal text-gray-900">
                  {item.subtitle}
                </p>
              </div>

              <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-md pt-1">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnershipJourneySection;