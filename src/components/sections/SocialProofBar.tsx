export function SocialProofBar() {
  const clients = [
    "EduMapping",
    "Pharma Enterprise",
    "Artisan Marketplace",
    "SaaS Direct Sales",
  ];

  return (
    <section className="py-12 border-y border-border bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-8">
          Trusted by teams at
        </p>
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8">
          {clients.map((client) => (
            <div
              key={client}
              className="px-6 py-3 rounded-full border border-border bg-card shadow-sm text-foreground font-medium text-sm sm:text-base hover:border-indigo-500/30 transition-colors"
            >
              {client}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
