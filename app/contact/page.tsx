import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { SiteFooter } from "@/components/site/SiteFooter";

export const metadata: Metadata = {
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

export default function ContactPage() {
  return (
    <main>
      <section>
        <div className="shell band grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] items-start gap-14">
          <div>
            <div className="eyebrow">Pilot programme · limited slots</div>
            <h1 className="mt-6 max-w-[18ch] text-[clamp(34px,4.6vw,68px)] font-medium leading-none tracking-[-0.035em]">
              Bring us a part. Talk to it.
            </h1>
            <p className="copy mt-6 max-w-[52ch]">
              We deploy nex-ON on a robot you already have, on a task you
              already run, and you direct it in plain language on day one —
              starting dry.
            </p>

            <div className="mt-10 border border-line">
              {steps.map((step) => (
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
                What you need on site
              </div>
              <div className="mt-3 text-[16.5px] leading-[1.5]">
                A collaborative arm, a USB depth camera, a mic and speakers, and
                a computer to run it on. No training pipeline.
              </div>
            </div>
          </div>

          <div className="border border-[rgba(61,74,21,0.18)] bg-mist">
            <div className="border-b border-line px-[clamp(20px,3vw,32px)] py-6.5">
              <div className="text-[22px] tracking-[-0.02em]">
                Request pilot access
              </div>
              <div className="meta mt-2 text-body">
                we reply within two working days
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
