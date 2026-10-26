import Image from "next/image";
import { PendingTag } from "@/components/site/ui";
import appTablet from "@/assets/orio_app_tablet.webp";

const remote = [
  { k: "Drive it from", v: "phone or browser" },
  { k: "Live view", v: "camera and audio" },
  { k: "Speak through it", v: "two-way" },
  { k: "Hand it back", v: "any time" },
];

// Watch and SOS share a section: both are Orio standing in for you when
// you're not in the room, one when you choose to look, one when you can't.
// Both move Orio around the home or call out, so both are pending approval.
export function OrioWatchSection() {
  return (
    <section id="watch" className="border-b border-hair">
      <div className="shell band grid grid-cols-[repeat(auto-fit,minmax(min(360px,100%),1fr))] items-start gap-14">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="eyebrow">03 / keep watch</div>
            <PendingTag />
          </div>
          <h2 className="h-sub mt-4.5">Look around your home from anywhere.</h2>
          <p className="mt-5 text-[17.5px] leading-[1.55] text-body text-pretty">
            A fixed camera shows you one corner of one room. Orio goes and
            looks. Take control from your phone, drive it through the flat,
            check on the dog or the stove, speak through it, then hand it back
            when you&rsquo;re done.
          </p>
          {/* A photo of the tablet screen, standing in until there is a
              clean capture of the app. */}
          <figure className="m-0 mt-8">
            <Image
              src={appTablet}
              alt="The Orio app on a tablet: Orio's live camera view with a drive pad over it, a map of how far away nearby obstacles are, a stop button, and the robot's status and sensors"
              sizes="(max-width: 800px) 100vw, 600px"
              className="block h-auto w-full border border-line"
            />
            <figcaption className="meta border border-t-0 border-line px-5.5 py-3.5">
              The Orio app today: live view, drive pad and obstacle map.
            </figcaption>
          </figure>
          <div className="mt-8 border border-line">
            {remote.map((row) => (
              <div
                key={row.k}
                className="flex items-center justify-between gap-4 border-b border-hair px-5.5 py-5 last:border-b-0"
              >
                <span className="text-[16.5px]">{row.k}</span>
                <span className="font-brand text-[12px] text-muted">
                  {row.v}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="eyebrow">04 / when something goes wrong</div>
            <PendingTag />
          </div>
          <h2 className="h-sub mt-4.5">It calls someone.</h2>
          <p className="mt-5 text-[17.5px] leading-[1.55] text-body text-pretty">
            Say the word and Orio alerts the contacts you choose, with the room
            it happened in and a live view they can open. It can also raise an
            alert by itself: a fall it sees, a person who doesn&rsquo;t get up.
          </p>

          <p className="mt-5 text-[17.5px] leading-[1.55] text-body text-pretty">
            This is the part of a companion robot that has to work when nobody
            is watching, so it is the part we will hold longest before calling
            it done.
          </p>
          <div className="mt-8 border border-limeline bg-[rgba(173,208,55,0.1)] px-5.5 py-5">
            <div className="tag text-moss">Not a medical device</div>
            <p className="copy-sm mt-2.5">
              Orio alerts the people you choose. It is not a monitored alarm
              service and does not replace one.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
