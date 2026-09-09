"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Lock,
  Cpu,
  Fingerprint,
  Clock,
  Layers,
  FileText,
  FileCheck,
  ChevronRight,
  Calendar,
  AlertCircle,
  Building2,
  Mail,
  User,
  Sparkles,
  Check,
  HelpCircle,
  BarChart3,
  Scale,
  RefreshCw,
  Sliders,
  ChevronDown
} from "lucide-react";

export default function Home() {
  // Showcase Contract State
  const [selectedContract, setSelectedContract] = useState<"cloudflare" | "snowflake" | "box">("cloudflare");
  const [activeStandard, setActiveStandard] = useState<"ASC 606" | "Ind AS 115">("ASC 606");
  const [highlightedBbox, setHighlightedBbox] = useState<string | null>("ratable_fee");

  // Booking Form State
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

  // Exclude personal / consumer email domains
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
      setEmailError("Please enter a corporate enterprise email address (e.g. name@company.com).");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email) || !fullName || !company) {
      if (!validateEmail(email)) {
        setEmailError("A valid corporate business email is required.");
      }
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedData({
        referenceId: "SLQ-" + Math.floor(100000 + Math.random() * 900000),
        merkleRoot: "0x" + Array.from({length: 32}, () => Math.floor(Math.random()*16).toString(16)).join("")
      });
    }, 700);
  };

  // Demo contract data
  const contractData = {
    cloudflare: {
      name: "SEC 10-K Cloudflare Enterprise Master SOW (2025)",
      secRef: "SEC EDGAR CIK #0001735946",
      obligation: "Enterprise Edge Security & Global Traffic Director (36 Mo Ratable)",
      totalValue: "$1,200,000.00",
      totalValueINR: "₹9,96,00,000.00",
      monthlyRatable: "$33,333.33",
      monthlyRatableINR: "₹27,66,666.67",
      rateCapClause: "Section 6.4: Maximum professional service blended bill-rate capped strictly at $185.00/hr.",
      gstRate: "18% IGST Isolated",
      bboxCoords: "[142, 318, 590, 362]",
      tokenID: "#t4891-obligation-master",
      waterfall: [
        { period: "FY25-P01", recognized: "$33,333.33", deferred: "$1,166,666.67", gst: "$6,000.00", parity: "$0.0000" },
        { period: "FY25-P02", recognized: "$33,333.33", deferred: "$1,133,333.34", gst: "$6,000.00", parity: "$0.0000" },
        { period: "FY25-P03", recognized: "$33,333.33", deferred: "$1,100,000.01", gst: "$6,000.00", parity: "$0.0000" },
        { period: "...", recognized: "...", deferred: "...", gst: "...", parity: "$0.0000" },
        { period: "FY27-P12 (Terminal)", recognized: "$33,333.34", deferred: "$0.00", gst: "$6,000.00", parity: "$0.0000" }
      ]
    },
    snowflake: {
      name: "Snowflake Data Cloud Enterprise Consumption Agreement",
      secRef: "SEC EDGAR CIK #0001640147",
      obligation: "Capacity Commit & Multi-Region Compute Reservation (24 Mo Ratable)",
      totalValue: "$840,000.00",
      totalValueINR: "₹6,97,20,000.00",
      monthlyRatable: "$35,000.00",
      monthlyRatableINR: "₹29,05,000.00",
      rateCapClause: "Section 3.1: Overage credit consumption locked at tier-1 pricing for term duration.",
      gstRate: "18% CGST/SGST Isolated",
      bboxCoords: "[120, 240, 540, 285]",
      tokenID: "#t2104-capacity-commit",
      waterfall: [
        { period: "FY25-P01", recognized: "$35,000.00", deferred: "$805,000.00", gst: "$6,300.00", parity: "$0.0000" },
        { period: "FY25-P02", recognized: "$35,000.00", deferred: "$770,000.00", gst: "$6,300.00", parity: "$0.0000" },
        { period: "FY25-P03", recognized: "$35,000.00", deferred: "$735,000.00", gst: "$6,300.00", parity: "$0.0000" },
        { period: "...", recognized: "...", deferred: "...", gst: "...", parity: "$0.0000" },
        { period: "FY26-P12 (Terminal)", recognized: "$35,000.00", deferred: "$0.00", gst: "$6,300.00", parity: "$0.0000" }
      ]
    },
    box: {
      name: "Box Inc. SEC Edgar Customer Tier-1 Master Cloud Agreement",
      secRef: "SEC EDGAR CIK #0001372612",
      obligation: "Shield Compliance & KeySafe Enterprise Governance Add-On (12 Mo Ratable)",
      totalValue: "$360,000.00",
      totalValueINR: "₹2,98,80,000.00",
      monthlyRatable: "$30,000.00",
      monthlyRatableINR: "₹24,90,000.00",
      rateCapClause: "Section 8.2: Subcontractor audit rights preserved; annual price escalator zero percent.",
      gstRate: "18% IGST Isolated",
      bboxCoords: "[160, 380, 580, 420]",
      tokenID: "#t7892-governance-keysafe",
      waterfall: [
        { period: "FY25-P01", recognized: "$30,000.00", deferred: "$330,000.00", gst: "$5,400.00", parity: "$0.0000" },
        { period: "FY25-P02", recognized: "$30,000.00", deferred: "$300,000.00", gst: "$5,400.00", parity: "$0.0000" },
        { period: "FY25-P03", recognized: "$30,000.00", deferred: "$270,000.00", gst: "$5,400.00", parity: "$0.0000" },
        { period: "...", recognized: "...", deferred: "...", gst: "...", parity: "$0.0000" },
        { period: "FY25-P12 (Terminal)", recognized: "$30,000.00", deferred: "$0.00", gst: "$5,400.00", parity: "$0.0000" }
      ]
    }
  };

  const currentData = contractData[selectedContract];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* 1. INSTITUTIONAL TOP NAVIGATION */}
      <Navbar />

      {/* 2. HERO SECTION (High-Conversion CFO Positioning) */}
      <section className="relative bg-white pt-16 sm:pt-24 pb-16 sm:pb-24 border-b border-slate-200/80 overflow-hidden">
        {/* Subtle geometric hairline pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-60"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Category Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-slate-700 tracking-wider uppercase font-mono">
              FINANCIAL COMPLIANCE &amp; REVENUE RECOGNITION ENGINE
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 max-w-5xl mx-auto leading-[1.08]">
            Deterministic Contract-to-Ledger Revenue Recognition.
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
            Eliminate manual spreadsheet rounding drift, enforce cross-document billing rate caps, and isolate statutory 18% GST under Ind AS 115 and ASC 606 with zero floating-point error.
          </p>

          {/* Dual Call-to-Action */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#audit-intake"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 shadow-md shadow-slate-900/10 hover:shadow-lg transition-all"
            >
              <span>Request Complimentary 3-Contract Drift Audit</span>
              <ArrowRight className="w-4 h-4 text-slate-300" />
            </a>

            <a
              href="https://smart-contracts-henna.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 shadow-sm transition-all"
            >
              <span>Launch Live Interactive Canvas</span>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </a>
          </div>

          {/* Proof Metric Bar (4-column grid on Slate 50 card with hairline border) */}
          <div className="mt-16 max-w-5xl mx-auto bg-slate-50 border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-200/80">
              
              {/* Metric 1 */}
              <div className="text-left pt-3 lg:pt-0 lg:px-4">
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 tracking-tight">
                  5.8 ms/page
                </div>
                <div className="text-xs font-semibold text-slate-800 mt-1.5">
                  Ingestion Latency
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  Benchmarked across 802 SEC Edgar pages via integer rasterizer.
                </div>
              </div>

              {/* Metric 2 */}
              <div className="text-left pt-3 lg:pt-0 lg:px-4">
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-600 tracking-tight flex items-center gap-1">
                  <span>$0.00 Drift</span>
                </div>
                <div className="text-xs font-semibold text-slate-800 mt-1.5">
                  Closed-Form Parity
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  128-bit fixed-point arithmetic eliminating IEEE-754 mantissa leakage.
                </div>
              </div>

              {/* Metric 3 */}
              <div className="text-left pt-4 lg:pt-0 lg:px-4">
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-blue-600 tracking-tight">
                  18% Isolated
                </div>
                <div className="text-xs font-semibold text-slate-800 mt-1.5">
                  Statutory Tax Firewall
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  Ind AS 115 / MCA Schedule III GST reverse-charge quarantined.
                </div>
              </div>

              {/* Metric 4 */}
              <div className="text-left pt-4 lg:pt-0 lg:px-4">
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 tracking-tight">
                  0 Hallucinations
                </div>
                <div className="text-xs font-semibold text-slate-800 mt-1.5">
                  Spatial Token Grounding
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  Deterministic [1000x1000] integer bounding box coordinates.
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. INTERACTIVE PRODUCT SHOWCASE (Light-Mode Card Preview) */}
      <section id="canvas-preview" className="py-20 sm:py-28 bg-slate-50/60 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase font-mono tracking-wider mb-3">
              <Sliders className="w-3.5 h-3.5 text-blue-600" />
              <span>Interactive Verification Canvas</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Audit-Grade Verifiability at Every Decimal Place
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Inspect how Soluqube pins extracted revenue obligations directly to contractual page coordinates and validates them across 5 cryptographic gates.
            </p>
          </div>

          {/* Dataset Switcher & Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
              {(
                [
                  { id: "cloudflare", label: "Cloudflare SOW (SEC 10-K)" },
                  { id: "snowflake", label: "Snowflake Capacity" },
                  { id: "box", label: "Box Cloud Agreement" }
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedContract(tab.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedContract === tab.id
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-mono text-slate-600 shadow-sm">
                <span className="text-slate-400">Standard:</span>
                <button
                  onClick={() => setActiveStandard("ASC 606")}
                  className={`font-semibold px-2 py-0.5 rounded ${activeStandard === "ASC 606" ? "bg-blue-100 text-blue-800" : "text-slate-500 hover:text-slate-900"}`}
                >
                  ASC 606 (US)
                </button>
                <span className="text-slate-300">|</span>
                <button
                  onClick={() => setActiveStandard("Ind AS 115")}
                  className={`font-semibold px-2 py-0.5 rounded ${activeStandard === "Ind AS 115" ? "bg-blue-100 text-blue-800" : "text-slate-500 hover:text-slate-900"}`}
                >
                  Ind AS 115 (MCA)
                </button>
              </div>

              <a
                href="https://smart-contracts-henna.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50/80 hover:bg-blue-100 border border-blue-200 transition-colors"
              >
                <span>Open Sandbox Canvas</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* High-Fidelity Split Card Preview */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden">
            
            {/* Header / Chrome */}
            <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-400/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-400/80 inline-block"></span>
                </div>
                <div className="h-4 w-[1px] bg-slate-200 mx-1"></div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-500" />
                  <span className="font-mono text-xs font-semibold text-slate-800">
                    {currentData.name}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200/70 text-slate-600 hidden sm:inline-block">
                    {currentData.secRef}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  ALL 5 GATES VERIFIED
                </span>
                <span className="text-slate-400 font-mono hidden md:inline-block">
                  SHA-256: 8f9b...a12c
                </span>
              </div>
            </div>

            {/* Split Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
              
              {/* LEFT PANE: Contract Viewport with Spatial Token Bounding Box (6 Cols) */}
              <div className="lg:col-span-6 p-6 sm:p-8 bg-slate-50/40 border-b lg:border-b-0 lg:border-r border-slate-200 relative flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-6">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
                      Contract Source Viewport (PyMuPDF Rasterized)
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                      Page 14 of 42
                    </span>
                  </div>

                  {/* Simulated Document Body with Spatial Overlay */}
                  <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm font-serif text-[13px] leading-relaxed text-slate-700 space-y-4 relative">
                    
                    <p className="text-xs font-mono font-bold text-slate-400 tracking-wider uppercase">
                      EXHIBIT A: STATEMENT OF WORK &amp; PRICING SCHEDULE
                    </p>

                    <p>
                      This Statement of Work (&quot;SOW&quot;) is governed by the terms of the Master Services Agreement.
                      Vendor shall provide the enterprise service obligations described herein in accordance with GAAP 
                      performance milestones.
                    </p>

                    {/* Spatial Bounding Box Overlay #evidence-bbox-overlay */}
                    <div
                      id="evidence-bbox-overlay"
                      onClick={() => setHighlightedBbox("ratable_fee")}
                      className={`relative p-3.5 rounded-lg border-2 transition-all cursor-pointer ${
                        highlightedBbox === "ratable_fee"
                          ? "border-blue-600 bg-blue-50/70 shadow-sm"
                          : "border-blue-300 bg-blue-50/30 hover:border-blue-400"
                      }`}
                    >
                      {/* Floating Coordinate Tag */}
                      <div className="absolute -top-3 left-3 bg-blue-600 text-white font-mono text-[10px] font-semibold px-2 py-0.5 rounded shadow-sm flex items-center gap-1.5">
                        <span>BBOX {currentData.bboxCoords}</span>
                        <span className="text-blue-200">|</span>
                        <span>CONFIDENCE 1.0000</span>
                      </div>

                      <p className="font-sans text-xs sm:text-sm font-semibold text-slate-900 mt-1">
                        SECTION 4.2 — COMMITTED REVENUE OBLIGATION:
                      </p>
                      <p className="text-xs sm:text-[13px] text-slate-800 font-medium mt-1 leading-normal">
                        &quot;Client commits to a Total Service Value of <span className="underline decoration-blue-600 font-bold font-mono text-blue-900">{currentData.totalValue}</span>, recognized ratably over a 36-month subscription term commencing on the Effective Date at <span className="underline decoration-blue-600 font-bold font-mono text-blue-900">{currentData.monthlyRatable}</span> per monthly accounting cycle.&quot;
                      </p>
                      
                      <div className="mt-2 pt-2 border-t border-blue-200/80 flex items-center justify-between text-[11px] font-mono text-blue-800">
                        <span>Token ID: {currentData.tokenID}</span>
                        <span className="font-bold text-emerald-700">G1 Spatial Match Verified</span>
                      </div>
                    </div>

                    {/* Rate Cap Clause Box */}
                    <div
                      onClick={() => setHighlightedBbox("rate_cap")}
                      className={`relative p-3 rounded-lg border transition-all cursor-pointer ${
                        highlightedBbox === "rate_cap"
                          ? "border-purple-600 bg-purple-50/80 shadow-sm"
                          : "border-slate-200 bg-slate-50/80 hover:border-purple-300"
                      }`}
                    >
                      <div className="text-[10px] font-mono text-purple-700 font-semibold mb-1 flex items-center justify-between">
                        <span>[BBOX: 142, 420, 520, 442] &bull; PRECEDENCE DAG OBLIGATION</span>
                        <span className="text-purple-600 font-bold">GATE 5 ACTIVE</span>
                      </div>
                      <p className="text-xs text-slate-800 font-sans">
                        {currentData.rateCapClause}
                      </p>
                    </div>

                    <p className="text-slate-500 text-xs">
                      Invoices shall be rendered electronically at the beginning of each calendar month. Late payments 
                      subject to 1.5% interest per month or the statutory maximum.
                    </p>
                  </div>
                </div>

                {/* Left pane footer telemetry */}
                <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>Integer Coordinate Grid: 1000 x 1000</span>
                  <span className="text-emerald-700 font-semibold">Zero OCR OCR-Drift</span>
                </div>
              </div>

              {/* RIGHT PANE: 5-Gate Badges & Live ASC 606 / Ind AS 115 Waterfall Table (6 Cols) */}
              <div className="lg:col-span-6 p-6 sm:p-8 bg-white flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-6">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
                      Deterministic Audit Validation Engine
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                      $0.00 BALANCE SHEET DRIFT
                    </span>
                  </div>

                  {/* 5-Gate Validation Status Badges */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/90 text-left">
                      <div className="text-[10px] font-mono text-slate-500 font-medium">GATE 1</div>
                      <div className="text-xs font-bold text-emerald-700 flex items-center gap-1 mt-0.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Spatial PASS
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">[1000x1000] Grounded</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/90 text-left">
                      <div className="text-[10px] font-mono text-slate-500 font-medium">GATE 2</div>
                      <div className="text-xs font-bold text-emerald-700 flex items-center gap-1 mt-0.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Obligation PASS
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">5-Step ASC 606</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/90 text-left">
                      <div className="text-[10px] font-mono text-slate-500 font-medium">GATE 3</div>
                      <div className="text-xs font-bold text-emerald-700 flex items-center gap-1 mt-0.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Parity 0.00 Drift
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">128-bit Fixed Point</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/90 text-left">
                      <div className="text-[10px] font-mono text-slate-500 font-medium">GATE 4</div>
                      <div className="text-xs font-bold text-blue-700 flex items-center gap-1 mt-0.5">
                        <CheckCircle2 className="w-3 h-3 text-blue-600" />
                        GST Isolated
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">Ind AS Schedule III</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/90 text-left col-span-2 sm:col-span-2">
                      <div className="text-[10px] font-mono text-slate-500 font-medium">GATE 5</div>
                      <div className="text-xs font-bold text-emerald-700 flex items-center gap-1 mt-0.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Precedence DAG Verified
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">MSA Rate Cap Enforced ($185/hr max)</div>
                    </div>
                  </div>

                  {/* Live ASC 606 / Ind AS 115 Waterfall Table */}
                  <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-700 font-mono">
                      <span>ASC 606 &amp; Ind AS 115 Schedule Ledger</span>
                      <span className="text-emerald-700 font-bold text-[11px]">100.000% PARITY</span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-slate-100/75 border-b border-slate-200 text-slate-600 text-[11px]">
                          <tr>
                            <th className="py-2 px-3">Period</th>
                            <th className="py-2 px-3 text-right">Recognized</th>
                            <th className="py-2 px-3 text-right">Deferred Balance</th>
                            <th className="py-2 px-3 text-right">18% GST Isol.</th>
                            <th className="py-2 px-3 text-right">Drift</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-800 text-[11px]">
                          {currentData.waterfall.map((row, idx) => (
                            <tr key={idx} className={row.period.includes("Terminal") ? "bg-emerald-50/50 font-semibold" : "hover:bg-slate-50"}>
                              <td className="py-2 px-3 font-medium text-slate-900">{row.period}</td>
                              <td className="py-2 px-3 text-right font-medium text-slate-900">{row.recognized}</td>
                              <td className="py-2 px-3 text-right text-slate-600">{row.deferred}</td>
                              <td className="py-2 px-3 text-right text-blue-700">{row.gst}</td>
                              <td className="py-2 px-3 text-right text-emerald-700 font-bold flex items-center justify-end gap-1">
                                <Check className="w-3 h-3 text-emerald-600" />
                                {row.parity}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Table Totals Footnote */}
                    <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono text-slate-700">
                      <span>Terminal Remainder Absorption:</span>
                      <span className="font-bold text-emerald-700">Exact Mathematical Zero ($0.000000)</span>
                    </div>
                  </div>

                </div>

                {/* Right Pane Footer CTA */}
                <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    Live calculation executed via WebAssembly 128-bit runtime.
                  </div>
                  <a
                    href="#audit-intake"
                    className="text-xs font-semibold text-slate-900 hover:text-blue-600 inline-flex items-center gap-1 transition-colors"
                  >
                    Audit your contract stack <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 4. THE 3 AUDIT PITFALLS SOLVED (Problem vs. Solution) */}
      <section id="standards" className="py-20 sm:py-28 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-16 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold uppercase font-mono tracking-wider mb-3">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Critical Revenue Accounting Vulnerabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Why Standard ERPs and Spreadsheet Formulas Fail Big 4 Audits
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              How enterprise accounting teams stop audit restatements, cumulative mantissa leaks, and cross-border statutory penalties before quarterly and annual close.
            </p>
          </div>

          {/* 3 Large Contrast Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Cent-Drift */}
            <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 mb-5">
                  <Scale className="w-5 h-5" />
                </div>

                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-red-50 text-red-700 border border-red-200 mb-3">
                  CUMULATIVE DRIFT RISK
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  The IEEE-754 Cent-Drift Avalanche
                </h3>

                <div className="text-xs text-slate-600 leading-relaxed space-y-3">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 font-sans">
                    <span className="font-bold text-slate-800">The Vulnerability:</span> Standard floating-point engines calculate 36-month ratable schedules using 64-bit binary floats (e.g. 0.1 + 0.2 ≠ 0.3). Fractional cent residues compound across thousands of customer contracts, creating unexplained balance-sheet variances during annual auditor sampling.
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200 text-emerald-950 font-sans">
                    <span className="font-bold text-emerald-900">Soluqube Solution:</span> Closed-form 128-bit decimal parity with terminal-period remainder absorption, guaranteeing exact balance sheet zero-drift ($0.000000).
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Audit Risk: HIGH</span>
                <span className="text-emerald-700 font-bold">Zero Float Drift</span>
              </div>
            </div>

            {/* Card 2: Cross-Document Rate-Cap */}
            <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 mb-5">
                  <Layers className="w-5 h-5" />
                </div>

                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-purple-50 text-purple-700 border border-purple-200 mb-3">
                  UNAUTHORIZED MARGIN LEAKAGE
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Cross-Document Rate-Cap Overbilling
                </h3>

                <div className="text-xs text-slate-600 leading-relaxed space-y-3">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 font-sans">
                    <span className="font-bold text-slate-800">The Vulnerability:</span> Individual Statements of Work (SOWs) and vendor contractor invoices often submit line items that exceed negotiated master hourly rate caps in the foundational MSA, escaping manual spreadsheet reconciliations.
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200 text-emerald-950 font-sans">
                    <span className="font-bold text-emerald-900">Soluqube Solution:</span> Directed Acyclic Graph (DAG) temporal precedence engine evaluates parent agreements first, halting ledger sync before unapproved rate increases post.
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Audit Risk: SEVERE</span>
                <span className="text-emerald-700 font-bold">DAG Precedence Lock</span>
              </div>
            </div>

            {/* Card 3: Statutory Tax Contamination */}
            <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-5">
                  <ShieldCheck className="w-5 h-5" />
                </div>

                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-3">
                  COMPLIANCE RESTORATION RISK
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Statutory Tax Contamination (Ind AS 115)
                </h3>

                <div className="text-xs text-slate-600 leading-relaxed space-y-3">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 font-sans">
                    <span className="font-bold text-slate-800">The Vulnerability:</span> Cross-border enterprise software groups frequently contaminate US GAAP revenue recognition by commingling 18% Indian GST within gross bookings, causing restatements under MCA Schedule III.
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200 text-emerald-950 font-sans">
                    <span className="font-bold text-emerald-900">Soluqube Solution:</span> Automated transaction firewalls isolate CGST, SGST, and IGST liabilities into dedicated Schedule III balance sheet accounts before ASC 606 revenue posts.
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Audit Risk: STATUTORY</span>
                <span className="text-emerald-700 font-bold">18% GST Firewall</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. ENGINE ARCHITECTURE & 5 DETERMINISTIC GATES */}
      <section id="architecture" className="py-20 sm:py-28 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-200/80 text-slate-700 text-xs font-semibold uppercase font-mono tracking-wider mb-3">
              <Cpu className="w-3.5 h-3.5 text-slate-800" />
              <span>Cryptographic Validation Pipeline</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              The 5-Gate Deterministic Revenue Engine
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Protected under Patent Priority Application No. 202621096305. Every revenue transaction must clear all five mathematical gates before ledger commit.
            </p>
          </div>

          {/* 5 Gates Flow */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                num: "G1",
                title: "Spatial Token Grounding",
                standard: "[1000x1000] Integer Grid",
                description: "Pins every financial clause to exact character bounding boxes on the contract PDF, preventing LLM OCR hallucinations."
              },
              {
                num: "G2",
                title: "Obligation Classifier",
                standard: "5-Step ASC 606 / Ind AS 115",
                description: "Separates distinct performance obligations, ratable licensing, and variable consideration schedules deterministically."
              },
              {
                num: "G3",
                title: "Fixed-Point 128-Bit Parity",
                standard: "$0.00 Mathematical Drift",
                description: "Replaces standard float division with integer arithmetic and terminal remainder absorption for zero balance sheet residue."
              },
              {
                num: "G4",
                title: "Statutory Tax Firewall",
                standard: "MCA Schedule III / 18% GST",
                description: "Automated quarantine isolating Indian GST components (CGST/SGST/IGST) from US GAAP recognized SaaS revenue."
              },
              {
                num: "G5",
                title: "Precedence Temporal DAG",
                standard: "Cross-Document Enforcement",
                description: "Evaluates parent MSAs chronologically to halt unauthorized contractor rate increases in subordinate SOWs."
              }
            ].map((gate) => (
              <div key={gate.num} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono font-extrabold text-xs px-2 py-0.5 rounded bg-slate-900 text-white">
                      {gate.num}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1 leading-snug">
                    {gate.title}
                  </h4>
                  <div className="text-[11px] font-mono text-blue-700 font-medium mb-2.5">
                    {gate.standard}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {gate.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>Status</span>
                  <span className="text-emerald-700 font-semibold">Enforced</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. AUDIT PROOF TELEMETRY & BIG 4 AUDIT TRAIL */}
      <section id="proof-telemetry" className="py-20 sm:py-28 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase font-mono tracking-wider mb-3">
              <Fingerprint className="w-3.5 h-3.5 text-emerald-600" />
              <span>Auditor-Ready Telemetry</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Institutional Compliance Benchmarks
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              How Soluqube eliminates the manual evidence-gathering bottleneck during Big 4 interim testing and annual statutory audit reviews.
            </p>
          </div>

          {/* Telemetry Comparison Table */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold font-mono text-xs">
                  <tr>
                    <th className="py-3.5 px-6">Verification Dimension</th>
                    <th className="py-3.5 px-6 text-slate-500">Legacy ERPs &amp; Spreadsheets</th>
                    <th className="py-3.5 px-6 text-slate-900 bg-slate-100/50">Soluqube Deterministic Engine</th>
                    <th className="py-3.5 px-6 text-emerald-700 text-right">Audit Advantage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {[
                    {
                      dimension: "Calculation Precision",
                      legacy: "IEEE-754 64-bit binary float division (inherent cent drift)",
                      soluqube: "128-bit fixed-point arithmetic with terminal remainder absorption",
                      advantage: "Zero balance sheet drift ($0.000000)"
                    },
                    {
                      dimension: "Source Document Grounding",
                      legacy: "Manual copy-paste or fuzzy LLM OCR without coordinates",
                      soluqube: "Deterministic [1000x1000] integer spatial bounding box overlay",
                      advantage: "1-click auditor evidence retrieval"
                    },
                    {
                      dimension: "Cross-Document Rate Caps",
                      legacy: "SOWs audited reactively through manual sample spot-checks",
                      soluqube: "Temporal Precedence DAG validates invoices against parent MSA",
                      advantage: "100% pre-ledger overbilling prevention"
                    },
                    {
                      dimension: "Dual-Ledger Tax Isolation",
                      legacy: "GST manually adjusted through post-close journal entries",
                      soluqube: "Automated transaction firewall under MCA India Schedule III",
                      advantage: "Zero cross-border GAAP contamination"
                    },
                    {
                      dimension: "Audit Verification Time",
                      legacy: "3 to 6 weeks of back-and-forth PBC list sample extraction",
                      soluqube: "Instant cryptographic Merkle anchor verification per contract",
                      advantage: "85% reduction in interim audit cycles"
                    }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6 font-semibold text-slate-900">{row.dimension}</td>
                      <td className="py-4 px-6 text-slate-500 font-sans">{row.legacy}</td>
                      <td className="py-4 px-6 font-medium text-slate-900 bg-slate-50/50 font-sans">{row.soluqube}</td>
                      <td className="py-4 px-6 text-right font-mono text-emerald-700 font-bold">{row.advantage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* 7. PRICING & ENTERPRISE PILOT PROGRAM */}
      <section id="pilot" className="py-20 sm:py-28 bg-slate-50/60 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-200/80 text-slate-800 text-xs font-semibold uppercase font-mono tracking-wider mb-3">
              <BarChart3 className="w-3.5 h-3.5 text-slate-700" />
              <span>Pilot &amp; Production Deployment</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Institutional Deployment Tiers
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Begin with a complimentary 3-contract historical drift audit or deploy continuous contract-to-ledger reconciliation across your ERP instance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            
            {/* Tier 1: Drift Audit */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono font-semibold uppercase text-slate-500 mb-2">
                  EVALUATION PILOT
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  Historical Drift Audit
                </h3>
                <div className="text-3xl font-extrabold font-mono text-slate-900 my-4">
                  Complimentary
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  Ideal for CFOs, controllers, and audit directors validating current NetSuite, SAP, or Tally revrec precision before year-end close.
                </p>

                <div className="space-y-3 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Up to 3 complex enterprise contracts / SOWs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Spatial token bounding box inspection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Comprehensive floating-point drift analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Statutory 18% GST isolation report</span>
                  </div>
                </div>
              </div>

              <a
                href="#audit-intake"
                className="mt-8 w-full py-3 rounded-xl text-center text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200 block"
              >
                Request Free Audit &rarr;
              </a>
            </div>

            {/* Tier 2: Continuous Sync (Featured) */}
            <div className="bg-white border-2 border-slate-900 rounded-2xl p-8 shadow-lg relative flex flex-col justify-between">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-slate-900 text-white font-mono text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                MOST POPULAR FOR MID-MARKET
              </div>

              <div>
                <div className="text-xs font-mono font-semibold uppercase text-blue-600 mb-2">
                  CONTINUOUS ENGINE
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  Enterprise RevRec Sync
                </h3>
                <div className="text-3xl font-extrabold font-mono text-slate-900 my-4">
                  Custom / Usage
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  Automated contract-to-ledger processing with live webhook sync to NetSuite, SAP, QuickBooks, and Tally Prime.
                </p>

                <div className="space-y-3 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Unlimited contract ingestion with 5.8 ms/page latency</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Continuous 5-Gate mathematical validation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Temporal Precedence DAG cross-document rate-cap enforcement</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Big 4 auditor portal with cryptographic Merkle anchors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Dedicated technical accounting onboarding</span>
                  </div>
                </div>
              </div>

              <a
                href="#audit-intake"
                className="mt-8 w-full py-3 rounded-xl text-center text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors block shadow-md"
              >
                Inquire for Architecture Review &rarr;
              </a>
            </div>

            {/* Tier 3: On-Premise / Private Cloud */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono font-semibold uppercase text-slate-500 mb-2">
                  REGULATED &amp; BANKING
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  Sovereign Cloud / On-Prem
                </h3>
                <div className="text-3xl font-extrabold font-mono text-slate-900 my-4">
                  Annual License
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  Air-gapped deployment for highly regulated financial institutions, healthcare enterprises, and defence contractors.
                </p>

                <div className="space-y-3 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Air-gapped deployment in private VPC or bare metal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Zero data leaves your security perimeter</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Custom ERP adapter development &amp; SLA guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>SOC 2 Type II audit defense collateral</span>
                  </div>
                </div>
              </div>

              <a
                href="#audit-intake"
                className="mt-8 w-full py-3 rounded-xl text-center text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200 block"
              >
                Contact Enterprise Security &rarr;
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* 8. "BOOK A DEMO / AUDIT INTAKE" SECTION (#audit-intake) */}
      <section id="audit-intake" className="py-20 sm:py-28 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Value Prop & Assurance */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase font-mono tracking-wider mb-4">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Executive Intake Portal</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Request a Complimentary 3-Contract Historical Drift Audit
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                Uncover hidden rounding discrepancies, verify multi-element ASC 606 obligation allocations, and inspect your statutory tax isolation before auditor testing begins.
              </p>

              <div className="mt-8 space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">Zero Float Drift Proof:</span> Receive a mathematical audit certificate certifying balance sheet zero-drift down to the exact fraction of a cent.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">Spatial Token Overlay:</span> Every obligation is bounded to source PDF coordinates for 1-click auditor validation.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">Enterprise Confidentiality:</span> Protected by two-way mutual NDA prior to document transmission. Zero LLM training on customer agreements.
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-10 p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3.5">
                <Lock className="w-5 h-5 text-slate-600 shrink-0" />
                <div className="text-xs text-slate-600">
                  <span className="font-semibold text-slate-900 block">Bank-Grade Confidentiality</span>
                  SOC 2 aligned architecture. All documents are AES-256 encrypted at rest and in transit.
                </div>
              </div>
            </div>

            {/* Right Column: Crisp White Form Card with subtle drop shadow */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
                
                {!submittedData ? (
                  <form onSubmit={handleBookingSubmit} className="space-y-5">
                    <div className="border-b border-slate-100 pb-4 mb-2">
                      <h3 className="text-lg font-bold text-slate-900">
                        Enterprise Audit Intake
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Complete the parameters below to initialize your complimentary 3-contract audit.
                      </p>
                    </div>

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
                        <span className="font-bold text-slate-900 block">Complimentary 3-Contract Historical Drift Audit</span>
                        Include our complimentary historical floating-point variance analysis report ($4,500 value) at zero charge.
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
                      By submitting, you agree to our Enterprise Audit terms. Confidentiality protected under mutual NDA.
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
                        Audit Request Logged — Merkle Anchor Initialized
                      </span>
                      <h3 className="text-xl font-bold text-slate-900">
                        Verification Parameters Cryptographically Anchored
                      </h3>
                      <p className="text-xs text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
                        Our technical accounting team will reach out within 1 business day with your secure upload vault.
                      </p>
                    </div>

                    {/* Receipt Card */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 text-left font-mono text-xs space-y-2 max-w-md mx-auto">
                      <div className="flex justify-between text-slate-500">
                        <span>Reference ID:</span>
                        <span className="font-bold text-slate-900">{submittedData.referenceId}</span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>Assigned Desk:</span>
                        <span className="text-slate-800 font-semibold">Priority Accounting Queue #1</span>
                      </div>
                      <div className="flex justify-between text-slate-500 truncate">
                        <span>Merkle Root:</span>
                        <span className="text-slate-800 font-semibold truncate max-w-[200px]">{submittedData.merkleRoot}</span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>Selected Standard:</span>
                        <span className="text-blue-700 font-semibold">{accountingStandard}</span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>Historical Drift Offer:</span>
                        <span className="text-emerald-700 font-bold">CLAIMED ($0.00)</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <a
                        href="https://calendly.com/nlaky1/15min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 shadow-sm transition-all"
                      >
                        <Calendar className="w-4 h-4 text-slate-500" />
                        <span>Schedule Technical Deep-Dive Directly (Calendly) &rarr;</span>
                      </a>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 9. INSTITUTIONAL FOOTER */}
      <footer className="bg-white py-14 border-t border-slate-200 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-slate-100">
            
            <div className="col-span-2">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center text-white">
                  <Layers className="w-4 h-4" />
                </div>
                <span className="text-base font-bold tracking-tight text-slate-900">SOLUQUBE</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm mb-3">
                Deterministic contract-to-ledger revenue recognition engine. Closed-form 128-bit mathematical parity and spatial token character grounding.
              </p>
              <div className="font-mono text-[11px] text-slate-500">
                Patent Priority Application No. 202621096305
              </div>
            </div>

            <div>
              <div className="font-semibold text-slate-900 mb-3 text-xs tracking-wider uppercase font-mono">
                Product
              </div>
              <ul className="space-y-2 text-xs">
                <li><a href="#architecture" className="hover:text-slate-950 transition-colors">5-Gate Architecture</a></li>
                <li><a href="#canvas-preview" className="hover:text-slate-950 transition-colors">Interactive Canvas</a></li>
                <li><a href="#proof-telemetry" className="hover:text-slate-950 transition-colors">Audit Telemetry</a></li>
                <li><a href="https://smart-contracts-henna.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-950 transition-colors flex items-center gap-1">Sandbox Engine <ExternalLink className="w-3 h-3 text-slate-400" /></a></li>
              </ul>
            </div>

            <div>
              <div className="font-semibold text-slate-900 mb-3 text-xs tracking-wider uppercase font-mono">
                Standards
              </div>
              <ul className="space-y-2 text-xs">
                <li><a href="#standards" className="hover:text-slate-950 transition-colors">ASC 606 (US GAAP)</a></li>
                <li><a href="#standards" className="hover:text-slate-950 transition-colors">Ind AS 115 (MCA India)</a></li>
                <li><a href="#standards" className="hover:text-slate-950 transition-colors">Schedule III Tax Firewall</a></li>
                <li><a href="#standards" className="hover:text-slate-950 transition-colors">Zero-Drift Whitepaper</a></li>
              </ul>
            </div>

            <div>
              <div className="font-semibold text-slate-900 mb-3 text-xs tracking-wider uppercase font-mono">
                Trust &amp; Legal
              </div>
              <ul className="space-y-2 text-xs">
                <li><a href="#audit-intake" className="hover:text-slate-950 transition-colors">SOC 2 Roadmap</a></li>
                <li><a href="#audit-intake" className="hover:text-slate-950 transition-colors">Security Architecture</a></li>
                <li><a href="#audit-intake" className="hover:text-slate-950 transition-colors">Privacy Policy</a></li>
                <li><a href="#audit-intake" className="hover:text-slate-950 transition-colors">Terms of Service</a></li>
              </ul>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <div>
              &copy; {new Date().getFullYear()} Soluqube Technologies. All rights reserved. Patent Priority Application No. 202621096305.
            </div>
            <div className="flex items-center gap-4">
              <span>Deterministic RevRec</span>
              <span>&bull;</span>
              <span>128-bit Parity</span>
              <span>&bull;</span>
              <span>Zero Mantissa Leakage</span>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
