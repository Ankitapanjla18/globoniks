import { ShieldCheck, Cpu, Target } from "lucide-react";

export function WhyUsSection() {
  const features = [
    {
      icon: <Cpu className="w-8 h-8 text-violet-500" />,
      title: "Senior Engineering Talent",
      description: "Our core team consists of senior architects and full-stack developers mapping out precise infrastructure before writing a single line of code.",
    },
    {
      icon: <Target className="w-8 h-8 text-violet-500" />,
      title: "Zero Agency Bloat",
      description: "You speak directly to the engineers building your product. No middle-managers playing telephone with your requirements.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-violet-500" />,
      title: "Production-Ready Standards",
      description: "We enforce strict testing, robust CI/CD pipelines, and scalable architectures as our baseline, never as an upsell.",
    },
  ];

  return (
    <section className="py-24 bg-muted/20 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight text-foreground mb-6">
            The Globoniks Difference
          </h2>
          <p className="text-lg text-muted-foreground">
            We operate as your dedicated engineering arm, combining startup velocity with enterprise stability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 lg:p-8 rounded-2xl bg-card border border-border hover:border-violet-500/30 transition-colors shadow-sm">
              <div className="w-16 h-16 rounded-full bg-violet-500/10 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
