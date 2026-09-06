import type { Metadata } from "next";
import { Hatch, PilotCTA } from "@/components/site/ui";
import { SiteFooter } from "@/components/site/SiteFooter";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "The technical brief for nex-ON: the three-layer architecture between an AI brain and a robot body, the registry of capabilities the brain can call, the safety model, and the stack it is built from.",
  openGraph: {
    title: "Platform — nex-ON by CozmoBot",
    description:
      "Three layers, one contract between them. The tool registry, the safety model and the stack behind the embodied OS.",
    type: "website",
    siteName: "CozmoBot",
  },
};

const layers = [
  {
    tag: "Layer 01 — brain",
    title: "Reasoning",
    body: "A large language model reasons about the goal and orchestrates the work, deciding mid-conversation which capability to call next.",
    detail: [
      "Claude Opus via LangChain",
      "agentic multi-tool loop",
      "spoken summary per action",
    ],
  },
  {
    tag: "Layer 02 — capabilities",
    title: "Modular tools",
    body: "Vision, measurement, motion, tooling and sensor feeds are swappable tools registered against an interface, not hard wiring.",
    detail: [
      "swappable detector backend",
      "tool-based capabilities",
      "abstracted motion",
    ],
  },
  {
    tag: "Layer 03 — body",
    title: "Any robot",
    body: "Today a collaborative arm. The same orchestration is architected for welding cobots, humanoids, AMRs and mixed fleets.",
    detail: [
      "live: collaborative arm",
      "roadmap: humanoid · AMR",
      "new body = integration",
    ],
  },
];

const tools = [
  {
    cls: "vision",
    name: "Open-vocabulary detection — ask for any object in plain words, no per-class training",
    status: "Live",
  },
  {
    cls: "vision",
    name: "Depth-fused dimensioning — length, width and distance in millimetres",
    status: "Live",
  },
  {
    cls: "vision",
    name: "Seam profiling — depth-and-image scan inside an operator-drawn area of interest",
    status: "Live",
  },
  {
    cls: "motion",
    name: "Linear and joint motion with separate working and positioning speeds",
    status: "Live",
  },
  {
    cls: "motion",
    name: "Dry-run reachability check — feasibility reported before the arm moves",
    status: "Live",
  },
  {
    cls: "motion",
    name: "Per-axis motion locks — e.g. hold height constant",
    status: "Live",
  },
  {
    cls: "tooling",
    name: "Arc welding pass with weave: triangle, sine, circular, vertical",
    status: "Live · gated",
  },
  {
    cls: "tooling",
    name: "Colour-guided pathing — markers, dots and taped lines, shortest-path routes",
    status: "Live",
  },
  {
    cls: "calib",
    name: "Umeyama-fit hand-eye transform, camera to robot base",
    status: "Live",
  },
  {
    cls: "voice",
    name: "Locked-language speech in and out, optional barge-in",
    status: "Live",
  },
  {
    cls: "—",
    name: "Additional end-effectors, sensor classes and robot bodies",
    status: "Architected",
  },
];

const safety = [
  "Welding defaults to a dry pass — motion identical, nothing energised.",
  "A live arc must be deliberately armed each session and never persists across a restart.",
  "Reachability is checked as a dry run before any move executes.",
  "Working and positioning speeds are separate, so a fast work speed cannot leak into a jog.",
  "Speeds default low; per-axis locks constrain what the robot is allowed to change.",
];

const stack = [
  {
    k: "Orchestration",
    v: "Claude Opus via LangChain, agentic multi-tool loop",
  },
  {
    k: "Voice",
    v: "ElevenLabs Scribe speech-to-text and Flash TTS, streamed and sentence-buffered",
  },
  {
    k: "Vision",
    v: "Orbbec Gemini 336L RGB-D; Grounding DINO open-vocabulary detection, swappable",
  },
  { k: "Geometry", v: "Depth + PCA dimensioning, RGB+depth seam profiling" },
  {
    k: "Robotics",
    v: "Fairino collaborative arm via vendored SDK; IK reachability, torch-down orientation solving",
  },
  {
    k: "Calibration",
    v: "Umeyama-fit hand-eye camera-to-robot-base transform",
  },
  { k: "Runtime", v: "Python, standard USB depth camera and audio" },
];

// The engineer's page. The home page argues; this one is checkable — a layer
// diagram, the registry row by row with a live/architected column that doesn't
// blur, and the stack named part by part for due diligence.
export default function PlatformPage() {
  return (
    <main>
      <section className="border-b border-hair">
        <div className="shell pb-18 pt-[clamp(56px,8vw,88px)]">
          <div className="eyebrow">Technical brief</div>
          <h1 className="h-page mt-6 max-w-[20ch]">
            The layer between a brain and a body.
          </h1>
          <p className="lede mt-6 max-w-[60ch]">
            nex-ON turns “understand the goal” into perceive, choose a tool, and
            act. Because perception, tooling and control are interfaces rather
            than fixed implementations, a new robot or a new skill is a
            registration — not a rebuild.
          </p>
        </div>
      </section>

      <section className="border-b border-hair">
        <div className="shell band-sm">
          <div className="eyebrow">01 / architecture</div>
          <h2 className="h-sub mb-11 mt-4.5">
            Three layers, one contract between them.
          </h2>
          <div className="grid-hair grid grid-cols-[repeat(auto-fit,minmax(265px,1fr))]">
            {layers.map((layer) => (
              <div key={layer.tag} className="bg-mist px-7 pb-9 pt-8">
                <div className="tag text-moss">{layer.tag}</div>
                <div className="mt-3.5 text-[22px] leading-[1.2]">
                  {layer.title}
                </div>
                <p className="mt-3.5 text-[15.5px] leading-[1.5] text-muted text-pretty">
                  {layer.body}
                </p>
                <div className="mt-5.5 flex flex-col gap-1 border-t border-line pt-4.5 font-brand text-[11.5px] leading-[1.6] text-body">
                  {layer.detail.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-hair bg-mist">
        <div className="shell band-sm">
          <div className="eyebrow">02 / tool registry</div>
          <h2 className="h-sub mt-4.5 max-w-[24ch]">
            The capabilities the brain can call.
          </h2>

          <div className="mt-11 border border-line">
            <div className="label grid grid-cols-[110px_minmax(0,1fr)_130px] gap-6 border-b border-line px-6 py-3.5 tracking-[0.09em] text-sage">
              <div>Class</div>
              <div>Capability</div>
              <div>Status</div>
            </div>
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="grid grid-cols-[110px_minmax(0,1fr)_130px] items-baseline gap-6 border-b border-line-soft px-6 py-5 transition-colors last:border-b-0 hover:bg-hatch"
              >
                <div className="font-brand text-[12px] text-moss">
                  {tool.cls}
                </div>
                <div className="text-[16.5px] leading-[1.45] text-deep">
                  {tool.name}
                </div>
                <div className="font-brand text-[11.5px] text-body">
                  {tool.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-hair">
        <div className="shell band-sm grid grid-cols-[repeat(auto-fit,minmax(360px,1fr))] items-start gap-14">
          <div>
            <div className="eyebrow">03 / safety model</div>
            <h2 className="h-sub mt-4.5">
              Dangerous by exception, never by default.
            </h2>
            <p className="mt-5 text-[17.5px] leading-[1.55] text-body text-pretty">
              The safety model is a property of the platform, not of the welding
              demo — it transfers to any actuated hardware we put underneath it.
            </p>
            <div className="mt-8 flex flex-col gap-3.5">
              {safety.map((rule) => (
                <div
                  key={rule}
                  className="flex items-baseline gap-3.5 border-b border-hair pb-3.5"
                >
                  <span className="h-1.5 w-1.5 -translate-y-0.5 flex-none rounded-full bg-lime" />
                  <span className="text-[16.5px] leading-[1.45] text-deep">
                    {rule}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="eyebrow">04 / stack</div>
            <h2 className="h-sub mt-4.5">What it is built from.</h2>
            <div className="mt-8 border border-line">
              {stack.map((row) => (
                <div
                  key={row.k}
                  className="grid grid-cols-[115px_minmax(0,1fr)] gap-4.5 border-b border-line-soft px-5.5 py-4.5 last:border-b-0"
                >
                  <div className="font-brand text-[10.5px] uppercase tracking-[0.08em] text-body">
                    {row.k}
                  </div>
                  <div className="text-[15.5px] leading-[1.5] text-deep">
                    {row.v}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 border border-line bg-mist p-5.5">
              <div className="font-brand text-[10.5px] uppercase tracking-[0.08em] text-body">
                Footprint
              </div>
              <div className="mt-2.5 text-[17px] leading-[1.45]">
                A standard USB depth camera, a mic and speakers. No training
                pipeline.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-hair">
        <div className="shell band-sm">
          <div className="eyebrow">05 / operator runtime</div>
          <div className="mt-4.5 grid grid-cols-[repeat(auto-fit,minmax(360px,1fr))] items-center gap-12">
            <div>
              <h2 className="h-sub">
                A clean conversation, with the diagnostics behind it.
              </h2>
              <p className="mt-5 text-[17.5px] leading-[1.55] text-body text-pretty">
                The operator sees only the exchange. Everything else — tool
                arguments, depth profiles, IK results, arc state — lands in
                timestamped logs for the engineer.
              </p>
            </div>
            <Hatch
              ratio="16 / 10"
              label="[ terminal / log screenshot ]"
              note="operator view beside the timestamped diagnostic log"
            />
          </div>
        </div>
      </section>

      <PilotCTA
        heading="Put it on a robot you already own."
        secondary={{ label: "See Weld OS", href: "/omnicron" }}
      />
      <SiteFooter />
    </main>
  );
}
