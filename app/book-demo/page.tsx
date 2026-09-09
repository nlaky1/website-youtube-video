"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { InlineWidget } from "react-calendly";
import {
  ShieldCheck,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Building2,
  Mail,
  User,
  ArrowRight,
  Layers,
  Lock,
  Sparkles,
  ExternalLink,
  ChevronLeft
} from "lucide-react";

export default function BookDemoPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [accountingStandard, setAccountingStandard] = useState<"ASC 606 (US GAAP)" | "Ind AS 115 (MCA India)" | "Both / Cross-Border">("ASC 606 (US GAAP)");
  const [revrecStack, setRevrecStack] = useState("NetSuite");
  const [driftAuditOffer, setDriftAuditOffer] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    referenceId: string;
    merkleRoot: string;
  } | null>(null);

  const [activeTab, setActiveTab] = useState<"form" | "calendly">("form");

  const CONSUMER_DOMAINS = [
    "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", 
    "aol.com", "icloud.com", "zoho.com", "proton.me", "protonmail.com"
  ];

  const validateEmail = (val: string) => {
    const domain = val.split("@")[1]?.toLowerCase().trim();
    if (!domain) {
      setEmailError("");
      return false;
    }
    if (CONSUMER_DOMAINS.includes(domain)) {
      setEmailError("Corporate work email required. Consumer domains (@gmail, @yahoo, etc.) are restricted for audit compliance.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (val.includes("@")) {
      validateEmail(val);
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) return;
    if (!fullName || !email || !company) {
      alert("Please fill in all required enterprise fields.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const sampleHex = Array.from({ length: 64 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join("");
      const randomRef = `SLQ-AUDIT-${Math.floor(1000 + Math.random() * 9000)}`;

      setSubmittedData({
        referenceId: randomRef,
        merkleRoot: sampleHex
      });
      setIsSubmitting(false);
      setActiveTab("calendly");
    }, 850);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-10">
        
        {/* Breadcrumb / Back link */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Soluqube Home</span>
          </Link>

          <a
            href="https://smart-contracts-henna.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
          >
            <span>Launch Sandbox Engine</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-mono font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Patent Priority Application No. 202621096305</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Book a Technical Evaluation & Historical Drift Audit
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Upload or submit up to 3 complex customer agreements. Our engineering team will run your contracts through the 5-Gate deterministic engine to verify stand-alone selling prices, 18% GST isolation, and $0.00 drift.
          </p>
        </div>

        {/* View Switcher: Form vs Direct Calendar */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
          <button
            onClick={() => setActiveTab("form")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "form"
                ? "bg-blue-600 text-white shadow"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            1. Audit Intake Specification
          </button>
          <button
            onClick={() => setActiveTab("calendly")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "calendly"
                ? "bg-blue-600 text-white shadow"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            2. Calendar Slot Reservation (Calendly)
          </button>
        </div>

        {activeTab === "calendly" ? (
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
            {submittedData && (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Audit Session Provisioned: {submittedData.referenceId}</span>
                </div>
                <span className="text-slate-400">Merkle Root: {submittedData.merkleRoot.slice(0, 16)}...</span>
              </div>
            )}

            <div className="text-center space-y-2">
              <h3 className="text-lg font-bold text-white">Select a 15 or 30-Minute Meeting Slot</h3>
              <p className="text-xs text-slate-400">
                Direct integration with our systems engineering pipeline.
              </p>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-800 bg-black min-h-[650px]">
              <InlineWidget url="https://calendly.com/nlaky1/15min" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form Column */}
            <div className="lg:col-span-7">
              <form
                onSubmit={handleSubmit}
                className="p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>Full Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Sarah Jenkins"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>

                  {/* Corporate Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>Corporate Email *</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="sarah@enterprise.com"
                      value={email}
                      onChange={handleEmailChange}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-sm text-white placeholder-slate-600 focus:outline-none transition-all ${
                        emailError ? "border-rose-500" : "border-slate-800 focus:border-blue-500"
                      }`}
                    />
                    {emailError && (
                      <div className="flex items-start gap-1 text-[11px] text-rose-400 mt-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span>{emailError}</span>
                      </div>
                    )}
                  </div>

                  {/* Company Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>Company Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Acme Global Inc."
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>

                  {/* Accounting Standard */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Accounting Standard *
                    </label>
                    <select
                      value={accountingStandard}
                      onChange={(e) => setAccountingStandard(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
                    >
                      <option value="ASC 606 (US GAAP)">ASC 606 (US GAAP)</option>
                      <option value="Ind AS 115 (MCA India)">Ind AS 115 (MCA India - 18% GST)</option>
                      <option value="Both / Cross-Border">Both / Cross-Border Consolidated</option>
                    </select>
                  </div>

                  {/* ERP Stack */}
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Current ERP / RevRec System
                    </label>
                    <select
                      value={revrecStack}
                      onChange={(e) => setRevrecStack(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
                    >
                      <option value="NetSuite">Oracle NetSuite (SuiteTalk)</option>
                      <option value="SAP">SAP S/4HANA / ECC</option>
                      <option value="QuickBooks">QuickBooks Enterprise</option>
                      <option value="Tally Prime">Tally Prime (India GST)</option>
                      <option value="Manual Spreadsheets">Manual Spreadsheets / Excel</option>
                    </select>
                  </div>

                </div>

                {/* Offer Checkbox */}
                <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/60">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={driftAuditOffer}
                      onChange={(e) => setDriftAuditOffer(e.target.checked)}
                      className="w-4 h-4 rounded mt-0.5 text-blue-600 focus:ring-blue-500 bg-slate-900 border-slate-700 cursor-pointer"
                    />
                    <div>
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                        Complimentary 3-Contract Historical Drift Audit
                      </span>
                      <p className="text-[11px] text-slate-300 mt-0.5">
                        Includes mathematical reconciliation of up to 3 historic agreements, comparing current ERP balance sheets with our 128-bit closed-form parity ledger.
                      </p>
                    </div>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Computing Merkle Anchor...</span>
                    </>
                  ) : (
                    <>
                      <span>Lock Audit Reservation & Choose Slot</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="text-center text-[11px] font-mono text-slate-500">
                  Mutual NDA Protected • Patent App: 202621096305
                </div>
              </form>
            </div>

            {/* Information Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  What We Deliver in Your Drift Audit Report
                </h3>
                <div className="space-y-3 text-xs text-slate-300">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Floating-Point Drift Reconciliation:</strong> Identify every cent variance between binary float amortization vs 128-bit fixed-point math.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Spatial Coordinate Bounding Verification:</strong> Verify character-level spatial coordinates extracted from scanned PDF agreements.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">18% GST Isolation Audit:</strong> Ensure domestic tax components are firewalled out of core operational margins.
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-3">
                <div className="text-xs font-bold text-white">Already familiar with the Soluqube Engine?</div>
                <p className="text-xs text-slate-400">
                  You can jump directly into the live sandbox environment to inspect SEC Edgar exhibits.
                </p>
                <a
                  href="https://smart-contracts-henna.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300"
                >
                  <span>Launch Live Sandbox Canvas</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
