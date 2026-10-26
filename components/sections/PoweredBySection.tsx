import Image from "next/image";
import Link from "next/link";
import appBrowser from "@/assets/orio_app_browser.webp";

// The honest column. The software underneath Orio is real and running in our
// lab today; the wheeled body is not built yet, and the page says so
// rather than letting the render imply it.
const built = [
  "Voice in and out, in three languages",
  "Finding objects by name, with no per-object training",
  "Millimetre measurement from a depth camera",
  "A model that picks the right skill for what you asked",
];

const toCome = [
  "Orio's wheeled body itself",
  "Which kinds of items it can carry",
  "Moving between rooms · pending approval",
  "Remote driving and the watch mode · pending approval",
  "Alerts to your own contacts · pending approval",
];

export function PoweredBySection() {
  return (
    <section id="platform" className="border-b border-hair">
      <div className="shell band">
        <div className="eyebrow">06 / what powers it</div>
        <h2 className="h-section mt-5 max-w-[24ch] text-balance">
          A new body on software that already runs.
        </h2>
        <p className="lede mt-6 max-w-[62ch]">
          Orio runs Companion OS, the home edition of nex-ON, our embodied OS.
          nex-ON is the layer between an AI brain and a robot body: it hears
          you, finds the thing, plans the motion and tells you what it did. It
          already does that in our lab. The wheeled body is what we&rsquo;re
          building now.
        </p>

        {/* A photo of the screen, standing in until there is a clean capture
            of nex-ON taking a spoken instruction. */}
        <figure className="m-0 mt-12 max-w-[880px]">
          <Image
            src={appBrowser}
            alt="nex-ON's control view in our lab: the robot's camera feed of a room, a map of obstacle distances around it, and a log of commands it was given and what it did"
            sizes="(max-width: 900px) 100vw, 880px"
            className="block h-auto w-full border border-line"
          />
          <figcaption className="meta border border-t-0 border-line px-5.5 py-3.5">
            nex-ON in our lab: what the robot sees, what is around it, and each
            command it was given with what it did.
          </figcaption>
        </figure>

        <div className="grid-hair mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(285px,100%),1fr))]">
          <div className="bg-mist px-7.5 py-8.5">
            <div className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" />
              <span className="font-brand text-[11px] uppercase tracking-[0.09em] text-moss">
                Running today, in our lab
              </span>
            </div>
            <ul className="mt-5 flex flex-col gap-3 text-base leading-[1.45] text-deep">
              {built.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-mist px-7.5 py-8.5">
            <div className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full border border-olive" />
              <span className="font-brand text-[11px] uppercase tracking-[0.09em] text-olive">
                In development for Q1 2028
              </span>
            </div>
            <ul className="mt-5 flex flex-col gap-3 text-base leading-[1.45] text-muted">
              {toCome.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-5.5 text-[14.5px] leading-[1.5] text-body text-pretty">
              We would rather you pre-order knowing this than find it out later.
            </p>
          </div>
        </div>

        <Link
          href="/platform"
          className="mt-10 inline-block border-b border-[rgba(140,170,40,0.5)] pb-1 font-brand text-[11.5px] uppercase tracking-[0.07em] text-moss transition-colors hover:border-moss"
        >
          How the platform works →
        </Link>
      </div>
    </section>
  );
}
