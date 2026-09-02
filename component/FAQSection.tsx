"use client"
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: 'What types of properties can partner with EV Stay?',
    answer:
      'EV Stay partners with hotels, resorts, restaurants, lodges, and highway stopover properties looking to provide reliable EV charging to their guests.',
  },
  {
    id: 2,
    question: 'What charging options does EV Stay offer?',
    answer:
      'We offer 3.5 kW compact setups, 7.5 kW fast chargers, and dual 7.5 kW + 7.5 kW high-capacity charging stations depending on your property needs.',
  },
  {
    id: 3,
    question: 'How does EV Stay charging work for guests?',
    answer:
      'It offers a seamless staff-assisted experience. Guests hand over their vehicle keys upon arrival, and hotel staff connect and manage the charging process.',
  },
  {
    id: 4,
    question: 'How is the charging bill generated?',
    answer:
      'Our smart displays print or send instant digital receipts detailing energy consumption and cost directly at the end of each session.',
  },
  {
    id: 5,
    question: 'What does the property need to provide?',
    answer:
      'The property only needs to provide a dedicated parking space and access to a suitable electrical power supply; EV Stay manages the rest.',
  },
];

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleAccordion = (id: number) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  return (
    <section className="w-full bg-[#fcfcfc] text-gray-900 py-16 md:py-24 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

        {/* Left Column: Heading & Help Box */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-12">
          <div className="space-y-4">
            {/* Section Tag */}
            <span className="text-base font-light text-primary-600 uppercase tracking-wide">
              [08] FAQ
            </span>
            {/* Main Title */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight leading-[1.05] text-gray-950">
              Frequent <br />
              Questions
            </h2>
          </div>

          {/* Help / Support Contact Card */}
          <div className="space-y-4 pt-4">
            {/* Avatar Image */}
            <div className="w-40 h-28 rounded-xl overflow-hidden bg-neutral-200 border border-primary-100 shadow-sm">
              <img
                src="/images/testimonial-person.avif"
                alt="Support Team Member"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Subtext */}
            <div className="space-y-1">
              <p className="text-base font-medium text-gray-900">
                Still have questions?
              </p>
              <p className="text-sm text-gray-500">
                Our EV Stay team is here to help.
              </p>
            </div>

            {/* Contact Us Pill Button */}
            <div>
              <a
                href="https://api.whatsapp.com/send?phone=917507245993&text=Hi%2C%20I%20have%20a%20question%20about%20EVSTAY"
                className="inline-block bg-primary-600 hover:bg-primary-700 text-white rounded-lg px-10 py-2.5 text-xs font-semibold tracking-tight shadow-md shadow-primary-600/20 transition-all"
              >
                Contact us
              </a>
            </div>
          </div>
        </div>


        {/* Right Column: Accordion List */}
        <div className="lg:col-span-7 space-y-3">
          {faqData.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`bg-white border rounded-2xl overflow-hidden shadow-[0_2px_8px_-2px_rgba(0,0,0,0.03)] transition-all duration-200 ${isOpen ? 'border-primary-300 ring-1 ring-primary-100' : 'border-gray-100/90'
                  }`}
              >
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full text-left p-6 md:px-8 md:py-6 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                >
                  <span className={`text-sm md:text-base font-medium leading-snug transition-colors ${isOpen ? 'text-primary-700 font-semibold' : 'text-gray-900'
                    }`}>
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 shrink-0 ${isOpen ? 'transform rotate-180 text-primary-600' : 'text-gray-500'
                      }`}
                  />
                </button>

                {/* Answer Box */}
                {isOpen && (
                  <div className="px-6 md:px-8 pb-6 pt-0 text-sm md:text-base text-gray-600 leading-relaxed border-t border-green-50">
                    <p className="pt-4">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;