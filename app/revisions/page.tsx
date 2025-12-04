import { SiteHeader } from "@/components/site-header";
import { AppverseFooter } from "@/components/appverse-footer";

export default function RevisionPolicyPage() {
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
                  <h1 className="text-4xl font-bold tracking-tight text-lime-300">Revision Policy</h1>
                  <p className="text-neutral-400 text-lg">
                    Our revision policy ensures transparency and fairness for all clients while maintaining the quality and efficiency of our explainer videos and pitch decks.
                  </p>
                </header>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">1. Included Revisions</h2>
                  <p className="text-neutral-300">
                    Each plan includes a set number of revision rounds as listed in its respective tier:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-neutral-400">
                    <li>Startup Plan: 1 revision round included</li>
                    <li>Pro Plan: 2–3 revision rounds included</li>
                    <li>Premium Plan: Unlimited minor revisions within the agreed project scope</li>
                  </ul>
                  <p className="text-neutral-300 mt-3">
                    A revision round includes all feedback provided at one time. We encourage consolidating all changes into a single review to maximize efficiency.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">2. What Counts as a Revision?</h2>
                  <p className="text-neutral-300">
                    Revisions cover adjustments to the agreed deliverables, including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-neutral-400">
                    <li>Text or voiceover changes</li>
                    <li>Color palette or branding adjustments</li>
                    <li>Timing or pacing modifications</li>
                    <li>Animation refinements within the original style</li>
                    <li>Minor script edits (for plans with scriptwriting)</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">3. What Is NOT Covered by Revisions?</h2>
                  <p className="text-neutral-300">
                    The following are considered scope changes and require a separate quote:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-neutral-400">
                    <li>Complete script rewrites or new messaging direction</li>
                    <li>Change in animation style (e.g., 2D to 3D)</li>
                    <li>Extending video length beyond the agreed duration</li>
                    <li>Adding new scenes or characters not in the original concept</li>
                    <li>Additional voiceover recording sessions</li>
                    <li>New pitch deck slides beyond the agreed count</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">4. Additional Revisions</h2>
                  <p className="text-neutral-300">
                    If you exceed your included revision rounds, additional revisions are available at the following rates:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-neutral-400">
                    <li>Startup Plan: $50 per additional revision round</li>
                    <li>Pro Plan: $75 per additional revision round</li>
                    <li>Premium Plan: Minor revisions remain unlimited; major scope changes are quoted separately</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">5. Turnaround Time for Revisions</h2>
                  <p className="text-neutral-300">
                    Revision turnaround depends on the complexity of changes and our current workload:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-neutral-400">
                    <li>Minor revisions (text, color tweaks): 2–3 business days</li>
                    <li>Moderate revisions (timing, animation adjustments): 3–5 business days</li>
                    <li>Major revisions (significant rework): 5–7 business days</li>
                  </ul>
                  <p className="text-neutral-300 mt-3">
                    Rush revisions are available for an additional fee. Please contact us for expedited timelines.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">6. Feedback Process</h2>
                  <p className="text-neutral-300">
                    To ensure smooth revisions:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-neutral-400">
                    <li>Provide feedback in a single consolidated document or email</li>
                    <li>Use timestamps for video feedback (e.g., "At 0:15, change text to...")</li>
                    <li>Be as specific as possible to avoid back-and-forth</li>
                    <li>Include visual references or examples when helpful</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">7. Final Deliverables</h2>
                  <p className="text-neutral-300">
                    Once you approve the final version, the project is considered complete. Any changes requested after final approval will be treated as a new project and quoted separately.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">8. Contact Us</h2>
                  <p className="text-neutral-300">
                    For questions regarding our revision policy or to request additional revisions, please contact us at:
                  </p>
                  <p className="text-neutral-300">
                    Email: <a href="mailto:hello@reelix.com" className="text-lime-300 underline">hello@reelix.com</a>
                  </p>
                  <p className="text-neutral-300">
                    WhatsApp: <a href="https://wa.me/918384092211" className="text-lime-300 underline">+91 83840 92211</a>
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AppverseFooter />
    </>
  );
}