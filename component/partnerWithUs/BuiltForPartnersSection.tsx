import React from 'react';

interface PartnerFeature {
  number: string;
  title: string;
  description: string;
}

const features: PartnerFeature[] = [
  {
    number: '01',
    title: 'Better Guest Experience',
    description:
      'Offer seamless, reliable charging as a premium amenity, allowing guests to relax knowing their journey continues effortlessly.',
  },
  {
    number: '02',
    title: 'EV-Ready Property',
    description:
      'Future-proof your infrastructure with scalable charging solutions designed to grow alongside the accelerating EV market.',
  },
  {
    number: '03',
    title: 'Attract Premium Travellers',
    description:
      'Put your property on the map for high-value EV owners who specifically filter and choose destinations based on charging availability.',
  },
  {
    number: '04',
    title: 'Turnkey Management',
    description:
      'We handle the installation, maintenance, and guest support, providing a completely hands-off operational experience for your staff.',
  },
];

export const BuiltForPartnersSection: React.FC = () => {
  return (
    <section className="w-full bg-[#fcfcfc] text-gray-900 py-16 md:py-24 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Section Tag */}
          <div className="md:col-span-4 text-sm font-light text-green-600 uppercase pt-2 tracking-wide">
            [02] BUILT FOR PARTNERS
          </div>

          {/* Headline & Subtitle Container */}
          <div className="md:col-span-8 space-y-6">
            <h2 className="text-4xl sm:text-5xl font-extralight tracking-tight text-gray-950 leading-[1.05]">
              More Than Charging. <br />
              More Value for Your Property.
            </h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-xl">
              Integrating EV STAY isn't just about providing power; it's about elevating the entire guest journey and positioning your property at the forefront of modern hospitality.
            </p>
          </div>
        </div>

        {/* 4-Column Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-gray-200/80">
          {features.map((feature, index) => (
            <div
              key={feature.number}
              className={`flex flex-col justify-start space-y-4 pt-6 sm:pt-0 ${index !== 0 ? 'sm:pl-8' : ''
                }`}
            >
              <span className="text-4xl md:text-7xl font-light text-green-600/30 tracking-tight">
                {feature.number}
              </span>
              <h3 className="text-lg md:text-xl font-normal text-gray-950 tracking-tight pt-2">
                {feature.title}
              </h3>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed font-normal">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuiltForPartnersSection;