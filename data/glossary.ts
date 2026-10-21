/**
 * Revenue recognition glossary (ASC 606 / IFRS 15 / Ind AS 115).
 *
 * Editorial rules:
 * - Paragraph references are cited only where the paragraph is well established;
 *   otherwise the topic is cited generally.
 * - Every worked example is illustrative: invented contracts, real arithmetic.
 * - Ind AS 115 follows IFRS 15 paragraph numbering for the core model.
 */

export interface GlossaryReference {
  standard: "ASC 606" | "ASC 340-40" | "IFRS 15" | "Ind AS 115" | "Policy";
  ref: string;
  note?: string;
}

export interface GlossaryLink {
  href: string;
  label: string;
}

export interface GlossaryTerm {
  slug: string;
  term: string;
  /** Visible <title> text; the brand suffix is added only if the total stays within 60 characters. */
  title: string;
  /** Meta description, at most 155 characters. */
  description: string;
  /** 40–60 word direct definition. */
  definition: string;
  references: GlossaryReference[];
  example: {
    scenario: string;
    steps: string[];
    result: string;
  };
  mistakes: string[];
  related: string[];
  further: GlossaryLink[];
  /** Plain statement of what Soluqube does or does not do for this topic, when relevant. */
  soluqubeNote?: string;
}

const SSP_TOOL: GlossaryLink = { href: "/tools/ssp-allocation-calculator", label: "SSP allocation calculator" };
const SSP_EXAMPLE_POST: GlossaryLink = {
  href: "/blog/mastering-asc-606-standalone-selling-price-ssp-multi-element-allocations",
  label: "ASC 606 SSP allocation example: 3-element SaaS bundle",
};
const ROUNDING_POST: GlossaryLink = {
  href: "/blog/ssp-allocation-rounding-residual-cent-asc-606",
  label: "SSP allocation rounding in ASC 606: where the cent goes",
};
const MODIFICATION_POST: GlossaryLink = {
  href: "/blog/contract-modification-precedence-dag-asc-606-10-25-13",
  label: "ASC 606-10-25-13 contract modifications: decision tree",
};
const PA_POST: GlossaryLink = {
  href: "/blog/principal-vs-agent-asc-606-gross-vs-net-worked-example",
  label: "Principal vs agent under ASC 606: gross vs net worked example",
};
const IND_AS_HUB: GlossaryLink = { href: "/asc-606-vs-ind-as-115", label: "ASC 606 vs Ind AS 115 hub" };
const ASC_HUB: GlossaryLink = { href: "/asc-606", label: "ASC 606 technical hub" };
const DESIGN_PARTNERS: GlossaryLink = { href: "/design-partners", label: "Run your own contracts as a design partner" };

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    slug: "performance-obligation",
    term: "Performance obligation",
    title: "Performance Obligation: Definition & Example",
    description:
      "What a performance obligation is under ASC 606, IFRS 15 and Ind AS 115, with a SaaS example splitting a contract into obligations and common mistakes.",
    definition:
      "A performance obligation is a promise in a contract to transfer to the customer either a distinct good or service (or bundle), or a series of distinct goods or services that are substantially the same and transfer in the same pattern. It is the unit of account to which the transaction price is allocated and revenue recognised.",
    references: [
      { standard: "ASC 606", ref: "606-10-25-14 to 25-15" },
      { standard: "IFRS 15", ref: "paragraphs 22–23" },
      { standard: "Ind AS 115", ref: "paragraphs 22–23" },
    ],
    example: {
      scenario:
        "Illustrative: a $120,000 three-year order form lists platform subscription, implementation and premium support.",
      steps: [
        "Subscription: the customer can use the platform on its own, and access is provided daily over the term. It is a series of distinct days of service, so it is one performance obligation recognised over time.",
        "Implementation: a standard configuration that third-party partners also perform, and the platform works without it. It is capable of being distinct and separately identifiable, so it is a second performance obligation.",
        "Premium support: a stand-ready promise to answer tickets over the term. It is a third performance obligation, also a series.",
        "Internal account provisioning is a set-up activity that transfers nothing to the customer, so it is not a performance obligation.",
      ],
      result:
        "Three performance obligations. The $120,000 is allocated across them by relative standalone selling price in step 4.",
    },
    mistakes: [
      "Treating every SKU on the order form as a separate obligation without testing whether each is distinct.",
      "Missing implied promises created by customary business practice, such as free upgrades always given to customers.",
      "Treating internal set-up activities, which transfer nothing to the customer, as performance obligations.",
    ],
    related: ["distinct-good-or-service", "series-guidance", "standalone-selling-price", "five-step-model", "saas-implementation-fee"],
    further: [ASC_HUB, SSP_EXAMPLE_POST],
  },
  {
    slug: "standalone-selling-price",
    term: "Standalone selling price (SSP)",
    title: "Standalone Selling Price (SSP): Definition",
    description:
      "Standalone selling price under ASC 606 and IFRS 15: the definition, three estimation methods, a worked SaaS licence and onboarding example, mistakes.",
    definition:
      "Standalone selling price (SSP) is the price at which an entity would sell a promised good or service separately to a customer. The best evidence is an observable price from standalone sales to similar customers in similar circumstances. When none exists, the entity estimates SSP using a method that maximises observable inputs.",
    references: [
      { standard: "ASC 606", ref: "606-10-32-31 to 32-34" },
      { standard: "IFRS 15", ref: "paragraphs 76–80" },
      { standard: "Ind AS 115", ref: "paragraphs 76–80" },
    ],
    example: {
      scenario:
        "Illustrative: a vendor sells an analytics licence and an onboarding package together and needs an SSP for each.",
      steps: [
        "Licence: sold on its own 340 times in the last 12 months, median net price $48,000 per year. That is an observable price, so SSP = $48,000.",
        "Onboarding: never sold separately. Expected cost is $6,000 of consultant time; the target markup on services is 40%.",
        "Expected cost plus margin: $6,000 × 1.40 = $8,400.",
      ],
      result: "SSPs of $48,000 (licence) and $8,400 (onboarding) feed the relative-SSP allocation of the bundle price.",
    },
    mistakes: [
      "Using the list price as SSP without checking what customers actually pay after normal discounts.",
      "Using the contract's own stated price as SSP by default; a stated price is not presumed to be SSP.",
      "Picking a different estimation method per contract to reach a preferred answer, instead of applying a documented policy consistently.",
      "Never refreshing SSP analysis as pricing and discounting change.",
    ],
    related: ["relative-ssp-method", "observable-price", "ssp-range", "adjusted-market-assessment", "expected-cost-plus-margin", "residual-approach"],
    further: [SSP_TOOL, SSP_EXAMPLE_POST],
  },
  {
    slug: "relative-ssp-method",
    term: "Relative SSP method",
    title: "Relative SSP Method: Formula & Worked Example",
    description:
      "How the relative standalone selling price method allocates a transaction price under ASC 606 and IFRS 15, with a worked $120,000 two-obligation example.",
    definition:
      "The relative SSP method allocates a contract's transaction price to each performance obligation in proportion to its standalone selling price: allocated amount = obligation SSP ÷ sum of all SSPs × transaction price. A bundle discount or premium is therefore spread across every obligation pro rata, unless the conditions for allocating a discount to only some obligations are met.",
    references: [
      { standard: "ASC 606", ref: "606-10-32-29 and 32-31" },
      { standard: "IFRS 15", ref: "paragraphs 74 and 76" },
      { standard: "Ind AS 115", ref: "paragraphs 74 and 76" },
    ],
    example: {
      scenario:
        "Illustrative: transaction price $120,000; subscription SSP $100,000; professional services SSP $25,000.",
      steps: [
        "Sum of SSPs: $100,000 + $25,000 = $125,000. The bundle discount is $5,000 (4%).",
        "Subscription: $100,000 / $125,000 × $120,000 = $96,000.",
        "Services: $25,000 / $125,000 × $120,000 = $24,000.",
        "Check: $96,000 + $24,000 = $120,000. The $5,000 discount is spread $4,000 / $1,000.",
      ],
      result: "Allocated amounts $96,000 and $24,000, which then drive each obligation's recognition schedule.",
    },
    mistakes: [
      "Allocating the whole discount to one obligation without meeting the conditions for allocating a discount entirely to some obligations (ASC 606-10-32-37; IFRS 15.82).",
      "Rounding each line to the cent independently so the allocations no longer sum to the transaction price, with no written rule for the residual cent.",
      "Using stale or undocumented SSPs, which is where most auditor challenges on allocation start.",
    ],
    related: ["standalone-selling-price", "transaction-price", "residual-approach", "ssp-range", "terminal-period-remainder-absorption"],
    further: [
      SSP_TOOL,
      ROUNDING_POST,
      { href: "/blog/asc-606-ssp-allocation-guide", label: "ASC 606 SSP allocation guide" },
      { href: "/blog/standalone-selling-price-formula-ssp-calculation", label: "Standalone selling price formula: SSP calculation" },
      { href: "/blog/asc-606-bundle-discount-allocation-saas", label: "ASC 606 bundle discount allocation in SaaS" },
    ],
    soluqubeNote:
      "Soluqube computes this allocation in integer arithmetic at 10^6 scale, rounded to cents, with a documented rule for the residual cent, and hashes the export so it can be re-run.",
  },
  {
    slug: "residual-approach",
    term: "Residual approach",
    title: "Residual Approach to SSP: When It Is Allowed",
    description:
      "The residual approach to estimating SSP under ASC 606-10-32-34(c) and IFRS 15.79(c): when it is permitted, a worked example, and why it is not a shortcut.",
    definition:
      "The residual approach estimates a good or service's standalone selling price as the total transaction price less the observable standalone selling prices of the other promised goods or services. It is permitted only if that item's selling price is highly variable or uncertain, not as a general shortcut for absorbing a bundle discount.",
    references: [
      { standard: "ASC 606", ref: "606-10-32-34(c)" },
      { standard: "IFRS 15", ref: "paragraph 79(c)" },
      { standard: "Ind AS 115", ref: "paragraph 79(c)" },
    ],
    example: {
      scenario:
        "Illustrative: a $150,000 contract for a licence, hosting and support. Hosting ($50,000) and support ($20,000) have observable SSPs. The licence has been sold for anywhere from $40,000 to $140,000, with no representative price.",
      steps: [
        "Confirm the licence price is highly variable: the range is broad and no discernible SSP exists.",
        "Residual licence SSP = $150,000 − $50,000 − $20,000 = $80,000.",
        "Sanity check: $80,000 sits inside the observed range and is not nil, so the result is plausible.",
      ],
      result: "Licence SSP $80,000, documented with the evidence that its price is highly variable.",
    },
    mistakes: [
      "Using the residual approach for an item that has an observable standalone price.",
      "Accepting a residual of zero or an implausibly small amount, which signals the approach does not fit the facts.",
      "Confusing the residual approach (an SSP estimation method) with the residual cent left by rounding.",
      "Not documenting why the price is highly variable or uncertain.",
    ],
    related: ["standalone-selling-price", "relative-ssp-method", "adjusted-market-assessment", "expected-cost-plus-margin", "observable-price"],
    further: [SSP_EXAMPLE_POST, SSP_TOOL, { href: "/blog/asc-606-ssp-allocation-guide", label: "ASC 606 SSP allocation guide" }],
  },
  {
    slug: "adjusted-market-assessment",
    term: "Adjusted market assessment approach",
    title: "Adjusted Market Assessment Approach (SSP)",
    description:
      "Estimating SSP with the adjusted market assessment approach under ASC 606 and IFRS 15: what it is, a worked add-on pricing example, and common mistakes.",
    definition:
      "The adjusted market assessment approach estimates standalone selling price by evaluating the market in which the entity sells and estimating the price customers in that market would pay. It can start from competitors' prices for similar goods or services, adjusted for the entity's own costs, margins and market position.",
    references: [
      { standard: "ASC 606", ref: "606-10-32-34(a)" },
      { standard: "IFRS 15", ref: "paragraph 79(a)" },
      { standard: "Ind AS 115", ref: "paragraph 79(a)" },
    ],
    example: {
      scenario:
        "Illustrative: a new analytics add-on has never been sold on its own. Two competitors publish comparable add-ons at $30 and $36 per user per month. The vendor's documented positioning is about 10% below the market midpoint.",
      steps: [
        "Market midpoint: ($30 + $36) / 2 = $33 per user per month.",
        "Adjust for positioning: $33 × 0.90 = $29.70 per user per month.",
        "SSP for 200 users over 12 months: $29.70 × 200 × 12 = $71,280.",
      ],
      result: "Estimated SSP of $71,280, with the competitor evidence and the 10% adjustment kept in the workpaper.",
    },
    mistakes: [
      "Using competitors' list prices without adjusting for the discounting typical in that market.",
      "Not documenting why the competitor products are comparable in features and customer class.",
      "Applying the adjustment percentage without evidence for it.",
    ],
    related: ["standalone-selling-price", "expected-cost-plus-margin", "residual-approach", "observable-price", "ssp-range"],
    further: [SSP_EXAMPLE_POST, SSP_TOOL],
  },
  {
    slug: "expected-cost-plus-margin",
    term: "Expected cost plus margin approach",
    title: "Expected Cost Plus Margin Approach (SSP)",
    description:
      "Estimating SSP with expected cost plus a margin under ASC 606 and IFRS 15, a worked implementation-services example, and the markup vs margin trap.",
    definition:
      "The expected cost plus a margin approach estimates standalone selling price by forecasting the costs of satisfying a performance obligation and adding an appropriate margin. It suits services with measurable costs, such as implementation, training or custom development, and fits poorly where costs are not driven by the specific obligation.",
    references: [
      { standard: "ASC 606", ref: "606-10-32-34(b)" },
      { standard: "IFRS 15", ref: "paragraph 79(b)" },
      { standard: "Ind AS 115", ref: "paragraph 79(b)" },
    ],
    example: {
      scenario:
        "Illustrative: an implementation package is budgeted at 80 consultant hours at a loaded cost of $95 per hour.",
      steps: [
        "Expected cost: 80 × $95 = $7,600.",
        "A 35% markup on cost: $7,600 × 1.35 = $10,260.",
        "A 35% margin on price is different: $7,600 / 0.65 = $11,692.31.",
        "The policy must say which one it means and where the percentage comes from.",
      ],
      result: "SSP of $10,260 under a markup-on-cost policy, or $11,692.31 under a margin-on-price policy.",
    },
    mistakes: [
      "Mixing up markup on cost and margin on price, which changes the SSP materially.",
      "Using direct labour only and leaving out a reasonable share of overhead.",
      "Choosing a margin with no support in what the market would pay.",
    ],
    related: ["standalone-selling-price", "adjusted-market-assessment", "saas-implementation-fee", "residual-approach", "ssp-range"],
    further: [SSP_TOOL, SSP_EXAMPLE_POST],
  },
  {
    slug: "transaction-price",
    term: "Transaction price",
    title: "Transaction Price Under ASC 606: Definition",
    description:
      "What goes into the transaction price under ASC 606, IFRS 15 and Ind AS 115: variable consideration, financing, credits and taxes, with a worked example.",
    definition:
      "The transaction price is the consideration an entity expects to be entitled to in exchange for transferring promised goods or services, excluding amounts collected on behalf of third parties such as some sales taxes. It reflects variable consideration, significant financing components, non-cash consideration and consideration payable to the customer.",
    references: [
      { standard: "ASC 606", ref: "606-10-32-2 to 32-27", note: "32-2A: election to exclude sales taxes" },
      { standard: "IFRS 15", ref: "paragraphs 47–72" },
      { standard: "Ind AS 115", ref: "paragraphs 47–72" },
    ],
    example: {
      scenario:
        "Illustrative: a non-cancellable three-year contract at $40,000 a year, a $10,000 implementation fee, and a $5,000 marketing credit the vendor pays to the customer. Overage fees could also apply, but usage is highly uncertain.",
      steps: [
        "Fixed consideration: 3 × $40,000 + $10,000 = $130,000.",
        "Consideration payable to the customer reduces the price: $130,000 − $5,000 = $125,000.",
        "Overage fees are variable consideration. Given the uncertainty, the constrained estimate is $0 at inception, reassessed each period.",
      ],
      result: "Transaction price at inception: $125,000.",
    },
    mistakes: [
      "Starting from the invoice total including tax.",
      "Ignoring credits, rebates or other amounts payable to the customer.",
      "Including consideration for periods the customer can cancel without substantive penalty, which are outside the enforceable contract.",
    ],
    related: ["variable-consideration", "constraint-on-variable-consideration", "significant-financing-component", "ind-as-115-gst-treatment", "relative-ssp-method"],
    further: [ASC_HUB, SSP_TOOL],
  },
  {
    slug: "variable-consideration",
    term: "Variable consideration",
    title: "Variable Consideration Under ASC 606",
    description:
      "Variable consideration under ASC 606 and IFRS 15: what counts, expected value vs most likely amount, a worked SLA-credit example and mistakes to avoid.",
    definition:
      "Variable consideration is any part of the promised consideration that can change: discounts, rebates, refunds, credits, price concessions, incentives, performance bonuses, penalties or usage-based fees. An entity estimates it using the expected value or the most likely amount, whichever better predicts the outcome, and then applies the constraint.",
    references: [
      { standard: "ASC 606", ref: "606-10-32-5 to 32-9" },
      { standard: "IFRS 15", ref: "paragraphs 50–54" },
      { standard: "Ind AS 115", ref: "paragraphs 50–54" },
    ],
    example: {
      scenario:
        "Illustrative: a $60,000 annual fee with a 10% service-level credit if uptime falls below 99.9%. History shows a breach in about 10% of comparable contracts.",
      steps: [
        "Expected value: 0.9 × $60,000 + 0.1 × $54,000 = $59,400. Suited to a large portfolio of similar contracts.",
        "Most likely amount: $60,000. Suited to a single contract with a binary outcome.",
        "Choose the method that better predicts the amount, apply it consistently, then test the estimate against the constraint.",
      ],
      result: "Estimated consideration of $59,400 or $60,000, depending on the method the facts support.",
    },
    mistakes: [
      "Missing implied price concessions, such as a history of accepting partial payment.",
      "Switching estimation methods between similar contracts.",
      "Not updating the estimate at each reporting date (ASC 606-10-32-14; IFRS 15.59).",
    ],
    related: ["constraint-on-variable-consideration", "transaction-price", "breakage", "series-guidance", "customer-options"],
    further: [ASC_HUB, DESIGN_PARTNERS],
  },
  {
    slug: "constraint-on-variable-consideration",
    term: "Constraint on variable consideration",
    title: "Variable Consideration Constraint: Definition",
    description:
      "The constraint on variable consideration under ASC 606 and IFRS 15: the significant-reversal test, the factors, and a worked performance-bonus example.",
    definition:
      "The constraint limits how much variable consideration enters the transaction price: include an estimate only to the extent it is probable (IFRS 15: highly probable) that a significant reversal of cumulative revenue recognised will not occur when the uncertainty resolves. Factors include external influences, limited experience and a broad range of outcomes.",
    references: [
      { standard: "ASC 606", ref: "606-10-32-11 to 32-13" },
      { standard: "IFRS 15", ref: "paragraphs 56–58" },
      { standard: "Ind AS 115", ref: "paragraphs 56–58" },
      { standard: "ASC 606", ref: "606-10-55-65", note: "sales- or usage-based royalty exception for licences of IP" },
    ],
    example: {
      scenario:
        "Illustrative: a fixed $90,000 implementation plus a $30,000 bonus if the customer goes live by 31 March. The vendor has never integrated with this ERP, and the date depends on the customer's IT team.",
      steps: [
        "Estimate: most likely amount of the bonus is uncertain; the outcome depends on factors outside the vendor's control and it has no relevant experience.",
        "Including $30,000 now could lead to a significant reversal, so the constrained amount is $0.",
        "Transaction price at inception: $90,000. At each reporting date, reassess; once achievement is probable, add the $30,000 and recognise the share relating to work already done as a catch-up.",
      ],
      result: "$90,000 at inception; the bonus enters the transaction price only when the reversal risk is resolved.",
    },
    mistakes: [
      "Constraining the whole transaction price instead of only the variable portion.",
      "Defaulting to a constraint of zero without analysing the factors.",
      "Applying the general constraint to sales- or usage-based royalties on licences of IP, which follow their own exception.",
    ],
    related: ["variable-consideration", "transaction-price", "licence-of-ip", "cumulative-catch-up", "breakage"],
    further: [ASC_HUB, DESIGN_PARTNERS],
  },
  {
    slug: "contract-asset",
    term: "Contract asset",
    title: "Contract Asset Under ASC 606: Definition",
    description:
      "What a contract asset is under ASC 606, IFRS 15 and Ind AS 115, how it differs from a receivable, and a worked two-milestone journal entry example.",
    definition:
      "A contract asset is an entity's right to consideration in exchange for goods or services already transferred to the customer, when that right is conditioned on something other than the passage of time, typically the entity's future performance. When the right becomes unconditional, the amount is reclassified to a receivable.",
    references: [
      { standard: "ASC 606", ref: "606-10-45-1 and 45-3" },
      { standard: "IFRS 15", ref: "paragraphs 105 and 107" },
      { standard: "Ind AS 115", ref: "paragraphs 105 and 107" },
    ],
    example: {
      scenario:
        "Illustrative: a $50,000 fixed-fee build of two modules, each allocated $25,000. The customer can be invoiced only after both modules are delivered.",
      steps: [
        "Month 3, module A delivered: Dr Contract asset $25,000 / Cr Revenue $25,000. Payment is still conditional on delivering module B.",
        "Month 5, module B delivered and $50,000 invoiced: Dr Receivable $50,000 / Cr Contract asset $25,000 / Cr Revenue $25,000.",
      ],
      result: "The contract asset exists only between the two deliveries and is cleared when the right to payment becomes unconditional.",
    },
    mistakes: [
      "Labelling a conditional right as an unbilled receivable.",
      "Netting contract assets and contract liabilities across different contracts; netting is done at contract level.",
      "Not assessing contract assets for credit losses or impairment.",
    ],
    related: ["contract-liability", "unbilled-receivable", "deferred-revenue", "input-method", "disaggregation-of-revenue"],
    further: [ASC_HUB, DESIGN_PARTNERS],
  },
  {
    slug: "contract-liability",
    term: "Contract liability",
    title: "Contract Liability Under ASC 606: Definition",
    description:
      "What a contract liability is under ASC 606, IFRS 15 and Ind AS 115, how it relates to deferred revenue, and a worked annual-prepayment journal example.",
    definition:
      "A contract liability is an entity's obligation to transfer goods or services to a customer for which it has received consideration, or for which consideration is unconditionally due. In SaaS it is usually presented as deferred revenue, and it unwinds into revenue as the related performance obligation is satisfied.",
    references: [
      { standard: "ASC 606", ref: "606-10-45-2" },
      { standard: "IFRS 15", ref: "paragraph 106" },
      { standard: "Ind AS 115", ref: "paragraph 106" },
    ],
    example: {
      scenario: "Illustrative: a $24,000 annual subscription starting 1 January is invoiced and paid on 1 January.",
      steps: [
        "1 January: Dr Cash $24,000 / Cr Contract liability $24,000.",
        "Each month-end: Dr Contract liability $2,000 / Cr Revenue $2,000.",
        "31 March: contract liability balance = $24,000 − 3 × $2,000 = $18,000.",
      ],
      result: "The liability reduces to $0 by 31 December as the subscription is delivered.",
    },
    mistakes: [
      "Recording a liability and receivable for an advance invoice on a cancellable contract, where no unconditional right to payment exists yet.",
      "Netting contract liabilities against contract assets of a different contract.",
      "Presenting a multi-year prepayment entirely as current.",
    ],
    related: ["deferred-revenue", "contract-asset", "unbilled-receivable", "remaining-performance-obligations", "ratable-recognition"],
    further: [ASC_HUB, ROUNDING_POST],
  },
  {
    slug: "deferred-revenue",
    term: "Deferred revenue",
    title: "Deferred Revenue Under ASC 606: Example",
    description:
      "Deferred revenue under ASC 606 and IFRS 15: definition, how it relates to a contract liability, and a 36-month schedule that ends at exactly $0.00.",
    definition:
      "Deferred revenue is consideration received or billed in advance for goods or services not yet transferred. ASC 606 and IFRS 15 call it a contract liability but permit other descriptions. It decreases as revenue is recognised, and for a ratable subscription the balance should reach exactly zero at the end of the term.",
    references: [
      { standard: "ASC 606", ref: "606-10-45-2 and 45-5", note: "45-5 permits other descriptions" },
      { standard: "IFRS 15", ref: "paragraphs 106 and 109" },
      { standard: "Ind AS 115", ref: "paragraphs 106 and 109" },
    ],
    example: {
      scenario: "Illustrative: $100,000 prepaid for a 36-month subscription, recognised ratably by month.",
      steps: [
        "$100,000 / 36 = $2,777.777… per month.",
        "Rounding every month up to $2,777.78 recognises $100,000.08, eight cents more than the contract.",
        "Instead, recognise $2,777.77 for months 1–35 ($97,221.95) and let month 36 absorb the remainder: $100,000 − $97,221.95 = $2,778.05.",
      ],
      result: "Deferred revenue steps down each month and is exactly $0.00 after month 36.",
    },
    mistakes: [
      "Rounding each period independently, so the deferred balance never quite clears.",
      "Recognising on the billing schedule instead of the pattern of performance.",
      "Not splitting current and non-current deferred revenue for multi-year prepayments.",
    ],
    related: ["contract-liability", "ratable-recognition", "terminal-period-remainder-absorption", "remaining-performance-obligations", "unbilled-receivable"],
    further: [ROUNDING_POST, SSP_TOOL],
  },
  {
    slug: "unbilled-receivable",
    term: "Unbilled receivable",
    title: "Unbilled Receivable vs Contract Asset",
    description:
      "What an unbilled receivable is under ASC 606 and IFRS 15, how it differs from a contract asset, and a worked usage-billed-in-arrears example.",
    definition:
      "An unbilled receivable is revenue recognised for which the entity's right to consideration is already unconditional, with only the passage of time required before payment, but no invoice has been issued yet. Unlike a contract asset, it is a receivable and is presented with accounts receivable.",
    references: [
      { standard: "ASC 606", ref: "606-10-45-4" },
      { standard: "IFRS 15", ref: "paragraph 108" },
      { standard: "Ind AS 115", ref: "paragraph 108" },
    ],
    example: {
      scenario:
        "Illustrative: usage fees are earned monthly but invoiced quarterly in arrears. January usage is $8,000 and no further performance is needed to earn it.",
      steps: [
        "31 January: Dr Unbilled receivable $8,000 / Cr Revenue $8,000.",
        "31 March, invoice issued: Dr Accounts receivable $8,000 / Cr Unbilled receivable $8,000 (with February and March usage handled the same way).",
      ],
      result: "Revenue lands in January; the receivable is simply reclassified when the invoice goes out.",
    },
    mistakes: [
      "Calling a right that still depends on future performance an unbilled receivable; that is a contract asset.",
      "Leaving unbilled balances out of receivables ageing and credit-loss analysis.",
      "Forgetting to reclassify to billed receivables when the invoice is issued.",
    ],
    related: ["contract-asset", "contract-liability", "deferred-revenue", "output-method", "series-guidance"],
    further: [ASC_HUB, DESIGN_PARTNERS],
  },
  {
    slug: "material-right",
    term: "Material right",
    title: "Material Right Under ASC 606: Renewal Example",
    description:
      "What a material right is under ASC 606 and IFRS 15, how to estimate its SSP, and a worked discounted-renewal allocation example with exact cents.",
    definition:
      "A material right is an option for additional goods or services that the customer would not receive without entering the contract, such as a renewal or add-on discount beyond what that class of customer normally gets. It is a separate performance obligation: part of the price is allocated to it and recognised when the option is exercised or expires.",
    references: [
      { standard: "ASC 606", ref: "606-10-55-41 to 55-45" },
      { standard: "IFRS 15", ref: "paragraphs B39–B43" },
      { standard: "Ind AS 115", ref: "paragraphs B39–B43" },
    ],
    example: {
      scenario:
        "Illustrative: a one-year subscription for $50,000 includes an option to renew year 2 for $30,000. New customers pay $50,000 and no comparable discount is offered elsewhere. The vendor expects 80% of customers to renew.",
      steps: [
        "Option SSP = discount × likelihood of exercise: ($50,000 − $30,000) × 80% = $16,000.",
        "Sum of SSPs: subscription $50,000 + option $16,000 = $66,000.",
        "Subscription: $50,000 × 50,000 / 66,000 = $37,878.79. Option: $50,000 × 16,000 / 66,000 = $12,121.21.",
        "Check: $37,878.79 + $12,121.21 = $50,000.00.",
      ],
      result:
        "$37,878.79 is recognised over year 1; $12,121.21 is deferred until the renewal is exercised (then recognised over year 2) or lapses.",
    },
    mistakes: [
      "Treating every renewal option as a material right without comparing it with the discount normally given to that class of customer.",
      "Missing material rights hidden in price-lock or most-favoured-pricing clauses.",
      "Leaving the option's allocation deferred after the option has expired.",
    ],
    related: ["customer-options", "standalone-selling-price", "breakage", "relative-ssp-method", "saas-implementation-fee"],
    further: [SSP_TOOL, SSP_EXAMPLE_POST],
  },
  {
    slug: "principal-vs-agent",
    term: "Principal vs agent",
    title: "Principal vs Agent Under ASC 606: Definition",
    description:
      "Principal vs agent under ASC 606 and IFRS 15: the control test, the three indicators, and a worked gross vs net example for a resold app licence.",
    definition:
      "Principal versus agent analysis decides whether an entity reports revenue gross, as principal controlling the specified good or service before transfer, or net, as agent arranging for another party to provide it. Indicators of control include primary responsibility for fulfilment, inventory risk and discretion in setting the price.",
    references: [
      { standard: "ASC 606", ref: "606-10-55-36 to 55-40" },
      { standard: "IFRS 15", ref: "paragraphs B34–B38" },
      { standard: "Ind AS 115", ref: "paragraphs B34–B38" },
    ],
    example: {
      scenario:
        "Illustrative: a marketplace sells a third-party app licence to a customer for $1,000 and pays the developer $700.",
      steps: [
        "Identify the specified good: the app licence.",
        "If the marketplace controls the licence before transfer (it is responsible for fulfilment and sets the price), it is principal: revenue $1,000, cost of sales $700.",
        "If the developer fulfils and the marketplace only arranges the sale, it is agent: revenue $300, the net commission.",
      ],
      result: "Same cash, very different top line: $1,000 gross or $300 net.",
    },
    mistakes: [
      "Using credit risk as an indicator; it was removed from ASC 606 by ASU 2016-08.",
      "Concluding at the contract level instead of for each specified good or service.",
      "Treating the indicators as a scorecard instead of evidence about control.",
    ],
    related: ["performance-obligation", "transaction-price", "distinct-good-or-service", "disaggregation-of-revenue", "consignment"],
    further: [PA_POST, DESIGN_PARTNERS],
  },
  {
    slug: "distinct-good-or-service",
    term: "Distinct good or service",
    title: "Distinct Good or Service: ASC 606 Two-Part Test",
    description:
      "When a good or service is distinct under ASC 606 and IFRS 15: the two-part test, a SaaS implementation example with both outcomes, and common errors.",
    definition:
      "A good or service is distinct if the customer can benefit from it on its own or with readily available resources (capable of being distinct) and the promise to transfer it is separately identifiable from the other promises in the contract (distinct within the context of the contract). Both criteria must be met.",
    references: [
      { standard: "ASC 606", ref: "606-10-25-19 to 25-22" },
      { standard: "IFRS 15", ref: "paragraphs 27–30" },
      { standard: "Ind AS 115", ref: "paragraphs 27–30" },
    ],
    example: {
      scenario: "Illustrative: a $90,000 annual subscription sold with a $30,000 set-up service.",
      steps: [
        "Case A: the set-up is standard configuration that partners also sell, and the platform works without it. Both criteria are met, so there are two obligations; the $120,000 is allocated by relative SSP and the set-up share is recognised as the work is done.",
        "Case B: the set-up significantly customises the platform, and the customer cannot use the platform for its purpose without it. The promises are inputs to one combined output, so there is one obligation.",
        "In Case B the full $120,000 is recognised over the period the customer has access to the customised platform.",
      ],
      result: "The same price list produces two obligations in Case A and one in Case B.",
    },
    mistakes: [
      "Stopping at 'capable of being distinct' and skipping the separately identifiable test.",
      "Ignoring the significant integration, modification and interdependence indicators.",
      "Splitting promises that are really inputs to a single combined output.",
    ],
    related: ["performance-obligation", "saas-implementation-fee", "series-guidance", "licence-of-ip", "five-step-model"],
    further: [ASC_HUB, SSP_EXAMPLE_POST],
  },
  {
    slug: "series-guidance",
    term: "Series guidance",
    title: "Series Guidance Under ASC 606: SaaS Example",
    description:
      "The ASC 606 and IFRS 15 series guidance: when distinct periods form one performance obligation, and a worked example allocating usage fees to a month.",
    definition:
      "The series guidance treats a series of distinct goods or services that are substantially the same and transfer with the same pattern as a single performance obligation. It applies when each distinct period would be satisfied over time and progress is measured the same way, which is typical for daily or monthly SaaS access.",
    references: [
      { standard: "ASC 606", ref: "606-10-25-14(b) and 25-15" },
      { standard: "ASC 606", ref: "606-10-32-39 to 32-41", note: "allocating variable consideration to distinct periods" },
      { standard: "IFRS 15", ref: "paragraphs 22(b), 23 and 84–86" },
    ],
    example: {
      scenario:
        "Illustrative: a 12-month platform contract at $5,000 per month plus $0.02 per transaction above 1,000,000 transactions in a month. March volume is 1,400,000.",
      steps: [
        "The service is a series of distinct months of platform access: one performance obligation.",
        "March overage: (1,400,000 − 1,000,000) × $0.02 = $8,000.",
        "The overage relates only to March's service and is consistent with the allocation objective, so it is allocated entirely to March.",
      ],
      result: "March revenue: $5,000 fixed + $8,000 overage = $13,000. No annual usage forecast is needed.",
    },
    mistakes: [
      "Treating the series guidance as optional; it applies when the criteria are met.",
      "Estimating a full year of usage at inception instead of allocating usage to the period it relates to.",
      "Applying it to services whose periods are not substantially the same.",
    ],
    related: ["performance-obligation", "ratable-recognition", "variable-consideration", "distinct-good-or-service", "output-method"],
    further: [ASC_HUB, DESIGN_PARTNERS],
  },
  {
    slug: "ratable-recognition",
    term: "Ratable recognition",
    title: "Ratable Revenue Recognition: Definition",
    description:
      "Ratable revenue recognition for SaaS under ASC 606 and IFRS 15: when it applies, day vs month conventions, and a worked mid-month start example.",
    definition:
      "Ratable recognition spreads revenue evenly over the period a performance obligation is satisfied. It is typical of stand-ready SaaS access, where time elapsed faithfully depicts transfer. It is a measure-of-progress conclusion for an obligation satisfied over time, not a default for every contract.",
    references: [
      { standard: "ASC 606", ref: "606-10-25-27 and 25-31" },
      { standard: "IFRS 15", ref: "paragraphs 35 and 39" },
      { standard: "Ind AS 115", ref: "paragraphs 35 and 39" },
    ],
    example: {
      scenario: "Illustrative: a $36,500 annual subscription (365 days) with access starting 15 February.",
      steps: [
        "Daily convention: $36,500 / 365 = $100 per day.",
        "February: 15–28 February is 14 days, so $1,400.",
        "A monthly convention with a half-month for February would give $1,520.83 instead ($36,500 / 12 / 2).",
        "Pick one convention, document it, and apply it consistently.",
      ],
      result: "February revenue of $1,400 under a daily convention; the remaining $35,100 follows over the term.",
    },
    mistakes: [
      "Starting recognition at signature instead of when access is provided.",
      "Following the billing schedule instead of the pattern of transfer.",
      "Rounding each period independently so the total does not equal the allocated amount.",
    ],
    related: ["deferred-revenue", "series-guidance", "output-method", "terminal-period-remainder-absorption", "point-in-time-recognition"],
    further: [ROUNDING_POST, SSP_TOOL],
  },
  {
    slug: "point-in-time-recognition",
    term: "Point-in-time recognition",
    title: "Point-in-Time Revenue Recognition: Definition",
    description:
      "Point-in-time revenue recognition under ASC 606 and IFRS 15: when it applies, the control indicators, and a worked term licence plus support example.",
    definition:
      "Point-in-time recognition applies when a performance obligation meets none of the three criteria for recognition over time. Revenue is recognised when control transfers, judged by indicators such as a present right to payment, legal title, physical possession, transfer of significant risks and rewards, and customer acceptance.",
    references: [
      { standard: "ASC 606", ref: "606-10-25-30" },
      { standard: "IFRS 15", ref: "paragraph 38" },
      { standard: "Ind AS 115", ref: "paragraph 38" },
    ],
    example: {
      scenario:
        "Illustrative: a three-year on-premise term licence allocated $60,000 and 12 months of support allocated $15,000. The key is delivered and the term starts on 1 April.",
      steps: [
        "The licence is a right to use functional IP as it exists at delivery, so it is recognised at a point in time.",
        "1 April: licence revenue $60,000.",
        "Support is a stand-ready service: $15,000 / 12 = $1,250 per month from April.",
      ],
      result: "$61,250 recognised in April, then $1,250 a month for the rest of the support term.",
    },
    mistakes: [
      "Recognising at signature before the software is available to the customer.",
      "Ignoring substantive customer-acceptance clauses.",
      "Recognising a licence renewal before the renewal period begins.",
    ],
    related: ["ratable-recognition", "licence-of-ip", "bill-and-hold", "consignment", "five-step-model"],
    further: [ASC_HUB, DESIGN_PARTNERS],
  },
  {
    slug: "input-method",
    term: "Input method",
    title: "Input Method (Cost-to-Cost) Under ASC 606",
    description:
      "The input method for measuring progress under ASC 606 and IFRS 15, with a worked hours-based implementation example including a change in estimate.",
    definition:
      "An input method measures progress toward satisfying an over-time performance obligation by the entity's efforts or inputs, such as costs incurred, labour hours or time elapsed, relative to total expected inputs. Inputs that do not depict transfer to the customer, such as wasted materials or rework, are excluded.",
    references: [
      { standard: "ASC 606", ref: "606-10-55-20 to 55-21" },
      { standard: "IFRS 15", ref: "paragraphs B18–B19" },
      { standard: "Ind AS 115", ref: "paragraphs B18–B19" },
    ],
    example: {
      scenario: "Illustrative: a fixed-fee implementation of $40,000, budgeted at 400 hours.",
      steps: [
        "Quarter 1: 150 hours used. Progress 150 / 400 = 37.5%; revenue $15,000.",
        "Quarter 2: total estimate revised to 500 hours; 300 hours used to date. Progress 60%; cumulative revenue $24,000.",
        "Quarter 2 revenue = $24,000 − $15,000 = $9,000. The change in estimate is handled in the current period.",
      ],
      result: "Cumulative revenue tracks the latest estimate of total effort.",
    },
    mistakes: [
      "Counting rework or inefficiencies as progress.",
      "Not updating the total-input estimate each period.",
      "Using billing milestones as a proxy for inputs.",
    ],
    related: ["output-method", "cumulative-catch-up", "saas-implementation-fee", "ratable-recognition", "contract-costs-asc-340-40"],
    further: [ASC_HUB, DESIGN_PARTNERS],
  },
  {
    slug: "output-method",
    term: "Output method",
    title: "Output Method Under ASC 606: Definition",
    description:
      "The output method for measuring progress under ASC 606 and IFRS 15, the right-to-invoice practical expedient, and a worked data migration example.",
    definition:
      "An output method measures progress by the value transferred to the customer to date relative to the remaining goods or services, using measures such as milestones reached, units delivered or time elapsed. A practical expedient lets an entity recognise the amount it has a right to invoice when that amount corresponds directly to value transferred.",
    references: [
      { standard: "ASC 606", ref: "606-10-55-16 to 55-19", note: "55-18: right-to-invoice expedient" },
      { standard: "IFRS 15", ref: "paragraphs B14–B17" },
      { standard: "Ind AS 115", ref: "paragraphs B14–B17" },
    ],
    example: {
      scenario:
        "Illustrative: a $25,000 fixed fee to migrate 50 legacy entities, plus advisory hours billed at $150 per hour.",
      steps: [
        "Migration: 20 of 50 entities migrated at period end. Progress 40%; revenue $10,000.",
        "Advisory: 30 hours delivered at a rate that reflects value to the customer. Under the right-to-invoice expedient, revenue is 30 × $150 = $4,500.",
      ],
      result: "Period revenue of $14,500 across the two obligations.",
    },
    mistakes: [
      "Using milestones that leave material work in progress unrecognised.",
      "Applying the right-to-invoice expedient where rates are front-loaded and do not match value delivered.",
      "Mixing measures of progress within one performance obligation.",
    ],
    related: ["input-method", "ratable-recognition", "series-guidance", "practical-expedients", "point-in-time-recognition"],
    further: [ASC_HUB, DESIGN_PARTNERS],
  },
  {
    slug: "contract-modification",
    term: "Contract modification",
    title: "Contract Modification Under ASC 606: Example",
    description:
      "Contract modifications under ASC 606-10-25-10 to 25-13 and IFRS 15: the three outcomes and a worked SaaS seat upsell priced at and below SSP.",
    definition:
      "A contract modification is an approved change in the scope or price, or both, of a contract. It is accounted for as a separate contract, prospectively as a termination of the old contract and creation of a new one, or by cumulative catch-up, depending on whether the added goods or services are distinct and priced at standalone selling price.",
    references: [
      { standard: "ASC 606", ref: "606-10-25-10 to 25-13" },
      { standard: "IFRS 15", ref: "paragraphs 18–21" },
      { standard: "Ind AS 115", ref: "paragraphs 18–21" },
    ],
    example: {
      scenario:
        "Illustrative: a three-year subscription at $36,000 a year. At the start of year 2 the customer adds 50 seats for the remaining two years.",
      steps: [
        "Case A: the seats cost $10,000 a year, which reflects their SSP. The seats are distinct and priced at SSP, so the add-on is a separate contract; the original schedule is untouched.",
        "Case B: the seats cost $6,000 a year, a discount that does not reflect SSP. The remaining months are distinct, so the modification is prospective.",
        "Case B remaining consideration: unrecognised original $72,000 + new $12,000 = $84,000, over 24 months = $3,500 a month.",
      ],
      result: "Case A adds a new $10,000-a-year schedule; Case B replaces the remaining schedule with $3,500 a month.",
    },
    mistakes: [
      "Accounting for unapproved change orders, or ignoring approved but unpriced changes whose price must be estimated.",
      "Forgetting that price-only changes are modifications too.",
      "Using a cumulative catch-up when the remaining services are distinct.",
    ],
    related: ["cumulative-catch-up", "prospective-method", "standalone-selling-price", "distinct-good-or-service", "transaction-price"],
    further: [MODIFICATION_POST, DESIGN_PARTNERS],
    soluqubeNote:
      "Soluqube does not automate contract-modification accounting today; it is on the roadmap. The engine handles the original allocation and schedule.",
  },
  {
    slug: "cumulative-catch-up",
    term: "Cumulative catch-up adjustment",
    title: "Cumulative Catch-Up Adjustment: ASC 606 Example",
    description:
      "The cumulative catch-up method under ASC 606-10-25-13(b) and IFRS 15.21(b): when it applies, and a worked example on a partly complete fixed-fee build.",
    definition:
      "A cumulative catch-up adjustment is a one-time entry in the current period that brings revenue recognised to date in line with revised terms or estimates, as if they had applied from inception. It applies to modifications of a single, partially satisfied performance obligation and to changes in estimated progress or transaction price. Prior periods are not restated.",
    references: [
      { standard: "ASC 606", ref: "606-10-25-13(b)" },
      { standard: "ASC 606", ref: "606-10-32-43", note: "changes in transaction price" },
      { standard: "IFRS 15", ref: "paragraph 21(b)" },
    ],
    example: {
      scenario:
        "Illustrative: a $100,000 fixed-fee build is 40% complete, so $40,000 has been recognised. A modification adds $20,000 of scope that is not distinct from the build, and revised total costs put progress at 35%.",
      steps: [
        "New transaction price: $100,000 + $20,000 = $120,000.",
        "Cumulative revenue that should have been recognised: $120,000 × 35% = $42,000.",
        "Catch-up in the period of modification: $42,000 − $40,000 = $2,000.",
      ],
      result: "$2,000 of revenue in the current period; prior periods are not restated.",
    },
    mistakes: [
      "Restating prior periods instead of recording the adjustment in the current period.",
      "Applying a catch-up to services that are distinct from those already transferred.",
      "Not disclosing significant changes in estimates.",
    ],
    related: ["contract-modification", "prospective-method", "input-method", "variable-consideration", "constraint-on-variable-consideration"],
    further: [MODIFICATION_POST, ASC_HUB, DESIGN_PARTNERS],
    soluqubeNote: "Soluqube does not automate modification catch-up today; it is on the roadmap.",
  },
  {
    slug: "prospective-method",
    term: "Prospective method (modifications)",
    title: "Prospective Method for Contract Modifications",
    description:
      "The prospective method under ASC 606-10-25-13(a) and IFRS 15.21(a): termination and new contract, with a worked SaaS price-reduction example.",
    definition:
      "Under the prospective method, a contract modification is treated as if the existing contract were terminated and a new one created. Revenue already recognised is left unchanged; the unrecognised consideration from the original contract plus any new consideration is allocated to the remaining distinct goods or services.",
    references: [
      { standard: "ASC 606", ref: "606-10-25-13(a)" },
      { standard: "IFRS 15", ref: "paragraph 21(a)" },
      { standard: "Ind AS 115", ref: "paragraph 21(a)" },
    ],
    example: {
      scenario:
        "Illustrative: a 24-month subscription for $48,000 ($2,000 a month). After 12 months, the parties agree a $3,000 reduction for the remaining 12 months with no change in service.",
      steps: [
        "Recognised to date: $24,000. This is not adjusted.",
        "Remaining consideration: $24,000 − $3,000 = $21,000.",
        "The remaining months are distinct, so spread prospectively: $21,000 / 12 = $1,750 a month.",
      ],
      result: "$1,750 a month for months 13–24; no catch-up entry.",
    },
    mistakes: [
      "Confusing the prospective modification method with the prospective transition method used on adopting the standard.",
      "Going back to adjust revenue already recognised.",
      "Leaving existing contract asset balances out of the remaining consideration.",
    ],
    related: ["contract-modification", "cumulative-catch-up", "series-guidance", "transaction-price", "ratable-recognition"],
    further: [MODIFICATION_POST, DESIGN_PARTNERS],
    soluqubeNote: "Soluqube does not automate this assessment today; modification accounting is on the roadmap.",
  },
  {
    slug: "significant-financing-component",
    term: "Significant financing component",
    title: "Significant Financing Component Under ASC 606",
    description:
      "Significant financing components under ASC 606 and IFRS 15: when to adjust for time value, the one-year expedient, and a worked deferred-payment example.",
    definition:
      "A significant financing component exists when the payment timing agreed by the parties gives the customer or the entity a significant benefit of financing. The transaction price is then adjusted for the time value of money. A practical expedient skips the adjustment when the gap between payment and transfer is one year or less.",
    references: [
      { standard: "ASC 606", ref: "606-10-32-15 to 32-20", note: "32-18: one-year expedient" },
      { standard: "IFRS 15", ref: "paragraphs 60–65" },
      { standard: "Ind AS 115", ref: "paragraphs 60–65" },
    ],
    example: {
      scenario:
        "Illustrative: a perpetual licence is delivered today; the customer pays $100,000 in two years. The rate the parties would use in a separate financing transaction is 5%.",
      steps: [
        "Present value: $100,000 / 1.05² = $100,000 / 1.1025 = $90,702.95.",
        "Licence revenue at delivery: $90,702.95.",
        "Interest income over two years: $100,000 − $90,702.95 = $9,297.05, presented separately from revenue from contracts with customers.",
      ],
      result: "$90,702.95 of revenue now and $9,297.05 of interest income over the payment period.",
    },
    mistakes: [
      "Ignoring a financing component in multi-year upfront prepayments.",
      "Assuming every annual-in-advance SaaS invoice creates one; within one year the expedient usually applies.",
      "Using a risk-free rate instead of a rate reflecting the customer's credit.",
    ],
    related: ["transaction-price", "practical-expedients", "contract-liability", "variable-consideration", "deferred-revenue"],
    further: [ASC_HUB, DESIGN_PARTNERS],
  },
  {
    slug: "contract-costs-asc-340-40",
    term: "Contract costs (ASC 340-40)",
    title: "Contract Costs Under ASC 340-40: Commissions",
    description:
      "Capitalising contract costs under ASC 340-40 and IFRS 15: incremental costs of obtaining a contract, amortisation period, and a worked commission example.",
    definition:
      "ASC 340-40 and IFRS 15 require capitalising the incremental costs of obtaining a contract, typically sales commissions, if they are expected to be recovered, and certain costs to fulfil a contract. Capitalised costs are amortised on a systematic basis consistent with the transfer of the related goods or services, including anticipated renewals.",
    references: [
      { standard: "ASC 340-40", ref: "340-40-25-1 to 25-8 and 340-40-35-1", note: "25-4: one-year expedient" },
      { standard: "IFRS 15", ref: "paragraphs 91–104" },
      { standard: "Ind AS 115", ref: "paragraphs 91–104" },
    ],
    example: {
      scenario:
        "Illustrative: a 10% commission on a $120,000 three-year deal. Renewal commissions are 2%, which is not commensurate with the initial rate, and the expected customer life is five years.",
      steps: [
        "Capitalised cost: 10% × $120,000 = $12,000.",
        "Because renewal commissions are not commensurate, amortise over the expected customer life, not the initial term.",
        "Amortisation: $12,000 / 60 months = $200 a month.",
      ],
      result: "$12,000 asset amortised at $200 a month over five years, tested for impairment.",
    },
    mistakes: [
      "Capitalising costs that would have been incurred anyway, such as base salaries.",
      "Amortising over the initial contract term when renewal commissions are not commensurate.",
      "Skipping impairment testing of the capitalised balance.",
    ],
    related: ["practical-expedients", "ratable-recognition", "input-method", "remaining-performance-obligations", "five-step-model"],
    further: [ASC_HUB, DESIGN_PARTNERS],
  },
  {
    slug: "practical-expedients",
    term: "Practical expedients",
    title: "ASC 606 Practical Expedients: List & Example",
    description:
      "Key ASC 606 and IFRS 15 practical expedients: financing under one year, contract costs, right to invoice, RPO disclosure and portfolios, with an example.",
    definition:
      "Practical expedients are optional simplifications in ASC 606 and IFRS 15 that reduce cost without materially changing results. Examples include ignoring a significant financing component of one year or less, expensing contract costs amortised within a year, right-to-invoice measurement, and omitting certain remaining performance obligation disclosures.",
    references: [
      { standard: "ASC 606", ref: "606-10-32-18 (financing), 606-10-55-18 (right to invoice), 606-10-50-14 (RPO)" },
      { standard: "ASC 340-40", ref: "340-40-25-4 (contract costs)" },
      { standard: "IFRS 15", ref: "paragraphs 63, 94, 121 and B16" },
    ],
    example: {
      scenario:
        "Illustrative: a company sells 12-month subscriptions at $12,000, billed annually in advance, paying a $1,200 commission on each new deal and an equal commission on every renewal.",
      steps: [
        "Financing: payment and service are within one year, so no time-value adjustment.",
        "Contract costs: renewal commissions are commensurate, so the amortisation period is 12 months; the $1,200 can be expensed immediately instead of $100 a month.",
        "RPO: contracts with an original duration of one year or less can be left out of the remaining performance obligation disclosure.",
      ],
      result: "Three simplifications, each elected as policy and disclosed.",
    },
    mistakes: [
      "Electing an expedient without disclosing the election where disclosure is required.",
      "Applying the one-year RPO expedient to multi-year contracts.",
      "Applying an expedient to some similar contracts but not others.",
    ],
    related: ["significant-financing-component", "contract-costs-asc-340-40", "remaining-performance-obligations", "output-method", "series-guidance"],
    further: [ASC_HUB, DESIGN_PARTNERS],
  },
  {
    slug: "bill-and-hold",
    term: "Bill-and-hold",
    title: "Bill-and-Hold Arrangements Under ASC 606",
    description:
      "Bill-and-hold under ASC 606 and IFRS 15: the four criteria for recognising revenue before shipment and a worked example with a custodial service.",
    definition:
      "A bill-and-hold arrangement is one in which an entity bills a customer for a product but keeps physical possession until a later date. Revenue is recognised before shipment only if control has passed: there is a substantive reason, the product is identified as the customer's, ready for transfer, and cannot be used or redirected by the entity.",
    references: [
      { standard: "ASC 606", ref: "606-10-55-81 to 55-84" },
      { standard: "IFRS 15", ref: "paragraphs B79–B82" },
      { standard: "Ind AS 115", ref: "paragraphs B79–B82" },
    ],
    example: {
      scenario:
        "Illustrative: 20 hardware appliances at $4,000 each ($80,000). The customer asks the vendor to store them until its data centre is ready; the units are tagged to the customer and cannot be redirected. Storage is a separate service with an SSP of $1,000.",
      steps: [
        "All four criteria are met, so control of the appliances has passed at billing.",
        "Allocate $80,000 by relative SSP: appliances $80,000 × 80,000 / 81,000 = $79,012.35; storage $80,000 × 1,000 / 81,000 = $987.65.",
        "Recognise $79,012.35 now; recognise $987.65 over the storage period.",
      ],
      result: "Most revenue at billing, with a small custodial-service obligation deferred.",
    },
    mistakes: [
      "Recognising revenue on a bill-and-hold requested for the vendor's convenience.",
      "Missing the custodial service as a separate performance obligation.",
      "Not confirming the goods cannot be used to fill other orders.",
    ],
    related: ["point-in-time-recognition", "consignment", "performance-obligation", "relative-ssp-method", "five-step-model"],
    further: [ASC_HUB, SSP_TOOL],
  },
  {
    slug: "consignment",
    term: "Consignment arrangement",
    title: "Consignment Arrangements Under ASC 606",
    description:
      "Consignment arrangements under ASC 606 and IFRS 15: the indicators, why delivery to a dealer is not a sale, and a worked sell-through example.",
    definition:
      "In a consignment arrangement an entity delivers product to a dealer or distributor that does not obtain control of it, so no revenue is recognised on delivery. Indicators include the entity keeping control until a specified event such as sale to an end customer, and its ability to require the product's return.",
    references: [
      { standard: "ASC 606", ref: "606-10-55-79 to 55-80" },
      { standard: "IFRS 15", ref: "paragraphs B77–B78" },
      { standard: "Ind AS 115", ref: "paragraphs B77–B78" },
    ],
    example: {
      scenario:
        "Illustrative: 100 devices are delivered to a reseller on consignment at $500 each. The reseller sells 30 to end customers this quarter.",
      steps: [
        "No revenue on delivery of the 100 devices.",
        "Revenue for the 30 sold through: 30 × $500 = $15,000.",
        "The other 70 stay in the vendor's inventory, at cost, at the reseller's location.",
      ],
      result: "$15,000 of revenue this quarter; 70 units remain the vendor's inventory.",
    },
    mistakes: [
      "Recognising revenue on shipment to the consignee.",
      "Missing consignment-like terms in sell-through distributor agreements.",
      "Losing track of inventory held at consignee locations.",
    ],
    related: ["bill-and-hold", "point-in-time-recognition", "principal-vs-agent", "variable-consideration", "performance-obligation"],
    further: [ASC_HUB, DESIGN_PARTNERS],
  },
  {
    slug: "breakage",
    term: "Breakage",
    title: "Breakage Revenue Under ASC 606: Example",
    description:
      "Breakage under ASC 606 and IFRS 15: recognising unexercised customer rights such as unused prepaid credits, with a proportional worked example.",
    definition:
      "Breakage is the portion of a customer's non-refundable prepayment for rights it is not expected to exercise, such as unused gift cards, prepaid credits or vouchers. If the entity expects to be entitled to breakage, it recognises it in proportion to the pattern of rights the customer exercises; otherwise when exercise becomes remote.",
    references: [
      { standard: "ASC 606", ref: "606-10-55-46 to 55-49" },
      { standard: "IFRS 15", ref: "paragraphs B44–B47" },
      { standard: "Ind AS 115", ref: "paragraphs B44–B47" },
    ],
    example: {
      scenario:
        "Illustrative: a customer prepays $10,000 of non-refundable API credits. History shows 10% of credits are never used, and no law requires unused amounts to be remitted to a government.",
      steps: [
        "Expected usage: $9,000; expected breakage: $1,000.",
        "The customer uses $4,500 of credits, which is 50% of expected usage.",
        "Revenue: $4,500 used + 50% × $1,000 breakage = $5,000 (equivalently, 50% × $10,000).",
      ],
      result: "$5,000 recognised; $5,000 remains a contract liability.",
    },
    mistakes: [
      "Recognising expected breakage at the point of sale.",
      "Recognising breakage on amounts that unclaimed-property laws require the entity to remit.",
      "Not applying the variable-consideration constraint to the breakage estimate.",
    ],
    related: ["variable-consideration", "constraint-on-variable-consideration", "contract-liability", "customer-options", "material-right"],
    further: [ASC_HUB, DESIGN_PARTNERS],
  },
  {
    slug: "customer-options",
    term: "Customer options for additional goods or services",
    title: "Customer Options Under ASC 606: When to Allocate",
    description:
      "Customer options under ASC 606 and IFRS 15: when an option to buy more is a material right and when it is a marketing offer, with a seat add-on example.",
    definition:
      "Customer options are rights to acquire additional goods or services, free or at a discount, such as renewal options, add-on pricing, loyalty points or volume tiers. An option is a separate performance obligation only if it provides a material right; otherwise it is a marketing offer and nothing is allocated to it until exercised.",
    references: [
      { standard: "ASC 606", ref: "606-10-55-41 to 55-45" },
      { standard: "IFRS 15", ref: "paragraphs B39–B43" },
      { standard: "Ind AS 115", ref: "paragraphs B39–B43" },
    ],
    example: {
      scenario: "Illustrative: a subscription lets the customer add seats at any time during the term.",
      steps: [
        "Case A: extra seats cost $40 per seat per month, the same price similar customers pay. No material right; account for added seats when bought.",
        "Case B: extra seats cost $25 when similar customers pay $40, and the discount is available only because of this contract. That is a material right and part of the price is allocated to it.",
        "Contrast with usage fees under the existing contract, which are variable consideration, not options.",
      ],
      result: "Only Case B changes the allocation at inception.",
    },
    mistakes: [
      "Treating optional purchases as variable consideration, or the reverse.",
      "Ignoring volume tiers that apply a retrospective discount.",
      "Not comparing the option price with the discount normally given to that class of customer.",
    ],
    related: ["material-right", "breakage", "variable-consideration", "standalone-selling-price", "contract-modification"],
    further: [SSP_EXAMPLE_POST, DESIGN_PARTNERS],
  },
  {
    slug: "licence-of-ip",
    term: "Right to use vs right to access (licence of IP)",
    title: "Right to Use vs Right to Access: Licence of IP",
    description:
      "Right to use vs right to access for IP licences under IFRS 15 and ASC 606: functional vs symbolic IP, when revenue is recognised, and a worked example.",
    definition:
      "A right to access gives the customer the licensor's IP as it changes over the licence period, so revenue is recognised over time. A right to use gives the customer the IP as it exists when granted, so revenue is recognised at a point in time. ASC 606 reaches this split by classifying IP as symbolic or functional.",
    references: [
      { standard: "ASC 606", ref: "606-10-55-54 to 55-65" },
      { standard: "IFRS 15", ref: "paragraphs B52–B63" },
      { standard: "Ind AS 115", ref: "paragraphs B52–B63" },
    ],
    example: {
      scenario: "Illustrative: two three-year licences signed on the same day.",
      steps: [
        "Brand and character licence for $120,000 (symbolic IP that the licensor keeps supporting): right to access, recognised over time at $40,000 a year.",
        "On-premise software term licence for $90,000 (functional IP whose utility the licensor does not change): right to use, recognised when the software is available and the term begins.",
        "A SaaS subscription where the customer cannot take possession of the software is generally a service, not a licence.",
      ],
      result: "$40,000 a year for the brand licence; $90,000 up front for the software licence.",
    },
    mistakes: [
      "Treating SaaS access as a licence of IP.",
      "Recognising a licence renewal before the renewal period starts.",
      "Applying the general variable-consideration constraint to sales- or usage-based royalties instead of the royalty exception.",
    ],
    related: ["point-in-time-recognition", "ratable-recognition", "constraint-on-variable-consideration", "distinct-good-or-service", "performance-obligation"],
    further: [ASC_HUB, { href: "/blog/saas-training-separate-performance-obligation-asc-606", label: "Is SaaS training a separate performance obligation?" }, DESIGN_PARTNERS],
  },
  {
    slug: "saas-implementation-fee",
    term: "SaaS implementation fee",
    title: "SaaS Implementation Fees Under ASC 606",
    description:
      "How to account for SaaS implementation and set-up fees under ASC 606 and IFRS 15: distinct or not, with two worked examples and the renewal trap.",
    definition:
      "A SaaS implementation fee is a charge for set-up, configuration, data migration or training at the start of a subscription. If the activity transfers a distinct service, it is a separate performance obligation. If it is a set-up activity or not distinct, the fee is added to the subscription consideration and recognised over the service period.",
    references: [
      { standard: "ASC 606", ref: "606-10-25-17", note: "set-up activities" },
      { standard: "ASC 606", ref: "606-10-55-50 to 55-53", note: "non-refundable upfront fees" },
      { standard: "IFRS 15", ref: "paragraphs 25 and B48–B51" },
    ],
    example: {
      scenario: "Illustrative: a $60,000 annual subscription with a $12,000 upfront implementation fee.",
      steps: [
        "Not distinct (set-up only): recognise ($60,000 + $12,000) / 12 = $6,000 a month. If the customer can renew without paying the fee again, assess whether the fee gives a material right that extends the recognition period.",
        "Distinct (standard configuration others also sell): SSPs are $66,000 (subscription) and $9,000 (implementation), total $75,000.",
        "Allocate $72,000: subscription $72,000 × 66/75 = $63,360; implementation $72,000 × 9/75 = $8,640.",
      ],
      result: "Either $6,000 a month, or $63,360 ratably plus $8,640 as the implementation is delivered.",
    },
    mistakes: [
      "Recognising the fee when invoiced.",
      "Ignoring the material right created when renewals do not repeat the fee.",
      "Treating internal set-up tasks as a performance obligation.",
    ],
    related: ["distinct-good-or-service", "performance-obligation", "material-right", "expected-cost-plus-margin", "contract-costs-asc-340-40"],
    further: [SSP_TOOL, SSP_EXAMPLE_POST],
  },
  {
    slug: "remaining-performance-obligations",
    term: "Remaining performance obligations (RPO)",
    title: "Remaining Performance Obligations (RPO)",
    description:
      "Remaining performance obligations (RPO) disclosure under ASC 606 and IFRS 15: what is included, timing bands, and a worked three-year contract example.",
    definition:
      "Remaining performance obligations (RPO) is the disclosure of the transaction price allocated to performance obligations that are unsatisfied, or partly unsatisfied, at the reporting date, with an explanation of when the entity expects to recognise it. It combines deferred revenue and contracted amounts not yet invoiced.",
    references: [
      { standard: "ASC 606", ref: "606-10-50-13 to 50-15" },
      { standard: "IFRS 15", ref: "paragraphs 120–122" },
      { standard: "Ind AS 115", ref: "paragraphs 120–122" },
    ],
    example: {
      scenario:
        "Illustrative: a non-cancellable three-year contract for $90,000, billed $30,000 annually in advance from 1 January 2026. Reporting date 30 June 2026.",
      steps: [
        "Recognised to date: 6 × $2,500 = $15,000. Deferred revenue: $15,000. Not yet billed: $60,000.",
        "RPO = $15,000 + $60,000 = $75,000.",
        "Within 12 months (July 2026–June 2027): $30,000. Thereafter (July 2027–December 2028): 18 × $2,500 = $45,000.",
      ],
      result: "RPO of $75,000: $30,000 within a year and $45,000 after.",
    },
    mistakes: [
      "Including periods the customer can cancel without substantive penalty.",
      "Leaving out contracted amounts that have not been billed.",
      "Treating RPO as the same thing as bookings or ARR.",
    ],
    related: ["contract-liability", "deferred-revenue", "practical-expedients", "disaggregation-of-revenue", "transaction-price"],
    further: [ASC_HUB, DESIGN_PARTNERS],
  },
  {
    slug: "disaggregation-of-revenue",
    term: "Disaggregation of revenue",
    title: "Disaggregation of Revenue: ASC 606 Disclosure",
    description:
      "Disaggregation of revenue under ASC 606 and IFRS 15: which categories to use, how it ties to segments, and a worked SaaS disclosure example.",
    definition:
      "Disaggregation of revenue is the required disclosure splitting revenue into categories that show how the nature, amount, timing and uncertainty of revenue and cash flows are affected by economic factors, for example by product line, geography, customer type, contract duration or timing of transfer.",
    references: [
      { standard: "ASC 606", ref: "606-10-50-5 to 50-7 and 606-10-55-89 to 55-91" },
      { standard: "IFRS 15", ref: "paragraphs 114–115 and B87–B89" },
      { standard: "Ind AS 115", ref: "paragraphs 114–115 and B87–B89" },
    ],
    example: {
      scenario: "Illustrative: a SaaS company with $10.0 million of revenue.",
      steps: [
        "By type and timing: subscriptions over time $8.2m; professional services over time $1.3m; hardware at a point in time $0.5m.",
        "By geography: United States $7.0m; India $3.0m.",
        "Check: both views total $10.0m, and each category is explained against reportable segments.",
      ],
      result: "Two disaggregation views that tie to total revenue and to segment reporting.",
    },
    mistakes: [
      "Giving a single category when investor materials already use several.",
      "Categories that do not match those used in earnings releases or segment reporting.",
      "Not explaining the relationship between disaggregated revenue and segments.",
    ],
    related: ["remaining-performance-obligations", "point-in-time-recognition", "ratable-recognition", "principal-vs-agent", "ind-as-115-gst-treatment"],
    further: [ASC_HUB, IND_AS_HUB],
  },
  {
    slug: "ind-as-115-gst-treatment",
    term: "Ind AS 115 GST treatment",
    title: "GST Under Ind AS 115: Treatment & Example",
    description:
      "How Ind AS 115 treats GST: excluded from the transaction price as an amount collected for the government, with a worked INR subscription schedule.",
    definition:
      "Under Ind AS 115 the transaction price excludes amounts collected on behalf of third parties, so Goods and Services Tax (GST) charged on an invoice is not revenue. GST is recorded as a liability to the government; only the net consideration is allocated to performance obligations and recognised as revenue.",
    references: [
      { standard: "Ind AS 115", ref: "paragraph 47" },
      { standard: "IFRS 15", ref: "paragraph 47" },
      { standard: "ASC 606", ref: "606-10-32-2A", note: "US election to exclude sales taxes" },
    ],
    example: {
      scenario: "Illustrative: an INR annual subscription invoiced at ₹11,80,000 including 18% GST.",
      steps: [
        "Net consideration: ₹11,80,000 / 1.18 = ₹10,00,000. GST: ₹1,80,000 to GST payable (CGST and SGST for intra-state supplies, IGST for inter-state).",
        "Monthly revenue: ₹10,00,000 / 12 = ₹83,333.33 for months 1–11 (₹9,16,666.63).",
        "Month 12 absorbs the remainder: ₹10,00,000 − ₹9,16,666.63 = ₹83,333.37.",
      ],
      result: "₹10,00,000 of revenue over 12 months; ₹1,80,000 never touches revenue.",
    },
    mistakes: [
      "Allocating and scheduling the gross invoice amount including GST.",
      "Booking GST as revenue and then as an expense.",
      "Applying GST logic to US contracts, which carry no GST.",
    ],
    related: ["transaction-price", "relative-ssp-method", "terminal-period-remainder-absorption", "deferred-revenue", "disaggregation-of-revenue"],
    further: [IND_AS_HUB, { href: "/blog/asc-606-vs-ind-as-115-dual-standard-gst-compliance", label: "ASC 606 vs Ind AS 115: dual reporting and GST isolation" }],
    soluqubeNote:
      "For INR contracts, Soluqube books the 18% GST to a liability and allocates and schedules only the net consideration. US contracts carry no GST.",
  },
  {
    slug: "five-step-model",
    term: "Five-step model",
    title: "ASC 606 Five-Step Model: Worked Example",
    description:
      "The five-step revenue recognition model in ASC 606, IFRS 15 and Ind AS 115, with one worked $120,000 SaaS contract taken through all five steps.",
    definition:
      "The five-step model is the core of ASC 606, IFRS 15 and Ind AS 115: identify the contract; identify the performance obligations; determine the transaction price; allocate the transaction price to the performance obligations; and recognise revenue when, or as, each obligation is satisfied.",
    references: [
      { standard: "ASC 606", ref: "606-10-05-4" },
      { standard: "IFRS 15", ref: "paragraph IN7" },
      { standard: "Ind AS 115", ref: "same five-step structure as IFRS 15" },
    ],
    example: {
      scenario: "Illustrative: a signed two-year contract for $120,000 covering a subscription and an onboarding project.",
      steps: [
        "Step 1: signed, enforceable, collectible — a contract exists.",
        "Step 2: two performance obligations — subscription (series) and onboarding (distinct service).",
        "Step 3: transaction price $120,000 fixed.",
        "Step 4: SSPs $100,000 and $25,000; relative allocation $96,000 and $24,000.",
        "Step 5: subscription $96,000 / 24 = $4,000 a month; onboarding $24,000 as hours are delivered.",
      ],
      result: "Two schedules that together recognise exactly $120,000.",
    },
    mistakes: [
      "Skipping step 1 checks such as enforceability and collectibility.",
      "Doing step 4 on list prices instead of SSPs.",
      "Running step 5 off the invoice schedule.",
    ],
    related: ["performance-obligation", "transaction-price", "relative-ssp-method", "ratable-recognition", "distinct-good-or-service"],
    further: [ASC_HUB, SSP_TOOL],
  },
  {
    slug: "ssp-range",
    term: "SSP range",
    title: "SSP Range: Setting and Defending the Band",
    description:
      "How SaaS companies set a standalone selling price range from observable sales, apply it to contract prices, and document it for auditors. Worked example.",
    definition:
      "An SSP range is a band of prices, commonly set around the median of observable standalone sales, within which a contract's stated price is accepted as its standalone selling price. ASC 606 does not prescribe ranges, but they are common practice; prices outside the band are adjusted to a point, such as the nearer boundary, under a written policy.",
    references: [
      { standard: "ASC 606", ref: "606-10-32-32 to 32-33", note: "general SSP guidance; ranges are a practice, not a separate paragraph" },
      { standard: "IFRS 15", ref: "paragraphs 77–78" },
    ],
    example: {
      scenario:
        "Illustrative: support is sold at a median of 18% of the net licence price in observable sales. Policy: the band is the median ±15%.",
      steps: [
        "Band: 18% × 0.85 = 15.3% to 18% × 1.15 = 20.7%.",
        "Contract A prices support at 19%: inside the band, so 19% is used as SSP.",
        "Contract B prices support at 12%: outside the band, so SSP is set at the nearer boundary, 15.3%, per policy.",
      ],
      result: "Contract A uses its stated price; Contract B is adjusted to 15.3% before allocation.",
    },
    mistakes: [
      "A band so wide that every price falls inside it.",
      "Not refreshing the band as pricing changes.",
      "Adjusting out-of-band prices to the midpoint in some contracts and the boundary in others.",
      "Too few observable transactions to support the band.",
    ],
    related: ["standalone-selling-price", "observable-price", "relative-ssp-method", "residual-approach", "adjusted-market-assessment"],
    further: [SSP_TOOL, SSP_EXAMPLE_POST],
  },
  {
    slug: "observable-price",
    term: "Observable price",
    title: "Observable Price as Evidence of SSP",
    description:
      "What counts as an observable standalone selling price under ASC 606 and IFRS 15, why list price is not presumed SSP, and a worked support-pricing example.",
    definition:
      "An observable price is the price at which an entity actually sells a good or service separately to similar customers in similar circumstances. It is the best evidence of standalone selling price. A contractually stated or list price may be the standalone selling price, but is not presumed to be.",
    references: [
      { standard: "ASC 606", ref: "606-10-32-32" },
      { standard: "IFRS 15", ref: "paragraph 77" },
      { standard: "Ind AS 115", ref: "paragraph 77" },
    ],
    example: {
      scenario:
        "Illustrative: premium support was sold on its own 45 times in the last 12 months to mid-market customers, at $9,000 to $13,500.",
      steps: [
        "80% of those sales fall between $10,800 and $12,200; the median is $11,500.",
        "List price is $15,000, but almost no customer pays it, so list price is not the SSP.",
        "Use $11,500 as the SSP point estimate, or $10,800–$12,200 as a range under a written policy.",
      ],
      result: "SSP supported by 45 observable standalone sales, not by the list price.",
    },
    mistakes: [
      "Treating list price as observable evidence.",
      "Mixing customer classes, such as enterprise and SMB, in one dataset.",
      "Including sales that were part of bundles.",
      "Drawing conclusions from too few transactions.",
    ],
    related: ["standalone-selling-price", "ssp-range", "adjusted-market-assessment", "relative-ssp-method", "residual-approach"],
    further: [SSP_EXAMPLE_POST, SSP_TOOL],
  },
  {
    slug: "terminal-period-remainder-absorption",
    term: "Terminal-period remainder absorption",
    title: "Terminal-Period Remainder Absorption",
    description:
      "A rounding policy for revenue schedules: the final period absorbs the remainder so the schedule sums to the allocation. Worked $100,000 / 36 example.",
    definition:
      "Terminal-period remainder absorption is a rounding policy for revenue schedules: compute each period's amount from the allocated price, round to the cent, and let the final period absorb the difference between the allocated amount and the sum of earlier periods. The schedule then sums exactly to the allocation, and deferred revenue ends at zero.",
    references: [
      {
        standard: "Policy",
        ref: "Not prescribed by ASC 606, IFRS 15 or Ind AS 115",
        note: "the standards do not set rounding rules; this is an accounting policy that keeps the schedule equal to the allocated amount",
      },
    ],
    example: {
      scenario: "Illustrative: $100,000 allocated to a 36-month subscription.",
      steps: [
        "Exact monthly amount: $2,777.777…",
        "Round each month up to $2,777.78: total $100,000.08, eight cents too much.",
        "Truncate each month to $2,777.77: total $99,999.72, leaving $0.28 deferred forever.",
        "Absorb in the final period: 35 × $2,777.77 = $97,221.95; month 36 = $2,778.05; total $100,000.00.",
      ],
      result: "The schedule ties to the cent and deferred revenue closes at $0.00.",
    },
    mistakes: [
      "Rounding every period independently and leaving the residue in deferred revenue.",
      "Spreading the remainder ad hoc instead of under a written rule.",
      "Using one rounding rule for allocations and a different one for schedules without documenting either.",
    ],
    related: ["deferred-revenue", "ratable-recognition", "relative-ssp-method", "contract-liability", "ind-as-115-gst-treatment"],
    further: [ROUNDING_POST, SSP_TOOL],
    soluqubeNote:
      "Soluqube's engine uses this rule: integer (BigInt) arithmetic at 10^6 scale, rounded to cents, with the final period absorbing the remainder.",
  },
];

export function getGlossaryTerm(slug: string): GlossaryTerm | undefined {
  return GLOSSARY_TERMS.find((t) => t.slug === slug);
}
