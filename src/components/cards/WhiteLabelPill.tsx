import { whiteLabelLabel } from "@/data/projects";

/**
 * Stage-aware pill. "offered" reads as a live offer (violet); "planned" is
 * deliberately muted so intent is never mistaken for availability.
 */
export function WhiteLabelPill({ stage }: { stage: "offered" | "planned" }) {
  const chrome =
    stage === "offered"
      ? "border-violet-500/30 bg-violet-500/10 text-violet-500"
      : "border-border bg-muted/50 text-muted-foreground";
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${chrome}`}
    >
      {whiteLabelLabel(stage)}
    </span>
  );
}
