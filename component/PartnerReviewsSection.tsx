import React from 'react';
import { Plus, Star, ArrowRight } from 'lucide-react';

export const PartnerReviewsSection: React.FC = () => {
    return (
        <section className="w-full bg-[#fcfcfc] text-gray-900 py-16 md:py-24 px-6 md:px-12 font-sans relative">
            {/* Top Center Plus Accent */}
            <div className="flex justify-center mb-12">
                <Plus className="w-4 h-4 text-green-500 stroke-[1.5]" />
            </div>

            <div className="max-w-7xl mx-auto space-y-16">
                {/* Header Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    {/* Section Tag */}
                    <div className="md:col-span-4 text-sm font-light text-primary-600 uppercase pt-2 tracking-wide">
                        [07] PARTNER REVIEWS
                    </div>

                    {/* Main Title */}
                    <div className="md:col-span-5">
                        <h2 className="text-4xl sm:text-5xl md:text-7xl font-normal tracking-tight leading-[1.05] text-gray-950">
                            Trusted by <br />
                            Partners
                        </h2>
                    </div>

                    {/* Subtitle */}
                    <div className="md:col-span-3 pt-2">
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-xs">
                            See how hospitality partners are adding convenient EV charging to their properties with EV Stay.
                        </p>
                    </div>
                </div>

                {/* 3-Column Reviews Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

                    {/* Column 1: Hospitality Partners Info & CTA */}
                    <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
                        <div className="bg-white border border-gray-100 rounded-2xl p-8 flex-1 flex flex-col justify-between">
                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
                                <h3 className="sm:col-span-7 text-4xl font-normal text-gray-950 tracking-tight leading-none">
                                    Hospitality <br />
                                    Partners
                                </h3>
                                <p className="sm:col-span-5 text-sm sm:text-base text-gray-500 leading-relaxed">
                                    Helping properties become EV-ready with simple, scalable charging solutions.
                                </p>
                            </div>

                            {/* Social Proof */}
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

                        {/* CTA Button */}
                        <a
                            href="#become-partner"
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-3.5 px-6 rounded-lg text-xs sm:text-sm font-medium tracking-wide flex items-center justify-center gap-2 shadow-md shadow-green-600/20 transition-colors"
                        >
                            Become a Partner
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>

                    {/* Column 2: Image Testimonial Card */}
                    <div className="lg:col-span-4 flex flex-col space-y-3">
                        <div className="relative rounded-2xl overflow-hidden min-h-[500px] flex-1 flex flex-col justify-end p-8 bg-neutral-900 shadow-sm border border-gray-100 group">
                            <img
                                src="/images/testimonial-person-2.avif" // Replace with partner portrait image
                                alt="Nilesh Sharma - Hotel / Resort Partner"
                                className="absolute inset-0 w-full h-full object-cover object-center z-0 transition-transform duration-500 group-hover:scale-105"
                            />
                            {/* Dark Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />

                            {/* Quote Content */}
                            <div className="relative z-20 space-y-4">
                                <blockquote className="text-lg md:text-xl font-light text-white leading-snug">
                                    “EV Stay gives our guests a convenient way to charge while they stay, without complicating our property operations.”
                                </blockquote>
                                <div>
                                    <h4 className="text-sm font-semibold text-white">Nilesh Sharma</h4>
                                    <p className="text-xs text-neutral-300">Hotel / Resort Partner</p>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Tag */}
                        <div className="bg-green-50 border border-green-100 rounded-xl px-6 py-3 text-sm font-medium text-green-800">
                            EV-Ready Hospitality
                        </div>
                    </div>

                    {/* Column 3: Text Testimonial Card */}
                    <div className="lg:col-span-4 flex flex-col space-y-3">
                        {/* Top Label Tag */}
                        <div className="bg-green-50 border border-green-100 rounded-xl px-6 py-3 text-sm font-semibold tracking-wider uppercase text-green-800 shadow-sm">
                            PARTNER EXPERIENCE
                        </div>

                        {/* Card Content */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-8 flex-1 flex flex-col justify-between shadow-sm space-y-12">
                            {/* Partner Info */}
                            <div className="flex items-center space-x-3">
                                <img
                                    src="/images/testimonial-mini-person3.avif"
                                    alt="Sakshi Mehta"
                                    className="w-10 h-10 rounded-lg object-cover"
                                />
                                <div>
                                    <h4 className="text-sm sm:text-base font-semibold text-gray-950">Sakshi Mehta</h4>
                                    <p className="text-xs sm:text-sm text-gray-500">Hotel Partner</p>
                                </div>
                            </div>

                            {/* Quote */}
                            <blockquote className="text-lg md:text-xl font-normal text-gray-950 leading-relaxed">
                                “The charging setup fits naturally into our property and gives EV travellers one more reason to choose us.”
                            </blockquote>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default PartnerReviewsSection;