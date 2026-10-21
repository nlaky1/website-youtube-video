import type { PageFaq } from "@/lib/page-faqs";
/**
 * "<Vendor> alternatives" pages.
 *
 * Editorial rules:
 * - Vendor facts come only from the vendor's own public pages (or the vendor's official
 *   documentation where the marketing site blocked automated access), checked on CHECKED_ON.
 *   Each vendor lists the URLs used.
 * - "Not mentioned" means the page we read did not say it, not that the product lacks it.
 * - No invented pricing: if a price is not public, it says "Not published".
 * - Soluqube is described with its real limits.
 */

export const CHECKED_ON = "15 October 2026";
export const CHECKED_ON_ISO = "2026-10-15";

export interface Source {
  label: string;
  url: string;
}

export interface VendorProfile {
  key: string;
  name: string;
  /** One line, vendor-neutral. */
  whatItIs: string;
  whoFor: string;
  strengths: string[];
  limits: string[];
  pricing: string;
  /** Standards and topics the vendor's pages name (for the comparison table). */
  standards: string;
  ssp: string;
  sources: Source[];
}

export const VENDORS: Record<string, VendorProfile> = {
  maxio: {
    key: "maxio",
    name: "Maxio",
    whatItIs: "Billing and financial-reporting platform for subscription businesses, with revenue recognition built in.",
    whoFor: "B2B SaaS, AI and subscription businesses (Maxio formed from the combination of Chargify and SaaSOptics).",
    strengths: [
      "States ASC 606 and IFRS 15 compliance, with multiple revenue books, pricing models and performance obligations.",
      "Contract edits for upgrades, refunds and other changes; its FAQ covers SSP and negotiated transaction prices, carve-outs and reallocation.",
      "Lets you compare previous recognition states to updated schedules without changing the original transaction data; waterfall and roll-forward reports.",
      "Usage-based billing (metering, rating, minimum commitments) and integrations with NetSuite, Sage Intacct, QuickBooks, Xero, Salesforce and HubSpot.",
    ],
    limits: [
      "Billing-first: revenue recognition sits alongside billing and payments rather than as a standalone subledger.",
      "The pricing page lists \"Advanced revenue management\" as an optional module; which tier includes what is not spelled out.",
      "SSP is mentioned in the FAQ only; the allocation method is not described on the page.",
    ],
    pricing: "Grow plan $599/month for up to $100k in monthly billings; Scale plan by quote (maxio.com/pricing).",
    standards: "ASC 606, IFRS 15",
    ssp: "Mentioned (FAQ)",
    sources: [
      { label: "Maxio revenue recognition", url: "https://www.maxio.com/revenue-recognition" },
      { label: "Maxio pricing", url: "https://www.maxio.com/pricing" },
      { label: "Maxio home page", url: "https://www.maxio.com/" },
      { label: "Chargify and SaaSOptics are becoming Maxio", url: "https://www.maxio.com/news/chargify-and-saasoptics-are-becoming-maxio" },
    ],
  },
  zuora: {
    key: "zuora",
    name: "Zuora Revenue",
    whatItIs: "Enterprise revenue recognition and automation within Zuora's quote-to-cash suite (the product many finance teams still call RevPro).",
    whoFor: "Enterprise finance and revenue accounting teams; named customers include Salesforce, Okta, Zoom and Elastic.",
    strengths: [
      "States it automates all five steps of ASC 606 and IFRS 15, with rules for pricing, term changes and contract modifications.",
      "SSP calculated from historical data, with AI-assisted SSP modelling.",
      "SOX-oriented controls, role-based security, audit trails and 60+ pre-built reports.",
      "Handles subscriptions, one-time charges and usage; connectors for NetSuite, Workday, SAP and Salesforce.",
    ],
    limits: [
      "Pricing is not published; demo or sales contact only.",
      "Positioned for enterprise and sold as part of a larger suite (Billing, Revenue, Collect and more).",
    ],
    pricing: "Not published.",
    standards: "ASC 606, IFRS 15",
    ssp: "Yes (SSP modelling)",
    sources: [
      { label: "Zuora Revenue product page", url: "https://www.zuora.com/products/revenue/" },
      { label: "Zuora pricing", url: "https://www.zuora.com/pricing/" },
      { label: "About Zuora", url: "https://www.zuora.com/about/" },
    ],
  },
  chargebee: {
    key: "chargebee",
    name: "Chargebee RevRec",
    whatItIs: "Revenue recognition subledger that automates schedules, allocation, reconciliation and journal posting, sold alongside Chargebee Billing.",
    whoFor: "SaaS and AI businesses with hybrid, usage, credit-based or custom-contract pricing. Chargebee RevRec came from Chargebee's 2021 acquisition of RevLock.",
    strengths: [
      "Allocates transaction price across performance obligations with a configurable SSP library tied to the price book, following the ASC 606 / IFRS 15 five-step model.",
      "Automates treatment of upsells, co-terms, credit notes, early renewals and other modifications, plus multi-year ramp contracts.",
      "Period locks, roll-forwards, deferred revenue waterfalls, audit trails, and summarised journal entries posted to the GL.",
      "Native integrations with NetSuite, Sage Intacct, QuickBooks, Xero, Chargebee and Stripe, plus a REST API.",
    ],
    limits: [
      "The RevRec Performance plan is available only to Chargebee Billing customers.",
      "The product page describes a 24-hour sync cycle for source data.",
      "Pricing is not published.",
    ],
    pricing: "Not published (RevRec Performance: request pricing; RevRec Enterprise: quote).",
    standards: "ASC 606, IFRS 15",
    ssp: "Yes (SSP library)",
    sources: [
      { label: "Chargebee revenue recognition software", url: "https://www.chargebee.com/revenue-recognition-software/" },
      { label: "Chargebee pricing", url: "https://www.chargebee.com/pricing/" },
      { label: "Chargebee 2021 year in review (RevLock acquisition)", url: "https://www.chargebee.com/blog/year-in-review-2021/" },
    ],
  },
  tabs: {
    key: "tabs",
    name: "Tabs",
    whatItIs: "Billing, collections and ASC 606 revenue recognition platform that turns contracts and usage into invoices and revenue schedules.",
    whoFor: "B2B finance, accounting and RevOps teams; plans are set by revenue band from under $5M to $50M+.",
    strengths: [
      "Billing, collections and revenue recognition for many pricing models in one product.",
      "Supports usage, credits, commitments, minimums, overages, ramps and hybrids, with usage metering.",
      "Generates invoices and revenue schedules from contracts and usage; ASC 606 revenue recognition on every tier.",
      "Named integrations include Sage Intacct, QuickBooks, HubSpot and DocuSign.",
    ],
    limits: [
      "Billing-first: revenue recognition is one module.",
      "The pages we read name ASC 606 but not IFRS 15 or SSP, and do not explicitly describe contract-modification accounting.",
      "Only the entry tier has a published price.",
    ],
    pricing: "Launch plan $2,000/month (up to $5M annual revenue, 100 active contracts); higher tiers custom (tabs.com/pricing).",
    standards: "ASC 606",
    ssp: "Not mentioned",
    sources: [
      { label: "Tabs home page", url: "https://tabs.com/" },
      { label: "Tabs pricing", url: "https://tabs.com/pricing" },
    ],
  },
  netsuite: {
    key: "netsuite",
    name: "NetSuite Advanced Revenue Management",
    whatItIs: "Rule-based revenue recognition module inside NetSuite ERP, with fair-value allocation through a Revenue Allocation add-on.",
    whoFor: "Companies already running NetSuite as their ERP.",
    strengths: [
      "Oracle's documentation states support for ASC 606 and IFRS 15, with conversion tools.",
      "Revenue Allocation supports fair-value methods including standalone selling price, fair-value price lists, range checking and formulas for multi-element arrangements.",
      "Native revenue arrangements, revenue elements per performance obligation, recognition rules and plans, with journal entries posted straight to the NetSuite GL.",
      "Change-order handling, including prospective merge, under \"Combination and Modification of Performance Obligations\".",
    ],
    limits: [
      "A module of NetSuite: it requires NetSuite ERP, and Revenue Allocation is a separate add-on to ARM Essentials.",
      "Oracle's docs say moving from classic Revenue Recognition requires NetSuite Professional Services or a qualified partner.",
      "Prospective merges cannot be reverted once revenue is recognised or reclassified, and are not supported for some plan types.",
    ],
    pricing: "Not published on the pages we could access (netsuite.com blocked automated access; facts here come from Oracle's NetSuite documentation).",
    standards: "ASC 606, IFRS 15",
    ssp: "Yes (fair-value methods, add-on)",
    sources: [
      { label: "Oracle NetSuite help: Advanced Revenue Management", url: "https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4328435538.html" },
      { label: "Oracle NetSuite help: ARM and ASC 606 / IFRS 15", url: "https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4703499262.html" },
      { label: "Oracle NetSuite help: modification of performance obligations", url: "https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_1498077674.html" },
    ],
  },
  rillet: {
    key: "rillet",
    name: "Rillet",
    whatItIs: "AI-native ERP (general ledger, close, AR/AP, consolidation) with an Advanced Revenue Recognition module built in.",
    whoFor: "Mid-market, enterprise and public companies, with dedicated pages for SaaS, startups, PE and accounting firms.",
    strengths: [
      "States it applies ASC 606 directly from your contracts.",
      "Automates sales-led, product-led and usage-based models, including usage and milestone pricing.",
      "Contract amendments flow through to schedules and the GL.",
      "Deferred revenue schedules, revenue waterfall, multi-entity and multi-currency; integrations with Salesforce, HubSpot, Stripe, Avalara and others.",
    ],
    limits: [
      "Using it means adopting Rillet as your ERP and general ledger; NetSuite, Sage Intacct and QuickBooks appear as comparison pages, not integrations.",
      "The revenue recognition page we read does not mention SSP; IFRS 15 appears in the page title but not in the feature text.",
      "Pricing is not published.",
    ],
    pricing: "Not published (sales contact).",
    standards: "ASC 606 (IFRS 15 in page title)",
    ssp: "Not mentioned",
    sources: [
      { label: "Rillet home page", url: "https://www.rillet.com" },
      { label: "Rillet Advanced Revenue Recognition", url: "https://www.rillet.com/product/advanced-revenue-recognition" },
      { label: "Rillet pricing", url: "https://www.rillet.com/pricing" },
    ],
  },
  sage: {
    key: "sage",
    name: "Sage Intacct Contracts & Revenue Recognition",
    whatItIs: "Contract management, billing and revenue recognition application inside the Sage Intacct cloud ERP.",
    whoFor: "Subscription businesses running Sage Intacct.",
    strengths: [
      "Sage Intacct's documentation states complete support for ASC 606 and IFRS 15.",
      "Straight-line, daily-rate, quantity-based and custom recognition schedules, kept separate from billing, with multi-book accounting.",
      "The Contract Advanced Revenue Recognition add-on supports multiple-element arrangement (MEA) allocation with an audit trail.",
      "Usage billing (tiers, minimum fees) and contract billing for add-ons, change orders, cancellations and renewals.",
    ],
    limits: [
      "A module of Sage Intacct: it requires Sage Intacct as the ERP.",
      "MEA allocation needs the separate Advanced Revenue Recognition add-on; the standard tier does not allocate.",
      "The documentation we read uses \"MEA allocation\" rather than the term standalone selling price.",
    ],
    pricing: "Not published on the pages we could access (sage.com blocked automated access; the help docs say to contact a Sage Intacct account manager).",
    standards: "ASC 606, IFRS 15",
    ssp: "MEA allocation (add-on)",
    sources: [
      { label: "Sage Intacct help: about Contracts", url: "https://www.intacct.com/ia/docs/en_US/help_action/Contracts/Using_Contracts/Learn_about/about-contracts.htm" },
      { label: "Sage Intacct help: revenue recognition standard steps", url: "https://www.intacct.com/ia/docs/en_ZA/help_action/Contracts/Using_Contracts/Learn_about/recognition-standard-steps.htm" },
    ],
  },
  zenskar: {
    key: "zenskar",
    name: "Zenskar",
    whatItIs: "AI-native billing, metering and revenue recognition platform that turns contracts into invoices and revenue schedules.",
    whoFor: "Finance teams at fast-growing companies; plans range from small teams to enterprise.",
    strengths: [
      "States full ASC 606 and IFRS 15 compliance and AI extraction of performance obligations from contracts.",
      "SSP-based revenue allocation, including SSPs for bundles.",
      "Recalculates revenue (future and past) for contract modifications, with manual override.",
      "Usage metering from APIs, CSV or data warehouses; two-way integrations with QuickBooks, NetSuite, Sage, Xero and Zoho Books.",
    ],
    limits: [
      "All plans are custom-priced.",
      "Revenue recognition comes with its billing and metering layer, so it suits teams willing to move billing too.",
      "SAP and Oracle are not listed among integrations on the pages we read.",
    ],
    pricing: "Not published (Starter, Standard and Enterprise are all custom pricing).",
    standards: "ASC 606, IFRS 15",
    ssp: "Yes",
    sources: [
      { label: "Zenskar home page", url: "https://www.zenskar.com" },
      { label: "Zenskar revenue recognition", url: "https://www.zenskar.com/feature/revenue-recognition" },
      { label: "Zenskar pricing", url: "https://www.zenskar.com/pricing" },
    ],
  },
  trullion: {
    key: "trullion",
    name: "Trullion",
    whatItIs: "AI accounting and audit platform that extracts contract terms and runs revenue recognition and lease workflows.",
    whoFor: "Corporate accounting teams (CFOs, controllers), external and internal auditors, and advisory firms.",
    strengths: [
      "Positions itself for ASC 606 / IFRS 15 compliance.",
      "Extracts renewal dates, obligations and revenue-impacting clauses from uploaded contracts, with an audit trail back to the source document.",
      "Performance obligation set-up, revenue waterfalls and disclosures; journal entries exported to your ERP.",
      "Also covers lease accounting and audit workflows such as substantive testing.",
    ],
    limits: [
      "The pages we read name no specific ERP integration.",
      "SSP, contract modifications and usage-based billing are not mentioned on the pages we read.",
      "Pricing is not published.",
    ],
    pricing: "Not published (product tour on request).",
    standards: "ASC 606, IFRS 15",
    ssp: "Not mentioned",
    sources: [
      { label: "Trullion home page", url: "https://trullion.com" },
      { label: "Trullion revenue", url: "https://trullion.com/products/revenue/" },
    ],
  },
  rightrev: {
    key: "rightrev",
    name: "RightRev",
    whatItIs: "Revenue recognition subledger that sits alongside the ERP, with an SSP engine and a Salesforce-native edition.",
    whoFor: "Finance and accounting teams with subscription and consumption models; named customers include Epicor, Docebo and Drata.",
    strengths: [
      "States ASC 606 / IFRS 15 compliance.",
      "SSP engine and simulator to model and validate SSP and allocation outcomes before deploying changes.",
      "Amendments, cancellations, renewals and expansions are detected and reallocated.",
      "Subscriptions, usage, credits, milestones and commits; journal entries posted to the GL with traceability.",
    ],
    limits: [
      "Describes itself as ERP-agnostic and API-first; no specific ERP is named on the pages we read.",
      "The Salesforce edition is built on Salesforce and assumes a Salesforce org.",
      "Pricing is not published.",
    ],
    pricing: "Not published (demo request).",
    standards: "ASC 606, IFRS 15",
    ssp: "Yes (SSP engine)",
    sources: [
      { label: "RightRev home page", url: "https://www.rightrev.com" },
      { label: "RightRev for Salesforce", url: "https://www.rightrev.com/product-salesforce/" },
    ],
  },
  leapfin: {
    key: "leapfin",
    name: "Leapfin",
    whatItIs: "High-volume financial data platform that turns transaction data into journal entries, revenue recognition and reconciliations.",
    whoFor: "High-transaction-volume businesses such as e-commerce, marketplaces, subscription and software. Leapfin announced in June 2026 that it is joining Airwallex.",
    strengths: [
      "Consolidates many data sources into one ledger-ready dataset.",
      "Automates journal entries, revenue recognition, reconciliation and close with transaction-level traceability.",
      "Usage-based billing support and a NetSuite feed.",
    ],
    limits: [
      "Built for transaction volume rather than negotiated contract terms.",
      "IFRS 15, SSP and contract modifications are not mentioned on the pages we read.",
    ],
    pricing: "Published: Standard from $500/month, Premium from $1,000/month, Enterprise custom (leapfin.com/pricing; the page's FAQ also cites a $1,000/month base).",
    standards: "ASC 606",
    ssp: "Not mentioned",
    sources: [
      { label: "Leapfin home page", url: "https://www.leapfin.com" },
      { label: "Leapfin pricing", url: "https://www.leapfin.com/pricing" },
      { label: "Leapfin joining Airwallex", url: "https://www.leapfin.com/blog/leapfins-next-chapter-joining-airwallex" },
    ],
  },
  stripe: {
    key: "stripe",
    name: "Stripe Revenue Recognition",
    whatItIs: "Revenue subledger inside the Stripe Dashboard that turns Stripe transactions and billing terms into journal entries and reports.",
    whoFor: "Businesses billing through Stripe.",
    strengths: [
      "States results in line with IFRS 15 and ASC 606.",
      "Configurable SSPs for bundled products and 15+ pricing models, including usage-based and hybrid.",
      "Handles upgrades, downgrades, prorations, refunds and disputes; waterfall, trial balance and AR ageing reports.",
      "Imports non-Stripe transactions by CSV.",
    ],
    limits: [
      "Requires a Stripe account and is used through the Stripe Dashboard; availability varies by country.",
      "Non-Stripe data comes in as CSV with service-period dates, not from contract documents.",
      "Exports to accounting systems via GL mapping; no named ERP connector on the pages we read.",
    ],
    pricing: "Published: 0.25% of volume, or 0.2% above $100,000 a month, with a 30-day free trial (stripe.com; volume includes imported transactions).",
    standards: "ASC 606, IFRS 15",
    ssp: "Yes",
    sources: [
      { label: "Stripe Revenue Recognition", url: "https://stripe.com/revenue-recognition" },
      { label: "Stripe docs: Revenue Recognition", url: "https://docs.stripe.com/revenue-recognition" },
      { label: "Stripe docs: data import", url: "https://docs.stripe.com/revenue-recognition/data-import" },
    ],
  },
  soluqube: {
    key: "soluqube",
    name: "Soluqube",
    whatItIs: "Contract-first allocation and schedule engine for ASC 606 and Ind AS 115 that produces an evidence workpaper for the contracts you need to defend.",
    whoFor: "Controllers, revenue accountants and CPA or fractional-CFO firms who defend SSP allocations on negotiated B2B contracts to external auditors, in the US and India.",
    strengths: [
      "Relative-SSP allocation and a full-term schedule in integer arithmetic (10^6 scale, rounded to cents) with the final period absorbing the remainder, so the schedule ties to the allocation and deferred revenue ends at $0.00.",
      "Clause evidence per obligation (page, verbatim excerpt and a highlight on the cited line, for text-layer PDFs) and a SHA-256-hashed export: same input, same output, re-runnable in front of an auditor.",
      "Ind AS 115 treatment with 18% GST kept out of the transaction price for INR contracts.",
      "Free 3-contract audit-defense workpaper to start; no implementation project.",
    ],
    limits: [
      "Early-stage product built by a solo founder; no published customer references yet.",
      "You confirm the obligations and stated prices; contract extraction is heuristic, not automatic.",
      "No billing or usage-based billing, and no ERP integration: you review and post Excel/CSV exports yourself.",
      "Contract-modification accounting (prospective and cumulative catch-up) is on the roadmap, not built.",
    ],
    pricing: "Founding prices for the first 10 customers: free 3-contract workpaper; $475 audit workpaper for up to 10 contracts; $1,750 QoE deal pack; $49/month firm tool access (soluqube.com/pricing).",
    standards: "ASC 606, Ind AS 115",
    ssp: "Yes (relative SSP, documented residual-cent rule)",
    sources: [{ label: "Soluqube pricing", url: "https://soluqube.com/pricing" }],
  },
};

export interface AlternativePick {
  vendor: string;
  /** Why this option fits someone leaving the page's subject vendor. Specific to the page. */
  fit: string;
}

export interface AlternativesPage {
  slug: string;
  /** Key into VENDORS for the product being replaced. */
  subject: string;
  /** Display name used in headings, e.g. "Maxio". */
  subjectName: string;
  title: string;
  description: string;
  intro: string;
  whyLook: string[];
  howToChoose: string[];
  picks: AlternativePick[];
  /** Existing head-to-head page, if any (different intent; linked, not canonicalised). */
  versusPage?: string;
  relatedPost?: { href: string; label: string };
  /** Optional real-query FAQs; rendered visibly and as FAQPage JSON-LD only when present. */
  faqs?: PageFaq[];
}

export const ALTERNATIVES_PAGES: AlternativesPage[] = [
  {
    slug: "maxio",
    subject: "maxio",
    subjectName: "Maxio",
    title: "Maxio Alternatives for Revenue Recognition (2026)",
    description:
      "Six Maxio alternatives for ASC 606 revenue recognition compared on fit, SSP support, limits and published pricing. Sourced from vendor sites, Oct 2026.",
    intro:
      "The main Maxio alternatives for ASC 606 revenue recognition are Chargebee RevRec, Stripe Revenue Recognition, Tabs, Zenskar, RightRev and Soluqube. Choose a standalone subledger if billing stays where it is, a billing-plus-rev-rec platform if you are replacing billing, or a narrow engine if your audit questions centre on SSP allocation. Teams also move when billings cross Maxio's $100k-a-month Grow tier.",
    whyLook: [
      "Revenue recognition is bundled with billing; if billing already lives elsewhere, you may want a subledger only.",
      "Maxio's page mentions SSP only in its FAQ; teams whose audit questions centre on SSP may want allocation documented in detail.",
      "Above $100k in monthly billings, Maxio pricing moves to quote-only.",
    ],
    howToChoose: [
      "Decide first whether you are replacing billing too. If not, look at subledgers (Chargebee RevRec, RightRev) or a narrow engine.",
      "If you bill through Stripe, check Stripe Revenue Recognition before buying a separate tool.",
      "Ask each vendor to allocate one of your real multi-element contracts and show the SSP evidence.",
    ],
    picks: [
      { vendor: "chargebee", fit: "Closest like-for-like if you also bill in Chargebee: a dedicated subledger with an SSP library and modification handling. Its Performance plan requires Chargebee Billing." },
      { vendor: "stripe", fit: "If billing already runs on Stripe, revenue recognition is a usage-priced add-on with published rates and no new billing system." },
      { vendor: "tabs", fit: "Another billing-plus-rev-rec platform, aimed at usage, credits and commitments, with a published entry price." },
      { vendor: "zenskar", fit: "Billing, metering and rev rec in one, with SSP-based allocation and modification recalculation named on its site. Custom pricing." },
      { vendor: "rightrev", fit: "A standalone subledger if you want to keep your billing system and need an SSP engine you can simulate before changes go live." },
      { vendor: "soluqube", fit: "A narrow option for the contracts your auditor questions: allocation, schedule and hashed workpaper, no billing. Not a replacement for Maxio's billing." },
    ],
    versusPage: "/soluqube-vs-maxio",
    relatedPost: { href: "/blog/maxio-vs-netsuite-arm-ssp-allocation", label: "Maxio vs NetSuite ARM: which handles SSP allocation?" },
  },
  {
    slug: "zuora-revpro",
    subject: "zuora",
    subjectName: "Zuora RevPro",
    title: "Zuora RevPro Alternatives (Zuora Revenue) 2026",
    description:
      "Zuora Revenue (RevPro) alternatives compared for ASC 606: subledgers, ERP modules and lighter tools, with limits and pricing from vendor sites.",
    intro:
      "Zuora Revenue, which many teams still call RevPro, is an enterprise revenue automation product within Zuora's quote-to-cash suite, with SSP modelling, modification rules and SOX-oriented controls. Teams look at alternatives when they want something lighter, already run an ERP with a revenue module, or do not use Zuora Billing.",
    whyLook: [
      "It is positioned and sold for enterprise; smaller teams may not need its breadth.",
      "Pricing is not published, so cost is only known after a sales process.",
      "If your ERP already includes a revenue module, a second system may be redundant.",
    ],
    howToChoose: [
      "If you run NetSuite or Sage Intacct, price their revenue modules first; they post directly to your GL.",
      "If you need SSP modelling and modification handling outside the ERP, compare standalone subledgers.",
      "Ask how long implementation takes and who does it; none of these vendors publish timelines.",
    ],
    picks: [
      { vendor: "rightrev", fit: "A standalone subledger with an SSP engine and amendment reallocation, ERP-agnostic; the nearest functional peer outside an enterprise suite." },
      { vendor: "netsuite", fit: "If you are on NetSuite, ARM keeps revenue inside the ERP with native GL posting; SSP allocation needs the Revenue Allocation add-on." },
      { vendor: "chargebee", fit: "A subledger with an SSP library and modification handling, strongest if you also bill in Chargebee." },
      { vendor: "zenskar", fit: "Combines billing and rev rec with SSP allocation; suited to teams replacing billing at the same time." },
      { vendor: "sage", fit: "For Sage Intacct customers: contract billing and recognition in the ERP, with MEA allocation as an add-on." },
      { vendor: "soluqube", fit: "Not a RevPro replacement: a narrow engine for producing defensible allocations and schedules on the contracts under audit, beside your ERP." },
    ],
    relatedPost: { href: "/blog/zuora-revpro-vs-soluqube-6-month-erp-implementation-trap", label: "Zuora RevPro vs Soluqube: the implementation trade-off" },
  },
  {
    slug: "chargebee-revrec",
    subject: "chargebee",
    subjectName: "Chargebee RevRec",
    title: "Chargebee RevRec Alternatives for ASC 606 (2026)",
    description:
      "Chargebee RevRec alternatives compared: billing-native rev rec, standalone subledgers and narrow tools, with SSP support, limits and pricing.",
    intro:
      "Chargebee RevRec, which grew out of Chargebee's 2021 acquisition of RevLock, is a revenue subledger with an SSP library, modification handling and GL posting. Its Performance plan is available only to Chargebee Billing customers, which is the most common reason teams compare alternatives.",
    whyLook: [
      "The Performance plan requires Chargebee Billing; teams on another billing system need a different route.",
      "Source data syncs on a 24-hour cycle, per the product page.",
      "Pricing is not published for either RevRec plan.",
    ],
    howToChoose: [
      "Start from your billing system: Stripe and Maxio users have native options.",
      "If billing is staying put and you need a subledger, compare RightRev's SSP engine.",
      "Test modification handling on a real upsell and a mid-term price change before you decide.",
    ],
    picks: [
      { vendor: "maxio", fit: "Billing and rev rec in one, with published entry pricing ($599/month up to $100k monthly billings)." },
      { vendor: "stripe", fit: "If you bill through Stripe, its revenue recognition add-on has SSP configuration and published usage-based pricing." },
      { vendor: "rightrev", fit: "A standalone subledger with an SSP simulator and amendment reallocation that does not depend on your billing vendor." },
      { vendor: "zenskar", fit: "Billing, metering and rev rec with SSP allocation and AI extraction of obligations from contracts." },
      { vendor: "tabs", fit: "Billing-first with ASC 606 rev rec on every tier, aimed at usage and commitment-heavy pricing." },
      { vendor: "soluqube", fit: "For the subset of contracts you must defend on SSP: deterministic allocation, schedule and hashed workpaper, independent of billing. No GL posting." },
    ],
    relatedPost: { href: "/blog/chargebee-revrec-vs-maxio-ssp-allocation", label: "Chargebee RevRec vs Maxio: how does each allocate SSP?" },
  },
  {
    slug: "tabs",
    subject: "tabs",
    subjectName: "Tabs",
    title: "Tabs Alternatives for Billing and Rev Rec (2026)",
    description:
      "Tabs alternatives for B2B billing and ASC 606 revenue recognition: who each fits, SSP and IFRS 15 coverage, limits and published pricing.",
    intro:
      "Tabs is a billing, collections and ASC 606 revenue recognition platform for usage, credits, commitments and hybrid pricing, with a published $2,000-a-month entry plan. Teams compare alternatives when they report under IFRS 15 as well, need SSP allocation documented, or want revenue recognition without moving billing.",
    whyLook: [
      "The pages we read name ASC 606 but not IFRS 15 or SSP.",
      "It is billing-first; teams with billing elsewhere may only want a subledger.",
      "Only the entry tier is priced publicly.",
    ],
    howToChoose: [
      "If you need IFRS 15 or Ind AS 115 as well as ASC 606, confirm coverage in writing.",
      "If you are replacing billing too, compare the billing-plus-rev-rec platforms side by side.",
      "If revenue recognition is the only gap, a subledger or narrow engine is less disruptive.",
    ],
    picks: [
      { vendor: "maxio", fit: "Billing plus rev rec naming both ASC 606 and IFRS 15, with a lower published entry price." },
      { vendor: "zenskar", fit: "Usage-heavy billing with SSP-based allocation and modification recalculation stated on its site." },
      { vendor: "chargebee", fit: "If you would rather run billing in Chargebee, RevRec adds an SSP library and GL posting." },
      { vendor: "stripe", fit: "For Stripe-billed businesses, revenue recognition with SSP configuration and pay-as-you-go pricing." },
      { vendor: "rillet", fit: "If you are also rethinking your general ledger, Rillet bundles ASC 606 revenue recognition into an ERP." },
      { vendor: "soluqube", fit: "Covers Ind AS 115 with GST isolation as well as ASC 606, for allocation and schedules only. It does no billing or collections." },
    ],
  },
  {
    slug: "rillet",
    subject: "rillet",
    subjectName: "Rillet",
    title: "Rillet Alternatives for Revenue Recognition (2026)",
    description:
      "Rillet alternatives for ASC 606 revenue recognition: ERP modules, standalone subledgers and narrow tools, with SSP coverage, limits and pricing.",
    intro:
      "Rillet is an AI-native ERP with revenue recognition built in, so choosing it means choosing a new general ledger. Teams comparing alternatives usually want to keep their existing ERP, need SSP allocation spelled out, or report under IFRS 15 or Ind AS 115.",
    whyLook: [
      "Adopting Rillet's revenue recognition means adopting Rillet as your ERP.",
      "The revenue recognition page we read does not mention SSP.",
      "Pricing is not published.",
    ],
    howToChoose: [
      "If you are keeping NetSuite or Sage Intacct, start with their revenue modules.",
      "If you want rev rec separate from the GL, compare standalone subledgers.",
      "If you are replacing the ERP anyway, ask each vendor to run your hardest multi-element contract.",
    ],
    picks: [
      { vendor: "netsuite", fit: "Keeps revenue inside an established ERP with native GL posting; SSP allocation through the Revenue Allocation add-on." },
      { vendor: "sage", fit: "For Sage Intacct users: contract billing and recognition in the ERP, with multiple-element allocation as an add-on." },
      { vendor: "rightrev", fit: "An ERP-agnostic subledger with an SSP engine, if you want to keep your current ledger." },
      { vendor: "tabs", fit: "If the real gap is billing plus ASC 606 schedules, not the whole ERP." },
      { vendor: "zenskar", fit: "Billing and rev rec with two-way sync to QuickBooks, NetSuite, Sage, Xero and Zoho Books." },
      { vendor: "soluqube", fit: "Keeps your ERP and adds a defensible allocation and schedule for audited contracts. You post the export yourself." },
    ],
  },
  {
    slug: "netsuite-arm",
    subject: "netsuite",
    subjectName: "NetSuite ARM",
    title: "NetSuite ARM Alternatives for ASC 606 (2026)",
    description:
      "NetSuite Advanced Revenue Management alternatives: subledgers that post to NetSuite and narrower tools, with SSP support, limits and pricing.",
    intro:
      "NetSuite Advanced Revenue Management (ARM) keeps revenue recognition inside NetSuite, with fair-value allocation through a separate Revenue Allocation add-on. Teams look at alternatives when they find configuration heavy, need partner help to migrate, or want SSP analysis and modification handling outside the ERP.",
    whyLook: [
      "SSP allocation requires the Revenue Allocation add-on on top of ARM Essentials.",
      "Oracle's docs say moving from classic revenue recognition requires NetSuite Professional Services or a qualified partner.",
      "Some modification patterns (prospective merges) cannot be reverted once revenue is recognised.",
    ],
    howToChoose: [
      "Most alternatives here still post to NetSuite; confirm how journal entries flow back and how often.",
      "If the pain is SSP evidence rather than recognition rules, a narrower tool may be enough.",
      "Ask for a parallel run on one quarter of contracts before switching.",
    ],
    picks: [
      { vendor: "rightrev", fit: "An ERP-agnostic subledger with an SSP simulator and amendment reallocation, posting journal entries to your GL." },
      { vendor: "zuora", fit: "Enterprise revenue automation with SSP modelling and a NetSuite connector, for larger teams." },
      { vendor: "chargebee", fit: "Subledger with a native NetSuite integration and an SSP library; best fit if you bill in Chargebee." },
      { vendor: "zenskar", fit: "Billing plus rev rec with two-way NetSuite sync and SSP-based allocation." },
      { vendor: "rillet", fit: "Only if you are prepared to replace NetSuite itself with an ERP that has revenue recognition built in." },
      { vendor: "soluqube", fit: "Runs beside NetSuite for contracts you need to defend: allocation, schedule and hashed workpaper, exported as a CSV you review and post." },
    ],
    relatedPost: { href: "/blog/maxio-vs-netsuite-arm-ssp-allocation", label: "Maxio vs NetSuite ARM: which handles SSP allocation?" },
  },
  {
    slug: "sage-intacct-revenue",
    subject: "sage",
    subjectName: "Sage Intacct Revenue Recognition",
    title: "Sage Intacct Revenue Recognition Alternatives",
    description:
      "Alternatives to Sage Intacct Contracts and revenue recognition: subledgers with Sage Intacct integrations and narrower tools, compared from vendor sites.",
    intro:
      "Sage Intacct's Contracts application handles subscription billing and revenue recognition inside the ERP, with multiple-element allocation available through an Advanced Revenue Recognition add-on. Teams compare alternatives when they require more SSP tooling, run complex modifications, or want a subledger that is not tied to the ERP.",
    whyLook: [
      "Allocation across multiple elements needs a separate add-on.",
      "The documentation we read describes MEA allocation rather than SSP analysis tooling.",
      "Pricing is not published.",
    ],
    howToChoose: [
      "Prefer tools with a native Sage Intacct integration so journal entries post cleanly.",
      "If billing works well in Sage Intacct, add a subledger rather than replacing billing.",
      "Check how each option handles a mid-term upsell on a real contract.",
    ],
    picks: [
      { vendor: "chargebee", fit: "Native Sage Intacct integration, an SSP library and modification handling; strongest with Chargebee Billing." },
      { vendor: "maxio", fit: "Billing and rev rec with a Sage Intacct integration and published entry pricing." },
      { vendor: "rightrev", fit: "API-first subledger with an SSP simulator; confirm the Sage Intacct connection with the vendor." },
      { vendor: "zenskar", fit: "Two-way sync with Sage, SSP-based allocation and modification recalculation." },
      { vendor: "rillet", fit: "Only if you are considering replacing Sage Intacct as your ERP." },
      { vendor: "soluqube", fit: "Adds documented relative-SSP allocation and schedules for the contracts under audit; you post the export to Sage Intacct yourself." },
    ],
  },
  {
    slug: "zenskar",
    subject: "zenskar",
    subjectName: "Zenskar",
    title: "Zenskar Alternatives for Billing and Rev Rec (2026)",
    description:
      "Zenskar alternatives for usage billing and ASC 606 / IFRS 15 revenue recognition: who each fits, SSP coverage, limits and published pricing.",
    intro:
      "Zenskar is an AI-native billing, metering and revenue recognition platform with SSP-based allocation and modification recalculation. Every plan is custom-priced, and revenue recognition comes with its billing layer, so teams often compare it with platforms that publish prices or with standalone subledgers.",
    whyLook: [
      "All plans are custom-priced.",
      "Revenue recognition is tied to adopting its billing and metering layer.",
      "SAP and Oracle are not listed among its integrations on the pages we read.",
    ],
    howToChoose: [
      "If you need published pricing, Maxio, Tabs and Stripe list prices.",
      "If billing is staying where it is, compare subledgers instead of billing platforms.",
      "Test AI extraction of obligations against what your auditor would accept as evidence.",
    ],
    picks: [
      { vendor: "tabs", fit: "Usage, credits and commitments billing with ASC 606 rev rec and a published entry price." },
      { vendor: "maxio", fit: "Billing plus rev rec with metering and a published Grow plan." },
      { vendor: "chargebee", fit: "If you prefer Chargebee Billing, RevRec adds an SSP library, modification handling and GL posting." },
      { vendor: "stripe", fit: "For Stripe-billed companies, revenue recognition priced as a percentage of volume, with SSP configuration." },
      { vendor: "rightrev", fit: "A standalone subledger with an SSP engine if you want to keep your billing system." },
      { vendor: "soluqube", fit: "No billing and no AI extraction: you confirm obligations, and get a deterministic allocation, schedule and hashed workpaper. Covers Ind AS 115." },
    ],
  },
  {
    slug: "trullion",
    subject: "trullion",
    subjectName: "Trullion",
    title: "Trullion Alternatives for Revenue Recognition",
    description:
      "Trullion alternatives for ASC 606 / IFRS 15 revenue recognition: subledgers, enterprise suites and narrower tools, with limits and pricing.",
    intro:
      "Trullion is an AI accounting and audit platform that extracts contract terms and runs revenue recognition and lease workflows, aimed at both corporate accounting teams and auditors. Teams compare alternatives when they need SSP tooling, modification handling or usage-based models that its revenue pages do not mention.",
    whyLook: [
      "The pages we read do not mention SSP, contract modifications or usage-based billing.",
      "No specific ERP integration is named on the pages we read.",
      "Pricing is not published.",
    ],
    howToChoose: [
      "If allocation and SSP are the audit focus, prefer tools that document SSP explicitly.",
      "If you need lease accounting too, check whether a single platform matters more than depth in revenue.",
      "Ask each vendor how AI-extracted terms are reviewed before they drive numbers.",
    ],
    picks: [
      { vendor: "rightrev", fit: "SSP engine and simulator plus amendment reallocation, for teams whose audit questions centre on allocation." },
      { vendor: "zuora", fit: "Enterprise revenue automation with SSP modelling and modification rules." },
      { vendor: "chargebee", fit: "Subledger with an SSP library, modification handling and named ERP integrations." },
      { vendor: "leapfin", fit: "For high transaction volume rather than contract review; published pricing. Leapfin is joining Airwallex." },
      { vendor: "zenskar", fit: "Also extracts obligations from contracts with AI, and adds billing, SSP allocation and modification recalculation." },
      { vendor: "soluqube", fit: "Clause evidence (page, verbatim excerpt and line highlight) per obligation like an audit tool, but the numbers come from a deterministic integer engine you can re-run. No lease accounting." },
    ],
    versusPage: "/soluqube-vs-trullion",
  },
  {
    slug: "rightrev",
    subject: "rightrev",
    subjectName: "RightRev",
    title: "RightRev Alternatives for ASC 606 (2026)",
    description:
      "RightRev alternatives for ASC 606 / IFRS 15 revenue recognition: enterprise suites, ERP modules and narrower tools, with SSP support and pricing.",
    intro:
      "RightRev is a revenue recognition subledger with an SSP engine and simulator, amendment reallocation and a Salesforce-native edition. Teams compare alternatives when they want revenue inside their ERP, are not on Salesforce, or need published pricing.",
    whyLook: [
      "Pricing is not published.",
      "The Salesforce edition assumes a Salesforce org.",
      "No specific ERP is named on its pages; the GL connection is API-based.",
    ],
    howToChoose: [
      "If you are on NetSuite and want one system, compare ARM with the Revenue Allocation add-on.",
      "For enterprise scale and suite breadth, compare Zuora Revenue.",
      "Ask each vendor to run your SSP study and one amendment on real data.",
    ],
    picks: [
      { vendor: "zuora", fit: "Enterprise peer with SSP modelling, modification rules and connectors for NetSuite, Workday, SAP and Salesforce." },
      { vendor: "chargebee", fit: "Subledger with an SSP library and named ERP integrations; strongest with Chargebee Billing." },
      { vendor: "netsuite", fit: "Keeps revenue in NetSuite with native GL posting; SSP methods via the Revenue Allocation add-on." },
      { vendor: "zenskar", fit: "Billing plus rev rec with SSP allocation and modification recalculation, if you are replacing billing too." },
      { vendor: "trullion", fit: "If audit-side contract review matters as much as the subledger, and lease accounting is also in scope." },
      { vendor: "soluqube", fit: "A narrower, published-price option for defending allocations on specific contracts, covering Ind AS 115 as well. No CRM integration and no modification accounting yet." },
    ],
    versusPage: "/soluqube-vs-rightrev",
  },
];

export function getAlternativesPage(slug: string): AlternativesPage | undefined {
  return ALTERNATIVES_PAGES.find((p) => p.slug === slug);
}
