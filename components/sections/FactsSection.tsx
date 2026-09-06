// The three things that decide whether the person on the floor can actually
// direct the robot — stated plainly, before the argument starts. Unnumbered on
// purpose: it answers the hero rather than carrying a movement of its own.
const facts = [
  {
    k: "Interface",
    v: "Plain speech, hands-free",
    note: "Push-to-talk, in the words the trade already uses. No teach pendant and no CAD program.",
  },
  {
    k: "Languages",
    v: "English · Hindi · German",
    note: "Locked per session, so chatter across the shop floor in another language cannot hijack the arm.",
  },
  {
    k: "Vision",
    v: "Open-vocabulary, untrained",
    note: "Ask for any object in plain words. Nothing needs a per-class training run first.",
  },
];

export function FactsSection() {
  return (
    <section className="border-b border-hair">
      <div className="shell band-sm">
        <div className="eyebrow">at a glance</div>
        <h2 className="h-section mt-5 max-w-[20ch] text-balance">
          What it takes to direct it.
        </h2>
        <p className="lede mt-6 max-w-[58ch]">
          Not what is under the hood — what an operator meets on day one. If any
          of these three is wrong, nothing else on this page matters.
        </p>

        <div className="grid-hair mt-11 flex flex-wrap">
          {facts.map((fact) => (
            <div
              key={fact.k}
              className="flex flex-[1_1_260px] flex-col bg-paper px-6.5 pb-7 pt-6"
            >
              <div className="label">{fact.k}</div>
              <div className="mt-3 text-[21px] leading-[1.2] tracking-[-0.015em]">
                {fact.v}
              </div>
              <p className="copy-sm mt-3.5">{fact.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
