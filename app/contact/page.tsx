import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { SiteFooter } from "@/components/site/SiteFooter";
import { readIntent } from "@/lib/contact-options";

// The pre-order link is the one people share, so the tab and the card have to
// name what the page is actually open on.
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  if (readIntent((await searchParams).intent) === "preorder") {
    return {
      title: "Pre-order Orio",
      description:
        "Orio is the first Companion OS robot — it carries, fetches, stands watch and calls for help. The first 100 orders are \u20ac450 a month, delivered from Q1 2028. Nothing is charged at pre-order.",
      openGraph: {
        title: "Pre-order Orio — CozmoBot",
        description:
          "Put your name on the first hundred. \u20ac450 a month, delivery from Q1 2028, nothing charged today.",
        type: "website",
        siteName: "CozmoBot",
      },
    };
  }

  return {
    title: "Request pilot access",
    description:
      "We deploy nex-ON on a robot you already have, on a task you already run, and you direct it in plain language on day one — starting dry.",
    openGraph: {
      title: "Request pilot access — CozmoBot",
      description:
        "Bring us a part. Talk to it. We calibrate on your arm, run the pass dry, and you judge it on time-to-deploy.",
      type: "website",
      siteName: "CozmoBot",
    },
  };
}

// Two asks share this page. `?intent=preorder` — the link every Orio button on
// the site carries — opens it on the pre-order, and the form itself can switch
// between them, so the copy either side of it has to switch too.
const preorderSteps = [
  {
    n: "01",
    title: "Reserve your place",
    body: "Tell us where Orio would work and we hold a build slot against your name.",
  },
  {
    n: "02",
    title: "We confirm the price",
    body: "The first hundred orders are \u20ac450 a month. We write back with your number in the queue.",
  },
  {
    n: "03",
    title: "Nothing is charged now",
    body: "A pre-order is a reservation, not a payment. No card, no deposit, cancel by replying.",
  },
  {
    n: "04",
    title: "Delivery from Q1 2028",
    body: "You get build updates as Companion OS comes together, and first refusal when units ship.",
  },
];

const steps = [
  {
    n: "01",
    title: "Tell us the task",
    body: "The part, the joint or the job your integrators currently quote in weeks.",
  },
  {
    n: "02",
    title: "We calibrate on your arm",
    body: "Camera to robot base, on the machine you already own — no new hardware purchase.",
  },
  {
    n: "03",
    title: "Run it dry",
    body: "The full motion with nothing energised, so your team sees the exact pass before anything is live.",
  },
  {
    n: "04",
    title: "Judge it on time-to-deploy",
    body: "Compare against your current teach-pendant or CAD/CAM route on the same part.",
  },
];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const intent = readIntent((await searchParams).intent);
  const preorder = intent === "preorder";

  return (
    <main>
      <section>
        <div className="shell band grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] items-start gap-14">
          <div>
            <div className="eyebrow">
              {preorder
                ? "Orio pre-order · first 100 at \u20ac450 / month"
                : "Pilot programme · limited slots"}
            </div>
            <h1 className="mt-6 max-w-[18ch] text-[clamp(34px,4.6vw,68px)] font-medium leading-none tracking-[-0.035em]">
              {preorder
                ? "Put your name on one."
                : "Bring us a part. Talk to it."}
            </h1>
            <p className="copy mt-6 max-w-[52ch]">
              {preorder
                ? "Orio is the first Companion OS robot — it fetches, carries, watches the place when you\u2019re out, and calls for help if something is wrong. Pre-orders are open now for delivery from Q1 2028."
                : "We deploy nex-ON on a robot you already have, on a task you already run, and you direct it in plain language on day one — starting dry."}
            </p>

            <div className="mt-10 border border-line">
              {(preorder ? preorderSteps : steps).map((step) => (
                <div
                  key={step.n}
                  className="flex gap-4.5 border-b border-line-soft px-[clamp(18px,2.5vw,24px)] py-5.5 last:border-b-0"
                >
                  <div className="flex-none pt-[3px] font-brand text-[11px] text-moss">
                    {step.n}
                  </div>
                  <div>
                    <div className="text-[17px] leading-[1.3]">
                      {step.title}
                    </div>
                    <p className="copy-sm mt-2">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border border-line bg-mist p-6">
              <div className="font-brand text-[10.5px] uppercase tracking-[0.08em] text-body">
                {preorder ? "Where Orio stands today" : "What you need on site"}
              </div>
              <div className="mt-3 text-[16.5px] leading-[1.5]">
                {preorder
                  ? "In development. The orchestration underneath it runs on a live arm today; the wheeled body and its Companion OS edition are being built toward a Q1 2028 delivery."
                  : "A collaborative arm, a USB depth camera, a mic and speakers, and a computer to run it on. No training pipeline."}
              </div>
            </div>
          </div>

          <div className="border border-[rgba(61,74,21,0.18)] bg-mist">
            <div className="border-b border-line px-[clamp(20px,3vw,32px)] py-6.5">
              <div className="text-[22px] tracking-[-0.02em]">
                {preorder ? "Pre-order Orio" : "Request pilot access"}
              </div>
              <div className="meta mt-2 text-body">
                we reply within two working days
              </div>
            </div>
            <ContactForm defaultIntent={intent} />
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
