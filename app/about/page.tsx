import HeroSection from '@/component/about/HeroSection'
import HospitalityMeetsChargingSection from '@/component/about/HospitalityMeetsChargingSection'
import HowToUseSection from '@/component/HowToUseSection'
import JourneyBannerSection from '@/component/about/JourneyBannerSection'
import OurPurposeSection from '@/component/about/OurPurposeSection'
import WhoWeAreSection from '@/component/about/WhoWeAreSection'
import FAQSection from '@/component/FAQSection'
import Footer from '@/component/Footer'
import Header from '@/component/Header'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'About Us | Connecting Electric Mobility with Hospitality',
  description: 'Learn how EV Stay connects electric vehicle charging with hotels, resorts, and highway properties, making EV travel convenient across India.',
  alternates: {
    canonical: 'https://evstay.in/about',
  },
};

function page() {
    return (
        <>
            <Header />
            <HeroSection />
            <WhoWeAreSection />
            <OurPurposeSection />
            <HowToUseSection />
            <HospitalityMeetsChargingSection />
            <JourneyBannerSection />
            <FAQSection />
            <Footer />
        </>
    )
}

export default page