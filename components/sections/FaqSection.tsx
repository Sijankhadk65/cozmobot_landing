const faqs = [
  {
    q: "When can I get one?",
    a: "Delivery is planned from Q1 2028. Orio is in development today: the software it runs already works in our lab, and the wheeled body is being built now. Pre-ordering holds your place in the queue.",
  },
  {
    q: "What does it cost?",
    a: "We haven't announced a price yet, and we won't quote one we might not hold. A pre-order costs nothing: no deposit and no card. You'll know the price before anything is due.",
  },
  {
    q: "What can it carry?",
    a: "We're still defining which kinds of items Orio will carry, and we'd rather not list examples until that's settled. Carrying things from one room to another is also pending approval.",
  },
  {
    q: "Can I change my mind?",
    a: "Yes. You can cancel a pre-order any time before delivery by replying to any of our emails.",
  },
  {
    q: "Which languages does it understand?",
    a: "English, Hindi and German. Each conversation is locked to one language, so a television or a conversation in another language in the room can't send it off on an errand.",
  },
  {
    q: "Is it a medical alarm?",
    a: "No. Alerting the people you choose, when you ask or when it sees a fall, is planned and pending approval. Even then, Orio is not a monitored alarm service and does not replace one.",
  },
  {
    q: "Who makes it?",
    a: "CozmoBot, in Wiesbaden. Orio runs nex-ON, the same software we deploy on robots in industry, with an edition built for the home.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="border-b border-hair">
      <div className="shell band grid grid-cols-[repeat(auto-fit,minmax(min(330px,100%),1fr))] items-start gap-14">
        <div>
          <div className="eyebrow">07 / questions</div>
          <h2 className="mt-5 text-[clamp(28px,3vw,42px)] font-medium leading-[1.05] tracking-[-0.03em]">
            The ones we get asked most.
          </h2>
        </div>

        {/* Native <details>, so an unanswered question is still readable with
            JavaScript off and Ctrl+F finds the answers. */}
        <div className="border-t border-line">
          {faqs.map((faq) => (
            <details key={faq.q} className="group border-b border-line">
              <summary className="flex justify-between gap-6 py-5.5 text-[18px] text-ink">
                <span>{faq.q}</span>
                <span
                  aria-hidden
                  className="shrink-0 font-brand text-[14px] text-moss"
                >
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">−</span>
                </span>
              </summary>
              <p className="mb-6 pr-15 text-base leading-[1.55] text-body text-pretty">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
