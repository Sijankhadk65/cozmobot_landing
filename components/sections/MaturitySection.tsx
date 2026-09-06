const proven = [
  "Voice orchestration, in and out, three languages",
  "Open-vocabulary vision with no per-class training",
  "Millimetre measurement from fused depth",
  "Seam detection, following and gated live welding",
  "Weave patterns and colour-guided pathing",
  "Hand-eye calibration and IK reachability checks",
];

const architected = [
  "The same orchestration on humanoids and AMRs",
  "Additional end-effectors and sensor classes",
  "Mixed-fleet task assignment",
  "First-party hardware — near-term roadmap, not today",
];

export function MaturitySection() {
  return (
    <section id="maturity" className="border-b border-hair">
      <div className="shell band">
        <div className="eyebrow">08 / proven vs. designed</div>
        <h2 className="h-section mt-5 max-w-[26ch]">
          A working platform, validated on the hardest first task.
        </h2>

        {/* Filled dot for what runs, hollow for what doesn't — the whole
            distinction the section exists to make, carried by one shape. */}
        <div className="grid-hair mt-12 grid grid-cols-[repeat(auto-fit,minmax(285px,1fr))]">
          <div className="bg-mist px-7.5 py-8.5">
            <div className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" />
              <span className="font-brand text-[11px] uppercase tracking-[0.09em] text-moss">
                Proven today
              </span>
            </div>
            <ul className="mt-5 flex flex-col gap-3 text-base leading-[1.45] text-deep">
              {proven.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-mist px-7.5 py-8.5">
            <div className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full border border-olive" />
              <span className="font-brand text-[11px] uppercase tracking-[0.09em] text-olive">
                Architected, not yet shipped
              </span>
            </div>
            <ul className="mt-5 flex flex-col gap-3 text-base leading-[1.45] text-muted">
              {architected.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-5.5 text-[14.5px] leading-[1.5] text-body text-pretty">
              The modularity is real in the codebase — swappable detector,
              tool-based capabilities, abstracted motion. The additional bodies
              are roadmap, and we say so.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
