export function BottleneckSection() {
  return (
    <section className="border-b border-hair">
      <div className="shell band grid grid-cols-[repeat(auto-fit,minmax(360px,1fr))] items-start gap-16">
        <div>
          <div className="eyebrow">02 / the bottleneck</div>
          <h2 className="h-section mt-5">
            Robots are capable. Deploying them is the hard part.
          </h2>
        </div>

        <div className="flex flex-col gap-7">
          <p className="copy">
            Putting a robot to work still means a specialist hand-jogging a
            teach pendant waypoint by waypoint, or an engineer writing an
            offline CAD/CAM program for every new part. Both are slow, need
            scarce skilled labour, and break the moment reality sits a few
            millimetres off the model.
          </p>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(285px,1fr))] gap-px bg-line">
            <div className="bg-card p-6">
              <div className="label">Today</div>
              <div className="mt-2.5 text-[17px] leading-[1.4]">
                Program the robot.
                <br />
                Days of integrator time per part.
              </div>
            </div>
            <div className="bg-card p-6">
              <div className="label text-moss">With nex-ON</div>
              <div className="mt-2.5 text-[17px] leading-[1.4]">
                Talk to the robot.
                <br />
                It sees the part in front of it.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
