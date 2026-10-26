import { PendingTag } from "@/components/site/ui";

// The things people actually ask a robot at home to do, in the order they come
// up: how you ask at all, the two that move things, the one that stands in for
// you, and the one that matters at three in the morning. Anything that sends
// Orio from one place to another, or calls out, is still pending approval and
// says so on its card.
const jobs = [
  {
    n: "01",
    title: "Talk to it",
    body: "No app to learn and no commands to memorise. Ask in plain words, in English, Hindi or German, and Orio answers out loud.",
  },
  {
    n: "02",
    title: "Find things for you",
    body: "Ask for the thing by name, not the shelf it lives on. It recognises objects nobody trained it on.",
  },
  {
    n: "03",
    title: "Carry things for you",
    body: "Take something from one room to another: you say where it goes and Orio takes it. Which kinds of items it can carry is still being defined.",
    pending: true,
  },
  {
    n: "04",
    title: "Keep watch",
    body: "Out for the day? Drive Orio through your home from your phone and see what it sees, instead of a camera stuck in one corner.",
    pending: true,
  },
  {
    n: "05",
    title: "Call for help",
    body: "One spoken word, or a fall it sees by itself, and Orio alerts the people you choose, with where in the home it happened.",
    pending: true,
  },
];

export function OrioJobsSection() {
  return (
    <section id="what-it-does" className="border-b border-hair bg-mist">
      <div className="shell band">
        <div className="eyebrow">01 / what it does</div>
        <h2 className="h-section mt-5 max-w-[22ch] text-balance">
          Ask it the way you&rsquo;d ask a person.
        </h2>
        <p className="lede mt-6 max-w-[60ch]">
          Orio is a small wheeled robot with two arms, a camera and a voice.
          Everything it does starts with you saying what you want.
        </p>

        <div className="grid-hair mt-12 grid grid-cols-[repeat(auto-fit,minmax(min(265px,100%),1fr))]">
          {jobs.map((job) => (
            <div
              key={job.n}
              className="min-h-[190px] bg-paper px-6.5 pb-8.5 pt-7.5 transition-colors hover:bg-hatch"
            >
              {/* Fixed height so titles line up whether or not the card
                  carries a tag. */}
              <div className="flex h-6 items-center justify-between gap-3">
                <span className="font-brand text-[10.5px] tracking-[0.09em] text-moss">
                  {job.n}
                </span>
                {job.pending && <PendingTag />}
              </div>
              <div className="mt-4 text-[19px] leading-[1.25]">{job.title}</div>
              <p className="copy-sm mt-3">{job.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
