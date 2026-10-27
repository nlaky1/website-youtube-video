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

What Soluqube does: for the contract terms you confirm, it produces the relative-SSP allocation and the full-term schedule in integer arithmetic, with clause evidence (page, verbatim excerpt and a highlight on the cited line) per obligation and a hashed workpaper. Example 2 above, once you have decided it is prospective, is a new allocation and schedule over the remaining term, which the engine can produce.

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

For each performance obligation, Soluqube keeps the page, the verbatim excerpt and a highlight on the cited line, drawn from the PDF's text layer for uploaded PDFs, so a reviewer can go straight to the paragraph instead of searching a 40-page agreement. You confirm the obligations and prices; the engine does the allocation and schedule. The [clause evidence guide](/blog/contract-pdf-bounding-box-clause-grounding-auditors) covers what to capture for non-standard clauses.

---

## What do hashes and Merkle roots add?

A SHA-256 hash is a fingerprint of a file: change one cell and the hash changes. A Merkle root goes one step further, hashing rows in pairs up to a single root, so a reviewer can check one row against the root without re-hashing everything.

Soluqube hashes the exported workpaper and computes a Merkle root on it. A reviewer who re-runs the same inputs gets identical output and the same hash, and can see if a delivered file was altered afterwards.

What a hash does not do: it does not show that the SSP estimate is supportable, that the obligations were identified correctly, or that the right contract was used. It is integrity, not correctness.

---

## What goes in the package?

* The contract terms you confirmed, with clause evidence (page, verbatim excerpt and a highlight on the cited line) per obligation.
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
    definitionAnchor: "Clause evidence links each line of an ASC 606 allocation or schedule to the contract clause it came from, recorded as the page number and the clause excerpt. A reviewer can then trace an obligation, its price and its term to the signed contract without searching the whole document. In Soluqube you confirm the obligations and prices; each one keeps its page, verbatim excerpt and a highlight on the cited line.",
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
        answer: "Not reliably. Extraction from real contracts is heuristic and makes mistakes on non-standard documents, so a person should confirm the obligations, prices and terms. In Soluqube you confirm them; the engine does the allocation and schedule, and each obligation keeps its page, verbatim excerpt and a highlight on the cited line."
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

An Excel workpaper and a JSON evidence pack with the page and verbatim excerpt for every obligation (the in-app viewer adds a highlight on the cited line for uploaded PDFs with a text layer), the [relative-SSP allocation](/blog/ssp-allocation-rounding-residual-cent-asc-606), the full schedule and SHA-256 hashes on the export. The [audit evidence guide](/blog/pcaob-as-3101-audit-workpapers-merkle-proofs) explains what the hashes do and do not prove. If you are comparing tools that only extract terms into a checklist, see [Soluqube vs Klarity](/soluqube-vs-klarity), or try it on your own contracts through the [design partner program](/design-partners).
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
| **Source trace** | Summaries without clause references | Clause evidence (page, verbatim excerpt and line highlight) per obligation |
| **Evidence** | Hard to re-perform | SHA-256 hashed export with a Merkle root |
| **Standards** | General text | ASC 606; Ind AS 115 with GST isolation for INR contracts |

---

## What does Soluqube do?

1. **Relative-SSP allocation** in integer arithmetic, with a written rule for the residual cent ([how the residual is handled](/blog/ssp-allocation-rounding-residual-cent-asc-606)).
2. **A full-term schedule** that ties to the contract value and ends at a $0.00 deferred balance.
3. **Clause evidence (page, verbatim excerpt and a highlight on the cited line)** for each obligation; you confirm the obligations and prices.
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
| **Clause evidence** | Memo and reference fields | Page, verbatim excerpt and line highlight per obligation |
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
    updatedAt: "October 19, 2026",
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
Each obligation keeps the page, the verbatim excerpt and a highlight on the cited line, drawn from the PDF's text layer for uploaded PDFs. You confirm the obligations and stated prices; the engine does the allocation and schedule.

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

For premiums, SSP ranges, the residual-approach conditions and Ind AS 115, continue with our [complete guide to SSP allocation under ASC 606](/blog/asc-606-ssp-allocation-guide), which builds on this 3-element example.

For a gross vs net question that comes before the allocation, see [principal vs agent under ASC 606](/blog/principal-vs-agent-asc-606-gross-vs-net-worked-example). To vary a schedule yourself, use the [schedule simulator](/audit), or bring three of your own contracts to the [design partner program](/design-partners).
    `
  },
  {
    slug: "best-maxio-alternatives-contract-revenue-recognition",
    title: "Best Maxio Alternatives for ASC 606 Revenue Recognition",
    subtitle: "Maxio, Soluqube, Trullion, Leapfin and RightRev compared for ASC 606: source of truth, SSP allocation, rounding policy, Ind AS 115 and how each is bought.",
    publishedAt: "October 12, 2026",
    updatedAt: "October 19, 2026",
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
* **Strengths**: clause evidence (page, verbatim excerpt and a highlight on the cited line) per obligation, ASC 606 and Ind AS 115 with GST isolation for INR contracts, hashed evidence workpapers, a free 3-contract workpaper to start.
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
     CRM quote line items                  Clause evidence (page, excerpt, line highlight)
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
| **Clause evidence per obligation** | Not advertised | AI extraction (check vendor) | Not applicable | **Page, verbatim excerpt and line highlight** |
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

Whichever tool you choose, the method it has to reproduce is the one in our [guide to ASC 606 SSP allocation](/blog/asc-606-ssp-allocation-guide).
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

Each obligation keeps the page, verbatim excerpt and a highlight on the cited line (uploaded text-layer PDFs), and the export is SHA-256 hashed with a Merkle root computed on it. The output is a workpaper and CSV you review and post; there is no live ERP sync.

---

## Zuora RevPro vs Soluqube

| Dimension | Zuora RevPro | Soluqube |
| :--- | :--- | :--- |
| **Deployment** | Implementation partner typical (timeline not published) | **Free 3-contract workpaper in 48 hours; self-serve sandbox** |
| **Input** | Structured order and billing data | **Contract terms you confirm** |
| **Clause trace** | Reference fields | **Clause evidence (page, verbatim excerpt and line highlight)** |
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
    updatedAt: "October 19, 2026",
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
The residual cent is the last step of relative SSP allocation; if you need the steps before it (estimating SSP, spreading the discount), start with [how SSP allocation works under ASC 606](/blog/asc-606-ssp-allocation-guide).

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
    updatedAt: "October 19, 2026",
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

The allocation and schedule run in integer arithmetic, rounded to cents, with a written residual-cent rule and the final period absorbing the remainder so each obligation's deferred balance reaches $0.00. Each obligation carries the page and the verbatim clause (for uploaded text-layer PDFs the app also highlights the cited line), and exports are SHA-256 hashed so a reviewer can confirm the file has not changed. For how the residual cent is handled, see the [SSP rounding guide](/blog/ssp-allocation-rounding-residual-cent-asc-606), and for the wider standard, the [ASC 606 hub](/asc-606).

Once gross or net has fixed the transaction price, the next step is splitting it across obligations, covered in [SSP allocation under ASC 606, step by step](/blog/asc-606-ssp-allocation-guide).

To try it on a sample contract, open the [Soluqube sandbox](https://app.soluqube.com/). Finance teams who want to run their own contracts with us for 60 days can apply to the [design partner program](/design-partners).
    `
  },
  {
    slug: "ssp-disclosure-study-public-saas-10k-2026",
    title: "How 53 SaaS Companies Disclose SSP in Their 10-Ks",
    subtitle: "We read the revenue notes of 53 US-listed software companies. Few name an ASC 606 estimation method, and none discloses how allocations are rounded.",
    publishedAt: "October 15, 2026",
    updatedAt: "October 19, 2026",
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

If your own SSP note is thin, our [guide to SSP allocation methods and ranges](/blog/asc-606-ssp-allocation-guide) sets out the three estimation methods and the range policy these filers rarely describe.

## About Soluqube

Soluqube is a revenue allocation and schedule engine for SaaS finance teams. It allocates the transaction price on a relative-SSP basis using integer arithmetic and rounds to cents. The final period absorbs the remainder, so each schedule ties back to the transaction price, and exports are hashed so they can be reproduced. Each obligation links to the exact page and the verbatim clause; for uploaded PDFs with a text layer, the app also highlights the cited line. We are offering a free design-partner seat to a few controllers preparing SSP and allocation support for this year's audit; apply through the [design partner program](/design-partners).

_Soluqube Editorial. This analysis is based on public SEC filings and is not accounting advice. Company names are used only to identify the filings reviewed._
    `
  },
  {
    slug: "why-finance-teams-reject-black-box-ai",
    title: "Why Finance Teams Reject Black-Box AI in Revenue Accounting",
    subtitle: "Controllers and QoE teams reject black-box AI: their name is on the workpapers. What passes an audit: confirmed inputs, clause evidence, integer math.",
    publishedAt: "October 16, 2026",
    updatedAt: "October 19, 2026",
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
| **Detached Numbers:** Displays revenue schedules without clear ties to the agreement. | **Page & Excerpt Provenance:** Quotes the obligation and price directly, with the cited line highlighted on the source page (uploaded PDFs with a text layer). |
| **Opaque Schedules:** Hard to reconcile or audit independently. | **Integer Math:** Relative-SSP calculations rounded to cents that tie out consistently every time. |
| **Unanchored Exports:** Workbooks that cannot be verified for post-export tampering. | **Hashed Workpapers:** Exported workbooks that an auditor can independently inspect and re-run. |

## Built for the Teams Doing the Work

Outsourced accounting practices and transaction advisory teams don't need tools that pretend to replace professional judgment.

They need tools that remove manual transcription, highlight the contract evidence clearly, and produce clean, defensible workpapers their clients' auditors can verify immediately.

## Worked example: what "ties out" means

A $100,000 contract bundles implementation (SSP $30,000), premium support (SSP $30,000) and a platform subscription (SSP $120,000). Total SSP is $180,000, so the $80,000 discount is spread in proportion. Round each line on its own and the three allocations sum to $100,000.01. Soluqube's engine allocates $16,666.67, $16,666.67 and $66,666.66, which sums to exactly $100,000.00, and the exported workbook carries the page and excerpt for each obligation plus a SHA-256 hash. Re-run it and you get the same cents. Full walk-through: [SSP allocation rounding and the residual cent](https://soluqube.com/blog/ssp-allocation-rounding-residual-cent-asc-606). Try your own numbers in the [free SSP allocation calculator](https://soluqube.com/tools/ssp-allocation-calculator).

To see what a re-performable allocation looks like in practice, follow the contract in our [worked SSP allocation guide](/blog/asc-606-ssp-allocation-guide).

## See it on a real contract

Download the [one-page sample contract (PDF)](https://soluqube.com/samples/soluqube-ssp-sample.pdf), then open it in the [Soluqube app](https://app.soluqube.com/) to see confirmed inputs, page-and-excerpt evidence and the hashed export on a schedule you can re-run. Outsourced firms and QoE teams can [join the design-partner list](https://soluqube.com/design-partners) for a free 3-contract audit-defense workpaper.
    `
  },
  {
    slug: "ssp-allocation-example-saas-subscription-implementation",
    title: "How do you allocate SSP to subscription + implementation?",
    subtitle: "A $126,000, 36-month SaaS contract with a platform subscription and implementation, allocated by relative SSP, with the full monthly schedule.",
    publishedAt: "October 18, 2026",
    updatedAt: "October 19, 2026",
    readTime: "4 min read",
    author: {
      name: "Soluqube Editorial",
      role: "Technical Accounting Content",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["ASC 606", "SSP Allocation", "Worked Example", "Implementation Services", "Subscription Revenue"],
    targetQuery: "SSP allocation example SaaS subscription implementation",
    definitionAnchor: "In a SaaS bundle, relative standalone selling price allocation splits the contract price between the subscription and implementation in proportion to what each would sell for on its own, so any discount is shared by both.",
    excerpt: "A $126,000 bundle with $150,000 of total SSP: allocate $110,880.00 to the subscription and $15,120.00 to implementation, then schedule 36 equal months.",
    toc: [
      { id: "what-is-the-contract-in-this-example", label: "What is the contract in this example?" },
      { id: "how-is-the-126000-allocated-by-relative-ssp", label: "How is the $126,000 allocated by relative SSP?" },
      { id: "what-does-the-36-month-revenue-schedule-look-like", label: "What does the 36-month revenue schedule look like?" },
      { id: "why-is-there-no-remainder-month-in-this-schedule", label: "Why is there no remainder month in this schedule?" },
      { id: "what-does-this-example-not-cover", label: "What does this example not cover?" },
      { id: "how-can-you-re-perform-it-on-your-own-contracts", label: "How can you re-perform it on your own contracts?" }
    ],
    faqs: [
      {
        question: "Is the $24,000 discount allocated only to implementation?",
        answer: "Not in this example. ASC 606-10-32-36 to 32-38 require a discount to be allocated proportionately unless observable evidence shows it relates entirely to one or more, but not all, obligations. With no such evidence here, both obligations share it in proportion to their SSPs."
      },
      {
        question: "Why is implementation recognised in month 1?",
        answer: "The example treats implementation as a distinct service satisfied at a point in time, and the engine places point-in-time obligations in month 1. In practice, timing follows when control transfers, which is a judgement for the entity and its auditor."
      },
      {
        question: "Does every SaaS schedule need a final-month remainder?",
        answer: "No. A remainder month is only needed when the allocated amount does not divide evenly into whole cents across the term. Here $110,880 / 36 = $3,080 exactly, so every month is equal."
      }
    ],
    engineVerified: true,
    content: `
A three-year SaaS deal that bundles a platform subscription with an implementation service is one of the most common Step 4 allocations a revenue team performs. This worked example takes a $126,000 contract, allocates it by relative standalone selling price (SSP) under ASC 606-10-32-28 to 32-41, and lays out the 36-month schedule. Every figure below comes from a run of the Soluqube engine, so you can re-perform it line by line.

This is a two-obligation case; [our SSP allocation guide](/blog/asc-606-ssp-allocation-guide) runs the same method on a three-obligation, 36-month contract with a premium support tier.

## What is the contract in this example?

The customer signs a $126,000 contract for 36 months starting November 2026. It contains two performance obligations: a platform subscription recognised ratably, with an SSP of $132,000, and an implementation service recognised at a point in time in month 1, with an SSP of $18,000. Total SSP is $150,000.

The stated price is $24,000 below the sum of the standalone selling prices. Nothing in the facts suggests the discount relates to only one obligation, so under ASC 606-10-32-36 to 32-38 it is spread proportionately across both. For whether implementation is distinct from the subscription in the first place, see ASC 606-10-25-19 to 25-22; this example assumes it is.

## How is the $126,000 allocated by relative SSP?

Each obligation receives the transaction price multiplied by its SSP over total SSP. The platform subscription gets $126,000 × 132,000 / 150,000, which is $110,880.00. Implementation gets $126,000 × 18,000 / 150,000, which is $15,120.00. The two allocations sum to $126,000.00, so the allocation ties to the transaction price.

Transaction price: $126,000.00

| Obligation | SSP | Share | Allocated |
|---|---|---|---|
| Platform subscription | $132,000 | 132,000 / 150,000 | $110,880.00 |
| Implementation | $18,000 | 18,000 / 150,000 | $15,120.00 |
| Total | $150,000 | | $126,000.00 |

The shares are written as SSP over total SSP on purpose. Rounded percentages hide the cents; the ratio lets a reviewer re-perform the multiplication exactly. For the method itself, see the [relative SSP method](/glossary/relative-ssp-method) and [standalone selling price](/glossary/standalone-selling-price) glossary entries.

## What does the 36-month revenue schedule look like?

November 2026 recognises $18,200.00: the full $15,120.00 implementation allocation plus the first $3,080.00 of platform revenue. Every following month recognises $3,080.00 of platform revenue through October 2029. The unrecognised balance falls from $107,800.00 after month 1 to $0.00 after month 36, and total revenue is $126,000.00.

| Month | Platform | Implementation | Revenue | Deferred |
|---|---|---|---|---|
| Nov 2026 | $3,080.00 | $15,120.00 | $18,200.00 | $107,800.00 |
| Dec 2026 | $3,080.00 | — | $3,080.00 | $104,720.00 |
| Jan 2027 | $3,080.00 | — | $3,080.00 | $101,640.00 |
| ... | $3,080.00 every month | | | |
| Aug 2029 | $3,080.00 | — | $3,080.00 | $6,160.00 |
| Sep 2029 | $3,080.00 | — | $3,080.00 | $3,080.00 |
| Oct 2029 | $3,080.00 | — | $3,080.00 | $0.00 |
| Total | | | $126,000.00 | |

"Deferred" here is the transaction price not yet recognised. Whether it sits on the balance sheet as a contract liability depends on billing and payment, which ASC 606-10-45-1 to 45-4 govern and this example does not model.

## Why is there no remainder month in this schedule?

Because $110,880 divided by 36 is exactly $3,080, the subscription spreads into 36 equal whole-cent months and nothing is left over. The last month does not need to absorb a remainder. That is a property of these particular numbers, not of the method, and most real contracts will not divide this cleanly.

Compare the [residual-cent worked example](/blog/ssp-allocation-rounding-residual-cent-asc-606). There, the relative-SSP allocations end in repeating decimals, one obligation absorbs the rounding residual, and the ratable schedule gives the final month the leftover cents so the balance still reaches $0.00. A written policy should cover both cases, even when a given contract only exercises one of them.

## What does this example not cover?

This example is deliberately narrow. The engine applies one contract term to every obligation, recognises point-in-time obligations in month 1 with no delivery-date input, and spreads ratable obligations in equal monthly amounts with no daily proration. It has no billing or contract-asset modelling, no usage-based or variable consideration, and no contract modification accounting.

If your implementation goes live in month 4, or the subscription starts mid-month, the timing in the schedule above will differ from yours. The allocation step itself does not change.

## How can you re-perform it on your own contracts?

Run your own subscription and implementation bundle through the [SSP allocation calculator](/tools/ssp-allocation-calculator) to see the allocation and the monthly schedule. Or send us your three hardest contracts for a [free 3-contract workpaper](https://soluqube.com/design-partners?utm_source=blog&utm_medium=community&utm_campaign=20261017-worked-examples): the relative-SSP allocation, the schedule that ties to the cent, and a hashed export you can re-run.
    `
  },
  {
    slug: "ssp-allocation-example-multi-year-ramp-pricing",
    title: "How is a multi-year SaaS deal with a price ramp recognised?",
    subtitle: "A $270,000 three-year SaaS ramp deal ($60k, $90k, $120k) treated as one series obligation: the ratable schedule, and contract assets vs liabilities.",
    publishedAt: "October 18, 2026",
    updatedAt: "October 19, 2026",
    readTime: "4 min read",
    author: {
      name: "Soluqube Editorial",
      role: "Technical Accounting Content",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["ASC 606", "Ramp Pricing", "Series Obligation", "Contract Assets", "Worked Example"],
    targetQuery: "ASC 606 ramp pricing revenue recognition example",
    definitionAnchor: "A ramp deal charges a rising price each contract year for the same stand-ready service, and when the service is a single series obligation the total transaction price is recognised ratably across the whole term rather than following the invoices.",
    excerpt: "A $60,000 / $90,000 / $120,000 ramp recognised at $7,500.00 a month, and why the invoices create a contract liability, then a contract asset, each year.",
    toc: [
      { id: "what-is-the-contract-in-this-example", label: "What is the contract in this example?" },
      { id: "how-does-the-engine-recognise-a-270000-ramp", label: "How does the engine recognise a $270,000 ramp?" },
      { id: "how-do-billing-and-revenue-diverge-on-a-ramp", label: "How do billing and revenue diverge on a ramp?" },
      { id: "when-does-a-ramp-not-mean-straight-line-revenue", label: "When does a ramp not mean straight-line revenue?" },
      { id: "what-does-this-example-not-cover", label: "What does this example not cover?" },
      { id: "how-can-you-check-your-own-ramp-deals", label: "How can you check your own ramp deals?" }
    ],
    faqs: [
      {
        question: "Does revenue on a ramp deal follow the invoices?",
        answer: "Not when the subscription is one series obligation delivering the same service each period. Revenue follows the transfer of the service over time, so it is recognised ratably, and the gap between invoices and revenue appears as a contract asset or contract liability."
      },
      {
        question: "Is a price ramp variable consideration?",
        answer: "In this example the ramp amounts are fixed in the contract, so the $270,000 is fixed consideration. Usage-based or other variable amounts, and the ASC 606-10-32-39 to 32-41 guidance on allocating them, are outside this example."
      },
      {
        question: "Why does the year-1 contract asset reach $30,000?",
        answer: "By October 2027 the entity has recognised $90,000 of revenue but billed only $60,000 under the assumed annual billing in advance. The $30,000 difference is revenue earned ahead of billing, presented as a contract asset until the year-2 invoice."
      }
    ],
    engineVerified: true,
    content: `
Ramp pricing is common in multi-year SaaS deals: the customer pays less in year 1 and more in later years for the same subscription. The invoices rise, but revenue often does not follow them. This worked example takes a three-year ramp of $60,000, $90,000 and $120,000, treats it as one series performance obligation, and shows the engine's ratable schedule alongside the contract asset and contract liability that the billing creates.

## What is the contract in this example?

The customer signs a 36-month subscription starting November 2026 with a price ramp: $60,000 in year 1, $90,000 in year 2 and $120,000 in year 3, a total of $270,000. The service is the same stand-ready platform access in every year, so the example treats it as a single performance obligation made up of a series of distinct periods.

Under ASC 606-10-25-14(b) and 25-15, a series of distinct services that are substantially the same and have the same pattern of transfer is accounted for as one performance obligation. Because there is only one obligation, the relative SSP allocation in ASC 606-10-32-28 to 32-41 assigns the full $270,000 to it; there is nothing to split.

## How does the engine recognise a $270,000 ramp?

The engine recognises the full $270,000 transaction price ratably over 36 months, at $7,500.00 every month from November 2026 to October 2029. The unrecognised balance falls from $262,500 after month 1 to $0 after month 36, and total revenue is $270,000.00, regardless of how the invoices are timed.

| Month | Revenue | Unrecognised transaction price |
|---|---|---|
| Nov 2026 | $7,500.00 | $262,500.00 |
| Dec 2026 | $7,500.00 | $255,000.00 |
| Jan 2027 | $7,500.00 | $247,500.00 |
| ... | $7,500.00 every month | |
| Aug 2029 | $7,500.00 | $15,000.00 |
| Sep 2029 | $7,500.00 | $7,500.00 |
| Oct 2029 | $7,500.00 | $0.00 |
| Total | $270,000.00 | |

The year-1 invoice is $60,000, yet year-1 revenue is higher, because a ramp is a pricing pattern, not a change in what the customer receives.

## How do billing and revenue diverge on a ramp?

When revenue runs ahead of billing, the entity holds a contract asset; when billing runs ahead, it holds a contract liability (ASC 606-10-45-1 to 45-4). On this ramp, each annual invoice creates a liability that unwinds into an asset by year end, until billing and revenue both reach $270,000 in October 2029.

The table below is **computed outside the engine; it assumes annual billing in advance at each contract-year start**. The engine does not model billing or contract assets.

| Point | Cumulative revenue | Cumulative billing | Net position |
|---|---|---|---|
| Nov 2026, after bill 1 | 7,500 | 60,000 | 52,500 contract liability |
| Oct 2027, year-1 end | 90,000 | 60,000 | 30,000 contract asset |
| Nov 2027, after bill 2 | 97,500 | 150,000 | 52,500 contract liability |
| Oct 2028, year-2 end | 180,000 | 150,000 | 30,000 contract asset |
| Nov 2028, after bill 3 | 187,500 | 270,000 | 82,500 contract liability |
| Oct 2029 | 270,000 | 270,000 | 0 |

## When does a ramp not mean straight-line revenue?

A ramp only supports one ratable schedule if the customer receives the same service every year. If later years add seats, a higher tier or extra modules, the price increase may reflect different standalone selling prices for different goods or services, and the answer changes. That is a judgement for the entity and its auditor.

In that case, the analysis returns to identifying the performance obligations and estimating standalone selling price for each (ASC 606-10-32-31 to 32-35), and the allocation may no longer put the full $270,000 on one line. Document what the customer receives each year either way.

## What does this example not cover?

The engine applies one term to every obligation, recognises point-in-time obligations in month 1 with no delivery-date input, and spreads ratable months equally with no daily proration. It has no billing or contract-asset modelling, which is why the table above sits outside it, no variable consideration and no contract modifications.

## How can you check your own ramp deals?

Model the allocation for multi-obligation deals in the [SSP allocation calculator](/tools/ssp-allocation-calculator), read how the [residual cent](/blog/ssp-allocation-rounding-residual-cent-asc-606) is handled when allocations do not divide evenly, or brush up on the [relative SSP method](/glossary/relative-ssp-method) and [standalone selling price](/glossary/standalone-selling-price). Send three ramp contracts for a [free 3-contract workpaper](https://soluqube.com/design-partners?utm_source=blog&utm_medium=community&utm_campaign=20261017-worked-examples).

How the transaction price is split before the ramp schedule is built is covered step by step in the [ASC 606 SSP allocation guide](/blog/asc-606-ssp-allocation-guide).
    `
  },
  {
    slug: "ssp-allocation-example-ind-as-115-inr-gst",
    title: "How is 18% GST handled under Ind AS 115 for a SaaS contract?",
    subtitle: "A ₹11,80,000 invoice with 18% GST: exclude GST from the transaction price, allocate ₹10,00,000 by relative SSP, and build the 12-month schedule.",
    publishedAt: "October 18, 2026",
    updatedAt: "October 19, 2026",
    readTime: "4 min read",
    author: {
      name: "Soluqube Editorial",
      role: "Technical Accounting Content",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["Ind AS 115", "GST Isolation", "SSP Allocation", "INR Contracts", "Worked Example"],
    targetQuery: "Ind AS 115 SSP allocation example GST",
    definitionAnchor: "Under Ind AS 115, GST collected on an invoice is an amount collected on behalf of the government, so it is excluded from the transaction price and only the net consideration is allocated to performance obligations by relative standalone selling price.",
    excerpt: "Remove ₹1,80,000 of GST from an ₹11,80,000 invoice, allocate ₹10,00,000 by relative SSP, and see the ₹0.02 terminal remainder land in March 2027.",
    toc: [
      { id: "what-is-the-contract-in-this-example", label: "What is the contract in this example?" },
      { id: "why-is-gst-excluded-from-the-transaction-price", label: "Why is GST excluded from the transaction price?" },
      { id: "how-is-1000000-allocated-by-relative-ssp", label: "How is ₹10,00,000 allocated by relative SSP?" },
      { id: "what-does-the-12-month-schedule-look-like", label: "What does the 12-month schedule look like?" },
      { id: "what-does-this-example-not-cover", label: "What does this example not cover?" },
      { id: "how-can-you-try-it-on-your-own-inr-contracts", label: "How can you try it on your own INR contracts?" }
    ],
    faqs: [
      {
        question: "Is GST part of revenue under Ind AS 115?",
        answer: "No. Paragraph 47 excludes amounts collected on behalf of third parties from the transaction price. Output GST is collected for the government, so it is recorded as a liability when invoiced and never passes through revenue or the allocation."
      },
      {
        question: "Why does March 2027 recognise ₹71,428.59?",
        answer: "The subscription allocation of ₹8,57,142.86 does not divide into 12 equal paisa amounts. Eleven months take ₹71,428.57 and the final month absorbs the ₹0.02 left over, so the schedule ends at exactly ₹0.00."
      },
      {
        question: "Does the same allocation apply to a US contract?",
        answer: "The relative SSP method is the same under ASC 606. A US contract in this engine carries no GST; whether sales tax is excluded depends on the entity's ASC 606-10-32-2A election."
      }
    ],
    engineVerified: true,
    content: `
Indian SaaS invoices carry GST, and the first mistake in a revenue schedule is allocating the gross invoice. This worked example takes an ₹11,80,000 invoice that includes 18% GST, removes the tax from the transaction price, allocates the net ₹10,00,000 between onboarding and a cloud subscription by relative standalone selling price (SSP), and lays out the 12-month schedule. Every figure comes from a run of the Soluqube engine.

Ind AS 115 allocates by relative SSP the same way ASC 606 does; our [step-by-step guide to SSP allocation](/blog/asc-606-ssp-allocation-guide) covers the estimation methods and the discount and premium rules this example relies on.

## What is the contract in this example?

A customer is invoiced ₹11,80,000 including 18% GST, so the net consideration is ₹10,00,000. The contract runs 12 months from April 2026 and has two performance obligations: onboarding, recognised at a point in time, with an SSP of ₹1,50,000, and a cloud subscription, recognised ratably, with an SSP of ₹9,00,000.

Ind AS 115 applies to companies covered by the Ind AS roadmap under the Companies (Indian Accounting Standards) Rules, 2015, broadly listed companies and companies above specified net-worth thresholds. Check the current MCA notification for whether your entity is in scope.

## Why is GST excluded from the transaction price?

Ind AS 115 paragraph 47 defines the transaction price as the consideration the entity expects to be entitled to, excluding amounts collected on behalf of third parties. Output GST is collected on behalf of the government, so the ₹1,80,000 is a liability, not revenue, and only ₹10,00,000 is allocated to the obligations.

The US has a parallel: ASC 606-10-32-2A lets an entity elect to exclude sales and similar taxes from the transaction price. The mechanics differ, but the outcome for this example is the same: allocate the net amount, not the invoice.

At invoice, the entry is:

| Account | Debit | Credit |
|---|---|---|
| Trade receivable | ₹11,80,000 | |
| Deferred revenue (contract liability) | | ₹10,00,000 |
| GST output liability | | ₹1,80,000 |

GST is isolated from revenue; the ₹1,80,000 output GST liability arises on the invoice. It is not spread across the revenue schedule.

## How is ₹10,00,000 allocated by relative SSP?

Each obligation receives the net transaction price multiplied by its SSP over total SSP of ₹10,50,000. Onboarding receives ₹1,42,857.14, rounded to the paisa. The subscription is listed last, so it receives ₹10,00,000 minus onboarding, ₹8,57,142.86, absorbing the rounding residual. The two sum to exactly ₹10,00,000.00.

Net transaction price: ₹10,00,000.00

| Obligation | SSP | Share | Allocated |
|---|---|---|---|
| Onboarding | ₹1,50,000 | 1,50,000 / 10,50,000 | ₹1,42,857.14 |
| Cloud subscription | ₹9,00,000 | 9,00,000 / 10,50,000 | ₹8,57,142.86 (absorbs residual) |
| Total | ₹10,50,000 | | ₹10,00,000.00 |

The allocation guidance is ASC 606-10-32-28 to 32-41 and the corresponding Ind AS 115 paragraphs 73 to 86. Why the last obligation carries the residual is covered in the [residual-cent post](/blog/ssp-allocation-rounding-residual-cent-asc-606).

## What does the 12-month schedule look like?

April 2026 recognises ₹2,14,285.71: all of onboarding plus the first ₹71,428.57 of subscription. Each month to February 2027 recognises ₹71,428.57. March 2027 recognises ₹71,428.59, carrying a ₹0.02 terminal remainder, so the deferred balance ends at ₹0.00 and total revenue is ₹10,00,000.00.

| Month | Onboarding | Subscription | Revenue | Deferred |
|---|---|---|---|---|
| Apr 2026 | ₹1,42,857.14 | ₹71,428.57 | ₹2,14,285.71 | ₹7,85,714.29 |
| May 2026 | — | ₹71,428.57 | ₹71,428.57 | ₹7,14,285.72 |
| Jun 2026 | — | ₹71,428.57 | ₹71,428.57 | ₹6,42,857.15 |
| ... | — | ₹71,428.57 each month | | |
| Jan 2027 | — | ₹71,428.57 | ₹71,428.57 | ₹1,42,857.16 |
| Feb 2027 | — | ₹71,428.57 | ₹71,428.57 | ₹71,428.59 |
| Mar 2027 | — | ₹71,428.59 | ₹71,428.59 | ₹0.00 (+₹0.02 remainder) |
| Total | | | ₹10,00,000.00 | |

Each month's entry debits the contract liability and credits revenue. You can open the same contract as the sample "Example Software India" on [app.soluqube.com](https://app.soluqube.com).

## What does this example not cover?

The engine applies one term to every obligation, recognises point-in-time obligations in month 1 with no delivery-date input, and spreads ratable months equally with no daily proration. It has no billing or contract-asset modelling, no usage-based or variable consideration, and no contract modifications.

GST is handled at invoice only; it is not a GST return or tax-liability schedule.

## How can you try it on your own INR contracts?

Run your own onboarding and subscription split, on the net amount after GST, in the [SSP allocation calculator](/tools/ssp-allocation-calculator) to see each allocation and the schedule. See the [relative SSP method](/glossary/relative-ssp-method) and [standalone selling price](/glossary/standalone-selling-price) glossary entries, or send three contracts for a [free 3-contract workpaper](https://soluqube.com/design-partners?utm_source=blog&utm_medium=community&utm_campaign=20261017-worked-examples).
    `
  },
  {
    slug: "revenue-contract-testing-qoe-ssp-allocation",
    title: "How do QoE teams test SSP allocation on a contract sample?",
    subtitle: "How QoE and diligence teams recompute SSP allocation and deferred revenue on a sample of a SaaS target's contracts, and document each difference.",
    publishedAt: "October 18, 2026",
    updatedAt: "October 19, 2026",
    readTime: "5 min read",
    author: {
      name: "Soluqube Editorial",
      role: "Technical Accounting Content",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["ASC 606", "Quality of Earnings", "Due Diligence", "SSP Allocation", "Deferred Revenue"],
    targetQuery: "revenue contract testing quality of earnings SaaS",
    definitionAnchor: "Revenue contract testing in a QoE is the re-performance, on a sample of a target's customer contracts, of the transaction-price allocation and the revenue schedule, compared against the target's reported revenue by period and deferred revenue balance.",
    excerpt: "Pick a contract sample, re-perform the relative-SSP allocation and schedule, compare revenue by period and deferred revenue with the target's ledger, and document each difference with its clause.",
    toc: [
      { id: "why-does-saas-revenue-quality-hinge-on-contract-level-recomputation", label: "Why does SaaS revenue quality hinge on contract-level recomputation?" },
      { id: "how-does-a-deal-team-select-a-sample-of-contracts", label: "How does a deal team select a sample of contracts?" },
      { id: "how-do-you-recompute-the-allocation-and-schedule-for-each-sampled-contract", label: "How do you recompute the allocation and schedule for each sampled contract?" },
      { id: "how-should-differences-be-documented", label: "How should differences be documented?" },
      { id: "what-does-a-deterministic-hashed-workpaper-add-to-the-data-room-evidence", label: "What does a deterministic, hashed workpaper add to the data-room evidence?" },
      { id: "what-does-contract-level-recomputation-not-cover", label: "What does contract-level recomputation not cover?" },
      { id: "how-can-you-run-it-on-your-next-deal", label: "How can you run it on your next deal?" }
    ],
    faqs: [
      {
        question: "Is this a QoE report or an audit?",
        answer: "No. It is a recomputation of allocation and schedules for the sampled contracts, with clause evidence and a hashed export. The deal team writes the QoE and makes the judgements."
      },
      {
        question: "What if the target has amended contracts?",
        answer: "Amendments are flagged on the exceptions list. Contract-modification accounting is not computed today."
      },
      {
        question: "Which standards and currencies?",
        answer: "ASC 606 and Ind AS 115, for USD and INR contracts. For INR contracts, 18% GST is isolated before allocation; US contracts carry no GST."
      }
    ],
    engineVerified: true,
    content: `
In a quality of earnings (QoE) review of a SaaS target, revenue quality usually comes down to contracts. Billings say little until someone recomputes, contract by contract, how each price was allocated and spread over the term. This guide is for transaction advisory and financial due diligence teams. It covers picking a sample, re-performing the relative standalone selling price (SSP) allocation and schedule, comparing the result with the target's revenue by period and deferred revenue, documenting each difference with its clause, and where the work stops. For the rounding mechanics behind a schedule that ties to the cent, see [our residual-cent post](/blog/ssp-allocation-rounding-residual-cent-asc-606).

Before recomputing a sample, make sure the team agrees on the method being tested; our [SSP allocation guide for ASC 606](/blog/asc-606-ssp-allocation-guide) sets out the formula, the discount rule and the residual-cent rule.

## Why does SaaS revenue quality hinge on contract-level recomputation?

Because reported SaaS revenue is the output of three judgements made per contract: how the price was allocated across obligations, how ratable revenue was spread over the term, and where the cutoff fell. A misallocated implementation fee, or ratable revenue started a month early, moves revenue between periods and changes the deferred balance a buyer inherits.

Under ASC 606-10-32-28 to 32-41, the transaction price is allocated to each performance obligation in proportion to its standalone selling price. Recognising that allocation over time creates the contract liability (deferred revenue) presented under ASC 606-10-45-1 to 45-2. If the allocation is off, every later period is off too.

## How does a deal team select a sample of contracts?

Most teams combine coverage and risk: the largest contracts by annual value, plus contracts with bundled obligations, non-standard terms, large discounts or signing dates near period end. The sample has to be big enough to support a view on the population and small enough to re-perform properly in the diligence window.

Bundles of subscription, implementation and support deserve extra weight, because allocation errors live there; so do late-period signings, where ratable revenue cutoff slips.

## How do you recompute the allocation and schedule for each sampled contract?

For each sampled contract, confirm the performance obligations, the stated prices, the SSP basis and the term. Then allocate the transaction price on a relative-SSP basis, build the full-term schedule, and compare revenue by period and the deferred balance at the cutoff date with the figures in the target's ledger.

Take one contract in the sample: a $100,000 transaction price with three obligations whose SSPs are $30,000, $30,000 and $120,000.

| Obligation | SSP | Allocated |
|---|---:|---:|
| Implementation | $30,000 | $16,666.67 |
| Premium support | $30,000 | $16,666.67 |
| Platform subscription | $120,000 | $66,666.66 |
| **Total** | **$180,000** | **$100,000.00** |

Rounding each line independently gives $100,000.01; assigning the residual cent by a fixed rule ties the allocation to the price. The schedule works the same way: a $100,000 ratable amount over 36 months schedules as 35 × $2,777.77 plus a final month of $2,778.05, exactly $100,000.00, so deferred revenue ends at $0.00. You can re-perform the allocation with the [SSP allocation calculator](/tools/ssp-allocation-calculator).

## How should differences be documented?

Each difference between the recomputed figures and the target's ledger goes on an exceptions list with the contract, the period, the amount and the cause. Attach the clause evidence: the contract page and the verbatim excerpt that sets the obligation, price or term. A reviewer can then trace the difference without reopening the data room.

In the Soluqube app, uploaded text-layer PDFs also show a highlight on the cited line; the exported workpaper carries the page and excerpt. Scanned PDFs without a text layer are not accepted, and the built-in samples use an approximate overlay.

Common causes: a different SSP basis, an implementation fee recognised up front, a start date that differs from the contract, or an amendment the ledger reflects but the sampled document does not.

## What does a deterministic, hashed workpaper add to the data-room evidence?

It makes the recomputation re-runnable. When the allocation and schedule are computed in integer arithmetic and exported with a SHA-256 hash, anyone with the same inputs gets byte-identical output. The buyer or the target's team can re-run a disputed contract and compare the hash, instead of arguing over whose spreadsheet is right.

Opaque tools fail that test; see [why finance teams reject black-box AI](/blog/why-finance-teams-reject-black-box-ai).

## What does contract-level recomputation not cover?

It is a calculation and evidence trail, not a QoE opinion. SSP judgements, normalisation adjustments and the conclusions in the report stay with the deal team. Contract modifications are flagged, not accounted for, and usage-based fees are not scheduled. The extraction of contract terms is a starting point that a person confirms.

Recomputation also cannot fix the data quality of the target's own ledger; it shows where the ledger and the contracts disagree.

## How can you run it on your next deal?

The QoE Deal Pack covers up to 25 contracts per deal, delivered within 5 business days: relative-SSP allocation per obligation, full-term schedules that tie to the cent, and a SHA-256 hashed evidence workbook per contract. It is $1,750 per deal, a founding price for the first 10 customers. You confirm the obligations and SSPs used.

The list price is $3,500; see [pricing](/pricing). Want to see it first? Request a [free 3-contract workpaper](https://soluqube.com/design-partners) on three contracts of your choice.
    `
  },
  {
    slug: "outsourced-team-ssp-allocation-documentation-us-saas",
    title: "How should an outsourced team document SSP allocation?",
    subtitle: "A step-by-step SSP documentation pack for offshore accounting teams preparing ASC 606 revenue support for US SaaS clients and their auditors.",
    publishedAt: "October 18, 2026",
    updatedAt: "October 19, 2026",
    readTime: "5 min read",
    author: {
      name: "Soluqube Editorial",
      role: "Technical Accounting Content",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["ASC 606", "SSP Allocation", "Outsourced Accounting", "Audit Evidence", "Documentation"],
    targetQuery: "how to document SSP allocation for an ASC 606 audit",
    definitionAnchor: "An SSP documentation pack is the set of memos, source data, calculations and sign-offs that shows how a contract's transaction price was allocated to each performance obligation on a relative standalone selling price basis under ASC 606-10-32-28 to 32-41.",
    excerpt: "What a US SaaS client's auditor asks for on SSP, the six-part documentation pack an outsourced team can build per contract, a worked example that ties to the cent, and who signs what.",
    toc: [
      { id: "what-will-the-us-clients-auditor-ask-for-on-ssp", label: "What will the US client's auditor ask for on SSP?" },
      { id: "what-goes-in-the-ssp-documentation-pack", label: "What goes in the SSP documentation pack?" },
      { id: "how-does-the-worked-example-tie-to-the-transaction-price", label: "How does the worked example tie to the transaction price?" },
      { id: "what-should-the-handoff-checklist-confirm", label: "What should the handoff checklist confirm?" },
      { id: "who-signs-what", label: "Who signs what?" },
      { id: "how-to-speed-up-asc-606-audit-documentation-and-gap-analysis", label: "How to speed up ASC 606 audit documentation & gap analysis" },
      { id: "how-can-your-firm-try-it-on-three-client-contracts", label: "How can your firm try it on three client contracts?" }
    ],
    faqs: [
      {
        question: "Can an outsourced team choose the SSP method for a client?",
        answer: "The team can propose a method and document its basis. Choosing it is a management judgement under ASC 606-10-32-31 to 32-35, so the client's Controller approves it, and the pack records who confirmed the terms and the SSP basis."
      },
      {
        question: "Why record a hash of the export?",
        answer: "A SHA-256 hash lets the client and auditor confirm the file under review is the exact version that was exported. Any change to the file changes the hash."
      },
      {
        question: "What if the allocated lines are a cent off the transaction price?",
        answer: "Assign the residual cent with a written, consistently applied rule, for example to the last-listed line. The allocation then ties exactly, as in the $100,000 example above. Our residual-cent post compares the different rules."
      }
    ],
    engineVerified: true,
    content: `
If your firm in India, Pakistan or the Philippines prepares revenue support for a US SaaS client, the standalone selling price (SSP) allocation is the part the client's auditor is most likely to question. This guide sets out what that auditor generally asks for, the documentation pack an outsourced team can build for each contract, a worked example that ties to the cent, and who signs what. The rounding mechanics are covered in [our residual-cent post](/blog/ssp-allocation-rounding-residual-cent-asc-606), and the reasons reviewers distrust opaque tools are in [why finance teams reject black-box AI](/blog/why-finance-teams-reject-black-box-ai). This article covers the handoff: turning contracts into evidence a US Controller can review, approve and give to the auditor.

## What will the US client's auditor ask for on SSP?

Auditors generally look for evidence that each [standalone selling price](/glossary/standalone-selling-price) has a documented basis, that observable inputs were used where available, and that the allocation follows ASC 606-10-32-28 to 32-41. They also look for evidence that the client's numbers are complete and accurate, and that management reviewed the judgements.

ASC 606-10-32-29 requires allocation on a [relative SSP basis](/glossary/relative-ssp-method). Under 32-31 to 32-35, SSP is the observable price where one exists, and otherwise an estimate that uses observable inputs as far as possible. Paragraphs 32-36 to 32-41 cover discounts and variable consideration.

PCAOB AS 1105 asks auditors to evaluate whether information produced by the company is reliable enough, which usually means testing its accuracy and completeness. AS 1215 governs the auditor's own documentation. In practice, expect requests for source data, recalculations, and evidence of who approved what.

## What goes in the SSP documentation pack?

A pack that works for a single contract has six parts: a contract inventory, a performance obligation memo citing clause page and excerpt, an SSP basis per obligation, the allocation calculation, a schedule that ties to the transaction price, and a record of who confirmed the terms and when, with the Controller's sign-off kept alongside. Each export also carries a version and a hash.

1. **Contract inventory.** Each contract, order form and SOW, with date, counterparty, currency and transaction price.
2. **Performance obligation memo.** For each obligation, the clause page and a short verbatim excerpt that establishes it.
3. **SSP basis per obligation.** The method (observable price, adjusted market assessment, expected cost plus margin, residual) and the source data, such as the price list version or the standalone sales range and period.
4. **Allocation calculation.** Relative SSP weights, the allocated amounts, and a written rule for which line absorbs any residual cent.
5. **Revenue schedule.** Period-by-period amounts that sum to each allocated amount and, in total, to the transaction price.
6. **Review and version control.** A record of who confirmed the terms and when, the Controller's sign-off kept with the pack (it is not captured in the tool), plus a version number and SHA-256 hash of the export so the auditor can confirm it is the file that was reviewed.

## How does the worked example tie to the transaction price?

It ties when the residual cent is assigned by a fixed rule. A $100,000 contract with SSPs of $30,000, $30,000 and $120,000 allocates $16,666.67, $16,666.67 and $66,666.66, totalling $100,000.00. Rounding each line independently gives $100,000.01, which leaves a one-cent difference the reviewer has to explain.

| Obligation | SSP | Allocated |
|---|---:|---:|
| Implementation | $30,000 | $16,666.67 |
| Premium support | $30,000 | $16,666.67 |
| Platform subscription | $120,000 | $66,666.66 |
| **Total** | **$180,000** | **$100,000.00** |

The schedule follows the same principle. Take a $100,000 ratable amount over 36 months: it schedules as 35 × $2,777.77 plus a final month of $2,778.05, which is exactly $100,000.00. The final period absorbs the remainder, so the deferred balance ends at $0.00. You can re-perform the allocation with the [SSP allocation calculator](/tools/ssp-allocation-calculator).

## What should the handoff checklist confirm?

Before the pack goes to the client, confirm that every number traces back to a source document and every judgement has an owner. The checklist below is the minimum we suggest for each contract. The client's Controller should be able to review it without having to rebuild anything.

| Item | Prepared by | Check |
|---|---|---|
| Contract inventory complete | Outsourced team | Agrees to client's contract list |
| POB memo with page + excerpt | Outsourced team | Every obligation cited |
| SSP method and source data | Outsourced team, from client data | Method named per line |
| Allocation ties to transaction price | Outsourced team | Difference = $0.00 |
| Schedule ties to allocation | Outsourced team | Ending deferred = $0.00 |
| Judgements approved | Client Controller | Signed and dated |
| Export version + SHA-256 hash | Outsourced team | Hash recorded in sign-off |

## Who signs what?

The client owns every accounting judgement: which obligations exist, which SSP method applies, and which policies govern discounts and rounding. The outsourced team prepares the evidence, calculations and schedules and documents its sources. The Controller reviews and signs, and only the client's management represents the numbers to the auditor.

Write this boundary into the engagement letter. Label any SSP estimate the team proposes as a proposal until the Controller approves it, and flag contract modifications to the client separately.

For the accounting behind each item in the pack, from the SSP method to the residual-cent rule, see [how SSP allocation works, from estimate to schedule](/blog/asc-606-ssp-allocation-guide).

## How to speed up ASC 606 audit documentation & gap analysis

When technical accounting advisory teams or gap analysts evaluate a batch of 20 to 100 contracts during an ASC 606 readiness review, audit sampling, or pre-audit gap analysis, the biggest bottleneck is manual contract review and workpaper creation. Sifting through 30-page MSAs, identifying separate performance obligations, calculating relative standalone selling prices, and assembling audit tie-outs by hand takes hours per contract.

To accelerate the workflow:

1. **Automate the arithmetic in seconds**: Instead of manually building custom Excel models that break with mid-contract amendments or variable pricing, use our free [SSP Allocation Calculator](/tools/ssp-allocation-calculator) to generate exact relative weights and amortisation schedules to the cent.
2. **Anchor clause citations upfront**: Documenting the exact page number and verbatim excerpt for each obligation immediately satisfies auditor requests under PCAOB AS 1105 (audit evidence) and eliminates back-and-forth PBC review cycles.
3. **Bridge ERP limitations**: For firms managing revenue across disparate billing or GL tools, see our comparative guides for [Tabs Alternatives](/alternatives/tabs), [Chargebee RevRec Alternatives](/alternatives/chargebee-revrec), and [Sage Intacct Alternatives](/alternatives/sage-intacct-revenue) to identify where dedicated rev-rec subledgers fit beside existing ERP infrastructure.

## How can your firm try it on three client contracts?

Your firm can get a free 3-contract workpaper through the [design partner programme](https://soluqube.com/design-partners). You confirm the obligations and stated prices, and you get back the allocation, a schedule that ties to the cent, page-and-excerpt clause evidence and a hashed export, ready for the Controller to review.

Firm Tool Access is $49 a month per firm, a founding price for the first 10 customers ([pricing](https://soluqube.com/pricing)). In the app, uploaded text-layer PDFs also show a highlight on the cited line; built-in samples use an approximate overlay.
    `
  },
  {
    slug: "asc-606-ssp-allocation-guide",
    title: "How does SSP allocation work under ASC 606? A complete guide",
    subtitle: "What SSP means under ASC 606, the 3 ways to estimate it, relative SSP allocation, discounts, ranges and rounding, with engine-run examples.",
    publishedAt: "October 19, 2026",
    updatedAt: "October 20, 2026",
    readTime: "9 min read",
    author: {
      name: "Soluqube Editorial",
      role: "Technical Accounting Content",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["ASC 606", "SSP Allocation", "Standalone Selling Price", "Relative SSP Method", "Ind AS 115"],
    targetQuery: "asc 606 ssp",
    definitionAnchor: "Under ASC 606 Step 4, the transaction price is split across performance obligations in proportion to their standalone selling prices. Estimate each SSP, total them, and multiply the contract price by each obligation's share. Round each line so the allocation ties to the contract exactly, then schedule each obligation.",
    excerpt: "What SSP means, how to estimate it when nothing is sold on its own, how relative SSP allocation spreads a discount or a premium, and where the rounding cent goes. Includes a $138,000, 36-month contract, run through the Soluqube engine, that ties to $0.00 deferred.",
    toc: [
      { id: "what-does-ssp-mean-in-accounting", label: "What does SSP mean in accounting?" },
      { id: "how-do-you-estimate-ssp-under-asc-606", label: "How do you estimate SSP under ASC 606?" },
      { id: "when-do-you-use-an-observable-price-instead-of-an-estimate", label: "When do you use an observable price instead of an estimate?" },
      { id: "how-does-relative-ssp-allocation-work", label: "How does relative SSP allocation work?" },
      { id: "what-does-a-full-ssp-allocation-look-like-on-a-saas-contract", label: "What does a full SSP allocation look like on a SaaS contract?" },
      { id: "how-are-discounts-and-premiums-allocated", label: "How are discounts and premiums allocated?" },
      { id: "when-is-the-residual-approach-allowed", label: "When is the residual approach allowed?" },
      { id: "how-do-ssp-ranges-work", label: "How do SSP ranges work?" },
      { id: "where-does-the-rounding-cent-go", label: "Where does the rounding cent go?" },
      { id: "when-is-revenue-ratable-and-when-is-it-point-in-time", label: "When is revenue ratable and when is it point in time?" },
      { id: "what-changes-under-ind-as-115-and-18-gst", label: "What changes under Ind AS 115 and 18% GST?" },
      { id: "what-do-auditors-look-for-on-ssp", label: "What do auditors look for on SSP?" },
      { id: "what-should-an-ssp-documentation-checklist-include", label: "What should an SSP documentation checklist include?" },
      { id: "how-can-you-test-this-on-your-own-contracts", label: "How can you test this on your own contracts?" }
    ],
    faqs: [
      {
        question: "What is SSP in ASC 606?",
        answer: "SSP (standalone selling price) is the price at which an entity would sell a promised good or service separately to a customer. ASC 606 uses it to split one contract price across performance obligations: each obligation receives the contract price multiplied by its SSP divided by the total SSP."
      },
      {
        question: "Is SSP the same as list price?",
        answer: "Not necessarily. A list price is SSP evidence only if items actually sell at or near it. If most deals close at a discount to list, the observable standalone price is what customers actually pay, and the list price is just one input to the estimate."
      },
      {
        question: "Can the residual approach be used for a SaaS subscription?",
        answer: "Only when the subscription's selling price is highly variable or uncertain, and only when the other obligations have observable SSPs. Most SaaS subscriptions sell standalone often enough to support an observable price or an adjusted market assessment, so the residual approach is rare for them."
      },
      {
        question: "Does relative SSP allocation apply to Ind AS 115 contracts?",
        answer: "Yes. Ind AS 115 allocates on a relative standalone selling price basis, as ASC 606 does. For an Indian SaaS contract, the 18% GST is taken out first: it is collected for the government, so it stays out of the transaction price and is booked as a liability."
      },
      {
        question: "How often should standalone selling price estimates be refreshed?",
        answer: "ASC 606 and IFRS 15 set no fixed frequency. SSP is set at contract inception and is not revised for that contract later. For new contracts, update estimates when pricing, discounting or the market changes, and document a periodic review, for example quarterly or annually, with the evidence used."
      }
    ],
    engineVerified: true,
    content: `
Searching "ASC 606 SSP" usually means one of two things: you need to know what a standalone selling price is, or you have a bundled contract and an auditor asking how you split it. This guide covers both. It explains what SSP means, the three estimation methods in ASC 606-10-32-33 to 32-35, how relative SSP allocation works under 32-28 to 32-31, and how discounts, premiums, ranges and rounding fit in. Every worked number below was produced by the Soluqube engine using integer arithmetic, and every allocation ties to the contract price. For the terms, see the [standalone selling price](/glossary/standalone-selling-price) and [relative SSP method](/glossary/relative-ssp-method) glossary entries. To try your own figures, use the [SSP allocation calculator](/tools/ssp-allocation-calculator).

## What does SSP mean in accounting?

SSP means standalone selling price: the price at which an entity would sell a promised good or service separately to a similar customer. In ASC 606 and IFRS 15, SSP is the basis for Step 4 of the five-step model. A bundled contract price is split across its performance obligations in proportion to their SSPs.

SSP is set at contract inception and is not updated for later price changes. It applies to the transaction price, which is fixed in Step 3. If you resell third-party software, decide first whether you report gross or net; our [principal vs agent worked example](/blog/principal-vs-agent-asc-606-gross-vs-net-worked-example) covers that test.

## How do you estimate SSP under ASC 606?

When SSP isn't directly observable, ASC 606-10-32-33 requires an estimate that uses as many observable inputs as possible. Paragraph 32-34 names three suitable methods: adjusted market assessment, expected cost plus a margin, and the residual approach. Under 32-35, you can combine methods, for example applying the residual approach to only one obligation.

- **Adjusted market assessment.** Start from what the market would pay, using competitor pricing for similar products, then adjust for your costs and margins.
- **Expected cost plus a margin.** Forecast the cost of providing the item, then add an appropriate margin. This works well for implementation and professional services.
- **[Residual approach](/glossary/residual-approach).** SSP is the total transaction price minus the observable SSPs of the other obligations. It is allowed only in narrow cases, covered below.

## When do you use an observable price instead of an estimate?

Use an [observable price](/glossary/observable-price) whenever one exists. ASC 606-10-32-32 calls the price of a good or service sold separately in similar circumstances to similar customers the best evidence of SSP. A list price counts only if items actually sell near it. If deals routinely close below list, use the actual prices instead.

In SaaS, renewal-only support and standalone training days often have observable prices; a subscription sold only in bundles usually needs an estimate. One contract can mix both. Document which is which, and keep the data each one rests on.

## How does relative SSP allocation work?

Under ASC 606-10-32-28 to 32-31, each performance obligation receives the transaction price multiplied by its SSP, divided by the total SSP of all obligations in the contract. The allocated amounts always add up to the transaction price, so any gap between the price and the total SSP is spread across every obligation in proportion.

The formula for each line is:

**Allocated amount = Transaction price × Obligation SSP ÷ Total SSP**

The results rarely come out in whole cents, so you need a fixed rounding rule. The engine rounds every obligation except the last half-up to the cent, and the last obligation takes the residual.

## What does a full SSP allocation look like on a SaaS contract?

Take a $138,000, 36-month SaaS contract starting December 2026. It has three obligations with a total SSP of $159,000.00: a subscription, a premium support tier (24x7, 1-hour SLA) and onboarding. The $21,000.00 discount is spread pro rata. The allocated amounts tie to $138,000.00, and deferred revenue ends at $0.00.

| Obligation | Pattern | SSP | Allocated |
|---|---|---:|---:|
| Subscription | Ratable, 36 months | $120,000.00 | $104,150.94 |
| Premium support (24x7, 1-hr SLA) | Ratable, 36 months | $30,000.00 | $26,037.74 |
| Onboarding (absorbs residual cent) | Point in time, month 1 | $9,000.00 | $7,811.32 |
| **Total** | | **$159,000.00** | **$138,000.00** |

The subscription line is $138,000 × $120,000 ÷ $159,000, which is $104,150.94 after rounding. Premium support is $26,037.74. Onboarding takes what's left: $7,811.32.

Here is the monthly schedule:

| Month | Recognised | Made up of | Deferred after month |
|---|---:|---|---:|
| 1 (Dec 2026) | $11,427.67 | Subscription $2,893.08 + support $723.27 + onboarding $7,811.32 | $126,572.33 |
| 2–34 | $3,616.35 each | Subscription $2,893.08 + support $723.27 | falls by $3,616.35 a month |
| 35 (Oct 2029) | $3,616.35 | Subscription $2,893.08 + support $723.27 | $3,616.43 |
| 36 (Nov 2029) | $3,616.43 | Subscription $2,893.14 + support $723.29 | $0.00 |

The subscription recognises $2,893.08 × 35 months and then $2,893.14 in month 36. Support recognises $723.27 × 35 and then $723.29. In each case the final month absorbs the rounding remainder. The engine result's SHA-256 hash is 527ca94f9afa96bae0f16aa3c70377d9918b970299299d6321fd41128a67e853. You can reproduce this exact schedule in the app, or re-perform the allocation in the [calculator](/tools/ssp-allocation-calculator). For a two-obligation version, see [subscription plus implementation](/blog/ssp-allocation-example-saas-subscription-implementation). The [sample SSP workpaper](/samples/soluqube-ssp-sample.pdf) shows the output format.

## How are discounts and premiums allocated?

Under ASC 606-10-32-36 to 32-38, a discount is spread across all obligations in proportion to SSP. It goes to specific obligations only when observable evidence shows that it relates to them. When the contract price is above total SSP, the same relative formula spreads the premium pro rata.

Here is a premium case from the engine. A $66,000.00 contract has a total SSP of $64,500.00, so the price is $1,500.00 above SSP:

| Obligation | SSP | Allocated |
|---|---:|---:|
| Subscription (12 months) | $48,000.00 | $49,116.28 |
| Dedicated CSM (12 months) | $9,000.00 | $9,209.30 |
| Implementation (absorbs residual cent) | $7,500.00 | $7,674.42 |
| **Total** | **$64,500.00** | **$66,000.00** |

A premium should also make you look again at your SSPs. A price consistently above total SSP can mean an SSP is understated, or that an obligation is missing from the list.

For step-by-step versions, see how a [bundle discount](/blog/asc-606-bundle-discount-allocation-saas) and a [bundle premium](/blog/asc-606-bundle-price-above-ssp-premium-allocation) are allocated, how the [standalone selling price formula](/blog/standalone-selling-price-formula-ssp-calculation) is rounded so it ties, and whether [SaaS training is a separate performance obligation](/blog/saas-training-separate-performance-obligation-asc-606).

## When is the residual approach allowed?

ASC 606-10-32-34(c) allows the residual approach only when an item's selling price is highly variable, or uncertain because it is new or has never been sold separately. Even then, the other obligations need observable SSPs. A residual that comes out at zero or near zero is a warning sign, not a valid result.

The residual approach estimates SSP; it doesn't replace relative allocation. Consider any discount under 32-37 before you arrive at the residual. See the [residual approach](/glossary/residual-approach) entry for the steps.

## How do SSP ranges work?

ASC 606 doesn't define SSP ranges, but many SaaS companies use one: a band around the midpoint of their standalone sales prices. Prices inside the band are accepted as SSP. A price outside it is adjusted to the nearest point in the band, or to the midpoint, under a written policy.

A range saves re-estimating SSP for every deal, but recalculate it periodically and keep the sales data behind it. See the [SSP range](/glossary/ssp-range) entry. In public filings, [few SaaS companies name their SSP method](/blog/ssp-disclosure-study-public-saas-10k-2026).

## Where does the rounding cent go?

Relative allocation rarely produces whole cents. If you round every line on its own, the total can end up a cent above or below the contract price. A written rule fixes this by naming one obligation to absorb the residual cent. The engine assigns it to the last-listed obligation, so the allocation ties exactly.

The same applies over time. Monthly amounts are rounded down, and the final month absorbs the remainder. That is why the subscription in the main example ends at $2,893.14 rather than $2,893.08. The amounts involved are far below materiality. The point is that a reviewer can re-perform the allocation and get the same result. Our [residual-cent post](/blog/ssp-allocation-rounding-residual-cent-asc-606) compares the alternative rules.

## When is revenue ratable and when is it point in time?

Revenue is ratable when the customer receives and uses the benefit as you perform, as with a subscription or a support tier that is available every day. Under ASC 606-10-25-27, that is recognition over time. Distinct onboarding or training is usually recognised at a point in time, when it is delivered.

Allocation and timing are separate steps. Step 4 decides how much each obligation gets, and Step 5 decides when it is recognised. In the main example, onboarding's $7,811.32 is all recognised in month 1, while the two ratable lines spread over 36 months. Multi-year deals whose price ramps up raise their own timing questions; see [multi-year ramp pricing](/blog/ssp-allocation-example-multi-year-ramp-pricing).

## What changes under Ind AS 115 and 18% GST?

Ind AS 115 uses the same relative SSP allocation as ASC 606. For an Indian SaaS contract, 18% GST is collected on behalf of the government, so it is not part of the transaction price. You take it out before allocating and book it as an output GST liability on the invoice.

Here is an engine run on an INR contract. The transaction price is ₹24,00,000.00 net of GST, the total SSP is ₹27,50,000.00, and it starts in April 2027:

| Obligation | SSP | Allocated | GST 18% |
|---|---:|---:|---:|
| Subscription (24 months) | ₹22,00,000.00 | ₹19,20,000.00 | ₹3,45,600.00 |
| Onboarding (month 1) | ₹2,50,000.00 | ₹2,18,181.82 | ₹39,272.73 |
| Premium support (24 months, absorbs residual) | ₹3,00,000.00 | ₹2,61,818.18 | ₹47,127.27 |
| **Total** | **₹27,50,000.00** | **₹24,00,000.00** | **₹4,32,000.00** |

₹4,32,000 output GST kept out of revenue, booked as a liability on the invoice. The gross invoice is ₹28,32,000.00. The subscription recognises ₹80,000.00 a month, and support recognises ₹10,909.09 a month for 23 months, then ₹10,909.11. US contracts carry no GST. See the [Ind AS 115 GST example](/blog/ssp-allocation-example-ind-as-115-inr-gst).

## What do auditors look for on SSP?

Auditors look for four things. Each SSP should have a documented basis. Observable data should be used wherever it exists. Methods should be applied consistently across similar contracts. And the allocation and schedule should be recalculable from the inputs. They also test whether the contract data feeding the calculation is complete and accurate, and who approved each judgement.

Expect a reviewer to recompute a sample of contracts. Numbers nobody can re-run draw more questions, which is why [finance teams reject black-box AI](/blog/why-finance-teams-reject-black-box-ai) for this work. Diligence teams follow the same pattern: see [how QoE teams test SSP allocation](/blog/revenue-contract-testing-qoe-ssp-allocation).

## What should an SSP documentation checklist include?

For each contract, a usable SSP file has seven parts: the signed contract and order forms; a list of performance obligations with the clause page and excerpt for each; the SSP method and source data for each obligation; the allocation; the residual-cent rule; a schedule that ties to the price; and the Controller's sign-off.

1. Contract inventory: date, counterparty, currency, transaction price.
2. Performance obligations, each with its clause page and a verbatim excerpt.
3. The SSP method for each line, with the price list version or sales data behind it.
4. The allocation, showing that it ties to the transaction price.
5. The written residual-cent rule.
6. A schedule ending at $0.00 deferred.
7. Sign-off, export version and SHA-256 hash.

For teams preparing this for a client, see [how an outsourced team documents SSP allocation](/blog/outsourced-team-ssp-allocation-documentation-us-saas). If you are choosing a tool to hold this evidence, our comparisons of [Maxio vs NetSuite ARM](/blog/maxio-vs-netsuite-arm-ssp-allocation) and [Chargebee RevRec vs Maxio](/blog/chargebee-revrec-vs-maxio-ssp-allocation) set out how each vendor describes SSP allocation, from its own pages; [Maxio alternatives](/alternatives/maxio) compares six options side by side.

## How can you test this on your own contracts?

Send us three of your hardest contracts through the [design partner programme](/design-partners), and you get a free 3-contract workpaper. You confirm the obligations and stated prices. We send back the relative SSP allocation, a schedule that ties to the cent, page-and-excerpt clause evidence for each obligation, and a hashed export your auditor can re-run.

Founding prices for the first 10 customers are on the [pricing](/pricing) page. In the app, uploaded text-layer PDFs also show a highlight on the cited line; built-in samples use an approximate overlay. The engine doesn't model contract modifications, variable consideration or billing schedules yet. Treat those topics as guidance only.
    `
  },
  {
    slug: "maxio-vs-netsuite-arm-ssp-allocation",
    title: "Maxio vs NetSuite ARM: Which Handles SSP Allocation?",
    subtitle: "How Maxio and NetSuite ARM allocate price to performance obligations under ASC 606, from each vendor's own docs, with a 36-month worked example.",
    publishedAt: "October 20, 2026",
    updatedAt: "October 20, 2026",
    readTime: "6 min read",
    author: {
      name: "Soluqube Editorial",
      role: "Technical Accounting Content",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["ASC 606", "SSP Allocation", "Maxio", "NetSuite ARM", "Comparison"],
    targetQuery: "maxio vs netsuite arm",
    definitionAnchor: "Maxio is a billing and financial reporting platform with revenue recognition; NetSuite Advanced Revenue Management (ARM) is a revenue module inside NetSuite ERP. Oracle publishes ARM's allocation methods (SSP, VSOE, ESP, TPE or other) in the Revenue Allocation add-on. Maxio says it handles SSP but does not publish its allocation method.",
    excerpt: "A neutral comparison of Maxio and NetSuite ARM on SSP allocation, contract changes, journal posting and price, using only each vendor's own pages (checked 20 Oct 2026). Includes a $138,000, 36-month bundle run through the Soluqube engine.",
    toc: [
      { id: "what-are-maxio-and-netsuite-arm", label: "What are Maxio and NetSuite ARM?" },
      { id: "how-do-maxio-and-netsuite-arm-compare-side-by-side", label: "How do Maxio and NetSuite ARM compare side by side?" },
      { id: "how-does-each-one-allocate-the-transaction-price-by-ssp", label: "How does each one allocate the transaction price by SSP?" },
      { id: "how-does-each-one-handle-contract-changes", label: "How does each one handle contract changes?" },
      { id: "where-does-each-one-post-journal-entries", label: "Where does each one post journal entries?" },
      { id: "what-does-each-one-cost", label: "What does each one cost?" },
      { id: "can-you-run-maxio-with-netsuite-as-the-general-ledger", label: "Can you run Maxio with NetSuite as the general ledger?" },
      { id: "what-does-a-relative-ssp-allocation-look-like-on-a-real-bundle", label: "What does a relative-SSP allocation look like on a real bundle?" },
      { id: "where-does-ssp-allocation-evidence-fit-alongside-either-tool", label: "Where does SSP allocation evidence fit alongside either tool?" },
      { id: "sources", label: "Sources" }
    ],
    faqs: [
      {
        question: "Does NetSuite ARM allocate across obligations without the Revenue Allocation add-on?",
        answer: "Oracle's help says Revenue Allocation \"is an add-on feature to Advanced Revenue Management (Essentials)\", and it is the feature the same page describes as using fair values to allocate revenue across performance obligations. Confirm with Oracle or your NetSuite partner which features your account has enabled."
      },
      {
        question: "Does Maxio publish how it allocates SSP?",
        answer: "Not on the pages we read. Maxio's revenue recognition page says it handles standalone selling prices and negotiated transaction prices and can reallocate revenue, but the allocation method itself is not published. Ask Maxio for its configuration documentation before you rely on it for an audit file."
      },
      {
        question: "Can Soluqube post its allocation into Maxio or NetSuite?",
        answer: "No. Soluqube has no billing or ERP sync today. It produces the allocation, the schedule and a hashed export with clause evidence, and your team books the result in Maxio or NetSuite. It also does not handle contract modifications or usage-based fees yet."
      }
    ],
    engineVerified: true,
    content: `
Maxio and NetSuite Advanced Revenue Management (ARM) both recognise revenue under ASC 606, but they start from different places: Maxio from billing, ARM from inside the NetSuite ERP. This comparison uses only each vendor's own public pages, checked on 20 Oct 2026. It focuses on the question auditors ask most: how is the transaction price allocated across performance obligations by standalone selling price? Where a page doesn't say something, we write "not published". That means the page we read did not state it, not that the product lacks it. For the method itself, read our [guide to SSP allocation under ASC 606](/blog/asc-606-ssp-allocation-guide).

## What are Maxio and NetSuite ARM?

Maxio is a billing and financial reporting platform whose revenue recognition page names ASC 606 and IFRS 15. NetSuite ARM is a module inside NetSuite ERP. Oracle says ARM (Essentials) "automates revenue forecasting, recognition, reclassification, deferral, and auditing through a rule-based event handling framework". Both serve subscription businesses, from different starting points.

Oracle adds that ARM Essentials and Revenue Allocation support "both existing standards and the new standard". In practice the choice often follows the stack: if NetSuite is already your ERP, ARM lives inside it, while Maxio sits in front of a general ledger and syncs to it.

## How do Maxio and NetSuite ARM compare side by side?

The table below sets each vendor's own wording side by side, row by row, with a link to the page each fact comes from. Every fact was checked on 20 Oct 2026. "Not published" means the page we read did not say it. Vendor pages change, so re-check before relying on any row.

| Topic | Maxio | NetSuite ARM |
|---|---|---|
| What it is | Billing and financial reporting with revenue recognition ([Maxio](https://www.maxio.com/revenue-recognition)) | Revenue module inside NetSuite ERP ([Oracle](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4328435538.html)) |
| Standards named | ASC 606 and IFRS 15 ([Maxio](https://www.maxio.com/revenue-recognition)) | "both existing standards and the new standard" ([Oracle](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4703499262.html)) |
| SSP and allocation | Handles "standalone selling prices (SSP) and negotiated transaction prices"; can "reallocate revenue"; method not published ([Maxio](https://www.maxio.com/revenue-recognition)) | SSP, VSOE, ESP, TPE "or some other method"; fair value pricing, range checking, formulas ([Oracle](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4328435538.html)) |
| Where allocation sits | Advanced revenue management listed under optional modules; tier inclusion not published ([Maxio pricing](https://www.maxio.com/pricing)) | Revenue Allocation "is an add-on feature" to ARM Essentials ([Oracle](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4328435538.html)) |
| Contract changes | "Instantly edit contracts for upgrades, refunds, and other changes" ([Maxio](https://www.maxio.com/revenue-recognition)) | Prospective and retrospective merges ([Oracle](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_1498077674.html)) |
| GL and journals | Syncs "invoices and SaaS payments to NetSuite, Sage, QuickBooks, etc." ([Maxio](https://www.maxio.com/revenue-recognition)) | "You must generate revenue recognition journal entries to post the revenue to the general ledger" ([Oracle](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4328435538.html)) |
| Audit trail and reports | "Generate detailed audit trails"; waterfall reports ([Maxio](https://www.maxio.com/revenue-recognition)) | ARM "automates ... auditing"; audit-trail reports not published on the pages read ([Oracle](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4328435538.html)) |
| Price | Grow $599/month up to $100k monthly billings; Scale by quote ([Maxio pricing](https://www.maxio.com/pricing)) | Not published ([Oracle](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4328435538.html)) |
| Migration | Not published ([Maxio](https://www.maxio.com/revenue-recognition)) | From classic Revenue Recognition needs "NetSuite Professional Services or a qualified NetSuite partner" ([Oracle](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4328435538.html)) |
| Using both | Maxio's own case study: "using NetSuite as a general ledger only" ([Maxio](https://maxio.com/customers/maxio-netsuite)) | n/a |

## How does each one allocate the transaction price by SSP?

Oracle publishes the mechanics. The Revenue Allocation add-on uses fair values based on "standalone selling price (SSP), vendor-specific objective evidence (VSOE), best estimate of selling price (ESP), third party evidence (TPE), or some other method", with price lists, range checking and formulas. Maxio says it handles SSP and can "reallocate revenue"; its allocation method is not published.

Whichever tool you use, the auditor's questions are the same: what is each SSP based on, what share of the price does each obligation get, and can the split be re-performed? The pages we read describe configuration, not a standalone allocation workpaper, so plan where that evidence will live.

## How does each one handle contract changes?

Maxio says you can "instantly edit contracts for upgrades, refunds, and other changes", with schedules adjusted "without overwriting original data". Oracle documents prospective and retrospective merges. A prospective merge "terminates and locks the original revenue arrangements and creates a new arrangement with the residual values as of the effective date".

Oracle also states that a prospective merge can't be reverted once it "has recognized revenue or reclassified deferred revenue". That is a documented control point to plan period-end work around. Maxio's page does not describe its modification method in more detail.

## Where does each one post journal entries?

NetSuite ARM posts inside NetSuite. Oracle says "you must generate revenue recognition journal entries to post the revenue to the general ledger". Maxio says it can "sync invoices and SaaS payments to NetSuite, Sage, QuickBooks, etc."; how it posts revenue journals to an external ledger is not published on the page we read.

## What does each one cost?

Maxio publishes Grow at $599 per month for up to $100k in monthly billings, with Scale by quote above that. Advanced revenue management appears under optional modules, and which tier includes which level of revenue recognition is not published. NetSuite ARM pricing is not published in Oracle's help documentation.

One cost Oracle does state: moving from classic Revenue Recognition to ARM requires "NetSuite Professional Services or a qualified NetSuite partner".

## Can you run Maxio with NetSuite as the general ledger?

Yes. Maxio's own case study about its finance team describes "keeping billing, revenue recognition, and reporting in Maxio and using NetSuite as a general ledger only". In that setup, allocation and schedules come from Maxio and NetSuite holds the books. Whether Maxio and ARM run together on the same contracts is not published.

## What does a relative-SSP allocation look like on a real bundle?

Take a $138,000.00, 36-month contract starting December 2026 with three obligations whose SSPs total $159,000.00. The $21,000.00 discount is spread pro rata by the relative SSP method. The allocation ties to $138,000.00, onboarding absorbs the residual cent, and the unrecognised balance reaches $0.00 in month 36.

| Obligation | Pattern | SSP | Allocated |
|---|---|---:|---:|
| Subscription | Ratable, 36 months | $120,000.00 | $104,150.94 |
| Premium support (24x7, 1-hr SLA) | Ratable, 36 months | $30,000.00 | $26,037.74 |
| Onboarding (absorbs residual cent) | Point in time, month 1 | $9,000.00 | $7,811.32 |
| **Total** | | **$159,000.00** | **$138,000.00** |

Month 1 (Dec 2026) recognises $11,427.67: subscription $2,893.08, support $723.27 and onboarding $7,811.32. Months 2 to 35 recognise $3,616.35 each. Month 36 (Nov 2029) recognises $3,616.43, because the subscription's final month absorbs $0.06 ($2,893.08 × 35 + $2,893.14) and support's absorbs $0.02 ($723.27 × 35 + $723.29). The engine result's SHA-256 hash is 527ca94f9afa96bae0f16aa3c70377d9918b970299299d6321fd41128a67e853.

A reviewer can re-perform these numbers from the SSPs alone, whichever tool books the contract. Try it in the app, or check the split in the [SSP allocation calculator](/tools/ssp-allocation-calculator).

## Where does SSP allocation evidence fit alongside either tool?

Soluqube is an allocation and evidence layer that sits next to Maxio or NetSuite. You confirm the obligations, price and SSPs. It returns the relative-SSP allocation in integer arithmetic, a full-term schedule that ties to the cent, clause evidence for each obligation and a SHA-256-hashed export for your external auditor.

Clause evidence is the page and verbatim excerpt behind each obligation. In the app, uploaded text-layer PDFs also get a highlight on the cited line, and exports carry the page and excerpt. Contract extraction is heuristic, so you confirm every field. You then book the result in whichever system holds your revenue.

The limits are plain. Soluqube does not do contract-modification accounting, does not handle usage-based fees, and has no billing or ERP sync. For vendor-by-vendor detail, see [Maxio alternatives](/alternatives/maxio), [NetSuite ARM alternatives](/alternatives/netsuite-arm) and [Soluqube vs Maxio](/soluqube-vs-maxio).

To test it on your own deals, send three of your hardest bundled contracts through the [design partner programme](/design-partners?utm_source=blog&utm_medium=community&utm_campaign=20261020-vs). Founding prices for the first 10 customers are on [pricing](/pricing).

## Sources

All checked on 20 Oct 2026.

- Maxio, revenue recognition: https://www.maxio.com/revenue-recognition
- Maxio, pricing: https://www.maxio.com/pricing
- Maxio, case study (Maxio with NetSuite): https://maxio.com/customers/maxio-netsuite
- Oracle NetSuite help, Advanced Revenue Management: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4328435538.html
- Oracle NetSuite help, transition to the new revenue standard: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4703499262.html
- Oracle NetSuite help, prospective merge of revenue arrangements: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_1498077674.html
    `
  },
  {
    slug: "chargebee-revrec-vs-maxio-ssp-allocation",
    title: "Chargebee RevRec vs Maxio: How Does Each Allocate SSP?",
    subtitle: "How Chargebee RevRec and Maxio set SSP, handle changes and post to the GL, from each vendor's own pages, with a 15-month free-months example.",
    publishedAt: "October 20, 2026",
    updatedAt: "October 20, 2026",
    readTime: "6 min read",
    author: {
      name: "Soluqube Editorial",
      role: "Technical Accounting Content",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["ASC 606", "SSP Allocation", "Chargebee RevRec", "Maxio", "Comparison"],
    targetQuery: "chargebee revrec vs maxio",
    definitionAnchor: "Chargebee RevRec is a revenue recognition subledger that allocates with \"a configurable SSP library tied to your price book\". Maxio is a billing and financial reporting platform with revenue recognition that handles SSP and negotiated prices; its allocation method is not published. Both name ASC 606 and IFRS 15.",
    excerpt: "A neutral comparison of Chargebee RevRec and Maxio on SSP, contract changes, controls, GL posting and price, using only each vendor's own pages (checked 20 Oct 2026). Includes a $54,000, 15-month free-months contract run through the Soluqube engine.",
    toc: [
      { id: "what-are-chargebee-revrec-and-maxio", label: "What are Chargebee RevRec and Maxio?" },
      { id: "how-do-chargebee-revrec-and-maxio-compare-side-by-side", label: "How do Chargebee RevRec and Maxio compare side by side?" },
      { id: "do-you-need-their-billing-product-to-use-their-revenue-recognition", label: "Do you need their billing product to use their revenue recognition?" },
      { id: "how-does-each-one-set-and-document-ssp", label: "How does each one set and document SSP?" },
      { id: "how-does-each-one-treat-upsells-renewals-and-other-changes", label: "How does each one treat upsells, renewals and other changes?" },
      { id: "how-does-each-one-post-to-your-general-ledger", label: "How does each one post to your general ledger?" },
      { id: "what-does-each-one-cost", label: "What does each one cost?" },
      { id: "how-is-a-free-months-bundle-allocated-by-ssp", label: "How is a free-months bundle allocated by SSP?" },
      { id: "where-does-ssp-allocation-evidence-fit-alongside-either-tool", label: "Where does SSP allocation evidence fit alongside either tool?" },
      { id: "sources", label: "Sources" }
    ],
    faqs: [
      {
        question: "Does Chargebee RevRec require Chargebee Billing?",
        answer: "For one plan, yes. Chargebee's pricing page says the Performance plan \"is available only to Chargebee Billing customers\". The Enterprise plan carries no such note, and Chargebee's product page lists direct integrations with Stripe and other systems. Whether Enterprise needs Chargebee Billing is not published."
      },
      {
        question: "Do free months change how much revenue each obligation gets?",
        answer: "Not by themselves. Allocation in Step 4 uses SSP and the total transaction price. Free months change when the customer is invoiced, not the relative SSP split. In the example here, $54,000 is spread over the full 15-month service period. Billing schedules and contract assets need separate analysis."
      },
      {
        question: "Can Soluqube sync with Chargebee or Maxio?",
        answer: "No. Soluqube has no billing or ERP sync today. You confirm the obligations, price and SSPs, and it returns the allocation, a schedule that ties to the cent and a hashed export with clause evidence. It also does not handle contract modifications or usage-based fees yet."
      }
    ],
    engineVerified: true,
    content: `
Chargebee RevRec and Maxio both offer revenue recognition close to subscription billing. This comparison uses only each vendor's own public pages, checked on 20 Oct 2026, and focuses on standalone selling price (SSP): how each one sets it, documents it and allocates the transaction price. Where a page doesn't say something, we write "not published". That means the page we read did not state it, not that the product lacks it. For the underlying method, read our [guide to SSP allocation under ASC 606](/blog/asc-606-ssp-allocation-guide).

## What are Chargebee RevRec and Maxio?

Chargebee RevRec is a revenue recognition subledger. Chargebee describes an "end-to-end, automated revenue recognition workflow based on ASC 606's and IFRS 15's five-step model". Maxio is a billing and financial reporting platform with revenue recognition, and its page also names ASC 606 and IFRS 15. One is a dedicated subledger; the other is part of a billing platform.

## How do Chargebee RevRec and Maxio compare side by side?

The table below sets each vendor's own wording side by side, row by row, with a link to the page each fact comes from. Every fact was checked on 20 Oct 2026. "Not published" means the page we read did not say it. Vendor pages change, so re-check before relying on any row.

| Topic | Chargebee RevRec | Maxio |
|---|---|---|
| What it is | Revenue recognition subledger ([Chargebee](https://www.chargebee.com/revenue-recognition-software/)) | Billing and financial reporting with revenue recognition ([Maxio](https://www.maxio.com/revenue-recognition)) |
| Standards named | "ASC 606's and IFRS 15's five-step model" ([Chargebee](https://www.chargebee.com/revenue-recognition-software/)) | ASC 606 and IFRS 15 ([Maxio](https://www.maxio.com/revenue-recognition)) |
| SSP | "a configurable SSP library tied to your price book"; "SSP documentation traceable at every step" ([Chargebee](https://www.chargebee.com/revenue-recognition-software/)) | Handles "standalone selling prices (SSP) and negotiated transaction prices"; method not published ([Maxio](https://www.maxio.com/revenue-recognition)) |
| Advanced SSP features | Enterprise: "Advanced Revenue Rules and SSP configurations", "SSP Price Analyzer" ([Chargebee pricing](https://www.chargebee.com/pricing/)) | Advanced revenue management listed under optional modules ([Maxio pricing](https://www.maxio.com/pricing)) |
| Contract changes | "upsells, co-terms, credit notes, early renewals, and other modifications" ([Chargebee](https://www.chargebee.com/revenue-recognition-software/)) | "Instantly edit contracts for upgrades, refunds, and other changes" ([Maxio](https://www.maxio.com/revenue-recognition)) |
| Controls | "Lock periods and enforce accounting controls" ([Chargebee](https://www.chargebee.com/revenue-recognition-software/)) | "Generate detailed audit trails"; period locks not published ([Maxio](https://www.maxio.com/revenue-recognition)) |
| GL posting | "Post summarized journal entries … on your fiscal calendar" ([Chargebee](https://www.chargebee.com/revenue-recognition-software/)) | Syncs "invoices and SaaS payments to NetSuite, Sage, QuickBooks, etc." ([Maxio](https://www.maxio.com/revenue-recognition)) |
| Source sync | "on a 24-hour cycle" ([Chargebee](https://www.chargebee.com/revenue-recognition-software/)) | Not published ([Maxio](https://www.maxio.com/revenue-recognition)) |
| Integrations named | Chargebee, Stripe, NetSuite, Sage Intacct, QuickBooks, Xero ([Chargebee](https://www.chargebee.com/revenue-recognition-software/)) | NetSuite, Sage, QuickBooks ([Maxio](https://www.maxio.com/revenue-recognition)) |
| Billing prerequisite | Performance plan "available only to Chargebee Billing customers"; Enterprise not published ([Chargebee pricing](https://www.chargebee.com/pricing/)) | Revenue recognition is part of Maxio's platform ([Maxio pricing](https://www.maxio.com/pricing)) |
| Price | Not published: Performance "request pricing", Enterprise by quote ([Chargebee pricing](https://www.chargebee.com/pricing/)) | Grow $599/month up to $100k monthly billings; Scale by quote ([Maxio pricing](https://www.maxio.com/pricing)) |

## Do you need their billing product to use their revenue recognition?

For Chargebee it depends on the plan. Its pricing page says the RevRec Performance plan "is available only to Chargebee Billing customers"; the Enterprise plan carries no such note, and the product page lists integrations with Stripe and others. Maxio's revenue recognition is part of its billing platform, with advanced revenue management listed as an optional module.

## How does each one set and document SSP?

Chargebee says allocation uses "a configurable SSP library tied to your price book", with "SSP documentation traceable at every step", and its Enterprise plan adds an "SSP Price Analyzer". Maxio says it handles "standalone selling prices (SSP) and negotiated transaction prices" and can "reallocate revenue". Maxio's allocation method is not published on the page we read.

For an audit file, the question is the same in either tool: can a reviewer see each SSP's basis, the share of price each obligation receives and the rounding rule, then re-perform the split outside the system?

## How does each one treat upsells, renewals and other changes?

Chargebee says it automates "recognition treatment for upsells, co-terms, credit notes, early renewals, and other modifications". Maxio says you can "instantly edit contracts for upgrades, refunds, and other changes", with schedules adjusted "without overwriting original data". Neither page we read sets out the accounting method for each type of change in detail.

## How does each one post to your general ledger?

Chargebee says RevRec can "post summarized journal entries to the right accounts in your general ledger, automatically, on your fiscal calendar", and billing data syncs in "on a 24-hour cycle". Maxio says it can "sync invoices and SaaS payments to NetSuite, Sage, QuickBooks, etc."; its sync frequency and revenue-journal posting method are not published.

## What does each one cost?

Maxio publishes Grow at $599 per month for up to $100k in monthly billings, with Scale by quote above that; which tier includes which level of revenue recognition is not published. Chargebee RevRec pricing is not published: the Performance plan says "request pricing", and Enterprise is by quote.

## How is a free-months bundle allocated by SSP?

Take a $54,000.00 contract for 15 months of service starting November 2026, with three months free. Subscription and standard support have SSPs totalling $63,000.00, so the $9,000.00 discount is spread pro rata. The $54,000.00 is recognised over the full 15-month service period, not just the paid months.

| Obligation | Pattern | SSP | Allocated |
|---|---|---:|---:|
| Subscription | Ratable, 15 months | $56,250.00 | $48,214.29 |
| Standard support (absorbs residual cent) | Ratable, 15 months | $6,750.00 | $5,785.71 |
| **Total** | | **$63,000.00** | **$54,000.00** |

Months 1 to 14 recognise $3,599.99 each: subscription $3,214.28 and support $385.71. Month 15 (Jan 2028) recognises $3,600.14, because the subscription's final month absorbs $0.09 ($3,214.28 × 14 + $3,214.37) and support's absorbs $0.06 ($385.71 × 14 + $385.77). Total recognised is $54,000.00 and the unrecognised balance ends at $0.00. The engine result's SHA-256 hash is f147aa14cb17c7a8427946e232f06d7bac7daf74d807b6f16bca79b590468a10.

The engine models recognition only. It does not model billing schedules or contract assets, so the gap between invoices and revenue in the free months needs separate analysis. Try it in the app, or check the split in the [SSP allocation calculator](/tools/ssp-allocation-calculator).

## Where does SSP allocation evidence fit alongside either tool?

Soluqube is an allocation and evidence layer that sits next to Chargebee RevRec or Maxio. You confirm the obligations, price and SSPs. It returns the relative-SSP allocation in integer arithmetic, a full-term schedule that ties to the cent, clause evidence for each obligation and a SHA-256-hashed export for your external auditor.

Clause evidence is the page and verbatim excerpt behind each obligation. In the app, uploaded text-layer PDFs also get a highlight on the cited line, and exports carry the page and excerpt. Contract extraction is heuristic, so you confirm every field. It is evidence you attach to the file for the deals an auditor samples, not a second subledger.

The limits are plain. Soluqube does not do contract-modification accounting, does not handle usage-based fees, and has no billing or ERP sync. For vendor-by-vendor detail, see [Chargebee RevRec alternatives](/alternatives/chargebee-revrec), [Maxio alternatives](/alternatives/maxio) and [Soluqube vs Maxio](/soluqube-vs-maxio).

To test it on your own deals, send three of your hardest bundled contracts through the [design partner programme](/design-partners?utm_source=blog&utm_medium=community&utm_campaign=20261020-vs). Founding prices for the first 10 customers are on [pricing](/pricing).

## Sources

All checked on 20 Oct 2026.

- Chargebee, revenue recognition software (RevRec): https://www.chargebee.com/revenue-recognition-software/
- Chargebee, pricing (RevRec plans): https://www.chargebee.com/pricing/
- Maxio, revenue recognition: https://www.maxio.com/revenue-recognition
- Maxio, pricing: https://www.maxio.com/pricing
    `
  },
  {
    slug: "asc-606-bundle-discount-allocation-saas",
    title: "How is a bundle discount allocated under ASC 606?",
    subtitle: "How ASC 606 allocates a bundle discount: the pro rata rule in 32-36, the narrow 32-37 exception, and a 24-month SaaS example that ties to the cent.",
    publishedAt: "October 20, 2026",
    updatedAt: "October 20, 2026",
    readTime: "6 min read",
    author: {
      name: "Soluqube Editorial",
      role: "Technical Accounting Content",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["ASC 606", "SSP Allocation", "Bundle Discount", "Relative SSP Method"],
    targetQuery: "how is a bundle discount allocated under asc 606",
    definitionAnchor: "Under ASC 606-10-32-36, a bundle discount exists when the total standalone selling price of a contract's obligations exceeds its transaction price. By default the discount is spread across every obligation in proportion to SSP. It goes to only some obligations when all three conditions in 32-37 are met.",
    excerpt: "What counts as a bundle discount under ASC 606, how the relative SSP method spreads it, when 32-37 lets you target it, and how to show it in a workpaper. Includes a $96,000, 24-month contract run through the Soluqube engine.",
    toc: [
      { id: "what-counts-as-a-discount-under-asc-606-10-32-36", label: "What counts as a discount under ASC 606-10-32-36?" },
      { id: "how-is-a-discount-spread-across-obligations-by-default", label: "How is a discount spread across obligations by default?" },
      { id: "what-does-a-pro-rata-discount-look-like-on-a-24-month-bundle", label: "What does a pro rata discount look like on a 24-month bundle?" },
      { id: "when-can-a-discount-go-to-only-some-obligations", label: "When can a discount go to only some obligations?" },
      { id: "how-do-you-show-the-discount-in-the-allocation-workpaper", label: "How do you show the discount in the allocation workpaper?" },
      { id: "how-can-you-test-this-on-your-own-contracts", label: "How can you test this on your own contracts?" }
    ],
    faqs: [
      {
        question: "Can the whole discount be allocated to the implementation fee?",
        answer: "Only if all three conditions in ASC 606-10-32-37 are met, which requires observable evidence that the discount belongs to that obligation. Without that evidence, the discount is spread pro rata across every obligation, including the subscription, and the implementation fee keeps its proportional share."
      },
      {
        question: "Is a bundle discount the same as variable consideration?",
        answer: "No. A bundle discount is a fixed gap between the contract price and the total SSP, known at inception. Variable consideration, such as usage fees or price concessions, is estimated and constrained in Step 3 before allocation starts. Soluqube's engine handles fixed prices only, so treat variable consideration as guidance."
      },
      {
        question: "Does a bundle discount change when revenue is recognised?",
        answer: "No. The discount changes how much each obligation is allocated in Step 4, not when it is recognised in Step 5. A ratable subscription is still recognised evenly over its term, and a point-in-time migration is still recognised when it is delivered, just at the lower allocated amount."
      }
    ],
    engineVerified: true,
    content: `
A bundle discount exists whenever a SaaS contract's price is lower than the total standalone selling price of everything it includes. ASC 606 spreads that discount across every performance obligation in proportion to SSP, unless observable evidence ties it to specific items. This post covers the default rule in ASC 606-10-32-36, the narrow exception in 32-37, and how to show the discount in an allocation workpaper. The worked example is a 24-month, three-obligation bundle run through the Soluqube engine, which uses integer arithmetic so the allocation ties to the contract price. If you need the steps before this one, start with how SSP allocation works in our [ASC 606 SSP allocation guide](/blog/asc-606-ssp-allocation-guide). Key terms: [standalone selling price](/glossary/standalone-selling-price), [transaction price](/glossary/transaction-price) and [relative SSP method](/glossary/relative-ssp-method).

## What counts as a discount under ASC 606-10-32-36?

Under ASC 606-10-32-36, a customer receives a discount for buying a bundle when the sum of the standalone selling prices of the promised goods or services exceeds the promised consideration. In SaaS, that usually means a subscription, implementation and support priced together for less than they would cost bought separately.

The comparison is between the [transaction price](/glossary/transaction-price) and total SSP, not list price. If your SSPs are list prices nobody actually pays, part of the apparent discount may simply be stale SSPs. Fix the SSP evidence first. Each item must also be a distinct [performance obligation](/glossary/performance-obligation); a discount can't be allocated to something that isn't one.

## How is a discount spread across obligations by default?

By default, ASC 606-10-32-36 allocates the discount proportionately to every performance obligation in the contract. Each obligation receives the transaction price multiplied by its SSP, divided by total SSP. That single formula spreads the discount pro rata, so every line is reduced by the same proportion of its SSP.

**Allocated amount = Transaction price × Obligation SSP ÷ Total SSP**

You don't calculate the discount separately and then subtract it. The relative formula does it in one step, and each line's discount is simply its SSP minus its allocated amount. The results rarely land on whole cents, so you need a written rounding rule. The engine rounds every obligation except the last half-up to the cent, and the last-listed obligation absorbs the residual cent.

## What does a pro rata discount look like on a 24-month bundle?

Take a $96,000.00, 24-month contract starting December 2026. Its three obligations have SSPs totalling $106,300.00: a subscription, a one-off data migration and standard support. The $10,300.00 discount is spread pro rata. The allocation ties to $96,000.00, and deferred revenue reaches $0.00 in the final month.

| Obligation | Pattern | SSP | Allocated |
|---|---|---:|---:|
| Subscription | Ratable, 24 months | $84,000.00 | $75,860.77 |
| Data migration | Point in time, month 1 | $12,500.00 | $11,288.81 |
| Standard support (absorbs residual cent) | Ratable, 24 months | $9,800.00 | $8,850.42 |
| **Total** | | **$106,300.00** | **$96,000.00** |

The subscription line is $96,000 × $84,000 ÷ $106,300, which rounds to $75,860.77. Data migration is $11,288.81, and standard support takes what remains: $8,850.42.

| Month | Recognised | Made up of | Deferred after month |
|---|---:|---|---:|
| 1 (Dec 2026) | $14,818.43 | Subscription $3,160.86 + migration $11,288.81 + support $368.76 | $81,181.57 |
| 2 (Jan 2027) | $3,529.62 | Subscription $3,160.86 + support $368.76 | $77,651.95 |
| 3–22 | $3,529.62 each | Subscription $3,160.86 + support $368.76 | falls by $3,529.62 a month |
| 23 (Oct 2028) | $3,529.62 | Subscription $3,160.86 + support $368.76 | $3,529.93 |
| 24 (Nov 2028) | $3,529.93 | Subscription $3,160.99 + support $368.94 | $0.00 |

The subscription recognises $3,160.86 × 23 months and then $3,160.99 in month 24. Support recognises $368.76 × 23 and then $368.94. Monthly amounts are rounded down and the final month absorbs the remainder ([terminal-period remainder absorption](/glossary/terminal-period-remainder-absorption)). Total recognised is $96,000.00. The engine result's SHA-256 hash is 734e129170b590beb4a306a898c140ce86088fe15c996af80eed3335cba3aaa0. You can reproduce this schedule in the app, or re-perform the allocation in the [SSP allocation calculator](/tools/ssp-allocation-calculator).

## When can a discount go to only some obligations?

Only when all three conditions in ASC 606-10-32-37 are met: you regularly sell each distinct good or service on its own; you regularly sell a bundle of some of them at a discount; and that bundle's discount is substantially the same as the contract discount, with observable evidence showing which obligations it belongs to.

In SaaS this is rare, because few vendors sell implementation and support as a separately discounted bundle often enough to build that evidence. Wanting to load the discount onto a one-off fee so more revenue lands up front is not a reason. If the conditions are met, ASC 606-10-32-38 says to allocate the discount before using the [residual approach](/glossary/residual-approach) for any obligation. The Soluqube engine and calculator apply the default pro rata rule; a targeted 32-37 allocation is a judgement you document separately.

## How do you show the discount in the allocation workpaper?

Show each obligation's SSP and its basis, the transaction price, total SSP and the allocated amounts side by side, so a reviewer can see the discount and re-perform the split. State which rule applied, pro rata under 32-36 or targeted under 32-37, and the evidence behind that choice.

A reviewer re-performing the allocation should need nothing beyond the page. Include:

1. The contract price and each obligation, with its clause page and excerpt.
2. Each SSP, its estimation method and source data.
3. The discount rule applied, with 32-37 evidence if it was targeted.
4. The allocation and the written residual-cent rule.
5. A schedule that ends at $0.00 deferred, plus the export hash.

The [sample SSP workpaper](/samples/soluqube-ssp-sample.pdf) shows this layout. For how the rounding rule is chosen and documented, see our post on [where the residual cent goes](/blog/ssp-allocation-rounding-residual-cent-asc-606). For the opposite case, where the contract price is above total SSP, see [what happens when a SaaS bundle sells above the sum of its SSPs](/blog/asc-606-bundle-price-above-ssp-premium-allocation).

## How can you test this on your own contracts?

Send us three of your hardest bundled contracts through the [design partner programme](/design-partners?utm_source=blog&utm_medium=community&utm_campaign=20261019-sprint), and you get a free 3-contract workpaper. You confirm the obligations and stated prices. We send back the relative SSP allocation, a schedule that ties to the cent, clause evidence for each obligation, and a hashed export.

Founding prices for the first 10 customers are available on [pricing](/pricing). The engine doesn't model contract modifications, variable consideration or billing schedules yet, so treat those topics as guidance only.
    `
  },
  {
    slug: "asc-606-bundle-price-above-ssp-premium-allocation",
    title: "What if a SaaS bundle sells above the sum of its SSPs?",
    subtitle: "When a SaaS contract price is above total SSP, ASC 606 spreads the premium pro rata. A 12-month example that ties to the cent, plus what the memo says.",
    publishedAt: "October 20, 2026",
    updatedAt: "October 20, 2026",
    readTime: "5 min read",
    author: {
      name: "Soluqube Editorial",
      role: "Technical Accounting Content",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["ASC 606", "SSP Allocation", "Bundle Premium", "Relative SSP Method"],
    targetQuery: "what if bundle price is higher than sum of standalone selling prices",
    definitionAnchor: "When a contract's transaction price is higher than the total standalone selling price of its obligations, ASC 606 has no separate premium rule. The relative SSP method in ASC 606-10-32-29 allocates the whole price, so the premium is spread across every obligation in proportion to SSP.",
    excerpt: "Can a SaaS contract price exceed total SSP, how relative SSP spreads the premium, when a premium means your SSPs are stale, and what the memo should say. Includes a $66,000, 12-month contract run through the Soluqube engine.",
    toc: [
      { id: "can-the-transaction-price-exceed-the-total-ssp", label: "Can the transaction price exceed the total SSP?" },
      { id: "how-does-relative-ssp-allocate-a-premium", label: "How does relative SSP allocate a premium?" },
      { id: "what-does-a-premium-look-like-on-a-12-month-saas-bundle", label: "What does a premium look like on a 12-month SaaS bundle?" },
      { id: "is-a-premium-a-sign-that-the-ssps-are-stale", label: "Is a premium a sign that the SSPs are stale?" },
      { id: "what-should-the-memo-say", label: "What should the memo say?" },
      { id: "how-can-you-test-this-on-your-own-contracts", label: "How can you test this on your own contracts?" }
    ],
    faqs: [
      {
        question: "Can the whole premium be allocated to the subscription?",
        answer: "ASC 606 gives no premium equivalent of the 32-37 discount exception, so the default is a pro rata spread under 32-29. If you believe the premium really belongs to one obligation, that usually means its SSP is understated. Fix the SSP estimate and its evidence rather than targeting the premium."
      },
      {
        question: "Does a premium change when revenue is recognised?",
        answer: "No. The premium changes how much each obligation is allocated in Step 4, not when it is recognised in Step 5. A ratable subscription is still recognised evenly over its term, and a point-in-time implementation is still recognised when it is delivered, just at the higher allocated amount."
      },
      {
        question: "Is a premium the same as variable consideration?",
        answer: "No. A premium is a fixed gap between the contract price and total SSP, known at inception. Variable consideration, such as usage fees or bonuses, is estimated and constrained in Step 3 before allocation. Soluqube's engine handles fixed prices only, so treat variable consideration as guidance."
      }
    ],
    engineVerified: true,
    content: `
Most bundled SaaS contracts sell below the total standalone selling price of what they include. Some sell above it, because a customer pays for a dedicated success manager, a fast start or simply a strong negotiating position on your side. ASC 606 has no separate rule for that premium: the relative SSP method allocates the whole transaction price, so the premium is spread pro rata. This post explains why, what a premium may say about your SSPs, and what the memo should record. The worked example is a 12-month, three-obligation bundle run through the Soluqube engine, which uses integer arithmetic so the allocation ties to the contract price. For the full method, start with how SSP allocation works in our [ASC 606 SSP allocation guide](/blog/asc-606-ssp-allocation-guide). Key terms: [standalone selling price](/glossary/standalone-selling-price), [transaction price](/glossary/transaction-price) and [relative SSP method](/glossary/relative-ssp-method).

## Can the transaction price exceed the total SSP?

Yes. Nothing in ASC 606 requires the transaction price to be at or below the sum of standalone selling prices. SSP is an estimate of what each item would sell for on its own, and a negotiated bundle can land above that total. The standard then allocates the full transaction price, premium included.

The discount rules in ASC 606-10-32-36 to 32-38 deal only with prices below total SSP. There is no mirror-image "premium" paragraph. So the general rule in 32-29 applies: allocate the [transaction price](/glossary/transaction-price) to each [performance obligation](/glossary/performance-obligation) in proportion to its SSP. The premium is not a separate line, a gain or an extra obligation. It is part of the price.

## How does relative SSP allocate a premium?

The same formula that spreads a discount spreads a premium. Each obligation receives the transaction price multiplied by its SSP, divided by total SSP. Because the price is above total SSP, every allocated amount comes out above its SSP, and each line carries the same proportion of the premium.

**Allocated amount = Transaction price × Obligation SSP ÷ Total SSP**

You don't compute the premium first and then add it. The relative formula does it in one step, and each line's premium is its allocated amount minus its SSP. The results rarely land on whole cents, so you need a written rounding rule. The engine rounds every obligation except the last half-up to the cent, and the last-listed obligation absorbs the residual cent.

## What does a premium look like on a 12-month SaaS bundle?

Take a $66,000.00, 12-month contract starting January 2027. Its three obligations have SSPs totalling $64,500.00: a subscription, a dedicated customer success manager and a one-off implementation. The $1,500.00 premium is spread pro rata. The allocation ties to $66,000.00, and deferred revenue reaches $0.00 in month 12.

| Obligation | Pattern | SSP | Allocated |
|---|---|---:|---:|
| Subscription | Ratable, 12 months | $48,000.00 | $49,116.28 |
| Dedicated CSM | Ratable, 12 months | $9,000.00 | $9,209.30 |
| Implementation (absorbs residual cent) | Point in time, month 1 | $7,500.00 | $7,674.42 |
| **Total** | | **$64,500.00** | **$66,000.00** |

The subscription line is $66,000 × $48,000 ÷ $64,500, which rounds to $49,116.28. The dedicated CSM is $9,209.30, and implementation takes what remains: $7,674.42.

| Month | Recognised | Made up of | Deferred after month |
|---|---:|---|---:|
| 1 (Jan 2027) | $12,534.88 | Subscription $4,093.02 + CSM $767.44 + implementation $7,674.42 | $53,465.12 |
| 2 (Feb 2027) | $4,860.46 | Subscription $4,093.02 + CSM $767.44 | $48,604.66 |
| 3–10 | $4,860.46 each | Subscription $4,093.02 + CSM $767.44 | falls by $4,860.46 a month |
| 11 (Nov 2027) | $4,860.46 | Subscription $4,093.02 + CSM $767.44 | $4,860.52 |
| 12 (Dec 2027) | $4,860.52 | Subscription $4,093.06 + CSM $767.46 | $0.00 |

The subscription recognises $4,093.02 × 11 months and then $4,093.06 in month 12. The CSM recognises $767.44 × 11 and then $767.46. Monthly amounts are rounded down and the final month absorbs the remainder ([terminal-period remainder absorption](/glossary/terminal-period-remainder-absorption)). Total recognised is $66,000.00. The engine result's SHA-256 hash is b17819f44f249771fd41b7da41fc82a0fdd6026eee0f35914dc876c1545b1605. You can reproduce this schedule in the app, or re-perform the allocation in the [SSP allocation calculator](/tools/ssp-allocation-calculator).

## Is a premium a sign that the SSPs are stale?

Often, yes. If customers regularly pay more for the bundle than your SSPs add up to, at least one SSP is probably understated, usually the one priced from an old list or a cost-plus estimate. A premium can also mean a promise is missing from the obligation list. Check both before you allocate.

A one-off premium on a single negotiated deal is plausible. A pattern is evidence. Compare the contract with recent standalone sales and with your [SSP range](/glossary/ssp-range), if you set one. If the dedicated CSM is regularly sold alone for more than its SSP, update that estimate using an [observable price](/glossary/observable-price). Also read the contract for anything you haven't listed as a [distinct good or service](/glossary/distinct-good-or-service), such as a separate training session or an extra environment. Allocating a premium across the wrong list of obligations moves revenue between periods.

## What should the memo say?

The memo should state that the transaction price exceeds total SSP, give both figures, and explain why the premium is plausible for this deal. It should confirm that the SSPs and the obligation list were reviewed, and that the premium was spread pro rata under 32-29 with a written residual-cent rule.

A reviewer should be able to re-perform the allocation from the page alone. Include:

1. The contract price and each obligation, with its clause page and excerpt.
2. Each SSP, its estimation method and source data.
3. Why the price is above total SSP, and what was checked.
4. The allocation and the written residual-cent rule.
5. A schedule that ends at $0.00 deferred, plus the export hash.

The [sample SSP workpaper](/samples/soluqube-ssp-sample.pdf) shows this layout. For a simpler two-obligation case with the same method, see our [subscription and implementation SSP example](/blog/ssp-allocation-example-saas-subscription-implementation). For the more common case, where the price is below total SSP, see [how a bundle discount is allocated under ASC 606](/blog/asc-606-bundle-discount-allocation-saas).

## How can you test this on your own contracts?

Send us three of your hardest bundled contracts through the [design partner programme](/design-partners?utm_source=blog&utm_medium=community&utm_campaign=20261019-sprint), and you get a free 3-contract workpaper. You confirm the obligations and stated prices. We send back the relative SSP allocation, a schedule that ties to the cent, clause evidence for each obligation, and a hashed export.

Founding prices for the first 10 customers are available on [pricing](/pricing). The engine doesn't model contract modifications, variable consideration or billing schedules yet, so treat those topics as guidance only.
    `
  },
  {
    slug: "standalone-selling-price-formula-ssp-calculation",
    title: "What is the standalone selling price formula?",
    subtitle: "The relative SSP formula, how to round each allocation so the total ties, and a spreadsheet layout, with a $50,000 three-line SaaS example.",
    publishedAt: "October 20, 2026",
    updatedAt: "October 20, 2026",
    readTime: "5 min read",
    author: {
      name: "Soluqube Editorial",
      role: "Technical Accounting Content",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["ASC 606", "SSP Allocation", "Relative SSP Method", "SSP Formula"],
    targetQuery: "standalone selling price formula",
    definitionAnchor: "The standalone selling price formula under ASC 606-10-32-31 allocates the transaction price to each performance obligation in proportion to its SSP: allocated amount = transaction price × obligation SSP ÷ total SSP. Each result is rounded to the cent, and a written rule decides which line takes the residual so the total ties.",
    excerpt: "The relative SSP formula, how to compute the ratios, how to round each allocation so the total ties to the contract price, and how to lay it out in a spreadsheet. Includes a $50,000, 12-month contract run through the Soluqube engine.",
    toc: [
      { id: "what-is-the-relative-ssp-formula", label: "What is the relative SSP formula?" },
      { id: "how-do-you-compute-the-weights", label: "How do you compute the weights?" },
      { id: "what-does-the-formula-give-on-a-50000-saas-bundle", label: "What does the formula give on a $50,000 SaaS bundle?" },
      { id: "how-should-each-allocation-be-rounded-so-the-total-ties", label: "How should each allocation be rounded so the total ties?" },
      { id: "how-do-you-lay-it-out-in-a-spreadsheet", label: "How do you lay it out in a spreadsheet?" },
      { id: "how-to-calculate-relative-ssp-allocation-fast", label: "How to calculate relative SSP allocation fast" },
      { id: "how-can-you-test-this-on-your-own-contracts", label: "How can you test this on your own contracts?" }
    ],
    faqs: [
      {
        question: "Is the SSP formula the same under ASC 606 and IFRS 15?",
        answer: "Yes. Both standards allocate the transaction price on a relative standalone selling price basis, and Ind AS 115 follows IFRS 15. The formula is identical. Differences in practice come from how each company estimates SSP and documents its evidence, not from the arithmetic of the allocation."
      },
      {
        question: "Do I have to use the relative SSP formula for every contract?",
        answer: "It is the default under ASC 606-10-32-29. A discount can go to only some obligations when the 32-37 criteria are met, and the residual approach is limited to SSPs that are highly variable or uncertain. Outside those cases, the relative formula applies to the whole transaction price."
      },
      {
        question: "Should I round the weights or the amounts?",
        answer: "Round the amounts, not the weights. A weight rounded to two decimals can move an allocation by hundreds of dollars on a large contract. Keep the full ratio in the calculation, round each allocated amount to the cent, and let one written rule decide which line takes the residual."
      }
    ],
    engineVerified: true,
    content: `
The standalone selling price formula is the arithmetic at the centre of Step 4 of ASC 606. Once you have a transaction price and an SSP for each performance obligation, the formula allocates the price in proportion to those SSPs. The formula is one line. The hard parts are getting the ratios right, rounding each result so the total ties to the contract price, and laying the calculation out so a reviewer can re-perform it. This post covers all three with a three-line, 12-month SaaS bundle run through the Soluqube engine, which uses integer arithmetic so the allocation ties to the cent. For how SSPs are estimated in the first place, see how SSP allocation works in our [ASC 606 SSP allocation guide](/blog/asc-606-ssp-allocation-guide). Key terms: [standalone selling price](/glossary/standalone-selling-price), [transaction price](/glossary/transaction-price) and [relative SSP method](/glossary/relative-ssp-method).

## What is the relative SSP formula?

The relative SSP formula allocates the transaction price to each performance obligation in proportion to its standalone selling price. Each obligation receives the contract price multiplied by its own SSP and divided by the sum of all SSPs. ASC 606-10-32-31 sets this as the method, and it applies whether the bundle sells at a discount or a premium.

**Allocated amount = Transaction price × Obligation SSP ÷ Total SSP**

The formula needs two inputs you have already settled: the [transaction price](/glossary/transaction-price) from Step 3 and an SSP for each [performance obligation](/glossary/performance-obligation). If the price is below total SSP, the formula spreads the discount pro rata. If it is above, it spreads the premium the same way.

## How do you compute the weights?

Each weight is one obligation's SSP divided by total SSP. The weights always add up to exactly one, so the allocations add up to the full contract price. Keep each weight as an exact ratio rather than a rounded percentage, because a weight rounded too early moves the allocated amount, sometimes by more than a few cents.

Most SSP sets do not divide cleanly. In the example below, total SSP is $55,000.00, and a ratio such as $45,000 ÷ $55,000 is a repeating decimal that never terminates. A spreadsheet that shows the weight to two decimals and then multiplies by that displayed figure gives a different answer from one that keeps the full ratio. The safe order is to multiply first, divide second and round last.

## What does the formula give on a $50,000 SaaS bundle?

Take a $50,000.00, 12-month contract starting November 2026, with a subscription, onboarding and training. Their SSPs total $55,000.00, so the $5,000.00 discount is spread pro rata. The formula allocates $40,909.09, $6,363.64 and $2,727.27, which ties to $50,000.00, and deferred revenue reaches $0.00 in month 12.

| Obligation | Pattern | SSP | Allocated |
|---|---|---:|---:|
| Subscription | Ratable, 12 months | $45,000.00 | $40,909.09 |
| Onboarding | Point in time, month 1 | $7,000.00 | $6,363.64 |
| Training (absorbs residual cent) | Point in time, month 2 | $3,000.00 | $2,727.27 |
| **Total** | | **$55,000.00** | **$50,000.00** |

The subscription line is $50,000 × $45,000 ÷ $55,000, rounded to $40,909.09. Onboarding rounds up to $6,363.64. Training takes what is left: $50,000.00 − $40,909.09 − $6,363.64 = $2,727.27.

| Month | Recognised | Made up of | Deferred after month |
|---|---:|---|---:|
| 1 (Nov 2026) | $9,772.73 | Subscription $3,409.09 + onboarding $6,363.64 | $40,227.27 |
| 2 (Dec 2026) | $6,136.36 | Subscription $3,409.09 + training $2,727.27 | $34,090.91 |
| 3–11 | $3,409.09 each | Subscription | falls to $3,409.10 |
| 12 (Oct 2027) | $3,409.10 | Subscription | $0.00 |

The subscription recognises $3,409.09 for 11 months and $3,409.10 in month 12, so the final month absorbs $0.01 ([terminal-period remainder absorption](/glossary/terminal-period-remainder-absorption)). Total recognised is $50,000.00. The engine result's SHA-256 hash is 7bb1cfef98f0a6f167119def1bef783ffa27d1d5fbe17bf729f5be263b6688d8. This schedule is engine behaviour: the app's upload workbook gives the same allocation but puts every point-in-time item in month 1. You can re-perform the allocation in the [SSP allocation calculator](/tools/ssp-allocation-calculator).

## How should each allocation be rounded so the total ties?

Round every line except one to the cent, then give the last line whatever remains of the transaction price. That way the allocations always add up to the contract price exactly. The rule should be written down, applied the same way every time, and name which line takes the residual, so a reviewer gets the same answer.

Rounding each line on its own and adding them up can leave the total a cent above or below the contract price. In the example, the rounded shares happen to add up to $50,000.00, so the residual on the training line is zero. On another contract it will be a cent. Our post on [where the residual cent goes in SSP allocation](/blog/ssp-allocation-rounding-residual-cent-asc-606) walks through cases where it is not zero. The same idea applies in Step 5: round the monthly amounts down and let the final month absorb the remainder, so deferred revenue ends at $0.00.

## How do you lay it out in a spreadsheet?

Use one row per obligation and one column per step: SSP, SSP source, the weight as a full ratio, the raw allocation, the rounded allocation, and a residual check. Put the transaction price and total SSP in labelled cells, reference them by name, and add a control cell showing allocations minus price, which should be zero.

A layout a reviewer can follow usually has:

1. The contract price, with its clause page and excerpt.
2. Each obligation, its SSP and the [observable price](/glossary/observable-price) or estimate behind it.
3. The formula in each row, referencing the price and total SSP cells, not typed numbers.
4. The rounding rule in words, next to the line that takes the residual.
5. A monthly schedule that ends at $0.00 deferred.

The [sample SSP workpaper](/samples/soluqube-ssp-sample.pdf) shows the same structure as a finished document.

## How to calculate relative SSP allocation fast

When technical accountants, auditors, or gap analysts evaluate a sample of 20 to 50 revenue contracts during year-end close or pre-audit testing, setting up multi-column workpapers in Excel for each multi-element contract consumes 30 to 45 minutes per contract. Manual spreadsheets frequently introduce floating-point rounding errors where the sum of rounded obligations differs by a cent from the contract price.

To calculate relative SSP allocation quickly and avoid spreadsheet rebuilds:

1. **Use an instant allocation engine**: Instead of writing nested \`ROUND()\` formulas in Excel, tools like our free [SSP Allocation Calculator](/tools/ssp-allocation-calculator) compute proportional weights in integer arithmetic, tie out deferred schedules to the exact cent, and absorb terminal-period residuals automatically in under 30 seconds.
2. **Standardize your PBC documentation**: Auditors testing SSP under PCAOB standards look for three pieces of evidence: the observable historical price band (e.g., standalone list minus median discount), the math recalculation, and the exact contract clause excerpt. Keeping the clause snippet attached directly to the allocation prevents back-and-forth review comments.
3. **Compare dedicated rev-rec subledgers**: If you are scaling beyond manual spreadsheets or evaluating alternatives to ERP modules, review dedicated standalone engines such as our [NetSuite ARM Alternatives](/alternatives/netsuite-arm), [Sage Intacct Alternatives](/alternatives/sage-intacct-revenue), and [Maxio Alternatives](/alternatives/maxio) guides.

## How can you test this on your own contracts?

Send us three of your hardest bundled contracts through the [design partner programme](/design-partners?utm_source=blog&utm_medium=community&utm_campaign=20261020-sprint), and you get a free 3-contract workpaper. You confirm the obligations and stated prices. We send back the relative SSP allocation, a schedule that ties to the cent, clause evidence for each obligation, and a hashed export.

Founding prices for the first 10 customers are available on [pricing](/pricing). The engine doesn't model contract modifications, variable consideration or billing schedules yet, so treat those topics as guidance only.
    `
  },
  {
    slug: "saas-training-separate-performance-obligation-asc-606",
    title: "Is SaaS training a separate performance obligation?",
    subtitle: "When SaaS training is distinct under ASC 606, when it is recognised, how to set its SSP, and a $72,000 example with two training deliveries.",
    publishedAt: "October 20, 2026",
    updatedAt: "October 20, 2026",
    readTime: "5 min read",
    author: {
      name: "Soluqube Editorial",
      role: "Technical Accounting Content",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["ASC 606", "SSP Allocation", "Performance Obligations", "SaaS Training"],
    targetQuery: "is saas training a separate performance obligation",
    definitionAnchor: "SaaS training is usually a separate performance obligation under ASC 606 when the customer can benefit from it with the software or with resources it already has, and when it does not significantly modify the software. It then takes a share of the transaction price by relative SSP and is recognised when it is delivered.",
    excerpt: "When training is distinct from a SaaS subscription, whether it is recognised at a point in time or over time, how to estimate its SSP, and what auditors ask. Includes a $72,000, 24-month contract run through the Soluqube engine.",
    toc: [
      { id: "when-is-training-distinct", label: "When is training distinct?" },
      { id: "is-training-recognised-at-a-point-in-time-or-over-time", label: "Is training recognised at a point in time or over time?" },
      { id: "how-do-you-estimate-ssp-for-training", label: "How do you estimate SSP for training?" },
      { id: "how-is-a-72000-contract-with-two-trainings-allocated", label: "How is a $72,000 contract with two trainings allocated?" },
      { id: "what-do-auditors-ask-about-training", label: "What do auditors ask about training?" },
      { id: "how-can-you-test-this-on-your-own-contracts", label: "How can you test this on your own contracts?" }
    ],
    faqs: [
      {
        question: "Is free training included in a SaaS deal still a performance obligation?",
        answer: "It can be. If the training is a promise in the contract and is distinct, it is a performance obligation even when the order form shows no separate price. It still receives a share of the transaction price by relative SSP, which moves some revenue out of the subscription and into the training delivery."
      },
      {
        question: "What happens to training the customer never uses?",
        answer: "Revenue for the training stays deferred until the training is delivered or the right to it expires. If the company expects some training to go unused and can estimate how much, the breakage guidance applies. Document the expiry terms and the history behind any estimate of unused training."
      },
      {
        question: "Is on-demand video training a separate performance obligation?",
        answer: "Often it is not material enough to treat separately, and access to a self-serve library may be part of the subscription itself. Assess whether the customer pays for it as a distinct promise. If it is distinct and material, it is usually recognised over the access period rather than at a point in time."
      }
    ],
    engineVerified: true,
    content: `
Training is one of the most common items in a SaaS order form and one of the least documented. Whether it is a separate performance obligation decides how much of the contract price is recognised when a session is delivered, and how much stays in the subscription. This post covers the distinct test, recognition timing, SSP evidence and the questions auditors ask, with a $72,000, 24-month contract run through the Soluqube engine. For the full Step 4 picture, see our [ASC 606 SSP allocation guide](/blog/asc-606-ssp-allocation-guide), which explains how SSP allocation works across a bundle. Key terms: [performance obligation](/glossary/performance-obligation), [distinct good or service](/glossary/distinct-good-or-service) and [standalone selling price](/glossary/standalone-selling-price).

## When is training distinct?

Training is distinct when two tests are met under ASC 606-10-25-19. The customer can benefit from it, with the software or with readily available resources, and it is separately identifiable from the subscription. Standard admin or user training usually passes both. Training that is part of a significant customisation of the software usually does not.

The second test is where judgement sits. ASC 606-10-25-21 asks whether the vendor is integrating the training with the software into a combined output, whether the training significantly modifies the software, and whether the two are highly interdependent. Training on how to use a product as it is sold rarely meets any of these. Signs that training is distinct include:

1. The vendor or third parties sell the same training on its own.
2. The customer can use the software without it.
3. The training does not change the software's code or configuration.

## Is training recognised at a point in time or over time?

Training is a service, so it is recognised as it is delivered. A live session delivered on one day is in practice recognised on that day, which looks like point-in-time recognition. A programme of sessions over several months is recognised over time as each session is delivered, using an input or output measure of progress.

What matters is the delivery date, not the invoice date or the contract start. If training is billed upfront but delivered in month four, its revenue stays deferred until month four. See [point-in-time recognition](/glossary/point-in-time-recognition) and [ratable recognition](/glossary/ratable-recognition) for how each pattern behaves in a schedule.

## How do you estimate SSP for training?

Use an [observable price](/glossary/observable-price) first: the price at which the company sells the same training on its own, such as a published day rate. If there is none, estimate it with [expected cost plus margin](/glossary/expected-cost-plus-margin), built from trainer days, preparation time and a margin consistent with other services.

A list price that is always discounted is weak evidence. A day rate actually charged on standalone training orders is strong evidence. Keep the source of each SSP in the workpaper next to the figure, so the reviewer can trace it without asking.

## How is a $72,000 contract with two trainings allocated?

Take a $72,000.00, 24-month contract starting February 2027, with a subscription, live admin training in month 1 and a train-the-trainer workshop in month 4. Their SSPs total $72,400.00, so the $400.00 discount is spread pro rata. The allocations are $63,646.41, $4,773.48 and $3,580.11, which tie to $72,000.00.

| Obligation | Pattern | SSP | Allocated |
|---|---|---:|---:|
| Subscription | Ratable, 24 months | $64,000.00 | $63,646.41 |
| Live admin training | Point in time, month 1 | $4,800.00 | $4,773.48 |
| Train-the-trainer workshop (absorbs residual cent) | Point in time, month 4 | $3,600.00 | $3,580.11 |
| **Total** | | **$72,400.00** | **$72,000.00** |

The workshop takes what is left: $72,000.00 − $63,646.41 − $4,773.48 = $3,580.11.

| Month | Recognised | Made up of | Deferred after month |
|---|---:|---|---:|
| 1 (Feb 2027) | $7,425.41 | Subscription $2,651.93 + live admin training $4,773.48 | $64,574.59 |
| 2–3 | $2,651.93 each | Subscription | falls to $59,270.73 |
| 4 (May 2027) | $6,232.04 | Subscription $2,651.93 + workshop $3,580.11 | $53,038.69 |
| 5–23 | $2,651.93 each | Subscription | falls to $2,652.02 |
| 24 (Jan 2029) | $2,652.02 | Subscription | $0.00 |

The subscription recognises $2,651.93 for 23 months and $2,652.02 in month 24, so the final month absorbs $0.09 ([terminal-period remainder absorption](/glossary/terminal-period-remainder-absorption)). Total recognised is $72,000.00. The engine result's SHA-256 hash is f6c0569d8f32cec97b8ab2e5c6fcc9c4702c63a04b781d65f67c315553d836ff. This schedule is engine behaviour: the app's upload workbook gives the same allocation but puts every point-in-time item in month 1. You can re-perform the allocation in the [SSP allocation calculator](/tools/ssp-allocation-calculator).

## What do auditors ask about training?

Auditors ask four things: why the training is distinct, where its SSP comes from, when it was actually delivered, and what happens to training the customer has not used. The answers belong in the workpaper before fieldwork, with the contract clause and delivery evidence attached to each training line.

In practice that means:

1. The distinct assessment, citing the clause that describes the training.
2. The SSP source: standalone orders, a day rate or a cost build.
3. Delivery evidence, such as attendance records or a customer sign-off, dated within the period.
4. Cutoff: training delivered just after period end stays deferred.
5. Expiry terms for unused training, and whether [breakage](/glossary/breakage) applies.

For a related service line, our post on [allocating SSP to subscription and implementation](/blog/ssp-allocation-example-saas-subscription-implementation) shows the same workpaper structure. The [sample SSP workpaper](/samples/soluqube-ssp-sample.pdf) shows it as a finished document.

## How can you test this on your own contracts?

Send us three of your hardest bundled contracts through the [design partner programme](/design-partners?utm_source=blog&utm_medium=community&utm_campaign=20261020-sprint), and you get a free 3-contract workpaper. You confirm the obligations and stated prices. We send back the relative SSP allocation, a schedule that ties to the cent, clause evidence for each obligation, and a hashed export.

Founding prices for the first 10 customers are available on [pricing](/pricing). The engine doesn't model contract modifications, variable consideration, breakage estimates or billing schedules yet, so treat those topics as guidance only.
    `
  },
  {
    slug: "ssp-allocation-mistakes-asc-606",
    title: "What SSP allocation mistakes do auditors flag?",
    subtitle: "Ten SSP allocation mistakes across estimation, obligations, arithmetic and schedules, with a $186,000, 36-month contract run through the Soluqube engine.",
    publishedAt: "October 23, 2026",
    updatedAt: "October 23, 2026",
    readTime: "6 min read",
    author: {
      name: "Soluqube Editorial",
      role: "Technical Accounting Content",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["ASC 606", "SSP Allocation", "Audit Readiness", "Relative SSP Method"],
    targetQuery: "ssp allocation mistakes",
    definitionAnchor: "An SSP allocation mistake is any gap in ASC 606 Step 4 that stops a reviewer re-performing the allocation: an SSP with no evidence, a merged or missing performance obligation, a discount placed without meeting ASC 606-10-32-37, rounding that does not tie, or a schedule that leaves deferred revenue after the term.",
    excerpt: "Ten SSP allocation mistakes auditors raise under ASC 606, from undocumented SSPs to schedules that don't tie, with a $186,000 engine-run example.",
    toc: [
      { id: "what-counts-as-an-ssp-allocation-mistake", label: "What counts as an SSP allocation mistake?" },
      { id: "which-mistakes-happen-when-estimating-ssp", label: "Which mistakes happen when estimating SSP?" },
      { id: "which-mistakes-happen-when-identifying-obligations", label: "Which mistakes happen when identifying obligations?" },
      { id: "which-mistakes-happen-in-the-allocation-arithmetic", label: "Which mistakes happen in the allocation arithmetic?" },
      { id: "which-mistakes-happen-in-the-revenue-schedule", label: "Which mistakes happen in the revenue schedule?" },
      { id: "what-does-a-clean-allocation-look-like-on-a-186000-contract", label: "What does a clean allocation look like on a $186,000 contract?" },
      { id: "what-should-the-ssp-file-hold-before-fieldwork", label: "What should the SSP file hold before fieldwork?" },
      { id: "how-can-you-test-this-on-your-own-contracts", label: "How can you test this on your own contracts?" }
    ],
    faqs: [
      {
        question: "Is a rounding cent in an SSP allocation an audit finding?",
        answer: "On its own it is usually far below materiality. What it can signal is a weaker control: no written rounding rule, or a schedule nobody ties back to the contract price. Auditors tend to spend their time on SSP judgement, obligations and cutoff, so fix the rule once and move on."
      },
      {
        question: "Do you reallocate existing contracts when SSPs change?",
        answer: "No. ASC 606-10-32-43 says the transaction price is not reallocated for changes in standalone selling prices after contract inception. Updated SSPs apply to new contracts. Keep the SSP set used at inception with each contract, so a reviewer can see which figures applied on the day it was signed."
      },
      {
        question: "Is using the residual approach always a mistake?",
        answer: "No. ASC 606-10-32-34(c) allows it when an SSP is highly variable or uncertain, for example a new product with no pricing history. The mistake is using it as a shortcut when observable prices or a reasonable estimate exist. Document why the criteria are met and check the residual result is reasonable."
      }
    ],
    engineVerified: true,
    content: `
SSP allocation is where many ASC 606 review comments start, and most of them are not about arithmetic. They are about an SSP with no evidence behind it, a service folded into the subscription, a discount placed on one line without support, or a schedule that does not end at zero. This post lists ten mistakes grouped by where they happen in Step 4, then shows a clean allocation on a $186,000.00, 36-month contract run through the Soluqube engine. The list comes from the standard's requirements, not from a survey, so use it as a checklist rather than a ranking. For how SSP allocation works end to end, see our [ASC 606 SSP allocation guide](https://soluqube.com/blog/asc-606-ssp-allocation-guide). Key terms: [standalone selling price](https://soluqube.com/glossary/standalone-selling-price), [relative SSP method](https://soluqube.com/glossary/relative-ssp-method) and [performance obligation](https://soluqube.com/glossary/performance-obligation).

## What counts as an SSP allocation mistake?

An SSP allocation mistake is any gap that stops a reviewer re-performing Step 4 and reaching the same numbers. It can sit in the SSP estimate, in the list of performance obligations, in the arithmetic or in the schedule. Judgement and evidence gaps usually draw the most questions; a stray rounding cent is normally below materiality.

ASC 606-10-32-28 sets the objective: allocate the transaction price in an amount that depicts the consideration the entity expects for each promised good or service. ASC 606-10-32-29 and 32-31 make relative SSP the default way to get there. Every mistake below is a place where the file stops showing how that objective was met.

## Which mistakes happen when estimating SSP?

The three estimation mistakes are using a list price that every deal discounts as the SSP, recording a figure with no source behind it, and leaving SSPs unchanged for years. ASC 606-10-32-32 and 32-33 point to observable prices first, then estimates that maximise observable inputs and are applied consistently.

1. **A list price nobody pays.** If every customer gets a discount from list, the list price is weak evidence of what the item sells for on its own. Use prices from actual standalone sales, or an estimate under ASC 606-10-32-34. See [observable price](https://soluqube.com/glossary/observable-price).
2. **No source next to the figure.** An SSP with no standalone sales data, market assessment or cost build beside it cannot be traced. Record the method and the data on the same row as the number.
3. **Stale SSPs.** A study run once and never refreshed drifts away from current pricing. Existing contracts are not reallocated for later SSP changes (ASC 606-10-32-43), but new contracts need current figures, and the review date belongs in the file.

## Which mistakes happen when identifying obligations?

The two identification mistakes are folding a distinct service, such as onboarding or training, into the subscription, and leaving out a promise because the order form shows no price for it. Both change the allocation before any arithmetic starts, because the distinct test in ASC 606-10-25-19 decides which items get an SSP at all.

4. **Merging a distinct service into the subscription.** Onboarding or training that the customer can benefit from and that does not significantly modify the software usually passes ASC 606-10-25-19 and 25-21. Our post on whether [SaaS training is a separate performance obligation](https://soluqube.com/blog/saas-training-separate-performance-obligation-asc-606) walks through the test.
5. **Ignoring a "free" promise.** An item included at no charge is still a performance obligation if it is a distinct promise. It takes a share of the transaction price by relative SSP, which moves revenue out of the other lines.

## Which mistakes happen in the allocation arithmetic?

The three arithmetic mistakes are pushing the whole discount onto one line without meeting ASC 606-10-32-37, using the residual approach where 32-34(c) does not allow it, and multiplying by rounded weights instead of exact ratios. Each one moves revenue between obligations, and the last can leave the allocation not tying to the contract price.

6. **Discount on one line without support.** ASC 606-10-32-36 spreads a discount pro rata by default. Placing it on some obligations only needs all three 32-37 criteria to be met and documented. Our post on [how a bundle discount is allocated](https://soluqube.com/blog/asc-606-bundle-discount-allocation-saas) covers both cases.
7. **Residual approach as a shortcut.** It is limited to SSPs that are highly variable or uncertain. Where observable prices or a reasonable estimate exist, the residual result is not the allocation the standard asks for. See [residual approach](https://soluqube.com/glossary/residual-approach).
8. **Rounded weights and no rounding rule.** A weight shown to two decimals and then multiplied can give a different amount from the full ratio. Keep exact ratios, round the amounts, and write down which line takes the residual cent. Our post on [where the rounding cent goes](https://soluqube.com/blog/ssp-allocation-rounding-residual-cent-asc-606) shows cases where it is not zero.

## Which mistakes happen in the revenue schedule?

The two schedule mistakes are recognising a point-in-time item when it is invoiced or when the contract starts, instead of when control transfers, and building monthly amounts that leave a balance in deferred revenue after the last month. The first is a cutoff question under ASC 606-10-25-30; the second is a tie-out failure that a reviewer can spot quickly.

9. **Point-in-time items on the wrong date.** Onboarding delivered in month 2 is recognised in month 2, not on the invoice date. Keep delivery evidence, such as a sign-off, dated within the period. See [point-in-time recognition](https://soluqube.com/glossary/point-in-time-recognition).
10. **A schedule that does not end at zero.** Equal monthly amounts rounded to the cent rarely add up to the allocation exactly. Round each month down and let the final month absorb the remainder, so deferred revenue ends at $0.00. See [terminal-period remainder absorption](https://soluqube.com/glossary/terminal-period-remainder-absorption).

## What does a clean allocation look like on a $186,000 contract?

Take a $186,000.00, 36-month contract starting November 2026 with four obligations whose SSPs total $231,000.00. The Soluqube engine spreads the $45,000.00 discount pro rata and allocates $144,935.06, $14,493.51, $21,740.26 and $4,831.17, which ties to $186,000.00. Deferred revenue ends at $0.00 in month 36.

| Obligation | Pattern | SSP | Allocated |
|---|---|---:|---:|
| Platform subscription | Ratable, 36 months | $180,000.00 | $144,935.06 |
| Onboarding | Point in time, month 2 | $18,000.00 | $14,493.51 |
| Premium support | Ratable, 36 months | $27,000.00 | $21,740.26 |
| Admin training (absorbs residual cent) | Point in time, month 3 | $6,000.00 | $4,831.17 |
| **Total** | | **$231,000.00** | **$186,000.00** |

| Month | Recognised | Made up of | Deferred after month |
|---|---:|---|---:|
| 1 (Nov 2026) | $4,629.86 | Subscription $4,025.97 + premium support $603.89 | $181,370.14 |
| 2 (Dec 2026) | $19,123.37 | Subscription $4,025.97 + onboarding $14,493.51 + premium support $603.89 | $162,246.77 |
| 3 (Jan 2027) | $9,461.03 | Subscription $4,025.97 + premium support $603.89 + admin training $4,831.17 | $152,785.74 |
| 4–35 | $4,629.86 each | Subscription $4,025.97 + premium support $603.89 | falls to $4,630.22 |
| 36 (Oct 2029) | $4,630.22 | Subscription $4,026.11 + premium support $604.11 | $0.00 |

Here is how the example avoids the mistakes above:

- **Mistake 6:** the discount is spread pro rata across all four obligations, because nothing in the contract supports placing it on one line.
- **Mistake 8:** each line except the last is rounded half-up to the cent, and admin training, the last listed obligation, absorbs the residual cent. The amounts are quoted, not the weights.
- **Mistake 9:** onboarding is recognised in month 2 and admin training in month 3, the months the scenario sets for delivery, not in month 1.
- **Mistake 10:** the subscription recognises $4,025.97 for 35 months and $4,026.11 in month 36, so the final month absorbs $0.14. Premium support recognises $603.89 for 35 months and $604.11 in month 36, absorbing $0.22.

Total recognised is $186,000.00. The engine result's SHA-256 hash is 02fc241e81f1da732a63fbb31eec1626f54228831e4389a4fc18bff6b1f3e964. This schedule is engine behaviour: the app's upload workbook gives the same allocation but puts every point-in-time item in month 1. You can re-perform the allocation in the [SSP allocation calculator](https://soluqube.com/tools/ssp-allocation-calculator?utm_source=blog&utm_medium=community&utm_campaign=20261021-sprint).

## What should the SSP file hold before fieldwork?

Before fieldwork, the SSP file should let a reviewer trace every number back to a source without asking. That means the contract clause for each obligation, each SSP with its evidence, the allocation and its written rounding rule, a schedule that ends at $0.00 deferred, and a note of each judgement and who approved it.

A file built that way usually has:

1. The contract price and each obligation, with the clause page and verbatim excerpt that supports it.
2. Each SSP, its method under ASC 606-10-32-34 and the date it was last reviewed.
3. The distinct assessment for every service line, including any item sold at no charge.
4. The discount treatment, and the 32-37 analysis if the discount is not spread pro rata.
5. The allocation, the rounding rule and the monthly schedule, tied to the contract price.

Terms pulled from a contract by software, including Soluqube's heuristic extraction, still need a person to confirm them before they go into the file. The [sample SSP workpaper](https://soluqube.com/samples/soluqube-ssp-sample.pdf) shows the structure as a finished document.

## How can you test this on your own contracts?

Send us three of your hardest bundled contracts through the [design partner programme](https://soluqube.com/design-partners?utm_source=blog&utm_medium=community&utm_campaign=20261021-sprint), and you get a free 3-contract workpaper. You confirm the obligations and stated prices. We send back the relative SSP allocation, a schedule that ties to the cent, a page and verbatim excerpt for each obligation, and a hashed export.

Founding prices for the first 10 customers are a free 3-contract workpaper, a $475 audit workpaper for up to 10 contracts, a $1,750 QoE deal pack and $49/month firm tool access. Details are on [pricing](https://soluqube.com/pricing?utm_source=blog&utm_medium=community&utm_campaign=20261021-sprint). The engine doesn't model contract modifications, variable consideration or billing schedules yet, so treat those topics as guidance only.
    `
  },
  {
    slug: "premium-support-ssp-saas-support-tier-allocation",
    title: "Is premium support SSP a percentage of the subscription?",
    subtitle: "When premium support is a separate performance obligation, how to set a support-tier SSP, how it is recognised, and the support lines of an $84,000, 24-month contract run through the Soluqube engine.",
    publishedAt: "October 23, 2026",
    updatedAt: "October 23, 2026",
    readTime: "6 min read",
    author: {
      name: "Soluqube Editorial",
      role: "Technical Accounting Content",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["ASC 606", "SSP Allocation", "Standalone Selling Price", "Premium Support", "Performance Obligations"],
    targetQuery: "premium support ssp percentage of subscription",
    definitionAnchor: "Premium support SSP is the price at which a SaaS company would sell a support tier on its own. A percentage of the subscription price is a valid way to express it only when standalone sales or renewals show customers actually pay that percentage; otherwise estimate it under ASC 606-10-32-34 and keep the evidence beside the figure.",
    excerpt: "Should premium support SSP be a percentage of the subscription? How to set a SaaS support-tier SSP under ASC 606, with an $84,000 engine-run example.",
    toc: [
      { id: "is-premium-support-a-separate-performance-obligation", label: "Is premium support a separate performance obligation?" },
      { id: "should-premium-support-ssp-be-a-percentage-of-the-subscription", label: "Should premium support SSP be a percentage of the subscription?" },
      { id: "when-is-expected-cost-plus-margin-the-better-method", label: "When is expected cost plus margin the better method?" },
      { id: "how-is-premium-support-recognised-over-the-term", label: "How is premium support recognised over the term?" },
      { id: "how-is-premium-support-allocated-on-an-84000-contract", label: "How is premium support allocated on an $84,000 contract?" },
      { id: "what-evidence-supports-a-support-tier-ssp", label: "What evidence supports a support-tier SSP?" },
      { id: "how-can-you-test-this-on-your-own-contracts", label: "How can you test this on your own contracts?" }
    ],
    faqs: [
      {
        question: "Is standard support included in every SaaS subscription a separate performance obligation?",
        answer: "Not always. Basic help that comes with every subscription at no extra charge is often part of the subscription service itself. A tier the customer chooses and pays for, with faster response times or extra coverage, is more likely a distinct promise. Assess each tier against ASC 606-10-25-19 and document the conclusion."
      },
      {
        question: "Can two support tiers have different SSPs in the same company?",
        answer: "Yes. Each tier is a different promise, so each needs its own SSP and its own evidence. A premium tier with a one-hour response commitment usually costs more to deliver and sells at a higher price than a standard tier. Keep separate standalone sales data or cost builds for each tier."
      },
      {
        question: "Is premium support SSP updated when list prices change?",
        answer: "Not for contracts already signed. ASC 606-10-32-43 says the transaction price is not reallocated for later changes in standalone selling prices. New contracts use the current estimate. Record the date each support-tier SSP was last reviewed, so a reviewer can see which figure applied when each contract was signed."
      }
    ],
    engineVerified: true,
    content: `
Premium support is a SaaS line item that is often quoted as a percentage of the subscription. That makes the percentage a natural first guess for its standalone selling price, but a pricing rule is not SSP evidence on its own. This post covers when a support tier is a separate performance obligation, when a percentage of the subscription is a fair SSP and when a cost build is better, how support is recognised, and what evidence belongs in the file. The worked example is an $84,000.00, 24-month contract with a standard and a premium support tier, run through the Soluqube engine; the [ASC 606 SSP allocation guide](https://soluqube.com/blog/asc-606-ssp-allocation-guide) covers the wider method. Key terms: [standalone selling price](https://soluqube.com/glossary/standalone-selling-price), [performance obligation](https://soluqube.com/glossary/performance-obligation) and [series guidance](https://soluqube.com/glossary/series-guidance).

## Is premium support a separate performance obligation?

Usually, yes, when the customer chooses and pays for it. Premium support is a promise to stand ready to answer tickets within a set time over the term. The customer benefits from it alongside the software, and it does not modify the software, so it normally passes the distinct test in ASC 606-10-25-19 to 25-21.

ASC 606-10-25-18(e) lists standing ready to provide goods or services as a promise in its own right. Because each period of support is substantially the same and transfers in the same way, a support tier is usually accounted for as a series under ASC 606-10-25-14(b) and 25-15. Signs that a tier is distinct include:

1. It is sold as a separate tier, or added to some contracts and not others.
2. The customer can use the software without it.
3. It changes response times or coverage, not the software itself.

Basic help included in every subscription at no extra charge is a different case. It may be part of the subscription service rather than a separate promise, so assess it on its own facts.

## Should premium support SSP be a percentage of the subscription?

Only if the evidence supports the percentage. A percentage of the subscription is a convenient way to express SSP, but ASC 606-10-32-32 calls the price of standalone sales the best evidence. If customers actually pay a consistent percentage when they buy or renew support on its own, that observed percentage is a fair SSP.

If the percentage is only a list-price rule that most deals discount, it is weak evidence. ASC 606-10-32-33 asks for an estimate that uses as many observable inputs as possible, and 32-34(a) allows an [adjusted market assessment](https://soluqube.com/glossary/adjusted-market-assessment) built from what the market pays for similar support. A percentage drawn from renewals where support is bought separately is often the strongest data a SaaS company has.

Two practical points apply:

1. The percentage should be applied to the subscription's SSP, not to a discounted contract price, or the discount is counted twice.
2. Record the percentage, the deals it comes from and the date it was set, so a reviewer can trace it. See [observable price](https://soluqube.com/glossary/observable-price).

## When is expected cost plus margin the better method?

Expected cost plus margin is the better method when support is never sold on its own and no market data exists. ASC 606-10-32-34(b) allows forecasting the cost of providing the tier, such as support staff time, tooling and on-call cover, and adding a margin consistent with the company's other services.

A cost build suits a new premium tier with a one-hour response commitment, because there are no renewals yet to observe. It also works as a cross-check on a percentage: if the percentage implies a margin far from the company's other services, the file should explain why. See [expected cost plus margin](https://soluqube.com/glossary/expected-cost-plus-margin).

ASC 606-10-32-35 allows methods to be combined, so a company can start with a cost build and move to observed renewal prices once enough standalone sales exist. Document the change and the date it took effect.

## How is premium support recognised over the term?

Premium support is usually recognised ratably over the support term. The customer receives and consumes the benefit of the stand-ready service as the vendor provides it, which meets the over-time criterion in ASC 606-10-25-27(a). Equal monthly amounts are a reasonable measure of progress when support is available evenly across the term.

Recognition follows the support term, not the invoice. If three years of support are billed upfront, the amount stays in deferred revenue and is released month by month. If usage is heavily uneven, for example a tier that includes a fixed number of escalations, consider whether a different measure of progress fits better. See [ratable recognition](https://soluqube.com/glossary/ratable-recognition).

## How is premium support allocated on an $84,000 contract?

Take an $84,000.00, 24-month contract starting March 2027: a subscription, standard support, premium support (24x7, 1-hour SLA) and onboarding, with SSPs totalling $99,600.00. The Soluqube engine spreads the $15,600.00 discount pro rata, allocating $6,072.29 to standard support and $12,144.58 to premium support. Premium support recognises $506.02 a month for 23 months, then $506.12.

| Obligation | Pattern | SSP | Allocated |
|---|---|---:|---:|
| Subscription | Ratable, 24 months | $72,000.00 | $60,722.89 |
| Standard support | Ratable, 24 months | $7,200.00 | $6,072.29 |
| Premium support (24x7, 1-hr SLA) | Ratable, 24 months | $14,400.00 | $12,144.58 |
| Onboarding (last line, residual $0.00) | Point in time, month 1 | $6,000.00 | $5,060.24 |
| **Total** | | **$99,600.00** | **$84,000.00** |

Both support tiers get their pro-rata share of the discount, like every other line: standard support's $7,200.00 SSP becomes $6,072.29 and premium support's $14,400.00 SSP becomes $12,144.58. Nothing in the contract supports placing the discount only on the subscription or only on one tier (ASC 606-10-32-36 and 32-37). Our post on [how a bundle discount is allocated](https://soluqube.com/blog/asc-606-bundle-discount-allocation-saas) covers when that would change.

| Month | Recognised | Made up of | Deferred after month |
|---|---:|---|---:|
| 1 (Mar 2027) | $8,349.39 | Subscription $2,530.12 + standard support $253.01 + premium support $506.02 + onboarding $5,060.24 | $75,650.61 |
| 2–23 | $3,289.15 each | Subscription $2,530.12 + standard support $253.01 + premium support $506.02 | falls to $3,289.31 |
| 24 (Feb 2029) | $3,289.31 | Subscription $2,530.13 + standard support $253.06 + premium support $506.12 | $0.00 |

How the engine handles the support lines:

- **Allocation rounding:** each line except the last is rounded half-up to the cent, and onboarding, the last listed obligation, takes the residual. Here its pro-rata share rounds exactly to $5,060.24, so the residual is $0.00. The amounts are quoted, not percentage weights.
- **Monthly amounts:** premium support recognises $506.02 for 23 months and $506.12 in month 24, so the final month absorbs $0.10 ([terminal-period remainder absorption](https://soluqube.com/glossary/terminal-period-remainder-absorption)). Standard support recognises $253.01 for 23 months and $253.06 in month 24, absorbing $0.05. The subscription recognises $2,530.12 for 23 months and $2,530.13 in month 24, absorbing $0.01.
- **Tie-out:** total recognised is $84,000.00 and deferred revenue ends at $0.00.

The engine result's SHA-256 hash is c786a647ba347dd2bcb322e2181ef0efe6373300db207d761cc07041f3c22800. The app reproduces this exact allocation and schedule from an uploaded workbook (workbook SHA-256 6af707f22c0cec111d5adfae3f8117b6240d8bb1b02125bcb20cc96c66184316), or you can re-perform the allocation in the [SSP allocation calculator](https://soluqube.com/tools/ssp-allocation-calculator?utm_source=blog&utm_medium=community&utm_campaign=20261021-sprint).

## What evidence supports a support-tier SSP?

The evidence that supports a support-tier SSP is the data behind the figure: standalone sales or renewals of the tier, a market assessment of similar support, or a cost build with a margin. It sits next to the SSP, with the contract clause that describes the tier, its response commitments and the date the estimate was last reviewed.

A support-tier file usually holds:

1. The clause describing each tier, with its page and verbatim excerpt.
2. The distinct assessment for each tier, including any support included at no extra charge.
3. The SSP method under ASC 606-10-32-34, the data it rests on and the review date.
4. If SSP is a percentage of the subscription, the deals the percentage was observed in.
5. The allocation and the monthly schedule, tied to the contract price.

Terms pulled from a contract by software, including Soluqube's heuristic extraction, still need a person to confirm them before they go into the file. For another service line, our post on whether [SaaS training is a separate performance obligation](https://soluqube.com/blog/saas-training-separate-performance-obligation-asc-606) uses the same file structure. The [sample SSP workpaper](https://soluqube.com/samples/soluqube-ssp-sample.pdf) shows it as a finished document.

## How can you test this on your own contracts?

Send us three of your hardest bundled contracts through the design partner programme, and you get a free 3-contract workpaper. You confirm the obligations, support tiers and stated prices. We send back the relative SSP allocation, a schedule that ties to the cent, a page and verbatim excerpt for each obligation, and a hashed export.

Apply through the [design partner programme](https://soluqube.com/design-partners?utm_source=blog&utm_medium=community&utm_campaign=20261021-sprint). Founding prices for the first 10 customers are a free 3-contract workpaper, a $475 audit workpaper for up to 10 contracts, a $1,750 QoE deal pack and $49/month firm tool access. Details are on [pricing](https://soluqube.com/pricing?utm_source=blog&utm_medium=community&utm_campaign=20261021-sprint). The engine doesn't model contract modifications, variable consideration, usage-based support or billing schedules yet, so treat those topics as guidance only.
    `
  },
  {
    slug: "netsuite-arm-vs-sage-intacct-revenue-allocation",
    title: "NetSuite ARM vs Sage Intacct: How Is Revenue Allocated?",
    subtitle: "How NetSuite ARM and Sage Intacct allocate revenue across obligations under ASC 606, from each vendor's own help pages, with a setup example.",
    publishedAt: "October 23, 2026",
    updatedAt: "October 23, 2026",
    readTime: "6 min read",
    author: {
      name: "Soluqube Editorial",
      role: "Technical Accounting Content",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["ASC 606", "SSP Allocation", "NetSuite ARM", "Sage Intacct", "Comparison"],
    targetQuery: "netsuite arm vs sage intacct revenue recognition",
    definitionAnchor: "NetSuite Advanced Revenue Management (ARM) is a revenue module inside NetSuite ERP; Oracle publishes its allocation bases (SSP, VSOE, ESP, TPE or other) in the Revenue Allocation add-on. Sage Intacct Contracts allocates through a multiple-element arrangement (MEA) allocation in its Advanced Revenue Recognition add-on.",
    excerpt: "A neutral comparison of NetSuite ARM and Sage Intacct Contracts on allocation, the five ASC 606 steps, recognition methods, change orders and price, using only each vendor's own help pages (checked 23 Oct 2026). Includes a $40,000 setup example run through the Soluqube engine.",
    toc: [
      { id: "what-are-netsuite-arm-and-sage-intacct-contracts", label: "What are NetSuite ARM and Sage Intacct Contracts?" },
      { id: "how-do-netsuite-arm-and-sage-intacct-compare-side-by-side", label: "How do NetSuite ARM and Sage Intacct compare side by side?" },
      { id: "which-add-on-do-you-need-to-allocate-across-obligations", label: "Which add-on do you need to allocate across obligations?" },
      { id: "how-does-each-one-map-to-the-five-asc-606-steps", label: "How does each one map to the five ASC 606 steps?" },
      { id: "which-recognition-methods-does-each-one-support", label: "Which recognition methods does each one support?" },
      { id: "how-does-each-one-handle-change-orders-and-modifications", label: "How does each one handle change orders and modifications?" },
      { id: "what-does-each-one-cost", label: "What does each one cost?" },
      { id: "why-does-the-setup-decision-change-the-allocation", label: "Why does the setup decision change the allocation?" },
      { id: "how-does-soluqube-help-with-revenue-allocation-evidence", label: "How does Soluqube help with revenue allocation evidence?" },
      { id: "sources", label: "Sources" }
    ],
    faqs: [
      {
        question: "Does Sage Intacct allocate revenue by standalone selling price?",
        answer: "The Sage Intacct help pages we read describe step 4 as creating \"a multiple element arrangement (MEA) allocation\", and say the Advanced Revenue Recognition add-on \"includes support for multiple-element arrangement (MEA) allocations\". They do not name SSP or fair value as the basis. Ask Sage or your partner for the configuration documentation before relying on it for an audit file."
      },
      {
        question: "Can you revert a prospective merge in NetSuite ARM?",
        answer: "Sometimes. Oracle's help says prospective merge arrangements include a Revert Change Order button, but you can't revert one that \"has recognized revenue or reclassified deferred revenue\" or \"has contract acquisition costs\". Plan period-end work around that point, and confirm the behaviour in your own account."
      },
      {
        question: "Can Soluqube post its allocation into NetSuite or Sage Intacct?",
        answer: "No. Soluqube has no billing or ERP sync today. It produces the allocation, the schedule and a hashed export with clause evidence, and your team books the result in NetSuite or Sage Intacct. It also does not handle contract modifications or usage-based fees yet."
      }
    ],
    engineVerified: true,
    content: `
NetSuite Advanced Revenue Management (ARM) and Sage Intacct Contracts both recognise revenue inside an ERP, and in both the step that allocates price across obligations sits in an add-on. This comparison uses only each vendor's own public help pages, checked on 23 Oct 2026. Where a page doesn't say something, we write "not published". That means the page we read did not state it, not that the product lacks it. For the method itself, read our [ASC 606 SSP allocation guide](https://soluqube.com/blog/asc-606-ssp-allocation-guide).

## What are NetSuite ARM and Sage Intacct Contracts?

NetSuite ARM is a revenue module inside NetSuite ERP. Oracle says ARM (Essentials) "automates revenue forecasting, recognition, reclassification, deferral, and auditing through a rule-based event handling framework". Sage Intacct Contracts is the contract billing and revenue recognition application in Sage Intacct, whose help page states "complete support for ASC 606 and IFRS 15".

Oracle adds that ARM Essentials and Revenue Allocation support "both existing standards and the new standard", which it names as ASC 606 and IFRS 15. In practice the choice usually follows the ERP you already run. Whether Sage Intacct Contracts can be used without Sage Intacct as the ERP is not published on the pages we read.

## How do NetSuite ARM and Sage Intacct compare side by side?

The table below sets each vendor's own wording side by side, row by row, with a link to the page each fact comes from. Every fact was checked on 23 Oct 2026. "Not published" means the page we read did not say it. Vendor pages change, so re-check before relying on any row.

| Topic | NetSuite ARM | Sage Intacct Contracts |
|---|---|---|
| What it is | Revenue module inside NetSuite ERP ([Oracle](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4328435538.html)) | Contract billing and revenue recognition in Sage Intacct ([Sage Intacct](https://www.intacct.com/ia/docs/en_US/help_action/Contracts/Using_Contracts/Learn_about/about-contracts.htm)) |
| Standards named | "both existing standards and the new standard" (ASC 606, IFRS 15) ([Oracle](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4703499262.html)) | "complete support for ASC 606 and IFRS 15" ([Sage Intacct](https://www.intacct.com/ia/docs/en_US/help_action/Contracts/Using_Contracts/Learn_about/about-contracts.htm)) |
| Allocation basis | SSP, VSOE, ESP, TPE "or some other method"; fair value pricing, range checking, formulas ([Oracle](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4328435538.html)) | "multiple-element arrangement (MEA) allocations"; SSP or fair value not named on the pages read ([Sage Intacct](https://www.intacct.com/ia/docs/en_US/help_action/Contracts/Using_Contracts/Learn_about/about-contracts.htm)) |
| Where allocation sits | Revenue Allocation "is an add-on feature" to ARM Essentials ([Oracle](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4328435538.html)) | Advanced Revenue Recognition, described as an "add-on subscription" ([Sage Intacct](https://www.intacct.com/ia/docs/en_US/help_action/Contracts/Using_Contracts/Learn_about/about-contracts.htm)) |
| Five-step mapping | Not published ([Oracle](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4328435538.html)) | Each step mapped to a Contracts task ([Sage Intacct](https://www.intacct.com/ia/docs/en_ZA/help_action/Contracts/Using_Contracts/Learn_about/recognition-standard-steps.htm)) |
| Recognition methods | Rules and plans; each element "can have a forecast plan and one or more actual plans" ([Oracle](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4328435538.html)) | "Straight-line, daily rate, quantity-based, and custom recognition schedules, independent of billing" ([Sage Intacct](https://www.intacct.com/ia/docs/en_US/help_action/Contracts/Using_Contracts/Learn_about/about-contracts.htm)) |
| Modifications | Prospective and retrospective merges ([Oracle](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_1498077674.html)) | "contract add-ons, change orders, and cancellations"; automatic renewals ([Sage Intacct](https://www.intacct.com/ia/docs/en_US/help_action/Contracts/Using_Contracts/Learn_about/about-contracts.htm)) |
| Audit trail | ARM "automates ... auditing"; audit-trail reports not published ([Oracle](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4328435538.html)) | "Provides an audit trail for MEA executions" ([Sage Intacct](https://www.intacct.com/ia/docs/en_US/help_action/Contracts/Using_Contracts/Learn_about/about-contracts.htm)) |
| Multi-book | Parallel processing in a secondary book, "Optional - requires Multi-Book Accounting" ([Oracle](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4703499262.html)) | "Multi-book accounting" ([Sage Intacct](https://www.intacct.com/ia/docs/en_US/help_action/Contracts/Using_Contracts/Learn_about/about-contracts.htm)) |
| GL posting | "You must generate revenue recognition journal entries to post the revenue to the general ledger" ([Oracle](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4328435538.html)) | "Post revenue recognition" according to the contract line's revenue schedule ([Sage Intacct](https://www.intacct.com/ia/docs/en_ZA/help_action/Contracts/Using_Contracts/Learn_about/recognition-standard-steps.htm)) |
| Price | Not published ([Oracle](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4328435538.html)) | Not published; "Contact your Sage Intacct account manager" ([Sage Intacct](https://www.intacct.com/ia/docs/en_US/help_action/Contracts/Using_Contracts/Learn_about/about-contracts.htm)) |

## Which add-on do you need to allocate across obligations?

In both ERPs, allocation across obligations sits in an add-on. Oracle says Revenue Allocation "is an add-on feature to Advanced Revenue Management (Essentials)". Sage's help says its Advanced Revenue Recognition add-on "includes support for multiple-element arrangement (MEA) allocations". Which subscription levels include each add-on is not published on the pages we read.

Oracle also names the basis for the fair values it allocates with: "standalone selling price (SSP), vendor-specific objective evidence (VSOE), best estimate of selling price (ESP), third party evidence (TPE), or some other method". Sage's pages describe the MEA allocation but do not name SSP or fair value as its basis, so confirm the configuration with Sage before you document it.

## How does each one map to the five ASC 606 steps?

Sage Intacct's help maps each ASC 606 step to a Contracts task: create a contract, create the contract lines, enter the amount, "create a multiple element arrangement (MEA) allocation", then "post revenue recognition" from each line's revenue schedule. Oracle's ARM pages describe arrangements, elements, rules and plans, but do not set out a step-by-step mapping.

In either system, step 2 is a judgement you make before the software runs. Whether setup, training or support is distinct decides whether it becomes its own contract line or revenue element, and that decision drives the allocation more than any setting does.

## Which recognition methods does each one support?

Sage lists "straight-line, daily rate, quantity-based, and custom recognition schedules, independent of billing". Oracle describes revenue recognition rules that set "the recognition method, amount source, and start and end date sources", with revenue plans derived from those rules. Each ARM revenue element "can have a forecast plan and one or more actual plans".

Oracle adds that "the actual revenue plans control the posting of revenue". Sage's step 5 posts revenue "according to the contract line's revenue schedule". Both tie recognition to a schedule per obligation, which is what an auditor re-performs.

## How does each one handle change orders and modifications?

Oracle documents prospective and retrospective merges. A prospective merge "terminates and locks the original revenue arrangements and creates a new arrangement with the residual values as of the effective date". Sage says Contract Billing can "automate the accounting for contract add-ons, change orders, and cancellations" and can "automatically trigger contract renewals as the contract end date approaches".

Oracle also states when a prospective merge can't be reverted: when it "has recognized revenue or reclassified deferred revenue" or "has contract acquisition costs". That is a documented control point to plan period-end work around. Sage's page does not describe its modification accounting method in more detail.

## What does each one cost?

Neither vendor publishes a price on the pages we read. Oracle's ARM help gives no price, and says moving from classic Revenue Recognition needs "NetSuite Professional Services or a qualified NetSuite partner". Sage's help says to "Contact your Sage Intacct account manager" for subscription details, and describes advanced revenue recognition as an add-on subscription.

## Why does the setup decision change the allocation?

Step 2 decides it. If setup is a distinct obligation, it takes its own share of the price and is recognised when delivered. If it is not distinct, it joins the subscription and is recognised over the term. Both ERPs model this as contract lines or revenue elements, but the judgement comes before either tool.

Take a $40,000.00, 12-month contract starting January 2027, run both ways through the Soluqube engine.

| Treatment | Obligation | Pattern | SSP | Allocated |
|---|---|---|---:|---:|
| Setup distinct | Subscription | Ratable, 12 months | $38,000.00 | $35,348.84 |
| Setup distinct | Setup (absorbs residual cent) | Point in time, month 1 | $5,000.00 | $4,651.16 |
| Setup distinct | **Total** | | **$43,000.00** | **$40,000.00** |
| Setup not distinct | Subscription incl. setup | Ratable, 12 months | $40,000.00 | $40,000.00 |

If setup is distinct, the $3,000.00 discount is spread pro rata by relative SSP. Month 1 (Jan 2027) recognises $7,596.89: subscription $2,945.73 and setup $4,651.16. Months 2 to 11 recognise $2,945.73 each, and month 12 (Dec 2027) recognises $2,945.81 because the final month absorbs $0.08. The engine result's SHA-256 hash is 936908566cb996e4f4f3920acfc70f6b4e16a8c806efb13b1af259b50d5bcbd9.

If setup is not distinct, the full $40,000.00 is recognised ratably: $3,333.33 in each of months 1 to 11 and $3,333.37 in month 12, which absorbs $0.04. The engine result's SHA-256 hash is f5b417cdac460df761556c9b4c8c2dfcad5ef30fc8b2e27222004d149ff8c606. Both runs end with $0.00 unrecognised. Try either in the app, or check the split in the [SSP allocation calculator](/tools/ssp-allocation-calculator).

## How does Soluqube help with revenue allocation evidence?

Soluqube documents the allocation outside either ERP. You confirm the obligations, price and SSPs. It returns the relative-SSP allocation in integer arithmetic, a full-term schedule that ties to the cent, page-and-excerpt clause evidence for each obligation and a SHA-256-hashed export for your external auditor. You then book the result in NetSuite or Sage Intacct.

Clause evidence is the page and verbatim excerpt behind each obligation. In the app, uploaded text-layer PDFs also get a highlight on the cited line, and exports carry the page and excerpt. Contract extraction is heuristic, so you confirm every field. The point is that the step 2 and step 4 judgements are reviewable whichever ERP books them.

The limits are plain. Soluqube does not do contract-modification accounting, does not handle usage-based fees, and has no billing or ERP sync. For a billing-led comparison, see [Maxio vs NetSuite ARM](/blog/maxio-vs-netsuite-arm-ssp-allocation). For vendor-by-vendor detail, see [NetSuite ARM alternatives](/alternatives/netsuite-arm) and [Sage Intacct revenue recognition alternatives](/alternatives/sage-intacct-revenue).

To test it on your own deals, send three of your hardest bundled contracts through the [design partner programme](https://soluqube.com/design-partners?utm_source=blog&utm_medium=community&utm_campaign=20261023-vs). Founding prices for the first 10 customers are a free 3-contract workpaper, a $475 audit workpaper (up to 10 contracts), a $1,750 QoE deal pack and $49/month firm tool access; see [pricing](https://soluqube.com/pricing?utm_source=blog&utm_medium=community&utm_campaign=20261023-vs).

## Sources

All checked on 23 Oct 2026.

- Oracle NetSuite help, Advanced Revenue Management: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4328435538.html
- Oracle NetSuite help, transition to the new revenue standard (ASC 606 / IFRS 15, Multi-Book Accounting): https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4703499262.html
- Oracle NetSuite help, prospective merge of revenue arrangements: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_1498077674.html
- Sage Intacct help, about Contracts: https://www.intacct.com/ia/docs/en_US/help_action/Contracts/Using_Contracts/Learn_about/about-contracts.htm
- Sage Intacct help, revenue recognition standard steps (Sage's en_ZA regional help page): https://www.intacct.com/ia/docs/en_ZA/help_action/Contracts/Using_Contracts/Learn_about/recognition-standard-steps.htm
    `
  },
  {
    slug: "chargebee-revrec-vs-netsuite-arm-ssp-allocation",
    title: "Chargebee RevRec vs NetSuite ARM: Which Fits Your Stack?",
    subtitle: "Chargebee RevRec, a subledger, vs NetSuite ARM, an ERP module: SSP, changes, GL posting and price from each vendor's own pages, with a worked example.",
    publishedAt: "October 23, 2026",
    updatedAt: "October 23, 2026",
    readTime: "6 min read",
    author: {
      name: "Soluqube Editorial",
      role: "Technical Accounting Content",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    tags: ["ASC 606", "SSP Allocation", "Chargebee RevRec", "NetSuite ARM", "Comparison"],
    targetQuery: "chargebee revrec vs netsuite arm",
    definitionAnchor: "Chargebee RevRec is a revenue recognition subledger that allocates with \"a configurable SSP library tied to your price book\". NetSuite Advanced Revenue Management (ARM) is a revenue module inside NetSuite ERP; its Revenue Allocation add-on allocates on SSP, VSOE, ESP, TPE or another method.",
    excerpt: "A neutral comparison of Chargebee RevRec and NetSuite ARM on SSP, contract changes, GL posting, using both together and price, using only each vendor's own pages (checked 23 Oct 2026). Includes a $96,000, 24-month bundle run through the Soluqube engine.",
    toc: [
      { id: "what-is-the-difference-between-a-revenue-subledger-and-an-erp-module", label: "What is the difference between a revenue subledger and an ERP module?" },
      { id: "how-do-chargebee-revrec-and-netsuite-arm-compare-side-by-side", label: "How do Chargebee RevRec and NetSuite ARM compare side by side?" },
      { id: "how-does-each-one-set-ssp", label: "How does each one set SSP?" },
      { id: "can-you-use-chargebee-with-netsuite-arm", label: "Can you use Chargebee with NetSuite ARM?" },
      { id: "how-does-each-one-handle-contract-changes", label: "How does each one handle contract changes?" },
      { id: "where-do-journal-entries-post", label: "Where do journal entries post?" },
      { id: "what-does-each-one-cost", label: "What does each one cost?" },
      { id: "how-is-a-bundle-discount-allocated-by-ssp", label: "How is a bundle discount allocated by SSP?" },
      { id: "how-does-soluqube-help-with-ssp-allocation-evidence", label: "How does Soluqube help with SSP allocation evidence?" },
      { id: "sources", label: "Sources" }
    ],
    faqs: [
      {
        question: "Does Chargebee RevRec require NetSuite ARM?",
        answer: "Not on the pages we read. Chargebee's NetSuite configuration doc covers its Billing integration and says to enable features \"such as SuiteCloud or Advanced Revenue Management for the integration\". It does not say RevRec needs ARM. RevRec's own page lists NetSuite among several direct integrations, alongside Sage Intacct, QuickBooks and Xero."
      },
      {
        question: "Is a revenue subledger the same as an ERP revenue module?",
        answer: "No. A subledger such as Chargebee RevRec holds revenue schedules outside the ERP and posts summarized journal entries to the general ledger. An ERP module such as NetSuite ARM keeps revenue arrangements and journal entries inside the ERP. Both can allocate by SSP; the difference is where the schedules live."
      },
      {
        question: "Can Soluqube sync with Chargebee or NetSuite?",
        answer: "No. Soluqube has no billing or ERP sync today. You confirm the obligations, price and SSPs, and it returns the allocation, a schedule that ties to the cent and a hashed export with clause evidence. It also does not handle contract modifications or usage-based fees yet."
      }
    ],
    engineVerified: true,
    content: `
Chargebee RevRec and NetSuite Advanced Revenue Management (ARM) both recognise revenue under ASC 606, but one is a dedicated subledger and the other is a module inside an ERP. This comparison uses only each vendor's own public pages, checked on 23 Oct 2026, and focuses on standalone selling price (SSP). Where a page doesn't say something, we write "not published". That means the page we read did not state it, not that the product lacks it. For the method itself, read our [ASC 606 SSP allocation guide](https://soluqube.com/blog/asc-606-ssp-allocation-guide).

## What is the difference between a revenue subledger and an ERP module?

A subledger keeps revenue schedules in its own system and posts results to your ledger. Chargebee calls RevRec "your single revenue subledger", which can "post summarized journal entries to the right accounts in your general ledger". An ERP module keeps them inside the ERP: NetSuite ARM generates revenue recognition journal entries in NetSuite itself.

Chargebee describes a workflow "based on ASC 606's and IFRS 15's five-step model". Oracle says ARM Essentials and Revenue Allocation support "both existing standards and the new standard", which it names as ASC 606 and IFRS 15. In practice the choice often follows the stack: billing system first, or ERP first.

## How do Chargebee RevRec and NetSuite ARM compare side by side?

The table below sets each vendor's own wording side by side, row by row, with a link to the page each fact comes from. Every fact was checked on 23 Oct 2026. "Not published" means the page we read did not say it. Vendor pages change, so re-check before relying on any row.

| Topic | Chargebee RevRec | NetSuite ARM |
|---|---|---|
| What it is | "your single revenue subledger" ([Chargebee](https://www.chargebee.com/revenue-recognition-software/)) | Revenue module inside NetSuite ERP ([Oracle](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4328435538.html)) |
| Standards named | "ASC 606's and IFRS 15's five-step model" ([Chargebee](https://www.chargebee.com/revenue-recognition-software/)) | "both existing standards and the new standard" (ASC 606, IFRS 15) ([Oracle](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4703499262.html)) |
| SSP | "a configurable SSP library tied to your price book"; "SSP documentation traceable at every step" ([Chargebee](https://www.chargebee.com/revenue-recognition-software/)) | SSP, VSOE, ESP, TPE "or some other method"; fair value pricing, range checking, formulas ([Oracle](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4328435538.html)) |
| Where allocation sits | Enterprise: "Advanced Revenue Rules and SSP configurations", "SSP Price Analyzer" ([Chargebee pricing](https://www.chargebee.com/pricing/)) | Revenue Allocation "is an add-on feature" to ARM Essentials ([Oracle](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4328435538.html)) |
| Contract changes | "upsells, co-terms, credit notes, early renewals, and other modifications" ([Chargebee](https://www.chargebee.com/revenue-recognition-software/)) | Prospective and retrospective merges ([Oracle](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_1498077674.html)) |
| Controls | "Lock periods and enforce accounting controls" ([Chargebee](https://www.chargebee.com/revenue-recognition-software/)) | ARM "automates ... auditing"; period-lock wording not published on the pages read ([Oracle](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4328435538.html)) |
| GL posting | "Post summarized journal entries … on your fiscal calendar" ([Chargebee](https://www.chargebee.com/revenue-recognition-software/)) | "You must generate revenue recognition journal entries to post the revenue to the general ledger" ([Oracle](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4328435538.html)) |
| Source data | Invoice and billing data synced "on a 24-hour cycle" ([Chargebee](https://www.chargebee.com/revenue-recognition-software/)) | Revenue arrangements inside NetSuite ([Oracle](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4328435538.html)) |
| Integrations named | Chargebee, Stripe, NetSuite, Sage Intacct, QuickBooks, Xero ([Chargebee](https://www.chargebee.com/revenue-recognition-software/)) | n/a (inside NetSuite) |
| Using both | Chargebee Billing's NetSuite doc: enable "SuiteCloud or Advanced Revenue Management for the integration" ([Chargebee docs](https://www.chargebee.com/docs/2.0/netsuite-config.html)) | n/a |
| Billing prerequisite | Performance plan "available only to Chargebee Billing customers"; Enterprise not published ([Chargebee pricing](https://www.chargebee.com/pricing/)) | Requires NetSuite ERP ([Oracle](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4328435538.html)) |
| Price | Not published: Performance "request pricing", Enterprise by quote ([Chargebee pricing](https://www.chargebee.com/pricing/)) | Not published ([Oracle](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4328435538.html)) |
| Migration | Not published ([Chargebee](https://www.chargebee.com/revenue-recognition-software/)) | From classic Revenue Recognition needs "NetSuite Professional Services or a qualified NetSuite partner" ([Oracle](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4328435538.html)) |

## How does each one set SSP?

Chargebee says allocation uses "a configurable SSP library tied to your price book", with "SSP documentation traceable at every step", and its Enterprise plan adds an "SSP Price Analyzer". Oracle's Revenue Allocation add-on uses fair values based on "standalone selling price (SSP), vendor-specific objective evidence (VSOE), best estimate of selling price (ESP), third party evidence (TPE), or some other method".

Oracle adds that ARM "supports the use of fair value pricing, range checking, and fair value formulas to allocate revenue across several performance obligations". For an audit file the question is the same in either tool: can a reviewer see each SSP's basis, each obligation's share of the price and the rounding rule, and re-perform the split outside the system?

## Can you use Chargebee with NetSuite ARM?

Chargebee documents a NetSuite integration for its Billing product. It says to "ensure you have enabled features such as SuiteCloud or Advanced Revenue Management for the integration", and that custom start and end date fields can be mapped "with Advanced Revenue Management fields". That doc covers Chargebee Billing to NetSuite; it does not say RevRec requires ARM.

RevRec's own page lists NetSuite among its "direct integrations", alongside Chargebee, Stripe, Sage Intacct, QuickBooks and Xero. Whether a team would run RevRec and ARM on the same contracts at once is not published on the pages we read.

## How does each one handle contract changes?

Chargebee says it automates "recognition treatment for upsells, co-terms, credit notes, early renewals, and other modifications". Oracle documents prospective and retrospective merges in ARM. A prospective merge "terminates and locks the original revenue arrangements and creates a new arrangement with the residual values as of the effective date", starting in the first open period.

Oracle also states that a prospective merge can't be reverted once it "has recognized revenue or reclassified deferred revenue" or "has contract acquisition costs". Chargebee's product page does not set out its accounting method for each type of change in more detail.

## Where do journal entries post?

Chargebee says RevRec can "post summarized journal entries to the right accounts in your general ledger", with billing data synced in "on a 24-hour cycle". NetSuite ARM posts inside NetSuite: Oracle says "you must generate revenue recognition journal entries to post the revenue to the general ledger", and "the actual revenue plans control the posting of revenue".

## What does each one cost?

Neither vendor publishes a price on the pages we read. Chargebee's pricing page says the RevRec Performance plan is "request pricing" and Enterprise is by quote. Oracle's ARM help gives no price, but says moving from classic Revenue Recognition needs "NetSuite Professional Services or a qualified NetSuite partner". Ask both for a quote on your contract volume.

## How is a bundle discount allocated by SSP?

When the contract price is below the total SSP, the discount is spread across every obligation in proportion to SSP, unless the narrow exception in ASC 606 applies. Both tools allocate in their own systems; the arithmetic a reviewer re-performs is the same. Here is one bundle run through the Soluqube engine, with every figure tied to the cent.

Take a $96,000.00, 24-month contract starting December 2026 with three obligations whose SSPs total $106,300.00. The $10,300.00 discount is spread pro rata by the relative SSP method, and standard support absorbs the residual cent.

| Obligation | Pattern | SSP | Allocated |
|---|---|---:|---:|
| Subscription | Ratable, 24 months | $84,000.00 | $75,860.77 |
| Data migration | Point in time, month 1 | $12,500.00 | $11,288.81 |
| Standard support (absorbs residual cent) | Ratable, 24 months | $9,800.00 | $8,850.42 |
| **Total** | | **$106,300.00** | **$96,000.00** |

Month 1 (Dec 2026) recognises $14,818.43, including the $11,288.81 data migration. The subscription's final month absorbs $0.13 and support's absorbs $0.18, and the unrecognised balance ends at $0.00 in month 24 (Nov 2028). The engine result's SHA-256 hash is 734e129170b590beb4a306a898c140ce86088fe15c996af80eed3335cba3aaa0. The full monthly schedule is in our [bundle discount allocation walkthrough](/blog/asc-606-bundle-discount-allocation-saas); check the split yourself in the [SSP allocation calculator](/tools/ssp-allocation-calculator).

## How does Soluqube help with SSP allocation evidence?

Soluqube is an allocation and evidence layer that sits next to Chargebee RevRec or NetSuite ARM. You confirm the obligations, price and SSPs. It returns the relative-SSP allocation in integer arithmetic, a full-term schedule that ties to the cent, page-and-excerpt clause evidence for each obligation and a SHA-256-hashed export for your external auditor.

Clause evidence is the page and verbatim excerpt behind each obligation. In the app, uploaded text-layer PDFs also get a highlight on the cited line, and exports carry the page and excerpt. Contract extraction is heuristic, so you confirm every field. You then book the result in whichever system holds your revenue. It is evidence for the deals an auditor samples, not a second subledger.

The limits are plain. Soluqube does not do contract-modification accounting, does not handle usage-based fees, and has no billing or ERP sync. For a subledger-vs-billing view, see [Chargebee RevRec vs Maxio](/blog/chargebee-revrec-vs-maxio-ssp-allocation). For vendor-by-vendor detail, see [Chargebee RevRec alternatives](/alternatives/chargebee-revrec) and [NetSuite ARM alternatives](/alternatives/netsuite-arm).

To test it on your own deals, send three of your hardest bundled contracts through the [design partner programme](https://soluqube.com/design-partners?utm_source=blog&utm_medium=community&utm_campaign=20261023-vs). Founding prices for the first 10 customers are a free 3-contract workpaper, a $475 audit workpaper (up to 10 contracts), a $1,750 QoE deal pack and $49/month firm tool access; see [pricing](https://soluqube.com/pricing?utm_source=blog&utm_medium=community&utm_campaign=20261023-vs).

## Sources

All checked on 23 Oct 2026.

- Chargebee, revenue recognition software (RevRec): https://www.chargebee.com/revenue-recognition-software/
- Chargebee, pricing (RevRec plans): https://www.chargebee.com/pricing/
- Chargebee docs, NetSuite integration configuration (Chargebee Billing): https://www.chargebee.com/docs/2.0/netsuite-config.html
- Oracle NetSuite help, Advanced Revenue Management: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4328435538.html
- Oracle NetSuite help, transition to the new revenue standard: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4703499262.html
- Oracle NetSuite help, prospective merge of revenue arrangements: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_1498077674.html
    `
  }
];
