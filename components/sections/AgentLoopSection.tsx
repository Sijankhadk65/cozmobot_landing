const stages = [
  {
    n: "01",
    title: "Perceive",
    body: 'Ask for any object in plain words — "metal tube", "flange". Depth-fused imagery returns length, width and distance in millimetres.',
  },
  {
    n: "02",
    title: "Reason",
    body: "The brain picks the tools: detect, measure, find the seam, check reachability, plan the stroke. Discrete calls you can read — not an opaque policy.",
  },
  {
    n: "03",
    title: "Act, safely",
    body: "Every dangerous action is dry by default. A live arc must be deliberately armed each session and never persists across restarts.",
  },
];

// Two speakers and a tool call, each with its own colour, so the transcript
// reads at a glance without needing a legend.
const transcript: { who?: string; line: string; tool?: boolean }[] = [
  { who: "operator ▸", line: "weld the seam on this bracket" },
  { line: 'detect("bracket") — 1 match, 214 × 62 mm @ 480 mm', tool: true },
  { line: "find_seam(aoi) — joint located, 96 mm run", tool: true },
  { line: "check_reach(lead_in) — feasible", tool: true },
  { line: "weld_pass(dry, weave=triangle, 2 mm pitch)", tool: true },
  {
    who: "nex-ON ▸",
    line: "Rehearsed the pass, 96 millimetres, no arc. Arm it and I'll run it live.",
  },
  { who: "operator ▸", line: "arm the arc and go" },
  { line: "arm_arc(confirm) · weld_pass(live)", tool: true },
];

export function AgentLoopSection() {
  return (
    <section id="how" className="border-b border-hair">
      <div className="shell band">
        <div className="eyebrow">03 / the agent loop</div>
        <h2 className="h-section mt-5 max-w-[24ch]">
          Perceive. Reason. Act. Narrate.
        </h2>
        <p className="copy mt-5 max-w-[62ch]">
          An LLM runs an agentic tool-calling loop. Mid-conversation it decides
          when to look through the camera, what to measure, where to move — then
          reports back out loud in a sentence or two.
        </p>

        <div className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(360px,1fr))] items-start gap-12">
          <div className="grid-hair flex flex-col">
            {stages.map((stage) => (
              <div key={stage.n} className="bg-card p-6.5">
                <div className="flex items-baseline gap-3.5">
                  <span className="font-brand text-[11px] text-moss">
                    {stage.n}
                  </span>
                  <span className="text-xl">{stage.title}</span>
                </div>
                <p className="mt-2.5 pl-8 text-[15.5px] leading-[1.5] text-body">
                  {stage.body}
                </p>
              </div>
            ))}
          </div>

          {/* The one dark surface on the site. It earns it: this is the
              operator's actual terminal, not a decorative panel. */}
          <div className="border border-line-firm bg-night">
            <div className="flex items-center gap-2 border-b border-white/12 px-4 py-3 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#9AA383]">
              <span className="h-[7px] w-[7px] rounded-full bg-lime" />
              <span>session · lang=en · arc=dry</span>
            </div>
            <div className="px-5 py-5.5 font-mono text-[13px] leading-[1.85] text-[#DCE4CA]">
              {transcript.map((entry, i) => (
                <div key={i} className={entry.tool ? "text-[#C4E45C]" : ""}>
                  {entry.who && (
                    <span className="text-[#8A9270]">{entry.who} </span>
                  )}
                  {entry.tool ? `▸ ${entry.line}` : entry.line}
                </div>
              ))}
            </div>
            <div className="border-t border-white/12 px-4 py-3 font-mono text-[10.5px] text-[#7D8760]">
              transcript · representative of a live session
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
