import AboutSection from '@/component/AboutSection';
import ChargingRangeSection from '@/component/ChargingRangeSection';
import EveryStayStopSection from '@/component/EveryStayStopSection';
import FAQSection from '@/component/FAQSection';
import Footer from '@/component/Footer';
import Header from '@/component/Header';
import Hero from '@/component/Hero';
import HowToUseSection from '@/component/HowToUseSection';
import PartnerReviewsSection from '@/component/PartnerReviewsSection';
import SolutionsSection from '@/component/SolutionsSection';
import WhyChooseSection from '@/component/WhyChooseSection';
import { ArrowUpRight } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: 'EV Stay | EV Charging Infrastructure for Hotels & Resorts',
  description: 'EV Stay partners with hotels, resorts, restaurants, and highway destinations to deliver convenient, scalable EV charging infrastructure across India.',
  alternates: {
    canonical: 'https://evstay.in',
  },
};

function page() {
  return (
    <>
      <Header />
      <Hero />


      <Link href={'/map'} className='p-5 sm:p-10 lg:p-20 bg-white relative block group'>
        <img className='w-full rounded-4xl' src="/images/charging_location_map.avif" alt="charging_location_map" />
        <div className='flex opacity-0 group-hover:opacity-100 duration-500 absolute top-0 left-0 w-full h-full items-center justify-center backdrop-blur-[1px] bg-white/30'>
          <p className='text-3xl font-medium text-black capitalize'>View all chargers</p>
          <ArrowUpRight className='text-black w-12 h-12' />
        </div>
      </Link>


      <AboutSection />
      <HowToUseSection />
      <SolutionsSection />
      <WhyChooseSection />
      <ChargingRangeSection />
      <EveryStayStopSection />
      <PartnerReviewsSection />
      <FAQSection />
      <Footer />
    </>
  )
}

export default page