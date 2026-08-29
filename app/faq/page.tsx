import Header from "@/component/Header";
import Footer from "@/component/Footer";
import FAQSection from "@/component/FAQSection";

export const metadata = {
  title: "FAQ - Frequently Asked Questions | EV Stay",
  description: "Find answers to common questions about EV Stay charging solutions for hotels, resorts, restaurants, and highway destinations.",
  alternates: { canonical: "https://evstay.in/faq" },
};

const jsonLdFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does EV Stay benefit hospitality properties?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EV Stay turns your property into an EV charging destination, attracting EV travellers who stay longer, spend more on dining/amenities, and choose your property over competitors.",
      },
    },
    {
      "@type": "Question",
      name: "What EV charger capacities are available?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We provide 7.5 kW AC charging stations ideal for overnight hotel stays, as well as higher-capacity solutions for short-stop destinations.",
      },
    },
    {
      "@type": "Question",
      name: "How is installation and maintenance handled?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EV Stay handles end-to-end installation, electrical infrastructure setup, network management, software, and ongoing maintenance.",
      },
    },
  ],
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }}
      />
      <Header />
      <main className="flex-1">
        {/* Banner Section */}
        <section className="w-full bg-[#0a0a0a] text-white py-16 md:py-24 px-6 md:px-12 relative overflow-hidden">
          <div className="max-w-7xl mx-auto space-y-4">
            <span className="text-xs font-mono tracking-widest text-primary-400 uppercase block font-light">
              SUPPORT & HELP CENTER
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extralight tracking-tight leading-[1.05]">
              How Can We Help You?
            </h1>
            <p className="text-neutral-400 text-sm md:text-base max-w-xl leading-relaxed">
              Explore answers to frequently asked questions about installation, guest charging, billing, partnership models, and technical specifications.
            </p>
          </div>
        </section>

        {/* FAQ Accordion Component */}
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
