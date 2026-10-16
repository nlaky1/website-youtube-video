export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  publishedAt: string;
  /** Last material content update, same format as publishedAt (feeds dateModified). */
  updatedAt?: string;
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
    title: "ASC 606 vs Ind AS 115: Dual Reporting and GST Isolation",
    subtitle: "How US-India SaaS groups keep ASC 606 schedules and Ind AS 115 books in step, and keep 18% GST out of the transaction price on INR contracts.",
    publishedAt: "October 8, 2026",
    updatedAt: "October 15, 2026",
    readTime: "8 min read",
    author: {
      name: "Soluqube Editorial",
      role: "Technical Accounting Content",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["ASC 606", "Ind AS 115", "GST Isolation", "Dual Standard", "External Audit"],
    targetQuery: "Ind AS 115 dual standard GST revenue recognition",
    definitionAnchor: "Dual-standard revenue recognition means running one contract through ASC 606 for US GAAP reporting and Ind AS 115 for Indian statutory books. The five-step model is the same. The practical difference is tax and presentation: on an INR contract, 18% GST is collected for the government, so it is excluded from the transaction price and booked as a liability before revenue is allocated.",
    excerpt: "The five-step model is shared, but an INR invoice that includes 18% GST is not all revenue. How to split gross billing into net consideration and GST, schedule the net amount in integer arithmetic, and keep both sets of books tied out.",
    toc: [
      { id: "where-do-asc-606-and-ind-as-115-differ-in-practice", label: "Where the two standards differ" },
      { id: "how-is-18-gst-kept-out-of-revenue", label: "Keeping 18% GST out of revenue" },
      { id: "a-worked-schedule-in-integer-paise", label: "A worked schedule in integer paise" },
      { id: "what-evidence-supports-both-audits", label: "Evidence for both audits" }
    ],
    faqs: [
      {
        question: "How does Ind AS 115 treat 18% GST differently from ASC 606?",
        answer: "In principle it does not: Ind AS 115 excludes amounts collected on behalf of third parties from the transaction price, and ASC 606-10-32-2A lets an entity elect to exclude sales taxes. In practice GST on an INR invoice is 18%, so the split between net consideration and GST liability has to be made before allocation. For INR contracts Soluqube books GST to a liability and allocates only the net consideration."
      },
      {
        question: "Why do some ERP set-ups get Indian GST wrong in revenue schedules?",
        answer: "When revenue schedules are built from gross invoice totals, GST is spread into revenue and later reversed by hand. That overstates deferred revenue, distorts the relative SSP allocation, and leaves reconciling items between the GST ledger and the revenue subledger."
      },
      {
        question: "How does Soluqube keep the two sets of books reconciled?",
        answer: "For INR contracts the engine splits gross consideration into net consideration and GST in integer arithmetic, allocates the net amount by relative SSP, and builds the schedule with the final period absorbing the remainder. The revenue schedule ties to net consideration and the GST liability ties to the invoices. US contracts carry no GST."
      }
    ],
    content: `
## Where do ASC 606 and Ind AS 115 differ in practice?

**ASC 606** and **Ind AS 115** share the same five-step model; Ind AS 115 is converged with IFRS 15. For a US-India SaaS group the day-to-day differences are tax and presentation, not the recognition model. The [ASC 606 vs Ind AS 115 hub](/asc-606-vs-ind-as-115) summarises them; this article walks through the GST mechanics.

On an INR contract the invoice usually includes **18% Goods and Services Tax (GST)**. GST is collected on behalf of the government, so it is not consideration the entity is entitled to. Ind AS 115 excludes amounts collected on behalf of third parties from the transaction price, and ASC 606-10-32-2A allows an entity to elect to exclude sales taxes. Either way, gross billing is split before allocation:

\`\`\`text
Net consideration = Gross invoice / 1.18
GST liability     = Gross invoice - Net consideration
\`\`\`

If revenue is scheduled from the gross invoice, both revenue and deferred revenue are overstated and the [relative SSP allocation](/blog/mastering-asc-606-standalone-selling-price-ssp-multi-element-allocations) is computed on the wrong base.

---

## How is 18% GST kept out of revenue?

The split happens once, when the contract is set up, and each ledger then works from its own figure:

\`\`\`
                       [ Signed contract (INR) ]
                                   |
              +--------------------+--------------------+
              |                                         |
   [ Revenue subledger ]                      [ GST liability ]
              |                                         |
   - Net consideration only                  - CGST + SGST, or IGST
   - Relative SSP allocation                 - Settled with the GST return
   - Full-term schedule                      - Not revenue
\`\`\`

Which GST applies depends on the place of supply:

1. **Intra-state supply (CGST 9% + SGST 9%)**: supplier and place of supply in the same state, for example Karnataka to Karnataka.
2. **Inter-state supply (IGST 18%)**: place of supply in another state, for example Maharashtra to Karnataka.
3. **Export of services under a Letter of Undertaking (LUT)**: zero-rated, so no GST is charged.

US contracts carry no GST, so the split applies to INR contracts only.

---

## A worked schedule in integer paise

Take a ₹1,00,000 invoice that includes GST. Net consideration is ₹84,745.76 and GST is ₹15,254.24. Schedule the net amount over 12 months and round each month to the paisa on its own: ₹7,062.15 × 12 = ₹84,745.80, four paise more than the contract. Small, but the deferred balance never reaches zero and someone books a plug.

Soluqube computes in integer arithmetic (10^6 scale, rounded to the cent or paisa), floors each period and lets the final period absorb the remainder:

\`\`\`typescript
// Integer arithmetic, amounts in paise
const NET = 8474576n;            // ₹84,745.76 net of 18% GST
const PERIODS = 12n;
const BASE = NET / PERIODS;      // 706214n -> ₹7,062.14 a month
const LAST = NET - BASE * 11n;   // 706222n -> ₹7,062.22 in month 12
\`\`\`

The twelve months sum to ₹84,745.76 exactly and the deferred balance ends at ₹0.00. The same rule applies to the allocation across obligations; the [residual-cent policy guide](/blog/ssp-allocation-rounding-residual-cent-asc-606) shows how to write it down.

---

## What evidence supports both audits?

When the external auditor or the statutory auditor asks how a figure was reached, the package should let them re-perform it:

* **Clause evidence (page + excerpt)** for each performance obligation, so price and term trace to the signed contract.
* **An Excel workpaper** showing net consideration, the GST liability, the allocation and the month-by-month schedule.
* **SHA-256 hashes** on the export, with a Merkle root computed on it, so a re-run can be compared with the file that was delivered.

For the wider differences between the standards, see the [Ind AS 115 vs ASC 606 dual-GAAP guide](/blog/ind-as-115-vs-asc-606-cross-border-dual-gaap-guide). To run your own INR contracts with us for 60 days, apply to the [design partner program](/design-partners).
    `
  },
  {
    slug: "eliminating-ieee-754-floating-point-rounding-drift-asc-606",
    title: "Floating Point vs Integer Cents in ASC 606 Schedules",
    subtitle: "What binary floating point does to revenue schedules, why the rounding rule matters more, and how integer arithmetic makes a schedule re-performable.",
    publishedAt: "October 7, 2026",
    updatedAt: "October 15, 2026",
    readTime: "6 min read",
    author: {
      name: "Soluqube Editorial",
      role: "Technical Accounting Content",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["ASC 606", "Rounding Policy", "Revenue Schedules", "Integer Arithmetic"],
    targetQuery: "ASC 606 revenue schedule rounding integer arithmetic",
    definitionAnchor: "Integer-cent scheduling stores money as whole units instead of binary floating point and applies a written rounding rule, such as letting the final period absorb the remainder. Floating point adds tiny representation error; the bigger source of unexplained cents is rounding each period on its own. Integer arithmetic plus a written rule makes a schedule tie to the contract and re-perform identically.",
    excerpt: "0.1 + 0.2 is not exactly 0.3 in binary floating point, but that is rarely why a revenue schedule is a few cents off. Where the cents really come from, and how integer arithmetic with a terminal-period rule settles them.",
    toc: [
      { id: "what-does-binary-floating-point-do-to-money", label: "What floating point does to money" },
      { id: "where-do-the-unexplained-cents-really-come-from", label: "Where the cents really come from" },
      { id: "how-do-integer-arithmetic-and-a-terminal-period-rule-fix-it", label: "Integer arithmetic and a terminal-period rule" },
      { id: "what-does-this-prove-and-what-not", label: "What this does and does not prove" }
    ],
    content: `
## What does binary floating point do to money?

Most software stores numbers as 64-bit binary floating point (\`double\` in most languages, \`number\` in JavaScript). Decimal fractions such as \`0.1\` or \`0.01\` have no exact binary representation:

\`\`\`javascript
0.1 + 0.2 === 0.30000000000000004 // true
\`\`\`

The error is tiny, around one part in 10^16, far below a cent on any realistic contract. On its own it rarely changes a figure once it is rounded to the cent. It matters when results are compared for exact equality, or when many unrounded values are accumulated and only rounded at the end.

---

## Where do the unexplained cents really come from?

From the rounding rule. $100,000 over 36 months is $2,777.777... a month. Round every month to $2,777.78 and the schedule recognises $100,000.08; round every month down and it recognises $99,999.72. That happens with decimal arithmetic too: it is a policy question, not a hardware one.

A few cents are far below materiality, and auditors spend their time on SSP judgement, modifications and cutoff rather than pennies. The reason to settle the cents is mechanical: if the schedule does not sum to the contract, the deferred balance never reaches zero, someone books a plug, and the next reviewer has to explain it. The [residual-cent guide](/blog/ssp-allocation-rounding-residual-cent-asc-606) covers the same question for the SSP allocation itself.

---

## How do integer arithmetic and a terminal-period rule fix it?

Store amounts as integers at a fixed scale, floor each period to the cent, and let the final period absorb whatever is left. Soluqube works at 10^6 units per dollar and rounds to cents:

\`\`\`typescript
const SCALE = 1_000_000n;            // 10^6 units per dollar
const CENT = SCALE / 100n;
const total = 100_000n * SCALE;      // $100,000.00
const months = 36n;

const monthly = (total / months / CENT) * CENT;  // floor to the cent: $2,777.77
const last = total - monthly * (months - 1n);    // final month: $2,778.05
// 35 x $2,777.77 + $2,778.05 = $100,000.00
\`\`\`

Every run with the same inputs gives the same cents, so a reviewer can re-perform the schedule. Try different values and terms in the [schedule simulator](/audit).

---

## What does this prove, and what not?

It proves the schedule ties to the contract value and that the result is reproducible. It does not prove the accounting judgements are right: whether the obligations are distinct, whether the standalone selling prices are supportable, or how a modification should be treated. Those are where audit time goes; see the [SSP allocation example](/blog/mastering-asc-606-standalone-selling-price-ssp-multi-element-allocations) and the [ASC 606 hub](/asc-606).
    `
  },
  {
    slug: "contract-modification-precedence-dag-asc-606-10-25-13",
    title: "ASC 606-10-25-13 Contract Modifications: Decision Tree",
    subtitle: "How ASC 606-10-25-10 to 25-13 sort a SaaS amendment into a separate contract, a prospective change or a cumulative catch-up. Guidance, not automation.",
    publishedAt: "October 6, 2026",
    updatedAt: "October 15, 2026",
    readTime: "9 min read",
    author: {
      name: "Soluqube Editorial",
      role: "Technical Accounting Content",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["ASC 606-10-25", "Contract Modifications", "SaaS Accounting", "Decision Tree"],
    targetQuery: "ASC 606-10-25-13 contract modification decision tree",
    definitionAnchor: "Under ASC 606-10-25-12, a contract modification is a separate contract if it adds distinct goods or services priced at their standalone selling price. Otherwise ASC 606-10-25-13 applies: account for it prospectively when the remaining goods or services are distinct from those already transferred, or by cumulative catch-up when they constitute part of a single, partially satisfied performance obligation.",
    excerpt: "Seat expansions, early renewals and scope changes all raise the same question: separate contract, prospective, or cumulative catch-up? A decision tree for ASC 606-10-25-10 to 25-13 with three SaaS examples. This is accounting guidance; Soluqube does not automate modifications yet.",
    toc: [
      { id: "what-counts-as-a-contract-modification", label: "What counts as a modification" },
      { id: "when-is-a-modification-a-separate-contract", label: "When it is a separate contract (25-12)" },
      { id: "the-decision-tree", label: "The decision tree" },
      { id: "how-do-prospective-treatment-and-cumulative-catch-up-differ", label: "Prospective vs cumulative catch-up (25-13)" },
      { id: "three-saas-examples-illustrative", label: "Three SaaS examples" },
      { id: "what-does-soluqube-do-today", label: "What Soluqube does today" }
    ],
    faqs: [
      {
        question: "How does ASC 606 classify a contract modification?",
        answer: "First ask whether it is a separate contract under ASC 606-10-25-12: the added goods or services are distinct and priced at their standalone selling price. If not, 25-13 applies: account for it prospectively, as a termination of the old contract and creation of a new one, when the remaining goods or services are distinct from those already transferred; or as a cumulative catch-up when they are part of a single, partially satisfied performance obligation. A mix of both is possible."
      },
      {
        question: "Is a SaaS seat upsell usually a separate contract?",
        answer: "Often, when the added seats are distinct and priced at their standalone selling price, adjusted for the circumstances of the contract. If the price carries a discount that those adjustments do not explain, the upsell usually fails 25-12 and, because the remaining subscription months are distinct, is accounted for prospectively under 25-13(a)."
      },
      {
        question: "Does Soluqube automate contract modification accounting?",
        answer: "Not yet. Modification accounting (prospective treatment and cumulative catch-up) is on the Soluqube roadmap. Today your team assesses the modification under ASC 606-10-25-10 to 25-13, and Soluqube produces the relative-SSP allocation and full-term schedule for the contract terms you confirm."
      }
    ],
    content: `
## What counts as a contract modification?

A contract modification is a change in the scope or price, or both, that the parties approve (ASC 606-10-25-10). Approval can be written, oral or implied by customary business practice. Under 25-11, a modification can exist before the price is settled: if the parties have approved a change in scope but not the price, estimate the change in transaction price using the variable consideration guidance.

In SaaS the common cases are added seats or usage, a tier upgrade, an early renewal or term extension, a price concession, and added professional services. Each one needs the same analysis, and the conclusion should be written down; a reviewer will ask for it.

---

## When is a modification a separate contract?

ASC 606-10-25-12 treats a modification as a separate contract when both conditions hold:

1. The scope increases because **distinct** goods or services are added.
2. The price increases by an amount that reflects the entity's **standalone selling prices** of the added goods or services, with appropriate adjustments for the circumstances of the contract (for example, a discount because the entity avoids selling costs it would incur for a new customer).

If both are met, the original contract is left alone and the modification is accounted for on its own. If either fails, go to 25-13. The SSP evidence matters here as much as in the original allocation; see the [SSP allocation example](/blog/mastering-asc-606-standalone-selling-price-ssp-multi-element-allocations).

---

## The decision tree

\`\`\`
              [ Modification approved (25-10, 25-11) ]
                                 |
     [ Adds distinct goods or services, priced at SSP? (25-12) ]
                    /                          \\
                  YES                           NO
                   |                             |
       [ Separate contract ]     [ Are the remaining goods or services distinct
                                   from those already transferred? (25-13) ]
                                        /                        \\
                                      YES                         NO
                                       |                           |
                     [ Prospective: terminate the      [ Cumulative catch-up on the
                       old contract, create a new        single, partially satisfied
                       one (25-13a) ]                    performance obligation (25-13b) ]
\`\`\`

If the remaining promises are a mix of both, apply each treatment to the relevant part (25-13c).

---

## How do prospective treatment and cumulative catch-up differ?

* **Prospective (25-13a)**: the modification is treated as the end of the old contract and the start of a new one. The amount allocated to the remaining performance obligations is the consideration promised by the customer that was included in the transaction price but not yet recognised as revenue, plus the consideration promised in the modification. Revenue already recognised is not adjusted.
* **Cumulative catch-up (25-13b)**: the transaction price and the measure of progress for the single performance obligation are updated, and the effect is recorded as an adjustment to revenue at the date of the modification, up or down.

SaaS subscriptions are usually a series of distinct monthly service periods (ASC 606-10-25-14(b)), so most subscription modifications that fail 25-12 are accounted for prospectively. Catch-up is more common on implementation or customisation work measured over time as one performance obligation.

---

## Three SaaS examples (illustrative)

Round numbers, not from a real contract.

**1. Seat upsell at list price: separate contract.** A 12-month subscription for 100 seats at $1,200 a seat per year ($120,000). In month 7 the customer adds 20 seats for the remaining 6 months at $600 a seat ($12,000), which matches the current price for a half-year. The seats are distinct and priced at SSP, so the $12,000 is a separate contract recognised at $2,000 a month over months 7 to 12. The original schedule is unchanged.

**2. Discounted early renewal: prospective.** Same contract. In month 7 the customer extends by 12 months for $96,000, below the $120,000 standalone price, and the discount is not explained by contract-specific adjustments. The added months are distinct but not priced at SSP, so 25-12 fails. The remaining months are distinct from those already delivered, so 25-13(a) applies: $60,000 not yet recognised plus $96,000 = $156,000 over the remaining 18 months. In integer cents that is 17 × $8,666.66 + $8,666.78.

**3. Added scope on an implementation project: cumulative catch-up.** A $100,000 implementation is one performance obligation measured by cost incurred. At the modification, $32,000 of an estimated $80,000 cost has been incurred (40%), so $40,000 of revenue has been recognised. The customer adds integrated work that is not distinct, for $20,000, and the total cost estimate rises to $100,000. Progress is now 32%, so cumulative revenue should be 32% of $120,000 = $38,400. The catch-up is a $1,600 reduction of revenue in the period of the modification.

---

## What does Soluqube do today?

**Soluqube does not automate contract-modification accounting yet.** Prospective treatment and cumulative catch-up are on the roadmap. Today the assessment above stays with your team and your technical accounting reviewers.

What Soluqube does: for the contract terms you confirm, it produces the relative-SSP allocation and the full-term schedule in integer arithmetic, with clause evidence (page + excerpt) per obligation and a hashed workpaper. Example 2 above, once you have decided it is prospective, is a new allocation and schedule over the remaining term, which the engine can produce.

For related judgements, see [principal vs agent under ASC 606](/blog/principal-vs-agent-asc-606-gross-vs-net-worked-example) and the [ASC 606 hub](/asc-606). If modifications are your hardest audit area, tell us which pattern bites you most through the [design partner program](/design-partners).
    `
  },
  {
    slug: "pcaob-as-3101-audit-workpapers-merkle-proofs",
    title: "Revenue Audit Evidence: Hashes and Merkle Roots Explained",
    subtitle: "What external auditors test on revenue, and how SHA-256 hashes and a Merkle root on an export let a reviewer confirm a schedule has not changed.",
    publishedAt: "October 5, 2026",
    updatedAt: "October 15, 2026",
    readTime: "6 min read",
    author: {
      name: "Soluqube Editorial",
      role: "Technical Accounting Content",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["Audit Evidence", "Merkle Trees", "External Audit", "Revenue Recognition"],
    targetQuery: "audit-ready evidence package revenue recognition",
    definitionAnchor: "Audit-ready revenue evidence is a package an external auditor can re-perform: the contract terms behind each obligation, the SSP inputs, the allocation and the full schedule, plus a hash of the exported file. A SHA-256 hash, or a Merkle root over the rows, lets a reviewer confirm the file they tested is the file delivered. It does not prove the accounting judgements are right.",
    excerpt: "Revenue is often a critical audit matter. What auditors actually test, and what a SHA-256 hash or a Merkle root on a workpaper does, and does not, prove.",
    toc: [
      { id: "what-do-auditors-test-on-revenue", label: "What auditors test on revenue" },
      { id: "clause-evidence-per-obligation", label: "Clause evidence per obligation" },
      { id: "what-do-hashes-and-merkle-roots-add", label: "Hashes and Merkle roots" },
      { id: "what-goes-in-the-package", label: "What goes in the package" }
    ],
    faqs: [
      {
        question: "Why is revenue recognition often a critical audit matter?",
        answer: "Critical audit matters are communicated in the auditor's report for public companies. Revenue often qualifies because it involves significant management judgement, such as identifying performance obligations, estimating standalone selling prices and variable consideration, across a large volume of contracts."
      },
      {
        question: "What does a Merkle root prove for a revenue workpaper?",
        answer: "That the exported rows are the rows that were hashed. Soluqube computes SHA-256 hashes and a Merkle root on the export, so a reviewer can re-hash the file and detect any change. It is a file-integrity check, not evidence that the allocation or SSP judgement is correct, and not an attestation."
      }
    ],
    content: `
## What do auditors test on revenue?

For many companies revenue is a critical audit matter, because it combines judgement with volume. Audit teams typically test:

1. **Contract terms**: that the price, term and parties in the subledger agree to the signed contract.
2. **Performance obligations**: why services were treated as distinct from, or combined with, the subscription.
3. **Standalone selling prices and allocation**: the evidence behind each SSP and whether the allocation re-performs. See the [SSP allocation example](/blog/mastering-asc-606-standalone-selling-price-ssp-multi-element-allocations).
4. **Schedule accuracy and cutoff**: that revenue lands in the right period and the deferred balance unwinds.
5. **Controls** over all of the above.

The auditor documents its own work under PCAOB AS 1215. What the finance team can do is hand over support that makes each of these steps fast to test.

---

## Clause evidence per obligation

For each performance obligation, Soluqube keeps the page number and the excerpt of the clause it came from, so a reviewer can go straight to the paragraph instead of searching a 40-page agreement. You confirm the obligations and prices; the engine does the allocation and schedule. The [clause evidence guide](/blog/contract-pdf-bounding-box-clause-grounding-auditors) covers what to capture for non-standard clauses.

---

## What do hashes and Merkle roots add?

A SHA-256 hash is a fingerprint of a file: change one cell and the hash changes. A Merkle root goes one step further, hashing rows in pairs up to a single root, so a reviewer can check one row against the root without re-hashing everything.

Soluqube hashes the exported workpaper and computes a Merkle root on it. A reviewer who re-runs the same inputs gets identical output and the same hash, and can see if a delivered file was altered afterwards.

What a hash does not do: it does not show that the SSP estimate is supportable, that the obligations were identified correctly, or that the right contract was used. It is integrity, not correctness.

---

## What goes in the package?

* The contract terms you confirmed, with clause evidence (page + excerpt) per obligation.
* The SSP inputs and the relative-SSP allocation, including which obligation absorbs the residual cent. See the [residual-cent policy](/blog/ssp-allocation-rounding-residual-cent-asc-606).
* The full-term schedule, ending at a $0.00 deferred balance per obligation.
* An Excel workpaper and a JSON evidence pack, SHA-256 hashed, with a Merkle root.

Judgement memos, such as a [principal vs agent assessment](/blog/principal-vs-agent-asc-606-gross-vs-net-worked-example), sit alongside the package. To get one built on three of your own contracts, request the [free 3-contract workpaper](/book-demo).
    `
  },
  {
    slug: "contract-pdf-bounding-box-clause-grounding-auditors",
    title: "Clause Evidence for ASC 606: Page and Excerpt per Obligation",
    subtitle: "Why each performance obligation in a revenue schedule should point back to the clause it came from, and what a reviewer needs to trace it quickly.",
    publishedAt: "October 9, 2026",
    updatedAt: "October 15, 2026",
    readTime: "7 min read",
    author: {
      name: "Soluqube Editorial",
      role: "Technical Accounting Content",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["Clause Evidence", "Audit Evidence", "Contract Review", "External Audit"],
    targetQuery: "ASC 606 contract clause evidence for auditors",
    definitionAnchor: "Clause evidence links each line of an ASC 606 allocation or schedule to the contract clause it came from, recorded as the page number and the clause excerpt. A reviewer can then trace an obligation, its price and its term to the signed contract without searching the whole document. In Soluqube you confirm the obligations and prices; each one keeps its page and excerpt.",
    excerpt: "Most revenue errors start in the contract, not the arithmetic. How linking each obligation to a page and excerpt shortens tracing, what to capture for non-standard clauses, and where automated extraction still needs a person.",
    toc: [
      { id: "why-do-revenue-errors-start-in-the-contract", label: "Why revenue errors start in the contract" },
      { id: "what-should-clause-evidence-capture", label: "What clause evidence should capture" },
      { id: "which-clauses-change-the-accounting", label: "Clauses that change the accounting" },
      { id: "extraction-vs-confirmation", label: "Extraction vs confirmation" },
      { id: "what-goes-to-the-auditor", label: "What goes to the auditor" }
    ],
    faqs: [
      {
        question: "What is clause evidence in revenue recognition?",
        answer: "A reference from each performance obligation, price or term in the revenue schedule to the clause in the signed contract that supports it, usually the page number and the excerpt. It lets a reviewer trace the schedule to the contract quickly."
      },
      {
        question: "Can software extract obligations from any contract automatically?",
        answer: "Not reliably. Extraction from real contracts is heuristic and makes mistakes on non-standard documents, so a person should confirm the obligations, prices and terms. In Soluqube you confirm them; the engine does the allocation and schedule, and each obligation keeps its page and excerpt."
      }
    ],
    content: `
## Why do revenue errors start in the contract?

Revenue errors rarely start in the arithmetic. They start in **clause interpretation**. A $5,000,000 Master Services Agreement with three addenda can carry *contingent SLA credits*, *termination for convenience refunds* or *tiered volume discounts* that change the accounting and are easy to miss.

In substantive testing, auditors trace subledger entries back to the signed documents. If the clause behind a price or a standalone selling price cannot be found quickly, the question becomes a finding to resolve, and repeated gaps can become a control deficiency.

---

## What should clause evidence capture?

For each performance obligation, enough for a reviewer to find and read the supporting clause:

\`\`\`typescript
interface ClauseEvidence {
  obligationId: string;
  clauseType: "TERM" | "FEE_STRUCTURE" | "SLA_CREDIT" | "TERMINATION_RIGHT";
  pageNumber: number;
  excerpt: string;     // the clause text, quoted
  sha256: string;      // hash of the excerpt, so a later edit is visible
}
\`\`\`

Page and excerpt are what a reviewer actually uses. Pair them with the price and term you confirmed, and the line in the schedule now points to its source.

---

## Which clauses change the accounting?

* **SLA credits and penalties**: variable consideration, which may need to be estimated and constrained.
* **Termination for convenience**: can shorten the enforceable contract term, which changes the schedule.
* **Tiered or volume discounts and renewal options**: may create a material right that takes part of the allocation.
* **Acceptance clauses**: can move the point at which control transfers.
* **Third-party components**: may raise a [principal vs agent](/blog/principal-vs-agent-asc-606-gross-vs-net-worked-example) question.

Capture the excerpt for each, even when the conclusion is "no effect"; the reviewer will want to see that it was considered.

---

## Extraction vs confirmation

| Approach | Strength | Risk |
|---|---|---|
| **Manual review** | Judgement on every clause | Slow; references often missing from the spreadsheet |
| **Automated extraction (OCR / LLM)** | Fast first draft | Misreads numbers and misses caveats on non-standard contracts |
| **Assisted extraction with confirmation** | Fast, with a person confirming each obligation and price | Still depends on the reviewer reading the clauses |

Soluqube takes the third approach: you confirm the obligations and stated prices, and the engine does the allocation and schedule. Automated extraction with human confirmation kept in the loop is the next release, not a claim about today.

---

## What goes to the auditor?

An Excel workpaper and a JSON evidence pack with the page and excerpt for every obligation, the [relative-SSP allocation](/blog/ssp-allocation-rounding-residual-cent-asc-606), the full schedule and SHA-256 hashes on the export. The [audit evidence guide](/blog/pcaob-as-3101-audit-workpapers-merkle-proofs) explains what the hashes do and do not prove. If you are comparing tools that only extract terms into a checklist, see [Soluqube vs Klarity](/soluqube-vs-klarity), or try it on your own contracts through the [design partner program](/design-partners).
    `
  },
  {
    slug: "pcaob-qc-1000-fasb-ai-revenue-recognition-audits-2026",
    title: "PCAOB QC 1000 and Revenue Audits: What Changes for Finance",
    subtitle: "QC 1000 applies to audit firms, not preparers. What it changes in how revenue evidence is tested, and why reproducible math beats unreviewed AI output.",
    publishedAt: "October 10, 2026",
    updatedAt: "October 15, 2026",
    readTime: "8 min read",
    author: {
      name: "Soluqube Editorial",
      role: "Technical Accounting Content",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["PCAOB QC 1000", "ASC 606", "AI in Finance", "External Audit"],
    targetQuery: "PCAOB QC 1000 revenue recognition audit",
    definitionAnchor: "PCAOB QC 1000 is the quality-control standard for registered audit firms; its practical effect for preparers is that audit teams increasingly look for reproducible, documented revenue calculations rather than spreadsheet judgment or probabilistic AI outputs in ASC 606 performance obligation allocations.",
    excerpt: "QC 1000 raises quality-control expectations for audit firms, and inspections keep finding revenue issues. What that means for a SaaS finance team's SSP support, schedules and any AI used in the close.",
    toc: [
      { id: "what-is-qc-1000", label: "What QC 1000 is" },
      { id: "where-do-revenue-audits-find-problems", label: "Where revenue audits find problems" },
      { id: "ai-in-the-close-is-there-a-special-standard", label: "AI in the close: no special standard" },
      { id: "generative-vs-deterministic-output", label: "Generative vs deterministic output" },
      { id: "what-does-soluqube-do", label: "What Soluqube does" }
    ],
    faqs: [
      {
        question: "What is PCAOB QC 1000 and how does it affect revenue recognition?",
        answer: "PCAOB QC 1000 is the quality control standard for registered audit firms' systems of quality control; it does not apply directly to preparers or software. Its practical effect for finance teams is that audit firms increasingly scrutinize whether subledgers and schedules rely on fragile spreadsheets or untracked manual overrides."
      },
      {
        question: "Does FASB have a specific accounting standard for Artificial Intelligence?",
        answer: "No. There is no AI-specific revenue standard. Arrangements involving AI are accounted for under existing GAAP, such as ASC 606 for customer contracts and ASC 350-40 for internal-use software. If AI is used in the close, expect auditors to ask how its output was reviewed and how the result can be reproduced."
      },
      {
        question: "Why are auditors cautious about generative AI output in revenue work?",
        answer: "Generative models can return different answers to the same input and can misread numbers, so their output is hard to re-perform. A defensible approach keeps a person confirming the contract terms and uses deterministic calculations for allocation and schedules, so the same inputs always give the same output. That is how Soluqube works: you confirm the terms, the engine computes in integer arithmetic, and the export is hashed."
      }
    ],
    content: `
## What is QC 1000?

The Public Company Accounting Oversight Board (PCAOB) standard **QC 1000 (A Firm's System of Quality Control)** sets requirements for registered audit firms' systems of quality control.

QC 1000 applies to audit firms, not to corporate preparers or software, but it shapes what audit teams expect from the evidence and calculations they test. Revenue under **ASC 606** is one of the areas where that expectation shows most.

---

## Where do revenue audits find problems?

PCAOB inspection reports regularly list revenue among the areas with the most audit deficiencies. The recurring themes are:

- Testing management's estimates of standalone selling price (SSP).
- Testing the completeness and accuracy of the data and spreadsheets behind revenue schedules.
- Supporting conclusions on contract modifications and multi-element arrangements.

On the preparer side, three patterns make those tests harder:

1. **Spreadsheet version sprawl**: several copies of a schedule, manual overrides with no trail, and per-period rounding that leaves a balance someone has to plug.
2. **Unsupported modification conclusions**: no memo showing why an amendment was treated as a separate contract, prospectively or by catch-up. The [contract modification decision tree](/blog/contract-modification-precedence-dag-asc-606-10-25-13) sets out the analysis.
3. **Schedules with no route back to the contract**: subledger output that cannot be traced to the clause behind each price and term.

---

## AI in the close: is there a special standard?

No. The FASB has not issued an AI-specific revenue standard. Arrangements involving AI are accounted for under existing GAAP:

- **AI features sold to customers** are evaluated under ASC 606 like any other promise: distinct or combined, and how they are priced.
- **Usage-based AI pricing** is variable consideration, recognised as usage occurs or estimated and constrained, depending on the facts.
- **AI used in the close** is a tool, not a standard. Expect auditors to ask what was reviewed, by whom, and whether the result can be reproduced.

---

## Generative vs deterministic output

Generative models predict text. That is useful for drafting, but revenue schedules have to re-perform to the cent.

| Audit dimension | Generative AI | Deterministic engine (Soluqube) |
|---|---|---|
| **Same input, same output** | Not assured | Yes, byte-identical |
| **Arithmetic** | Can misread or miscompute numbers | Integer (BigInt) arithmetic, rounded to cents, terminal-period remainder absorption |
| **Source trace** | Summaries without clause references | Clause evidence (page + excerpt) per obligation |
| **Evidence** | Hard to re-perform | SHA-256 hashed export with a Merkle root |
| **Standards** | General text | ASC 606; Ind AS 115 with GST isolation for INR contracts |

---

## What does Soluqube do?

1. **Relative-SSP allocation** in integer arithmetic, with a written rule for the residual cent ([how the residual is handled](/blog/ssp-allocation-rounding-residual-cent-asc-606)).
2. **A full-term schedule** that ties to the contract value and ends at a $0.00 deferred balance.
3. **Clause evidence (page + excerpt)** for each obligation; you confirm the obligations and prices.
4. **A hashed workpaper** an auditor can re-run and compare.

Contract-modification accounting is on the roadmap and is not automated today. For the platform view, see the [ASC 606 hub](/asc-606); to test it on your own contracts, see the [design partner program](/design-partners).
    `
  },
  {
    slug: "netsuite-arm-vs-soluqube-floating-point-rounding-drift-asc-606",
    title: "NetSuite ARM vs Soluqube: Rounding in ASC 606 Schedules",
    subtitle: "Why per-period rounding leaves residual cents in multi-year ratable schedules, how to test any system for it, and how a terminal-period rule fixes it.",
    publishedAt: "October 10, 2026",
    updatedAt: "October 15, 2026",
    readTime: "8 min read",
    author: {
      name: "Soluqube Editorial",
      role: "Technical Accounting Content",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["NetSuite ARM", "ASC 606", "Rounding Policy", "Revenue Schedules", "External Audit"],
    targetQuery: "NetSuite ARM revenue recognition rounding",
    definitionAnchor: "Residual cents in an ASC 606 schedule appear when each period's revenue is rounded to the cent on its own. $100,000 over 36 months is $2,777.777... a month; rounding every month to $2,777.78 recognises $100,000.08 in total. The fix is a written rounding rule, such as flooring each period and letting the final period absorb the remainder, applied the same way every time.",
    excerpt: "Round $100,000 over 36 months to the cent each month and you recognise $100,000.08. How to test whether your NetSuite ARM set-up, or any schedule, has this problem, and how Soluqube's terminal-period rule handles it.",
    toc: [
      { id: "where-do-residual-cents-come-from", label: "Where residual cents come from" },
      { id: "how-does-the-remainder-grow-in-multi-element-contracts", label: "Multi-element contracts" },
      { id: "four-checks-for-any-schedule", label: "Four checks for any schedule" },
      { id: "netsuite-arm-vs-soluqube", label: "NetSuite ARM vs Soluqube" },
      { id: "how-does-terminal-period-remainder-absorption-work", label: "Terminal-period remainder absorption" },
      { id: "what-to-hand-the-auditor", label: "What to hand the auditor" }
    ],
    faqs: [
      {
        question: "Why can revenue schedules be a few cents off the contract value?",
        answer: "Because each period is rounded to the cent on its own. $100,000 / 36 is $2,777.777...; rounding each month to $2,777.78 sums to $100,000.08. The difference comes from the rounding rule, whichever system does the arithmetic. A written rule that assigns the remainder to one period removes it."
      },
      {
        question: "How does Soluqube handle the remainder?",
        answer: "Soluqube uses integer (BigInt) arithmetic at 10^6 scale, rounded to cents, and terminal-period remainder absorption. In the final period it recognises the total consideration minus everything recognised before, so the schedule ties exactly to the contract value."
      },
      {
        question: "Do auditors care about a few cents?",
        answer: "Not as a misstatement: a few cents are far below materiality. The cost is mechanical: a deferred balance that never reaches zero needs a manual plug, and every plug needs an explanation. Auditors spend their time on SSP judgement, modifications, cutoff and controls; a schedule that ties to the cent removes a distraction."
      }
    ],
    content: `
## Where do residual cents come from?

Divide a $100,000 contract across 36 monthly periods and the ideal monthly amount has no end:

\`\`\`
100,000 / 36 = 2,777.7777777...
\`\`\`

Round each monthly entry to the cent ($2,777.78) and the 36 entries add up to more than the contract:

\`\`\`
$2,777.78 × 36 = $100,000.08
\`\`\`

That is eight cents of revenue with no contract behind it. It comes from the rounding rule, not from any one product: the same thing happens in a spreadsheet, an ERP or a custom script that rounds each period independently. How a given NetSuite Advanced Revenue Management (ARM) set-up handles it depends on its configuration, so test it rather than assume.

---

## How does the remainder grow in multi-element contracts?

It appears at every step that divides:

1. **Allocation**: a $150,000 bundle split across subscription, implementation and support by relative SSP rarely gives whole cents per obligation.
2. **Scheduling**: each obligation is then divided over its own service period (36 months ratable, a milestone, 12 months of support).
3. **Modifications**: if a schedule is rebuilt after an amendment without a remainder rule, the cents left over from the first schedule are not carried into the new one.

The amounts stay small, but they leave deferred balances that do not reach zero, and each one is a reconciling item to explain at close.

---

## Four checks for any schedule

Run these on an ARM revenue plan export or a spreadsheet alike:

1. The allocations across obligations sum to the transaction price, to the cent.
2. Each obligation's schedule sums to its allocation.
3. Each obligation's deferred balance is $0.00 after its final period.
4. Re-running the same inputs gives the same cents.

If any check fails, write down a remainder rule and apply it consistently. The [residual-cent policy guide](/blog/ssp-allocation-rounding-residual-cent-asc-606) has illustrative wording.

---

## NetSuite ARM vs Soluqube

They solve different problems. ARM is the revenue module of an ERP; Soluqube is a standalone engine for the allocation, schedule and evidence on contracts you want to defend.

| Dimension | NetSuite ARM | Soluqube |
|---|---|---|
| **Scope** | ERP revenue module with billing and GL posting | Allocation, schedule and evidence workpaper; export only, no live ERP sync |
| **Rounding rule** | Depends on configuration; document what yours does | Floor each period; final period absorbs the remainder |
| **Clause evidence** | Memo and reference fields | Page + excerpt per obligation |
| **Contract modifications** | Handled in the ERP workflow | Not automated yet (on the roadmap) |
| **Ind AS 115 GST** | Via tax configuration | GST isolated before allocation for INR contracts |
| **Output** | GL postings and reports | Excel/CSV you review and post, SHA-256 hashed |

---

## How does terminal-period remainder absorption work?

Two mechanisms, both simple enough to re-perform by hand.

### 1. Integer amounts

Amounts are held as integers at 10^6 units per dollar and rounded to cents, so there is no binary fraction to round:

\`\`\`typescript
const SCALE = 10n ** 6n;
const total = 100_000n * SCALE;   // $100,000.00
const months = 36n;
\`\`\`

### 2. The final period takes the remainder

Each period gets the floored amount; the last one gets whatever is left:

\`\`\`typescript
function finalPeriod(total: bigint, perPeriod: bigint, periods: bigint): bigint {
  return total - perPeriod * (periods - 1n); // absorbs the remainder
}
// 35 × $2,777.77 + $2,778.05 = $100,000.00
\`\`\`

The schedule sums to the contract value every time. Try other amounts in the [schedule simulator](/audit).

---

## What to hand the auditor

* **A schedule that ties**: allocations and every period sum to the transaction price, and the deferred balance ends at $0.00.
* **Clause evidence**: the page and excerpt behind each obligation and price.
* **A hashed workpaper**: SHA-256 hashes and a Merkle root on the export, so a re-run can be compared.

The cents are the easy part. The judgement auditors test is the SSP behind the allocation; see the [SSP allocation example](/blog/mastering-asc-606-standalone-selling-price-ssp-multi-element-allocations). To run your own contracts, see the [design partner program](/design-partners).
    `
  },
  {
    slug: "mastering-asc-606-standalone-selling-price-ssp-multi-element-allocations",
    title: "ASC 606 SSP Allocation Example: 3-Element SaaS Bundle",
    subtitle: "How relative SSP allocation works under ASC 606 Step 4, the three SSP estimation methods, a worked 3-element example, and what auditors test.",
    publishedAt: "October 11, 2026",
    updatedAt: "October 15, 2026",
    readTime: "9 min read",
    author: {
      name: "Soluqube Editorial",
      role: "Technical Accounting Content",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["ASC 606", "Standalone Selling Price", "SSP Allocation", "Multi-Element Bundles", "Ind AS 115"],
    targetQuery: "ASC 606 SSP allocation example",
    definitionAnchor: "Under ASC 606 Step 4, the transaction price is allocated to each performance obligation in proportion to its standalone selling price (SSP). Observable prices come first; otherwise management estimates SSP by adjusted market assessment, expected cost plus a margin or, in narrow cases, the residual approach. A bundle discount is allocated proportionately unless the ASC 606-10-32-37 criteria are met.",
    excerpt: "A $100,000 bundle with $200,000 of total SSP: how the discount is spread, how each allocation is computed, how SSP is estimated without standalone sales, and what auditors test in management's SSP.",
    toc: [
      { id: "step-4-relative-ssp-allocation", label: "Step 4: relative SSP allocation" },
      { id: "three-methods-for-estimating-ssp", label: "Three methods for estimating SSP" },
      { id: "worked-example-100000-across-three-obligations", label: "Worked example: three obligations" },
      { id: "what-do-auditors-test-in-managements-ssp", label: "What auditors test in SSP" },
      { id: "how-does-soluqube-compute-the-allocation", label: "How Soluqube computes it" },
      { id: "ssp-governance-checklist", label: "SSP governance checklist" }
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
        question: "Why do spreadsheet SSP allocations raise audit questions?",
        answer: "Usually because of the SSP inputs rather than the arithmetic: stale price lists, no documented range, or a discount pushed onto one element without meeting ASC 606-10-32-37. Arithmetic issues are smaller but avoidable: rounding each line on its own can leave the allocations a cent off the transaction price unless a residual rule is written down."
      }
    ],
    content: `
## Step 4: relative SSP allocation

Step 4 of the five-step model allocates the transaction price to each performance obligation on a **relative standalone selling price (SSP) basis**.

SaaS contracts rarely contain a single SKU. A typical bundle includes:
1. **Core SaaS subscription** (ratable over 12, 36 or 60 months).
2. **Implementation and onboarding** (point in time or over the project).
3. **Premium support** (ratable over the term).
4. **Usage or API tiers** (variable consideration, subject to the constraint).

When sales offers a bundle discount, say a $150,000 package against $200,000 of list prices, the 25% discount cannot be placed wherever is convenient. ASC 606 allocates it proportionately across all obligations unless observable evidence shows it belongs to specific ones (ASC 606-10-32-37).

---

## Three methods for estimating SSP

Under ASC 606-10-32-31, start with **observable standalone selling prices**. When there are none, estimate SSP with a method that maximises observable inputs:

### 1. Adjusted market assessment
Estimate what customers in the market would pay: competitor pricing, your own list-price discounting bands, and regional adjustments.

### 2. Expected cost plus a margin
Forecast the cost of satisfying the obligation (for example, engineering hours for an integration) and add a margin the market would accept.

### 3. Residual approach
Total transaction price minus the observable SSPs of the other goods or services. Under ASC 606-10-32-34(c) it is only allowed when the selling price is highly variable or uncertain.

---

## Worked example: $100,000 across three obligations

The allocation formula: allocation to obligation i = transaction price × SSP of i ÷ sum of all SSPs.

A **$100,000** contract bundles three obligations:
* **Element A (SaaS subscription):** SSP $70,000 (35%)
* **Element B (professional services):** SSP $20,000 (10%)
* **Element C (premium support):** SSP $110,000 (55%)
* **Total SSP:** $200,000, so the bundle carries a 50% discount

The allocations are $35,000, $10,000 and $55,000. These come out in whole cents; most real bundles do not, and the [residual-cent guide](/blog/ssp-allocation-rounding-residual-cent-asc-606) shows what to do when they don't.

The schedule raises the same question again. Element C over 36 months is $1,527.777... a month. Round every month to $1,527.78 and Element C recognises $55,000.08. Floor each month and let the final month absorb the remainder, and it recognises 35 × $1,527.77 + $1,528.05 = $55,000.00.

---

## What do auditors test in management's SSP?

Most audit time goes on the SSP inputs, not the arithmetic:

1. **Documented ranges**: auditors compare SSPs with historical standalone sales and discount bands (for example, 80% to 120% of the median standalone price).
2. **Re-performance**: the allocation and schedule should re-perform from the stated inputs; evidence that cannot be reproduced is weak evidence under PCAOB AS 1105.
3. **Link to the contract**: each price and obligation should trace to the signed contract.

---

## How does Soluqube compute the allocation?

### 1. Integer arithmetic
Amounts are integers at 10^6 units per dollar, rounded to cents:

\`\`\`typescript
const SCALE = 1_000_000n;
const price = 100_000n * SCALE;                          // $100,000.00
const ssp = [70_000n, 20_000n, 110_000n].map((d) => d * SCALE);
const totalSsp = ssp.reduce((a, b) => a + b, 0n);        // $200,000.00

// every obligation but the last: price × SSP ÷ total SSP, rounded to the cent
// the last obligation: price minus the others, so the total ties exactly
\`\`\`

### 2. Clause evidence
Each obligation keeps the page and excerpt of the clause it came from. You confirm the obligations and stated prices; the engine does the allocation and schedule.

### 3. Hashed workpaper
The export carries the SSP inputs, the allocation, the full schedule and SHA-256 hashes with a Merkle root. Allocations sum to the transaction price and each obligation ends at a $0.00 deferred balance; if they don't, the engine rejects the result instead of returning it.

---

## SSP governance checklist

* **Set SSP ranges**: review standalone sales at least annually and document a band for each SKU.
* **Write down the method**: observable price, adjusted market, cost plus margin or residual, and why.
* **Allocate discounts proportionately** unless the ASC 606-10-32-37 criteria are documented.
* **Write a residual-cent rule**: which obligation absorbs the rounding difference, and how schedules handle their own remainder.
* **Keep the clause behind every price**: page and excerpt.
* **For Ind AS 115 INR contracts**: exclude 18% GST from the transaction price before allocating; see the [ASC 606 vs Ind AS 115 hub](/asc-606-vs-ind-as-115).

For a gross vs net question that comes before the allocation, see [principal vs agent under ASC 606](/blog/principal-vs-agent-asc-606-gross-vs-net-worked-example). To vary a schedule yourself, use the [schedule simulator](/audit), or bring three of your own contracts to the [design partner program](/design-partners).
    `
  },
  {
    slug: "best-maxio-alternatives-contract-revenue-recognition",
    title: "Best Maxio Alternatives for ASC 606 Revenue Recognition",
    subtitle: "Maxio, Soluqube, Trullion, Leapfin and RightRev compared for ASC 606: source of truth, SSP allocation, rounding policy, Ind AS 115 and how each is bought.",
    publishedAt: "October 12, 2026",
    updatedAt: "October 15, 2026",
    readTime: "9 min read",
    author: {
      name: "Soluqube Editorial",
      role: "Technical Accounting Content",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["Maxio Alternatives", "ASC 606 Software", "Revenue Subledger", "SaaSOptics Replacement", "Audit Readiness"],
    targetQuery: "Best Maxio alternatives for ASC 606 revenue recognition 2026",
    definitionAnchor: "A Maxio alternative is a specialized revenue accounting subledger or contract audit engine designed to automate ASC 606 and IFRS 15 revenue recognition directly from executed customer contracts rather than relying solely on billing line items, CPQ quotes, or manual spreadsheet workpapers.",
    excerpt: "Comparing Maxio alternatives for ASC 606 in 2026: invoice-first billing tools versus contract-first revenue subledgers, what each is best for, and the questions to ask before you switch.",
    toc: [
      { id: "why-do-finance-teams-outgrow-maxio", label: "Why finance teams outgrow Maxio" },
      { id: "maxio-alternatives-evaluated", label: "Maxio alternatives evaluated" },
      { id: "contract-to-ledger-vs-invoice-to-ledger", label: "Contract-to-ledger vs invoice-to-ledger" },
      { id: "comparison-matrix", label: "Comparison matrix" },
      { id: "buyer-questions", label: "Buyer questions" }
    ],
    content: `
## Why do finance teams outgrow Maxio?

Maxio (formed by the 2022 merger of **Chargify** and **SaaSOptics**) is a fixture in SaaS billing. As contracts move from flat subscriptions to multi-element arrangements, with platform access, usage tiers, professional services, milestones and SLA credits, some teams hit limits:

1. **Invoice-first rather than contract-first**: revenue follows invoices and CRM quote data. Non-standard terms in the signed MSA or SOW, such as termination clauses or variable consideration, have to be translated into schedules by hand.
2. **Rounding policy not published**: Maxio does not document how it assigns residual cents. Any engine that rounds each period without a remainder rule leaves small differences that someone has to reconcile.
3. **No Ind AS 115 GST handling advertised**: Maxio does not advertise isolating Indian 18% GST (CGST/SGST/IGST) from the transaction price for US-India groups.
4. **Pricing not published**: plans are quoted, and some are based on revenue under management.

For a head-to-head view, see [Soluqube vs Maxio](/soluqube-vs-maxio).

---

## Maxio alternatives evaluated

### 1. Soluqube: for defensible SSP allocation and Ind AS 115
Soluqube is a contract-first engine. You confirm the obligations and stated prices from the signed contract; it allocates by relative SSP in integer (BigInt) arithmetic at 10^6 scale, rounded to cents, and builds the full schedule with terminal-period remainder absorption.
* **Strengths**: clause evidence (page + excerpt) per obligation, ASC 606 and Ind AS 115 with GST isolation for INR contracts, hashed evidence workpapers, a free 3-contract workpaper to start.
* **Limits today**: no live ERP sync (you review and post the export), and contract-modification accounting is on the roadmap.
* **Best for**: SaaS finance teams that need to defend SSP allocations, and US-India groups.

### 2. Trullion: for lease (ASC 842) plus revenue
Trullion uses AI document extraction on contracts. See [Soluqube vs Trullion](/soluqube-vs-trullion).
* **Strengths**: one platform for ASC 842 lease accounting and ASC 606.
* **Limits**: enterprise pricing and sales cycle (pricing not published); no Ind AS 115 support advertised (check current vendor documentation).

### 3. Leapfin: for high-volume transaction data
Leapfin consolidates large volumes of payment and billing events, such as Stripe or app-store transactions, into ERP-ready journal entries. See [Soluqube vs Leapfin](/soluqube-vs-leapfin).
* **Strengths**: throughput on very large transaction volumes.
* **Limits**: built around event data rather than individual negotiated contracts.

### 4. RightRev: for Salesforce CPQ environments
RightRev is built on Salesforce and works with Salesforce CPQ and Billing. See [Soluqube vs RightRev](/soluqube-vs-rightrev).
* **Strengths**: native Salesforce data model and revenue rules triggered from CPQ.
* **Limits**: tied to the Salesforce platform.

---

## Contract-to-ledger vs invoice-to-ledger

The main difference is the source of truth:

\`\`\`
                     [ Signed customer contract ]
                                  |
              +-------------------+-------------------+
              |                                       |
     [ INVOICE-TO-LEDGER ]                  [ CONTRACT-TO-LEDGER ]
       (billing-led tools)                    (Soluqube)
              |                                       |
     Deal desk data entry                  You confirm obligations and prices
              |                                       |
     CRM quote line items                  Clause evidence (page + excerpt)
              |                                       |
     Invoice timing                        Relative SSP allocation
              |                                       |
     Per-period rounding                   Integer cents, remainder in final period
              |                                       |
     Manual audit support                  Hashed evidence workpaper
\`\`\`

---

## Comparison matrix

| Capability | Maxio | Trullion | Leapfin | Soluqube |
| :--- | :---: | :---: | :---: | :---: |
| **Source of truth** | Invoices / CRM quotes | Contract documents | Transaction events | **Contract terms you confirm** |
| **Clause evidence per obligation** | Not advertised | AI extraction (check vendor) | Not applicable | **Page + excerpt** |
| **Arithmetic** | Not published | Not published | Not published | **Integer (BigInt), rounded to cents** |
| **Terminal-period remainder rule** | Not published | Not published | Not published | **Yes (ties to the cent)** |
| **Ind AS 115 + 18% GST** | Not advertised | Not advertised | Not advertised | **For INR contracts** |
| **Live ERP sync** | Yes (billing integrations) | Check vendor | Yes | **No: export you review and post** |
| **How to start** | Sales-led | Sales-led | Sales-led | **Free 3-contract workpaper** |

Soluqube pricing is on the [pricing page](/pricing).

---

## Buyer questions

When choosing a tool to replace or sit beside Maxio, ask four questions:
1. **Can it show where each obligation came from?** Ask for the page and excerpt behind a line in the schedule.
2. **How does it assign the residual cent?** Ask for the written rule, and check that allocations and schedules sum to the transaction price.
3. **How is it priced?** Prefer published, predictable pricing to fees that scale with billings.
4. **Do you need Ind AS 115?** If you bill Indian customers in INR, check that GST is excluded from the transaction price before allocation.
    `
  },
  {
    slug: "ind-as-115-vs-asc-606-cross-border-dual-gaap-guide",
    title: "Ind AS 115 vs ASC 606: Dual-GAAP Guide for US-India SaaS",
    subtitle: "A practical guide for controllers handling cross-border software revenue, Schedule III presentation and 18% GST under Ind AS 115 and ASC 606.",
    publishedAt: "October 12, 2026",
    updatedAt: "October 15, 2026",
    readTime: "12 min read",
    author: {
      name: "Soluqube Editorial",
      role: "Technical Accounting Content",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["Ind AS 115", "ASC 606", "Dual-GAAP", "GST Isolation", "MCA Schedule III", "Cross-Border SaaS"],
    targetQuery: "Ind AS 115 vs ASC 606 Dual-GAAP revenue recognition guide",
    definitionAnchor: "Ind AS 115 vs ASC 606 dual-GAAP accounting is the regulatory methodology by which multinational entities reconcile revenue recognized under US GAAP standards with Indian MCA Ind AS 115 statutory requirements, specifically isolating non-revenue tax liabilities (such as 18% GST) into segregated balance sheet accounts.",
    excerpt: "The essential differences between Ind AS 115 and ASC 606 for US-India SaaS groups: how 18% GST is kept out of the transaction price, how Schedule III presents contract balances, and where transfer pricing fits.",
    toc: [
      { id: "harmonization--the-critical-divergence", label: "Harmonisation and the critical divergence" },
      { id: "the-5-step-model-under-ind-as-115", label: "The 5-step model under Ind AS 115" },
      { id: "mca-schedule-iii-balance-sheet-disclosures", label: "Schedule III balance sheet presentation" },
      { id: "intercompany-transfer-pricing--fx-revaluation", label: "Transfer pricing and FX" }
    ],
    content: `
## Harmonization & The Critical Divergence

On the surface, **Ind AS 115** (*Revenue from Contracts with Customers*, notified by the Ministry of Corporate Affairs in India) and **US GAAP ASC 606** (FASB Topic 606) look almost identical. Both adopted the converged **5-step revenue recognition model** developed by the FASB and IASB. The [ASC 606 vs Ind AS 115 hub](/asc-606-vs-ind-as-115) has a one-page summary.

In cross-border practice, US-headquartered software companies with Indian subsidiaries, Global Capability Centers (GCCs) or Indian customers run into operational differences:

1. **Gross consideration and indirect taxes**: Under US GAAP, an entity can elect to exclude sales taxes collected from customers from the transaction price (ASC 606-10-32-2A). Under Ind AS 115, amounts collected on behalf of third parties are excluded from the transaction price, so **18% Goods and Services Tax (GST)** on an INR invoice is booked as a liability, not revenue.
2. **Balance sheet presentation (Schedule III)**: Indian statutory filings follow Schedule III of the Companies Act, 2013, which sets the line items for receivables, contract assets and contract liabilities, split between current and non-current.
3. **Withholding tax (TDS)**: Tax Deducted at Source under sections 194J/194C of the Income Tax Act changes the cash received and needs clearing accounts in the subledger.

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
            (Excludes 18% GST from gross invoiced consideration)
                               │
            Step 4: Allocate Transaction Price to POBs
            (Relative standalone selling price allocation)
                               │
            Step 5: Recognize Revenue as POBs are Satisfied
            (Over time, ratable, or at a point in time)
\`\`\`

### Step 3 deep-dive: excluding 18% GST from consideration

When an Indian customer signs a contract for **₹11,800,000** including GST, some systems record the full ₹11.8M as deferred revenue and recognise ₹983,333.33 a month.

**That overstates revenue and deferred revenue under Ind AS 115.**

GST collected on behalf of the government is not consideration the entity is entitled to. Split it out at inception:

\`\`\`text
Net consideration = Gross consideration / (1 + GST rate) = ₹11,800,000 / 1.18 = ₹10,000,000
GST liability     = ₹11,800,000 - ₹10,000,000           = ₹1,800,000
\`\`\`

* If intra-state (e.g. Karnataka to Karnataka): **₹900,000 CGST (9%) + ₹900,000 SGST (9%)**
* If inter-state (e.g. Karnataka to Maharashtra): **₹1,800,000 IGST (18%)**
* If export of services under a Letter of Undertaking (LUT): **0% GST (zero-rated)**

The [dual-standard GST article](/blog/asc-606-vs-ind-as-115-dual-standard-gst-compliance) works the same split through a 12-month schedule in integer paise.

---

## MCA Schedule III Balance Sheet Disclosures

Under Schedule III of the Companies Act, 2013, contract balances are presented by nature rather than as one deferred revenue line:

1. **Contract assets (unbilled revenue)**: revenue earned by performing before the right to invoice is unconditional.
2. **Contract liabilities (deferred revenue)**: consideration received or due for obligations not yet satisfied.
3. **Current vs non-current**: the part to be recognised within 12 months is current; the rest is non-current.

A month-by-month schedule per obligation gives the deferred balance at any date, which is the input for the current and non-current split. For INR contracts, Soluqube builds that schedule on net consideration, after excluding GST.

---

## Intercompany Transfer Pricing & FX Revaluation

For US parents with Indian subsidiaries on a **cost-plus transfer pricing model** (often cost plus 15% to 18%, depending on the safe harbour rules in force):
* The Indian entity recognises revenue on its costs plus the markup.
* The US parent recognises revenue from third-party customers under ASC 606.
* Month-end FX revaluation under **Ind AS 21** and **ASC 830** should use the same contract balances as the revenue schedule, so intercompany balances reconcile.

A related point on gross vs net: GST is excluded because it is collected for the government, which is a different question from [principal vs agent](/blog/principal-vs-agent-asc-606-gross-vs-net-worked-example). To run your own INR contracts through the engine, see the [design partner program](/design-partners).
    `
  },
  {
    slug: "netsuite-arm-and-excel-rounding-errors-in-asc-606",
    title: "Excel and ERP Rounding Errors in ASC 606 Schedules",
    subtitle: "Why spreadsheet and ERP schedules end a few cents off the contract value, why it is a rounding-policy problem, and how a remainder rule makes them tie.",
    publishedAt: "October 12, 2026",
    updatedAt: "October 15, 2026",
    readTime: "9 min read",
    author: {
      name: "Soluqube Editorial",
      role: "Technical Accounting Content",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["Revenue Rounding", "ASC 606", "Excel", "NetSuite ARM", "Audit Workpapers"],
    targetQuery: "Excel spreadsheet revenue recognition rounding error audit",
    definitionAnchor: "Revenue rounding error is the difference between a contract's transaction price and the sum of its recognised revenue when each allocation or period is rounded to the cent on its own. It is usually a few cents, far below materiality, but it leaves a deferred balance that never reaches zero. A written rule that assigns the remainder to one line or one period removes it.",
    excerpt: "A $100,000 contract over 36 months can recognise $100,000.08 or $99,999.72 depending on how each month is rounded. Where the cents come from, why it is a policy issue more than a floating-point issue, and how to fix it.",
    toc: [
      { id: "the-phantom-penny", label: "The phantom penny" },
      { id: "what-does-floating-point-do-and-what-doesnt-it", label: "What floating point does, and doesn't" },
      { id: "how-does-rounding-compound-in-multi-element-contracts", label: "Rounding in multi-element contracts" },
      { id: "integer-arithmetic-with-a-remainder-rule", label: "Integer arithmetic with a remainder rule" },
      { id: "what-changes-at-audit", label: "What changes at audit" }
    ],
    content: `
## The phantom penny

Anyone who has run a multi-year ASC 606 schedule in **Excel**, an ERP such as **NetSuite Advanced Revenue Management (ARM)** or **Workday**, or a custom script has seen it: a **$1,000,000.00** contract over 36 months recognises **$1,000,000.08** or **$999,999.72**, depending on whether each month is rounded half-up or down.

A few cents are not a misstatement. They are a nuisance with a cost:
* The schedule does not tie to the contract value.
* The deferred balance never reaches zero, so someone books a plug.
* Each plug is a reconciling item to explain to the reviewer and the auditor.
* Recurring manual adjustments invite questions about the controls around the schedule.

---

## What does floating point do, and what doesn't it?

Most software stores numbers in binary floating point, and decimal fractions such as 0.10 have no exact binary form. That representation error is around one part in 10^16, which is far too small to move a figure rounded to the cent. The cents come from rounding each period on its own:

\`\`\`javascript
// Rounding each month to the cent
const contractTotal = 100000.00;
const periods = 36;
const monthly = contractTotal / periods;          // 2777.777...

let sum = 0;
for (let i = 0; i < 36; i++) {
  sum += Number(monthly.toFixed(2));               // 2777.78 every month
}
console.log(sum.toFixed(2));                       // "100000.08": eight cents over
\`\`\`

Decimal arithmetic gives the same eight cents. The fix is a rule for the remainder, not a different number type alone.

---

## How does rounding compound in multi-element contracts?

Take a contract with:
1. **Platform subscription** ($120,000 over 12 months)
2. **Implementation services** ($35,000, milestone-based)
3. **Premium support** ($15,000 over 12 months)
4. **Mid-term upsell** ($25,000, prorated)

Relative SSP allocation divides the transaction price by each obligation's share: allocation to obligation i = transaction price × SSP of i ÷ sum of all SSPs. If each allocation is rounded to the cent on its own before scheduling, the allocations can already differ from the transaction price by a cent, before the first month is posted. Then each schedule divides again. The [residual-cent guide](/blog/ssp-allocation-rounding-residual-cent-asc-606) works through a three-obligation example.

---

## Integer arithmetic with a remainder rule

Soluqube computes in integer (BigInt) arithmetic at 10^6 scale, rounded to cents, with terminal-period remainder absorption:

1. **Integer amounts**: values are scaled by 1,000,000 and computed with integer arithmetic only (JavaScript \`BigInt\`).
2. **Keep the remainder**: for any division P / N, keep both the quotient Q and the remainder R, so that P = N × Q + R.
3. **Assign the remainder**: the final period of each obligation absorbs R.

\`\`\`typescript
// Amounts in cents; the final period absorbs the remainder
export function buildSchedule(totalCents: bigint, periods: bigint): bigint[] {
  const base = totalCents / periods;
  const remainder = totalCents % periods;

  const schedule: bigint[] = [];
  for (let i = 0n; i < periods; i++) {
    schedule.push(i === periods - 1n ? base + remainder : base);
  }
  return schedule; // sums to totalCents exactly
}
\`\`\`

Try other contract values and terms in the [schedule simulator](/audit).

---

## What changes at audit?

* **Schedules that tie**: allocations and every period sum to the transaction price, and each obligation ends at a $0.00 deferred balance.
* **Fewer plugs to explain**: no month-end rounding adjustments on these contracts.
* **Re-performable output**: the same inputs give the same cents, and the export carries SHA-256 hashes with a Merkle root so a reviewer can confirm it has not changed.

The cents are the easy part; auditors spend their time on the SSP behind the allocation. For a system-by-system view, see [NetSuite ARM vs Soluqube](/blog/netsuite-arm-vs-soluqube-floating-point-rounding-drift-asc-606) and the [ASC 606 hub](/asc-606), or bring three contracts to the [design partner program](/design-partners).
    `
  },
  {
    slug: "zuora-revpro-vs-soluqube-6-month-erp-implementation-trap",
    title: "Zuora RevPro vs Soluqube: The Implementation Trade-Off",
    subtitle: "When a full Zuora RevPro deployment is worth it, when it is not, and how a contract-first engine can run beside your ERP for SSP allocation and schedules.",
    publishedAt: "October 13, 2026",
    updatedAt: "October 15, 2026",
    readTime: "8 min read",
    author: {
      name: "Soluqube Editorial",
      role: "Technical Accounting Content",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["Zuora RevPro Alternative", "ASC 606 Implementation", "Revenue Subledger", "CFO Advisory", "Ind AS 115"],
    targetQuery: "Zuora RevPro alternative implementation cost ASC 606",
    definitionAnchor: "A Zuora RevPro alternative is a revenue tool that produces ASC 606 allocations and schedules without a full revenue-automation deployment. RevPro suits high-volume, standardised billing at scale. A contract-first engine such as Soluqube suits a smaller set of complex contracts: you confirm the obligations and prices, and get the allocation, schedule and evidence workpaper back.",
    excerpt: "Zuora RevPro is built for high-volume revenue automation and typically involves an implementation partner. When that is the right call, when it is not, and how to run a parallel check on your hardest contracts first.",
    toc: [
      { id: "the-zuora-revpro-implementation-reality", label: "The RevPro implementation reality" },
      { id: "why-do-bespoke-msas-strain-rules-engines", label: "Why bespoke MSAs strain rules engines" },
      { id: "how-does-a-contract-first-engine-work", label: "How a contract-first engine works" },
      { id: "zuora-revpro-vs-soluqube", label: "Zuora RevPro vs Soluqube" },
      { id: "a-parallel-check-for-controllers", label: "A parallel check for controllers" }
    ],
    content: `
## The Zuora RevPro implementation reality

**Zuora RevPro** (formerly Leeyo RevPro) has long been a default revenue automation choice for pre-IPO and public technology companies. It is built for scale, and buying it usually means a project:

1. **An implementation partner**: external advisers are typically engaged (fees and timelines not published) to map fields between the CRM, billing and the ERP.
2. **Structured inputs**: like most revenue automation, RevPro works from structured order and billing data. Terms in a bespoke MSA or SOW have to be translated into that data, and into performance obligation rules, by someone.
3. **Ind AS 115 GST**: groups billing Indian customers in INR have to design how 18% GST (CGST/SGST/IGST) is kept out of the transaction price, under **Ind AS 115** and **Schedule III**.

For high volumes of standard contracts, that investment pays back. For a smaller number of complex contracts, it may not.

---

## Why do bespoke MSAs strain rules engines?

Rules engines assume transactions follow a product catalogue. Enterprise deals often close at quarter-end on redlined agreements with:
* Custom milestone acceptance gates
* Retroactive volume tier resets
* Co-termed multi-subsidiary carve-outs
* Termination-for-convenience refund clauses

When those terms do not fit the rules tables, accountants go back to spreadsheets for true-ups, and the spreadsheet becomes the support the auditor tests.

---

## How does a contract-first engine work?

Soluqube starts from the signed contract. You confirm the obligations and stated prices; the engine allocates by relative SSP and builds the full schedule in integer (BigInt) arithmetic at 10^6 scale, rounded to cents:

\`\`\`typescript
// Integer arithmetic, final period absorbs the remainder
const SCALE = 1_000_000n;
const CENT = SCALE / 100n;
const total = 250_000n * SCALE;                    // $250,000.00
const months = 36n;

const monthly = (total / months / CENT) * CENT;    // $6,944.44
const last = total - monthly * (months - 1n);      // $6,944.60
// 35 × $6,944.44 + $6,944.60 = $250,000.00
\`\`\`

Each obligation keeps the page and excerpt of its clause, and the export is SHA-256 hashed with a Merkle root computed on it. The output is a workpaper and CSV you review and post; there is no live ERP sync.

---

## Zuora RevPro vs Soluqube

| Dimension | Zuora RevPro | Soluqube |
| :--- | :--- | :--- |
| **Deployment** | Implementation partner typical (timeline not published) | **Free 3-contract workpaper in 48 hours; self-serve sandbox** |
| **Input** | Structured order and billing data | **Contract terms you confirm** |
| **Clause trace** | Reference fields | **Clause evidence (page + excerpt)** |
| **Arithmetic** | Not published | **Integer (BigInt), rounded to cents** |
| **Contract modifications** | Supported | **Not automated yet (on the roadmap)** |
| **Ind AS 115 GST** | Via configuration | **GST isolated before allocation for INR contracts** |
| **ERP posting** | Integrated | **Export you review and post** |
| **Cost** | Pricing not published | **Published; see [pricing](/pricing)** |

---

## A parallel check for controllers

You do not need to replace your ERP to get a second, re-performable calculation on the contracts that worry you. Three steps:
1. **Pick your three hardest contracts**: the bundles and amendments your auditor asked about last year.
2. **Confirm the obligations and prices**: then compare the relative SSP allocation and schedules, which tie to the cent, with what is in the ledger today.
3. **Hand over the workpaper**: an Excel file and JSON evidence pack with SHA-256 hashes.

Request it as a [free 3-contract audit-defense workpaper](/book-demo). For other tools in this category, see the [Maxio alternatives comparison](/blog/best-maxio-alternatives-contract-revenue-recognition) and [Soluqube vs RightRev](/soluqube-vs-rightrev); for how the residual cent is handled, see the [rounding policy guide](/blog/ssp-allocation-rounding-residual-cent-asc-606).
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
      role: "Technical Accounting Content",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["ASC 606", "SSP Allocation", "Rounding Policy", "Standalone Selling Price", "Ind AS 115"],
    targetQuery: "ASC 606 SSP allocation rounding",
    definitionAnchor: "Allocating a transaction price by relative standalone selling price usually gives each performance obligation a share with fractions of a cent. Rounding every line on its own can make the allocations sum to a cent more or less than the contract. A residual-cent policy names which obligation absorbs that difference, so the allocation ties to the transaction price exactly.",
    excerpt: "A $100,000 bundle with SSPs of $30,000, $30,000 and $120,000 rounds to $100,000.01 if every line is rounded on its own. Here is where the cent comes from, which obligation should absorb it, and the policy wording that lets a reviewer re-perform the allocation.",
    toc: [
      { id: "why-does-relative-ssp-allocation-leave-a-residual-cent", label: "Why relative SSP allocation leaves a residual cent" },
      { id: "what-does-asc-606-say-about-rounding-the-allocation", label: "What ASC 606 says about rounding" },
      { id: "worked-example-100000-across-three-performance-obligations", label: "Worked example: $100,000, three obligations" },
      { id: "which-obligation-should-absorb-the-residual-cent", label: "Which obligation absorbs the cent" },
      { id: "how-does-the-residual-flow-into-the-revenue-schedule", label: "How the residual flows into the schedule" },
      { id: "what-should-an-ssp-rounding-policy-say", label: "What an SSP rounding policy should say" }
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

The same terminal-period rule on a single $100,000, 36-month subscription gives 35 × $2,777.77 + $2,778.05. The engine also runs a reconciliation check on every contract: if the allocations or the recognised total do not equal the transaction price in integer cents, or any obligation ends with a deferred balance, it rejects the result instead of returning it. To vary the contract value and term yourself, use the [schedule simulator](/audit).

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

The policy covers the rounding. The judgement auditors spend their time on is the SSP itself: how it was estimated, the evidence behind it, and whether the discount was allocated proportionately. For that side, see our [guide to relative SSP allocation](/blog/mastering-asc-606-standalone-selling-price-ssp-multi-element-allocations) and the [ASC 606 hub](/asc-606).

To run your own bundle, enter the transaction price, obligations and SSPs in the [Soluqube sandbox](https://app.soluqube.com/onboarding); you confirm the obligations and prices, and the engine returns the allocation, the full-term schedule and a hashed workpaper. Or send us your three hardest contracts for a [free 3-Contract Audit-Defense Workpaper](/book-demo).
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
      role: "Technical Accounting Content",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["ASC 606", "Principal vs Agent", "Gross vs Net", "IFRS 15", "Ind AS 115"],
    targetQuery: "principal vs agent ASC 606",
    definitionAnchor: "Under ASC 606-10-55-36 to 55-40, an entity is a principal if it controls the specified good or service before it is transferred to the customer, and reports revenue gross. If its promise is only to arrange for another party to provide it, the entity is an agent and reports its fee or commission net. Gross profit is the same either way; reported revenue is not.",
    excerpt: "A $1,000 sale with a $900 supplier cost is $1,000 of revenue if you are the principal and $100 if you are the agent. Here is the control test in ASC 606-10-55-36 to 55-40, how the 55-39 indicators fit, how SaaS marketplaces and resellers apply it, and how to document a conclusion when the indicators point both ways.",
    toc: [
      { id: "what-does-principal-vs-agent-decide-under-asc-606", label: "What principal vs agent decides" },
      { id: "how-do-you-identify-the-specified-good-or-service", label: "Identifying the specified good or service" },
      { id: "when-does-an-entity-control-the-good-or-service-before-transfer", label: "Control before transfer" },
      { id: "which-indicators-in-asc-606-10-55-39-support-the-assessment", label: "The 55-39 indicators" },
      { id: "worked-example-gross-vs-net-on-a-1000-sale-illustrative", label: "Worked example: gross vs net" },
      { id: "how-do-saas-marketplaces-and-resellers-apply-the-guidance", label: "SaaS, marketplace and reseller cases" },
      { id: "how-do-you-document-the-assessment-when-indicators-conflict", label: "Documenting conflicting indicators" },
      { id: "what-are-the-ifrs-15-and-ind-as-115-equivalents", label: "IFRS 15 and Ind AS 115 equivalents" },
      { id: "what-does-soluqube-do-once-you-have-reached-a-conclusion", label: "Where Soluqube fits" }
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

For Indian entities there is a related but separate point: amounts collected on behalf of third parties, such as GST, are excluded from the transaction price under the Ind AS 115 definition of transaction price. That is not a principal versus agent conclusion, but it is another reason the invoice total and reported revenue differ; the [ASC 606 vs Ind AS 115 hub](/asc-606-vs-ind-as-115) covers the GST mechanics.

---

## What does Soluqube do once you have reached a conclusion?

Soluqube does not decide whether you are principal or agent; that judgement belongs to the entity and its reviewers. Once it is made, you enter the transaction price that follows from it, gross consideration or your net fee, and the engine allocates it across performance obligations by relative standalone selling price and builds the full-term schedule.

The allocation and schedule run in integer arithmetic, rounded to cents, with a written residual-cent rule and the final period absorbing the remainder so each obligation's deferred balance reaches $0.00. Each obligation carries the page and excerpt of the clause it came from, and exports are SHA-256 hashed so a reviewer can confirm the file has not changed. For how the residual cent is handled, see the [SSP rounding guide](/blog/ssp-allocation-rounding-residual-cent-asc-606), and for the wider standard, the [ASC 606 hub](/asc-606).

To try it on a sample contract, open the [Soluqube sandbox](https://app.soluqube.com/). Finance teams who want to run their own contracts with us for 60 days can apply to the [design partner program](/design-partners).
    `
  },
  {
    slug: "ssp-disclosure-study-public-saas-10k-2026",
    title: "How 53 SaaS Companies Disclose SSP in Their 10-Ks",
    subtitle: "We read the revenue notes of 53 US-listed software companies. Few name an ASC 606 estimation method, and none discloses how allocations are rounded.",
    publishedAt: "October 15, 2026",
    updatedAt: "October 15, 2026",
    readTime: "9 min read",
    author: {
      name: "Soluqube Editorial",
      role: "Technical Accounting Content",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["ASC 606", "Standalone Selling Price", "SSP Disclosure", "10-K Analysis", "Original Research"],
    targetQuery: "standalone selling price disclosure",
    definitionAnchor: "We coded the latest Form 10-K of 53 US-listed SaaS companies. Only 9 (17%) name an ASC 606-10-32-34 estimation technique, 22 (42%) describe an observable-price-first approach, 7 (13%) set SSP as a range, 6 (11%) do not mention SSP, and none discloses how allocated amounts are rounded or which obligation absorbs a residual cent.",
    excerpt: "An original data study of 53 public SaaS 10-Ks: how companies describe standalone selling price, which ASC 606 estimation techniques they name, who uses ranges and stratification, how long the SSP passage runs, and why no filer discloses a rounding policy. The full dataset is free to download as CSV.",
    toc: [
      { id: "key-findings", label: "Key findings" },
      { id: "methodology", label: "Methodology" },
      { id: "finding-1-how-companies-describe-where-ssp-comes-from", label: "Finding 1: Where SSP comes from" },
      { id: "finding-2-the-named-techniques-are-rare", label: "Finding 2: Named techniques are rare" },
      { id: "finding-3-ranges-and-stratification", label: "Finding 3: Ranges and stratification" },
      { id: "finding-4-length-services-and-size", label: "Finding 4: Length, services and size" },
      { id: "finding-5-the-residual-cent-no-one-mentions", label: "Finding 5: The residual cent" },
      { id: "what-this-means-for-saas-controllers-preparing-ssp-documentation", label: "What this means for controllers" },
      { id: "download-the-data", label: "Download the data" },
      { id: "about-soluqube", label: "About Soluqube" }
    ],
    faqs: [
      {
        question: "How many public SaaS companies name an SSP estimation method in their 10-K?",
        answer: "In our sample of 53 US-listed SaaS and software companies, 9 (17%) name or describe one of the three techniques in ASC 606-10-32-34: adjusted market assessment (1 company), expected cost plus a margin (4) or the residual approach (5). Another 16 (30%) cite market inputs such as competitor pricing or industry data without naming a method."
      },
      {
        question: "Do SaaS companies disclose how they round revenue allocations?",
        answer: "None of the 53 filings we reviewed describes a rounding convention or says which performance obligation absorbs a residual cent. The amounts are immaterial and ASC 606 does not address rounding, so the convention lives in each company's internal policies and spreadsheets, if it is written down at all."
      },
      {
        question: "Can I reuse the SSP disclosure dataset?",
        answer: "Yes. The CSV at soluqube.com/data/ssp-disclosure-study-2026.csv has one row per company with the filing URL, revenue band, SSP classification, technique flags, professional-services treatment, critical audit matter flag, passage word count and a short verbatim quote. It is free to reuse with attribution to Soluqube; report coding errors and we will correct the file."
      }
    ],
    engineVerified: false,
    content: `
Standalone selling price (SSP) drives every multi-element revenue allocation under ASC 606, and auditors regularly ask controllers to support it. How much do public SaaS companies tell investors about it? We read the latest Form 10-K of 53 US-listed software companies and coded what each says. (For the definition, see our [glossary entry on standalone selling price](/glossary/standalone-selling-price).)

_Data compiled 15 October 2026 from SEC EDGAR._

## Key findings

- **Few name an estimation method.** Only 9 of 53 companies (17%) name or describe one of the three techniques listed in ASC 606-10-32-34: adjusted market assessment (1 company), expected cost plus a margin (4) or the residual approach (5).
- **"Observable first" is the most common description.** 22 of 53 (42%) say they use observable standalone prices where available and estimate SSP otherwise. Another 9 (17%) base SSP on pricing objectives and customer or market factors, without saying observable prices come first.
- **Ranges and stratification are the minority.** 7 of 53 (13%) say they set SSP as a range, and 5 (9%) say a single product can have more than one SSP, stratified by customer size, geography, channel or tier.
- **The typical SSP passage is about 78 words.** Among the 47 that discuss SSP, the median passage is 78 words (range 15–280). Six companies (11%) do not mention SSP in their 10-K at all.
- **No company discloses a rounding policy.** 0 of 53 describe how allocated amounts are rounded or which obligation absorbs a residual cent. The auditor's critical audit matters reference SSP at 10 of 53 (19%).

## Methodology

**Sample.** 53 US-listed SaaS and software companies, chosen by hand (not random), with latest-fiscal-year revenue from $142 million to $41.5 billion per XBRL data: 7 large (at least $5B), 26 mid-size ($1B to $5B) and 20 small (under $1B). Four companies on our original list were dropped: Smartsheet, Alteryx and Zuora have been taken private and have no current 10-K, and monday.com files a Form 20-F. Domo appears in EDGAR as Huckleberry.ai, Inc., and BigCommerce as Commerce.com, Inc.

**Filings.** For each company we used the most recent Form 10-K on EDGAR as of 15 October 2026. Filing dates run from 29 January to 11 September 2026, and fiscal years end between December 2025 and July 2026.

**Coding.** We extracted every paragraph mentioning "standalone selling price", "stand-alone selling price" or "SSP", then read each revenue note by hand. The "SSP passage" is the text describing relative-SSP allocation and how SSP is determined; it excludes use-of-estimates lists, auditor reports, remaining-performance-obligation and contract-modification text. Paylocity is the only company whose SSP language appears in MD&A and not in the notes, so we used that passage. Each quote in the dataset was checked by script against the filing text.

**Limits.** One analyst coded the filings, and categories such as "observable first" involve judgement; the dataset keeps the exact wording so readers can check. Silence in a 10-K means a practice is not disclosed, not that no policy exists, and single-obligation businesses have little reason to discuss SSP. With seven large companies, size comparisons are directional only.

For scale: EDGAR full-text search returns 1,062 Form 10-K documents filed in the 12 months to 15 October 2026 containing "standalone selling price" (418 more use "stand-alone").

## Finding 1: How companies describe where SSP comes from

ASC 606-10-32-32 defines SSP as the price at which an entity would sell a promised good or service separately to a customer. When that price is not directly observable, the standard requires an estimate that makes as much use of observable inputs as possible. We put each 10-K into one of five groups.

| How the 10-K describes SSP | Companies | Share (n=53) |
|---|---|---|
| Observable price first; estimate when unavailable | 22 | 42% |
| Based on observable, historical or actual prices (no fallback described) | 9 | 17% |
| Estimated from pricing objectives and market or customer factors | 9 | 17% |
| Relative-SSP allocation stated; method not described | 7 | 13% |
| No SSP disclosure | 6 | 11% |

The "pricing objectives" group uses wording that recurs from filing to filing. Box, for example, determines SSP "based on our overall pricing objectives, taking into consideration discounting practices, the size and volume of our transactions, the customer demographic, the geographic area where services are sold, price lists". Almost the same list appears in the filings of Salesforce and nCino.

At the other end, Twilio says: "No significant judgments are required in determining whether products and services are considered distinct performance obligations and should be accounted for separately versus together, or to determine the stand-alone selling price."

## Finding 2: The named techniques are rare

ASC 606-10-32-34 lists three suitable estimation methods. Few filers name any of them.

| Technique | Companies | Share (n=53) | Who |
|---|---|---|---|
| Adjusted market assessment (named) | 1 | 2% | MongoDB |
| Expected cost plus a margin | 4 | 8% | GitLab, MongoDB, SentinelOne (named); Braze (described) |
| Residual approach | 5 | 9% | Appian, BlackLine, C3.ai, Dynatrace, Guidewire |
| Any of the three | 9 | 17% | |

Sixteen more (30%) refer to market inputs such as market conditions, competitor pricing or industry data without naming a method. Every company that uses the residual approach applies it to licenses or subscriptions whose prices it calls highly variable or uncertain. That matches the narrow conditions in ASC 606-10-32-34(c).

C3.ai is the only company in the sample that discusses what happens when the residual method fails: "If applying the residual approach results in zero or very little consideration being allocated to the performance obligation, the Company considers all reasonably available data to determine an appropriate allocation of the transaction price."

GitLab explains why it needs cost-plus: the license and subscription components of its self-managed offering "are never sold separately".

## Finding 3: Ranges and stratification

| Practice | Companies | Share (n=53) |
|---|---|---|
| SSP set as a range | 7 | 13% |
| More than one SSP per product (stratified) | 5 | 9% |
| Names at least one segmentation dimension | 23 | 43% |
| of which geography or region | 11 | 21% |
| of which customer size, deal or contract size, or volume | 14 | 26% |
| of which number of users or endpoints | 6 | 11% |

The seven range users are Salesforce, Workday, Atlassian, Datadog, Elastic, PagerDuty and nCino. Paycom and Paylocity use a range test of their own: they say the price charged falls within the range normally charged, so it represents SSP.

Two of the range disclosures are unusually specific. PagerDuty sets a threshold for calling a price observable: "To have observable inputs, the Company requires that a substantial majority of the stand-alone selling prices for a product offering fall within a pricing range." Elastic states what it does when a price falls outside the range: "If one of the performance obligations is outside of the SSP range, the Company allocates the transaction price considering the midpoint of the SSP range."

Rapid7 describes its statistic: historical data "is aggregated and analyzed by geographic location and selling method to establish a median or average price."

## Finding 4: Length, services and size

Among the 47 companies that discuss SSP, the median passage is 78 words. Appian has the longest at 280 words: a separate rule for each of four offerings, using a residual approach for cloud and license subscriptions. The shortest is BILL at 15 words.

| Size band | Companies | Mention SSP | Median SSP words | Residual approach | SSP in auditor CAM |
|---|---|---|---|---|---|
| Large (≥ $5B) | 7 | 7 | 71 | 0 | 2 |
| Mid ($1B–$5B) | 26 | 22 | 75.5 | 2 | 2 |
| Small (< $1B) | 20 | 18 | 101.5 | 3 | 6 |

Smaller companies wrote longer SSP passages, and auditors cited SSP in a critical audit matter at 6 of the 20 small companies. The large group has only seven members, so treat these differences as a pattern worth testing, not a conclusion.

On professional services, 24 of 53 companies (45%) say implementation or professional services are distinct performance obligations. Another 16 (30%) do not say either way. Six treat them otherwise, for example as not distinct from the subscription (BILL, Commerce.com, most of Q2), as set-up fees creating a material right (Paycom, Paylocity) or as an option accounted for when exercised (Workiva). Of the remaining seven, five have a single performance obligation and two decide case by case.

## Finding 5: The residual cent no one mentions

Relative-SSP allocation seldom produces whole cents. Rounding each line separately can leave the allocated amounts a cent above or below the transaction price. None of the 53 filings describes a rounding convention or says which obligation absorbs that difference. The revenue-adjacent uses of "rounding" we found are presentation notes, such as "totals may not sum due to rounding".

That is no criticism: the amounts are immaterial and ASC 606 is silent on rounding. It does mean each company's convention lives only in its internal policies and spreadsheets, if it is written down at all. Our [guide to SSP allocation rounding](/blog/ssp-allocation-rounding-residual-cent-asc-606) works through where the cent goes and how to write the rule down.

## What this means for SaaS controllers preparing SSP documentation

The 10-K is a summary; the support behind it is what the auditor tests. The filings point to five things worth having in your SSP file:

1. **Name the method for each obligation.** If prices are observable, state the test (PagerDuty's "substantial majority within a range" is one). If not, name the 32-34 technique and its inputs.
2. **Write down the range logic.** How ranges are set, how often they are refreshed, and what happens outside them (Elastic's midpoint rule is the clearest example).
3. **Stratify only where the data supports it.** Geography, deal size and user count are the dimensions filers name most; each stratum needs enough transactions to stand on its own.
4. **Record the residual-approach conditions.** Why the price is highly variable or uncertain, and what happens if the residual is at or near zero.
5. **Settle rounding in writing.** Choose a convention, such as largest-share or final-period absorption, and apply it consistently, so the allocated amounts tie to the transaction price and a reviewer can follow the arithmetic. The free [SSP allocation calculator](/tools/ssp-allocation-calculator) shows the residual cent for any bundle you enter.

## Download the data

One row per company: fiscal year, filing URL, revenue band, SSP classification, technique flags, professional-services treatment, whether a critical audit matter references SSP, passage word count and a verbatim quote (40 words or fewer). Download the CSV: [ssp-disclosure-study-2026.csv](https://soluqube.com/data/ssp-disclosure-study-2026.csv). Free to reuse with attribution to Soluqube; report coding errors and we will correct the file.

## About Soluqube

Soluqube is a revenue allocation and schedule engine for SaaS finance teams. It allocates the transaction price on a relative-SSP basis using integer arithmetic and rounds to cents. The final period absorbs the remainder, so each schedule ties back to the transaction price, and exports are hashed so they can be reproduced. Each obligation links to the page and excerpt of its source clause. We are offering a free design-partner seat to a few controllers preparing SSP and allocation support for this year's audit; apply through the [design partner program](/design-partners).

_Soluqube Editorial. This analysis is based on public SEC filings and is not accounting advice. Company names are used only to identify the filings reviewed._
    `
  },
  {
    slug: "why-finance-teams-reject-black-box-ai",
    title: "Why Finance Teams Reject Black-Box AI in Revenue Accounting",
    subtitle: "Controllers and QoE teams reject black-box AI: their name is on the workpapers. What passes an audit: confirmed inputs, clause evidence, integer math.",
    publishedAt: "October 16, 2026",
    updatedAt: "October 16, 2026",
    readTime: "4 min read",
    author: {
      name: "Soluqube Editorial",
      role: "Technical Accounting Content",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["ASC 606", "Audit Evidence", "SSP Allocation", "Outsourced Accounting", "Quality of Earnings"],
    targetQuery: "black box AI revenue recognition audit",
    definitionAnchor: "Finance teams reject black-box AI for revenue recognition because an auditor needs each allocation traced to a contract clause, a confirmed input and a calculation that re-runs to the same cent.",
    excerpt: "Controllers and QoE teams reject black-box AI: their name is on the workpapers. What passes an audit: confirmed inputs, clause evidence, integer math.",
    toc: [
      { id: "the-audit-problem-with-black-boxes", label: "The Audit Problem with Black Boxes" },
      { id: "black-box-vs-evidence-trail", label: "Black Box vs. Evidence Trail" },
      { id: "built-for-the-teams-doing-the-work", label: "Built for the Teams Doing the Work" },
      { id: "worked-example-what-ties-out-means", label: "Worked example: what \"ties out\" means" },
      { id: "see-it-on-a-real-contract", label: "See it on a real contract" }
    ],
    engineVerified: true,
    content: `
Every week, another platform promises to "automate technical accounting with AI." The pitch usually suggests an LLM can read complex enterprise agreements, suggest revenue allocations, and remove the friction from the close.

Yet when experienced Controllers, outsourced accounting partners, and Quality of Earnings (QoE) analysts evaluate these tools, they stay with spreadsheets.

It isn't resistance to software. It's accountability: their name is on the workpapers.

When an auditor asks how an allocation was determined, the software vendor isn't in the room. The accounting team is.

## The Audit Problem with Black Boxes

Whether conducting an annual audit or performing sell-side QoE analysis, accounting teams run into the same barrier when tools rely on unstructured machine learning:

- **Unverifiable Rationale:** "The AI model suggested this split" is not an acceptable audit workpaper.
- **Re-Verification Overhead:** If an analyst has to re-read the entire contract to verify that the software didn't miss a clause or misstate an obligation, the software hasn't saved time—it has simply added another step.
- **Reproducibility Risks:** If a calculation cannot be re-run with identical results down to the cent, it cannot serve as a reliable audit schedule.

## Black Box vs. Evidence Trail

For outsourced firms handling dozens of client closes, the requirement isn't an "autonomous agent." It is structured software that preserves the evidence trail:

| Black-Box Tool | Verifiable Evidence Trail |
|---|---|
| **Statistical Suggestions:** Guesses allocations based on pattern matching. | **Human-Confirmed Inputs:** The user reviews and confirms extracted obligations and prices before calculation. |
| **Detached Numbers:** Displays revenue schedules without clear ties to the agreement. | **Page & Excerpt Provenance:** Quotes the obligation and price directly, highlighted on the source document page. |
| **Opaque Schedules:** Hard to reconcile or audit independently. | **Integer Math:** Relative-SSP calculations rounded to cents that tie out consistently every time. |
| **Unanchored Exports:** Workbooks that cannot be verified for post-export tampering. | **Hashed Workpapers:** Exported workbooks that an auditor can independently inspect and re-run. |

## Built for the Teams Doing the Work

Outsourced accounting practices and transaction advisory teams don't need tools that pretend to replace professional judgment.

They need tools that remove manual transcription, highlight the contract evidence clearly, and produce clean, defensible workpapers their clients' auditors can verify immediately.

## Worked example: what "ties out" means

A $100,000 contract bundles implementation (SSP $30,000), premium support (SSP $30,000) and a platform subscription (SSP $120,000). Total SSP is $180,000, so the $80,000 discount is spread in proportion. Round each line on its own and the three allocations sum to $100,000.01. Soluqube's engine allocates $16,666.67, $16,666.67 and $66,666.66, which sums to exactly $100,000.00, and the exported workbook carries the page and excerpt for each obligation plus a SHA-256 hash. Re-run it and you get the same cents. Full walk-through: [SSP allocation rounding and the residual cent](https://soluqube.com/blog/ssp-allocation-rounding-residual-cent-asc-606). Try your own numbers in the [free SSP allocation calculator](https://soluqube.com/tools/ssp-allocation-calculator).

## See it on a real contract

Download the [one-page sample contract (PDF)](https://soluqube.com/samples/soluqube-ssp-sample.pdf), then open it in the [Soluqube app](https://app.soluqube.com/) to see confirmed inputs, page-and-excerpt evidence and the hashed export on a schedule you can re-run. Outsourced firms and QoE teams can [join the design-partner list](https://soluqube.com/design-partners) for a free 3-contract audit-defense workpaper.
    `
  }
];
