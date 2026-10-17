// Server-side builder for the SSP calculator's "Email me this allocation" step.
// The result is recomputed from the raw inputs (client-sent results are never trusted). The copy that goes to the
// visitor carries no visitor-typed text: obligations are labelled "Obligation 1..n" (security review H4: the
// autoresponder must not relay user-supplied content). The founder's copy keeps the typed names, HTML-escaped.
import type { CalcCurrency, CalcInput, CalcRecognition, CalcResult } from "./calculator";
import { MAX_OBLIGATIONS, formatCents, runCalculator, toCsv, validateCalcInput } from "./calculator";

export interface CalculatorEmail {
  csv: string;
  summaryText: string;
  namedResult: CalcResult;
}

const num = (v: unknown) => (typeof v === "number" ? v : typeof v === "string" && v.trim() !== "" ? Number(v) : NaN);

export function parseCalculatorInput(raw: unknown): CalcInput | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const currency = r.currency === "USD" || r.currency === "INR" ? (r.currency as CalcCurrency) : null;
  if (!currency || !Array.isArray(r.obligations) || r.obligations.length === 0 || r.obligations.length > MAX_OBLIGATIONS) return null;
  const obligations = r.obligations.map((o) => {
    const ob = (o && typeof o === "object" ? o : {}) as Record<string, unknown>;
    const recognition: CalcRecognition = ob.recognition === "point_in_time" ? "point_in_time" : "ratable";
    return { name: String(ob.name ?? "").replace(/[\r\n]+/g, " ").slice(0, 80), ssp: num(ob.ssp), recognition };
  });
  return { price: num(r.price), currency, termMonths: num(r.termMonths), obligations };
}

export function buildCalculatorEmail(raw: unknown): CalculatorEmail | { error: string } {
  const input = parseCalculatorInput(raw);
  if (!input) return { error: "Calculator inputs are missing or malformed." };
  if (validateCalcInput(input)) return { error: "Calculator inputs are invalid. Fix the highlighted fields and try again." };
  let namedResult: CalcResult;
  let anonResult: CalcResult;
  try {
    namedResult = runCalculator(input);
    anonResult = runCalculator({ ...input, obligations: input.obligations.map((o, i) => ({ ...o, name: `Obligation ${i + 1}` })) });
  } catch {
    return { error: "The engine could not compute this input." };
  }
  const cur = anonResult.currency;
  const last = anonResult.schedule[anonResult.schedule.length - 1];
  const summaryText = [
    `Transaction price: ${formatCents(anonResult.priceCents, cur)} over ${anonResult.termMonths} months (${cur}).`,
    "",
    "Relative-SSP allocation:",
    ...anonResult.allocations.map(
      (a, i) =>
        `  ${a.name}: weight ${a.weightPct.toFixed(4)}%, allocated ${formatCents(a.engineCents, cur)}` +
        (i === anonResult.absorberIndex ? " (absorbs the residual cent)" : ""),
    ),
    `  Total allocated: ${formatCents(anonResult.engineTotalCents, cur)}`,
    "",
    `Deferred revenue after month ${last.month}: ${formatCents(last.deferredCents, cur)}.`,
  ].join("\n");
  return { csv: toCsv(anonResult), summaryText, namedResult };
}
