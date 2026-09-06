const capabilities = [
  "Vision & detection",
  "Measurement",
  "Motion & IK",
  "Tooling & end-effector",
];

const bodies = [
  { label: "collaborative arm · live today", live: true },
  { label: "welding cobot", live: false },
  { label: "humanoid · roadmap", live: false },
  { label: "AMR · roadmap", live: false },
  { label: "mixed fleet · roadmap", live: false },
];

export function PlatformLayersSection() {
  return (
    <section id="platform" className="border-b border-hair">
      <div className="shell band">
        <div className="eyebrow">04 / any robot, any task</div>
        <h2 className="h-section mt-5 max-w-[22ch]">
          One brain. Modular tools. Any body.
        </h2>
        <p className="copy mt-5 max-w-[62ch]">
          Perception, tooling and control are interfaces rather than fixed
          implementations. Adding a robot or a skill means registering a tool —
          not rebuilding the system.
        </p>

        {/* The stack drawn as the stack: three stacked bands, brain on top,
            body at the bottom, capabilities as the swappable middle. */}
        <div className="mt-14 border border-line">
          <div className="flex flex-wrap items-center justify-between gap-5 border-b border-line p-7.5">
            <div>
              <div className="label">Layer 01 — the brain</div>
              <div className="mt-2 text-[22px]">
                An LLM orchestrator reasons about the goal
              </div>
            </div>
            <div className="meta">agentic tool-calling loop</div>
          </div>

          <div className="border-b border-line p-7.5">
            <div className="label text-moss">Layer 02 — nex-ON capabilities</div>
            <div className="grid-hair mt-4.5 flex flex-wrap">
              {capabilities.map((capability) => (
                <div
                  key={capability}
                  className="flex-[1_1_170px] bg-card px-4 py-5 text-[15px]"
                >
                  {capability}
                </div>
              ))}
              <div className="flex-[1_1_170px] bg-card px-4 py-5 font-brand text-[12.5px] text-body">
                + register new tool
              </div>
            </div>
          </div>

          <div className="p-7.5">
            <div className="label">Layer 03 — the body</div>
            <div className="mt-4.5 flex flex-wrap gap-2.5">
              {bodies.map((body) => (
                <span
                  key={body.label}
                  className={`px-4 py-2.5 font-brand text-[12px] ${
                    body.live
                      ? "border border-lime text-moss"
                      : "border border-dashed border-[rgba(61,74,21,0.28)] text-olive"
                  }`}
                >
                  {body.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
