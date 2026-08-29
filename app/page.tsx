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
import { Metadata } from 'next';
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