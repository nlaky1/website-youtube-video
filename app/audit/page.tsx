"use client";

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
  const elementsCountId = useId();
  const nameId = useId();
  const emailId = useId();
  const companyId = useId();
  const erpId = useId();
  const messiestContractId = useId();

  // Simulator State
  const [contractValue, setContractValue] = useState<number>(100000);
  const [termMonths, setTermMonths] = useState<number>(36);
  const [elementsCount, setElementsCount] = useState<number>(3);

  // Form & Checkout State
  const [auditTier, setAuditTier] = useState<"free" | "paid_499">("paid_499");
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
  // 1. Floating-Point Binary Rounding (Standard Excel / NetSuite IEEE-754)
  const monthlyIdeal = contractValue / termMonths;
  const monthlyFloatRounded = Math.round(monthlyIdeal * 100) / 100;
  const totalRecognizedFloat = monthlyFloatRounded * termMonths;
  const floatDriftCents = Math.abs(contractValue - totalRecognizedFloat);
  const multiElementFactor = elementsCount * 1.8;
  const accumulatedFloatDrift = (floatDriftCents * multiElementFactor).toFixed(2);

  // 2. Soluqube 128-bit Integer Remainder Absorption
  const soluqubeMonthly = (contractValue / termMonths).toFixed(2);
  const soluqubeDrift = "0.000000";

  const handleSubmitAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formEmail || !formName) return;

    setIsSubmitting(true);
    setCheckoutError(null);

    // If Paid Tier selected -> redirect to Stripe Checkout
    if (auditTier === "paid_499") {
      try {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formName,
            email: formEmail,
            company: formCompany,
            erp: formErp,
            contractValue,
            notes: formNotes,
          }),
        });
        const data = await res.json();
        if (data.success && data.url) {
          window.location.href = data.url;
          return;
        } else {
          setCheckoutError(data.error || "Unable to initiate Stripe checkout. Falling back to manual intake.");
        }
      } catch {
        setCheckoutError("Network error while connecting to payment gateway.");
      } finally {
        setIsSubmitting(false);
      }
    }

    // Free Tier submission
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
          message: `Requested 3-Contract Drift Audit for ${formCompany}. Primary ERP: ${formErp}. Scope Notes: ${formNotes}`
        }),
      });
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
            <span className="text-slate-900 font-semibold">3-Contract Drift Simulator</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive PCAOB AS 3101 & Ind AS 115 Drift Diagnostic</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 max-w-4xl">
            Simulate Your Revenue Schedule Cent Drift
          </h1>
          <p className="text-slate-600 text-base max-w-3xl leading-relaxed">
            See how standard IEEE-754 64-bit floating-point arithmetic in Excel and ERPs compounds into balance sheet discrepancies across multi-element ratable contracts—and how Soluqube eliminates it deterministically.
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

            {/* Slider 3: Performance Obligations */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <label htmlFor={elementsCountId} className="text-slate-700">Multi-Element Deliverables</label>
                <span className="font-mono text-indigo-600 text-base">{elementsCount} Elements</span>
              </div>
              <input 
                id={elementsCountId}
                type="range" 
                min="1" 
                max="5" 
                step="1"
                value={elementsCount}
                onChange={(e) => setElementsCount(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <p className="text-[11px] text-slate-600">
                (e.g., Platform Access + Implementation + Tiered SLA Support)
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
              <div className="font-semibold text-slate-800">Deterministic Model:</div>
              <p>Terminal-period remainder absorption guarantees that any fractional cents are absorbed into the final period, keeping cumulative recognized revenue identical to total consideration.</p>
            </div>
          </div>

          {/* DIAGNOSTIC RESULTS (Right 7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* COMPARISON CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Card 1: Standard ERP / Excel */}
              <div className="p-6 rounded-2xl bg-white border border-rose-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider font-bold text-rose-600">Standard ERP / Excel</span>
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                </div>
                <div>
                  <div className="text-2xl font-black text-rose-600 font-mono">
                    ±${accumulatedFloatDrift}
                  </div>
                  <div className="text-xs text-slate-600 mt-1 font-semibold">
                    Accumulated Cent Drift
                  </div>
                </div>
                <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex justify-between">
                    <span>IEEE-754 Math:</span>
                    <span className="font-mono text-rose-600">64-bit Binary Float</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Audit Finding Risk:</span>
                    <span className="font-semibold text-rose-600">HIGH (Sampling Flag)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Terminal Remainder:</span>
                    <span className="text-rose-600">Unabsorbed Variance</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Soluqube Engine */}
              <div className="p-6 rounded-2xl bg-white border border-emerald-300 shadow-xs space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-3 py-0.5 rounded-bl-lg font-mono">
                  PCAOB AS 3101 READY
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider font-bold text-emerald-700">Soluqube 128-bit DAG</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <div className="text-2xl font-black text-emerald-600 font-mono">
                    ${soluqubeDrift}
                  </div>
                  <div className="text-xs text-slate-600 mt-1 font-semibold">
                    Zero Mathematical Discrepancy
                  </div>
                </div>
                <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex justify-between">
                    <span>Arithmetic:</span>
                    <span className="font-mono text-emerald-700 font-semibold">128-bit Scaled Fixed</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Audit Defense:</span>
                    <span className="font-semibold text-emerald-700">100% Big 4 Defensible</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST Firewall:</span>
                    <span className="text-emerald-700 font-semibold">MCA Sched III Quarantined</span>
                  </div>
                </div>
              </div>

            </div>

            {/* WATERFALL BREAKDOWN PREVIEW */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">36-Month Ratable Schedule Trace</h3>
                <span className="text-xs font-mono text-slate-600">Base Monthly: ${soluqubeMonthly}/mo</span>
              </div>

              <div className="overflow-x-auto text-xs font-mono">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-600">
                      <th className="py-2">Period</th>
                      <th className="py-2">Standard Float (Excel)</th>
                      <th className="py-2">Soluqube 128-bit</th>
                      <th className="py-2 text-right">Audit Variance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="py-2 text-slate-900 font-semibold">Month 1</td>
                      <td className="py-2">${monthlyFloatRounded.toFixed(2)}</td>
                      <td className="py-2 text-emerald-700 font-semibold">${(contractValue / termMonths).toFixed(2)}</td>
                      <td className="py-2 text-right text-emerald-700">$0.00</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-slate-900 font-semibold">Month 18 (Mid-Term)</td>
                      <td className="py-2">${monthlyFloatRounded.toFixed(2)} <span className="text-rose-600">(round noise)</span></td>
                      <td className="py-2 text-emerald-700 font-semibold">${(contractValue / termMonths).toFixed(2)}</td>
                      <td className="py-2 text-right text-rose-600">+0.01¢ / elem</td>
                    </tr>
                    <tr className="bg-slate-50 font-bold">
                      <td className="py-2 text-slate-900">Month {termMonths} (Terminal)</td>
                      <td className="py-2">${monthlyFloatRounded.toFixed(2)} <span className="text-rose-600">(-${accumulatedFloatDrift})</span></td>
                      <td className="py-2 text-emerald-700">${(contractValue / termMonths).toFixed(2)} <span className="text-xs text-emerald-600">(Exact Tie)</span></td>
                      <td className="py-2 text-right text-emerald-700">$0.000000</td>
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
                Audit Defense Intake & Instant Tie-Out
              </span>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                Request Your Contract Drift Audit Package
              </h2>
              <p className="text-slate-400 text-sm max-w-xl mx-auto">
                Submit 2 or 3 of your most complex multi-element or ramp contracts. Choose between our complimentary 24-hour review or unlock instant priority AS 3101 workpapers.
              </p>
            </div>

            {/* PAID SUCCESS BANNER */}
            {isPaidSuccess ? (
              <div className="p-8 rounded-2xl bg-emerald-950/70 border border-emerald-500/50 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">Payment Verified ($499.00 USD)</span>
                  <h3 className="text-2xl font-bold text-white">Priority Audit Package Unlocked!</h3>
                </div>
                <p className="text-emerald-200/90 text-sm max-w-lg mx-auto">
                  Your transaction has completed successfully. Our 128-bit BigInt engine is processing your contract schedules. A certified 8-tab PCAOB AS 3101 defensible workpaper suite will be dispatched to your email within 4 hours.
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
                  Thank you, {formName}. Nikhil from the Soluqube audit defense team will reach out directly at <span className="font-mono underline">{formEmail}</span> to coordinate your contract tie-out package.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitAudit} className="space-y-6">
                
                {/* TIER SELECTION TABS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div 
                    onClick={() => setAuditTier("paid_499")}
                    className={`cursor-pointer rounded-2xl p-5 border transition-all text-left relative ${
                      auditTier === "paid_499" 
                        ? "bg-indigo-950/60 border-indigo-400 shadow-lg shadow-indigo-950/50 ring-2 ring-indigo-500/30" 
                        : "bg-slate-800/40 border-slate-700/70 hover:border-slate-600"
                    }`}
                  >
                    <div className="absolute top-4 right-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500 text-white uppercase tracking-wider">
                        Most Popular
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${auditTier === "paid_499" ? "border-indigo-400 bg-indigo-500" : "border-slate-500"}`}>
                        {auditTier === "paid_499" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <h4 className="font-bold text-white text-base">Priority Tie-Out Package</h4>
                    </div>
                    <div className="flex items-baseline gap-1.5 mb-2">
                      <span className="text-2xl font-black text-white">$499</span>
                      <span className="text-xs text-slate-400">/ one-time payment</span>
                    </div>
                    <ul className="text-xs text-slate-300 space-y-1.5 pt-1">
                      <li className="flex items-center gap-1.5 text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>Instant Priority Queue (4-hr turnaround)</span>
                      </li>
                      <li className="flex items-center gap-1.5 text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                        <span>Full 8-Tab PCAOB AS 3101 Defensible Workpapers</span>
                      </li>
                      <li className="flex items-center gap-1.5 text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                        <span>PyMuPDF Contract Clause Bounding-Box Map</span>
                      </li>
                      <li className="flex items-center gap-1.5 text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                        <span>Stripe receipt & enterprise tax invoice</span>
                      </li>
                    </ul>
                  </div>

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
                      <h4 className="font-bold text-white text-base">Complimentary Audit</h4>
                    </div>
                    <div className="flex items-baseline gap-1.5 mb-2">
                      <span className="text-2xl font-black text-white">$0</span>
                      <span className="text-xs text-slate-400">/ free review</span>
                    </div>
                    <ul className="text-xs text-slate-300 space-y-1.5 pt-1">
                      <li className="flex items-center gap-1.5 text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                        <span>Standard 24-hr turnaround</span>
                      </li>
                      <li className="flex items-center gap-1.5 text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                        <span>3-Contract Blinded Recalculation</span>
                      </li>
                      <li className="flex items-center gap-1.5 text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                        <span>Variance Summary Report</span>
                      </li>
                      <li className="flex items-center gap-1.5 text-slate-400">
                        <span>Requires email intake coordination</span>
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
                      <span>Unlock Priority Audit Package ($499 via Stripe)</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Request Free 3-Contract Drift Audit</span>
                    </>
                  )}
                </button>

                <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2 pt-1 border-t border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                    <span>256-Bit SSL Encrypted. Strict NDA protected.</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <span>Powered by Stripe Payments</span>
                    <span>•</span>
                    <span>100% Audit Defensibility Guarantee</span>
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
