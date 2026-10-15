/**
 * Page helpers for the public SSP Allocation & Residual-Cent Calculator.
 * All allocation and schedule arithmetic is delegated to ./fixedPointEngine (a copy of
 * smart_contracts/src/lib/soluqube/fixedPointEngine.ts). This file only adds the naive
 * line-by-line comparison, the month-by-month view, GST spreading and CSV export.
 * Pure functions, no network calls.
 */
import { calculateContractDAG, spreadGstCents } from "./fixedPointEngine";

export type CalcCurrency = "USD" | "INR";
export type CalcRecognition = "ratable" | "point_in_time";

export interface CalcObligation {
  name: string;
  ssp: number;
  recognition: CalcRecognition;
}

export interface CalcInput {
  price: number;
  currency: CalcCurrency;
  termMonths: number;
  obligations: CalcObligation[];
}

export interface CalcAllocationRow {
  name: string;
  recognition: CalcRecognition;
  ssp: number;
  /** Relative-SSP weight in percent, 4 decimals, half-up. */
  weightPct: number;
  /** Each line rounded to the cent on its own (what a spreadsheet usually does). */
  naiveCents: number;
  /** Engine allocation; the last obligation absorbs the residual cents. */
  engineCents: number;
}

export interface CalcScheduleRow {
  month: number;
  /** Recognised per obligation, in cents, same order as the input. */
  byObligationCents: number[];
  recognizedCents: number;
  cumulativeCents: number;
  deferredCents: number;
  gstCents: number;
}

export interface CalcResult {
  currency: CalcCurrency;
  termMonths: number;
  priceCents: number;
  totalSspCents: number;
  allocations: CalcAllocationRow[];
  naiveTotalCents: number;
  engineTotalCents: number;
  /** engineTotal − naiveTotal (what the absorbing obligation corrects). */
  residualCents: number;
  absorberIndex: number;
  /** Ratable lines rounded per month (round(alloc / term) × term) plus point-in-time lines. */
  naiveScheduleTotalCents: number;
  schedule: CalcScheduleRow[];
  gstRatePct: number;
  gstTotalCents: number;
}

export const GST_RATE_PCT = 18;
export const MAX_OBLIGATIONS = 10;
export const MAX_TERM_MONTHS = 120;

const toCents = (v: number) => Math.round(v * 100);
const hasMoreThanTwoDecimals = (v: number) => Math.abs(v * 100 - Math.round(v * 100)) > 1e-6;

export interface CalcErrors {
  price?: string;
  termMonths?: string;
  obligations?: string;
  rows: Array<{ name?: string; ssp?: string }>;
}

/** Plain-language inline validation. Returns null when the input is valid. */
export function validateCalcInput(input: CalcInput): CalcErrors | null {
  const errors: CalcErrors = { rows: input.obligations.map(() => ({})) };
  let bad = false;

  if (!Number.isFinite(input.price) || input.price <= 0) {
    errors.price = "Enter a transaction price greater than zero.";
    bad = true;
  } else if (hasMoreThanTwoDecimals(input.price)) {
    errors.price = "Use at most 2 decimal places.";
    bad = true;
  } else if (input.price > 1e12) {
    errors.price = "Enter a price up to 1,000,000,000,000.";
    bad = true;
  }

  if (!Number.isInteger(input.termMonths) || input.termMonths < 1 || input.termMonths > MAX_TERM_MONTHS) {
    errors.termMonths = `Enter a whole number of months from 1 to ${MAX_TERM_MONTHS}.`;
    bad = true;
  }

  if (input.obligations.length < 1 || input.obligations.length > MAX_OBLIGATIONS) {
    errors.obligations = `Add between 1 and ${MAX_OBLIGATIONS} performance obligations.`;
    bad = true;
  }

  let totalSsp = 0;
  input.obligations.forEach((o, i) => {
    if (!o.name.trim()) {
      errors.rows[i].name = "Name is required.";
      bad = true;
    }
    if (!Number.isFinite(o.ssp) || o.ssp < 0) {
      errors.rows[i].ssp = "Enter an SSP of zero or more.";
      bad = true;
    } else if (hasMoreThanTwoDecimals(o.ssp)) {
      errors.rows[i].ssp = "Use at most 2 decimal places.";
      bad = true;
    } else if (o.ssp > 1e12) {
      errors.rows[i].ssp = "Enter an SSP up to 1,000,000,000,000.";
      bad = true;
    } else {
      totalSsp += o.ssp;
    }
  });
  if (!errors.obligations && totalSsp <= 0 && errors.rows.every((r) => !r.ssp)) {
    errors.obligations = "At least one obligation needs an SSP above zero.";
    bad = true;
  }

  return bad ? errors : null;
}

/** Runs the fixed-point engine and builds the calculator view. Throws the engine's error on bad input. */
export function runCalculator(input: CalcInput): CalcResult {
  const { price, currency, termMonths, obligations } = input;

  const engine = calculateContractDAG({
    contractId: "calculator",
    customerName: "calculator",
    effectiveDate: "2026-01-01",
    currency,
    totalTransactionPrice: price,
    performanceObligations: obligations.map((o, i) => ({
      id: `pob_${i + 1}`,
      name: o.name,
      recType: o.recognition === "ratable" ? "ratable_monthly" : "point_in_time",
      sspAmount: o.ssp,
      termMonths: o.recognition === "ratable" ? termMonths : undefined,
      startMonth: 1,
    })),
  });

  const priceCents = toCents(price);
  const sspCents = obligations.map((o) => BigInt(toCents(o.ssp)));
  const totalSsp = sspCents.reduce((s, c) => s + c, BigInt(0));

  const allocations: CalcAllocationRow[] = obligations.map((o, i) => {
    // Naive: price × SSP / ΣSSP, rounded half-up to the cent, line by line.
    const naiveCents = Number((BigInt(priceCents) * sspCents[i] * BigInt(2) + totalSsp) / (totalSsp * BigInt(2)));
    const weightPct = Number((sspCents[i] * BigInt(2000000) + totalSsp) / (totalSsp * BigInt(2))) / 10000;
    return {
      name: o.name,
      recognition: o.recognition,
      ssp: o.ssp,
      weightPct,
      naiveCents,
      engineCents: toCents(engine.pobAllocations[i].allocatedAmount),
    };
  });

  const naiveTotalCents = allocations.reduce((s, a) => s + a.naiveCents, 0);
  const engineTotalCents = allocations.reduce((s, a) => s + a.engineCents, 0);

  const naiveScheduleTotalCents = allocations.reduce(
    (s, a) => s + (a.recognition === "ratable" ? Math.round(a.engineCents / termMonths) * termMonths : a.engineCents),
    0,
  );

  const byMonth: number[][] = Array.from({ length: termMonths }, () => obligations.map(() => 0));
  for (const p of engine.schedulePeriods) {
    const idx = Number(p.pobId.slice(4)) - 1;
    byMonth[p.periodIndex - 1][idx] += toCents(p.recognizedAmount);
  }
  const monthlyCents = byMonth.map((row) => row.reduce((s, c) => s + c, 0));
  const gstRatePct = currency === "INR" ? GST_RATE_PCT : 0;
  const gstCents = gstRatePct > 0 ? spreadGstCents(monthlyCents, gstRatePct) : monthlyCents.map(() => 0);

  let cumulative = 0;
  const schedule: CalcScheduleRow[] = byMonth.map((row, m) => {
    cumulative += monthlyCents[m];
    return {
      month: m + 1,
      byObligationCents: row,
      recognizedCents: monthlyCents[m],
      cumulativeCents: cumulative,
      deferredCents: priceCents - cumulative,
      gstCents: gstCents[m],
    };
  });

  return {
    currency,
    termMonths,
    priceCents,
    totalSspCents: Number(totalSsp),
    allocations,
    naiveTotalCents,
    engineTotalCents,
    residualCents: engineTotalCents - naiveTotalCents,
    absorberIndex: obligations.length - 1,
    naiveScheduleTotalCents,
    schedule,
    gstRatePct,
    gstTotalCents: gstCents.reduce((s, c) => s + c, 0),
  };
}

/** Formats integer cents as a fixed 2-decimal amount (en-US or en-IN lakh grouping). */
export function formatCents(cents: number, currency: CalcCurrency, withSymbol = true): string {
  const negative = cents < 0;
  const abs = Math.abs(cents);
  const whole = Math.floor(abs / 100);
  const frac = String(abs % 100).padStart(2, "0");
  const grouped = whole.toLocaleString(currency === "INR" ? "en-IN" : "en-US");
  const symbol = withSymbol ? (currency === "INR" ? "₹" : "$") : "";
  return `${negative ? "-" : ""}${symbol}${grouped}.${frac}`;
}

const plain = (cents: number) => (cents < 0 ? "-" : "") + `${Math.floor(Math.abs(cents) / 100)}.${String(Math.abs(cents) % 100).padStart(2, "0")}`;
const csvCell = (v: string) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);

/** CSV of the allocation and the full schedule (RFC 4180 quoting, amounts without grouping). */
export function toCsv(result: CalcResult): string {
  const lines: string[] = [];
  const cur = result.currency;
  lines.push(["Section", "Obligation", "Recognition", `SSP (${cur})`, "Weight %", `Naive rounded (${cur})`, `Engine allocation (${cur})`].join(","));
  result.allocations.forEach((a, i) => {
    lines.push(
      [
        "Allocation",
        csvCell(a.name + (i === result.absorberIndex ? " (absorbs residual)" : "")),
        a.recognition === "ratable" ? "Ratable" : "Point in time",
        plain(toCents(a.ssp)),
        a.weightPct.toFixed(4),
        plain(a.naiveCents),
        plain(a.engineCents),
      ].join(","),
    );
  });
  lines.push(["Allocation", "Total", "", plain(result.totalSspCents), "", plain(result.naiveTotalCents), plain(result.engineTotalCents)].join(","));
  lines.push("");
  const header = ["Month", ...result.allocations.map((a) => csvCell(a.name)), `Recognised (${cur})`, `Cumulative (${cur})`, `Deferred (${cur})`];
  if (result.gstRatePct > 0) header.push(`GST ${result.gstRatePct}% (${cur})`);
  lines.push(header.join(","));
  for (const r of result.schedule) {
    const row = [String(r.month), ...r.byObligationCents.map(plain), plain(r.recognizedCents), plain(r.cumulativeCents), plain(r.deferredCents)];
    if (result.gstRatePct > 0) row.push(plain(r.gstCents));
    lines.push(row.join(","));
  }
  const last = result.schedule[result.schedule.length - 1];
  const total = ["Total", ...result.allocations.map((a) => plain(a.engineCents)), plain(last ? last.cumulativeCents : 0), "", plain(last ? last.deferredCents : 0)];
  if (result.gstRatePct > 0) total.push(plain(result.gstTotalCents));
  lines.push(total.join(","));
  return lines.join("\n");
}
