// SSP calculator "Email me this allocation" builder (lib/ssp/calculatorEmail.ts).
// Run: npm run test:tools
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

const { buildCalculatorEmail } = await import("../lib/ssp/calculatorEmail.ts");
const { runCalculator } = await import("../lib/ssp/calculator.ts");

const example = {
  price: 100000,
  currency: "USD",
  termMonths: 36,
  obligations: [
    { name: "Implementation", ssp: 30000, recognition: "point_in_time" },
    { name: "Training", ssp: 30000, recognition: "point_in_time" },
    { name: "Platform subscription", ssp: 120000, recognition: "ratable" },
  ],
};

test("recomputes on the server and matches the calculator exactly (no change to the maths)", () => {
  const out = buildCalculatorEmail(example);
  assert.ok(!("error" in out));
  const direct = runCalculator(example);
  assert.deepEqual(out.namedResult.allocations.map((a) => a.engineCents), direct.allocations.map((a) => a.engineCents));
  assert.equal(out.namedResult.engineTotalCents, 10000000);
  assert.equal(out.namedResult.schedule.at(-1).deferredCents, 0);
});

test("visitor copy carries no visitor-typed text (H4): obligations are numbered", () => {
  const evil = { ...example, obligations: example.obligations.map((o) => ({ ...o, name: "Click http://phish.example now" })) };
  const out = buildCalculatorEmail(evil);
  assert.ok(!("error" in out));
  assert.ok(!out.csv.includes("phish") && !out.summaryText.includes("phish"));
  assert.match(out.summaryText, /Obligation 1: weight/);
  assert.match(out.csv, /Obligation 3/);
  assert.match(out.summaryText, /Deferred revenue after month 36: \$0\.00\./);
  assert.equal(out.namedResult.allocations[0].name, "Click http://phish.example now"); // founder copy keeps names
});

test("ignores client-sent results; rejects malformed or invalid input", () => {
  const tampered = { ...example, allocations: [{ engineCents: 1 }], engineTotalCents: 1 };
  assert.equal(buildCalculatorEmail(tampered).namedResult.engineTotalCents, 10000000);
  assert.ok("error" in buildCalculatorEmail(null));
  assert.ok("error" in buildCalculatorEmail({ ...example, currency: "EUR" }));
  assert.ok("error" in buildCalculatorEmail({ ...example, obligations: [] }));
  assert.ok("error" in buildCalculatorEmail({ ...example, price: -5 }));
  assert.ok("error" in buildCalculatorEmail({ ...example, obligations: Array(11).fill(example.obligations[0]) }));
});
