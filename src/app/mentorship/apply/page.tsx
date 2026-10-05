import type { Metadata } from "next";
import { MentorshipApplyForm } from "@/components/forms/MentorshipApplyForm";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Apply for mentorship",
    description:
      "Apply to a Globoniks mentorship track: full-stack web, mobile development or leadership & architecture. Every application gets a reply within one working day.",
    path: "/mentorship/apply/",
  }),
  // An application form has no search value of its own.
  robots: { index: false, follow: true },
};

/**
 * The form is a Client Component (submit state), which previously made the
 * whole page client-side and structurally blocked it from exporting
 * metadata. The page is now a Server Component wrapping the client form.
 */
export default function ApplyPage() {
  return <MentorshipApplyForm />;
}
