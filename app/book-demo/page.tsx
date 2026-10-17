"use client";
import { track } from "@/lib/analytics";

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
  ChevronLeft,
  RefreshCw,
  Check
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
      setEmailError("Please provide a corporate enterprise email address (e.g. name@company.com).");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email) || !fullName || !company) {
      if (!validateEmail(email)) {
        setEmailError("A valid business domain email is required.");
      }
      return;
    }
    setIsSubmitting(true);
    // Was a 700 ms simulation that sent nothing (found 17 Oct 2026); now posts to the same route as the home form.
    fetch("/api/intake", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, company, email, revrecStack, accountingStandard, driftAuditOffer, info: "Source: /book-demo form" })
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.success) throw new Error(data.error || "Request failed");
        track("generate_lead", { form: "book_demo" });
        setSubmittedData({ referenceId: data.referenceId, merkleRoot: "" });
      })
      .catch(() => setEmailError("We could not send your request. Please try again or email nikhil@soluqube.com."))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-slate-900 selection:text-white">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Return to Overview</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Context & Assurances */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase font-mono tracking-wider mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Executive Intake Portal</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Schedule an Audit Defense Deep-Dive
              </h1>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
                See how Soluqube produces SSP allocations and full-term schedules under ASC 606 and Ind AS 115 that tie to the cent, with a hashed evidence workpaper.
              </p>
            </div>

            {/* Feature checklist */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900">Free 3-Contract Audit-Defense Workpaper:</span> Receive the SSP allocation, a full-term schedule that ties to the cent, and clause evidence (page + excerpt) for each obligation.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900">Clause Evidence:</span> Every obligation keeps the page and excerpt it was taken from, for audit substantiation.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900">18% GST Statutory Firewall:</span> MCA Schedule III isolation for INR contracts, keeping tax out of revenue.
                </div>
              </div>
            </div>

            {/* Patent Callout */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 font-mono text-xs text-slate-600">
              <span className="font-bold text-slate-900 block mb-1">Patent Application: 202621096305</span>
              Deterministic Revenue Recognition Engine with Integer (BigInt) Closed-Form Parity.
            </div>

            {/* Security Assurance */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
              <Lock className="w-5 h-5 text-slate-600 shrink-0" />
              <div className="text-xs text-slate-600">
                <span className="font-semibold text-slate-900 block">Confidentiality</span>
                Mutual NDA on request before you share any contract. Uploaded contracts are not used to train models.
              </div>
            </div>
          </div>

          {/* Right Column: Intake Card */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
              
              {/* Tab Switcher: Form vs Calendly */}
              <div className="flex items-center gap-2 p-1 bg-slate-100/80 rounded-xl mb-6 border border-slate-200">
                <button
                  type="button"
                  onClick={() => setActiveTab("form")}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === "form"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  1. Enterprise Audit Intake Form
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("calendly")}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === "calendly"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  2. Direct Calendar Booking
                </button>
              </div>

              {activeTab === "form" ? (
                !submittedData ? (
                  <form onSubmit={handleBookingSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Sarah Jenkins"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                        />
                      </div>

                      {/* Corporate Email */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Corporate Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (emailError) validateEmail(e.target.value);
                          }}
                          onBlur={(e) => validateEmail(e.target.value)}
                          placeholder="s.jenkins@enterprise.com"
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                            emailError 
                              ? "border-red-300 focus:ring-red-500 bg-red-50/20" 
                              : "border-slate-200 focus:ring-slate-900"
                          }`}
                        />
                        {emailError && (
                          <div className="flex items-center gap-1 text-[11px] text-red-600 mt-1.5">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            <span>{emailError}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Company Name */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Company Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="CloudTech Holdings, Inc."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                        />
                      </div>

                      {/* Primary ERP / RevRec Stack */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Primary ERP Stack
                        </label>
                        <select
                          value={revrecStack}
                          onChange={(e) => setRevrecStack(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                        >
                          <option value="NetSuite">Oracle NetSuite (ARM)</option>
                          <option value="SAP">SAP S/4HANA (RAR)</option>
                          <option value="QuickBooks">QuickBooks Enterprise</option>
                          <option value="Tally Prime">Tally Prime (India Statutory)</option>
                          <option value="Manual Spreadsheets">Manual Excel / Google Sheets</option>
                          <option value="Other">Other General Ledger</option>
                        </select>
                      </div>
                    </div>

                    {/* Target Accounting Standard */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Target Accounting Standard
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {[
                          "ASC 606 (US GAAP)",
                          "Ind AS 115 (MCA India)",
                          "Both / Cross-Border"
                        ].map((std) => (
                          <button
                            type="button"
                            key={std}
                            onClick={() => setAccountingStandard(std as any)}
                            className={`px-3 py-2 rounded-xl text-xs font-medium border text-center transition-all ${
                              accountingStandard === std
                                ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                            }`}
                          >
                            {std}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Offer Checkbox */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 cursor-pointer" onClick={() => setDriftAuditOffer(!driftAuditOffer)}>
                      <input
                        type="checkbox"
                        checked={driftAuditOffer}
                        onChange={(e) => setDriftAuditOffer(e.target.checked)}
                        className="mt-0.5 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
                      />
                      <label className="text-xs text-slate-700 cursor-pointer select-none">
                        <span className="font-bold text-slate-900 block">Free 3-Contract Audit-Defense Workpaper</span>
                        Includes a written summary of SSP-allocation and schedule exposure across the three contracts at no charge.
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Generating Cryptographic Anchor...</span>
                        </>
                      ) : (
                        <>
                          <span>Initialize Audit Request &rarr;</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                      Mutual NDA on request before you share any contract.
                    </p>
                  </form>
                ) : (
                  /* Form state on submit: Verified Confirmation */
                  <div className="text-center py-6 space-y-5 animate-in fade-in zoom-in duration-300">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                      <ShieldCheck className="w-7 h-7" />
                    </div>

                    <div>
                      <span className="text-xs font-mono uppercase font-bold text-emerald-700 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 inline-block mb-2">
                        Request Logged
                      </span>
                      <h3 className="text-xl font-bold text-slate-900">
                        Request Received
                      </h3>
                      <p className="text-xs text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
                        Nikhil, the founder, will review your details and reply within 1 business day with next steps.
                      </p>
                    </div>

                    {/* Receipt Card */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 text-left font-mono text-xs space-y-2 max-w-md mx-auto">
                      <div className="flex justify-between text-slate-500">
                        <span>Reference ID:</span>
                        <span className="font-bold text-slate-900">{submittedData.referenceId}</span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>Reviewed by:</span>
                        <span className="text-slate-800 font-semibold">Nikhil (founder)</span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>Selected Standard:</span>
                        <span className="text-blue-700 font-semibold">{accountingStandard}</span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>Audit-Defense Workpaper:</span>
                        <span className="text-emerald-700 font-bold">CLAIMED ($0.00)</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => setActiveTab("calendly")}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 shadow-sm transition-all"
                      >
                        <Calendar className="w-4 h-4 text-slate-500" />
                        <span>Schedule Technical Deep-Dive Directly (Calendly) &rarr;</span>
                      </button>
                    </div>
                  </div>
                )
              ) : (
                /* Calendly Embed */
                <div className="min-h-[600px] w-full rounded-xl overflow-hidden">
                  <InlineWidget url="https://calendly.com/nikhil-soluqube/30min" />
                </div>
              )}

            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
