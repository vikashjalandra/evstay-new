import React from 'react';
import { Plus, Star } from 'lucide-react';

export const WhyChooseSection: React.FC = () => {
    return (
        <section className="w-full bg-[#fcfcfc] text-gray-900 py-16 md:py-24 px-6 md:px-12 font-sans relative">
            {/* Top Center Plus Accent */}
            <div className="flex justify-center mb-12">
                <Plus className="w-4 h-4 text-green-500 stroke-[1.5]" />
            </div>

            <div className="max-w-7xl mx-auto space-y-16">
                {/* Header Section */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    {/* Section Tag */}
                    <div className="md:col-span-4 text-sm font-light text-primary-600 uppercase pt-2 tracking-wide">
                        [04] WHY CHOOSE EV STAY
                    </div>

                    {/* Headline & Description */}
                    <div className="md:col-span-8 space-y-6">
                        <h2 className="text-4xl sm:text-5xl md:text-5xl font-medium tracking-tight leading-[1.08] text-gray-950">
                            Smart charging built for hospitality <br className="hidden sm:inline" />
                            and every journey
                        </h2>
                        <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-xl">
                            EV Stay helps hotels, resorts, restaurants and highway properties offer convenient EV charging while creating a better experience for every guest.
                        </p>
                    </div>
                </div>

                {/* Bento / Feature Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

                    {/* Card 1: Image Overlay Card (5 Cols) */}
                    <div className="lg:col-span-4 relative rounded-2xl overflow-hidden min-h-[420px] lg:min-h-[480px] flex flex-col justify-end p-8 bg-neutral-900 border border-gray-100 group">
                        <img
                            src="/images/ev-charging-representation-in-ho.avif" // Replace with your image path
                            alt="EV charging outside luxury venue"
                            className="absolute inset-0 w-full h-full object-cover object-center z-0 transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

                        {/* Corner Bracket Accent */}
                        <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-green-500 z-20" />

                        {/* Caption */}
                        <p className="relative z-20 text-white text-xl md:text-2xl font-light leading-snug max-w-xs">
                            Charge while you stay. Travel when ready.
                        </p>
                    </div>

                    {/* Card 2: Green Glow Graphic Card (4 Cols) */}
                    <div className="lg:col-span-4 bg-white border border-green-100 rounded-2xl p-8 relative overflow-hidden flex flex-col justify-start min-h-[420px] lg:min-h-[480px]">
                        {/* Corner Accent */}
                        <div className="absolute top-6 left-6 w-6 h-6 border-l-2 border-t-2 border-green-500 z-10" />

                        {/* Content */}
                        <div className="relative z-10 pt-4 text-center max-w-xs mx-auto space-y-2">
                            <h3 className="text-lg font-light text-gray-950 tracking-tight">
                                Easy to Install. Easy to Operate.
                            </h3>
                            <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                                Designed for hotels, resorts, restaurants and highway properties.
                            </p>
                        </div>

                        {/* Soft Radial Green Glow Graphic */}
                        <div
                            className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-60"
                            style={{
                                background: 'radial-gradient(circle, rgba(34,197,94,0.7) 0%, rgba(22,163,74,0.3) 40%, rgba(255,255,255,0) 70%)',
                            }}
                        />
                    </div>

                    {/* Column 3: Stats Stacked Cards (3 Cols) */}
                    <div className="lg:col-span-4 flex flex-col gap-6 justify-between">
                        {/* Top Stat Card */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-8 flex-1 flex flex-col justify-between">
                            <div className="flex items-start gap-4">
                                <span className="text-6xl md:text-7xl font-light leading-none text-green-700">
                                    3
                                </span>
                                <p className="text-base text-gray-500 leading-relaxed pt-1">
                                    Charging options built for different property needs <br />
                                    <span className="font-semibold text-green-700">3.5 kW • 7.5 kW • 11 kW</span>
                                </p>
                            </div>

                            {/* Trust Badge / Avatars */}
                            <div className="flex items-center space-x-3 pt-12">
                                <div className="flex -space-x-2 overflow-hidden">
                                    <img
                                        className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                                        src="/images/testimonial-mini-person1.avif"
                                        alt="Partner avatar"
                                    />
                                    <img
                                        className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                                        src="/images/testimonial-mini-person2.avif"
                                        alt="Partner avatar"
                                    />
                                    <img
                                        className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                                        src="/images/testimonial-mini-person3.avif"
                                        alt="Partner avatar"
                                    />
                                    <div className="inline-flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-white bg-green-600 text-white">
                                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20.775 10.3844C20.7774 10.6888 20.6848 10.9864 20.5102 11.2358C20.3357 11.4852 20.0877 11.674 19.8009 11.776L13.9153 13.9163L11.776 19.8009C11.6705 20.085 11.4807 20.33 11.2319 20.503C10.9831 20.676 10.6874 20.7687 10.3844 20.7687C10.0814 20.7687 9.78557 20.676 9.53677 20.503C9.28807 20.33 9.09817 20.085 8.99277 19.8009L6.85339 13.9153L0.96784 11.776C0.68376 11.6705 0.43876 11.4807 0.26575 11.2319C0.09274 10.9831 0 10.6874 0 10.3844C0 10.0814 0.09274 9.78557 0.26575 9.53677C0.43876 9.28807 0.68376 9.09817 0.96784 8.99277L6.85339 6.85339L8.99277 0.96784C9.09817 0.68376 9.28807 0.43876 9.53677 0.26575C9.78557 0.09274 10.0814 0 10.3844 0C10.6874 0 10.9831 0.09274 11.2319 0.26575C11.4807 0.43876 11.6705 0.68376 11.776 0.96784L13.9163 6.85339L19.8009 8.99277C20.0877 9.09477 20.3357 9.28357 20.5102 9.53297C20.6848 9.78237 20.7774 10.08 20.775 10.3844Z" fill="white" />
                                        </svg>

                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <div className="flex items-center text-green-600 space-x-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-3 h-3 fill-current" />
                                        ))}
                                    </div>
                                    <span className="text-xs font-semibold text-gray-900 tracking-tight">
                                        1K+ trust us
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Counter Pill Card */}
                        <div className="bg-green-50/80 border border-green-100 rounded-2xl px-8 py-6">
                            <span className="text-sm font-semibold text-green-800">
                                25+ properties
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WhyChooseSection;