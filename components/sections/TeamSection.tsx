import { Hatch } from "@/components/site/ui";

// Real names, roles and portraits aren't in yet, so the section ships as
// labelled slots rather than as invented people.
const team = [
  { name: "Name to come", role: "Founder / CEO" },
  { name: "Name to come", role: "Robotics lead" },
  { name: "Name to come", role: "Perception" },
  { name: "Name to come", role: "Deployment" },
];

export function TeamSection({
  eyebrow,
  tinted = false,
}: {
  eyebrow: string;
  tinted?: boolean;
}) {
  return (
    <section
      className={`border-b border-hair ${tinted ? "bg-mist" : ""}`}
    >
      <div className="shell band">
        <div className="eyebrow">{eyebrow}</div>
        <h2 className="h-section mt-5 max-w-[24ch]">
          Built by the people running it on the shop floor.
        </h2>

        <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
          {team.map((member, i) => (
            <div key={i}>
              <Hatch ratio="4 / 5" label="[ portrait ]" align="end" />
              <div className="mt-3.5 text-[17px]">{member.name}</div>
              <div className="meta mt-1 text-body">{member.role}</div>
            </div>
          ))}
        </div>

        <p className="meta mt-6">
          Send real names, roles and portraits and they drop straight in.
        </p>
      </div>
    </section>
  );
}
