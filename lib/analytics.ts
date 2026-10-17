// GA4 conversion events (founder-approved 17 Oct 2026). No PII: params are allow-listed, short strings only,
// and anything that looks like an email address is dropped. Same file in smart_contracts/src/lib/analytics.ts.

export type GaEventName = "generate_lead" | "calculator_email" | "sample_download" | "calendly_click" | "sign_up" | "pricing_cta";
export type GaParams = Partial<Record<"form" | "location" | "file" | "link_url" | "tier" | "method", string>>;

const ALLOWED_KEYS = new Set(["form", "location", "file", "link_url", "tier", "method"]);

export function safeParams(params: Record<string, unknown> = {}): GaParams {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(params)) {
    if (!ALLOWED_KEYS.has(k) || typeof v !== "string") continue;
    const clean = (k === "link_url" ? v.split(/[?#]/)[0] : v).slice(0, 100);
    if (!clean || /@|%40/.test(clean)) continue;
    out[k] = clean;
  }
  return out as GaParams;
}

export function track(name: GaEventName, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag === "function") gtag("event", name, safeParams(params));
}

/** Pure: which events a click on this link should send (used by the global click listener). */
export function eventsForLink(href: string, pathname: string, gaEvent?: string | null, gaTier?: string | null): Array<{ name: GaEventName; params: GaParams }> {
  const events: Array<{ name: GaEventName; params: GaParams }> = [];
  let url: URL | null = null;
  try {
    url = new URL(href, "https://soluqube.com");
  } catch {
    url = null;
  }
  if (url && /(^|\.)calendly\.com$/i.test(url.hostname)) {
    events.push({ name: "calendly_click", params: safeParams({ location: pathname, link_url: `${url.hostname}${url.pathname}` }) });
  }
  if (url && /^\/samples\/[^/]+\.pdf$/i.test(url.pathname)) {
    events.push({ name: "sample_download", params: safeParams({ location: pathname, file: url.pathname.split("/").pop() }) });
  }
  if (gaEvent === "pricing_cta") {
    events.push({ name: "pricing_cta", params: safeParams({ location: pathname, tier: gaTier ?? "" }) });
  }
  return events;
}
