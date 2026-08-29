"use client"
import React, { useState } from 'react';
import { Plus, ArrowLeft, ArrowRight } from 'lucide-react';

interface SlideItem {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
}

const carouselData: SlideItem[] = [
  {
    id: '01',
    stepNumber: '01',
    title: 'Our Mission',
    subtitle: 'Make EV charging simple, accessible and convenient at hospitality destinations.',
    description:
      'We help hotels, resorts, restaurants and highway properties become EV-ready, giving travellers the freedom to charge while they stay, dine or relax.',
    imageSrc: '/images/2EJc73NbP4LX.avif', // Replace with your image asset path
  },
  {
    id: '02',
    stepNumber: '02',
    title: 'Our Vision',
    subtitle: 'Empowering seamless electric mobility across every travel route.',
    description:
      'Creating an interconnected network of hospitality partners where charging your vehicle is as effortless as ordering room service.',
    imageSrc: '/images/contact-page-hero-bg.avif',
  },
  {
    id: '03',
    stepNumber: '03',
    title: 'Our Values',
    subtitle: 'Hospitality-first engineering and reliable infrastructure.',
    description:
      'We design unobtrusive, intuitive charging solutions built around guest comfort and property operations.',
    imageSrc: '/images/Charge-anywhere-HighwayProperties.avif',
  },
];

export const OurPurposeSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? carouselData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === carouselData.length - 1 ? 0 : prev + 1));
  };

  const currentSlide = carouselData[currentIndex];

  return (
    <section className="w-full bg-white text-gray-900 py-16 md:py-24 px-6 md:px-12 font-sans relative">
      {/* Top Center Plus Accent */}
      <div className="flex justify-center mb-12 relative">
        <div className='w-full h-[1px] bg-gray-200 absolute top-1/2 z-0'></div>
        <Plus className="w-4 h-4 text-gray-400 stroke-[2] z-10 absolute top-1/2 -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto space-y-12 my-20">
        {/* Header Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Section Tag */}
          <div className="md:col-span-4 text-sm font-light text-green-600 uppercase pt-2 tracking-wide">
            [02] OUR PURPOSE
          </div>

          {/* Main Title */}
          <div className="md:col-span-5">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-normal tracking-tight leading-[1.05] text-gray-950">
              What Drives <br />
              EV Stay
            </h2>
          </div>

          {/* Subtitle / Paragraph */}
          <div className="md:col-span-3 pt-2">
            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-xs">
              Building a more convenient EV journey by connecting electric mobility with the places people stay, dine and relax.
            </p>
          </div>
        </div>

        {/* Feature Carousel Banner Card */}
        <div className="relative rounded-4xl overflow-hidden min-h-[520px] md:min-h-[680px] flex flex-col justify-end p-8 md:p-12 bg-neutral-900 group">
          {/* Background Image Layer */}
          <img
            src={currentSlide.imageSrc}
            alt={`${currentSlide.title} - EV Stay`}
            className="absolute inset-0 w-full h-full object-cover object-center z-0 transition-opacity duration-500"
          />

          {/* Subtle Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/10 z-10" />

          {/* Bottom Interactive Content Area */}
          <div className="relative z-20 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">

            {/* Left Box: Title & Subtitle Info */}
            <div className="md:col-span-8 space-y-2 max-w-2xl">
              <span className="text-sm text-green-400 font-medium tracking-wide uppercase block">
                {currentSlide.stepNumber} {currentSlide.title}
              </span>
              <h3 className="text-xl md:text-2xl font-light text-white tracking-tight leading-snug">
                {currentSlide.subtitle}
              </h3>
              <p className="text-sm md:text-base text-neutral-300 font-normal leading-relaxed">
                {currentSlide.description}
              </p>
            </div>

            {/* Right Box: Slide Counter & Navigation Controls */}
            <div className="md:col-span-4 flex items-center justify-end space-x-4">
              <span className="text-sm text-green-400 font-mono tracking-widest">
                0{currentIndex + 1}/0{carouselData.length}
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full cursor-pointer border border-white/30 bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-green-600 hover:border-green-600 transition-colors"
                  aria-label="Previous Slide"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full cursor-pointer border border-white/30 bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-green-600 hover:border-green-600 transition-colors"
                  aria-label="Next Slide"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default OurPurposeSection;