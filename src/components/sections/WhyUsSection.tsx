/*
 * Used on the About page. Three commitments, stated as an editorial list
 * rather than icon cards.
 */
export function WhyUsSection() {
  const features = [
    {
      title: "Senior engineering, small team",
      description:
        "Architecture is decided before code is written, by the people who will write it.",
    },
    {
      title: "Zero agency bloat",
      description:
        "You speak directly to the people building your product. No middle-managers playing telephone with your requirements.",
    },
    {
      title: "Production-ready as the baseline",
      description:
        "Testing, CI/CD pipelines and scalable architecture are how we work, never an upsell.",
    },
  ];

  return (
    <section className="border-t rule bg-muted/20 py-20 md:py-28" aria-labelledby="why-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-5">How we differ</p>
            <h2 id="why-heading" className="font-heading text-4xl leading-[1.02] tracking-tight text-foreground md:text-5xl">
              Startup velocity, <span className="ink">production discipline.</span>
            </h2>
          </div>
          <ol data-reveal="" data-reveal-stagger="" className="lg:col-span-8">
            {features.map((feature, index) => (
              <li key={feature.title} className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t rule py-7 last:border-b md:grid-cols-[3rem_1fr] md:gap-x-8">
                <span className="pt-1.5 font-mono text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-heading text-2xl leading-tight text-foreground md:text-3xl">{feature.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-[15px]">{feature.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
