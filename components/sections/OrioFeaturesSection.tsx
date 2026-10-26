import Image, { type StaticImageData } from "next/image";
import { PendingTag } from "@/components/site/ui";
import head from "@/assets/features/head.webp";
import camera from "@/assets/features/camera.webp";
import sectorMap from "@/assets/features/sector-map.webp";
import stop from "@/assets/features/stop.webp";
import status from "@/assets/features/status.webp";

type Feature = {
  n: string;
  title: string;
  body: string;
  specs: { k: string; v: string }[];
  pending?: boolean;
} & (
  | {
      image: StaticImageData;
      alt: string;
      // The robot itself sits on paper like the hero; screens of the app sit
      // on night so they read as screens.
      surface: "robot" | "screen";
      // A camera frame fills its tile; a cropped piece of the app floats in it.
      fill?: boolean;
      wide?: boolean;
    }
  // No photo yet: the tile runs the full width with a drawn map instead.
  | { image?: undefined }
);

type PhotoFeature = Extract<Feature, { image: StaticImageData }>;

// What already runs on the prototype, then finding its way round the home,
// which moves Orio between rooms and so is pending approval and says so.
// The pictures are close-ups of photos of the prototype and the app, standing
// in until there are clean product shots.
const features: Feature[] = [
  {
    n: "01",
    title: "Wake it by name",
    body: "Say “Hey Orio” and it starts listening. Ask in plain words and it answers out loud, while its face looks back at you. Until you call it, it waits: the app shows its voice as asleep.",
    specs: [
      { k: "Wake word", v: "“Hey Orio”" },
      { k: "Languages", v: "English · Hindi · German" },
      { k: "Answers", v: "out loud" },
    ],
    image: head,
    alt: "Close-up of Orio's head: a depth camera above a screen face showing two yellow eyes",
    surface: "robot",
    wide: true,
  },
  {
    n: "02",
    title: "Sees the room, finds the thing",
    body: "A stereo depth camera in its head gives Orio a live view and the distance to everything in it. Ask for something by name and it looks for it, with no training on that object first.",
    specs: [
      { k: "Camera", v: "stereo depth, live" },
      { k: "Measures", v: "to the millimetre" },
      { k: "Training per object", v: "none" },
    ],
    image: camera,
    alt: "Orio's camera view of a bedroom: a person sitting on a bed, a door, shelves and a cricket bat leaning against a box",
    surface: "screen",
    fill: true,
    wide: true,
  },
  {
    n: "03",
    title: "Knows what is close",
    body: "A lidar at its base scans all the way round. The app shows how far the nearest thing is in each direction ahead, so Orio knows what is in the way before it moves.",
    specs: [
      { k: "Lidar", v: "360° scan" },
      { k: "Clear", v: "beyond 0.7 m" },
      { k: "Too close", v: "under 0.2 m" },
    ],
    image: sectorMap,
    alt: "Orio's obstacle map: a fan of green sectors in front of the robot, each labelled with a distance between 0.85 and 1.96 metres",
    surface: "screen",
  },
  {
    n: "04",
    title: "One button stops it",
    body: "STOP is on screen whenever the app is open. Press it mid-move and Orio halts where it is, and logs that it did.",
    specs: [
      { k: "Stop", v: "always on screen" },
      { k: "Mid-move", v: "halts in place" },
    ],
    image: stop,
    alt: "The Orio app's large red STOP button beside a Go to button",
    surface: "screen",
  },
  {
    n: "05",
    title: "Tells you what it is doing",
    body: "What Orio is doing, whether it is listening, who is driving and which sensors are healthy, refreshed every couple of seconds. Every command is logged with its result.",
    specs: [
      { k: "Shows", v: "behaviour, voice, speed" },
      { k: "Checks", v: "camera, drive, IMU, neck" },
    ],
    image: status,
    alt: "Orio's status panel: behaviour Idle, voice asleep, wheels driven by nobody, speed 5%, and sensor badges for camera, drivetrain, IMU and neck",
    surface: "screen",
  },
  {
    n: "06",
    title: "Learns your home, finds its way",
    body: "As it moves, Orio uses its lidar to build a map of your home and keep track of where it is on it, so it can go to a place you pick and come back. Outside, GPS tells it where it is.",
    specs: [
      { k: "Map of your home", v: "built with lidar (SLAM)" },
      { k: "Knows where it is", v: "lidar indoors, GPS outside" },
      { k: "Going places", v: "pending approval" },
    ],
    pending: true,
  },
];

// Everything Orio senses and talks with, and whether it is in use yet. GPS and
// the SIM are there for going places and alerts, both pending approval.
const hardware = [
  {
    name: "Stereo depth camera",
    use: "Its view of the room and the distance to everything in it.",
    pending: false,
  },
  {
    name: "360° lidar",
    use: "Scans all the way round at base height, for what is in the way.",
    pending: false,
  },
  {
    name: "GPS",
    use: "Where Orio is outside, for finding its way and for alerts.",
    pending: true,
  },
  {
    name: "SIM, mobile data",
    use: "A connection of its own, so an alert still goes out if your Wi-Fi drops.",
    pending: true,
  },
];

function FeatureImage({ feature }: { feature: PhotoFeature }) {
  const robot = feature.surface === "robot";
  return (
    <div
      className={`relative overflow-hidden ${
        feature.wide ? "aspect-[16/10]" : "aspect-[16/9]"
      } ${robot ? "bg-mist" : "bg-night"}`}
    >
      {robot && (
        <>
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(var(--color-hair)_1px,transparent_1px),linear-gradient(90deg,var(--color-hair)_1px,transparent_1px)] bg-[size:40px_40px] opacity-60"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(173,208,55,0.4),rgba(173,208,55,0)_55%)]"
          />
        </>
      )}
      <Image
        src={feature.image}
        alt={feature.alt}
        fill
        sizes={
          feature.wide
            ? "(max-width: 768px) 100vw, 600px"
            : "(max-width: 768px) 100vw, 400px"
        }
        className={
          robot
            ? "object-contain object-bottom p-[8%] pb-0"
            : feature.fill
              ? "object-cover"
              : "object-contain p-4"
        }
      />
    </div>
  );
}

function FeatureText({ feature }: { feature: Feature }) {
  return (
    <>
      <div className="flex h-6 items-center justify-between gap-3">
        <span className="font-brand text-[10.5px] tracking-[0.09em] text-moss">
          {feature.n}
        </span>
        {feature.pending && <PendingTag />}
      </div>
      <h3 className="mt-3.5 text-[21px] font-medium leading-[1.2] tracking-[-0.01em]">
        {feature.title}
      </h3>
      <p className="copy-sm mb-6 mt-3">{feature.body}</p>
      <dl className="m-0 mt-auto border-t border-hair pt-1">
        {feature.specs.map((spec) => (
          <div
            key={spec.k}
            className="flex items-center justify-between gap-4 border-b border-hair py-3 last:border-b-0"
          >
            <dt className="text-[14.5px]">{spec.k}</dt>
            <dd className="m-0 text-right font-brand text-[11.5px] text-muted">
              {spec.v}
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}

// A drawn floor plan, not a capture: rooms in hairlines, the route Orio would
// take as a dashed line, and where it is now as a lime dot. Swap for a real
// map from the app once going places is approved.
function HomeMap() {
  return (
    <div className="relative min-h-[260px] overflow-hidden border-line bg-mist max-md:border-t md:border-l">
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(var(--color-hair)_1px,transparent_1px),linear-gradient(90deg,var(--color-hair)_1px,transparent_1px)] bg-[size:40px_40px] opacity-60"
      />
      <svg
        viewBox="0 0 400 260"
        role="img"
        aria-label="Illustration: a floor plan of four rooms with a dashed route from Orio's position in the living room to the kitchen"
        className="absolute inset-0 h-full w-full p-6"
      >
        <g fill="none" stroke="var(--color-line-hard)" strokeWidth="1.5">
          <rect x="20" y="20" width="360" height="220" />
          <path d="M200 20 V95 M200 135 V240" />
          <path d="M20 130 H90 M130 130 H200" />
          <path d="M200 150 H270 M310 150 H380" />
        </g>
        <g
          className="font-brand"
          fill="var(--color-sage)"
          fontSize="9"
          letterSpacing="0.08em"
        >
          <text x="32" y="40">
            LIVING ROOM
          </text>
          <text x="212" y="40">
            KITCHEN
          </text>
          <text x="32" y="150">
            BEDROOM
          </text>
          <text x="212" y="170">
            HALL
          </text>
        </g>
        <path
          d="M80 90 C130 90 170 115 200 115 S260 110 290 75"
          fill="none"
          stroke="var(--color-moss)"
          strokeWidth="1.5"
          strokeDasharray="5 5"
        />
        <circle
          cx="290"
          cy="75"
          r="5"
          fill="none"
          stroke="var(--color-moss)"
          strokeWidth="1.5"
        />
        <circle cx="80" cy="90" r="14" fill="rgba(173,208,55,0.3)" />
        <circle
          cx="80"
          cy="90"
          r="6"
          fill="var(--color-lime)"
          stroke="var(--color-ink)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

export function OrioFeaturesSection() {
  return (
    <section id="features" className="border-b border-hair">
      <div className="shell band">
        <div className="eyebrow">02 / up close</div>
        <h2 className="h-section mt-5 max-w-[22ch] text-balance">
          The basics, already working.
        </h2>
        <p className="lede mt-6 max-w-[60ch]">
          These run on Orio&rsquo;s prototype in our lab today: how you wake it,
          how it sees, how it keeps clear of things and how you stay in charge.
          The last, finding its way round your home, is pending approval.
        </p>

        <div className="grid-hair mt-12 grid grid-cols-1 md:grid-cols-6">
          {features.map((feature) =>
            feature.image ? (
              <article
                key={feature.n}
                className={`flex flex-col bg-paper ${
                  feature.wide ? "md:col-span-3" : "md:col-span-2"
                }`}
              >
                <FeatureImage feature={feature} />
                <div className="flex flex-1 flex-col border-t border-line px-6.5 pb-7 pt-6.5">
                  <FeatureText feature={feature} />
                </div>
              </article>
            ) : (
              <article
                key={feature.n}
                className="grid bg-paper md:col-span-6 md:grid-cols-2"
              >
                <div className="flex flex-col px-6.5 pb-7 pt-6.5">
                  <FeatureText feature={feature} />
                </div>
                <HomeMap />
              </article>
            ),
          )}
        </div>

        <div className="mt-6 grid border border-line md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div className="border-line bg-mist px-6.5 py-7 max-md:border-b md:border-r">
            <div className="tag text-moss">On board</div>
            <h3 className="mt-3.5 text-[21px] font-medium leading-[1.2] tracking-[-0.01em]">
              What it senses with
            </h3>
            <p className="copy-sm mt-3">
              Two ways of seeing, and its own way to reach you when it needs to.
            </p>
          </div>
          <dl className="m-0">
            {hardware.map((part) => (
              <div
                key={part.name}
                className="grid gap-x-6 gap-y-2 border-b border-hair px-6.5 py-4.5 last:border-b-0 sm:grid-cols-[minmax(0,180px)_minmax(0,1fr)_auto] sm:items-center"
              >
                <dt className="text-[16px]">{part.name}</dt>
                <dd className="copy-sm m-0">{part.use}</dd>
                <dd className="m-0">
                  {part.pending ? (
                    <PendingTag />
                  ) : (
                    <span className="inline-flex items-center gap-2 font-brand text-[9.5px] uppercase tracking-[0.08em] text-moss">
                      <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                      In use
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <p className="meta mt-5">
          Photographed on the prototype and its app in our lab. The production
          body and app will look different.
        </p>
      </div>
    </section>
  );
}
