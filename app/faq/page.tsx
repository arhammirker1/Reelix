import { SiteHeader } from "@/components/site-header"
import { AppverseFooter } from "@/components/appverse-footer"

export default function FAQPage() {
  return (
    <>
      <SiteHeader />
      <section className="bg-[#0a0a0a] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl liquid-glass p-6 sm:p-10 shadow-xl">
              <div className="relative space-y-12">
                <header className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tight text-lime-300">Frequently Asked Questions</h1>
                  <p className="text-neutral-400 text-lg">
                    Answers to common questions we get from SaaS founders about explainer videos and investor pitch decks.
                  </p>
                </header>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">
                    1. What types of SaaS products do you create explainer videos for?
                  </h2>
                  <p className="text-neutral-300">
                    We specialize in all types of SaaS products — from B2B enterprise software to consumer apps, fintech platforms, 
                    AI tools, and productivity solutions. If your product has a complex value proposition, we can simplify it visually.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">2. How long does a typical explainer video take to produce?</h2>
                  <p className="text-neutral-300">
                    Timelines vary depending on complexity and package, but a standard 60-second explainer video usually takes 
                    10–14 working days after script approval. Our Startup plan delivers in 5–7 days for simpler projects.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">
                    3. Do you write the script, or do we need to provide one?
                  </h2>
                  <p className="text-neutral-300">
                    It depends on your package. Our Pro and Premium plans include professional scriptwriting. For the Startup plan, 
                    we can clean up and optimize your provided script, or you can upgrade to add full scriptwriting.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">4. How do you price your services?</h2>
                  <p className="text-neutral-300">
                    Pricing is based on video length, animation complexity, whether scriptwriting or voiceover is included, 
                    and turnaround time. You can view our detailed pricing on our{" "}
                    <a href="/pricing" className="text-lime-300 underline">
                      pricing page
                    </a>
                    .
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">5. Can we request revisions after delivery?</h2>
                  <p className="text-neutral-300">
                    Yes. Each package includes a specific number of revisions (1–3 rounds depending on your plan). 
                    Our Premium plan offers unlimited minor revisions to ensure your complete satisfaction.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">
                    6. Will the video match our brand's visual style?
                  </h2>
                  <p className="text-neutral-300">
                    Absolutely. We integrate your brand colors, fonts, logo, and overall design language into every frame. 
                    We can match existing brand guidelines or help develop a visual style that resonates with your target audience.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">7. What formats do you deliver the final video in?</h2>
                  <p className="text-neutral-300">
                    We typically deliver in MP4 (H.264) optimized for web and social media, plus high-resolution versions 
                    for presentations. Other formats like MOV, ProRes, or square/vertical cuts for Instagram/TikTok are available on request.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">
                    8. Do you also create investor pitch decks?
                  </h2>
                  <p className="text-neutral-300">
                    Yes! Our Premium plan includes a complete VC-ready pitch deck (15–18 slides) designed to complement your 
                    explainer video. We focus on clear messaging, compelling visuals, and investor-focused storytelling.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">
                    9. Can you animate our actual product UI or do you create mockups?
                  </h2>
                  <p className="text-neutral-300">
                    We can do both! If you have Figma designs or screenshots, we can bring them to life with smooth UI animations. 
                    For products in early stages, we can create stylized mockups that represent your vision.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">10. How do we get started?</h2>
                  <p className="text-neutral-300">
                    Simply{" "}
                    <a href="/contact" className="text-lime-300 underline">
                      contact us
                    </a>{" "}
                    with your SaaS product details, target audience, and goals. We'll schedule a discovery call, 
                    provide a tailored proposal, and outline the next steps to bring your story to life.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AppverseFooter />
    </>
  )
}