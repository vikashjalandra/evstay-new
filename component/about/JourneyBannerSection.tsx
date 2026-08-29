import React from 'react';
import { Zap } from 'lucide-react';

export const JourneyBannerSection: React.FC = () => {
  return (
    <section className="w-full bg-black text-white py-24 md:py-36 px-6 md:px-12 font-sans flex items-center justify-center text-center">
      <div className="max-w-4xl mx-auto space-y-6 flex flex-col items-center">
        
        {/* Lightning Bolt Icon Accent */}
        <div className="flex items-center justify-center mb-2">
          {/* <Zap  /> */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="w-12 h-12 text-green-400 fill-green-400 stroke-1">
	<path d="M0 0h16v16H0z" fill="none" />
	<path fill="currentColor" d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09zM4.157 8.5H7a.5.5 0 0 1 .478.647L6.11 13.59l5.732-6.09H9a.5.5 0 0 1-.478-.647L9.89 2.41z" />
</svg>

        </div>

        {/* Central Headline */}
        <h2 className="text-4xl sm:text-6xl md:text-6xl font-extralight tracking-tight text-white leading-[1.1] max-w-3xl">
          The journey shouldn't stop when the battery does.
        </h2>

        {/* Supporting Subtext */}
        <p className="text-sm sm:text-base md:text-lg text-neutral-400 font-normal leading-relaxed max-w-2xl pt-2">
          EVStay is building a hospitality charging ecosystem that seamlessly integrates power into your downtime, elevating the standard of modern travel.
        </p>
        
      </div>
    </section>
  );
};

export default JourneyBannerSection;