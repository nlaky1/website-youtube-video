// SSP Allocation & Residual-Cent Calculator: reproduces the engine's published examples.
// Run: npm run test:tools   (Node >= 22.18 strips TypeScript types; the hook below resolves
// the extensionless relative import inside lib/ssp/ to its .ts file).
import { registerHooks } from "node:module";
import assert from "node:assert/strict";
import { test } from "node:test";

registerHooks({
  resolve(specifier, context, nextResolve) {
    try {
      return nextResolve(specifier, context);
    } catch (err) {
      if (specifier.startsWith(".") && !/\.[cm]?[jt]s$/.test(specifier)) {
        return nextResolve(`${specifier}.ts`, context);
      }
      throw err;
    }
  },
});

const { runCalculator, validateCalcInput, toCsv, formatCents } = await import("../lib/ssp/calculator.ts");
const { spreadGstCents } = await import("../lib/ssp/fixedPointEngine.ts");

const ob = (name, ssp, recognition = "ratable") => ({ name, ssp, recognition });

test("$100,000 over 36 months: 35 × 2,777.77 + 2,778.05, ends at 0.00 deferred", () => {
  const r = runCalculator({ price: 100000, currency: "USD", termMonths: 36, obligations: [ob("Subscription", 100000)] });
  assert.equal(r.schedule.length, 36);
  for (const row of r.schedule.slice(0, 35)) assert.equal(row.recognizedCents, 277777);
  assert.equal(r.schedule[35].recognizedCents, 277805);
  assert.equal(r.schedule[35].cumulativeCents, 10000000);
  assert.equal(r.schedule[35].deferredCents, 0);
  assert.equal(r.naiveScheduleTotalCents, 10000008, "naive per-month rounding over-recognises 0.08");
});

test("$120,000 with SSPs 100k / 25k → 96,000 / 24,000", () => {
  const r = runCalculator({ price: 120000, currency: "USD", termMonths: 12, obligations: [ob("Platform", 100000), ob("Support", 25000)] });
  assert.deepEqual(r.allocations.map((a) => a.engineCents), [9600000, 2400000]);
  assert.deepEqual(r.allocations.map((a) => a.weightPct), [80, 20]);
  assert.equal(r.residualCents, 0);
  assert.equal(r.schedule.at(-1).deferredCents, 0);
});

test("$100,000 with SSPs 30k / 30k / 120k → 16,666.67 / 16,666.67 / 66,666.66, sum 100,000.00", () => {
  const r = runCalculator({
    price: 100000,
    currency: "USD",
    termMonths: 36,
    obligations: [ob("Implementation", 30000, "point_in_time"), ob("Training", 30000, "point_in_time"), ob("Subscription", 120000)],
  });
  assert.deepEqual(r.allocations.map((a) => a.engineCents), [1666667, 1666667, 6666666]);
  assert.equal(r.engineTotalCents, 10000000);
  assert.equal(r.naiveTotalCents, 10000001, "line-by-line rounding gives 100,000.01");
  assert.equal(r.residualCents, -1);
  assert.equal(r.absorberIndex, 2);
  assert.equal(r.schedule.at(-1).cumulativeCents, 10000000);
  assert.equal(r.schedule.at(-1).deferredCents, 0);
  assert.equal(formatCents(r.engineTotalCents, "USD"), "$100,000.00");
});

test("INR ₹10,00,000: 18% GST isolated, spread ties to ₹1,80,000.00", () => {
  const r = runCalculator({
    price: 1000000,
    currency: "INR",
    termMonths: 12,
    obligations: [ob("Onboarding services", 150000, "point_in_time"), ob("Cloud subscription", 900000)],
  });
  assert.equal(r.engineTotalCents, 100000000);
  assert.equal(r.schedule.at(-1).deferredCents, 0);
  assert.equal(r.gstTotalCents, 18000000);
  assert.equal(r.schedule.reduce((s, x) => s + x.gstCents, 0), 18000000);
  assert.equal(formatCents(r.gstTotalCents, "INR"), "₹1,80,000.00");
  // Engine function directly: one total, terminal period absorbs the remainder.
  const spread = spreadGstCents([33333, 33333, 33334], 18);
  assert.equal(spread.reduce((s, c) => s + c, 0), 18000);
});

test("validation and CSV", () => {
  const bad = validateCalcInput({ price: -1, currency: "USD", termMonths: 121, obligations: [ob("", 1.234)] });
  assert.ok(bad?.price && bad.termMonths && bad.rows[0].name && bad.rows[0].ssp);
  assert.equal(validateCalcInput({ price: 100000, currency: "USD", termMonths: 36, obligations: [ob("A", 1)] }), null);
  const csv = toCsv(runCalculator({ price: 100000, currency: "USD", termMonths: 3, obligations: [ob("A, B", 1)] }));
  assert.match(csv, /"A, B \(absorbs residual\)"/);
  assert.match(csv, /\nTotal,100000\.00,100000\.00,,0\.00$/);
});
