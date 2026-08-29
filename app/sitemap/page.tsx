import Header from "@/component/Header";
import Footer from "@/component/Footer";
import { ArrowUpRight, Compass, Shield, HelpCircle, PhoneCall, Building2 } from "lucide-react";

export const metadata = {
  title: "Sitemap - Navigation & Directory | EV Stay",
  description: "Browse the complete page hierarchy and directory of EV Stay website.",
};

const sitemapSections = [
  {
    title: "Main Navigation",
    icon: Compass,
    links: [
      { name: "Home", href: "/", description: "EV Stay homepage & infrastructure overview" },
      { name: "About Us", href: "/about", description: "Our purpose, story, and mission" },
      { name: "Partner With Us", href: "/partnerWithUs", description: "Bring EV charging to your property" },
      { name: "Contact Us", href: "/contact", description: "Get in touch with our team" },
    ],
  },
  {
    title: "Partnership & Solutions",
    icon: Building2,
    links: [
      { name: "Why Partner With Us", href: "/partnerWithUs#why-partner", description: "Hospitality charging advantages" },
      { name: "Charging Solutions", href: "/partnerWithUs#solutions", description: "7.5 kW & custom hardware options" },
      { name: "Partnership Journey", href: "/partnerWithUs#journey", description: "Step-by-step setup process" },
    ],
  },
  {
    title: "Support & Legal",
    icon: Shield,
    links: [
      { name: "FAQ", href: "/faq", description: "Frequently asked questions & help center" },
      { name: "Privacy Policy", href: "/privacy-policy", description: "Our data privacy & security policy" },
      { name: "Terms of Service", href: "/terms-of-service", description: "Terms and conditions of service" },
      { name: "Sitemap", href: "/sitemap", description: "Complete website page directory" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-[#fcfcfc] text-gray-900 flex flex-col font-sans">
      <Header />
      <main className="flex-1">
        {/* Banner */}
        <section className="w-full bg-[#0a0a0a] text-white py-16 md:py-24 px-6 md:px-12 relative overflow-hidden">
          <div className="max-w-7xl mx-auto space-y-4">
            <span className="text-xs font-mono tracking-widest text-primary-400 uppercase block font-light">
              NAVIGATION DIRECTORY
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extralight tracking-tight leading-[1.05]">
              Website Sitemap
            </h1>
            <p className="text-neutral-400 text-sm md:text-base max-w-xl leading-relaxed">
              Find every page, solution guide, legal documentation, and support section available on EV Stay.
            </p>
          </div>
        </section>

        {/* Directory Grid */}
        <section className="py-16 md:py-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {sitemapSections.map((section) => {
              const Icon = section.icon;
              return (
                <div
                  key={section.title}
                  className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_2px_16px_-4px_rgba(0,0,0,0.03)] space-y-6 flex flex-col justify-between"
                >
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3 text-primary-600">
                      <Icon className="w-6 h-6 shrink-0" />
                      <h2 className="text-xl font-medium text-gray-950 tracking-tight">
                        {section.title}
                      </h2>
                    </div>

                    <ul className="space-y-4 divide-y divide-gray-100">
                      {section.links.map((link) => (
                        <li key={link.name} className="pt-4 first:pt-0">
                          <a
                            href={link.href}
                            className="group flex items-start justify-between gap-2 hover:text-primary-600 transition-colors"
                          >
                            <div className="space-y-1">
                              <span className="text-sm font-medium text-gray-900 group-hover:text-primary-600 transition-colors block">
                                {link.name}
                              </span>
                              <p className="text-xs text-gray-500 leading-relaxed">
                                {link.description}
                              </p>
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-0.5" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
