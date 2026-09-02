import ContactSection from '@/component/contact/ContactSection'
import FAQSection from '@/component/FAQSection'
import Footer from '@/component/Footer'
import Header from '@/component/Header'
import BuiltForPartnersSection from '@/component/partnerWithUs/BuiltForPartnersSection'
import ChargingSolutionSection from '@/component/partnerWithUs/ChargingSolutionSection'
import PartnershipJourneySection from '@/component/partnerWithUs/PartnershipJourneySection'
import PowerYourPropertySection from '@/component/partnerWithUs/PowerYourPropertySection'
import WhyPartnerWithUsSection from '@/component/partnerWithUs/WhyPartnerWithUsSection'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Partner With Us | EV Charging for Hotels, Resorts & Commercial Properties',
  description: 'Turn your hotel, resort, or restaurant into an EV destination. Partner with EV Stay for end-to-end EV charging installation and management.',
  alternates: {
    canonical: 'https://evstay.in/partnerWithUs',
  },
};

function page() {
  return (
    <>
      <Header />
      <PowerYourPropertySection />
      <ContactSection />
      <WhyPartnerWithUsSection />
      <BuiltForPartnersSection />
      <PartnershipJourneySection />
      <ChargingSolutionSection />
      <FAQSection />
      <Footer />
    </>
  )
}

export default page