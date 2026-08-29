import React from 'react';
import { Plus } from 'lucide-react';

interface FeatureItem {
  number: string;
  title: string;
  description: string;
}

const featuresList: FeatureItem[] = [
  {
    number: '01',
    title: 'Hospitality Focused',
    description: 'Designed for hotels, resorts, restaurants and travel destinations.',
  },
  {
    number: '02',
    title: 'Simple Operation',
    description: 'An easy staff-assisted charging experience.',
  },
  {
    number: '03',
    title: 'Integrated Experience',
    description: 'Charging status, session handling and receipt generation in one solution.',
  },
  {
    number: '04',
    title: 'Guest Convenience',
    description: 'Guests can make the most of their stay while their EV charges.',
  },
];

export const HospitalityMeetsChargingSection: React.FC = () => {
  return (
    <section className="w-full bg-black text-white py-16 md:py-24 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Heading & Section Tag */}
        <div className="lg:col-span-5 flex flex-col justify-start space-y-6 pt-2">
          {/* Section Tag */}
          <span className="text-sm font-light text-primary-400 uppercase tracking-wide">
            [04] What Makes Us Different
          </span>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.05] text-white">
            Hospitality <br />
            Meets Charging
          </h2>
        </div>

        {/* Right Column: 2x2 Grid with Cross Borders & Plus Accents */}
        <div className="lg:col-span-7 relative border border-primary-900/50">
          
          {/* Top Center Plus Icon Accent */}
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-black px-1 z-10">
            <Plus className="w-4 h-4 text-primary-400 stroke-[1.5]" />
          </div>

          {/* Bottom Center Plus Icon Accent */}
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-black px-1 z-10">
            <Plus className="w-4 h-4 text-primary-400 stroke-[1.5]" />
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x border-primary-900/50">
            
            {/* Left Box Column (Contains items 01 and 03) */}
            <div className="divide-y divide-primary-900/50 flex flex-col justify-between">
              {/* Item 01 */}
              <div className="p-8 md:p-10 flex flex-col justify-start space-y-6 min-h-[260px] hover:bg-neutral-900/60 transition-colors">
                <span className="text-4xl md:text-5xl font-light text-primary-400 tracking-tight">
                  {featuresList[0].number}
                </span>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-white">
                    {featuresList[0].title}
                  </h3>
                  <p className="text-sm md:text-base text-neutral-400 leading-relaxed">
                    {featuresList[0].description}
                  </p>
                </div>
              </div>

              {/* Item 03 */}
              <div className="p-8 md:p-10 flex flex-col justify-start space-y-6 min-h-[260px] hover:bg-neutral-900/60 transition-colors">
                <span className="text-4xl md:text-5xl font-light text-primary-400 tracking-tight">
                  {featuresList[2].number}
                </span>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-white">
                    {featuresList[2].title}
                  </h3>
                  <p className="text-sm md:text-base text-neutral-400 leading-relaxed">
                    {featuresList[2].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Box Column (Contains items 02 and 04) */}
            <div className="divide-y divide-primary-900/50 flex flex-col justify-between">
              {/* Item 02 */}
              <div className="p-8 md:p-10 flex flex-col justify-start space-y-6 min-h-[260px] hover:bg-neutral-900/60 transition-colors">
                <span className="text-4xl md:text-5xl font-light text-primary-400 tracking-tight">
                  {featuresList[1].number}
                </span>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-white">
                    {featuresList[1].title}
                  </h3>
                  <p className="text-sm md:text-base text-neutral-400 leading-relaxed">
                    {featuresList[1].description}
                  </p>
                </div>
              </div>

              {/* Item 04 */}
              <div className="p-8 md:p-10 flex flex-col justify-start space-y-6 min-h-[260px] hover:bg-neutral-900/60 transition-colors">
                <span className="text-4xl md:text-5xl font-light text-primary-400 tracking-tight">
                  {featuresList[3].number}
                </span>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-white">
                    {featuresList[3].title}
                  </h3>
                  <p className="text-sm md:text-base text-neutral-400 leading-relaxed">
                    {featuresList[3].description}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default HospitalityMeetsChargingSection;