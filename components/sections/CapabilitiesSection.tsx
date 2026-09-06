import Link from "next/link";

const capabilities = [
  {
    idx: "01",
    title: "Conversational orchestration",
    body: "An agentic tool-calling loop chooses when to look, when to move and when to act, then narrates the result in a sentence or two.",
  },
  {
    idx: "02",
    title: "Voice in and out",
    body: "Push-to-talk recognition and streamed speech. Replies start speaking after the first sentence, so long answers still feel immediate.",
  },
  {
    idx: "03",
    title: "Locked multilingual sessions",
    body: "English, Hindi or German — locked per session so background chatter in another language cannot hijack the robot. Optional barge-in.",
  },
  {
    idx: "04",
    title: "Open-vocabulary vision",
    body: "Ask for any object in plain words with no per-class training. The detection backend is a swappable interface.",
  },
  {
    idx: "05",
    title: "Real-world measurement",
    body: "Image, aligned depth and camera intrinsics fuse into length, width and distance in millimetres — the physical size of the part.",
  },
  {
    idx: "06",
    title: "Seam detection and following",
    body: "Inside an operator-drawn area, a depth-and-image profile scan finds the joint, maps both endpoints into robot coordinates and traces it.",
  },
  {
    idx: "07",
    title: "Safety by construction",
    body: "Dry-run rehearsal, deliberate arming of dangerous actions that never persists across restarts, per-axis motion locks, low default speeds.",
  },
  {
    idx: "08",
    title: "Colour-guided pathing",
    body: "Detect markers, dots and taped lines by colour, then move to or trace them — including shortest-path multi-target routes.",
  },
  {
    idx: "09",
    title: "Hand-eye calibration",
    body: "A calibrated camera-to-robot transform turns the pixel it sees into the exact 3D point to move to.",
  },
];

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="border-b border-hair">
      <div className="shell band">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="eyebrow">05 / shipping today</div>
            <h2 className="h-section mt-5 max-w-[22ch]">
              Everything below runs on a real arm right now.
            </h2>
          </div>
          <Link
            href="/platform"
            className="border-b border-[rgba(140,170,40,0.5)] pb-1 font-brand text-[11.5px] uppercase tracking-[0.07em] text-moss transition-colors hover:border-moss"
          >
            Full technical detail →
          </Link>
        </div>

        <div className="grid-hair mt-12 grid grid-cols-[repeat(auto-fit,minmax(265px,1fr))]">
          {capabilities.map((capability) => (
            <div
              key={capability.idx}
              className="min-h-[190px] bg-mist px-6.5 pb-8.5 pt-7.5 transition-colors hover:bg-hatch"
            >
              <div className="font-brand text-[10.5px] tracking-[0.09em] text-body">
                {capability.idx}
              </div>
              <div className="mt-4 text-[19px] leading-[1.25]">
                {capability.title}
              </div>
              <p className="copy-sm mt-3">{capability.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
