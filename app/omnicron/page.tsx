import type { Metadata } from "next";
import Image from "next/image";
import { PilotCTA, StatBar } from "@/components/site/ui";
import { SiteFooter } from "@/components/site/SiteFooter";
import heroPass from "@/assets/omnicron_welding_images/9.jpeg";
import cellShot from "@/assets/omnicron_welding_images/17.jpeg";
import seamShot from "@/assets/omnicron_welding_images/4.jpeg";
import beadShot from "@/assets/omnicron_welding_images/1.jpeg";

export const metadata: Metadata = {
  title: "Weld OS",
  description:
    "Omnicron is Weld OS — nex-ON's welding edition on a collaborative arm. It finds the bare-metal seam, measures the part, rehearses the pass dry, and welds it when you arm the arc. Directed by voice, with no teach pendant and no CAD program.",
  openGraph: {
    title: "Weld OS — the first nex-ON industry edition",
    description:
      "Just tell it to weld. Seam finding, millimetre measurement, four weave patterns, and an arc that stays dry until you arm it.",
    type: "website",
    siteName: "CozmoBot",
  },
};

const facts = [
  { k: "Programming", v: "None. You talk to it." },
  { k: "Best fit", v: "High-mix, low-volume" },
  { k: "Arc state", v: "Dry until armed" },
  { k: "Operator", v: "Non-specialist" },
];

const steps = [
  {
    n: "01",
    title: "Ask in plain words",
    body: '"Weld the seam on this bracket." Push-to-talk, session locked to English, Hindi or German so floor chatter cannot hijack it.',
  },
  {
    n: "02",
    title: "See and measure",
    body: "Open-vocabulary detection finds the part with no per-class training, then fused depth returns its length, width and distance in millimetres.",
  },
  {
    n: "03",
    title: "Find the seam",
    body: "Inside the operator-drawn area of interest, a depth-and-image profile scan locates the bare-metal joint and both of its endpoints.",
  },
  {
    n: "04",
    title: "Map into robot space",
    body: "The hand-eye transform turns those endpoints into exact points in the robot's own coordinate frame. Reachability is checked before anything moves.",
  },
  {
    n: "05",
    title: "Rehearse dry",
    body: "The full pass runs — lead-in, stroke at constant standoff, retract — with nothing energised. Identical motion, no arc.",
  },
  {
    n: "06",
    title: "Arm and weld",
    body: "On explicit arming: strike arc, run start to end with the chosen weave, end arc, retract. Then it tells you what it did.",
  },
];

const arcGate = [
  { k: "Default arc state", v: "dry", lit: true },
  { k: "Arming", v: "explicit, per session", lit: false },
  { k: "Persists across restart", v: "never", lit: false },
  { k: "Default speeds", v: "low", lit: false },
];

const gallery = [
  {
    src: cellShot,
    alt: "The cell mid-pass — arm on the welding table, operator watching behind a shield",
    caption: "In the cell",
  },
  {
    src: seamShot,
    alt: "A clamped steel section with a finished bead running the length of the joint",
    caption: "The joint, welded",
  },
  {
    src: beadShot,
    alt: "Several welded box sections laid out on the table after a batch of passes",
    caption: "A batch of passes",
  },
];

// The proof-point page. Everything here is a claim about something that has
// already run on a real arm, so it stays concrete: one pass end to end, the
// four weaves by name, and the arc gate as a plain table of defaults.
export default function OmnicronPage() {
  return (
    <main>
      <section className="border-b border-hair">
        <div className="shell pt-[clamp(56px,8vw,88px)]">
          <div className="eyebrow">
            Weld OS · the first nex-ON industry edition · proven
          </div>
          <h1 className="h-page mt-6 max-w-[18ch]">Just tell it to weld.</h1>
          <p className="lede mt-6 max-w-[58ch]">
            Omnicron is Weld OS: nex-ON’s welding edition, running on a
            collaborative arm. It finds the bare-metal seam in front of it,
            measures the part, rehearses the pass dry, and welds it when you arm
            the arc — all directed by voice, with no teach pendant and no CAD
            program.
          </p>

          <div className="relative mt-14 aspect-[16/8] border border-line">
            <Image
              src={heroPass}
              alt="Omnicron running a live weld pass on a clamped steel section, sparks and arc light filling the cell"
              fill
              sizes="100vw"
              quality={90}
              preload
              className="object-cover"
            />
          </div>
          <StatBar items={facts} attached />

          <div className="h-22" />
        </div>
      </section>

      <section className="border-b border-hair bg-mist">
        <div className="shell band-sm">
          <div className="eyebrow">01 / one pass, start to finish</div>
          <h2 className="h-sub mb-11 mt-4.5 max-w-[22ch]">
            What happens between “weld this” and the bead.
          </h2>
          <div className="grid-hair grid grid-cols-[repeat(auto-fit,minmax(265px,1fr))]">
            {steps.map((step) => (
              <div
                key={step.n}
                className="min-h-[170px] bg-paper px-6.5 pb-8.5 pt-7.5"
              >
                <div className="font-brand text-[10.5px] tracking-[0.09em] text-moss">
                  {step.n}
                </div>
                <div className="mt-3.5 text-[19px] leading-[1.25]">
                  {step.title}
                </div>
                <p className="copy-sm mt-3">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-hair">
        <div className="shell band-sm grid grid-cols-[repeat(auto-fit,minmax(360px,1fr))] items-start gap-14">
          <div>
            <div className="eyebrow">02 / weave</div>
            <h2 className="h-sub mt-4.5">
              Specified the way welders specify it.
            </h2>
            <p className="mt-5 text-[17.5px] leading-[1.55] text-body text-pretty">
              Four oscillation patterns overlay the stroke, spaced either by a
              fixed pitch in millimetres per weave or by a set number of cycles
              across the seam.
            </p>
            <div className="grid-hair mt-8 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
              {["Triangle", "Sine", "Circular", "Vertical"].map((weave) => (
                <div key={weave} className="bg-mist px-5 py-5.5 text-[17px]">
                  {weave}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="eyebrow">03 / the safety gate</div>
            <h2 className="h-sub mt-4.5">
              Rehearse the whole pass with the arc off.
            </h2>
            <p className="mt-5 text-[17.5px] leading-[1.55] text-body text-pretty">
              A dry weld is not a simulation — it is the real motion with
              nothing energised. The operator watches the exact pass, then
              decides.
            </p>
            <div className="mt-8 border border-line">
              {arcGate.map((row) => (
                <div
                  key={row.k}
                  className="flex items-center justify-between border-b border-hair px-5.5 py-5 last:border-b-0"
                >
                  <span className="text-[16.5px]">{row.k}</span>
                  <span
                    className={`font-brand text-[12px] ${
                      row.lit ? "text-moss" : "text-muted"
                    }`}
                  >
                    {row.v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-hair">
        <div className="shell band-sm">
          <div className="eyebrow">04 / from the cell</div>
          <div className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(265px,1fr))] gap-4">
            {gallery.map((shot) => (
              <figure key={shot.caption} className="m-0">
                <div className="relative aspect-[3/4] border border-line">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 30vw"
                    quality={90}
                    className="object-cover"
                  />
                </div>
                <figcaption className="tag mt-3">{shot.caption}</figcaption>
              </figure>
            ))}
          </div>
          <p className="meta mt-5">
            Shot on our own floor — no renders, no compositing.
          </p>
        </div>
      </section>

      <PilotCTA
        eyebrow="Pilot programme"
        heading="Send us a part drawing. We'll weld it dry first."
        secondary={{ label: "Platform brief", href: "/platform" }}
      />
      <SiteFooter />
    </main>
  );
}
