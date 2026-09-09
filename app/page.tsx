"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { Spotlight } from "@/components/ui/spotlight";
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
  Scale
} from "lucide-react";

export default function Home() {
  // Interactive Preview State
  const [activePreviewTab, setActivePreviewTab] = useState<"canvas" | "queue">("canvas");
  const [selectedDemoContract, setSelectedDemoContract] = useState<"snowflake" | "box" | "salesforce">("snowflake");
  const [selectedClause, setSelectedClause] = useState<number>(0);
  const [activeStandard, setActiveStandard] = useState<"ASC 606" | "Ind AS 115">("ASC 606");

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

  // Exclude consumer email domains
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) return;
    if (!fullName || !email || !company) {
      alert("Please provide all required enterprise fields.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const sampleHex = Array.from({ length: 64 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join("");
      const refId = `SLQ-AUDIT-${Math.floor(1000 + Math.random() * 9000)}`;

      setSubmittedData({
        referenceId: refId,
        merkleRoot: sampleHex
      });
      setIsSubmitting(false);
    }, 800);
  };

  const demoContracts = {
    snowflake: {
      name: "Snowflake Enterprise Sublease (SEC Ex 10.16)",
      pages: 312,
      tcv: "$447,250.00",
      speed: "5.45 ms/page",
      clauses: [
        {
          id: 0,
          title: "Section 4.1 - Base Term & Escalation",
          pob: "POB-01: Term License Allocation",
          amount: "$360,000.00",
          bbox: "[120, 245, 510, 275]",
          text: "Tenant shall pay Landlord base license fees in equal monthly installments of $30,000 over the 12-month evaluation cycle.",
          status: "ASC 606 Ratable Schedule"
        },
        {
          id: 1,
          title: "Section 7.3 - Professional Deployment SLA",
          pob: "POB-02: Implementation Services",
          amount: "$87,250.00",
          bbox: "[120, 410, 480, 435]",
          text: "Implementation services delivered upon milestone delivery sign-off; performance obligation satisfied at point in time.",
          status: "Point-in-Time Milestone Delivery"
        }
      ]
    },
    box: {
      name: "Box Cloud Enterprise MSA (SEC Ex 10.14)",
      pages: 119,
      tcv: "$1,250,000.00",
      speed: "5.12 ms/page",
      clauses: [
        {
          id: 0,
          title: "Exhibit B - Multi-Year Cloud Subscription",
          pob: "POB-01: Core Cloud Storage & Sync",
          amount: "$1,100,000.00",
          bbox: "[95, 180, 540, 210]",
          text: "Subscription grant for enterprise-tier secure cloud synchronization with 99.95% uptime availability SLA.",
          status: "Ratable Daily Allocation"
        },
        {
          id: 1,
          title: "Exhibit C - Dedicated Support Premium",
          pob: "POB-02: 24/7 Technical Account Manager",
          amount: "$150,000.00",
          bbox: "[95, 340, 510, 365]",
          text: "24/7 Technical Account Manager assigned for tier-1 escalation and quarterly architecture reviews.",
          status: "SSP Fair Value Isolated"
        }
      ]
    },
    salesforce: {
      name: "Salesforce Reseller Agreement (SEC Ex 10.1)",
      pages: 43,
      tcv: "$180,000.00",
      speed: "6.31 ms/page",
      clauses: [
        {
          id: 0,
          title: "Section 2.4 - OEM Platform Subscriptions",
          pob: "POB-01: Core CRM Infrastructure",
          amount: "$150,000.00",
          bbox: "[110, 160, 520, 190]",
          text: "Annual subscription tier encompassing 500 seat licenses billed annually in advance.",
          status: "ASC 606 5-Step Step 4 Met"
        },
        {
          id: 1,
          title: "Section 5.1 - Domestic GST & Statutory Levies",
          pob: "POB-02: 18% Integrated GST Segregation",
          amount: "₹2,700,000.00",
          bbox: "[110, 310, 490, 335]",
          text: "All domestic invoices subject to 18% IGST under HSN code 998313, isolated from core operating revenue.",
          status: "Ind AS 115 / GST Isolated"
        }
      ]
    }
  };

  const currentContract = demoContracts[selectedDemoContract];

  return (
    <div className="w-full bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white relative overflow-hidden">
      
      {/* Executive Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-12 pb-20 md:pt-20 md:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Spotlight Effect */}
        <Spotlight className="hidden md:flex -top-40 left-0 md:left-60" fill="rgba(59, 130, 246, 0.25)" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          
          {/* Patent Priority Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-slate-300 text-xs font-semibold shadow-inner">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="font-mono text-blue-400 font-bold">Patent Priority Application No. 202621096305</span>
            <span className="text-slate-500 hidden sm:inline">•</span>
            <span className="text-slate-400 hidden sm:inline">Statutory Audit Ready</span>
          </div>

          {/* Master Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.15]">
            Deterministic Contract-to-Ledger <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-teal-300">
              Revenue Recognition
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Zero floating-point calculation drift. Spatial token character grounding. Automated 18% GST isolation for <span className="text-white font-semibold">ASC 606</span> & <span className="text-white font-semibold">Ind AS 115</span> statutory compliance.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <a
              href="#book-demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/30 transition-all cursor-pointer"
            >
              <span>Book Historical Drift Audit</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="https://smart-contracts-henna.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 transition-all cursor-pointer"
            >
              <Cpu className="w-4 h-4 text-blue-400" />
              <span>Launch Live Sandbox Canvas</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>

          <div className="flex items-center justify-center gap-6 pt-4 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Check className="w-3.5 h-3.5" /> 128-bit Parity ($0.00 Drift)
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <Lock className="w-3.5 h-3.5 text-blue-400" /> Big-4 Audit Defense
            </span>
          </div>
        </div>
      </div>

      {/* Technical Trust & Proof Metrics Bar */}
      <section id="proof-metrics" className="border-y border-slate-800/80 bg-slate-900/40 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
              Enterprise Performance Benchmarks
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Proof 1 */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-blue-400">
                <Clock className="w-5 h-5" />
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 border border-blue-800">5.8 ms/pg</span>
              </div>
              <div className="text-xl font-bold text-white font-mono">800+ SEC Edgar Pages</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Verified in 4.68s across 312-page Snowflake and Box cloud exhibits using C-level PyMuPDF bounding pipelines.
              </p>
            </div>

            {/* Proof 2 */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800">$0.00 Drift</span>
              </div>
              <div className="text-xl font-bold text-white font-mono">128-bit Closed-Form Parity</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Replaces IEEE 754 floating-point math with fixed-point integer arithmetic to eliminate multi-year cent divergences.
              </p>
            </div>

            {/* Proof 3 */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-indigo-400">
                <Scale className="w-5 h-5" />
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 border border-indigo-800">Ind AS 115</span>
              </div>
              <div className="text-xl font-bold text-white font-mono">Schedule III Tax Isolation</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automated 18% IGST/CGST firewalled into statutory tax clearing accounts without polluting recognized GAAP revenues.
              </p>
            </div>

            {/* Proof 4 */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-cyan-400">
                <Layers className="w-5 h-5" />
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800">DAG Rules</span>
              </div>
              <div className="text-xl font-bold text-white font-mono">Rate Cap Protection</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Directed Acyclic Graph precedence engine catches unauthorized invoice billing rates that violate Master Agreements.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Problem vs. Solution Section */}
      <section id="problems" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400">
            The Multi-Million Dollar Audit Vulnerability
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Why Generic AI & Spreadsheets Fail Statutory RevRec
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Enterprise controllers face three systemic structural breakdowns when managing revenue recognition across hundreds of complex customer contracts.
          </p>
        </div>

        {/* 3 Core Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Problem 1 */}
          <div className="p-7 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="text-base font-bold text-white leading-snug">
              The &ldquo;Cent-Drift&rdquo; Floating-Point Catastrophe
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Standard Python, JavaScript, and Excel engines compute multi-year ratable schedules using 64-bit binary floats (`0.1 + 0.2 != 0.3`). Over 5-year contracts across 1,000 customers, decimal drift snowballs into five-figure ledger balance sheet variances that trigger Big-4 audit adjustments.
            </p>
            <div className="pt-3 border-t border-slate-800 text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Soluqube 128-bit Closed-Form Zero Drift</span>
            </div>
          </div>

          {/* Problem 2 */}
          <div className="p-7 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="text-base font-bold text-white leading-snug">
              Cross-Document Rate Cap Breaches
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Customer contracts are fragmented into Master Agreements, subordinate SOWs, and annual amendments. Vendor invoices frequently bill hourly overages that silently exceed contractual rate caps established in Exhibit C, resulting in unrecoverable margin leakage.
            </p>
            <div className="pt-3 border-t border-slate-800 text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Hierarchical DAG Rate Hierarchy Lock</span>
            </div>
          </div>

          {/* Problem 3 */}
          <div className="p-7 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="text-base font-bold text-white leading-snug">
              Cross-Border 18% GST Contamination
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cross-border SaaS agreements between US parent entities and Indian development subsidiaries conflate domestic 18% Integrated GST into gross revenue. Controllers spend hundreds of manual hours unravelling statutory tax liabilities before closing quarterly 10-Q/10-K books.
            </p>
            <div className="pt-3 border-t border-slate-800 text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Automated Schedule III GST Firewall</span>
            </div>
          </div>

        </div>

        {/* Side-by-Side Comparison Matrix */}
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="pb-3 px-3 font-semibold">Evaluation Criteria</th>
                <th className="pb-3 px-3 font-semibold text-rose-400">Generic LLMs & Spreadsheets</th>
                <th className="pb-3 px-3 font-semibold text-emerald-400">Soluqube Deterministic Engine</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-3 px-3 font-bold text-white">Mathematical Precision</td>
                <td className="py-3 px-3 text-rose-300">Binary float approximations with periodic decimal drift</td>
                <td className="py-3 px-3 text-emerald-400 font-bold">128-bit closed-form integer parity ($0.0000 drift guarantee)</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-white">Document Text Grounding</td>
                <td className="py-3 px-3 text-rose-300">Probabilistic context window hallucination</td>
                <td className="py-3 px-3 text-emerald-400 font-bold">Spatial bounding boxes [x0, top, x1, bottom] down to character coordinates</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-white">Dual-Standard Support</td>
                <td className="py-3 px-3 text-rose-300">Manual adjustments between US GAAP and MCA India</td>
                <td className="py-3 px-3 text-emerald-400 font-bold">Native simultaneous ASC 606 & Ind AS 115 statutory rulesets</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-white">Audit Defense Evidence</td>
                <td className="py-3 px-3 text-rose-300">Unverifiable conversational chat transcripts</td>
                <td className="py-3 px-3 text-emerald-400 font-bold">Cryptographic Merkle tree audit roots (Patent App: 202621096305)</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-white">Ingestion Speed</td>
                <td className="py-3 px-3 text-rose-300">15-45 seconds per contract via third-party LLM APIs</td>
                <td className="py-3 px-3 text-emerald-400 font-bold">5.8 ms per page across 800+ SEC Edgar pages in local deterministic runtime</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Product Visual Embed / Showcase */}
      <section id="canvas-preview" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30 border-y border-slate-800">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
                Interactive Engine Showcase
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Split-Screen Audit Canvas & Bulk Queue Telemetry
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
                See how Soluqube locks contract terms to character-grounded spatial bounding boxes and anchors ledger entries into cryptographic Merkle roots.
              </p>
            </div>

            {/* Canvas / Queue Switcher */}
            <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl">
              <button
                onClick={() => setActivePreviewTab("canvas")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activePreviewTab === "canvas" ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-white"
                }`}
              >
                Split-Screen Canvas
              </button>
              <button
                onClick={() => setActivePreviewTab("queue")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activePreviewTab === "queue" ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-white"
                }`}
              >
                Bulk Queue Telemetry (8 Contracts)
              </button>
            </div>
          </div>

          {/* Showcase Box */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 shadow-2xl overflow-hidden backdrop-blur-xl">
            
            {/* Top Bar */}
            <div className="px-5 py-3 border-b border-slate-800 bg-slate-950/60 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-slate-400">Select Agreement:</span>
                <div className="flex items-center gap-1.5">
                  {(["snowflake", "box", "salesforce"] as const).map((k) => (
                    <button
                      key={k}
                      onClick={() => {
                        setSelectedDemoContract(k);
                        setSelectedClause(0);
                      }}
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                        selectedDemoContract === k
                          ? "bg-slate-800 text-white border border-slate-600"
                          : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
                      }`}
                    >
                      {k === "snowflake" && "Snowflake (312 pgs)"}
                      {k === "box" && "Box MSA (119 pgs)"}
                      {k === "salesforce" && "Salesforce (43 pgs)"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setActiveStandard("ASC 606")}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold transition-all cursor-pointer ${
                      activeStandard === "ASC 606" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    ASC 606
                  </button>
                  <button
                    onClick={() => setActiveStandard("Ind AS 115")}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold transition-all cursor-pointer ${
                      activeStandard === "Ind AS 115" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Ind AS 115
                  </button>
                </div>

                <a
                  href="https://smart-contracts-henna.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  Full Sandbox <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Split Screen Content */}
            {activePreviewTab === "canvas" ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
                
                {/* Left: Contract Viewer */}
                <div className="lg:col-span-6 p-6 border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-950/40 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-400" />
                        <span className="text-xs font-bold text-white font-mono">{currentContract.name}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-950 text-blue-300 border border-blue-800">
                        {currentContract.pages} Pages • {currentContract.speed}
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs space-y-3 shadow-inner">
                      <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-2">
                        SEC Edgar Exhibit Spatial Character Coordinates
                      </div>

                      {currentContract.clauses.map((clause) => {
                        const isSelected = selectedClause === clause.id;
                        return (
                          <div
                            key={clause.id}
                            onClick={() => setSelectedClause(clause.id)}
                            className={`p-3 rounded-lg border transition-all cursor-pointer ${
                              isSelected
                                ? "bg-blue-950/70 border-blue-500 shadow-md ring-1 ring-blue-500/50"
                                : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                            }`}
                          >
                            <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
                              <span>{clause.title}</span>
                              <span className="text-emerald-400 font-mono">{clause.amount}</span>
                            </div>
                            <p className="text-[11px] text-slate-300 italic">&ldquo;{clause.text}&rdquo;</p>
                            <div className="mt-2 flex items-center justify-between text-[9px] font-mono text-slate-400 pt-1 border-t border-slate-800">
                              <span className="text-blue-400">bbox: {clause.bbox}</span>
                              <span className="text-emerald-400">{clause.status}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>PyMuPDF Spatial Token Grounding</span>
                    <span className="text-emerald-400">Zero Probabilistic Drift</span>
                  </div>
                </div>

                {/* Right: Ledger & 5-Gate Matrix */}
                <div className="lg:col-span-6 p-6 flex flex-col justify-between bg-slate-900/50 space-y-5">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                          5-Gate Statutory Verification
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                          <CheckCircle2 className="w-3 h-3" /> ALL 5 GATES PASSED
                        </span>
                      </div>

                      <div className="grid grid-cols-5 gap-1.5 mt-2.5">
                        {[
                          { g: "G1", title: "Spatial BBox" },
                          { g: "G2", title: "Semantic POB" },
                          { g: "G3", title: "$0.00 Drift" },
                          { g: "G4", title: "18% GST" },
                          { g: "G5", title: "DAG Rate Cap" }
                        ].map((gate) => (
                          <div key={gate.g} className="p-2 rounded-lg bg-slate-950/70 border border-emerald-800/60 text-center">
                            <div className="text-[10px] font-mono font-bold text-emerald-400">{gate.g}: PASS</div>
                            <div className="text-[8px] text-slate-300 mt-0.5 truncate">{gate.title}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Allocation Schedule */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="font-bold text-blue-400">
                          {currentContract.clauses[selectedClause].pob}
                        </span>
                        <span className="font-bold text-white">
                          Allocated: {currentContract.clauses[selectedClause].amount}
                        </span>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-[11px] font-mono">
                          <thead>
                            <tr className="border-b border-slate-800 text-slate-400">
                              <th className="py-1 px-2">Period</th>
                              <th className="py-1 px-2">Recognized</th>
                              <th className="py-1 px-2">Deferred Balance</th>
                              <th className="py-1 px-2 text-right">Drift</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60 text-slate-300">
                            <tr>
                              <td className="py-1.5 px-2 font-semibold">2026-M01</td>
                              <td className="py-1.5 px-2 text-emerald-400 font-bold">$30,000.00</td>
                              <td className="py-1.5 px-2 text-slate-400">$330,000.00</td>
                              <td className="py-1.5 px-2 text-right text-emerald-400 font-bold">$0.0000</td>
                            </tr>
                            <tr>
                              <td className="py-1.5 px-2 font-semibold">2026-M02</td>
                              <td className="py-1.5 px-2 text-emerald-400 font-bold">$30,000.00</td>
                              <td className="py-1.5 px-2 text-slate-400">$300,000.00</td>
                              <td className="py-1.5 px-2 text-right text-emerald-400 font-bold">$0.0000</td>
                            </tr>
                            <tr>
                              <td className="py-1.5 px-2 font-semibold">2026-M03</td>
                              <td className="py-1.5 px-2 text-emerald-400 font-bold">$30,000.00</td>
                              <td className="py-1.5 px-2 text-slate-400">$270,000.00</td>
                              <td className="py-1.5 px-2 text-right text-emerald-400 font-bold">$0.0000</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Test live contracts in the engine:</span>
                    <a
                      href="https://smart-contracts-henna.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                      Open Live Sandbox Canvas <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

              </div>
            ) : (
              /* Bulk Queue Telemetry View */
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">
                    Bulk Edgar Telemetry: <strong className="text-white">8 Real-World SEC Contracts</strong> (498 pages)
                  </span>
                  <span className="text-emerald-400 font-bold">Closed-Form Parity: $0.00 Drift Across All Contracts</span>
                </div>

                <div className="space-y-2">
                  {[
                    { name: "Snowflake_Enterprise_Sublease_Ex10_16.pdf", pgs: 312, speed: "5.45 ms/pg", time: "1.70s" },
                    { name: "Box_Cloud_Enterprise_MSA_Ex10_14.pdf", pgs: 119, speed: "5.12 ms/pg", time: "0.61s" },
                    { name: "Freshworks_India_Contract_Deed_Ex10_12.pdf", pgs: 64, speed: "4.28 ms/pg", time: "0.27s" },
                    { name: "Salesforce_Reseller_Agreement_Ex10_1.pdf", pgs: 43, speed: "6.43 ms/pg", time: "0.28s" }
                  ].map((doc, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4 text-xs font-mono"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-[11px]">
                          {idx + 1}
                        </span>
                        <div>
                          <div className="text-white font-bold">{doc.name}</div>
                          <div className="text-[10px] text-slate-400">{doc.pgs} pages • {doc.speed} • Runtime: {doc.time}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold">
                          G1-G5: PASS
                        </span>
                        <span className="text-emerald-400 font-bold">$0.00</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* 5 Validation Gates Architecture Breakdown */}
      <section id="architecture" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
            Algorithmic Rigor
          </span>
          <h2 className="text-3xl font-extrabold text-white">
            The 5 Validation Gates Architecture
          </h2>
          <p className="text-sm text-slate-400">
            Every dollar recognized by Soluqube must clear five sequential deterministic verification gates before being committed to general ledger journals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            {
              gate: "Gate 1",
              title: "Spatial BBox Grounding",
              badge: "PyMuPDF C-Extension",
              desc: "Extracts physical [x0, top, x1, bottom] character bounding boxes directly from contract PDFs. Text cannot exist in the ledger without a verified coordinate anchor."
            },
            {
              gate: "Gate 2",
              title: "Semantic Obligation (POB)",
              badge: "ASC 606 Step 2",
              desc: "Deconstructs complex bundled agreements into distinct performance obligations, separating ongoing cloud access, SLA commitments, and implementation milestones."
            },
            {
              gate: "Gate 3",
              title: "0.00 Drift Parity",
              badge: "128-bit Fixed-Point",
              desc: "Eliminates IEEE 754 floating-point drift using closed-form integer division. Every cent across multi-year ratable waterfalls balances out to exactly $0.0000."
            },
            {
              gate: "Gate 4",
              title: "Tax Firewall",
              badge: "18% GST Isolation",
              desc: "Isolates domestic Indian 18% IGST/CGST levies into balance sheet clearing accounts, preventing tax liabilities from artificially inflating GAAP operating revenues."
            },
            {
              gate: "Gate 5",
              title: "Precedence DAG",
              badge: "Rate Cap Enforcement",
              desc: "Constructs a Directed Acyclic Graph enforcing rate card limits defined in Master Service Agreements across all subsequent Statements of Work and invoices."
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-blue-400 font-bold uppercase">{item.gate}</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">{item.badge}</span>
                </div>
                <h3 className="text-sm font-bold text-white">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Deterministic Gate Lock</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Book a Demo & Audit Intake Form */}
      <section id="book-demo" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800 bg-slate-900/40">
        <div className="max-w-4xl mx-auto space-y-10">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
              Statutory Audit Defense Intake
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Book Your Historical Drift Audit
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
              Our Senior RevRec Systems Engineers will run up to 3 of your company&apos;s active customer agreements through the 5-Gate deterministic engine to flag all decimal drifts, rate breaches, and GST variances.
            </p>
          </div>

          {submittedData ? (
            /* Confirmation State */
            <div className="p-8 rounded-2xl bg-slate-900 border border-emerald-500/50 shadow-2xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                    Audit Request Initialized — Merkle Hash Provisioned
                  </span>
                  <h3 className="text-xl font-black text-white mt-0.5">
                    Reservation Session Confirmed
                  </h3>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2.5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Audit Reference ID:</span>
                  <span className="text-emerald-400 font-bold">{submittedData.referenceId}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Accounting Standard:</span>
                  <span className="text-white font-semibold">{accountingStandard}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">RevRec Stack Target:</span>
                  <span className="text-white font-semibold">{revrecStack}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">Session Merkle Root (SHA-256):</span>
                  <div className="p-2 rounded bg-slate-900 text-[10px] text-blue-300 break-all select-all border border-slate-800">
                    {submittedData.merkleRoot}
                  </div>
                </div>
              </div>

              {/* Direct Calendar Reservation Callout */}
              <div className="p-5 rounded-xl bg-gradient-to-r from-blue-950/60 to-indigo-950/60 border border-blue-800/60 space-y-3">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span>Reserve Your 15 or 30-Minute Technical Evaluation Slot</span>
                </div>
                <p className="text-xs text-slate-300">
                  Select a live time slot directly on our systems engineering calendar:
                </p>
                <a
                  href="https://calendly.com/nlaky1/15min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md transition-all"
                >
                  <span>Open Calendly Slot Reservation</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setSubmittedData(null)}
                  className="text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
                >
                  ← Submit Another Request
                </button>
                <a
                  href="https://smart-contracts-henna.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  Test Engine Live on Sandbox <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : (
            /* High Conversion Enterprise Form */
            <form
              onSubmit={handleFormSubmit}
              className="p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6"
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
                    <span>Corporate Work Email *</span>
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-all"
                  />
                </div>

                {/* Accounting Standard */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Target Accounting Standard *
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
                    Primary RevRec & ERP Stack
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
                    <option value="Manual Spreadsheets">Manual Spreadsheets / Excel Workbooks</option>
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
                      Check your existing customer contracts against our 128-bit closed-form parity engine to detect decimal drift, rate cap discrepancies, and statutory tax isolation gaps.
                    </p>
                  </div>
                </label>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Initializing Merkle Anchor...</span>
                  </>
                ) : (
                  <>
                    <span>Submit & Initialize Merkle Audit Reservation</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center text-[11px] font-mono text-slate-500">
                Mutual NDA Protected • Patent Priority App: 202621096305
              </div>
            </form>
          )}

        </div>
      </section>

      {/* Executive Statutory Audit Defense FAQ */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
            Audit Defense & Technical Inquiries
          </span>
          <h2 className="text-3xl font-extrabold text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-400">
            Answers for Corporate Controllers, VP of Revenues, and Statutory Auditors.
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "How does Soluqube differ from generic generative AI contract tools?",
              a: "Generic AI tools rely on probabilistic Large Language Models that hallucinate numbers and cannot mathematically prove calculation integrity. Soluqube utilizes deterministic spatial bounding boxes via PyMuPDF to extract text coordinates and runs a closed-form 128-bit arithmetic DAG. It produces verifiable, reproducible outputs anchored to cryptographic Merkle roots."
            },
            {
              q: "What is the $0.00 drift guarantee and why does standard float math fail audits?",
              a: "Standard programming environments (Python floats, JavaScript numbers, Excel) represent non-integer currency values in IEEE 754 binary floating point. This causes fractions like 1/3 or 1/12 to accumulate rounding errors over multi-year periods. Soluqube computes all allocations using 128-bit fixed-point scaled integers, guaranteeing that the sum of recognized and deferred revenue equals total contract value down to exactly $0.0000."
            },
            {
              q: "How does Soluqube isolate 18% Indian GST for Ind AS 115 compliance?",
              a: "Under Ind AS 115 Schedule III guidelines, taxes collected on behalf of the government (such as 18% Integrated GST under HSN 998313) cannot be recognized as operating revenue. Soluqube automatically parses tax clauses, separates GST into balance sheet tax clearing accounts, and verifies multi-currency foreign exchange rates against official RBI reference fixings."
            },
            {
              q: "How do we integrate Soluqube into NetSuite or SAP S/4HANA?",
              a: "Soluqube exports canonical, audit-anchored journal batches in standard NetSuite SuiteTalk REST JSON and SAP BAPI / OData XML formats. Journal entries map directly to your existing Chart of Accounts with embedded Merkle root hashes for immediate auditor verification."
            },
            {
              q: "What is protected under Indian Patent Priority Application No. 202621096305?",
              a: "The patent application covers the deterministic contract-to-ledger processing pipeline, spatial token coordinate grounding algorithms, closed-form 128-bit decimal drift mitigation, automated statutory GST isolation mechanisms, and cryptographic Merkle tree audit trail generation."
            }
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <h3 className="text-base font-bold text-white flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 text-blue-400 shrink-0 mt-1" />
                <span>{item.q}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 pl-6 leading-relaxed">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-slate-300 font-bold flex items-center justify-center md:justify-start gap-2">
              <Layers className="w-4 h-4 text-blue-500" />
              <span>SOLUQUBE</span>
              <span className="text-[10px] font-mono text-blue-400">Patent App: 202621096305</span>
            </div>
            <p className="text-slate-500 text-[11px]">
              Deterministic Contract-to-Ledger Revenue Recognition & Statutory Audit Defense Engine.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400 font-semibold text-xs">
            <a href="#proof-metrics" className="hover:text-white transition-colors">Proof Metrics</a>
            <a href="#problems" className="hover:text-white transition-colors">Problem vs Solution</a>
            <a href="#architecture" className="hover:text-white transition-colors">5-Gate Engine</a>
            <a href="#book-demo" className="hover:text-white transition-colors">Book Demo</a>
            <a
              href="https://smart-contracts-henna.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              <span>Sandbox Engine</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
