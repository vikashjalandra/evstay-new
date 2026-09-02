import Header from "@/component/Header";
import Footer from "@/component/Footer";

export const metadata = {
  title: "Terms of Service | EV Stay",
  description: "Read EV Stay's Terms of Service governing the use of our EV charging infrastructure, website, and partner services.",
  alternates: { canonical: "https://evstay.in/terms-of-service" },
  robots: { index: true, follow: true },
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#fcfcfc] text-gray-900 flex flex-col font-sans">
      <Header />
      <main className="flex-1">
        {/* Banner */}
        <section className="w-full bg-[#0a0a0a] text-white py-16 md:py-24 px-6 md:px-12 relative overflow-hidden">
          <div className="max-w-7xl mx-auto space-y-4">
            <span className="text-xs font-mono tracking-widest text-primary-400 uppercase block font-light">
              LEGAL & AGREEMENTS
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extralight tracking-tight leading-[1.05]">
              Terms of Service
            </h1>
            <p className="text-neutral-400 text-sm md:text-base max-w-xl leading-relaxed">
              Last updated: August 2026. Please read these terms carefully before accessing or using EV Stay services.
            </p>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-16 md:py-24 px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-10 text-gray-700 leading-relaxed">
            <div className="space-y-4">
              <h2 className="text-2xl font-normal text-gray-950 tracking-tight">1. Acceptance of Terms</h2>
              <p>
                By accessing EV Stay website or using our EV charging network services, you agree to comply with and be bound by these Terms of Service.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-normal text-gray-950 tracking-tight">2. Charging Services & Usage</h2>
              <p>
                EV Stay provides EV charging stations installed at partner hospitality venues. Users must follow safe operating procedures, manufacturer guidelines, and station instructions when connecting electric vehicles.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-normal text-gray-950 tracking-tight">3. Partner Agreements</h2>
              <p>
                Hospitality property partnerships are governed by specific commercial agreements executed between EV Stay and the respective property owner or management.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-normal text-gray-950 tracking-tight">4. Contact Information</h2>
              <p>
                For legal inquiries regarding terms, please write to{' '}
                <a href="mailto:sales@evstay.in" className="text-primary-600 underline">
                  sales@evstay.in
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
