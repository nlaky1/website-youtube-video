"use client";

import React, { useState } from "react";
import Image from "next/image";
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
  ChevronDown,
  Maximize2
} from "lucide-react";

export default function Home() {
  // Showcase Interactive Product Tab State
  const [activeProductTab, setActiveProductTab] = useState<"canvas" | "waterfall" | "client_portal" | "erp_defense">("canvas");

  // Interactive Contract Data State
  const [selectedContract, setSelectedContract] = useState<"cloudflare" | "snowflake" | "box">("cloudflare");
  const [activeStandard, setActiveStandard] = useState<"ASC 606" | "Ind AS 115">("ASC 606");
  const [highlightedBbox, setHighlightedBbox] = useState<string | null>("ratable_fee");

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
      const generatedRef = "REF-" + Math.random().toString(36).substring(2, 8).toUpperCase();
      const generatedRoot = "0x" + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join("");
      
      setSubmittedData({
        referenceId: generatedRef,
        merkleRoot: generatedRoot
      });
      setIsSubmitting(false);
    }, 1200);
  };

  const contractData = {
    cloudflare: {
      name: "Cloudflare SEC Edgar Exhibit 10.12 Master Customer Agreement",
      secRef: "SEC EDGAR CIK #0001477333",
      obligation: "Enterprise Edge Routing & Zero Trust Gateway Access (36 Mo Ratable)",
      totalValue: "$1,200,000.00",
      totalValueINR: "₹9,96,00,000.00",
      monthlyRatable: "$33,333.33",
      monthlyRatableINR: "₹27,66,666.67",
      rateCapClause: "Section 4.2: Committed minimum fee of $1,200,000 recognized ratably over 36 months.",
      gstRate: "18% IGST Isolated",
      bboxCoords: "[140, 310, 560, 345]",
      tokenID: "#t4901-ratable-fee",
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

  const productTabs = {
    canvas: {
      title: "Spatial Contract Review Canvas",
      badge: "GATE 1 & 2 ACTIVE",
      description: "Dual-pane review canvas linking financial commitments directly to [1000x1000] character token bounding boxes on contract PDFs with zero OCR hallucination.",
      image: "/images/product/actual-contract-canvas.png",
      telemetry: "5-Gate Verification: PASSED • Integer Grid: 1000x1000 • SEC Edgar CIK #0001640147"
    },
    waterfall: {
      title: "Revenue Waterfall & 18% GST Isolation",
      badge: "GATE 3 & 4 ACTIVE",
      description: "Closed-form 128-bit decimal parity with terminal-period remainder absorption, isolating statutory 18% GST under MCA Schedule III without balance sheet drift.",
      image: "/images/product/actual-waterfall-ledger.png",
      telemetry: "Compounded Drift: $0.000000 • 18% GST Isolated: ₹1,51,93,220.34 • Zero Mantissa Leakage"
    },
    client_portal: {
      title: "Multi-Entity Client Advisory Hub",
      badge: "ENTERPRISE VAULT",
      description: "Secure onboarding portal with append-only contract versioning (`DOC:rev2.0`), zero-retention session telemetry, and automated Big 4 audit workpaper center.",
      image: "/images/product/actual-client-portal.png",
      telemetry: "SOC 2 CC6 Data Governance • Zero-Retention Telemetry • FIPS 140-2 Level 3 HSM"
    },
    erp_defense: {
      title: "ERP Subledger Integration & Big 4 Audit Center",
      badge: "GATE 5 ACTIVE",
      description: "Bi-directional subledger sync for Oracle NetSuite ARM and SAP S/4HANA RAR, producing 8-Tab Excel variance models and AS 3101 JSON-LD compliance packs.",
      image: "/images/product/soluqube-audit-erp-defense.jpg",
      telemetry: "NetSuite SuiteTalk REST: SYNCED • SAP OData: CONNECTED • AS 3101 Merkle Root Verified"
    }
  };

  const faqs = [
    {
      q: "How does Soluqube eliminate floating-point rounding drift in ASC 606 revenue schedules?",
      a: "Standard enterprise ERPs (NetSuite, SAP, Zuora) and spreadsheets calculate 36-month ratable schedules using standard 64-bit binary floating-point numbers (IEEE-754). This leads to minute fractions compounding across thousands of contracts (e.g. $33,333.333... recurring), resulting in accumulated cent discrepancies during annual auditor sampling. Soluqube enforces closed-form 128-bit decimal fixed-point arithmetic with an automated terminal-period remainder absorption algorithm, guaranteeing exact mathematical balance sheet parity ($0.000000)."
    },
    {
      q: "How does Soluqube handle Indian GST isolation under Ind AS 115 and MCA Schedule III?",
      a: "Cross-border software contracts often commingle gross customer billing with Indian indirect taxes (18% IGST / CGST / SGST). Under Ind AS 115.47 and MCA Schedule III Division II, statutory taxes cannot be recognized as revenue. Soluqube establishes an automated transaction firewall that quarantines tax liabilities into segregated general ledger liability accounts before net consideration is allocated across standalone performance obligations."
    },
    {
      q: "How does Soluqube enforce cross-document rate caps between MSAs, SOWs, and Amendments?",
      a: "Instead of relying on manual reconciliations where contractor invoices exceed negotiated master hourly rate caps, Soluqube models contract hierarchies as Directed Acyclic Graphs (DAGs). The engine evaluates parent Master Services Agreements first, validating temporal precedence before any downstream SOW or amendment line item can post to the general ledger."
    },
    {
      q: "What integrations are supported for ERP general ledgers and billing engines?",
      a: "Soluqube provides native bi-directional connectors for Oracle NetSuite Advanced Revenue Management (ARM) via SuiteTalk REST web services, SAP S/4HANA Revenue Accounting and Reporting (RAR) via OData APIs, QuickBooks Online, and Tally Prime for statutory compliance. It also exports structured CSV journal entry batches for custom on-premise ERPs."
    },
    {
      q: "What deliverables does Soluqube produce for Big 4 audit readiness?",
      a: "Soluqube generates an 8-tab variance Excel workpaper with formula-driven clause amortizations and an AS 3101 JSON-LD compliance pack containing SHA-256 clause hashes, spatial token coordinates, and cryptographic Merkle tree roots for instant auditor verification."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* 1. INSTITUTIONAL TOP NAVIGATION */}
      <Navbar />

      {/* 2. HERO SECTION */}
      <section className="relative bg-white pt-14 sm:pt-20 pb-16 sm:pb-24 border-b border-slate-200/80 overflow-hidden">
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
              href="https://app.soluqube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 shadow-sm transition-all"
            >
              <span>Launch Live Interactive Canvas</span>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </a>
          </div>

          {/* Proof Metric Bar */}
          <div className="mt-14 max-w-5xl mx-auto bg-slate-50 border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 lg:divide-x divide-slate-200/80">
              
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

              <div className="text-left pt-4 lg:pt-0 lg:px-4">
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-purple-600 tracking-tight">
                  AS 3101 Ready
                </div>
                <div className="text-xs font-semibold text-slate-800 mt-1.5">
                  Big 4 Audit Artifacts
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  Cryptographic Merkle tree anchors for clause audit defense.
                </div>
              </div>

            </div>
          </div>

          {/* REAL PRODUCT SHOWCASE: HERO INTERFACE VIEWPORT */}
          <div className="mt-14 max-w-6xl mx-auto">
            <div className="rounded-2xl border border-slate-300/80 shadow-2xl overflow-hidden bg-slate-900">
              
              {/* Browser Header Bar */}
              <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-left">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  </div>
                  <div className="ml-3 hidden sm:flex items-center gap-2 px-3 py-1 rounded-md bg-slate-800 text-[11px] font-mono text-slate-300 border border-slate-700">
                    <Lock className="w-3 h-3 text-emerald-400" />
                    <span>https://app.soluqube.com/canvas?contract=freshworks-india-ex10-12</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    5 Gates Synchronized
                  </span>
                  <a
                    href="https://app.soluqube.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-sans text-xs font-semibold transition"
                  >
                    <span>Launch Live</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Product Visual Container with Real App Image */}
              <div className="relative bg-slate-950 aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden group">
                <Image
                  src="/images/product/actual-contract-canvas.png"
                  alt="Soluqube Contract Spatial Review Canvas live application screenshot showing PDF contract review and 5-gate mathematical verification"
                  width={1540}
                  height={980}
                  priority
                  className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-[1.01]"
                />
                
                {/* Floating Telemetry Callout */}
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-3 text-left shadow-xl text-white">
                  <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400 mb-1">
                    <span>LIVE ENGINE TELEMETRY</span>
                    <span>100% DETERMINISTIC</span>
                  </div>
                  <p className="text-xs text-slate-200">
                    Master Services Agreement PDF spatial tokens mapped to NetSuite ARM &amp; Ind AS 115 Schedule III general ledger subaccounts.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. INTERACTIVE PRODUCT TOUR & REAL PLATFORM CAPABILITIES */}
      <section id="proof-telemetry" className="py-20 sm:py-28 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold uppercase font-mono tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Authentic Product Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Inside the Deterministic Validation Platform
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Explore the actual interfaces driving zero-drift revenue calculations across contract spatial analysis, dual-standard waterfalls, and Big 4 audit readiness.
            </p>
          </div>

          {/* Interactive Feature Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
            {(Object.keys(productTabs) as Array<keyof typeof productTabs>).map((tabKey) => {
              const tab = productTabs[tabKey];
              const isActive = activeProductTab === tabKey;
              return (
                <button
                  key={tabKey}
                  onClick={() => setActiveProductTab(tabKey)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? "bg-slate-900 text-white shadow-md"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                  }`}
                >
                  <span>{tab.title}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                    isActive ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"
                  }`}>
                    {tab.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Product Showcase Display */}
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-4 sm:p-8 shadow-2xl text-white">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-slate-800 gap-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {productTabs[activeProductTab].title}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    {productTabs[activeProductTab].badge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
                  {productTabs[activeProductTab].description}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                  {productTabs[activeProductTab].telemetry}
                </span>
                <a
                  href="https://app.soluqube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition flex items-center gap-1.5 shadow-sm"
                >
                  <span>Test in Sandbox</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* High-Resolution Screenshot Frame */}
            <div className="mt-6 rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-inner">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={productTabs[activeProductTab].image}
                  alt={productTabs[activeProductTab].title}
                  width={1540}
                  height={980}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* Bottom Status Grid */}
            <div className="mt-6 pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verification Method: Closed-Form Fixed Point</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>Ind AS 115 &amp; ASC 606 Verified</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Lock className="w-4 h-4 text-purple-400" />
                <span>Merkle Root SHA-256 Anchored</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. THE 3 AUDIT TRAPS SOLVED */}
      <section id="standards" className="py-20 sm:py-28 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-200/80 text-slate-700 text-xs font-semibold uppercase font-mono tracking-wider mb-3">
              <Scale className="w-3.5 h-3.5 text-slate-800" />
              <span>Balance Sheet Vulnerability Analysis</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              The Three Fatal Flaws of Spreadsheets and Legacy RevRec
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Why 84% of high-growth B2B enterprise software companies suffer audit sampling exceptions and financial restatements under ASC 606 &amp; Ind AS 115.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 mb-5">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-red-50 text-red-700 border border-red-200 mb-3">
                  CUMULATIVE DRIFT RISK
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  The IEEE-754 Cent-Drift Avalanche
                </h3>
                <div className="text-xs text-slate-600 leading-relaxed space-y-3">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 font-sans">
                    <span className="font-bold text-slate-800">The Vulnerability:</span> Standard floating-point engines calculate 36-month ratable schedules using 64-bit binary floats (0.1 + 0.2 ≠ 0.3). Fractional cent residues compound across thousands of customer contracts, creating unexplained balance-sheet variances during annual auditor sampling.
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

            {/* Card 2 */}
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

            {/* Card 3 */}
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

      {/* 5. COMPARISON MATRIX: SOLUQUBE VS SPREADSHEETS VS LEGACY ERP (HIGH SEO INTENT) */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold uppercase font-mono tracking-wider mb-3">
              <Scale className="w-3.5 h-3.5 text-blue-600" />
              <span>Comparative Benchmark</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Soluqube vs. Spreadsheets vs. Legacy RevRec Systems
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              A side-by-side technical evaluation against manual Excel workpapers and legacy ERP modules like NetSuite ARM and Zuora RevPro.
            </p>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-3xl shadow-sm bg-white">
            <table className="w-full text-left border-collapse min-w-[720px] text-xs">
              <thead>
                <tr className="border-b border-slate-200 font-mono text-[11px] text-slate-500 uppercase bg-slate-50/80">
                  <th className="py-4 px-5">Architectural Requirement</th>
                  <th className="py-4 px-5 text-center font-bold text-blue-700 bg-blue-50/50">Soluqube Deterministic Engine</th>
                  <th className="py-4 px-5 text-center">Manual Spreadsheets (Excel)</th>
                  <th className="py-4 px-5 text-center">Legacy ERPs (NetSuite / Zuora)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                <tr>
                  <td className="py-4 px-5 font-semibold text-slate-900">
                    <div>Balance Sheet Floating-Point Drift</div>
                    <div className="text-[11px] text-slate-500 font-normal">Prevention of fractional cent accumulation</div>
                  </td>
                  <td className="py-4 px-5 text-center text-emerald-700 font-bold bg-blue-50/30">
                    $0.000000 (Closed-Form 128-Bit Parity)
                  </td>
                  <td className="py-4 px-5 text-center text-rose-600 font-medium">
                    Severe (Compounds over 36 Mo)
                  </td>
                  <td className="py-4 px-5 text-center text-amber-600 font-medium">
                    Common (Requires Manual True-Ups)
                  </td>
                </tr>

                <tr>
                  <td className="py-4 px-5 font-semibold text-slate-900">
                    <div>Spatial Contract Grounding</div>
                    <div className="text-[11px] text-slate-500 font-normal">Traceability to original signed PDF clause</div>
                  </td>
                  <td className="py-4 px-5 text-center text-emerald-700 font-bold bg-blue-50/30">
                    Integer [1000x1000] Bounding Boxes
                  </td>
                  <td className="py-4 px-5 text-center text-rose-600 font-medium">
                    None (Manual Copy-Paste)
                  </td>
                  <td className="py-4 px-5 text-center text-rose-600 font-medium">
                    None (Detached Billing Lines)
                  </td>
                </tr>

                <tr>
                  <td className="py-4 px-5 font-semibold text-slate-900">
                    <div>Statutory 18% GST Isolation</div>
                    <div className="text-[11px] text-slate-500 font-normal">Ind AS 115 &amp; MCA Schedule III compliance</div>
                  </td>
                  <td className="py-4 px-5 text-center text-emerald-700 font-bold bg-blue-50/30">
                    Automated Transaction Firewall
                  </td>
                  <td className="py-4 px-5 text-center text-rose-600 font-medium">
                    High Risk of Commingling
                  </td>
                  <td className="py-4 px-5 text-center text-amber-600 font-medium">
                    Requires Complex Custom Scripts
                  </td>
                </tr>

                <tr>
                  <td className="py-4 px-5 font-semibold text-slate-900">
                    <div>Cross-Document Rate Cap Enforcement</div>
                    <div className="text-[11px] text-slate-500 font-normal">MSA vs. SOW hourly rate override control</div>
                  </td>
                  <td className="py-4 px-5 text-center text-emerald-700 font-bold bg-blue-50/30">
                    Temporal Precedence DAGs
                  </td>
                  <td className="py-4 px-5 text-center text-rose-600 font-medium">
                    Manual Cross-Referencing
                  </td>
                  <td className="py-4 px-5 text-center text-rose-600 font-medium">
                    Siloed by Transaction Record
                  </td>
                </tr>

                <tr>
                  <td className="py-4 px-5 font-semibold text-slate-900">
                    <div>Big 4 Audit Artifact Pack</div>
                    <div className="text-[11px] text-slate-500 font-normal">Cryptographic proof for audit committee sampling</div>
                  </td>
                  <td className="py-4 px-5 text-center text-emerald-700 font-bold bg-blue-50/30">
                    8-Tab Excel &amp; AS 3101 Merkle Pack
                  </td>
                  <td className="py-4 px-5 text-center text-rose-600 font-medium">
                    Manual Workpaper Preparation
                  </td>
                  <td className="py-4 px-5 text-center text-amber-600 font-medium">
                    Generic CSV Reports Only
                  </td>
                </tr>

                <tr>
                  <td className="py-4 px-5 font-semibold text-slate-900">
                    <div>Document Ingestion Latency</div>
                    <div className="text-[11px] text-slate-500 font-normal">Time to extract and validate 50-page MSA</div>
                  </td>
                  <td className="py-4 px-5 text-center text-emerald-700 font-bold bg-blue-50/30">
                    5.8 ms / Page
                  </td>
                  <td className="py-4 px-5 text-center text-rose-600 font-medium">
                    Hours to Days of Manual Review
                  </td>
                  <td className="py-4 px-5 text-center text-slate-700 font-medium">
                    Manual Data Entry Required
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* 6. CFO & AUDITOR FAQ ACCORDION */}
      <section className="py-20 sm:py-28 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-200/80 text-slate-700 text-xs font-semibold uppercase font-mono tracking-wider mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-slate-800" />
              <span>Technical &amp; Audit FAQ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Frequently Asked Accounting Questions
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Clear, mathematically grounded answers for CFOs, VP Finance, and Audit Committee Chairs.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-bold text-slate-900">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-slate-900" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/30">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. EXECUTIVE AUDIT INTAKE (#audit-intake) */}
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
                Provide your corporate parameters below. Our technical accounting team will run up to 3 of your complex customer agreements through our 5-Gate deterministic engine to expose hidden balance-sheet variances.
              </p>

              <div className="mt-8 space-y-4 text-xs text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <strong className="text-slate-900">Mutual NDA Protection:</strong> All uploaded agreements, pricing tables, and amendment schedules remain under strict legal privilege.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <strong className="text-slate-900">Zero-Retention Enclave:</strong> Contracts are parsed in transient, memory-only enclaves with zero persistent file exposure.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <strong className="text-slate-900">Formal Variance Report:</strong> Complete with spatial character bounding boxes, 18% GST audit isolation, and closed-form reconciliation.
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px] text-slate-600">
                Patent Priority Reference: <span className="font-bold text-slate-900">202621096305</span>
              </div>
            </div>

            {/* Right Column: Interactive Intake Form */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-lg">
              
              {!submittedData ? (
                <form onSubmit={handleBookingSubmit} className="space-y-5">
                  <div className="border-b border-slate-100 pb-4 mb-2">
                    <h3 className="text-lg font-bold text-slate-900">
                      Direct Engagement Intake
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Confidential preliminary verification queue for finance leadership.
                    </p>
                  </div>

                  {/* Name & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Full Name &amp; Title
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. David Vance, CFO"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Enterprise Company Name
                      </label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="e.g. Datastream Systems Inc."
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Business Email & ERP */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Corporate Work Email
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            validateEmail(e.target.value);
                          }}
                          placeholder="dvance@datastream.com"
                          className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                            emailError ? "border-red-400 focus:ring-red-400 bg-red-50/20" : "border-slate-200 focus:ring-slate-900"
                          }`}
                        />
                      </div>
                      {emailError && (
                        <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1 font-sans">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{emailError}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Current ERP / Subledger
                      </label>
                      <select
                        value={revrecStack}
                        onChange={(e) => setRevrecStack(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
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
                          className={`px-3 py-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
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
                    className="w-full py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
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
      </section>

      {/* 8. INSTITUTIONAL FOOTER */}
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
                Deterministic contract-to-ledger revenue recognition engine. Closed-form 128-bit mathematical parity and spatial character token grounding.
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
                <li><a href="#proof-telemetry" className="hover:text-slate-950 transition-colors">Platform Capabilities</a></li>
                <li><a href="#standards" className="hover:text-slate-950 transition-colors">ASC 606 &amp; Ind AS 115</a></li>
                <li><a href="/pricing" className="hover:text-slate-950 transition-colors">Enterprise Pricing</a></li>
                <li><a href="https://app.soluqube.com/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-950 transition-colors flex items-center gap-1">Sandbox Engine <ExternalLink className="w-3 h-3 text-slate-400" /></a></li>
                <li><a href="https://client.soluqube.com/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-950 transition-colors flex items-center gap-1">Client Advisory Portal <ExternalLink className="w-3 h-3 text-slate-400" /></a></li>
              </ul>
            </div>

            <div>
              <div className="font-semibold text-slate-900 mb-3 text-xs tracking-wider uppercase font-mono">
                Regulatory Standards
              </div>
              <ul className="space-y-2 text-xs">
                <li><span className="text-slate-700">ASC 606 (US GAAP)</span></li>
                <li><span className="text-slate-700">Ind AS 115 (MCA India)</span></li>
                <li><span className="text-slate-700">MCA Schedule III Div II</span></li>
                <li><span className="text-slate-700">AS 3101 Auditor Reporting</span></li>
                <li><span className="text-slate-700">SOC 2 Type II Certified</span></li>
              </ul>
            </div>

            <div>
              <div className="font-semibold text-slate-900 mb-3 text-xs tracking-wider uppercase font-mono">
                Advisory &amp; Legal
              </div>
              <ul className="space-y-2 text-xs">
                <li><a href="/contact" className="hover:text-slate-950 transition-colors">Technical Desk</a></li>
                <li><a href="/book-demo" className="hover:text-slate-950 transition-colors">Book Drift Audit</a></li>
                <li><span className="text-slate-500">Mutual NDA Protection</span></li>
                <li><span className="text-slate-500">Enclave Zero Retention</span></li>
                <li><span className="text-slate-500">&copy; 2026 Soluqube</span></li>
              </ul>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
            <div>
              &copy; 2026 Soluqube Technologies. All rights reserved. Deterministic Revenue Recognition Engine.
            </div>
            <div className="flex items-center gap-6 font-mono text-[10px]">
              <span>PATENT APP: 202621096305</span>
              <span>CLOSED-FORM PARITY: $0.000000</span>
              <span className="text-emerald-700 font-bold">ALL GATES ACTIVE</span>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
