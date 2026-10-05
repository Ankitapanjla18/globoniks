"use client";

import { useEffect, useState } from "react";

/**
 * Our working day, shown in the visitor's own time zone. Static HTML shows
 * IST only; after hydration the second line converts today's office hours
 * to wherever the visitor is and names the overlap. Daylight-saving is
 * handled by the browser's Intl data, so this is right in every season.
 */
const IST = "Asia/Kolkata";
export const OFFICE_START = 10; // 10:00 IST
export const OFFICE_END = 19; // 19:00 IST

function fmt(d: Date, tz: string) {
  return new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: tz }).format(d);
}

/** Today's date at `hour`:00 in IST, as an instant. */
function istToday(hour: number) {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: IST, year: "numeric", month: "2-digit", day: "2-digit" })
    .formatToParts(now)
    .reduce<Record<string, string>>((acc, p) => ({ ...acc, [p.type]: p.value }), {});
  // IST has no DST: a fixed +05:30 offset is exact.
  return new Date(`${parts.year}-${parts.month}-${parts.day}T${String(hour).padStart(2, "0")}:00:00+05:30`);
}

export function OfficeHours() {
  const [local, setLocal] = useState<{ zone: string; start: string; end: string; now: string; sameZone: boolean } | null>(null);

  useEffect(() => {
    try {
      const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const start = istToday(OFFICE_START);
      const end = istToday(OFFICE_END);
      setLocal({
        zone,
        start: fmt(start, zone),
        end: fmt(end, zone),
        now: fmt(new Date(), IST),
        // Compare clock times, not zone names: browsers report IST as
        // "Asia/Calcutta" (the legacy alias) as often as "Asia/Kolkata".
        sameZone: fmt(start, zone) === fmt(start, IST) && fmt(end, zone) === fmt(end, IST),
      });
    } catch {
      setLocal(null);
    }
  }, []);

  return (
    <div className="rounded-3xl border rule bg-card/60 p-6 sm:p-7">
      <p className="eyebrow mb-4 !text-foreground">Our working day</p>
      <p className="font-heading text-3xl leading-tight text-foreground">
        {String(OFFICE_START).padStart(2, "0")}:00 – {OFFICE_END}:00 IST
      </p>
      <p className="mt-1 font-mono text-[11px] text-muted-foreground">Mohali, India · UTC+5:30 · no daylight saving</p>
      {local && !local.sameZone && (
        <p className="mt-5 border-t rule pt-4 text-sm leading-relaxed text-muted-foreground">
          In your time zone (<span className="font-mono text-xs">{local.zone.replace(/_/g, " ")}</span>) that is{" "}
          <span className="text-foreground">
            {local.start} – {local.end}
          </span>
          . It is {local.now} in Mohali right now.
        </p>
      )}
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        Calls are scheduled in your hours, including outside ours. Written
        updates and the staging environment are there whenever you are.
      </p>
    </div>
  );
}
