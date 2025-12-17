// app/about/page.tsx
import React from "react";

export default function AboutPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Reelix International",
    url: "https://reelix.com",
    logo: "https://theskitbit.com/logo.png",
    description:
      "Reelix is a Video Production agency serving clients in Miami, Los Angeles, New York, Canada, and the UK.",
    sameAs: [
      "https://www.instagram.com/reelix",
      "https://www.linkedin.com/company/reelix",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Karachi",
      addressRegion: "Sindh",
      addressCountry: "Pakistan",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+92-328-2784739",
        contactType: "customer service",
      },
    ],
    areaServed: [
      { "@type": "Place", name: "Miami" },
      { "@type": "Place", name: "Los Angeles" },
      { "@type": "Place", name: "New York" },
      { "@type": "Place", name: "Canada" },
      { "@type": "Place", name: "United Kingdom" },
      { "@type": "Place", name: "Pakistan" },
    ],
  };

  return (
    <>
      {/* SEO Schema for Google + LLMs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData),
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-black text-white py-20 px-6 md:px-12 lg:px-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          About Reelix
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-80">
          Pioneering the future of Video Explainers for global brands.
        </p>
      </section>

      {/* Feature Grid */}
      <section className="py-16 bg-neutral-900 text-white px-6 md:px-12 lg:px-20">
        <div className="grid gap-12 md:grid-cols-3">
          {[
            {
              title: "High-Impact SaaS Explainer Videos",
              desc: "Crystal-clear explanations that turn complex SaaS products into simple, compelling stories.",
            },
            {
              title: "Investor-Ready Pitch Decks",
              desc: "Professionally crafted pitch decks designed to impress investors and communicate your vision.",
            },
            {
              title: "Conversion-Focused Strategy",
              desc: "Every video and deck is created with one goal—boost sign-ups, engagement, and investor confidence.",
            },
            {
              title: "Fast & Collaborative Workflow",
              desc: "Work closely with our creative team for smooth communication and quick turnaround times.",
            },
            {
              title: "Data-Driven Storytelling",
              desc: "We structure your narrative using proven frameworks that resonate with SaaS buyers and VCs.",
            },
            {
              title: "Global SaaS Expertise",
              desc: "Helping startups and enterprises across the US, UK, Canada, and MENA bring their ideas to life.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-neutral-800 p-6 rounded-2xl shadow-lg hover:scale-105 transform transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="opacity-80">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-center text-white px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Elevate Your Brand?
        </h2>
        <p className="text-lg opacity-80 mb-8">
          Let Reelix bring your Idea to life.
        </p>
        <a
          href="/contact"
          className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-neutral-200 transition-all"
        >
          Get in Touch
        </a>
      </section>
    </>
  );
}
