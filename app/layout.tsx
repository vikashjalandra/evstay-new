import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://evstay.in"),
  title: {
    default: "EV Stay - Smart EV Charging Solutions for Hospitality",
    template: "%s | EV Stay",
  },
  description:
    "EV Stay connects electric mobility with hospitality. Scalable EV charging solutions for hotels, resorts, restaurants, lodges, and highway destinations across India.",
  keywords: [
    "EV Charging",
    "Hospitality EV Charging",
    "Hotel EV Charger",
    "Resort EV Charging Station",
    "EV Stay",
    "Electric Vehicle Charging India",
    "EV Infrastructure",
    "7.5 kW AC Charger",
    "Destination Charging",
  ],
  authors: [{ name: "EV Stay", url: "https://evstay.in" }],
  creator: "EV Stay",
  publisher: "Dass Group",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://evstay.in",
    title: "EV Stay - Smart EV Charging Solutions for Hospitality",
    description:
      "Connecting electric mobility with hospitality. Simple, convenient EV charging for hotels, resorts, and travel destinations.",
    siteName: "EV Stay",
    images: [
      {
        url: "/images/hero-bg.avif",
        width: 1200,
        height: 630,
        alt: "EV Stay Charging Station at Hospitality Property",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EV Stay - Smart EV Charging Solutions for Hospitality",
    description:
      "Connecting electric mobility with hospitality. Simple, convenient EV charging for hotels, resorts, and travel destinations.",
    images: ["/images/hero-bg.avif"],
  },
  alternates: {
    canonical: "https://evstay.in",
  },
};

import SmoothScroll from "@/component/SmoothScroll";

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "EV Stay",
  url: "https://evstay.in",
  logo: "https://evstay.in/images/evstay-logo.avif",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+917498369242",
    contactType: "customer service",
    email: "info@evstay.in",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Office 204, A Wing, City Vista, Kharadi",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    postalCode: "411014",
    addressCountry: "IN",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
    >
      <body className="flex flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
