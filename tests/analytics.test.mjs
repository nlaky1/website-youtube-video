// GA4 event helpers (lib/analytics.ts): no PII in params; link classification. Run: npm run test:tools
import assert from "node:assert/strict";
import { test } from "node:test";

const { safeParams, eventsForLink } = await import("../lib/analytics.ts");

test("params are allow-listed strings; emails and query strings never leave", () => {
  assert.deepEqual(safeParams({ form: "contact", email: "a@b.com", name: "Jane", tier: 5 }), { form: "contact" });
  assert.deepEqual(safeParams({ location: "/x?email=a%40b.com" }), {});
  assert.deepEqual(safeParams({ link_url: "calendly.com/nikhil-soluqube/30min?email=a@b.com" }), { link_url: "calendly.com/nikhil-soluqube/30min" });
  assert.equal(safeParams({ form: "x".repeat(300) }).form.length, 100);
});

test("Calendly links, sample PDFs and pricing CTAs map to the right events", () => {
  const cal = eventsForLink("https://calendly.com/nikhil-soluqube/30min?utm_source=x", "/pricing", "pricing_cta", "Audit Workpaper");
  assert.deepEqual(cal.map((e) => e.name), ["calendly_click", "pricing_cta"]);
  assert.equal(cal[0].params.link_url, "calendly.com/nikhil-soluqube/30min");
  assert.equal(cal[1].params.tier, "Audit Workpaper");
  const pdf = eventsForLink("/samples/soluqube-ssp-sample.pdf", "/");
  assert.deepEqual(pdf, [{ name: "sample_download", params: { location: "/", file: "soluqube-ssp-sample.pdf" } }]);
  assert.deepEqual(eventsForLink("/pricing", "/"), []);
  assert.deepEqual(eventsForLink("mailto:nikhil@soluqube.com", "/"), []);
});
