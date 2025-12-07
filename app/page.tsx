import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { LogoMarquee } from "@/components/logo-marquee"
import { Pricing } from "@/components/pricing"
import { AppverseFooter } from "@/components/appverse-footer"
import Script from "next/script"

// ✅ Force static generation for low TTFB
export const dynamic = "force-static"

export default function Page() {
  // Structured data for pricing
  const pricingStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPageElement",
    "@id": "https://reelix.studio/#pricing",
    name: "Pricing Plans",
    description: "SaaS Explainer Video & Pitch Deck pricing - Startup, Pro, and Premium packages for founders",
    url: "https://reelix.studio/#pricing",
    mainEntity: {
      "@type": "PriceSpecification",
      name: "SaaS Explainer Video & Pitch Deck Services",
      description: "Professional motion graphics and pitch deck design with three pricing tiers",
      offers: [
        {
          "@type": "Offer",
          name: "Startup Plan",
          price: "299",
          priceCurrency: "USD",
          description: "Up to 45s SaaS Explainer Video with 1 revision, basic motion graphics",
        },
        {
          "@type": "Offer",
          name: "Pro Plan",
          price: "699",
          priceCurrency: "USD",
          description: "Up to 60-75s SaaS Explainer Video with scriptwriting, voiceover, and 2-3 revisions",
        },
        {
          "@type": "Offer",
          name: "Premium Plan",
          price: "2049",
          priceCurrency: "USD",
          description: "Complete Startup Package: 90s video + VC-ready pitch deck with unlimited minor revisions",
        },
      ],
    },
  }

  // Structured data for main page
  const pageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://reelix.studio/",
    name: "Reelix | High-Converting SaaS Explainer Videos & Investor Pitch Decks",
    description:
      "From product launches to investor pitches, Reelix delivers explainer videos and pitch decks that help SaaS startups simplify their message and raise funding.",
    url: "https://reelix.studio/",
    mainEntity: {
      "@type": "Organization",
      name: "Reelix", 
      alternateName: "Reelix Studio",
      description: "Motion graphics agency specializing in SaaS explainer videos and investor pitch decks",
      url: "https://reelix.studio/",
      logo: "https://reelix.com/icons/skitbit-white.svg",
      sameAs: [
        "https://twitter.com/reelixstudio",
        "https://www.youtube.com/@reelixstudio",
        "https://instagram.com/reelix_studios",
        "https://linkedin.com/company/reelix",
      ],
    },
    hasPart: [
      {
        "@type": "WebPageElement",
        "@id": "https://reelix.studio/#pricing",
        name: "Pricing Section",
        url: "https://reelix.studio/#pricing",
      },
    ],
  }

  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />
        <Hero />
        <Features />
        <LogoMarquee />
        <Pricing />
        <AppverseFooter />
      </main>

      {/* JSON-LD structured data */}
      <Script
        id="pricing-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pricingStructuredData),
        }}
      />

      <Script
        id="page-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageStructuredData),
        }}
      />
    </>
  )
}
