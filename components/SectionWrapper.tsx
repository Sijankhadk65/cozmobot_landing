interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tight?: boolean;
}

export function SectionWrapper({
  children,
  className = "",
  id,
  tight = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`w-full scroll-mt-20 ${tight ? "py-16" : "py-24 md:py-32"} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">{children}</div>
    </section>
  );
}
