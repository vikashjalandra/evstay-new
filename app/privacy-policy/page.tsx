import Header from "@/component/Header";
import Footer from "@/component/Footer";

export const metadata = {
  title: "Privacy Policy | EV Stay",
  description: "Read EV Stay's Privacy Policy to understand how we collect, use, and protect your personal information.",
  alternates: { canonical: "https://evstay.in/privacy-policy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#fcfcfc] text-gray-900 flex flex-col font-sans">
      <Header />
      <main className="flex-1">
        {/* Banner */}
        <section className="w-full bg-[#0a0a0a] text-white py-16 md:py-24 px-6 md:px-12 relative overflow-hidden">
          <div className="max-w-7xl mx-auto space-y-4">
            <span className="text-xs font-mono tracking-widest text-primary-400 uppercase block font-light">
              LEGAL & TRANSPARENCY
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extralight tracking-tight leading-[1.05]">
              Privacy Policy
            </h1>
            <p className="text-neutral-400 text-sm md:text-base max-w-xl leading-relaxed">
              Last updated: August 2026. Your privacy and data protection are fundamental to our services.
            </p>
          </div>
        </section>

        {/* Policy Content */}
        <section className="py-16 md:py-24 px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-10 text-gray-700 leading-relaxed">
            <div className="space-y-4">
              <h2 className="text-2xl font-normal text-gray-950 tracking-tight">1. Information We Collect</h2>
              <p>
                EV Stay collects information to provide better services to our property partners and EV drivers. We collect details provided during enquiry submissions (such as name, email, phone number, property details) and technical metadata when using our chargers and website.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-normal text-gray-950 tracking-tight">2. How We Use Information</h2>
              <p>
                We use collected information to fulfill partner enquiries, manage EV charging infrastructure operations, improve guest experiences, process payments, and communicate operational updates.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-normal text-gray-950 tracking-tight">3. Data Sharing & Security</h2>
              <p>
                We do not sell personal data. We maintain strict security measures to protect your information from unauthorized access, alteration, or disclosure.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-normal text-gray-950 tracking-tight">4. Contact Us</h2>
              <p>
                If you have any questions regarding this Privacy Policy, please contact us at{' '}
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
