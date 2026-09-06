const faqs = [
  {
    q: "Do you sell robots?",
    a: "Not today. nex-ON is software — the layer between an AI brain and a robot body. We run on collaborative arms that already exist, from vendors our customers already buy. First-party hardware is on the near-term roadmap, not in front of you today.",
  },
  {
    q: "Which robots does it support right now?",
    a: "It is live on a Fairino collaborative arm via a vendored SDK, with linear and joint motion, IK reachability checks and torch-down orientation solving. Motion is abstracted behind an interface, which is what makes the next body an integration rather than a rebuild.",
  },
  {
    q: "Is this a learned end-to-end policy?",
    a: "No. The brain reasons, then calls discrete, inspectable tools with safety gates and dry runs between them. That is deliberately more interpretable and controllable than an opaque neural controller.",
  },
  {
    q: "How is welding made safe?",
    a: "Welding defaults to a dry pass: the motion is identical but nothing is energised. A live arc must be deliberately armed each session and never carries over a restart. Speeds default low, and any move can be reachability-checked before the arm moves.",
  },
  {
    q: "What does a pilot look like?",
    a: "We deploy on a robot you already have, calibrate camera to robot, and run your task conversationally — starting dry. You judge it on time-to-deploy against your current teach-pendant or CAD/CAM route.",
  },
  {
    q: "What infrastructure do we need?",
    a: "Python, a standard USB depth camera, a mic and speakers, and a computer to run it on. No training pipeline, no cloud dependency for motion.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="border-b border-hair">
      <div className="shell band grid grid-cols-[repeat(auto-fit,minmax(330px,1fr))] items-start gap-14">
        <div>
          <div className="eyebrow">09 / questions</div>
          <h2 className="mt-5 text-[clamp(28px,3vw,42px)] font-medium leading-[1.05] tracking-[-0.03em]">
            The ones we get asked most.
          </h2>
        </div>

        {/* Native <details>, so an unanswered question is still readable with
            JavaScript off and Ctrl+F finds the answers. */}
        <div className="border-t border-line">
          {faqs.map((faq) => (
            <details key={faq.q} className="group border-b border-line">
              <summary className="flex justify-between gap-6 py-5.5 text-[18px] text-ink">
                <span>{faq.q}</span>
                <span
                  aria-hidden
                  className="shrink-0 font-brand text-[14px] text-moss"
                >
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">−</span>
                </span>
              </summary>
              <p className="mb-6 pr-15 text-base leading-[1.55] text-body text-pretty">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
