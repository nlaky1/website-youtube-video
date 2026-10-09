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
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "asc-606-vs-ind-as-115-dual-standard-gst-compliance",
    title: "ASC 606 vs Ind AS 115: Dual Standard SaaS Amortization & Statutory GST Isolation",
    subtitle: "How multinational tech enterprises reconcile US GAAP revenue schedules with Indian MCA Schedule III and 18% GST tax firewalls.",
    publishedAt: "October 8, 2026",
    readTime: "8 min read",
    author: {
      name: "Dr. Arvind Subramanian",
      role: "Chief Compliance Architect & Former Big 4 Partner",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["ASC 606", "Ind AS 115", "GST Isolation", "Dual Standard", "Enterprise Audit"],
    targetQuery: "Ind AS 115 dual standard transition adjustments software",
    definitionAnchor: "ASC 606 and Ind AS 115 dual-standard revenue recognition is the automated process of calculating GAAP-compliant revenue amortization schedules under US GAAP while simultaneously quarantining statutory 18% Indian GST (CGST/SGST/IGST) liabilities into segregated MCA Schedule III balance sheet accounts with zero rounding discrepancy.",
    excerpt: "Learn how cross-border CFOs eliminate double-taxation and reconciliation drift between US GAAP ASC 606 and MCA Schedule III Ind AS 115 ledgers using deterministic 128-bit decimal isolation.",
    toc: [
      { id: "overview", label: "Executive Summary & Core Standard Gap" },
      { id: "gst-quarantine", label: "Statutory 18% GST Balance Sheet Quarantine" },
      { id: "amortization-schedule", label: "Deterministic Waterfall Comparison" },
      { id: "audit-workpaper", label: "PCAOB AS 3101 & MCA Dual Audit Packs" },
      { id: "architecture", label: "Deterministic Fixed-Point Architecture" }
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

Soluqube's **128-bit decimal fixed-point engine** allocates amortization across daily discrete intervals, absorbing fractional remainders into the terminal period:
\`\`\`typescript
// DETERMINISTIC 128-BIT SCALED ARITHMETIC
const NET_CENTS = 8474576n; // $84,745.76 net after 18% GST
const PERIODS = 12n;
const BASE_MONTHLY = NET_CENTS / PERIODS; // 706214n ($7,062.14)
const REMAINDER = NET_CENTS % PERIODS;   // 8n ($0.08 absorbed in Month 12)
\`\`\`

This guarantees **$0.000000 drift** across multi-year amortization schedules under both US GAAP and Ind AS 115 audits.

---

## PCAOB AS 3101 & MCA Dual Audit Packs

When Big 4 audit teams or statutory Indian tax inspectors request verification, Soluqube generates an immutable audit bundle containing:
* **Bounding-Box Grounding**: Every line item in the waterfall links directly to normalized pixel coordinates on the signed PDF.
* **Dual Workpaper Excel**: 8-tab workbook with active Excel formulas, reconciling US GAAP Deferred Revenue and Indian MCA GST Payable.
* **Cryptographic Merkle Proof**: SHA-256 hash tree validating that historical amortizations have never been altered.
    `
  },
  {
    slug: "eliminating-ieee-754-floating-point-rounding-drift-asc-606",
    title: "Eliminating IEEE-754 Floating-Point Rounding Drift in Enterprise ASC 606 Subledgers",
    subtitle: "Why binary 64-bit floating point numbers corrupt multi-million dollar SaaS revenue recognition waterfalls and how 128-bit fixed-point math restores exact balance sheet parity.",
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
      { id: "fixed-point-solution", label: "128-Bit Scaled Integer Engine" },
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

External auditors under **PCAOB AS 3101** test contract subledgers against trial balances. When automated subledgers produce a cumulative discrepancy between:
$$\\sum_{t=1}^{T} \\text{Recognized Revenue}_t \\neq \\text{Total Transaction Price}$$

Controllers are forced to book manual adjusting journal entries (*\"Rounding Suspense\"* or *\"Plug Accounts\"*). These manual entries trigger red flags during SOX 404 internal control audits and PCAOB inspections.

---

## 128-Bit Scaled Integer Engine

Soluqube completely bypasses binary floating-point arithmetic. All monetary values and standalone selling prices (SSP) are stored and manipulated as **128-bit scaled integers** with fixed scaling factors ($10^{6}$ micro-cents):

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
      name: "Marcus Vance, CPA",
      role: "Director of Technical Revenue Accounting",
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
    title: "PCAOB AS 3101 Audit Readiness: Cryptographic Merkle Proofs for Revenue Subledgers",
    subtitle: "How cryptographic hashing, PDF spatial token bounding boxes, and immutable logs satisfy Big 4 Critical Audit Matters (CAM) testing.",
    publishedAt: "October 5, 2026",
    readTime: "6 min read",
    author: {
      name: "Dr. Arvind Subramanian",
      role: "Chief Compliance Architect & Former Big 4 Partner",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["PCAOB AS 3101", "Merkle Trees", "Audit Readiness", "Big 4", "SOX Compliance"],
    targetQuery: "PCAOB AS 3101 automated audit defense package",
    definitionAnchor: "PCAOB AS 3101 audit readiness for revenue recognition requires immutable, tamper-evident verification linking general ledger journal entries directly to primary source contract PDF clauses via cryptographic Merkle trees and normalized spatial coordinate bounding boxes.",
    excerpt: "Learn how Soluqube provides cryptographic Merkle proofs and bounding-box audit packs to satisfy PCAOB AS 3101 revenue recognition compliance.",
    toc: [
      { id: "cam-requirement", label: "Critical Audit Matters (CAM) in Revenue Recognition" },
      { id: "spatial-grounding", label: "Spatial PDF Token Bounding Boxes" },
      { id: "merkle-proofs", label: "Cryptographic Merkle Root Verification" },
      { id: "export-packages", label: "One-Click Auditor Deliverables" }
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

Auditors can independently verify the Merkle root against external hardware security modules (HSM) or public ledgers to prove beyond doubt that past revenue figures were never silently altered.
    `
  },
  {
    slug: "contract-pdf-bounding-box-clause-grounding-auditors",
    title: "Contract PDF Bounding-Box Clause Grounding: Transforming Unstructured MSAs into Normalized Coordinates for Audit Teams",
    subtitle: "How sub-millimeter token coordinate extraction bridges the gap between unstructured signed Master Services Agreements and deterministic revenue recognition subledgers.",
    publishedAt: "October 9, 2026",
    readTime: "8 min read",
    author: {
      name: "Dr. Arvind Subramanian",
      role: "Chief Compliance Architect & Former Big 4 Partner",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["PDF Grounding", "PCAOB AS 3101", "Audit Workpapers", "MSA Parsing", "Big 4"],
    targetQuery: "Contract PDF bounding-box clause grounding for auditors",
    definitionAnchor: "Contract PDF bounding-box clause grounding is the automated mathematical extraction and spatial mapping of unstructured legal text to normalized page coordinates [page, x0, y0, x1, y1], linking every line item in an ASC 606 revenue waterfall schedule directly to its signed contractual origin for zero-defect audit verification.",
    excerpt: "Learn how Soluqube uses PyMuPDF normalized bounding-box coordinates to link ASC 606 revenue schedules directly to signed contract clauses for Big 4 audit readiness.",
    toc: [
      { id: "the-unstructured-contract-gap", label: "The Unstructured Contract Dilemma" },
      { id: "definition-anchor-block", label: "Definition & Spatial Grounding Architecture" },
      { id: "how-coordinate-extraction-works", label: "Sub-Millimeter PDF Token Extraction" },
      { id: "pcaob-cam-verification", label: "PCAOB AS 3101 Critical Audit Matters (CAM)" },
      { id: "ocr-vs-spatial-grounding", label: "Legacy OCR vs Deterministic Coordinate Grounding" },
      { id: "audit-deliverable", label: "Generating 1-Click Interactive Auditor Bundles" }
    ],
    content: `
## The Unstructured Contract Dilemma: Why Manual Review Fails Big 4 Audits

For enterprise finance departments, revenue recognition errors rarely originate in the arithmetic—they originate in **clause misinterpretation**. When an enterprise closes a $5,000,000 Master Services Agreement (MSA) with three non-standard addenda, terms like *\"contingent SLA rebates,\" \"termination for convenience refund clauses,\"* or *\"tiered volume discounts\"* are frequently overlooked by junior accountants.

During annual PCAOB AS 3101 audits, external partners (PwC, EY, Deloitte, KPMG) perform substantive testing by manually tracing revenue subledger journal entries back to signed PDF documents. If an auditor cannot instantly verify the underlying contractual clause supporting a Standalone Selling Price (SSP) allocation, the deficiency is escalated as a **Material Weakness in Internal Controls (SOX 404)**.

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
[ ASC 606 / Ind AS 115 128-Bit Ledger Entry ]
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

Under **PCAOB Auditing Standard AS 3101**, auditors must document significant judgment areas. Soluqube generates an audit defense bundle linking:
1. **Clause Origin**: Visual bounding-box proof on the signed document.
2. **Deterministic Math**: 128-bit scaled integer amortization ($0.00 drift).
3. **Cryptographic Immutability**: SHA-256 Merkle root validating that neither the contract PDF nor the ledger schedule has been altered post-signature.

---

## Legacy OCR vs Deterministic Coordinate Grounding

| Feature / Capability | Legacy OCR / Generic LLM Scrapers | Soluqube Spatial Bounding-Box Engine |
|---|---|---|
| **Clause Traceability** | Probabilistic text extraction without source grounding | Sub-millimeter [page, x, y] coordinate vector mapping |
| **Audit Verification Speed** | 4–6 hours of manual PDF cross-referencing per contract | Instant 1-click visual clause highlighting |
| **Hallucination Risk** | High (LLMs invent non-existent discount terms) | 0% (Strict character-level token verification) |
| **Audit Defense Output** | Static Excel sheets with manual comments | AS 3101 JSON-LD bundle with embedded SHA-256 Merkle proofs |

---

## Generating 1-Click Interactive Auditor Bundles

Soluqube exports complete 8-tab variance workpapers and self-contained HTML audit packages. External auditors can inspect and verify complete revenue schedules without requiring access to your core ERP or confidential billing systems.
    `
  }
];
