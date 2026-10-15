export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  publishedAt: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  tags: string[];
  targetQuery: string;
  definitionAnchor: string;
  excerpt: string;
  content: string;
  toc: { id: string; label: string }[];
  faqs?: { question: string; answer: string }[];
  /** True only when the article's numbers were produced by the Soluqube engine (shows the "Computed by" footer). */
  engineVerified?: boolean;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "asc-606-vs-ind-as-115-dual-standard-gst-compliance",
    title: "ASC 606 vs Ind AS 115: Dual Standard SaaS Amortization & Statutory GST Isolation",
    subtitle: "How multinational tech enterprises reconcile US GAAP revenue schedules with Indian MCA Schedule III and 18% GST tax firewalls.",
    publishedAt: "October 8, 2026",
    readTime: "8 min read",
    author: {
      name: "Soluqube Editorial",
      role: "Technical Accounting Content Team",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["ASC 606", "Ind AS 115", "GST Isolation", "Dual Standard", "Enterprise Audit"],
    targetQuery: "Ind AS 115 dual standard transition adjustments software",
    definitionAnchor: "ASC 606 and Ind AS 115 dual-standard revenue recognition is the automated process of calculating GAAP-compliant revenue amortization schedules under US GAAP while simultaneously quarantining statutory 18% Indian GST (CGST/SGST/IGST) liabilities into segregated MCA Schedule III balance sheet accounts with zero rounding discrepancy.",
    excerpt: "Learn how cross-border CFOs eliminate double-taxation and reconciliation drift between US GAAP ASC 606 and MCA Schedule III Ind AS 115 ledgers using deterministic integer (BigInt) fixed-point isolation.",
    toc: [
      { id: "overview", label: "Executive Summary & Core Standard Gap" },
      { id: "gst-quarantine", label: "Statutory 18% GST Balance Sheet Quarantine" },
      { id: "amortization-schedule", label: "Deterministic Waterfall Comparison" },
      { id: "audit-workpaper", label: "Audit-Ready Evidence & MCA Dual Audit Packs" },
      { id: "architecture", label: "Deterministic Fixed-Point Architecture" }
    ],
    faqs: [
      {
        question: "How does Ind AS 115 isolate statutory 18% GST differently from US GAAP ASC 606?",
        answer: "Under Indian MCA Schedule III and Ind AS 115, gross contract consideration containing statutory 18% GST cannot be amortized directly into revenue. Soluqube automatically isolates GST into segregated balance sheet liability accounts at transaction inception before net consideration is recognized."
      },
      {
        question: "Why does standard ERP revenue recognition fail Indian GST audits?",
        answer: "Most global ERP systems (like NetSuite or Salesforce Billing) amortize revenue from gross invoice totals. This contaminates Standalone Selling Price allocations and violates mandatory MCA Schedule III statutory disclosures."
      },
      {
        question: "How does Soluqube prevent double-taxation and reconciliation discrepancies?",
        answer: "Soluqube enforces an automated dual-ledger transaction firewall that decomposes gross contract values into net consideration and statutory tax components with integer (BigInt) fixed-point precision, eliminating cross-border reconciliation drift."
      }
    ],
    content: `
## Executive Summary & Core Standard Gap

Multinational enterprise SaaS companies operating engineering hubs and client contracts in India face a compounding compliance headache: **US GAAP ASC 606** and **Indian MCA Ind AS 115** are harmonized in principle (the 5-step model), but diverged drastically in statutory tax treatment, invoice timing, and schedule presentation.

Under **Ind AS 115 and MCA Schedule III**, gross transaction billing containing **18% Goods and Services Tax (GST)** cannot simply be recorded as deferred revenue. Gross billing must be deterministically decomposed at the point of contract execution:

$$\\text{Net Consideration} = \\frac{\\text{Gross Contract Value}}{1.18}$$
$$\\text{GST Liability (CGST + SGST or IGST)} = \\text{Gross Contract Value} - \\text{Net Consideration}$$

If an ERP system amortizes revenue from the gross invoiced figure or handles tax on a cash-collected basis rather than transaction inception, company financial statements violate both **MCA Schedule III mandatory disclosure** and **ASC 606 Standalone Selling Price (SSP) allocation rules**.

---

## Statutory 18% GST Balance Sheet Quarantine

Soluqube automatically enforces a deterministic transaction firewall. The moment an unstructured Enterprise MSA or Order Form is ingested, the engine generates an isolated dual-ledger structure:

\`\`\`
                     [ Enterprise Contract Ingestion ]
                                     |
                +--------------------+--------------------+
                |                                         |
     [ US GAAP ASC 606 Ledger ]               [ Ind AS 115 MCA Ledger ]
                |                                         |
     - 100% Net Consideration                 - Net Consideration Amortization
     - Standalone Selling Price Allocation    - 18% GST Balance Sheet Quarantine
     - USD Currency Basis                     - INR MCA Schedule III Tax Subledger
\`\`\`

1. **Intra-State Supply (CGST 9% + SGST 9%)**: When service provider and client place of supply are in the same Indian state (e.g. Karnataka to Karnataka).
2. **Inter-State Supply (IGST 18%)**: When place of supply crosses state borders (e.g. Maharashtra to Karnataka).
3. **Cross-Border SEZ / Zero-Rated Export**: Validated with LUT (Letter of Undertaking) verification without tax leakage.

---

## Deterministic Waterfall Comparison

Traditional spreadsheet models compute monthly recognition using floating-point division:
\`\`\`python
# FLAWED BINARY FLOAT LOGIC
monthly_rev = 100000.00 / 12.0 # yields 8333.333333333334
# After 12 months, sum equals 99999.96 (4 cents lost!)
\`\`\`

Soluqube's **integer (BigInt) fixed-point engine** (10^6 scale, rounded to cents) allocates amortization across daily discrete intervals, absorbing fractional remainders into the terminal period:
\`\`\`typescript
// DETERMINISTIC BIGINT SCALED ARITHMETIC
const NET_CENTS = 8474576n; // $84,745.76 net after 18% GST
const PERIODS = 12n;
const BASE_MONTHLY = NET_CENTS / PERIODS; // 706214n ($7,062.14)
const REMAINDER = NET_CENTS % PERIODS;   // 8n ($0.08 absorbed in Month 12)
\`\`\`

This guarantees **$0.000000 drift** across multi-year amortization schedules under both US GAAP and Ind AS 115 audits.

---

## Audit-Ready Evidence & MCA Dual Audit Packs

When external audit teams or statutory Indian tax inspectors request verification, Soluqube generates an immutable audit bundle containing:
* **Bounding-Box Grounding**: Every line item in the waterfall links directly to normalized pixel coordinates on the signed PDF.
* **Dual Workpaper Excel**: 8-tab workbook with active Excel formulas, reconciling US GAAP Deferred Revenue and Indian MCA GST Payable.
* **Cryptographic Merkle Proof**: SHA-256 hash tree validating that historical amortizations have never been altered.
    `
  },
  {
    slug: "eliminating-ieee-754-floating-point-rounding-drift-asc-606",
    title: "Eliminating IEEE-754 Floating-Point Rounding Drift in Enterprise ASC 606 Subledgers",
    subtitle: "Why binary 64-bit floating point numbers corrupt multi-million dollar SaaS revenue recognition waterfalls and how integer (BigInt) fixed-point math restores exact balance sheet parity.",
    publishedAt: "October 7, 2026",
    readTime: "7 min read",
    author: {
      name: "Soluqube Core Math Group",
      role: "Deterministic Ledger Research Team",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["ASC 606", "Fixed-Point Math", "ERP Subledger", "Audit Deficiencies", "NetSuite ARM"],
    targetQuery: "ASC 606 5-step revenue recognition fixed-point math",
    definitionAnchor: "Deterministic fixed-point revenue recognition is a mathematical architecture that replaces IEEE-754 binary floating-point calculations with arbitrary-precision scaled integer arithmetic, ensuring that cumulative revenue allocations across multi-year contracts match total contract consideration with exact zero-drift ($0.000000).",
    excerpt: "Explore the technical breakdown of binary floating-point rounding errors in modern ERP subledgers and how Soluqube guarantees zero-drift ASC 606 compliance.",
    toc: [
      { id: "ieee-flaw", label: "The IEEE-754 Binary Floating-Point Flaw" },
      { id: "compound-drift", label: "How Fractional Cents Compound into Audit Deficiencies" },
      { id: "fixed-point-solution", label: "Scaled Integer (BigInt) Engine" },
      { id: "reconciliation", label: "Zero-Drift General Ledger Postings" }
    ],
    content: `
## The IEEE-754 Binary Floating-Point Flaw

Modern web applications and legacy ERP extensions commonly represent currency using standard 64-bit IEEE-754 floating-point numbers (\`double\` or JavaScript \`number\`). In binary floating-point representation, fractions like \`0.1\` or \`0.01\` cannot be represented with exact finite precision:

\`\`\`javascript
// Classic floating point artifact:
0.1 + 0.2 === 0.30000000000000004 // true
\`\`\`

When an enterprise contract worth **$1,500,000.00** with 5 distinct performance obligations is amortized over 36 months across leap years and contract amendments, tiny rounding errors compound into discrepancies exceeding thousands of dollars on quarterly balance sheets.

---

## How Fractional Cents Compound into Audit Deficiencies

External auditors test contract subledgers against trial balances. When automated subledgers produce a cumulative discrepancy between:
$$\\sum_{t=1}^{T} \\text{Recognized Revenue}_t \\neq \\text{Total Transaction Price}$$

Controllers are forced to book manual adjusting journal entries (*\"Rounding Suspense\"* or *\"Plug Accounts\"*). These manual entries trigger red flags during SOX 404 internal control audits and PCAOB inspections.

---

## Scaled Integer (BigInt) Engine

Soluqube completely bypasses binary floating-point arithmetic. All monetary values and standalone selling prices (SSP) are stored and manipulated as **scaled integers (BigInt)** with a fixed scaling factor ($10^{6}$ micro-cents), rounded to cents with terminal-period remainder absorption:

\`\`\`typescript
export class FixedPointDecimal {
  private readonly value: bigint;
  private static readonly SCALE = 1_000_000n; // 6 decimal places

  constructor(units: string | number) {
    this.value = BigInt(Math.round(Number(units) * 1_000_000));
  }

  public divideWithRemainder(divisor: bigint): { quotient: FixedPointDecimal; remainder: bigint } {
    const q = this.value / divisor;
    const r = this.value % divisor;
    return {
      quotient: new FixedPointDecimal(Number(q) / 1_000_000),
      remainder: r
    };
  }
}
\`\`\`

---

## Zero-Drift General Ledger Postings

By applying terminal-period remainder absorption, the final month's journal entry absorbs any atomic residue, guaranteeing that every single penny of deferred revenue reconciles to recognized revenue with **mathematical perfection**.
    `
  },
  {
    slug: "contract-modification-precedence-dag-asc-606-10-25-13",
    title: "Contract Modification Precedence DAG: Automating ASC 606-10-25-13 Decisions",
    subtitle: "A deterministic graph theory approach to classifying mid-term SaaS amendments, seat expansions, and pricing concessions without manual accountant interpretation.",
    publishedAt: "October 6, 2026",
    readTime: "9 min read",
    author: {
      name: "Soluqube Editorial",
      role: "Technical Accounting Content Team",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["ASC 606-10-25", "Contract Modifications", "Directed Acyclic Graph", "SaaS Accounting"],
    targetQuery: "ASC 606-10-25-13 contract modification decision tree",
    definitionAnchor: "The Contract Modification Precedence DAG is a deterministic decision engine that evaluates mid-term contract amendments against ASC 606-10-25-13 criteria (distinct goods vs. standalone selling price) to automatically route accounting treatments between Cumulative Catch-Up, Prospective Amortization, or Separate Contract creation without human error.",
    excerpt: "Discover how Soluqube uses Directed Acyclic Graphs (DAGs) to automate complex mid-term contract modifications under ASC 606-10-25-13.",
    toc: [
      { id: "mod-problem", label: "The Mid-Term SaaS Modification Challenge" },
      { id: "dag-routing", label: "ASC 606-10-25-13 Decision DAG" },
      { id: "catchup-vs-prospective", label: "Cumulative Catch-Up vs Prospective Math" },
      { id: "audit-trace", label: "Automated Audit Defense Trail" }
    ],
    faqs: [
      {
        question: "How does ASC 606-10-25-13 categorize contract modifications and amendments?",
        answer: "ASC 606-10-25-13 dictates three treatment branches: (1) Separate Contract if goods are distinct at Standalone Selling Price (SSP), (2) Prospective allocation if goods are distinct but not at SSP, and (3) Cumulative Catch-Up if remaining goods are non-distinct, requiring an immediate one-time cumulative adjustment."
      },
      {
        question: "How does a Directed Acyclic Graph (DAG) automate contract modification accounting?",
        answer: "Soluqube models contract amendments, master agreements, and addenda as nodes in a precedence DAG. The engine automatically identifies contract lineage, determines distinctness and standalone pricing, and posts exact journal entries without manual accounting memos."
      }
    ],
    content: `
## The Mid-Term SaaS Modification Challenge

Enterprise SaaS contracts rarely remain static for 36 months. Customers add seats, upgrade tiers, negotiate early renewal discounts, or restructure SLA commitments mid-flight.

Under **ASC 606-10-25-12 through 25-13**, accountants must evaluate two mandatory questions:
1. Are the additional promised goods or services **distinct** from original obligations?
2. Is the additional price reflective of the **Standalone Selling Price (SSP)**?

Answering these questions incorrectly leads to restatements of previously reported quarters.

---

## ASC 606-10-25-13 Decision DAG

Soluqube models the standard as a Directed Acyclic Graph (DAG):

\`\`\`
                       [ Contract Amendment Ingested ]
                                      |
                       [ Distinct Goods / Services? ]
                               /              \\
                            (YES)             (NO)
                             /                  \\
                 [ Priced at SSP? ]      [ Cumulative Catch-Up ]
                    /          \\         (ASC 606-10-25-13b)
                 (YES)         (NO)
                  /              \\
      [ Separate Contract ]   [ Prospective Allocation ]
      (ASC 606-10-25-12)      (ASC 606-10-25-13a)
\`\`\`

---

## Cumulative Catch-Up vs Prospective Math

* **Separate Contract (25-12)**: Original schedule remains untouched. A new independent amortization schedule is generated for the amendment.
* **Prospective Termination & Replacement (25-13a)**: Unrecognized remaining consideration is pooled with the amendment price and reallocated over the remaining term.
* **Cumulative Catch-Up (25-13b)**: The entire contract lifecycle is retroactively re-evaluated. A one-time catch-up adjustment is posted in the current period.

Soluqube computes the exact journal entries for all three scenarios instantaneously, eliminating dozens of hours of manual spreadsheet rework.
    `
  },
  {
    slug: "pcaob-as-3101-audit-workpapers-merkle-proofs",
    title: "Audit-Ready Evidence: Cryptographic Merkle Proofs for Revenue Subledgers",
    subtitle: "How cryptographic hashing, PDF spatial token bounding boxes, and immutable logs support external auditors' Critical Audit Matters (CAM) testing.",
    publishedAt: "October 5, 2026",
    readTime: "6 min read",
    author: {
      name: "Soluqube Editorial",
      role: "Technical Accounting Content Team",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["PCAOB", "Merkle Trees", "Audit Readiness", "External Audit", "SOX Compliance"],
    targetQuery: "automated audit-ready evidence package revenue recognition",
    definitionAnchor: "Audit readiness for revenue recognition means providing immutable, tamper-evident verification linking general ledger journal entries directly to primary source contract PDF clauses via cryptographic Merkle trees and normalized spatial coordinate bounding boxes.",
    excerpt: "Learn how Soluqube provides cryptographic Merkle proofs and bounding-box audit packs that support documentation for auditor review of revenue recognition.",
    toc: [
      { id: "cam-requirement", label: "Critical Audit Matters (CAM) in Revenue Recognition" },
      { id: "spatial-grounding", label: "Spatial PDF Token Bounding Boxes" },
      { id: "merkle-proofs", label: "Cryptographic Merkle Root Verification" },
      { id: "export-packages", label: "One-Click Auditor Deliverables" }
    ],
    faqs: [
      {
        question: "What makes revenue recognition a Critical Audit Matter (CAM) under PCAOB AS 3101?",
        answer: "Revenue recognition involves significant management judgment, complex Standalone Selling Price allocations, and high susceptibility to spreadsheet errors, making it one of the most rigorously tested areas during external audits."
      },
      {
        question: "How do cryptographic Merkle proofs verify revenue subledger integrity?",
        answer: "Soluqube hashes each contract term, modification, and journal entry into a SHA-256 Merkle tree. Auditors can recompute and verify the cryptographic root to confirm that past periods were never altered post-closing."
      }
    ],
    content: `
## Critical Audit Matters (CAM) in Revenue Recognition

For public and growth-stage private enterprises, revenue recognition is almost universally classified as a **Critical Audit Matter (CAM)** by independent audit firms (PwC, EY, Deloitte, KPMG).

Auditors must test:
1. **Contract Inception**: Verification that stated contract values match signed PDF clauses.
2. **Performance Obligations**: Documentation for why professional services were unbundled from software licenses.
3. **Allocation Accuracy**: Standalone Selling Price allocation verification.

---

## Spatial PDF Token Bounding Boxes

Instead of presenting auditors with static database records, Soluqube attaches normalized spatial bounding box coordinates \`[page, x0, y0, x1, y1]\` to every single extracted pricing term.

When an auditor clicks on any cell in the Soluqube workpaper, the UI highlights the exact clause inside the signed Master Services Agreement PDF with sub-millimeter precision.

---

## Cryptographic Merkle Root Verification

Every transaction, modification, and amortization event is hashed using SHA-256 and appended to a cryptographic Merkle tree. 

Auditors can independently recompute the Merkle root to verify that past revenue figures were never silently altered.
    `
  },
  {
    slug: "contract-pdf-bounding-box-clause-grounding-auditors",
    title: "Contract Clause Evidence for ASC 606: Linking Each Obligation to Its Page and Excerpt",
    subtitle: "How sub-millimeter token coordinate extraction bridges the gap between unstructured signed Master Services Agreements and deterministic revenue recognition subledgers.",
    publishedAt: "October 9, 2026",
    readTime: "8 min read",
    author: {
      name: "Soluqube Editorial",
      role: "Technical Accounting Content Team",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["PDF Grounding", "Audit Evidence", "Audit Workpapers", "MSA Parsing", "External Audit"],
    targetQuery: "Contract PDF bounding-box clause grounding for auditors",
    definitionAnchor: "Contract PDF bounding-box clause grounding is the automated mathematical extraction and spatial mapping of unstructured legal text to normalized page coordinates [page, x0, y0, x1, y1], linking every line item in an ASC 606 revenue waterfall schedule directly to its signed contractual origin for zero-defect audit verification.",
    excerpt: "Learn how Soluqube uses PyMuPDF normalized bounding-box coordinates to link ASC 606 revenue schedules directly to signed contract clauses for audit readiness.",
    toc: [
      { id: "the-unstructured-contract-gap", label: "The Unstructured Contract Dilemma" },
      { id: "definition-anchor-block", label: "Definition & Spatial Grounding Architecture" },
      { id: "how-coordinate-extraction-works", label: "Sub-Millimeter PDF Token Extraction" },
      { id: "pcaob-cam-verification", label: "PCAOB AS 3101 Critical Audit Matters (CAM)" },
      { id: "ocr-vs-spatial-grounding", label: "Legacy OCR vs Deterministic Coordinate Grounding" },
      { id: "audit-deliverable", label: "Generating 1-Click Interactive Auditor Bundles" }
    ],
    faqs: [
      {
        question: "What is contract PDF bounding-box clause grounding?",
        answer: "Bounding-box clause grounding maps extracted financial terms directly to normalized vector coordinates [page, x0, y0, x1, y1] on the original PDF contract, enabling audit teams to visually trace every line item in an ASC 606 schedule directly to its signed legal origin."
      },
      {
        question: "Why is coordinate grounding superior to standard LLM OCR?",
        answer: "Generic LLMs and OCR scrapers extract plain text probabilistically and frequently hallucinate numbers or omit pricing caveats. Soluqube uses PyMuPDF character-level vector coordinate grids, guaranteeing 100% clause lineage with zero hallucination."
      }
    ],
    content: `
## The Unstructured Contract Dilemma: Why Manual Review Fails External Audits

For enterprise finance departments, revenue recognition errors rarely originate in the arithmetic—they originate in **clause misinterpretation**. When an enterprise closes a $5,000,000 Master Services Agreement (MSA) with three non-standard addenda, terms like *\"contingent SLA rebates,\" \"termination for convenience refund clauses,\"* or *\"tiered volume discounts\"* are frequently overlooked by junior accountants.

During annual external audits, audit partners (PwC, EY, Deloitte, KPMG) perform substantive testing by manually tracing revenue subledger journal entries back to signed PDF documents. If an auditor cannot instantly verify the underlying contractual clause supporting a Standalone Selling Price (SSP) allocation, the deficiency is escalated as a **Material Weakness in Internal Controls (SOX 404)**.

---

## Spatial Grounding Architecture: Normalized Bounding Box Coordinates

Soluqube solves this by treating every ingested contract PDF not as a flat image or raw text string, but as a **2-dimensional vector coordinate grid**:

\`\`\`
[ Signed Contract PDF (MSA / Order Form) ]
                   |
     [ PyMuPDF Text & Vector Extractor ]
                   |
  +----------------+----------------+
  |                                 |
[ Extracted Text Stream ]      [ Spatial Token Coordinates ]
  - Clause: Term & Price         - Page: 3
  - Value: $1,200,000            - Normalized Box: [x0: 72.4, y0: 310.2, x1: 520.1, y1: 345.8]
  - Contingency: 10% SLA cap     - SHA-256 Text Hash
                   |
                   v
[ ASC 606 / Ind AS 115 BigInt Ledger Entry ]
\`\`\`

---

## Sub-Millimeter PDF Token Extraction Under the Hood

When a contract is ingested, Soluqube's parser extracts character-level bounding boxes and normalizes coordinates across differing PDF DPI resolutions:

\`\`\`typescript
interface BoundingBoxClause {
  clauseId: string;
  clauseType: "TERM" | "FEE_STRUCTURE" | "SLA_PENALTY" | "TERMINATION_RIGHT";
  pageNumber: number;
  coordinates: {
    x0: number; // Left normalized point
    y0: number; // Top normalized point
    x1: number; // Right normalized point
    y1: number; // Bottom normalized point
  };
  extractedText: string;
  sha256Hash: string;
}
\`\`\`

When an auditor or controller inspects an amortization row in the Soluqube interactive ledger, clicking any numeric cell automatically renders the original PDF with a high-contrast bounding highlight around the exact legal sentence.

---

## PCAOB AS 3101 Critical Audit Matters (CAM) Testing

Under **PCAOB AS 3101**, auditors communicate Critical Audit Matters in their report; the supporting evidence is documented under the PCAOB documentation standards. Soluqube generates an audit-ready evidence package that supports this documentation by linking:
1. **Clause Origin**: Visual bounding-box proof on the signed document.
2. **Deterministic Math**: integer (BigInt) arithmetic at 10^6 scale, rounded to cents, with terminal-period remainder absorption.
3. **Cryptographic Immutability**: SHA-256 Merkle root validating that neither the contract PDF nor the ledger schedule has been altered post-signature.

---

## Legacy OCR vs Deterministic Coordinate Grounding

| Feature / Capability | Legacy OCR / Generic LLM Scrapers | Soluqube Spatial Bounding-Box Engine |
|---|---|---|
| **Clause Traceability** | Probabilistic text extraction without source grounding | Sub-millimeter [page, x, y] coordinate vector mapping |
| **Audit Verification Speed** | 4–6 hours of manual PDF cross-referencing per contract | Instant 1-click visual clause highlighting |
| **Hallucination Risk** | High (LLMs invent non-existent discount terms) | 0% (Strict character-level token verification) |
| **Audit Defense Output** | Static Excel sheets with manual comments | Audit-ready JSON-LD evidence bundle with embedded SHA-256 Merkle proofs |

---

## Generating 1-Click Interactive Auditor Bundles

Soluqube exports complete 8-tab variance workpapers and self-contained HTML audit packages. External auditors can inspect and verify complete revenue schedules without requiring access to your core ERP or confidential billing systems.
    `
  },
  {
    slug: "pcaob-qc-1000-fasb-ai-revenue-recognition-audits-2026",
    title: "PCAOB QC 1000 Enforcement & FASB AI Guidance: Why Enterprise Spreadsheets Are Failing 2026 Revenue Audits",
    subtitle: "A regulatory analysis of PCAOB's new quality control mandate, recurring revenue inspection deficiencies, and why probabilistic AI models fail auditor verification.",
    publishedAt: "October 10, 2026",
    readTime: "9 min read",
    author: {
      name: "Soluqube Editorial",
      role: "Technical Accounting Content Team",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["PCAOB QC 1000", "FASB ASC 606", "AI Revenue Recognition", "Audit Deficiencies", "Enterprise Audit"],
    targetQuery: "PCAOB QC 1000 revenue recognition audit deficiencies software",
    definitionAnchor: "PCAOB QC 1000 is the quality-control standard for registered audit firms; its practical effect for preparers is that audit teams increasingly look for reproducible, documented revenue calculations rather than spreadsheet judgment or probabilistic AI outputs in ASC 606 performance obligation allocations.",
    excerpt: "With PCAOB QC 1000 raising quality-control expectations for audit firms and inspections continuing to focus on revenue, finance leaders are moving from manual spreadsheets and ungrounded LLMs toward deterministic, coordinate-verified subledgers.",
    toc: [
      { id: "regulatory-shift", label: "The 2026 Regulatory Pivot: PCAOB QC 1000" },
      { id: "audit-deficiencies", label: "Top Revenue Recognition Inspection Deficiencies" },
      { id: "fasb-ai-boundary", label: "FASB's Stance on AI in Financial Reporting" },
      { id: "probabilistic-vs-deterministic", label: "Why Probabilistic LLMs Fail Audit Standards" },
      { id: "the-deterministic-solution", label: "The Soluqube Deterministic Defense Architecture" }
    ],
    faqs: [
      {
        question: "What is PCAOB QC 1000 and how does it affect revenue recognition?",
        answer: "PCAOB QC 1000 is the quality control standard for registered audit firms' systems of quality control; it does not apply directly to preparers or software. Its practical effect for finance teams is that audit firms increasingly scrutinize whether subledgers and schedules rely on fragile spreadsheets or untracked manual overrides."
      },
      {
        question: "Does FASB have a specific accounting standard for Artificial Intelligence in 2026?",
        answer: "No. FASB requires companies to account for AI-embedded arrangements under existing GAAP standards, primarily ASC 606 for contract deliverables and ASC 350-40 for internal-use software. Regulators mandate that any AI utilized in financial close workflows must feature complete documentation of inputs, versioning, and deterministic audit trails."
      },
      {
        question: "Why do enterprise auditors reject probabilistic AI tools for ASC 606 revenue recognition?",
        answer: "Generative AI models are non-deterministic and prone to token hallucinations, making them difficult to support as evidence in Critical Audit Matter (CAM) review. Soluqube addresses this by combining bounding-box spatial grounding with integer (BigInt) fixed-point math and SHA-256 Merkle proofs, producing reproducible mathematical results."
      }
    ],
    content: `
## The 2026 Regulatory Pivot: PCAOB QC 1000

The Public Company Accounting Oversight Board (PCAOB) standard **QC 1000 (A Firm's System of Quality Control)** sets requirements for registered audit firms' systems of quality control.

QC 1000 applies to audit firms, not to corporate preparers or software, but it shapes what audit teams expect from the evidence and calculations they test. At the center of that expectation sits a perennial challenge: **ASC 606 Revenue Recognition from Contracts with Customers**.

Year after year, PCAOB inspection reports cite revenue recognition as the single most frequent area of audit deficiencies across both the largest audit firms and global network firms. Inspectors routinely identify failures in:
- Testing management's estimates for Standalone Selling Price (SSP).
- Validating the completeness and mathematical accuracy of spreadsheet-based amortization waterfalls.
- Documenting the legal grounding behind contract modifications and multi-element arrangements.

---

## Top Revenue Recognition Inspection Deficiencies in 2026

Recent PCAOB findings highlight three systematic breakdown patterns in enterprise accounting departments:

1. **Spreadsheet Version Fragmentation:** Financial teams managing ratable SaaS or multi-year enterprise deliverables inside Microsoft Excel inherit hidden formula errors, floating-point cent drift, and untracked manual journal adjustments.
2. **Unsupported Modification Assumptions:** When contracts undergo renewals or mid-term scope expansions, accounting memos frequently fail to prove whether new deliverables are *distinct* under ASC 606-10-25-13, leading to material cumulative catch-up misstatements.
3. **Black-Box ERP Calculation Engines:** Legacy ERP revenue recognition modules (such as standard NetSuite ARM or SAP revenue accounting) output aggregated general ledger numbers without providing transaction-level coordinate ties back to executed Master Services Agreements (MSAs).

---

## FASB's Stance on AI in Financial Reporting

As tech enterprises rush to deploy AI into corporate finance, the Financial Accounting Standards Board (FASB) has issued explicit guidance: **there is no 'AI exemption' in US GAAP**.

Companies deploying AI platforms must strictly account for deliverables under ASC 606:
- **Embedded Generative Features:** Must be evaluated as distinct or bundled performance obligations based on customer utility.
- **Consumption vs Subscription Pools:** Hybrid consumption tiers require real-time usage event ingestion rather than arbitrary ratable recognition.
- **Audit Documentation Mandate:** When AI tools assist in contract abstraction or ledger journal creation, audit teams must inspect the model version, temperature constraints, prompt architecture, and evidence coordinates.

---

## Why Probabilistic LLMs Fail Audit Standards

Generic Large Language Models (LLMs) operate on probabilistic token prediction. For marketing copy or customer support, 95% accuracy is sufficient. For SEC reporting and statutory MCA Schedule III balance sheets, a 1-cent discrepancy constitutes audit non-compliance.

| Audit Dimension | Probabilistic Generative AI | Soluqube Deterministic Engine |
|---|---|---|
| **Mathematical Parity** | Floating-point drift & hallucinations | Integer (BigInt) fixed-point math, rounded to cents, with terminal-period remainder absorption |
| **Source Grounding** | Text summaries without coordinate proof | Normalized sub-millimeter [x0, y0, x1, y1] PDF coordinates |
| **Audit Evidence Package** | Difficult to support as audit evidence | Cryptographic SHA-256 Merkle-sealed workpapers |
| **Standard Coverage** | Generic text generation | Full ASC 606 & Ind AS 115 dual-standard ledgers |

---

## The Soluqube Deterministic Defense Architecture

Soluqube was engineered to support the documentation and reproducibility that external audit teams look for:

1. **Directed Acyclic Graph (DAG) for Contract Modifications:** Encodes ASC 606-10-25-13 decision logic deterministically, generating instant catch-up journal entries without manual memo delays.
2. **Sub-Millimeter PDF Clause Grounding:** Links every line item in the revenue waterfall to exact integer coordinates on the signed legal contract.
3. **Scaled Integer (BigInt) Core:** Avoids IEEE-754 floating-point inaccuracies with integer (BigInt) arithmetic at 10^6 scale, rounded to cents, with terminal-period remainder absorption, so schedules tie to the contract value.
4. **Self-Contained Audit Packages:** Allows external auditors to independently recalculate schedules and verify cryptographic Merkle proofs in seconds.
    `
  },
  {
    slug: "netsuite-arm-vs-soluqube-floating-point-rounding-drift-asc-606",
    title: "NetSuite ARM vs Soluqube: Why IEEE-754 Floating-Point Drift Fails Revenue Audits",
    subtitle: "How 64-bit double-precision binary floating point creates silent cent rounding discrepancies in multi-year ASC 606 ratable schedules—and why integer (BigInt) fixed-point math with terminal-period remainder absorption keeps schedules tied to the cent.",
    publishedAt: "October 10, 2026",
    readTime: "9 min read",
    author: {
      name: "Nikhil @ Soluqube",
      role: "Founder & Lead Architect",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["NetSuite ARM", "ASC 606", "Floating Point Drift", "IEEE-754", "External Audit", "PCAOB"],
    targetQuery: "NetSuite ARM revenue recognition rounding cent drift audit",
    definitionAnchor: "Floating-point rounding drift under ASC 606 occurs when accounting software calculates monthly revenue amortization using 64-bit binary floating-point numbers (IEEE-754 standard). Because fractions like 1/3, 1/12, and 1/36 cannot be represented cleanly in binary, periodic rounding produces fractional-cent discrepancies that compound across multi-year ratable schedules, failing general ledger tie-out checks.",
    excerpt: "Discover why standard ERPs like NetSuite ARM and Excel fail PCAOB revenue sampling tests due to binary floating-point rounding—and how Soluqube keeps ledger schedules tied to the contract value using integer (BigInt) scaled arithmetic, rounded to cents.",
    toc: [
      { id: "the-floating-point-problem", label: "The IEEE-754 Binary Floating-Point Dilemma" },
      { id: "how-drift-accumulates", label: "How Cent Variance Compounds Across 36 Months" },
      { id: "arm-vs-soluqube-comparison", label: "NetSuite ARM vs. Soluqube Architecture" },
      { id: "terminal-absorption", label: "Terminal Remainder Absorption & Integer Parity" },
      { id: "pcaob-audit-defense", label: "Audit-Ready Evidence for External Auditors" }
    ],
    faqs: [
      {
        question: "Why do NetSuite ARM and Excel produce cent rounding errors in revenue schedules?",
        answer: "NetSuite and Excel execute calculations using 64-bit IEEE-754 binary floating-point numbers. In binary math, decimal fractions like 0.10 or 1/36 have repeating expansions, creating microscopic rounding noise (e.g., $2,777.777777777778). When rounded to 2 decimal places per month over a 36-month term, the sum of monthly revenues diverges from the original contract consideration by pennies, creating audit sampling exceptions."
      },
      {
        question: "How does Soluqube eliminate revenue schedule rounding drift?",
        answer: "Soluqube replaces binary floating-point calculations with integer (BigInt) fixed-point arithmetic at 10^6 scale, rounded to cents, and terminal-period remainder absorption. In the final period of an amortization term, Soluqube calculates the exact remainder: Total Consideration minus Cumulative Prior Amortization, so the schedule ties exactly to the contract value."
      },
      {
        question: "Does external auditor sampling flag sub-dollar cent drift?",
        answer: "Yes. While a few cents may appear immaterial on an isolated contract, PCAOB inspectors treat recurring computational discrepancies as a failure of automated application controls under SOX 404, requiring manual reconciliation memos and partner review hours."
      }
    ],
    content: `
## The IEEE-754 Binary Floating-Point Dilemma

Most modern enterprise ERP systems—including **NetSuite Advanced Revenue Management (ARM)**, Salesforce Billing, and standard Microsoft Excel workpapers—rely on IEEE-754 double-precision 64-bit binary floating-point math to compute ratable revenue schedules.

In binary arithmetic (base-2), fractional numbers that are simple in decimal (base-10)—such as \`0.10\`, \`0.20\`, or \`1/36\`—have infinite repeating representations. For example, dividing an annual contract of \`$100,000\` across 36 monthly performance periods produces an ideal monthly revenue of:

\`\`\`
100,000 / 36 = 2,777.7777777777777777...
\`\`\`

When an ERP rounds each monthly journal entry to standard currency precision (\`$2,777.78\`), multiplying this rounded monthly figure across 36 periods yields:

\`\`\`
$2,777.78 * 36 = $100,000.08
\`\`\`

That **8-cent variance** represents unexplained phantom revenue. In a corporate general ledger managing thousands of multi-element enterprise contracts with custom start dates and mid-term amendments, these floating-point errors accumulate into hundreds of dollars of irreconcilable variance between deferred revenue liability and cumulative recognized revenue.

---

## How Cent Variance Compounds Across 36 Months

The problem intensifies when contracts involve **multi-element arrangements** under ASC 606 Step 4 (allocating transaction price based on relative standalone selling prices):

1. **Element Allocation Rounding:** A 3-element contract ($150,000 total) split across SaaS access (70%), Implementation (20%), and Tiered Support (10%) undergoes initial rounding when dividing relative SSP percentages.
2. **Periodic Amortization Noise:** Each element is amortized over differing service periods (e.g., SaaS over 36 months ratable, implementation upon milestone delivery, support over 12 months).
3. **Mid-Term Contract Modifications (ASC 606-10-25-13):** When a client upsells or alters seat count mid-term, legacy ERPs rerun the schedule without reconciling prior rounded pennies, compounding the drift across prior closed accounting periods.

During year-end audit testing, external audit teams run automated reconciliation scripts across the general ledger. Unexplained discrepancies in ratable waterfalls trigger control deficiency inquiries and manual reconciliation memos.

---

## NetSuite ARM vs. Soluqube Architecture

| Architectural Dimension | NetSuite Advanced Revenue Management (ARM) | Soluqube Deterministic Engine |
|---|---|---|
| **Underlying Math Core** | 64-bit IEEE-754 Binary Floating-Point | Integer (BigInt) scaled fixed-point, rounded to cents (terminal-period remainder absorption) |
| **Terminal Remainder Policy** | Manual spreadsheet adjustment or unabsorbed drift | Automated closed-form terminal remainder absorption |
| **Contract Clause Grounding** | Text memo fields without coordinate proof | Normalized [x0, y0, x1, y1] PDF bounding-box vector links |
| **Contract Modification DAG** | Manual multi-step workflow / catch-up journal rules | Deterministic ASC 606-10-25-13 directed acyclic graph |
| **MCA / Ind AS 115 GST Firewall** | Gross consideration amortization (tax contamination) | Automated statutory 18% GST balance sheet quarantine |
| **Audit Defense Output** | Standard general ledger reports | Audit-ready evidence packages with SHA-256 integrity hashes |

---

## Terminal Remainder Absorption & Integer Parity

Soluqube eliminates floating-point drift through two fundamental mathematical mechanisms:

### 1. Scaled Integer (BigInt) Representation
All currency amounts are represented internally as integers (BigInt) scaled by $10^{6}$ (micro-cents) and rounded to cents, completely bypassing floating-point binary approximations:

\`\`\`typescript
// Scaled BigInt fixed representation (micro-cents)
const SCALE = 10n ** 6n;
const totalConsideration = 100000n * SCALE;
const termPeriods = 36n;
const basePeriodRecognition = totalConsideration / termPeriods;
\`\`\`

### 2. Exact Terminal Remainder Absorption
Rather than assuming equal monthly rounding across all periods, Soluqube deterministically absorbs the residual balance in the terminal period:

\`\`\`typescript
function calculateTerminalPeriod(total: bigint, monthly: bigint, term: number): bigint {
  const cumulativePrior = monthly * BigInt(term - 1);
  return total - cumulativePrior; // Absorbs exact mathematical remainder
}
\`\`\`

This guarantees that:
$$\sum_{t=1}^{T} \text{PeriodRevenue}_t \equiv \text{TotalContractConsideration}$$
with mathematical certainty.

---

## Audit-Ready Evidence for External Auditors

By combining integer (BigInt) fixed-point arithmetic with spatial contract PDF bounding-box clause grounding, Soluqube produces audit-ready evidence packages that support auditor review:

* **Zero Reconciliation Exceptions:** $0.000000 variance between general ledger postings and contract consideration.
* **Cryptographic Evidence Seals:** Every workpaper is hashed with SHA-256 Merkle proofs linking journal entries to original signed agreements.
* **Instant Auditor Hand-off:** Export self-contained audit packages that allow external audit teams to verify 36-month schedules in seconds.
    `
  },
  {
    slug: "mastering-asc-606-standalone-selling-price-ssp-multi-element-allocations",
    title: "Mastering ASC 606 Standalone Selling Price (SSP) Allocations: Relative Fair Value Math & Audit Defensibility",
    subtitle: "How CFOs and revenue accounting teams automate relative Standalone Selling Price allocation across bundled software, professional services, and usage tiers without spreadsheet rounding drift.",
    publishedAt: "October 11, 2026",
    readTime: "9 min read",
    author: {
      name: "Soluqube Editorial",
      role: "Technical Accounting Content Team",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["ASC 606", "Standalone Selling Price", "SSP Allocation", "Multi-Element Bundles", "PCAOB QC 1000", "Ind AS 115"],
    targetQuery: "ASC 606 Standalone Selling Price SSP allocation formula audit software",
    definitionAnchor: "ASC 606 Standalone Selling Price (SSP) allocation is the mandatory accounting methodology of allocating transaction price across bundled performance obligations based on relative standalone selling prices, requiring deterministic mathematical formulas that eliminate spreadsheet rounding drift and maintain a documented audit trail for external auditor review.",
    excerpt: "Discover how enterprise revenue teams calculate relative Standalone Selling Price (SSP) across multi-element SaaS contracts, eliminate spreadsheet rounding variances, and support external audit review with deterministic integer (BigInt) fixed-point subledgers.",
    toc: [
      { id: "ssp-regulatory-framework", label: "The ASC 606 Step 4 Mandate: Relative SSP Allocation" },
      { id: "methods-of-determination", label: "Three Accepted Methods for Determining SSP" },
      { id: "multi-element-mathematics", label: "The Mathematics of Relative Allocation & Rounding Drift" },
      { id: "pcaob-audit-scrutiny", label: "Auditor Scrutiny on Management SSP Estimates" },
      { id: "soluqube-deterministic-engine", label: "The Soluqube Deterministic Integer SSP Engine" },
      { id: "conclusion-audit-readiness", label: "Checklist for Audit-Defensible SSP Governance" }
    ],
    faqs: [
      {
        question: "What is Standalone Selling Price (SSP) under ASC 606 Step 4?",
        answer: "Under ASC 606-10-32-28, the standalone selling price is the price at which an entity would sell a promised good or service separately to a customer. If goods or services are bundled with a discount, the total transaction price must be allocated to each distinct performance obligation in proportion to its relative SSP."
      },
      {
        question: "What are the three approved methods to estimate SSP when observable prices do not exist?",
        answer: "Under ASC 606-10-32-31 to 35, the three approved estimation methods are: 1) Adjusted Market Assessment Approach (evaluating competitor pricing and market demand), 2) Expected Cost Plus a Margin Approach (projecting delivery costs plus reasonable profit), and 3) Residual Approach (strictly limited to highly variable or uncertain pricing)."
      },
      {
        question: "Why do Excel spreadsheets fail external audit inspections on relative SSP allocations?",
        answer: "Excel spreadsheets rely on IEEE-754 64-bit binary floating-point numbers. When multi-element contract consideration is allocated proportionately across multiple performance obligations and ratable terms, rounding remainders create penny and cent mismatches between the allocated total and the executed contract invoice, failing substantive audit tests."
      }
    ],
    content: `
## The ASC 606 Step 4 Mandate: Relative SSP Allocation

Step 4 of the FASB and IASB five-step revenue recognition model requires entities to allocate the transaction price to each performance obligation identified in the contract on a **relative standalone selling price (SSP) basis**.

In modern enterprise B2B SaaS, enterprise agreements rarely consist of a single SKU. Typical contracts bundle:
1. **Core SaaS Subscription** (Ratable over 12, 36, or 60 months).
2. **Implementation & Onboarding Services** (Point-in-time or milestone completion).
3. **Premium 24/7 SLA Support** (Ratable over term).
4. **Custom API Consumption Tiers** (Variable consideration subject to constraint).

When sales teams offer contractual bundle discounts (e.g., $150,000 package with standard list prices totaling $200,000), accounting teams are prohibited from allocating the 25% discount arbitrarily. ASC 606 mandates that the discount must be allocated proportionately across all performance obligations unless clear observable evidence exists that the discount belongs to a specific element.

---

## Three Accepted Methods for Determining SSP

Under ASC 606-10-32-31, entities must first seek **observable standalone selling prices**. When observable prices are not available, management must establish an objective estimation methodology:

### 1. Adjusted Market Assessment Approach
Evaluates the market in which goods or services are sold and estimates the price that customers in that market would be willing to pay. This includes benchmark competitor pricing, list price discounting corridors, and regional price adjustments.

### 2. Expected Cost Plus a Margin Approach
Projects direct and indirect costs of satisfying the performance obligation (e.g., engineering hours for custom integrations) and adds an appropriate commercial margin reflecting market realities.

### 3. Residual Approach
Calculates SSP by deducting the sum of observable SSPs of other goods/services from the total contract consideration. **Caution:** Under ASC 606-10-32-34, this method is strictly restricted to situations where selling prices are highly variable or uncertain.

---

## The Mathematics of Relative Allocation & Rounding Drift

The formula for allocating consideration to Performance Obligation $i$ is:

$$\\text{Allocated Consideration}_i = \\text{Total Transaction Price} \\times \\left( \\frac{\\text{SSP}_i}{\\sum_{k=1}^{N} \\text{SSP}_k} \\right)$$

### The Multi-Year Rounding Defect
Consider an enterprise contract with a **$100,000.00** transaction price bundled across 3 distinct obligations:
* **Element A (SaaS Core):** SSP = $70,000 (35.0%)
* **Element B (Professional Services):** SSP = $20,000 (10.0%)
* **Element C (SLA Support):** SSP = $110,000 (55.0%)
* **Total SSP:** $200,000 (Contract has a 50% bundle discount)

When allocated and subsequently amortized across 36 monthly periods using standard 64-bit IEEE-754 floating-point numbers in Excel or legacy ERPs:
* The monthly allocation for Element C yields: $\\frac{\\$55,000}{36} = \\$1,527.7777777777778$
* Standard spreadsheet cell formatting rounds this to **$1,527.78**.
* Over 36 months, total recognized revenue compounds to **$55,000.08**.
* **Variance:** +$0.08 cent drift on a single line item.

Across hundreds of multi-element contracts, these unabsorbed fractional remainders compound into thousands of dollars in unreconciled subledger variance that trigger PCAOB audit comment letters.

---

## Auditor Scrutiny on Management SSP Estimates

Independent auditors rigorously test management estimates and subledger internal controls (PCAOB QC 1000 governs audit firms' own quality-control systems, which raises the bar for the evidence they accept):

1. **Defensible Corridor Policies:** Auditors inspect historical discount ranges to verify that SSP price points fall within documented corridors (e.g., 80% to 120% of median standalone sales).
2. **Mathematical Reproducibility:** Spreadsheets lacking automated remainder absorption fail completeness and accuracy testing under PCAOB AS 1105.
3. **Contract Clause Linkage:** General ledger entries must link back to executed contract terms without ungrounded manual adjustments.

---

## The Soluqube Deterministic Integer SSP Engine

Soluqube eliminates relative SSP allocation drift through a three-stage deterministic pipeline:

### 1. Integer-Scaled Fixed-Point Allocation
Consideration is scaled by $10^{6}$ (micro-cents) and evaluated using deterministic BigInt arithmetic, rounded to cents:

\`\`\`typescript
// Soluqube Relative SSP Allocation Formula
const totalConsiderationBigInt = 10000000n * (SCALE / 100n); // $100,000.00
const sspA = 7000000n;
const sspB = 2000000n;
const sspC = 11000000n;
const totalSSP = sspA + sspB + sspC; // 200,000.00

// Proportional allocation with BigInt precision
const allocatedA = (totalConsiderationBigInt * sspA) / totalSSP;
const allocatedB = (totalConsiderationBigInt * sspB) / totalSSP;
const allocatedC = totalConsiderationBigInt - (allocatedA + allocatedB); // Exact residual absorption
\`\`\`

### 2. PyMuPDF Spatial Clause Grounding
Every performance obligation in Soluqube is linked to precise normalized coordinate bounding boxes $[x_0, y_0, x_1, y_1]$ on the underlying signed PDF contract. When an auditor clicks an allocation figure, the exact contract clause and discount table light up instantly.

### 3. Automated Audit-Ready Evidence Packages
Soluqube automatically compiles audit-ready evidence packages containing mathematical proofs, Merkle tree execution hashes, and journal entry schedules with **guaranteed $0.000000 general ledger parity**.

---

## Checklist for Audit-Defensible SSP Governance

To prepare your finance organization for smooth external and statutory audit cycles:

* [x] **Establish Formal SSP Corridors:** Review standalone selling transactions annually and define standard discount bands for all product SKUs.
* [x] **Eliminate Manual Spreadsheets:** Replace error-prone Excel calculation sheets with deterministic, integer (BigInt) subledger automation.
* [x] **Enforce Terminal Period Absorption:** Ensure amortization waterfalls absorb rounding remainders in the final contract period rather than spreading rounding errors across the balance sheet.
* [x] **Ground Allocations to Executed Contracts:** Maintain bi-directional linkages between general ledger debit/credit postings and original signed contract clauses.
* [x] **Automate Dual Standard Tax Quarantine:** For Indian operations under Ind AS 115, ensure 18% statutory GST is quarantined from consideration prior to SSP allocation.
    `
  },
  {
    slug: "best-maxio-alternatives-contract-revenue-recognition",
    title: "Best Maxio Alternatives for ASC 606 Contract Revenue Recognition in 2026",
    subtitle: "Why modern finance teams are replacing legacy subscription billing subledgers with deterministic AI contract audit engines that eliminate manual quote-to-cash friction and rounding drift.",
    publishedAt: "October 12, 2026",
    readTime: "10 min read",
    author: {
      name: "Soluqube Editorial",
      role: "Technical Accounting Content Team",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["Maxio Alternatives", "ASC 606 Software", "Revenue Subledger", "SaaSOptics Replacement", "Audit Readiness"],
    targetQuery: "Best Maxio alternatives for ASC 606 revenue recognition 2026",
    definitionAnchor: "A Maxio alternative is a specialized revenue accounting subledger or contract audit engine designed to automate ASC 606 and IFRS 15 revenue recognition directly from executed customer contracts rather than relying solely on billing line items, CPQ quotes, or manual spreadsheet workpapers.",
    excerpt: "Compare top Maxio alternatives in 2026 for ASC 606 revenue recognition. Discover why finance teams are moving from invoice-first billing tools to contract-grounded subledgers with zero rounding drift.",
    toc: [
      { id: "why-replace-maxio", label: "Why Finance Teams Outgrow Maxio" },
      { id: "top-alternatives", label: "Top Maxio Alternatives Evaluated" },
      { id: "architectural-gap", label: "Contract-to-Ledger vs. Invoice-to-Ledger" },
      { id: "feature-matrix", label: "2026 Comparative Feature Matrix" },
      { id: "selection-checklist", label: "CFO Buyer Guide & Evaluation Framework" }
    ],
    content: `
## Why Finance Teams Outgrow Maxio

Maxio (formed by the 2022 merger of **Chargify** and **SaaSOptics**) has long been a fixture in the SaaS billing ecosystem. However, as enterprise contract structures evolve from simple flat-rate subscriptions to complex multi-element arrangements—combining upfront platform access, tiered usage, professional services, milestone deliverables, and custom SLA penalty clauses—finance teams encounter critical structural limitations:

1. **Invoice-Centric Rather Than Contract-Grounded**: Maxio recognizes revenue based on invoices created in billing systems or CRM quote data. If the signed Master Services Agreement (MSA) or custom Statement of Work (SOW) contains non-standard terms, termination clauses, or variable consideration, manual intervention is required to translate legal language into accounting schedules.
2. **Rounding Drift Exposure**: Maxio does not publish its arithmetic internals. Any engine that rounds each period to two decimals without remainder absorption can, over 36 to 60-month multi-year contracts with irregular recognition intervals, compound rounding errors into discrepancies that trigger auditor inquiries.
3. **Absence of Dual-GAAP Statutory Support**: Maxio does not natively isolate Indian statutory 18% GST (CGST/SGST/IGST) from transaction consideration or generate MCA Schedule III balance sheet disclosures required for cross-border US-India SaaS operations.
4. **Lengthy Implementation & Opaque Pricing**: Enterprise onboarding timelines and %-of-revenue platform fees (pricing not published) can penalize business growth.

---

## Top Maxio Alternatives Evaluated

### 1. Soluqube — Best for Deterministic Contract Audits & Dual-GAAP Accuracy
Soluqube is a purpose-built contract audit subledger that ingests raw PDF customer agreements, grounds every performance obligation (POB) to visual page coordinates, and executes integer (BigInt) arithmetic at 10^6 scale, rounded to cents, with terminal-period remainder absorption.
* **Key Strengths**: Sub-millimeter PDF bounding-box verification, dual-standard ASC 606 and Ind AS 115 engine, Merkle tree cryptographic audit seals, and self-serve instant onboarding ($499 full audit pack).
* **Best For**: Mid-market to enterprise SaaS, cross-border US-India operations, and high-scrutiny external audit readiness.

### 2. Trullion — Best for Enterprise Lease (ASC 842) + Basic RevRec
Trullion leverages AI document extraction to read PDF contracts and extract financial terms.
* **Key Strengths**: Unified platform for both ASC 842 lease accounting and ASC 606 revenue recognition.
* **Limitations**: Enterprise pricing and sales cycle (not published); no Ind AS 115 dual-standard engine advertised (check current vendor documentation).

### 3. Leapfin — Best for High-Volume B2C Transaction Data Pipelines
Leapfin acts as a financial data platform that consolidates millions of daily micro-transactions from Stripe, Shopify, and in-app purchases into NetSuite-ready journal entries.
* **Key Strengths**: High throughput for massive transactional data volumes.
* **Limitations**: Focuses on transaction event streaming rather than raw PDF contract clause extraction and spatial audit grounding.

### 4. RightRev — Best for Native Salesforce CPQ Environments
RightRev is built directly on Salesforce and integrates seamlessly with Salesforce CPQ and Billing.
* **Key Strengths**: Deep Salesforce native architecture and automated revenue rule triggers from CPQ quote approvals.
* **Limitations**: Heavy platform lock-in; non-Salesforce contracts require extensive custom API engineering.

---

## Contract-to-Ledger vs. Invoice-to-Ledger

The defining architectural distinction between Maxio and next-generation engines like Soluqube is the underlying source of truth:

\`\`\`
                     [ Signed Enterprise Contract PDF ]
                                     |
               +---------------------+---------------------+
               |                                           |
      [ INVOICE-TO-LEDGER ]                       [ CONTRACT-TO-LEDGER ]
         (Maxio / Billing)                          (Soluqube Engine)
               |                                           |
    Manual Deal Desk Entry                      Spatial OCR & Token BBoxes
               |                                           |
      CRM Quote Line Items                      Legal Clause Grounding
               |                                           |
     Invoice Generation Timing                  Relative SSP Allocation DAG
               |                                           |
   Per-Period Rounding (Drift)                 BigInt Micro-Cent (Cents, Absorbed)
               |                                           |
     Manual Audit Defense                        Merkle-Sealed Evidence Pack
\`\`\`

---

## 2026 Comparative Feature Matrix

| Capability | Maxio | Trullion | Leapfin | Soluqube |
| :--- | :---: | :---: | :---: | :---: |
| **Ingestion Source** | Invoices / CRM Quotes | PDF / Excel | Webhooks / Events | **Raw Contract PDF** |
| **Visual Bounding-Box Proof** | No | Partial | No | **Sub-millimeter BBoxes** |
| **Math Engine Precision** | Not published | Not published | Not published | **Integer (BigInt) Fixed-Point DAG** |
| **Terminal-Period Remainder Absorption** | Not published | Not published | Not published | **Yes (ties to the cent)** |
| **Dual-GAAP (ASC 606 + Ind AS 115)** | No | No | No | **Native Dual Standard** |
| **Indian 18% GST Isolation** | No | No | No | **MCA Schedule III Ready** |
| **Implementation Timeline** | Not published | Not published | Not published | **Instant / 24 Hours** |
| **Self-Serve Access** | Enterprise Sales | Enterprise Sales | Enterprise Sales | **Instant ($499 Audit)** |

---

## CFO Buyer Guide & Evaluation Framework

When selecting a modern revenue recognition engine to replace or complement Maxio, evaluate candidate systems against four critical criteria:
1. **Can the system prove clause origin during an audit?** Ask vendors whether their system provides click-through coordinate proof linking journal line items back to the signed contract PDF.
2. **How does the calculation engine handle fractional pennies?** Confirm whether the database uses scaled BigInt/fixed-point mathematics or standard floating-point decimals that cause cumulative drift.
3. **Does the platform impose revenue taxation?** Choose platforms with transparent, fixed pricing rather than penalty fees scaling with your gross billings.
4. **Is cross-border statutory compliance supported?** If your company employs developers or operates subsidiaries in India, ensure native Ind AS 115 isolation is built into the core ledger.
    `
  },
  {
    slug: "ind-as-115-vs-asc-606-cross-border-dual-gaap-guide",
    title: "The Definitive Ind AS 115 vs ASC 606 Dual-GAAP Guide for US-India SaaS Enterprises",
    subtitle: "A practical accounting blueprint for controllers managing cross-border software revenue, MCA Schedule III balance sheet disclosures, and 18% GST statutory tax isolation.",
    publishedAt: "October 12, 2026",
    readTime: "12 min read",
    author: {
      name: "Soluqube Editorial",
      role: "Technical Accounting Content Team",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["Ind AS 115", "ASC 606", "Dual-GAAP", "GST Quarantine", "MCA Schedule III", "Cross-Border SaaS"],
    targetQuery: "Ind AS 115 vs ASC 606 Dual-GAAP revenue recognition guide",
    definitionAnchor: "Ind AS 115 vs ASC 606 dual-GAAP accounting is the regulatory methodology by which multinational entities reconcile revenue recognized under US GAAP standards with Indian MCA Ind AS 115 statutory requirements, specifically isolating non-revenue tax liabilities (such as 18% GST) into segregated balance sheet accounts.",
    excerpt: "Master the essential differences between Ind AS 115 and ASC 606. Learn how multinational SaaS enterprises isolate 18% GST and automate MCA Schedule III compliance with integer (BigInt) micro-cent precision.",
    toc: [
      { id: "standard-convergence", label: "Harmonization & The Critical Divergence" },
      { id: "five-step-analysis", label: "The 5-Step Model Under Ind AS 115" },
      { id: "gst-quarantine-rules", label: "Statutory 18% GST Isolation & Accounting Mechanics" },
      { id: "mca-schedule-iii", label: "MCA Schedule III Balance Sheet Disclosures" },
      { id: "intercompany-fx", label: "Cross-Border Transfer Pricing & FX Revaluation" }
    ],
    content: `
## Harmonization & The Critical Divergence

On the surface, **Ind AS 115** (*Revenue from Contracts with Customers*, notified by the Ministry of Corporate Affairs in India) and **US GAAP ASC 606** (FASB Topic 606) appear virtually identical. Both frameworks adopted the core converged **5-Step Revenue Recognition Model** originally co-authored by the FASB and IASB.

However, in actual cross-border practice, US-headquartered software companies with Indian development subsidiaries, Global Capability Centers (GCCs), or direct Indian customer contracts encounter severe operational divergences:

1. **Gross Consideration & Statutory Indirect Taxes**: Under US GAAP, state sales taxes collected on behalf of taxing jurisdictions are routinely excluded from transaction price without altering contractual standalone selling prices (SSPs). Under Indian law, contracts executed in gross terms must strictly isolate **18% Goods and Services Tax (GST)** into statutory pass-through accounts at transaction inception.
2. **Balance Sheet Presentation (MCA Schedule III)**: Indian statutory filings mandate rigid classification under Schedule III of the Companies Act, requiring distinct disclosure of unbilled revenue, contract liabilities, trade receivables, and deferred revenue broken down by current versus non-current portions.
3. **Penalties, Rebates, and Withholding Tax (TDS)**: Section 194J/194C Tax Deducted at Source (TDS) under the Indian Income Tax Act impacts cash settlement and reconciliation timing, requiring rigorous subledger clearing accounts.

---

## The 5-Step Model Under Ind AS 115

\`\`\`
   ┌────────────────────────────────────────────────────────┐
   │             THE DUAL-GAAP 5-STEP FRAMEWORK            │
   └────────────────────────────────────────────────────────┘
                               │
            Step 1: Identify the Customer Contract
            (Validates legal enforceability & commercial substance)
                               │
            Step 2: Identify Performance Obligations (POBs)
            (Platform access vs. customizations vs. professional services)
                               │
            Step 3: Determine Transaction Price
            (Isolates 18% GST from Gross Invoiced Consideration)
                               │
            Step 4: Allocate Transaction Price to POBs
            (Relative Standalone Selling Price [SSP] allocation DAG)
                               │
            Step 5: Recognize Revenue as POBs are Satisfied
            (Over-time ratable vs. point-in-time milestone completion)
\`\`\`

### Step 3 Deep-Dive: Isolating 18% GST from Consideration

When an Indian client signs a contract for **₹11,800,000**, conventional accounting software often records the full ₹11.8M as deferred revenue and calculates monthly amortization as ₹11.8M / 12 = ₹983,333.33.

**This is a critical regulatory violation under Ind AS 115.**

GST collected on behalf of the government does not represent consideration to which the entity is entitled. The calculation must decouple tax at inception:

$$\\text{Net Consideration} = \\frac{\\text{Gross Consideration}}{1 + \\text{GST Rate}} = \\frac{₹11,800,000}{1.18} = ₹10,000,000$$

$$\\text{Statutory Tax Liability} = ₹11,800,000 - ₹10,000,000 = ₹1,800,000$$

* If Intra-State (e.g. Karnataka to Karnataka): **₹900,000 CGST (9%) + ₹900,000 SGST (9%)**
* If Inter-State (e.g. Karnataka to Maharashtra): **₹1,800,000 IGST (18%)**
* If Export of Services under LUT (Letter of Undertaking): **0% GST (Zero-Rated)**

---

## MCA Schedule III Balance Sheet Disclosures

Under Schedule III of the Indian Companies Act, 2013, contract assets and liabilities cannot be netted into a single deferred revenue line. Financial statements must present:

1. **Contract Assets (Unbilled Revenue)**: Consideration earned by fulfilling performance obligations before invoice issuance rights crystallize.
2. **Contract Liabilities (Deferred Revenue)**: Upfront cash collected or unconditioned billing for obligations yet to be delivered.
3. **Maturity Splitting**: Rigorous segregation between **Current Liabilities** (to be satisfied within 12 months) and **Non-Current Liabilities** (multi-year contract periods beyond 12 months).

Soluqube generates automated MCA Schedule III compliance workpapers with dual USD and INR statutory tie-outs directly from the ingested contract terms.

---

## Intercompany Transfer Pricing & FX Revaluation

For US parent companies utilizing Indian subsidiaries under a **Cost Plus Transfer Pricing Model** (typically Cost + 15% to 18% under safe harbor provisions):
* The Indian entity recognizes revenue based on local operating expenditures plus markup.
* The US parent recognizes revenue from third-party enterprise customers under ASC 606.
* Month-end foreign exchange revaluations under **Ind AS 21** and **ASC 830** must synchronize with the underlying contract amortization schedule to eliminate cumulative intercompany reconciliation imbalances.
    `
  },
  {
    slug: "netsuite-arm-and-excel-rounding-errors-in-asc-606",
    title: "Why Excel Spreadsheets and ERP Rounding Errors Fail Revenue Audits (The Integer Math Solution)",
    subtitle: "An engineering teardown of IEEE-754 floating-point truncation in ERP revenue subledgers, the mathematics of cumulative drift, and how integer (BigInt) micro-cent fixed-point DAGs with terminal-period remainder absorption keep schedules tied to the cent.",
    publishedAt: "October 12, 2026",
    readTime: "11 min read",
    author: {
      name: "Alex Chen",
      role: "Principal Systems Architect & Computational Ledger Specialist",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["NetSuite ARM", "Revenue Rounding Errors", "IEEE-754", "ASC 606 Audit", "Audit Workpapers", "Micro-Cent Math"],
    targetQuery: "Excel spreadsheet revenue recognition rounding error audit",
    definitionAnchor: "Revenue rounding drift is the cumulative numerical variance between contractual transaction price and recognized revenue schedules caused by binary floating-point representation (IEEE-754) or arbitrary decimal truncation in ERP database systems over multi-period amortization schedules.",
    excerpt: "Discover why standard ERP subledgers and Excel spreadsheets introduce penny rounding errors in ASC 606 schedules that trigger audit delays—and how integer (BigInt) micro-cent fixed-point DAGs with terminal-period remainder absorption keep schedules tied to the cent.",
    toc: [
      { id: "the-penny-problem", label: "The Hidden Penny Drift in Enterprise ERPs" },
      { id: "ieee-754-breakdown", label: "The Physics of IEEE-754 Binary Floating-Point Error" },
      { id: "netsuite-arm-truncation", label: "NetSuite ARM & Database Decimal Pitfalls" },
      { id: "micro-cent-dag", label: "The Integer Micro-Cent DAG Solution" },
      { id: "audit-tie-out-proof", label: "Passing External Audits with Deterministic Proof" }
    ],
    content: `
## The Hidden Penny Drift in Enterprise ERPs

Every accounting team that has managed a multi-million-dollar ASC 606 revenue recognition schedule in **NetSuite Advanced Revenue Management (ARM)**, **Workday**, or **Microsoft Excel** has encountered the notorious *"phantom penny"*:

An enterprise contract valued at exactly **$1,000,000.00** amortized across 36 monthly periods results in recognized revenue of **$999,999.96** or **$1,000,000.04**. 

While a four-cent variance might appear immaterial on a headline income statement, during a PCAOB-governed external financial audit, it triggers a chain reaction:
* **The Trial Balance Fails to Tie Out to Contract Face Value.**
* **Variance Suspense Accounts Require Manual Adjusting Journal Entries.**
* **Audit Workpaper Sampling Fails Automated Reconciliation Thresholds.**
* **SOX 404 IT General Controls (ITGC) Over Automated Financial Systems Are Flagged.**

---

## The Physics of IEEE-754 Binary Floating-Point Error

Why does this happen in multi-billion-dollar enterprise software systems? The failure originates in computer hardware architecture.

Standard programming languages and relational database engines represent decimal fractions using the **IEEE-754 binary floating-point standard**. In base 2 (binary), decimal fractions like 0.10 or 0.01 cannot be represented precisely—they become infinite repeating binary fractions:

$$0.10_{10} = 0.00011001100110011..._2$$

When an ERP calculates daily or monthly amortization:
\`\`\`javascript
// THE FATAL IEEE-754 FLOAT OPERATION
let contractTotal = 100000.00;
let periods = 36;
let monthly = contractTotal / periods; // 2777.777777777778

// Re-accumulating over 36 months:
let sum = 0;
for (let i = 0; i < 36; i++) {
  sum += Number(monthly.toFixed(2));
}
console.log(sum); // Output: 99999.96 ($0.04 DRIFT ERROR!)
\`\`\`

---

## NetSuite ARM & Database Decimal Pitfalls

NetSuite ARM utilizes SuiteScript and SQL decimal representations that round intermediary recognition schedules to two decimal places at each posting interval. 

When a multi-element contract includes:
1. **Platform SaaS License** ($120,000 / 12 mo)
2. **Professional Implementation Services** ($35,000 milestone-based)
3. **Premium 24/7 Support SLA** ($15,000 / 12 mo)
4. **Contract Modification (Mid-Term Up-sell)** ($25,000 pro-rated)

The relative Standalone Selling Price (SSP) allocation formula requires non-linear fractional division:

$$\\text{Allocated Consideration}_i = \\text{Total Transaction Price} \\times \\left( \\frac{\\text{SSP}_i}{\\sum \\text{SSP}} \\right)$$

If each allocated POB is rounded individually to 2 decimal places prior to waterfall amortization, the sum of POBs deviates from total contractual cash consideration before the first journal entry is posted!

---

## The Integer Micro-Cent DAG Solution

Soluqube solves the rounding drift problem deterministically using an **integer (BigInt) micro-cent fixed-point Directed Acyclic Graph (DAG)**, rounded to cents with terminal-period remainder absorption.

\`\`\`
                     [ Raw Contract Consideration ]
                                   │
              Scaled to BigInt Micro-Cents (Factor: 10^6)
                                   │
                     ┌─────────────┴─────────────┐
                     ▼                           ▼
            POB 1 (Platform License)    POB 2 (Support SLA)
                     │                           │
            Discrete Daily Slots        Discrete Daily Slots
                     │                           │
                     └─────────────┬─────────────┘
                                   │
                     Terminal Period Remainder Catch-Up
                                   │
                     Exact $0.000000 Variance Ledger
\`\`\`

1. **Micro-Cent Scaling**: Values are scaled by a factor of 1,000,000 and computed exclusively using integer arithmetic (JavaScript \`BigInt\`).
2. **Remainder Conservation**: For any division P / N, the quotient Q and integer remainder R are preserved:
   $$P = (N \\times Q) + R$$
3. **Terminal Period Absorption**: The integer remainder R is deterministically absorbed into the final period of the performance obligation.

\`\`\`typescript
// SOLUQUBE DETERMINISTIC BIGINT INTEGER EXECUTION
export function calculateZeroDriftWaterfall(totalCents: bigint, periods: bigint): bigint[] {
  const baseMonthly = totalCents / periods;
  const remainder = totalCents % periods;
  
  const schedule: bigint[] = [];
  for (let i = 0n; i < periods; i++) {
    if (i === periods - 1n) {
      // Final period absorbs exact remainder
      schedule.push(baseMonthly + remainder);
    } else {
      schedule.push(baseMonthly);
    }
  }
  return schedule;
}
\`\`\`

---

## Passing External Audits with Deterministic Proof

By eliminating floating-point imprecision at the core architectural level, Soluqube guarantees:
* **Strict Balance Sheet Parity**: The sum of recognized revenue across all periods plus remaining deferred revenue equals exactly 100.00% of contractual transaction price at all times.
* **Audit-Ready Evidence Packages**: Mathematical tie-out schedules export with embedded SHA-256 Merkle proofs, allowing external audit teams to independently verify zero penny discrepancy in seconds.
* **Zero Manual Journal Entries**: Controllers eliminate month-end variance plug entries and pass SOX 404 ITGC controls effortlessly.
    `
  },
  {
    slug: "zuora-revpro-vs-soluqube-6-month-erp-implementation-trap",
    title: "Zuora RevPro vs Soluqube: Escaping the 6-Month Enterprise RevRec Implementation Trap",
    subtitle: "Why CFOs and corporate controllers are bypassing multi-month Zuora RevPro consulting deployments in favor of deterministic, self-serve PDF contract subledgers.",
    publishedAt: "October 13, 2026",
    readTime: "9 min read",
    author: {
      name: "Soluqube Editorial",
      role: "Technical Accounting Content Team",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["Zuora RevPro Alternative", "ASC 606 Implementation", "Enterprise Subledger", "CFO Advisory", "Ind AS 115"],
    targetQuery: "Zuora RevPro alternative implementation cost ASC 606",
    definitionAnchor: "A Zuora RevPro alternative is a modern, deterministic revenue recognition subledger that automates ASC 606 and Ind AS 115 compliance directly from executed PDF contracts in hours rather than requiring a lengthy system integrator implementation and proprietary upstream billing schemas.",
    excerpt: "Evaluate Zuora RevPro against Soluqube. Learn why enterprise finance teams are replacing 6-month ERP consulting projects with instant integer (BigInt) deterministic contract audits.",
    toc: [
      { id: "the-revpro-trap", label: "The Zuora RevPro Implementation Reality" },
      { id: "schema-brittleness", label: "Why Upstream Billing Schemas Break on Bespoke MSAs" },
      { id: "deterministic-dag", label: "Integer Fixed-Point DAG vs Legacy Rules Engines" },
      { id: "comparison-matrix", label: "Zuora RevPro vs Soluqube Head-to-Head Matrix" },
      { id: "migration-playbook", label: "24-Hour Parallel Audit Playbook for Controllers" }
    ],
    content: `
## The Zuora RevPro Implementation Reality

For over a decade, **Zuora RevPro** (formerly Leeyo RevPro) was treated as the default enterprise revenue management module for pre-IPO technology companies. Yet when mid-market and enterprise CFOs sign a RevPro licensing contract today, they immediately confront a harsh operational reality:

1. **System Integrator Consulting**: Before a single dollar of deferred revenue is amortized, external advisory firms are typically engaged (fees and timelines not published) to map custom fields between Salesforce CPQ, Zuora Billing, and your core ERP.
2. **Manual Contract Translation Bottlenecks**: RevPro cannot read an unstructured Master Services Agreement (MSA) or Statement of Work (SOW). Accountants must manually read PDF legal agreements and translate performance obligations into rigid CSV upload templates or custom POB rules.
3. **Zero Dual-GAAP Indian Statutory Isolation**: Multinational enterprises operating Global Capability Centers (GCCs) or billing customers in India must maintain separate manual spreadsheets to quarantine 18% GST (CGST/SGST/IGST) under **MCA Schedule III** and **Ind AS 115**.

---

## Why Upstream Billing Schemas Break on Bespoke MSAs

Legacy revenue subledgers assume every customer transaction follows a clean, standardized product catalog skew. In reality, B2B enterprise deals are closed in the final week of the quarter via redlined PDF agreements containing:
* Custom milestone acceptance gates
* Retroactive volume tier resets
* Co-termed multi-subsidiary carve-outs
* Termination-for-convenience refund clauses

When these non-standard clauses are forced into rigid Zuora RevPro rules tables, the upstream connector breaks—forcing revenue accountants back into offline Excel workbooks to calculate manual journal true-ups.

---

## Integer Fixed-Point DAG vs Legacy Rules Engines

Soluqube eliminates the middleware translation layer entirely by ingesting the signed PDF contract as the primary accounting artifact:

\`\`\`typescript
// DETERMINISTIC BIGINT MICRO-CENT ALLOCATION (TERMINAL-PERIOD ABSORPTION)
const CONTRACT_CONSIDERATION_MICROCENTS = 250000000000n; // $250,000.00
const RATABLE_PERIODS = 36n;

const periodBase = CONTRACT_CONSIDERATION_MICROCENTS / RATABLE_PERIODS;
const terminalRemainder = CONTRACT_CONSIDERATION_MICROCENTS % RATABLE_PERIODS;
// Remainder absorbed deterministically in Period 36 -> Exact $0.000000 variance
\`\`\`

Every performance obligation is anchored directly to \`[page, x0, y0, x1, y1]\` spatial coordinates on the signed PDF, sealed with a cryptographic SHA-256 Merkle root for instant external audit verification.

---

## Zuora RevPro vs Soluqube Head-to-Head Matrix

| Dimension | Zuora RevPro | Soluqube |
| :--- | :--- | :--- |
| **Deployment Timeline** | SI implementation (timeline not published) | **Instant Self-Serve (< 24 Hours)** |
| **Primary Ingestion Source** | Normalized ERP / Billing CSVs | **Raw Executed Contract PDF (MSA/SOW)** |
| **PDF Clause Grounding** | None (Manual voucher references) | **Sub-millimeter [page, x, y] BBoxes** |
| **Arithmetic Engine** | Not published | **Integer (BigInt) Micro-Cent Fixed-Point DAG** |
| **Dual-GAAP (ASC 606 + Ind AS 115)** | US GAAP / IFRS 15 Only | **Native Dual-GAAP + 18% GST Firewall** |
| **Total Year-1 Cost (TCO)** | Pricing not published | **$499/audit or predictable flat tier** |

---

## 24-Hour Parallel Audit Playbook for Controllers

You do not need to rip out your existing ERP to eliminate revenue audit risk. Finance teams deploy Soluqube in three steps:
1. **Upload Your Top 10 Complex Contracts**: Drop your highest-value enterprise MSAs and amendments into the Soluqube audit console.
2. **Verify Spatial BBoxes & Integer Schedules**: Inspect the extracted performance obligations, relative SSP allocations, and zero-drift amortization waterfalls.
3. **Export Audit-Ready Evidence Packs**: Hand your external auditors workpapers with SHA-256 integrity hashes in one click.
    `
  },
  {
    slug: "ssp-allocation-rounding-residual-cent-asc-606",
    engineVerified: true,
    title: "SSP Allocation Rounding in ASC 606: Where the Cent Goes",
    subtitle: "Allocating a bundle by relative SSP leaves fractions of a cent. Worked 3-element example and a defensible policy for the residual.",
    publishedAt: "October 14, 2026",
    readTime: "6 min read",
    author: {
      name: "Soluqube Editorial",
      role: "Technical Accounting Content Team",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["ASC 606", "SSP Allocation", "Rounding Policy", "Standalone Selling Price", "Ind AS 115"],
    targetQuery: "ASC 606 SSP allocation rounding",
    definitionAnchor: "Allocating a transaction price by relative standalone selling price usually gives each performance obligation a share with fractions of a cent. Rounding every line on its own can make the allocations sum to a cent more or less than the contract. A residual-cent policy names which obligation absorbs that difference, so the allocation ties to the transaction price exactly.",
    excerpt: "A $100,000 bundle with SSPs of $30,000, $30,000 and $120,000 rounds to $100,000.01 if every line is rounded on its own. Here is where the cent comes from, which obligation should absorb it, and the policy wording that lets a reviewer re-perform the allocation.",
    toc: [
      { id: "why-does-relative-ssp-allocation-leave-a-residual-cent-", label: "Why relative SSP allocation leaves a residual cent" },
      { id: "what-does-asc-606-say-about-rounding-the-allocation-", label: "What ASC 606 says about rounding" },
      { id: "worked-example-100-000-across-three-performance-obligations", label: "Worked example: $100,000, three obligations" },
      { id: "which-obligation-should-absorb-the-residual-cent-", label: "Which obligation absorbs the cent" },
      { id: "how-does-the-residual-flow-into-the-revenue-schedule-", label: "How the residual flows into the schedule" },
      { id: "what-should-an-ssp-rounding-policy-say-", label: "What an SSP rounding policy should say" }
    ],
    faqs: [
      {
        question: "Is the residual cent the same as the residual approach in ASC 606?",
        answer: "No. The residual approach in ASC 606-10-32-34(c) is a method for estimating a standalone selling price when that price is highly variable or uncertain. The residual cent is a rounding artefact: the one-cent difference left when relative-SSP allocations are rounded to the cent and no longer sum to the transaction price."
      },
      {
        question: "Does ASC 606 prescribe a rounding method for SSP allocation?",
        answer: "The allocation guidance in ASC 606-10-32-28 through 32-41 sets the objective and the relative standalone selling price basis, but it does not specify a cent-level rounding convention. An entity chooses one, documents it, and applies it consistently so the allocation can be re-performed."
      },
      {
        question: "Which obligation absorbs the residual cent in Soluqube?",
        answer: "Soluqube rounds every obligation half-up to the cent except the one listed last, which receives the transaction price minus the sum of the others. Ratable schedules give each month the floored amount and the final month absorbs the remaining cents. If allocations or the schedule fail to tie to the transaction price, the engine rejects the result."
      }
    ],
    content: `
## Why does relative SSP allocation leave a residual cent?

Relative SSP allocation multiplies the transaction price by each obligation's share of total standalone selling price. Those shares are rarely whole cents. Round each line half-up on its own and the rounded lines can add up to one cent more, or one cent less, than the contract. That leftover cent is the residual, and it has to land somewhere.

The formula is the one in every Step 4 memo: allocation for obligation i = transaction price × SSP of i ÷ sum of all SSPs. With two obligations and round numbers, such as $120,000 split by SSPs of $100,000 and $25,000, the shares come out clean at $96,000 and $24,000. With three or more obligations, or with SSPs that do not divide evenly, they usually do not.

A one-cent residual is not material on its own. The reason to settle it is mechanical: if the allocated amounts do not sum to the transaction price, the contract liability never fully unwinds, someone books a plug, and the next reviewer has to work out where the plug came from.

---

## What does ASC 606 say about rounding the allocation?

ASC 606-10-32-28 through 32-41 set the allocation objective, require a relative standalone selling price basis, and govern how discounts and variable consideration are allocated. They do not specify how to round an allocation to the cent. That choice is left to the entity, which is why it belongs in a written, consistently applied policy.

The relevant paragraphs, for reference:

- ASC 606-10-32-28 and 32-29: the allocation objective, and the relative standalone selling price basis as the default.
- ASC 606-10-32-31 to 32-35: determining standalone selling price at contract inception and estimating it when it is not directly observable.
- ASC 606-10-32-36 to 32-38: a discount is allocated proportionately to all obligations unless the stated criteria for allocating it to only some are met.
- IFRS 15 paragraphs 73–86 and the corresponding paragraphs of Ind AS 115 carry the same allocation model.

None of these paragraphs mentions cents. Read the primary text rather than a summary when you write the policy; the point here is only that the rounding convention is an entity-level choice.

---

## Worked example: $100,000 across three performance obligations

A $100,000 contract bundles implementation (SSP $30,000), premium support (SSP $30,000) and a platform subscription (SSP $120,000). Total SSP is $180,000, so the $80,000 discount is spread proportionately. Each raw allocation ends in a repeating 6. Rounding every line half-up gives $100,000.01. Soluqube's engine allocates $16,666.67, $16,666.67 and $66,666.66, which sums to exactly $100,000.00.

Step one, round every line independently:

\`\`\`text
Transaction price                                  $100,000.00
Obligation           SSP         Share   Raw allocation      Rounded half-up
Implementation       $30,000     1/6     $16,666.666666...   $16,666.67
Premium support      $30,000     1/6     $16,666.666666...   $16,666.67
Platform subscription $120,000   2/3     $66,666.666666...   $66,666.67
Total                $180,000                                $100,000.01   (+$0.01)
\`\`\`

Step two, the same contract through the Soluqube engine (integer arithmetic at 10^6 scale, rounded to cents), obligations listed in the order above:

\`\`\`text
Implementation         $16,666.67   rounded half-up
Premium support        $16,666.67   rounded half-up
Platform subscription  $66,666.66   = $100,000.00 − $33,333.34 (absorbs the residual)
Total allocated        $100,000.00
\`\`\`

List the obligations in the opposite order (subscription first, implementation last) and the engine returns $66,666.67, $16,666.67 and $16,666.66. The total is still $100,000.00; only the obligation carrying the cent changes. That is the whole policy decision in one line, and it is why the order has to be fixed in writing.

---

## Which obligation should absorb the residual cent?

Any rule that is written down, applied consistently and re-performable will tie the allocation to the transaction price. Three are common: the last-listed obligation absorbs the difference, the largest allocation absorbs it, or the cents go to the lines with the largest fractional remainders. Pick one, record it in the SSP policy, and do not change it contract by contract.

- Last-listed absorbs (what the Soluqube engine does today): round every line half-up except the last, which receives the transaction price minus the others. Easy to re-perform; the order of obligations becomes part of the policy.
- Largest allocation absorbs: the cent lands where it is the smallest fraction of the balance. With the last-listed rule, you get this by listing the largest obligation last, as in the first ordering above.
- Largest remainder: floor every line to the cent, then hand the leftover cents to the lines with the biggest fractional parts. Arguably the most even-handed, slightly harder to re-perform by hand.

Whichever rule you choose, the answer should not depend on who ran the spreadsheet or which cell was edited last.

---

## How does the residual flow into the revenue schedule?

The allocation is only half of it. Each ratable obligation then has its own schedule, and dividing an allocation by the number of months raises the same question again. Soluqube gives every month the floored amount and lets the final month absorb the remaining cents, so each obligation's schedule sums to its allocation and the deferred balance reaches $0.00.

For the first ordering above, the engine produces:

\`\`\`text
Platform subscription   36 months   35 × $1,851.85 + $1,851.91 = $66,666.66
Premium support         36 months   35 × $462.96   + $463.07   = $16,666.67
Implementation          Month 1     $16,666.67 (point in time)
Total recognised                                               $100,000.00
Deferred balance after month 36                                $0.00
\`\`\`

The same terminal-period rule on a single $100,000, 36-month subscription gives 35 × $2,777.77 + $2,778.05. The engine also runs a reconciliation check on every contract: if the allocations or the recognised total do not equal the transaction price in integer cents, or any obligation ends with a deferred balance, it rejects the result instead of returning it. To vary the contract value and term yourself, use the simulator at https://soluqube.com/audit.

---

## What should an SSP rounding policy say?

A short paragraph in the SSP policy is enough: the unit of rounding, the rounding rule, which obligation absorbs the residual and how the obligation order is fixed, how ratable schedules handle their own remainder, and the reconciliation check performed. Written that way, a reviewer can take the inputs, re-perform the allocation and schedule, and get the same cents.

Illustrative wording, to adapt with your technical accounting reviewer:

\`\`\`text
Residual-cent policy (illustrative)
1. Allocate the transaction price on a relative SSP basis (ASC 606-10-32-29, 32-31), in integer cents.
2. Round each obligation's allocation half-up to the cent, except the obligation listed last.
3. The last-listed obligation receives the transaction price minus the sum of the others.
4. Obligations are listed so the largest ratable obligation is last.
5. Ratable schedules: each period receives the floored periodic amount; the final period absorbs the remaining cents.
6. Check: allocations and the full schedule each sum to the transaction price; the final deferred balance is $0.00.
\`\`\`

The policy covers the rounding. The judgement auditors spend their time on is the SSP itself: how it was estimated, the evidence behind it, and whether the discount was allocated proportionately. For that side, see our guide to relative SSP allocation at https://soluqube.com/blog/mastering-asc-606-standalone-selling-price-ssp-multi-element-allocations and the ASC 606 hub at https://soluqube.com/asc-606.

To run your own bundle, enter the transaction price, obligations and SSPs at https://app.soluqube.com/onboarding; you confirm the obligations and prices, and the engine returns the allocation, the full-term schedule and a hashed workpaper. Or send us your three hardest contracts for a free 3-Contract Audit-Defense Workpaper: https://soluqube.com/book-demo.
    `
  },
  {
    slug: "principal-vs-agent-asc-606-gross-vs-net-worked-example",
    title: "Principal vs Agent Under ASC 606: Gross vs Net Revenue",
    subtitle: "Principal or agent under ASC 606? The control test, the 55-39 indicators, a gross vs net worked example, SaaS and reseller cases, and a memo outline.",
    publishedAt: "October 15, 2026",
    readTime: "8 min read",
    author: {
      name: "Soluqube Editorial",
      role: "Technical Accounting Content Team",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["ASC 606", "Principal vs Agent", "Gross vs Net", "IFRS 15", "Ind AS 115"],
    targetQuery: "principal vs agent ASC 606",
    definitionAnchor: "Under ASC 606-10-55-36 to 55-40, an entity is a principal if it controls the specified good or service before it is transferred to the customer, and reports revenue gross. If its promise is only to arrange for another party to provide it, the entity is an agent and reports its fee or commission net. Gross profit is the same either way; reported revenue is not.",
    excerpt: "A $1,000 sale with a $900 supplier cost is $1,000 of revenue if you are the principal and $100 if you are the agent. Here is the control test in ASC 606-10-55-36 to 55-40, how the 55-39 indicators fit, how SaaS marketplaces and resellers apply it, and how to document a conclusion when the indicators point both ways.",
    toc: [
      { id: "what-does-principal-vs-agent-decide-under-asc-606-", label: "What principal vs agent decides" },
      { id: "how-do-you-identify-the-specified-good-or-service-", label: "Identifying the specified good or service" },
      { id: "when-does-an-entity-control-the-good-or-service-before-transfer-", label: "Control before transfer" },
      { id: "which-indicators-in-asc-606-10-55-39-support-the-assessment-", label: "The 55-39 indicators" },
      { id: "worked-example-gross-vs-net-on-a-1-000-sale-illustrative-", label: "Worked example: gross vs net" },
      { id: "how-do-saas-marketplaces-and-resellers-apply-the-guidance-", label: "SaaS, marketplace and reseller cases" },
      { id: "how-do-you-document-the-assessment-when-indicators-conflict-", label: "Documenting conflicting indicators" },
      { id: "what-are-the-ifrs-15-and-ind-as-115-equivalents-", label: "IFRS 15 and Ind AS 115 equivalents" },
      { id: "what-does-soluqube-do-once-you-have-reached-a-conclusion-", label: "Where Soluqube fits" }
    ],
    faqs: [
      {
        question: "Does principal vs agent change gross profit?",
        answer: "No. A principal reports the full consideration as revenue and the supplier cost as cost of revenue; an agent reports only its fee or commission. In both cases the amount left after paying the supplier is the same. What changes is reported revenue, the gross margin percentage and any metric calculated on revenue."
      },
      {
        question: "Are the ASC 606-10-55-39 indicators a checklist?",
        answer: "No. ASC 606-10-55-39A says the indicators may be more or less relevant depending on the facts, and that they support the control assessment rather than replace it. The question is always whether the entity controls the specified good or service before it is transferred to the customer."
      },
      {
        question: "Can one contract contain both principal and agent obligations?",
        answer: "Yes. The assessment is made for each specified good or service. A contract can include a service the entity provides itself, reported gross, and a third-party item the entity only arranges, reported net. Each conclusion is documented separately."
      },
      {
        question: "Does Soluqube decide whether we are principal or agent?",
        answer: "No. Principal versus agent is a judgement made by the entity and its technical accounting reviewers. Soluqube takes the transaction price that follows from that conclusion and allocates it across performance obligations by relative standalone selling price, then builds the full-term revenue schedule in integer cents."
      }
    ],
    content: `
## What does principal vs agent decide under ASC 606?

When another party is involved in providing goods or services to a customer, ASC 606-10-55-36 asks whether the entity's promise is to provide the specified good or service itself, making it the principal, or to arrange for the other party to provide it, making it an agent. The answer decides whether revenue is reported gross or as a net fee.

The question is not whether the entity is "the seller of record" or who issues the invoice. It is a control question, asked separately for each specified good or service in the contract. An entity can be principal for one item and agent for another under the same contract.

The guidance sits in ASC 606-10-55-36 through 55-40, as amended by ASU 2016-08. Read the primary text alongside this summary; the paragraph references below are there so you can go straight to it.

---

## How do you identify the specified good or service?

Start by naming the specified good or service from the customer's point of view: the distinct good or service, or bundle, that the customer is buying. ASC 606-10-55-36A makes this the first step. Get it wrong and the control analysis answers the wrong question, such as who controls a licence when the customer is buying a right to a service.

The unit can be a physical good, a right to a service to be performed by another party, or a combined output the entity produces by integrating several inputs. Two practical tests help:

- What would the customer say it bought? A seat on a flight, an app licence, a managed service, a delivered report.
- What does the contract make the entity responsible for? Read the fulfilment, acceptance, refund and support clauses, not only the pricing schedule.

Write the specified good or service down in one sentence before moving on. Every later step refers back to it.

---

## When does an entity control the good or service before transfer?

An entity is a principal if it controls the specified good or service before transfer to the customer (ASC 606-10-55-37). Under 55-37A, it does so when it obtains a good or asset from the other party and transfers it, obtains a right to a service the other party performs, or integrates the other party's input into a combined output.

Control has its ordinary ASC 606 meaning: the ability to direct the use of, and obtain substantially all of the remaining benefits from, the good or service. Momentary legal title passing through the entity's hands is not enough on its own.

If the entity does not control the specified good or service before transfer, its performance obligation is to arrange for the other party to provide it, and it is an agent (ASC 606-10-55-38). Its revenue is the fee or commission it expects to be entitled to, which may be the net amount it keeps after paying the other party. ASC 606-10-55-40 adds that if another entity assumes the performance obligation so the entity is no longer obliged to provide it, the entity does not recognise revenue for that obligation and instead considers whether it acted as an agent.

---

## Which indicators in ASC 606-10-55-39 support the assessment?

ASC 606-10-55-39 lists three indicators that an entity controls the specified good or service before transfer: it is primarily responsible for fulfilling the promise, it has inventory risk before or after transfer, and it has discretion in establishing the price. They are evidence for the control assessment, not a scorecard; 55-39A says their relevance depends on the facts.

- Primary responsibility: who the customer looks to for fulfilment and for acceptability of the good or service, including who handles defects, refunds and support.
- Inventory risk: whether the entity bears the risk of holding the good or committing to the service before a customer contract exists, or bears it after transfer through returns.
- Pricing discretion: whether the entity sets the price the customer pays. An agent can sometimes set its own commission, so pricing discretion is weaker evidence when the margin is fixed by the other party.

ASU 2016-08 removed two older indicators, credit risk and the form of consideration being a commission. Collecting the cash and bearing the credit loss does not, on its own, make an entity the principal.

---

## Worked example: gross vs net on a $1,000 sale (illustrative)

Illustrative round numbers, not from a real contract. A platform sells an item to a customer for $1,000 and pays the supplier $900. As principal it reports $1,000 of revenue and $900 of cost of revenue. As agent it reports $100 of net revenue. Gross profit is $100 either way; the revenue line and margin percentage change.

\`\`\`text
Illustrative only: round numbers, one sale
                         Principal (gross)   Agent (net)
Revenue                  $1,000              $100
Cost of revenue          ($900)              $0
Gross profit             $100                $100
Gross margin             10%                 100%
\`\`\`

Scale the same illustrative sale to 1,000 transactions in a quarter and the reported revenue is $1,000,000 as principal or $100,000 as agent, with $100,000 of gross profit in both cases. That is why the conclusion matters to anyone reading revenue growth, revenue multiples or revenue-based covenants, even though profit does not move.

Timing can also differ. A principal recognises revenue when it transfers the good or service to the customer. An agent recognises its fee when it satisfies its own promise to arrange the transfer, which in some arrangements is earlier, for example when the order is placed with the supplier.

---

## How do SaaS marketplaces and resellers apply the guidance?

The same control test applies, but the facts differ. A marketplace listing third-party apps that the developer delivers, supports and prices often points to agent. A SaaS company integrating a third-party service into the product it is responsible for often points to principal. Resellers sit in between and depend on who fulfils, who prices and who bears unsold-capacity risk.

Patterns that come up often, each still a facts-and-circumstances call:

- App or integration marketplace: the developer hosts the app, handles support and sets the list price; the platform collects payment and keeps a percentage. The indicators tend to point to agent, with revenue reported as the platform fee.
- SaaS product with embedded third-party inputs: a data feed, messaging delivery or cloud hosting that the SaaS company combines into the service it sells and is responsible for. Under 55-37A the entity may control a combined output, which tends to point to principal and gross presentation.
- Pass-through usage charges: third-party costs re-billed at or near cost. Ask whether the customer sees them as a separate specified service and who is responsible if delivery fails before deciding gross or net.
- Software licence or cloud capacity reseller: committing to capacity up front, setting customer prices and being the first line of support point towards principal; vendor-delivered keys, vendor support and a fixed margin with no unsold stock point towards agent.

Payment collection, invoicing in the entity's own name and bearing credit risk do not settle any of these on their own.

---

## How do you document the assessment when indicators conflict?

When indicators point both ways, the memo should go back to the control question for the specified good or service, explain which facts carry the most weight and why, and tie each fact to a contract term. A reviewer should be able to follow the reasoning from the contract to the conclusion without asking for a meeting.

A structure that keeps the reasoning re-traceable, to adapt with your technical accounting reviewer:

\`\`\`text
Principal vs agent memo (illustrative outline)
1. Arrangement: parties, contract references, the goods or services involved.
2. Specified good or service (ASC 606-10-55-36A), in one sentence.
3. Control before transfer (55-37, 55-37A): which route, if any, gives control.
4. Indicators (55-39): for each, the facts, the clause, and whether it supports principal, agent or neither.
5. Weighting: where indicators conflict, why some facts carry more weight (55-39A).
6. Conclusion: principal or agent, gross or net, and the transaction price that follows.
7. Presentation and disclosure: revenue line, and the 606-10-50-12(c) disclosure if acting as agent.
8. Consistency: similar contracts this conclusion applies to, and what change in terms would trigger a reassessment.
\`\`\`

ASC 606-10-50-12(c) requires disclosure of performance obligations to arrange for another party to transfer goods or services, so an agent conclusion also feeds the notes. Auditors document their own evaluation under PCAOB AS 1215; a memo that cites contract clauses gives them something specific to test.

---

## What are the IFRS 15 and Ind AS 115 equivalents?

IFRS 15 covers principal versus agent in paragraphs B34 to B38, aligned with ASC 606 through the IASB's April 2016 clarifications, which were issued alongside ASU 2016-08. Ind AS 115 carries the same Appendix B paragraphs. The control principle, the three indicators and the gross versus net outcome are the same under all three standards.

\`\`\`text
Topic                                      ASC 606           IFRS 15 / Ind AS 115
Nature of the promise                      606-10-55-36      B34
Identify the specified good or service     606-10-55-36A     B34A
Principal controls before transfer         606-10-55-37      B35
Ways a principal obtains control           606-10-55-37A     B35A
Agent: fee or commission                   606-10-55-38      B36
Indicators of control                      606-10-55-39      B37
Relevance of indicators                    606-10-55-39A     B37A
Another party assumes the obligation       606-10-55-40      B38
\`\`\`

For Indian entities there is a related but separate point: amounts collected on behalf of third parties, such as GST, are excluded from the transaction price under the Ind AS 115 definition of transaction price. That is not a principal versus agent conclusion, but it is another reason the invoice total and reported revenue differ.

---

## What does Soluqube do once you have reached a conclusion?

Soluqube does not decide whether you are principal or agent; that judgement belongs to the entity and its reviewers. Once it is made, you enter the transaction price that follows from it, gross consideration or your net fee, and the engine allocates it across performance obligations by relative standalone selling price and builds the full-term schedule.

The allocation and schedule run in integer arithmetic, rounded to cents, with a written residual-cent rule and the final period absorbing the remainder so each obligation's deferred balance reaches $0.00. Each obligation carries the page and excerpt of the clause it came from, and exports are SHA-256 hashed so a reviewer can confirm the file has not changed. For how the residual cent is handled, see https://soluqube.com/blog/ssp-allocation-rounding-residual-cent-asc-606, and for the wider standard, the ASC 606 hub at https://soluqube.com/asc-606.

To try it on a sample contract, open https://app.soluqube.com/. Finance teams who want to run their own contracts with us for 60 days can apply to the design partner program at https://soluqube.com/design-partners.
    `
  }
];
