"use client";

import React, { useMemo, useState } from "react";
import { Plus, Trash2, Copy, Check, ChevronDown, RotateCcw, ArrowUp } from "lucide-react";
import { track } from "@/lib/analytics";
import {
  CalcCurrency,
  CalcRecognition,
  CalcResult,
  MAX_OBLIGATIONS,
  MAX_TERM_MONTHS,
  formatCents,
  runCalculator,
  toCsv,
  validateCalcInput,
} from "@/lib/ssp/calculator";

interface Row {
  id: number;
  name: string;
  ssp: string;
  recognition: CalcRecognition;
}

const EXAMPLE_ROWS: Row[] = [
  { id: 1, name: "Implementation", ssp: "30000", recognition: "point_in_time" },
  { id: 2, name: "Training", ssp: "30000", recognition: "point_in_time" },
  { id: 3, name: "Platform subscription", ssp: "120000", recognition: "ratable" },
];

const parseAmount = (s: string) => (s.trim() === "" ? NaN : Number(s.replace(/,/g, "").trim()));

const inputCls = (err?: string) =>
  `w-full rounded-xl border px-3 py-2 text-sm font-mono text-slate-900 bg-white focus:outline-none focus:ring-2 ${
    err ? "border-rose-400 focus:ring-rose-200" : "border-slate-300 focus:ring-slate-200"
  }`;

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to the textarea fallback
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "-1000px";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

export default function SspCalculator() {
  const [price, setPrice] = useState("100000");
  const [currency, setCurrency] = useState<CalcCurrency>("USD");
  const [term, setTerm] = useState("36");
  const [rows, setRows] = useState<Row[]>(EXAMPLE_ROWS);
  const [nextId, setNextId] = useState(4);
  const [showSchedule, setShowSchedule] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

  const input = useMemo(
    () => ({
      price: parseAmount(price),
      currency,
      termMonths: term.trim() === "" ? NaN : Number(term),
      obligations: rows.map((r) => ({ name: r.name, ssp: parseAmount(r.ssp), recognition: r.recognition })),
    }),
    [price, currency, term, rows],
  );

  const errors = useMemo(() => validateCalcInput(input), [input]);

  const { result, engineError } = useMemo((): { result: CalcResult | null; engineError: string | null } => {
    if (errors) return { result: null, engineError: null };
    try {
      return { result: runCalculator(input), engineError: null };
    } catch (e) {
      return { result: null, engineError: e instanceof Error ? e.message : "The engine could not compute this input." };
    }
  }, [input, errors]);

  const fmt = (c: number) => formatCents(c, currency);
  const updateRow = (id: number, patch: Partial<Row>) => setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const addRow = () => {
    if (rows.length >= MAX_OBLIGATIONS) return;
    setRows((rs) => [...rs, { id: nextId, name: `Obligation ${rs.length + 1}`, ssp: "", recognition: "ratable" }]);
    setNextId((n) => n + 1);
  };

  const moveUp = (i: number) =>
    setRows((rs) => {
      if (i <= 0) return rs;
      const next = [...rs];
      [next[i - 1], next[i]] = [next[i], next[i - 1]];
      return next;
    });

  const loadExample = () => {
    setPrice("100000");
    setCurrency("USD");
    setTerm("36");
    setRows(EXAMPLE_ROWS);
    setNextId(4);
  };

  const onCopy = async () => {
    if (!result) return;
    const ok = await copyText(toCsv(result));
    setCopyState(ok ? "copied" : "failed");
    setTimeout(() => setCopyState("idle"), 2500);
  };

  const absorber = result ? result.allocations[result.absorberIndex] : null;
  const last = result ? result.schedule[result.schedule.length - 1] : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
      {/* Inputs */}
      <section className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm" aria-labelledby="calc-inputs">
        <div className="flex items-center justify-between mb-5">
          <h2 id="calc-inputs" className="text-lg font-bold text-slate-900">Contract inputs</h2>
          <button
            type="button"
            onClick={loadExample}
            className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold text-slate-500 hover:text-slate-900"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Load example
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <label htmlFor="price" className="block text-xs font-semibold text-slate-700 mb-1">
              Transaction price{currency === "INR" ? " (excl. GST)" : ""}
            </label>
            <input
              id="price"
              inputMode="decimal"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              aria-invalid={!!errors?.price}
              aria-describedby={errors?.price ? "price-err" : undefined}
              className={inputCls(errors?.price)}
            />
            {errors?.price && <p id="price-err" className="mt-1 text-[11px] text-rose-600">{errors.price}</p>}
          </div>
          <div>
            <label htmlFor="currency" className="block text-xs font-semibold text-slate-700 mb-1">Currency</label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as CalcCurrency)}
              className={inputCls()}
            >
              <option value="USD">USD</option>
              <option value="INR">INR</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="term" className="block text-xs font-semibold text-slate-700 mb-1">
            Term (months, 1–{MAX_TERM_MONTHS})
          </label>
          <input
            id="term"
            inputMode="numeric"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            aria-invalid={!!errors?.termMonths}
            aria-describedby={errors?.termMonths ? "term-err" : undefined}
            className={inputCls(errors?.termMonths)}
          />
          {errors?.termMonths && <p id="term-err" className="mt-1 text-[11px] text-rose-600">{errors.termMonths}</p>}
          {currency === "INR" && (
            <p className="mt-2 text-[11px] text-slate-500">
              18% GST is charged on top of this price, kept out of the transaction price and spread month by month as a liability.
            </p>
          )}
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-slate-700">
              Performance obligations ({rows.length}/{MAX_OBLIGATIONS})
            </h3>
          </div>
          <div className="space-y-3">
            {rows.map((r, i) => {
              const rowErr = errors?.rows[i];
              return (
                <div key={r.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-3">
                  <div className="flex items-start gap-2">
                    <div className="flex-1">
                      <label htmlFor={`name-${r.id}`} className="sr-only">Obligation {i + 1} name</label>
                      <input
                        id={`name-${r.id}`}
                        value={r.name}
                        onChange={(e) => updateRow(r.id, { name: e.target.value })}
                        placeholder="Obligation name"
                        aria-invalid={!!rowErr?.name}
                        className={`${inputCls(rowErr?.name)} font-sans`}
                      />
                      {rowErr?.name && <p className="mt-1 text-[11px] text-rose-600">{rowErr.name}</p>}
                    </div>
                    <button
                      type="button"
                      onClick={() => moveUp(i)}
                      disabled={i === 0}
                      aria-label={`Move obligation ${i + 1} up`}
                      className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-white disabled:opacity-30 disabled:hover:text-slate-400"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setRows((rs) => rs.filter((x) => x.id !== r.id))}
                      disabled={rows.length <= 1}
                      aria-label={`Remove obligation ${i + 1}`}
                      className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-white disabled:opacity-30 disabled:hover:text-slate-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <div>
                      <label htmlFor={`ssp-${r.id}`} className="block text-[11px] font-semibold text-slate-500 mb-1">SSP</label>
                      <input
                        id={`ssp-${r.id}`}
                        inputMode="decimal"
                        value={r.ssp}
                        onChange={(e) => updateRow(r.id, { ssp: e.target.value })}
                        placeholder="0.00"
                        aria-invalid={!!rowErr?.ssp}
                        className={inputCls(rowErr?.ssp)}
                      />
                      {rowErr?.ssp && <p className="mt-1 text-[11px] text-rose-600">{rowErr.ssp}</p>}
                    </div>
                    <div>
                      <label htmlFor={`rec-${r.id}`} className="block text-[11px] font-semibold text-slate-500 mb-1">Recognition</label>
                      <select
                        id={`rec-${r.id}`}
                        value={r.recognition}
                        onChange={(e) => updateRow(r.id, { recognition: e.target.value as CalcRecognition })}
                        className={`${inputCls()} font-sans`}
                      >
                        <option value="ratable">Ratable (monthly)</option>
                        <option value="point_in_time">Point in time (month 1)</option>
                      </select>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {errors?.obligations && <p className="mt-2 text-[11px] text-rose-600">{errors.obligations}</p>}
          <button
            type="button"
            onClick={addRow}
            disabled={rows.length >= MAX_OBLIGATIONS}
            className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 disabled:opacity-40"
          >
            <Plus className="w-3.5 h-3.5" />
            Add obligation
          </button>
          <p className="mt-3 text-[11px] text-slate-500 leading-relaxed">
            The last obligation in the list absorbs the residual cent. Use the arrow to reorder.
          </p>
        </div>
      </section>

      {/* Outputs */}
      <section className="lg:col-span-3 space-y-6" aria-labelledby="calc-results" aria-live="polite">
        <h2 id="calc-results" className="sr-only">Results</h2>

        {!result && (
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-7 text-sm text-slate-600">
            {engineError ? (
              <span className="text-rose-600">{engineError}</span>
            ) : (
              "Fix the highlighted inputs to see the allocation and schedule."
            )}
          </div>
        )}

        {result && absorber && last && (
          <>
            {/* Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white border border-slate-200 rounded-2xl p-4">
                <div className="text-[11px] font-mono text-slate-500 uppercase">Transaction price</div>
                <div className="mt-1 text-sm font-bold font-mono text-slate-900">{fmt(result.priceCents)}</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-4">
                <div className="text-[11px] font-mono text-slate-500 uppercase">Line-by-line rounding</div>
                <div className={`mt-1 text-sm font-bold font-mono ${result.naiveTotalCents === result.priceCents ? "text-slate-900" : "text-amber-700"}`}>
                  {fmt(result.naiveTotalCents)}
                </div>
              </div>
              <div className="bg-white border border-emerald-200 rounded-2xl p-4">
                <div className="text-[11px] font-mono text-emerald-700 uppercase">Engine total</div>
                <div className="mt-1 text-sm font-bold font-mono text-emerald-700">{fmt(result.engineTotalCents)}</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-4">
                <div className="text-[11px] font-mono text-slate-500 uppercase">Final deferred</div>
                <div className="mt-1 text-sm font-bold font-mono text-slate-900">{fmt(last.deferredCents)}</div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm text-slate-700 leading-relaxed">
              {result.residualCents === 0 ? (
                <>Rounding each line to the cent already sums to the transaction price, so no residual cent needs absorbing.</>
              ) : (
                <>
                  Rounding each line on its own gives {fmt(result.naiveTotalCents)}, which is{" "}
                  <strong>{fmt(Math.abs(result.residualCents))} {result.residualCents < 0 ? "over" : "under"}</strong> the
                  transaction price. The engine allocates every line except the last, then gives{" "}
                  <strong>{absorber.name || `obligation ${result.absorberIndex + 1}`}</strong> the remaining amount, so the
                  allocation sums to {fmt(result.engineTotalCents)}.
                </>
              )}
              {result.naiveScheduleTotalCents !== result.priceCents && (
                <>
                  {" "}Rounding each month on its own would recognise {fmt(result.naiveScheduleTotalCents)} over the term; the
                  schedule below gives the final month the leftover cents instead.
                </>
              )}
            </div>

            {/* Allocation table */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <h3 className="text-base font-bold text-slate-900">Relative-SSP allocation</h3>
                <button
                  type="button"
                  onClick={onCopy}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800"
                >
                  {copyState === "copied" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copyState === "copied" ? "Copied" : copyState === "failed" ? "Copy failed" : "Copy as CSV"}
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-left text-[11px] font-mono text-slate-500 uppercase border-b border-slate-200">
                      <th className="py-2 pr-3 font-semibold">Obligation</th>
                      <th className="py-2 pr-3 font-semibold text-right">SSP</th>
                      <th className="py-2 pr-3 font-semibold text-right">Weight</th>
                      <th className="py-2 pr-3 font-semibold text-right">Line-by-line</th>
                      <th className="py-2 font-semibold text-right">Engine</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono text-slate-800">
                    {result.allocations.map((a, i) => (
                      <tr key={i} className={`border-b border-slate-100 ${i === result.absorberIndex && result.residualCents !== 0 ? "bg-emerald-50/60" : ""}`}>
                        <td className="py-2 pr-3 font-sans">
                          <div className="font-semibold text-slate-900">{a.name}</div>
                          <div className="text-[11px] text-slate-500">
                            {a.recognition === "ratable" ? `Ratable, ${result.termMonths} mo` : "Point in time"}
                            {i === result.absorberIndex && " · absorbs residual"}
                          </div>
                        </td>
                        <td className="py-2 pr-3 text-right whitespace-nowrap">{fmt(Math.round(a.ssp * 100))}</td>
                        <td className="py-2 pr-3 text-right whitespace-nowrap">{a.weightPct.toFixed(4)}%</td>
                        <td className="py-2 pr-3 text-right whitespace-nowrap">{fmt(a.naiveCents)}</td>
                        <td className="py-2 text-right whitespace-nowrap font-semibold">
                          {fmt(a.engineCents)}
                          {a.engineCents !== a.naiveCents && (
                            <div className="text-[11px] text-emerald-700 font-normal">
                              {a.engineCents - a.naiveCents > 0 ? "+" : "-"}
                              {fmt(Math.abs(a.engineCents - a.naiveCents))}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="font-mono">
                    <tr className="text-slate-900 font-bold">
                      <td className="py-2 pr-3 font-sans">Total</td>
                      <td className="py-2 pr-3 text-right whitespace-nowrap">{fmt(result.totalSspCents)}</td>
                      <td className="py-2 pr-3 text-right"></td>
                      <td className={`py-2 pr-3 text-right whitespace-nowrap ${result.residualCents !== 0 ? "text-amber-700" : ""}`}>
                        {fmt(result.naiveTotalCents)}
                      </td>
                      <td className="py-2 text-right whitespace-nowrap text-emerald-700">{fmt(result.engineTotalCents)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <p className="mt-3 text-[11px] text-slate-500">
                Weights shown to 4 decimals. Allocation: transaction price × SSP ÷ total SSP, in integer arithmetic at 10^6
                scale, rounded to cents.
              </p>
            </div>

            {/* GST */}
            {result.gstRatePct > 0 && (
              <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm">
                <h3 className="text-base font-bold text-slate-900">Ind AS 115: 18% GST isolated</h3>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div>
                    <div className="text-[11px] font-mono text-slate-500 uppercase">Transaction price (revenue)</div>
                    <div className="font-mono font-bold text-slate-900">{fmt(result.priceCents)}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-500 uppercase">GST liability (18%)</div>
                    <div className="font-mono font-bold text-slate-900">{fmt(result.gstTotalCents)}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-500 uppercase">Gross invoiced</div>
                    <div className="font-mono font-bold text-slate-900">{fmt(result.priceCents + result.gstTotalCents)}</div>
                  </div>
                </div>
                <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                  GST is collected on behalf of the government, so it is not part of the transaction price. It is computed once
                  on the total, spread across the months in proportion to revenue, and the final month absorbs the remainder, so
                  the GST column sums to exactly {fmt(result.gstTotalCents)}.
                </p>
              </div>
            )}

            {/* Schedule */}
            <div className="bg-white border border-slate-200 rounded-3xl shadow-sm">
              <button
                type="button"
                onClick={() => setShowSchedule((s) => !s)}
                aria-expanded={showSchedule}
                aria-controls="schedule-table"
                className="w-full flex items-center justify-between gap-3 p-5 sm:p-6 text-left"
              >
                <div>
                  <h3 className="text-base font-bold text-slate-900">Monthly schedule ({result.termMonths} months)</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Recognised {fmt(last.cumulativeCents)} · deferred at month {result.termMonths}: {fmt(last.deferredCents)}
                  </p>
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${showSchedule ? "rotate-180" : ""}`} />
              </button>
              {showSchedule && (
                <div id="schedule-table" className="px-5 sm:px-6 pb-6 overflow-x-auto">
                  <table className="w-full text-xs font-mono">
                    <thead>
                      <tr className="text-left text-[11px] text-slate-500 uppercase border-b border-slate-200">
                        <th className="py-2 pr-3 font-semibold">Month</th>
                        {result.allocations.map((a, i) => (
                          <th key={i} className="py-2 pr-3 font-semibold text-right font-sans normal-case whitespace-nowrap">{a.name}</th>
                        ))}
                        <th className="py-2 pr-3 font-semibold text-right">Recognised</th>
                        <th className="py-2 pr-3 font-semibold text-right">Cumulative</th>
                        <th className="py-2 pr-3 font-semibold text-right">Deferred</th>
                        {result.gstRatePct > 0 && <th className="py-2 font-semibold text-right">GST 18%</th>}
                      </tr>
                    </thead>
                    <tbody className="text-slate-800">
                      {result.schedule.map((r) => (
                        <tr key={r.month} className={`border-b border-slate-100 ${r.month === result.termMonths ? "bg-emerald-50/60 font-semibold" : ""}`}>
                          <td className="py-1.5 pr-3">{r.month}</td>
                          {r.byObligationCents.map((c, i) => (
                            <td key={i} className="py-1.5 pr-3 text-right whitespace-nowrap">{formatCents(c, currency, false)}</td>
                          ))}
                          <td className="py-1.5 pr-3 text-right whitespace-nowrap">{formatCents(r.recognizedCents, currency, false)}</td>
                          <td className="py-1.5 pr-3 text-right whitespace-nowrap">{formatCents(r.cumulativeCents, currency, false)}</td>
                          <td className="py-1.5 pr-3 text-right whitespace-nowrap">{formatCents(r.deferredCents, currency, false)}</td>
                          {result.gstRatePct > 0 && (
                            <td className="py-1.5 text-right whitespace-nowrap">{formatCents(r.gstCents, currency, false)}</td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="font-bold text-slate-900">
                        <td className="py-2 pr-3 font-sans">Total</td>
                        {result.allocations.map((a, i) => (
                          <td key={i} className="py-2 pr-3 text-right whitespace-nowrap">{formatCents(a.engineCents, currency, false)}</td>
                        ))}
                        <td className="py-2 pr-3 text-right whitespace-nowrap">{formatCents(last.cumulativeCents, currency, false)}</td>
                        <td className="py-2 pr-3"></td>
                        <td className="py-2 pr-3 text-right whitespace-nowrap text-emerald-700">{formatCents(last.deferredCents, currency, false)}</td>
                        {result.gstRatePct > 0 && (
                          <td className="py-2 text-right whitespace-nowrap">{formatCents(result.gstTotalCents, currency, false)}</td>
                        )}
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </div>
            <p className="text-[11px] font-mono text-slate-500">
              Computed in your browser. Nothing you enter is sent anywhere unless you use &ldquo;Email me this allocation&rdquo; below.
            </p>
            <EmailAllocation input={input} />
          </>
        )}
      </section>
    </div>
  );
}

// Optional lead step: emails the allocation (recomputed on the server) via the existing /api/contact route.
function EmailAllocation({ input }: { input: { price: number; currency: CalcCurrency; termMonths: number; obligations: { name: string; ssp: number; recognition: CalcRecognition }[] } }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !company.trim()) {
      setError("Name, work email and company are required.");
      setState("error");
      return;
    }
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: name,
          email,
          company,
          help: "SSP calculator: email me this allocation",
          calculator: input,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error(data.error || "Could not send the email. Please try again.");
      track("calculator_email", { form: "ssp_calculator" });
      setState("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send the email. Please try again.");
      setState("error");
    }
  };

  if (state === "sent") {
    return (
      <div id="calc-email-sent" className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
        Sent. Check {email} for the allocation and the CSV workbook (opens in Excel).
      </div>
    );
  }
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
      {!open ? (
        <button
          type="button"
          id="calc-email-open"
          onClick={() => setOpen(true)}
          className="text-sm font-semibold text-slate-900 underline underline-offset-4 hover:text-slate-700"
        >
          Email me this allocation as a workbook (optional)
        </button>
      ) : (
        <form onSubmit={submit} className="space-y-3" id="calc-email-form">
          <div className="text-sm font-semibold text-slate-900">Email me this allocation as a workbook</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input className={inputCls()} placeholder="Your name" aria-label="Your name" value={name} onChange={(e) => setName(e.target.value)} maxLength={200} />
            <input className={inputCls()} type="email" placeholder="Work email" aria-label="Work email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={320} />
            <input className={inputCls()} placeholder="Company" aria-label="Company" value={company} onChange={(e) => setCompany(e.target.value)} maxLength={200} />
          </div>
          <p className="text-[11px] text-slate-500">
            We email you the allocation and a CSV schedule, and keep your name, email and company so the founder can follow up.
            Obligation names you typed are not included in the email to you. See our{" "}
            <a href="/privacy" className="underline">Privacy Policy</a>.
          </p>
          {state === "error" && <p className="text-xs text-rose-700" role="alert">{error}</p>}
          <button
            type="submit"
            disabled={state === "sending"}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
          >
            {state === "sending" ? "Sending…" : "Email it to me"}
          </button>
        </form>
      )}
    </div>
  );
}
