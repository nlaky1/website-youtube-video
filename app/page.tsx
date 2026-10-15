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
    const clean = val.toLowerCase().trim();
    if (clean === "nlaky1@gmail.com" || clean === "nikhillaky@gmail.com") {
      setEmailError("");
      return true;
    }
    const domain = clean.split("@")[1];
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

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email) || !fullName || !company) {
      if (!validateEmail(email)) {
        setEmailError("A valid corporate business email is required.");
      }
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          company,
          email,
          revrecStack,
          accountingStandard,
          driftAuditOffer
        })
      });

      const data = await res.json();
      const generatedRef = data.referenceId || ("REF-" + Math.random().toString(36).substring(2, 8).toUpperCase());
      const generatedRoot = "0x" + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join("");
      
      setSubmittedData({
        referenceId: generatedRef,
        merkleRoot: generatedRoot
      });
    } catch (err) {
      console.warn("Intake submission fallback:", err);
      const generatedRef = "REF-" + Math.random().toString(36).substring(2, 8).toUpperCase();
      const generatedRoot = "0x" + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join("");
      setSubmittedData({
        referenceId: generatedRef,
        merkleRoot: generatedRoot
      });
    } finally {
      setIsSubmitting(false);
    }
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
      description: "Dual-pane review canvas that shows each performance obligation next to the contract clause it came from, so every allocation row has a page and an excerpt behind it.",
      image: "/images/product/actual-contract-canvas.png",
      telemetry: "5-Gate Verification: PASSED • SEC Edgar CIK #0001640147"
    },
    waterfall: {
      title: "Revenue Waterfall & 18% GST Isolation",
      badge: "GATE 3 & 4 ACTIVE",
      description: "Integer (BigInt) fixed-point parity, rounded to cents, with terminal-period remainder absorption, isolating statutory 18% GST under MCA Schedule III for INR contracts, so the schedule ties to $0.00 deferred.",
      image: "/images/product/actual-waterfall-ledger.png",
      telemetry: "Ending deferred: $0.00 • terminal-period absorption • 18% GST isolated (INR contracts)"
    },
    client_portal: {
      title: "Client Portal",
      badge: "ACCOUNT PORTAL",
      description: "Upload a contract, confirm the extracted terms, and download the hashed workbook. Uploaded PDFs are processed in memory and are not stored in the database.",
      image: "/images/product/actual-client-portal.png",
      telemetry: "Encrypted in Transit • Uploads Not Stored • SHA-256 Integrity Hashes on Exports"
    },
    erp_defense: {
      title: "ERP-Ready Schedule Export & Audit Evidence Center",
      badge: "GATE 5 ACTIVE",
      description: "Exports a schedule you can load into Oracle NetSuite ARM or SAP S/4HANA RAR, plus an Excel workpaper and a JSON evidence pack. Live ERP connectors are on the roadmap.",
      image: "/images/product/soluqube-audit-erp-defense.jpg",
      telemetry: "Export: Excel + JSON evidence pack, SHA-256 hashed"
    }
  };

  const faqs = [
    {
      q: "How does Soluqube make ASC 606 revenue schedules tie to the cent?",
      a: "Hand-built spreadsheet schedules often carry small rounding differences (e.g. $33,333.333... recurring) and undocumented SSP judgement that a Controller has to explain at audit. Penny rounding is below materiality; the harder question is whether the SSP allocation can be defended. Soluqube uses integer (BigInt) arithmetic at 10^6 scale, rounded to cents, allocates on relative standalone selling prices, and absorbs the remainder in the terminal period, so the schedule ties to the contract value and ends at $0.00 deferred, identically on every run."
    },
    {
      q: "How does Soluqube handle Indian GST isolation under Ind AS 115 and MCA Schedule III?",
      a: "Cross-border software contracts often commingle gross customer billing with Indian indirect taxes (18% IGST / CGST / SGST). Under Ind AS 115.47 and MCA Schedule III Division II, statutory taxes cannot be recognized as revenue. For INR contracts, Soluqube isolates the 18% GST into segregated general ledger liability accounts before net consideration is allocated across standalone performance obligations."
    },
    {
      q: "Does Soluqube handle contract amendments and modifications?",
      a: "Not yet. Soluqube processes one USD or INR customer contract at a time: it allocates the transaction price on relative standalone selling prices and builds the full-term schedule. It refuses amendments, invoices, scanned PDFs and contracts with redacted prices. Contract-modification accounting is on the roadmap; today you assess a modification under ASC 606-10-25-10 to 25-13 yourself."
    },
    {
      q: "What integrations are supported for ERP general ledgers and billing engines?",
      a: "Today Soluqube exports the allocation and full-term schedule as Excel and CSV files you can review and load into Oracle NetSuite Advanced Revenue Management (ARM), SAP S/4HANA Revenue Accounting and Reporting (RAR), QuickBooks, Tally Prime, or another general ledger. Live ERP connectors are on the roadmap; there is no direct sync today."
    },
    {
      q: "What deliverables does Soluqube produce for audit readiness?",
      a: "Soluqube generates a 5-sheet Excel workbook (Summary, Allocation, Schedule, Clause Evidence, Event Log) and a JSON evidence pack containing clause evidence (page + excerpt) per obligation, SHA-256 hashes, and a Merkle root computed on the export, so your auditor can re-run it and get identical output."
    }
  ];

  // FAQPage JSON-LD for the FAQ that is visible on this page only (SEO audit 2026-10-15, C1).
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://soluqube.com/#faq",
    mainEntity: faqs
      .map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-slate-900 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
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
            Defensible Revenue Allocation, Tied to the Cent.
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
            When your auditor questions a standalone selling price allocation, Soluqube produces the deterministic allocation, the full-term schedule that ties to $0.00, and a hashed evidence workpaper — integer arithmetic under ASC 606 and Ind AS 115, not a spreadsheet.
          </p>

          {/* Dual Call-to-Action */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#audit-intake"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 shadow-md shadow-slate-900/10 hover:shadow-lg transition-all"
            >
              <span>Request a Free 3-Contract Audit-Defense Workpaper</span>
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
                  To the cent
                </div>
                <div className="text-xs font-semibold text-slate-800 mt-1.5">
                  Terminal-Period Absorption
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  Integer (BigInt) arithmetic at 10^6 scale; the final period absorbs the remainder so deferred ends at $0.00.
                </div>
              </div>

              <div className="text-left pt-3 lg:pt-0 lg:px-4">
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-600 tracking-tight flex items-center gap-1">
                  <span>Relative SSP</span>
                </div>
                <div className="text-xs font-semibold text-slate-800 mt-1.5">
                  Allocation per ASC 606-10-32-31
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  Transaction price allocated on relative standalone selling prices, deterministically.
                </div>
              </div>

              <div className="text-left pt-4 lg:pt-0 lg:px-4">
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-blue-600 tracking-tight">
                  18% GST isolated
                </div>
                <div className="text-xs font-semibold text-slate-800 mt-1.5">
                  Ind AS 115 (INR Contracts)
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  GST separated from revenue before net consideration is amortised. US contracts carry no GST.
                </div>
              </div>

              <div className="text-left pt-4 lg:pt-0 lg:px-4">
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-purple-600 tracking-tight">
                  SHA-256 hashed
                </div>
                <div className="text-xs font-semibold text-slate-800 mt-1.5">
                  Re-runnable Workpaper
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  Same input, byte-identical output; hashed exports you can re-run in front of your auditor.
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
                    Each performance obligation carries clause evidence (page + excerpt) from the agreement. You confirm obligations and prices; the engine allocates and schedules.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. INTERACTIVE PRODUCT TOUR & REAL PLATFORM CAPABILITIES */}
      <section id="architecture" className="py-20 sm:py-28 bg-white border-b border-slate-200/80">
        <div id="proof-telemetry"></div>
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
              Explore the actual interfaces driving deterministic revenue calculations across clause evidence review, dual-standard waterfalls, and audit readiness.
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
              Where spreadsheet and legacy RevRec workflows leave SSP allocations, schedules, and tax treatment hard to defend under ASC 606 &amp; Ind AS 115.
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
                  SSP DEFENSIBILITY RISK
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Undocumented SSP Judgement &amp; Rounding Differences
                </h3>
                <div className="text-xs text-slate-600 leading-relaxed space-y-3">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 font-sans">
                    <span className="font-bold text-slate-800">The Vulnerability:</span> Relative-SSP allocations and 36-month schedules built by hand in spreadsheets leave the SSP judgement undocumented and carry small rounding differences that a Controller has to explain when the auditor challenges the allocation.
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200 text-emerald-950 font-sans">
                    <span className="font-bold text-emerald-900">Soluqube Solution:</span> Soluqube uses integer (BigInt) arithmetic at 10^6 scale, rounded to cents, with terminal-period remainder absorption, so schedules tie to the contract value and the SSP weights are recorded in a hashed workpaper.
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Audit Risk: HIGH</span>
                <span className="text-emerald-700 font-bold">Ties to the Cent</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 mb-5">
                  <Layers className="w-5 h-5" />
                </div>
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-purple-50 text-purple-700 border border-purple-200 mb-3">
                  EVIDENCE GAP RISK
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Allocations Detached from the Contract
                </h3>
                <div className="text-xs text-slate-600 leading-relaxed space-y-3">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 font-sans">
                    <span className="font-bold text-slate-800">The Vulnerability:</span> Spreadsheet allocations rarely record which clause each obligation and price came from, so the auditor has to re-trace the contract by hand.
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200 text-emerald-950 font-sans">
                    <span className="font-bold text-emerald-900">Soluqube Solution:</span> Soluqube records the page and excerpt behind each obligation and price, and you confirm the terms before the schedule is built.
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Audit Risk: HIGH</span>
                <span className="text-emerald-700 font-bold">Page + Excerpt Evidence</span>
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
                    <span className="font-bold text-slate-800">The Vulnerability:</span> Cross-border enterprise software groups frequently contaminate US GAAP revenue recognition by commingling 18% Indian GST within gross bookings, overstating revenue under Ind AS 115 and MCA Schedule III.
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200 text-emerald-950 font-sans">
                    <span className="font-bold text-emerald-900">Soluqube Solution:</span> For INR contracts, Soluqube isolates the 18% GST into a Schedule III liability line before net consideration is allocated and amortised.
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
                    <div>Schedule Ties to Contract Value</div>
                    <div className="text-[11px] text-slate-500 font-normal">Full-term schedule ends at $0.00 deferred</div>
                  </td>
                  <td className="py-4 px-5 text-center text-emerald-700 font-bold bg-blue-50/30">
                    To the cent (terminal-period absorption)
                  </td>
                  <td className="py-4 px-5 text-center text-rose-600 font-medium">
                    Manual Rounding Plugs
                  </td>
                  <td className="py-4 px-5 text-center text-amber-600 font-medium">
                    Depends on Configuration
                  </td>
                </tr>

                <tr>
                  <td className="py-4 px-5 font-semibold text-slate-900">
                    <div>Clause Evidence</div>
                    <div className="text-[11px] text-slate-500 font-normal">Traceability to original signed PDF clause</div>
                  </td>
                  <td className="py-4 px-5 text-center text-emerald-700 font-bold bg-blue-50/30">
                    Clause Evidence Per Obligation
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
                    Automated (INR Contracts)
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
                    <div>Audit-Ready Evidence Pack</div>
                    <div className="text-[11px] text-slate-500 font-normal">SHA-256 hash your auditor can re-compute</div>
                  </td>
                  <td className="py-4 px-5 text-center text-emerald-700 font-bold bg-blue-50/30">
                    5-Sheet Excel &amp; JSON Evidence Pack
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
                    <div>Contract Intake</div>
                    <div className="text-[11px] text-slate-500 font-normal">How obligations and prices are captured</div>
                  </td>
                  <td className="py-4 px-5 text-center text-emerald-700 font-bold bg-blue-50/30">
                    Assisted Extraction + Manual Confirmation
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
                Request a Free 3-Contract Audit-Defense Workpaper
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                Provide your corporate parameters below. Nikhil, the founder, will personally run up to 3 of your complex customer agreements through our 5-Gate deterministic engine and deliver the SSP allocation, the full-term schedule that ties to the cent, and a hashed evidence workpaper.
              </p>

              <div className="mt-8 space-y-4 text-xs text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <strong className="text-slate-900">Mutual NDA on Request:</strong> We sign a mutual NDA before you share any agreement.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <strong className="text-slate-900">In-Memory Processing:</strong> Uploaded contract PDFs are processed in memory and are not stored in our database.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <strong className="text-slate-900">Audit-Defense Workpaper:</strong> SSP allocation and full-term schedule with clause references (page + excerpt) for every obligation, Ind AS 115 GST isolation for INR contracts, and a SHA-256 hash.
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px] text-slate-600">
                Patent Pending (App. No. <span className="font-bold text-slate-900">202621096305</span>)
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
                      <span className="font-bold text-slate-900 block">Free 3-Contract Audit-Defense Workpaper</span>
                      Includes the SSP allocation, the schedule that ties to the cent, and a hashed evidence workpaper for the three contracts at no charge.
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
                        <span>Submitting Request...</span>
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
                      Audit Request Logged
                    </span>
                    <h3 className="text-xl font-bold text-slate-900">
                      Request Received
                    </h3>
                    <p className="text-xs text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
                      Nikhil, the founder, will reply within 1 business day with next steps for sharing your contracts.
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
                      <span>Request Token:</span>
                      <span className="text-slate-800 font-semibold truncate max-w-[200px]">{submittedData.merkleRoot}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Selected Standard:</span>
                      <span className="text-blue-700 font-semibold">{accountingStandard}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Audit-Defense Workpaper:</span>
                      <span className="text-emerald-700 font-bold">REQUESTED (FREE)</span>
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
                Deterministic contract-to-ledger revenue recognition engine. Integer (BigInt) arithmetic and clause evidence (page + excerpt) per obligation.
              </p>
              <div className="font-mono text-[11px] text-slate-500">
                Patent Pending (App. No. 202621096305)
              </div>
            </div>

            <div>
              <div className="font-semibold text-slate-900 mb-3 text-xs tracking-wider uppercase font-mono">
                Product &amp; Hubs
              </div>
              <ul className="space-y-2 text-xs">
                <li><a href="/asc-606" className="hover:text-slate-950 transition-colors">ASC 606 Technical Hub</a></li>
                <li><a href="/asc-606-vs-ind-as-115" className="hover:text-slate-950 transition-colors">ASC 606 vs Ind AS 115</a></li>
                <li><a href="/blog" className="hover:text-slate-950 transition-colors">Engineering Blog (12 Pillars)</a></li>
                <li><a href="/glossary" className="hover:text-slate-950 transition-colors">Revenue Recognition Glossary</a></li>
                <li><a href="/pricing" className="hover:text-slate-950 transition-colors">Enterprise Pricing</a></li>
                <li><a href="/audit" className="hover:text-slate-950 transition-colors">Interactive Audit Simulator</a></li>
                <li><a href="https://app.soluqube.com/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-950 transition-colors flex items-center gap-1">Sandbox Engine <ExternalLink className="w-3 h-3 text-slate-400" /></a></li>
                <li><a href="https://client.soluqube.com/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-950 transition-colors flex items-center gap-1">Client Advisory Portal <ExternalLink className="w-3 h-3 text-slate-400" /></a></li>
              </ul>
            </div>

            <div>
              <div className="font-semibold text-slate-900 mb-3 text-xs tracking-wider uppercase font-mono">
                Competitor Benchmarks
              </div>
              <ul className="space-y-2 text-xs">
                <li><a href="/soluqube-vs-maxio" className="hover:text-slate-950 transition-colors">Soluqube vs Maxio</a></li>
                <li><a href="/soluqube-vs-trullion" className="hover:text-slate-950 transition-colors">Soluqube vs Trullion</a></li>
                <li><a href="/soluqube-vs-rightrev" className="hover:text-slate-950 transition-colors">Soluqube vs RightRev</a></li>
                <li><a href="/soluqube-vs-leapfin" className="hover:text-slate-950 transition-colors">Soluqube vs Leapfin</a></li>
                <li><a href="/soluqube-vs-klarity" className="hover:text-slate-950 transition-colors">Soluqube vs Klarity</a></li>
                <li><a href="/alternatives" className="hover:text-slate-950 transition-colors">Alternatives Guides</a></li>
              </ul>
            </div>

            <div>
              <div className="font-semibold text-slate-900 mb-3 text-xs tracking-wider uppercase font-mono">
                Advisory &amp; Legal
              </div>
              <ul className="space-y-2 text-xs">
                <li><a href="/contact" className="hover:text-slate-950 transition-colors">Technical Desk</a></li>
                <li><a href="/book-demo" className="hover:text-slate-950 transition-colors">Free Audit-Defense Workpaper</a></li>
                <li><a href="https://www.crunchbase.com/organization/soluqube" target="_blank" rel="noopener noreferrer" className="hover:text-slate-950 transition-colors flex items-center gap-1">Crunchbase <ExternalLink className="w-3 h-3 text-slate-400" /></a></li>
                <li><a href="https://www.linkedin.com/company/soluqube" target="_blank" rel="noopener noreferrer" className="hover:text-slate-950 transition-colors flex items-center gap-1">LinkedIn <ExternalLink className="w-3 h-3 text-slate-400" /></a></li>
                <li><span className="text-slate-500">Mutual NDA on Request</span></li>
                <li><span className="text-slate-500">Uploads Processed in Memory</span></li>
                <li><span className="text-slate-500">&copy; 2026 Soluqube</span></li>
              </ul>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
            <div>
              &copy; 2026 Soluqube Technologies. All rights reserved. Deterministic Revenue Recognition Engine.
            </div>
            <div className="flex items-center gap-6 font-mono text-[10px]">
              <span>PATENT PENDING (APP. NO. 202621096305)</span>
              <span>ENDING DEFERRED: $0.00</span>
              <span className="text-emerald-700 font-bold">ALL GATES ACTIVE</span>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
