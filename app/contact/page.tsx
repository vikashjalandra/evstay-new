import JourneyBannerSection from '@/component/about/JourneyBannerSection'
import ContactSection from '@/component/contact/ContactSection'
import HowCanWeHelpSection from '@/component/contact/HowCanWeHelpSection'
import LetConnectSection from '@/component/contact/LetConnectSection'
import FAQSection from '@/component/FAQSection'
import Footer from '@/component/Footer'
import Header from '@/component/Header'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Contact Us | Get in Touch with EV Stay Team',
  description: 'Have questions about EV charging for your hotel or resort? Contact the EV Stay team for enquiries, partnerships, and technical guidance.',
  alternates: {
    canonical: 'https://evstay.in/contact',
  },
};

function page() {
    return (
        <>
            <Header />
            <LetConnectSection />
            <ContactSection />
            <HowCanWeHelpSection />
            <FAQSection />
            <JourneyBannerSection />
            <Footer />
        </>
    )
}

export default page