import { SiteHeader } from "@/components/site-header"
import { AppverseFooter } from "@/components/appverse-footer"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms and Conditions — Reelix",
  description: "Terms and conditions for Reelix SaaS explainer video and pitch deck services.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
}

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <section className="bg-[#0a0a0a] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-[#0f0f0f] p-6 sm:p-10 shadow-xl">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(163,230,53,0.10),transparent_55%)]" />
              <div className="relative space-y-12">
                <header className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tight text-lime-300">Terms and Conditions</h1>
                  <p className="text-neutral-400 text-lg">
                    Welcome to Reelix. By accessing our website and engaging our services, you agree to these terms and conditions. Please read
                    them carefully.
                  </p>
                </header>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">1. Introduction</h2>
                  <p className="text-neutral-300">
                    These Terms and Conditions govern your use of the Reelix website and services, including explainer video production,
                    motion graphics, and investor pitch deck design. By using our website or engaging our services, you accept these Terms in full.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">2. Intellectual Property Rights</h2>
                  <p className="text-neutral-300">
                    Unless otherwise stated in writing, Reelix retains ownership of all project source files, including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-neutral-400">
                    <li>Motion graphics project files (After Effects, Premiere Pro, etc.)</li>
                    <li>Illustration source files and design assets</li>
                    <li>Pitch deck design templates and editable files</li>
                    <li>Voiceover recordings and audio stems</li>
                    <li>Script drafts and storyboards</li>
                  </ul>
                  <p className="text-neutral-300 mt-3">
                    Upon full payment, clients receive:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-neutral-400">
                    <li>Full commercial rights to use the final video and pitch deck for their business purposes</li>
                    <li>Final rendered video files in agreed formats</li>
                    <li>Final pitch deck in PDF and editable format (PowerPoint or Google Slides)</li>
                    <li>License to use, reproduce, and distribute the final deliverables</li>
                  </ul>
                  <p className="text-neutral-300 mt-3">
                    Source files can be purchased separately for an additional fee. Clients must not:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-neutral-400">
                    <li>Resell or redistribute our work as templates or stock assets</li>
                    <li>Claim authorship of the creative work</li>
                    <li>Reverse-engineer or extract assets from final deliverables without permission</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">3. Service Delivery & Timeline</h2>
                  <p className="text-neutral-300">
                    Delivery timelines are estimates based on typical project complexity and current workload:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-neutral-400">
                    <li>Startup Plan: 5–7 business days</li>
                    <li>Pro Plan: 10–14 business days</li>
                    <li>Premium Plan: 7–10 business days (priority)</li>
                  </ul>
                  <p className="text-neutral-300 mt-3">
                    Timelines begin after final script approval and receipt of all necessary materials (brand assets, product information, etc.). 
                    Delays caused by client feedback, missing materials, or scope changes may extend delivery dates.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">4. Payment Terms</h2>
                  <p className="text-neutral-300">
                    Payment terms are as follows:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-neutral-400">
                    <li>50% deposit required to begin work</li>
                    <li>Remaining 50% due before final file delivery</li>
                    <li>Accepted payment methods: Bank transfer, PayPal, Stripe, UPI (for INR payments)</li>
                    <li>All prices are in USD unless otherwise specified</li>
                  </ul>
                  <p className="text-neutral-300 mt-3">
                    Late payments may result in project delays or suspension until payment is received.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">5. Revisions & Scope Changes</h2>
                  <p className="text-neutral-300">
                    Revisions are governed by our{" "}
                    <Link href="/revisions" className="text-lime-300 underline">
                      revision policy
                    </Link>
                    . Significant scope changes, including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-neutral-400">
                    <li>Complete script rewrites</li>
                    <li>Change in animation style or approach</li>
                    <li>Extended video length</li>
                    <li>Additional slides beyond the agreed pitch deck count</li>
                  </ul>
                  <p className="text-neutral-300 mt-3">
                    ...will require a separate quote and may incur additional costs.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">6. Client Responsibilities</h2>
                  <p className="text-neutral-300">
                    Clients are responsible for:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-neutral-400">
                    <li>Providing accurate and complete information about their SaaS product</li>
                    <li>Supplying brand assets (logos, fonts, color codes) in usable formats</li>
                    <li>Providing timely feedback within 3–5 business days of each milestone</li>
                    <li>Ensuring they have rights to any materials provided (images, music, etc.)</li>
                    <li>Final approval sign-off before project completion</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">7. Cancellation & Refunds</h2>
                  <p className="text-neutral-300">
                    Cancellation policy:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-neutral-400">
                    <li>Full refund if cancelled before work begins</li>
                    <li>50% refund if cancelled after script approval but before animation begins</li>
                    <li>No refund once animation or design work has commenced</li>
                    <li>Completed milestones (script, storyboard, etc.) remain billable</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">
                    8. Limitation of Liability & Subjectivity of Content
                  </h2>
                  <p className="text-neutral-300">
                    Reelix will not be liable for any direct, indirect, or consequential loss or damage arising under
                    these Terms or in connection with our website or services. The perceived quality, style, or
                    suitability of creative content remains subjective and cannot be used as grounds to expand the
                    scope of work beyond what was agreed. All revisions are strictly governed by our{" "}
                    <Link href="/revisions" className="text-lime-300 underline">
                      revision policy
                    </Link>
                    .
                  </p>
                  <p className="text-neutral-300 mt-3">
                    We are not responsible for the business outcomes (funding raised, conversion rates, etc.) resulting from the use of our deliverables.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">9. Portfolio & Marketing Use</h2>
                  <p className="text-neutral-300">
                    Unless otherwise agreed in writing, Reelix reserves the right to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-neutral-400">
                    <li>Display completed work in our portfolio</li>
                    <li>Use project deliverables in marketing materials and case studies</li>
                    <li>Share work on social media and promotional channels</li>
                  </ul>
                  <p className="text-neutral-300 mt-3">
                    Clients requiring confidentiality must request an NDA before project commencement.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">10. Acceptable Use</h2>
                  <p className="text-neutral-300">
                    You must not use this website in any way that causes, or may cause, damage to the website or
                    impairment of the availability or accessibility of the website. You must not use our services
                    to create content that is illegal, defamatory, or violates third-party rights.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">11. Changes to These Terms</h2>
                  <p className="text-neutral-300">
                    We may revise these Terms from time to time. The revised Terms will apply from the date of
                    publication on this site. Continued use of our services after changes constitutes acceptance of the new Terms.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">12. Governing Law</h2>
                  <p className="text-neutral-300">
                    These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Reelix operates.
                    Any disputes will be resolved through good-faith negotiation or mediation.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">13. Contact Us</h2>
                  <p className="text-neutral-300">If you have any questions about these Terms, please contact us at:</p>
                  <p className="text-neutral-300">
                    Email:{" "}
                    <a href="mailto:hello@reelix.com" className="text-lime-300 underline">
                      hello@reelix.com
                    </a>
                  </p>
                  <p className="text-neutral-300">
                    WhatsApp:{" "}
                    <a href="https://wa.me/918384092211" className="text-lime-300 underline">
                      +91 83840 92211
                    </a>
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