"use client";

import { useRef, useState } from "react";

// The three captures from the cell, in the order the argument runs: what the
// thing is, what it can see, then the platform driving a real cobot. Sources
// live in assets/omnicron_video (Cozmo_2, Cozmo_1, Cozmo_3 respectively) and
// are re-encoded into public/omnicron_video at web weight.
const reel = [
  {
    id: "introduction",
    n: "01",
    label: "Introduction",
    note: "What nex-ON is",
    duration: "1:09",
    file: "cozmo-introduction",
  },
  {
    id: "capabilities",
    n: "02",
    label: "Capabilities",
    note: "Seam finding · object detection",
    duration: "1:44",
    file: "cozmo-capabilities",
  },
  {
    id: "integration",
    n: "03",
    label: "Platform demo",
    note: "nex-ON driving the cobot",
    duration: "1:50",
    file: "cozmo-integration",
  },
];

export function HeroReel() {
  const [active, setActive] = useState(0);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  // Once someone has started watching, switching chapter should keep playing
  // rather than dropping them back onto a still.
  const started = useRef(false);

  function select(next: number) {
    const current = videos.current[active];
    if (current && !current.paused) {
      current.pause();
      started.current = true;
    }
    setActive(next);
    if (started.current) {
      // The panel is only unhidden after this render, so play on the next tick.
      requestAnimationFrame(() => void videos.current[next]?.play());
    }
  }

  return (
    <>
      <div className="relative aspect-video border border-line bg-night">
        {reel.map((clip, i) => (
          <div
            key={clip.id}
            id={`reel-panel-${clip.id}`}
            role="tabpanel"
            aria-labelledby={`reel-tab-${clip.id}`}
            hidden={i !== active}
            className="absolute inset-0"
          >
            <video
              ref={(el) => {
                videos.current[i] = el;
              }}
              className="h-full w-full object-cover"
              poster={`/omnicron_video/${clip.file}-poster.jpg`}
              controls
              playsInline
              // Nothing but the poster crosses the wire until it is asked for —
              // three full clips would otherwise land on every home page visit.
              preload="none"
              aria-label={`${clip.label} — ${clip.note}`}
              onPlay={() => {
                started.current = true;
              }}
            >
              <source src={`/omnicron_video/${clip.file}.mp4`} type="video/mp4" />
            </video>
          </div>
        ))}
      </div>

      {/* The chapter strip reads as the same hairline cells the stat bar uses,
          so the hero stays one ruled block rather than gaining a widget. */}
      <div
        role="tablist"
        aria-label="Shop-floor captures"
        className="grid-hair flex flex-wrap border-t-0"
      >
        {reel.map((clip, i) => (
          <button
            key={clip.id}
            id={`reel-tab-${clip.id}`}
            role="tab"
            type="button"
            aria-selected={i === active}
            aria-controls={`reel-panel-${clip.id}`}
            onClick={() => select(i)}
            className={`flex-[1_1_200px] px-6 py-[18px] text-left transition-colors ${
              i === active ? "bg-hatch" : "bg-paper hover:bg-hatch"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  i === active ? "bg-lime" : "border border-olive"
                }`}
              />
              <span className="label">
                {clip.n} · {clip.duration}
              </span>
            </div>
            <div
              className={`mt-2 text-base ${i === active ? "text-ink" : "text-body"}`}
            >
              {clip.label}
            </div>
            <div className="meta mt-1 text-sage">{clip.note}</div>
          </button>
        ))}
      </div>
    </>
  );
}
