import type { Metadata } from "next";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { BUSINESS, TEAM } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Globoniks is a family-run software studio founded in 2024 in Mohali, Punjab, building web, mobile and custom software alongside a tech mentorship programme.",
  alternates: { canonical: "/about/" },
};

/*
 * The team grid used to render three placeholder cards -- "[Founder Name]",
 * and two "[Name]" entries with invented roles ("Head of Mobile Dev",
 * "Mentorship Director") that corresponded to nobody. Replaced with the real,
 * confirmed story: family-run, the founder working with their brother.
 * Named cards return when names, photos and LinkedIn URLs are supplied --
 * see NEEDS-INPUT.md 1.2.
 */
export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-heading font-black tracking-tight text-foreground mb-6">
            Building software with <span className="text-violet-600">conviction.</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Globoniks was founded on a simple premise: most software agencies produce unmaintainable code. We exist to build production systems businesses can run on — and to mentor the next generation of architects.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <section
            aria-labelledby="family-run"
            className="bg-card border border-border rounded-3xl p-8 md:p-12"
          >
            <h2
              id="family-run"
              className="text-3xl font-heading font-bold text-foreground mb-6"
            >
              A family-run studio.
            </h2>
            <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
              <p>
                Globoniks was founded in {BUSINESS.foundingYear} in Mohali,
                Punjab by Ankita, who runs it side by side with brother
                Saksham Panjla. Two people, one name on the door — that is
                not a limitation, it is the point.
              </p>
              <p>
                The split is simple: Ankita owns every client
                relationship, Saksham owns the code. There is no account
                layer and no handoff chain — the person you talk to and the
                person who builds your system sit at the same table, and
                every project that ships carries our family name.
              </p>
              <p>
                You can see what that produces — the work page links to live
                products you can open and judge for yourself.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {TEAM.map((person) => (
                <div
                  key={person.name}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-muted/20 p-5"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-violet-500/15 font-heading text-lg font-bold text-violet-400"
                  >
                    {person.initials}
                  </span>
                  <div>
                    <p className="font-heading font-bold text-foreground">
                      {person.name}
                    </p>
                    {"role" in person && person.role && (
                      <p className="text-sm text-muted-foreground">
                        {person.role}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <WhyUsSection />
    </div>
  );
}
