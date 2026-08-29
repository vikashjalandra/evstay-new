import React from 'react';
import { Plus } from 'lucide-react';

interface SolutionItem {
  number: string;
  title: string;
  description: string;
}

const solutionsList: SolutionItem[] = [
  {
    number: '01',
    title: 'Hotels',
    description:
      'Give your guests convenient EV charging while they stay, creating a more complete and future-ready hospitality experience.',
  },
  {
    number: '02',
    title: 'Resorts',
    description:
      'Add EV charging to your resort and let guests recharge their vehicles while they relax, stay and explore.',
  },
  {
    number: '03',
    title: 'Restaurants',
    description:
      'Turn dining time into charging time with convenient EV charging for customers while they enjoy their meal.',
  },
  {
    number: '04',
    title: 'Highway Properties',
    description:
      'Create a reliable charging stop for EV travellers and add more value to properties along busy travel routes.',
  },
];

export const EveryStayStopSection: React.FC = () => {
  return (
    <section className="w-full bg-black text-white py-16 md:py-24 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Heading & Section Number */}
        <div className="lg:col-span-5 flex flex-col justify-start space-y-6 pt-2">
          {/* Section Tag */}
          <span className="text-sm font-light text-primary-400 uppercase tracking-wide">
            [06] CHARGING SOLUTIONS FOR
          </span>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.05] text-white">
            Every Stay & <br />
            Stop
          </h2>
        </div>

        {/* Right Column: 2x2 Grid with Cross Borders & Plus Icons */}
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
            
            {/* Left Box (Contains items 01 and 03) */}
            <div className="divide-y divide-primary-900/50 flex flex-col justify-between">
              {/* Item 01 */}
              <div className="p-8 md:p-10 flex flex-col justify-start space-y-6 min-h-[260px] hover:bg-neutral-900/60 transition-colors">
                <span className="text-4xl md:text-5xl font-light text-primary-400 tracking-tight">
                  01
                </span>
                <div className="space-y-2">
                  <h3 className="text-xl font-medium text-white">
                    Hotels & Resorts
                  </h3>
                  <p className="text-sm md:text-base text-neutral-400 leading-relaxed font-normal">
                    Provide convenient overnight charging for guests while adding a premium amenity to your property.
                  </p>
                </div>
              </div>

              {/* Item 03 */}
              <div className="p-8 md:p-10 flex flex-col justify-start space-y-6 min-h-[260px] hover:bg-neutral-900/60 transition-colors">
                <span className="text-4xl md:text-5xl font-light text-primary-400 tracking-tight">
                  03
                </span>
                <div className="space-y-2">
                  <h3 className="text-xl font-medium text-white">
                    Lodges & Homestays
                  </h3>
                  <p className="text-sm md:text-base text-neutral-400 leading-relaxed font-normal">
                    Simple charging solutions designed for smaller hospitality properties and boutique stays.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Box (Contains items 02 and 04) */}
            <div className="divide-y divide-primary-900/50 flex flex-col justify-between">
              {/* Item 02 */}
              <div className="p-8 md:p-10 flex flex-col justify-start space-y-6 min-h-[260px] hover:bg-neutral-900/60 transition-colors">
                <span className="text-4xl md:text-5xl font-light text-primary-400 tracking-tight">
                  02
                </span>
                <div className="space-y-2">
                  <h3 className="text-xl font-medium text-white">
                    Restaurants & Cafes
                  </h3>
                  <p className="text-sm md:text-base text-neutral-400 leading-relaxed font-normal">
                    Attract EV travellers looking to recharge while enjoying a meal or short break.
                  </p>
                </div>
              </div>

              {/* Item 04 */}
              <div className="p-8 md:p-10 flex flex-col justify-start space-y-6 min-h-[260px] hover:bg-neutral-900/60 transition-colors">
                <span className="text-4xl md:text-5xl font-light text-primary-400 tracking-tight">
                  04
                </span>
                <div className="space-y-2">
                  <h3 className="text-xl font-medium text-white">
                    Highway Properties
                  </h3>
                  <p className="text-sm md:text-base text-neutral-400 leading-relaxed font-normal">
                    High-demand charging locations for long-distance drivers pausing along major travel routes.
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

export default EveryStayStopSection;