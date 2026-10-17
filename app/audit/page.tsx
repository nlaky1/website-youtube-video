"use client";
import { track } from "@/lib/analytics";

import React, { useState, useId } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { 
  ShieldCheck, 
  AlertTriangle, 
  Calculator, 
  CheckCircle2, 
  ChevronRight, 
  Layers, 
  ArrowRight, 
  FileSpreadsheet, 
  Sparkles,
  Lock,
  Building2,
  Mail,
  User,
  Send
} from "lucide-react";

export default function AuditSimulatorPage() {
  const contractValueId = useId();
  const termMonthsId = useId();
  const nameId = useId();
  const emailId = useId();
  const companyId = useId();
  const erpId = useId();
  const messiestContractId = useId();

  // Simulator State
  const [contractValue, setContractValue] = useState<number>(100000);
  const [termMonths, setTermMonths] = useState<number>(36);

  // Form & Checkout State
  const [auditTier, setAuditTier] = useState<"free" | "paid_499">("free");
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formCompany, setFormCompany] = useState("");
  const [formErp, setFormErp] = useState("NetSuite");
  const [formNotes, setFormNotes] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [isPaidSuccess, setIsPaidSuccess] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  // Check URL params for Stripe redirection status
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("status") === "success") {
        setIsPaidSuccess(true);
        setSessionId(params.get("session_id"));
      }
    }
  }, []);

  // Math Calculations
  // 1. Per-period rounding: every month rounded to the cent, no final true-up
  const monthlyIdeal = contractValue / termMonths;
  const monthlyFloatRounded = Math.round(monthlyIdeal * 100) / 100;
  const totalRecognizedFloat = monthlyFloatRounded * termMonths;
  const accumulatedFloatDrift = Math.abs(contractValue - totalRecognizedFloat).toFixed(2);

  // 2. Soluqube: months 1..n-1 truncated to the cent, the final month absorbs the remainder
  const contractCents = Math.round(contractValue * 100);
  const soluqubeRegularCents = Math.floor(contractCents / termMonths);
  const soluqubeMonthly = (soluqubeRegularCents / 100).toFixed(2);
  const soluqubeTerminal = ((contractCents - soluqubeRegularCents * (termMonths - 1)) / 100).toFixed(2);
  const soluqubeDrift = "0.00";

  const handleSubmitAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formEmail || !formName) return;

    setIsSubmitting(true);
    setCheckoutError(null);

    // Paid tier: no self-serve checkout yet. Log the request, then send the buyer to book a walkthrough.
    if (auditTier === "paid_499") {
      try {
        await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formName,
            email: formEmail,
            company: formCompany,
            brand: "soluqube",
            erp: formErp,
            message: `Interested in the $499 per-contract workbook for ${formCompany}. Primary ERP: ${formErp}. Scope Notes: ${formNotes}`
          }),
        });
      } catch {
        // best effort; the booking page captures the details again
      }
      window.location.href = "https://soluqube.com/book-demo";
      return;
    }

    // Free Tier submission
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formName,
          email: formEmail,
          company: formCompany,
          help: "Free 3-Contract Audit-Defense Workpaper (/audit)",
          info: `Requested Free 3-Contract Audit-Defense Workpaper for ${formCompany}. Primary ERP: ${formErp}. Scope Notes: ${formNotes}`
        }),
      });
      if (res.ok) track("generate_lead", { form: "audit_workpaper" });
      setFormSubmitted(true);
    } catch {
      setFormSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 flex flex-col antialiased selection:bg-slate-900 selection:text-white">
      <Navbar />

      {/* HEADER */}
      <section className="border-b border-slate-200 bg-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <Link href="/" className="hover:text-slate-900">Soluqube</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-900 font-semibold">ASC 606 Schedule Simulator</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive ASC 606 Schedule Simulator</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 max-w-4xl">
            Defensible Revenue Allocation, Tied to the Cent.
          </h1>
          <p className="text-slate-600 text-base max-w-3xl leading-relaxed">
            When your auditor questions a standalone selling price allocation or a contract amendment, Soluqube produces the deterministic allocation, the full-term schedule that ties to $0.00, and a hashed evidence workpaper — integer arithmetic under ASC 606 and Ind AS 115, not a spreadsheet.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 w-full">
        {/* SIMULATOR GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* CONTROLS (Left 5 Cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
              <Calculator className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-slate-900">Contract Parameters</h2>
            </div>

            {/* Slider 1: Contract Value */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <label htmlFor={contractValueId} className="text-slate-700">Total Contract Value</label>
                <span className="font-mono text-indigo-600 text-base">${contractValue.toLocaleString()}</span>
              </div>
              <input 
                id={contractValueId}
                type="range" 
                min="10000" 
                max="500000" 
                step="5000"
                value={contractValue}
                onChange={(e) => setContractValue(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-600 font-mono">
                <span>$10,000</span>
                <span>$250,000</span>
                <span>$500,000</span>
              </div>
            </div>

            {/* Slider 2: Term in Months */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <label htmlFor={termMonthsId} className="text-slate-700">Amortization Term</label>
                <span className="font-mono text-indigo-600 text-base">{termMonths} Months</span>
              </div>
              <input 
                id={termMonthsId}
                type="range" 
                min="12" 
                max="60" 
                step="6"
                value={termMonths}
                onChange={(e) => setTermMonths(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-600 font-mono">
                <span>12 mo (1 yr)</span>
                <span>36 mo (3 yr)</span>
                <span>60 mo (5 yr)</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
              <div className="font-semibold text-slate-800">Deterministic Model:</div>
              <p>Terminal-period remainder absorption means any fractional cents are absorbed into the final period, keeping cumulative recognized revenue identical to total consideration.</p>
            </div>
          </div>

          {/* DIAGNOSTIC RESULTS (Right 7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* COMPARISON CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Card 1: Standard ERP / Excel */}
              <div className="p-6 rounded-2xl bg-white border border-rose-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider font-bold text-rose-600">Per-period rounding</span>
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                </div>
                <div>
                  <div className="text-2xl font-black text-rose-600 font-mono">
                    ${accumulatedFloatDrift}
                  </div>
                  <div className="text-xs text-slate-600 mt-1 font-semibold">
                    Residual left in deferred revenue
                  </div>
                </div>
                <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex justify-between">
                    <span>Terminal Remainder:</span>
                    <span className="text-rose-600">Not absorbed</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Soluqube Engine */}
              <div className="p-6 rounded-2xl bg-white border border-emerald-300 shadow-xs space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-3 py-0.5 rounded-bl-lg font-mono">
                  AUDIT-READY EVIDENCE
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider font-bold text-emerald-700">Soluqube BigInt Engine</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <div className="text-2xl font-black text-emerald-600 font-mono">
                    ${soluqubeDrift}
                  </div>
                  <div className="text-xs text-slate-600 mt-1 font-semibold">
                    Ending deferred: ties to the cent
                  </div>
                </div>
                <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex justify-between">
                    <span>Arithmetic:</span>
                    <span className="font-mono text-emerald-700 font-semibold">BigInt Scaled Fixed</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Audit Defense:</span>
                    <span className="font-semibold text-emerald-700">Built for audit review</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (INR contracts only):</span>
                    <span className="text-emerald-700 font-semibold">18% isolated before allocation</span>
                  </div>
                </div>
              </div>

            </div>

            {/* WATERFALL BREAKDOWN PREVIEW */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">{termMonths}-Month Ratable Schedule Trace</h3>
                <span className="text-xs font-mono text-slate-600">Base Monthly: ${soluqubeMonthly}/mo</span>
              </div>

              <div className="overflow-x-auto text-xs font-mono">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-600">
                      <th className="py-2">Period</th>
                      <th className="py-2">Per-period rounding</th>
                      <th className="py-2">Soluqube BigInt</th>
                      <th className="py-2 text-right">Ending deferred</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="py-2 text-slate-900 font-semibold">Month 1</td>
                      <td className="py-2">${monthlyFloatRounded.toFixed(2)}</td>
                      <td className="py-2 text-emerald-700 font-semibold">${soluqubeMonthly}</td>
                      <td className="py-2 text-right text-slate-500">—</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-slate-900 font-semibold">Month 18 (Mid-Term)</td>
                      <td className="py-2">${monthlyFloatRounded.toFixed(2)}</td>
                      <td className="py-2 text-emerald-700 font-semibold">${soluqubeMonthly}</td>
                      <td className="py-2 text-right text-slate-500">—</td>
                    </tr>
                    <tr className="bg-slate-50 font-bold">
                      <td className="py-2 text-slate-900">Month {termMonths} (Terminal)</td>
                      <td className="py-2">${monthlyFloatRounded.toFixed(2)} <span className="text-rose-600">(residual ${accumulatedFloatDrift})</span></td>
                      <td className="py-2 text-emerald-700">${soluqubeTerminal} <span className="text-xs text-emerald-600">(absorbs remainder)</span></td>
                      <td className="py-2 text-right text-emerald-700">$0.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>

        {/* INTAKE SECTION: DUAL-TIER FREE AUDIT & $499 INSTANT WORKPAPER PACKAGE */}
        <section id="audit-intake" className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 shadow-xl border border-slate-800">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-mono font-semibold uppercase tracking-wider border border-indigo-500/30">
                Audit Defense Intake
              </span>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                Request a Free 3-Contract Audit-Defense Workpaper
              </h2>
              <p className="text-slate-400 text-sm max-w-xl mx-auto">
                Send your three hardest contracts. You receive the SSP allocation, the schedule that ties to the cent, and a hashed evidence workpaper, delivered within 48 hours.
              </p>
            </div>

            {/* PAID SUCCESS BANNER */}
            {isPaidSuccess ? (
              <div className="p-8 rounded-2xl bg-emerald-950/70 border border-emerald-500/50 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">Payment received</span>
                  <h3 className="text-2xl font-bold text-white">Priority Audit Package Unlocked!</h3>
                </div>
                <p className="text-emerald-200/90 text-sm max-w-lg mx-auto">
                  Your transaction has completed successfully. Our BigInt engine is processing your contract schedules. Your audit-ready workpaper package (schedule, source clauses, calculation log) will be emailed within 1 business day.
                </p>
                {sessionId && (
                  <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700 text-xs font-mono text-slate-400 max-w-md mx-auto">
                    Session Reference: <span className="text-emerald-400">{sessionId}</span>
                  </div>
                )}
                <div className="pt-2">
                  <Link 
                    href="/asc-606"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors"
                  >
                    <span>View ASC 606 Knowledge Hub</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ) : formSubmitted ? (
              <div className="p-8 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-xl font-bold text-white">Audit Request Received!</h3>
                <p className="text-emerald-200 text-sm max-w-md mx-auto">
                  Thank you, {formName}. Nikhil, Soluqube's founder, will reach out directly at <span className="font-mono underline">{formEmail}</span> to coordinate your contract tie-out package.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitAudit} className="space-y-6">
                
                {/* OFFER */}
                <div className="grid grid-cols-1 gap-4">
                  <div 
                    onClick={() => setAuditTier("free")}
                    className={`cursor-pointer rounded-2xl p-5 border transition-all text-left relative ${
                      auditTier === "free" 
                        ? "bg-slate-800 border-slate-400 shadow-md ring-2 ring-slate-400/20" 
                        : "bg-slate-800/40 border-slate-700/70 hover:border-slate-600"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${auditTier === "free" ? "border-slate-300 bg-slate-300" : "border-slate-500"}`}>
                        {auditTier === "free" && <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />}
                      </div>
                      <h4 className="font-bold text-white text-base">Free 3-Contract Audit-Defense Workpaper</h4>
                    </div>
                    <div className="flex items-baseline gap-1.5 mb-2">
                      <span className="text-2xl font-black text-white">Free</span>
                      <span className="text-xs text-slate-400">/ up to 3 contracts</span>
                    </div>
                    <ul className="text-xs text-slate-300 space-y-1.5 pt-1">
                      <li className="flex items-center gap-1.5 text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                        <span>Delivered within 48 hours</span>
                      </li>
                      <li className="flex items-center gap-1.5 text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                        <span>SSP allocation and full-term schedule</span>
                      </li>
                      <li className="flex items-center gap-1.5 text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                        <span>Hashed evidence workpaper</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {checkoutError && (
                  <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs">
                    {checkoutError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor={nameId} className="text-xs font-semibold text-slate-300">Your Name *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                      <input 
                        id={nameId}
                        type="text" 
                        required
                        placeholder="e.g., Sarah Jenkins"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full bg-slate-800/80 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor={emailId} className="text-xs font-semibold text-slate-300">Corporate Email *</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                      <input 
                        id={emailId}
                        type="email" 
                        required
                        placeholder="sjenkins@company.com"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        className="w-full bg-slate-800/80 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor={companyId} className="text-xs font-semibold text-slate-300">Company / Firm Name *</label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                      <input 
                        id={companyId}
                        type="text" 
                        required
                        placeholder="e.g., Acme Cloud Inc."
                        value={formCompany}
                        onChange={(e) => setFormCompany(e.target.value)}
                        className="w-full bg-slate-800/80 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor={erpId} className="text-xs font-semibold text-slate-300">Primary Accounting System</label>
                    <select 
                      id={erpId}
                      value={formErp}
                      onChange={(e) => setFormErp(e.target.value)}
                      className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-hidden focus:border-indigo-500"
                    >
                      <option value="NetSuite">NetSuite ARM / NetSuite ERP</option>
                      <option value="QuickBooks">QuickBooks Online / Desktop</option>
                      <option value="Sage Intacct">Sage Intacct Contract Revenue</option>
                      <option value="Excel Spreadsheets">Manual Excel / Sheets Workpapers</option>
                      <option value="Workday">Workday Financials</option>
                      <option value="Other">Other / Custom Billing Engine</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor={messiestContractId} className="text-xs font-semibold text-slate-300">Messiest Contract Profile (Optional Notes)</label>
                  <textarea 
                    id={messiestContractId}
                    rows={2}
                    placeholder="e.g., 3-year agreement with custom milestone ramps and quarterly support fees..."
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value)}
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full mt-3 py-3.5 px-6 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg disabled:opacity-50 ${
                    auditTier === "paid_499"
                      ? "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30 ring-2 ring-indigo-400/50"
                      : "bg-slate-700 hover:bg-slate-600 shadow-slate-900/50"
                  }`}
                >
                  {isSubmitting ? (
                    <span>Processing Request...</span>
                  ) : auditTier === "paid_499" ? (
                    <>
                      <Sparkles className="w-4 h-4 text-indigo-300" />
                      <span>Book a walkthrough</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Request the Free Workpaper</span>
                    </>
                  )}
                </button>

                <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2 pt-1 border-t border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Encrypted in transit (HTTPS). Mutual NDA on request.</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <span>No payment is taken on this page</span>
                    <span>•</span>
                    <span>Hashed, Re-runnable Evidence Workpaper</span>
                  </div>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
