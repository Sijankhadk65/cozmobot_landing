const columns = [
  {
    tag: "Task-specific robotics",
    title: "One job, one class of machine",
    body: "Welding systems, seam trackers, no-code programming tools. They solve a single task on a single form factor.",
    ours: false,
  },
  {
    tag: "Embodied-AI players",
    title: "Bodies and learned policies",
    body: "Humanoids and robot foundation models: capital-intensive, hardware-heavy, often single-embodiment, and opaque at inference.",
    ours: false,
  },
  {
    tag: "nex-ON",
    title: "Horizontal deployment layer",
    body: "Works with robots that already exist, from many vendors. Interpretable tool calls with safety gates and dry runs instead of an opaque policy trained at scale.",
    ours: true,
  },
];

export function PositioningSection() {
  return (
    <section id="position" className="border-b border-hair">
      <div className="shell band">
        <div className="eyebrow">07 / where we sit</div>
        <h2 className="h-section mt-5 max-w-[26ch]">
          Everyone else is building the body or the reflexes.
        </h2>
        <p className="copy mt-5 max-w-[60ch]">
          nex-ON is the deployment platform that lets any body do any job.
        </p>

        <div className="grid-hair mt-12 grid grid-cols-[repeat(auto-fit,minmax(265px,1fr))]">
          {columns.map((column) => (
            <div
              key={column.tag}
              className={
                column.ours
                  ? // Our column is the lit one: white ground and a lime rule
                    // down its inside edge, so the comparison resolves.
                    "bg-card px-7 py-8 shadow-[inset_2px_0_0_var(--color-lime)]"
                  : "bg-mist px-7 py-8"
              }
            >
              <div className={`tag ${column.ours ? "text-moss" : ""}`}>
                {column.tag}
              </div>
              <div className="mt-3.5 text-[19px] leading-[1.3]">
                {column.title}
              </div>
              <p
                className={`mt-3 text-[15px] leading-[1.5] ${
                  column.ours ? "text-deep" : "text-muted"
                }`}
              >
                {column.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
