"use client";

import { useEffect } from "react";
import { eventsForLink, track } from "@/lib/analytics";

/** One document-level listener: Calendly links, /samples/*.pdf downloads and data-ga-event="pricing_cta" CTAs. */
export default function AnalyticsClicks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.("a[href], [data-ga-event]");
      if (!el) return;
      const href = el.getAttribute("href") || "";
      for (const ev of eventsForLink(href, window.location.pathname, el.getAttribute("data-ga-event"), el.getAttribute("data-ga-tier"))) {
        track(ev.name, ev.params);
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
