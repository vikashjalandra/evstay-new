import React from 'react';
import { Star, Plus } from 'lucide-react';

export const AboutSection: React.FC = () => {
    return (
        <section id='explore' className="w-full bg-white text-gray-900 py-16 md:py-24 px-6 md:px-12 font-sans border-t border-gray-100 relative">
            <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[500px]">

                {/* Top Header Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16 md:mb-24">
                    {/* Section Tag */}
                    <div className="lg:col-span-4 text-sm font-light text-primary-600 uppercase tracking-wide">
                        [01] EV STAY
                    </div>

                    {/* Headline & Description */}
                    <div className="lg:col-span-8 space-y-6">
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.1] text-gray-950">
                            Building smarter stops for every EV journey.
                        </h2>
                        <p className="text-gray-500 text-base sm:text-lg max-w-2xl leading-relaxed">
                            EV Stay partners with hotels, resorts, restaurants, lodges and highway properties to create convenient, scalable EV charging destinations.
                        </p>
                    </div>
                </div>

                {/* Bottom Content: Social Proof & Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end relative pt-8 sm:pb-40 border-t border-gray-100">

                    {/* Centered Decorative Plus Sign on Border Line */}
                    <div className="hidden md:block absolute -top-2.5 left-1/2 -translate-x-1/2 bg-white px-1">
                        <Plus className="w-4 h-4 text-primary-500 stroke-[1.5]" />
                    </div>

                    {/* Social Proof Widget */}
                    <div className="md:col-span-4 flex items-center space-x-4 mb-6 md:mb-0">
                        {/* Avatar Stack */}
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
                            <div className="inline-flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-white bg-primary-600 text-white">
                                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.775 10.3844C20.7774 10.6888 20.6848 10.9864 20.5102 11.2358C20.3357 11.4852 20.0877 11.674 19.8009 11.776L13.9153 13.9163L11.776 19.8009C11.6705 20.085 11.4807 20.33 11.2319 20.503C10.9831 20.676 10.6874 20.7687 10.3844 20.7687C10.0814 20.7687 9.78557 20.676 9.53677 20.503C9.28807 20.33 9.09817 20.085 8.99277 19.8009L6.85339 13.9153L0.96784 11.776C0.68376 11.6705 0.43876 11.4807 0.26575 11.2319C0.09274 10.9831 0 10.6874 0 10.3844C0 10.0814 0.09274 9.78557 0.26575 9.53677C0.43876 9.28807 0.68376 9.09817 0.96784 8.99277L6.85339 6.85339L8.99277 0.96784C9.09817 0.68376 9.28807 0.43876 9.53677 0.26575C9.78557 0.09274 10.0814 0 10.3844 0C10.6874 0 10.9831 0.09274 11.2319 0.26575C11.4807 0.43876 11.6705 0.68376 11.776 0.96784L13.9163 6.85339L19.8009 8.99277C20.0877 9.09477 20.3357 9.28357 20.5102 9.53297C20.6848 9.78237 20.7774 10.08 20.775 10.3844Z" fill="white" />
                                </svg>

                            </div>
                        </div>

                        {/* Ratings & Label */}
                        <div className="flex flex-col space-y-1">
                            <div className="flex items-center space-x-0.5 text-primary-600">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                                ))}
                            </div>
                            <span className="text-xs font-semibold text-gray-800 tracking-tight">
                                1K+ trust us
                            </span>
                        </div>
                    </div>

                    {/* Stat 1: Charging Models */}
                    <div className="md:col-span-3 relative pl-4 md:pl-6 border-l border-primary-200">
                        <div className="absolute -top-2 -left-2 bg-white">
                            <Plus className="w-4 h-4 text-primary-500 stroke-[1.5]" />
                        </div>
                        <div className="text-5xl md:text-6xl font-medium tracking-tight text-primary-700 mb-3">
                            03
                        </div>
                        <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-1">
                            Charging Models
                        </h3>
                        <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                            Flexible charging setups designed for different property needs and growing EV demand.
                        </p>
                    </div>

                    {/* Stat 2: Charging Options */}
                    <div className="md:col-span-3 relative sm:-mb-20 pl-4 md:pl-6 border-l border-primary-200">
                        <div className="absolute -top-2 -left-2 bg-white">
                            <Plus className="w-4 h-4 text-primary-500 stroke-[1.5]" />
                        </div>
                        <div className="text-5xl md:text-6xl font-medium tracking-tight text-primary-700 mb-3">
                            03
                        </div>
                        <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-1">
                            Charging Options
                        </h3>
                        <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                            Compact charging solutions ranging from convenient 3.5 kW setups to higher-capacity 7.5 kW chargers.
                        </p>
                    </div>

                    {/* Stat 3: Initial Partnership */}
                    <div className="md:col-span-2 relative sm:-mb-40 pl-4 md:pl-6 border-l border-green-200">
                        <div className="absolute -top-2 -left-2 bg-white">
                            <Plus className="w-4 h-4 text-green-500 stroke-[1.5]" />
                        </div>
                        <div className="text-5xl md:text-6xl font-medium tracking-tight text-green-700 mb-3 whitespace-nowrap">
                            1 year
                        </div>
                        <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-1">
                            Initial Partnership
                        </h3>
                        <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                            A simple deposit-based partnership model designed to help properties become EV-ready.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutSection;