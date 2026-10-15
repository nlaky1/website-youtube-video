/**
 * Ported for the public SSP Allocation & Residual-Cent Calculator (runs in the browser, no network).
 * SOURCE: smart_contracts/src/lib/soluqube/fixedPointEngine.ts — logic copied unchanged
 * (toFixedPoint, fromFixedPoint, spreadGstCents, validateContractInput, calculateContractDAG).
 * If the source engine changes, re-copy it here and re-run `npm run test:tools`.
 * Only deviation: validateContractInput iterates Array.from(...entries()) instead of ...entries()
 * because this repo's tsconfig has no ES2015 target (same iteration order, same behaviour).
 *
 * Soluqube Fixed-Point Engine (BigInt at 10^6 scale, rounded to cents)
 * Patent Pending (App. No. 202621096305)
 */

export const FIXED_SCALE = BigInt(1000000); // 6 decimal places micro-cent precision
export const CENTS_SCALE = BigInt(100);

export interface PerformanceObligation {
  id: string;
  name: string;
  recType: 'ratable_monthly' | 'point_in_time' | 'milestone_percentage';
  sspAmount: number; // Standalone Selling Price in contract currency
  termMonths?: number;
  startMonth?: number;
  gstRatePct?: number; // Statutory GST e.g. 18.0
}

export interface ContractInput {
  contractId: string;
  customerName: string;
  effectiveDate: string;
  currency: 'USD' | 'INR' | 'EUR' | 'GBP';
  totalTransactionPrice: number;
  performanceObligations: PerformanceObligation[];
}

export interface SchedulePeriod {
  periodIndex: number;
  periodLabel: string;
  pobId: string;
  pobName: string;
  recognizedAmount: number;
  cumulativeRecognized: number;
  remainingDeferred: number;
  statutoryGstAmount: number;
}

export interface ContractAllocationResult {
  contractId: string;
  currency: string;
  totalTransactionPrice: number;
  totalSsp: number;
  totalAllocated: number;
  roundingDrift: number; // Must be 0.00
  pobAllocations: Array<{
    pobId: string;
    pobName: string;
    recType: string;
    sspAmount: number;
    allocationWeightPct: number;
    allocatedAmount: number;
    statutoryGstAmount: number;
    totalInvoicedWithTax: number;
  }>;
  schedulePeriods: SchedulePeriod[];
  journalEntries: Array<{
    account: string;
    debit: number;
    credit: number;
    memo: string;
  }>;
}

/**
 * Converts a floating point number to a BigInt at 10^6 scale
 */
export function toFixedPoint(val: number): bigint {
  return BigInt(Math.round(val * 1_000_000));
}

/**
 * Converts micro-cent BigInt back to 2-decimal rounded currency float
 */
export function fromFixedPoint(fixed: bigint): number {
  const scaled = Number(fixed) / 1_000_000;
  return Math.round(scaled * 100) / 100;
}

/**
 * Spreads statutory GST across recognition periods in integer cents (DEF-69): total GST is
 * computed once on the summed revenue, every period but the last gets floor(revenue × rate),
 * and the terminal period absorbs the remainder, so the periods sum exactly to the total.
 */
export function spreadGstCents(periodRevenueCents: number[], gstRatePct: number): number[] {
  const rate = BigInt(Math.round(gstRatePct * 100)); // basis points, e.g. 18% -> 1800
  const totalRevenue = periodRevenueCents.reduce((s, c) => s + BigInt(c), BigInt(0));
  const totalGst = (totalRevenue * rate * BigInt(2) + BigInt(10000)) / BigInt(20000); // half-up to the cent
  let allocated = BigInt(0);
  return periodRevenueCents.map((c, i) => {
    const gst = i === periodRevenueCents.length - 1 ? totalGst - allocated : (BigInt(c) * rate) / BigInt(10000);
    allocated += gst;
    return Number(gst);
  });
}

const SUPPORTED_REC_TYPES: readonly string[] = ['ratable_monthly', 'point_in_time'];
// Security review M2: upper bound so one request cannot spin the schedule loop (DoS).
const MAX_TERM_MONTHS = 600;

/**
 * Rejects inputs the engine cannot schedule exactly, before any arithmetic runs.
 * Messages are returned to API clients as 400s, so they must stay plain-language.
 */
function validateContractInput(input: ContractInput): void {
  const price = input.totalTransactionPrice;
  if (typeof price !== 'number' || !Number.isFinite(price) || price < 0) {
    throw new Error('totalTransactionPrice must be a non-negative finite number.');
  }
  if (Math.abs(price * 100 - Math.round(price * 100)) > 1e-6) {
    throw new Error('totalTransactionPrice must not have more than 2 decimal places.');
  }
  if (!Array.isArray(input.performanceObligations)) {
    throw new Error('performanceObligations must be an array.');
  }

  for (const [index, pob] of Array.from(input.performanceObligations.entries())) {
    if (!pob || typeof pob !== 'object') {
      throw new Error(`Performance obligation #${index + 1} must be an object.`);
    }
    const label = pob.id ? `Performance obligation "${pob.id}"` : `Performance obligation #${index + 1}`;
    if (typeof pob.sspAmount !== 'number' || !Number.isFinite(pob.sspAmount) || pob.sspAmount < 0) {
      throw new Error(`${label}: sspAmount must be a non-negative finite number.`);
    }
    if (pob.recType === 'milestone_percentage') {
      throw new Error(`${label}: milestone_percentage recognition is not supported yet because no milestone dates or percentages can be supplied.`);
    }
    if (!SUPPORTED_REC_TYPES.includes(pob.recType)) {
      throw new Error(`${label}: unsupported recType "${String(pob.recType)}".`);
    }
    if (pob.recType === 'ratable_monthly' && pob.termMonths !== undefined && (!Number.isInteger(pob.termMonths) || pob.termMonths < 1)) {
      throw new Error(`${label}: termMonths must be a whole number of at least 1.`);
    }
    if (pob.termMonths !== undefined && typeof pob.termMonths === 'number' && pob.termMonths > MAX_TERM_MONTHS) {
      throw new Error(`${label}: termMonths must be at most ${MAX_TERM_MONTHS}.`);
    }
    if (pob.startMonth !== undefined && (!Number.isInteger(pob.startMonth) || pob.startMonth < 1)) {
      throw new Error(`${label}: startMonth must be a whole number of at least 1.`);
    }
    if (pob.gstRatePct !== undefined && (typeof pob.gstRatePct !== 'number' || !Number.isFinite(pob.gstRatePct) || pob.gstRatePct < 0 || pob.gstRatePct > 100)) {
      throw new Error(`${label}: gstRatePct must be between 0 and 100.`);
    }
  }
}

/**
 * Calculates deterministic ASC 606 / Ind AS 115 Multi-Element Allocations
 * with 0-drift residual distribution.
 */
export function calculateContractDAG(input: ContractInput): ContractAllocationResult {
  validateContractInput(input);

  const txPriceFixed = toFixedPoint(input.totalTransactionPrice);
  const pobs = input.performanceObligations;

  if (pobs.length === 0) {
    throw new Error('Contract must have at least one Performance Obligation (POB).');
  }

  // 1. Calculate Total SSP in Fixed Point
  let totalSspFixed = BigInt(0);
  for (const pob of pobs) {
    totalSspFixed += toFixedPoint(pob.sspAmount);
  }

  if (totalSspFixed === BigInt(0)) {
    throw new Error('Total Standalone Selling Price (SSP) cannot be zero.');
  }

  // 2. Compute Relative Standalone Selling Price Allocations
  const totalCents = Math.round(input.totalTransactionPrice * 100);
  let runningCents = 0;
  const pobAllocations: ContractAllocationResult['pobAllocations'] = [];
  const allocatedAmountsFixed: bigint[] = [];

  for (let i = 0; i < pobs.length; i++) {
    const pob = pobs[i];
    const sspFixed = toFixedPoint(pob.sspAmount);
    
    let allocatedCents = 0;
    if (i === pobs.length - 1) {
      // Last POB absorbs the remaining cents so allocations sum exactly to the transaction price
      allocatedCents = totalCents - runningCents;
    } else {
      const rawAllocFixed = (txPriceFixed * sspFixed) / totalSspFixed;
      allocatedCents = Math.round(Number(rawAllocFixed) / 10000);
      runningCents += allocatedCents;
    }

    const allocFixed = BigInt(allocatedCents) * BigInt(10000);
    allocatedAmountsFixed.push(allocFixed);

    const allocatedAmount = allocatedCents / 100;
    const gstRate = pob.gstRatePct || 0;
    const gstAmount = Math.round((allocatedAmount * (gstRate / 100)) * 100) / 100;

    const allocWeight = Number((sspFixed * BigInt(10000)) / totalSspFixed) / 100;

    pobAllocations.push({
      pobId: pob.id,
      pobName: pob.name,
      recType: pob.recType,
      sspAmount: pob.sspAmount,
      allocationWeightPct: allocWeight,
      allocatedAmount,
      statutoryGstAmount: gstAmount,
      totalInvoicedWithTax: Math.round((allocatedAmount + gstAmount) * 100) / 100
    });
  }

  // 3. Build Schedule DAG Periods with ratable amortization that ties to the cent
  const schedulePeriods: SchedulePeriod[] = [];
  let totalRecognizedFixed = BigInt(0);

  for (let i = 0; i < pobs.length; i++) {
    const pob = pobs[i];
    const allocFixed = allocatedAmountsFixed[i];
    const termMonths = pob.termMonths || 1;
    const startMonth = pob.startMonth || 1;

    if (pob.recType === 'point_in_time') {
      const recognized = fromFixedPoint(allocFixed);
      totalRecognizedFixed += allocFixed;
      schedulePeriods.push({
        periodIndex: startMonth,
        periodLabel: `Month ${startMonth}`,
        pobId: pob.id,
        pobName: pob.name,
        recognizedAmount: recognized,
        cumulativeRecognized: fromFixedPoint(totalRecognizedFixed),
        remainingDeferred: 0,
        statutoryGstAmount: pobAllocations[i].statutoryGstAmount
      });
    } else if (pob.recType === 'ratable_monthly') {
      const pobTotalCents = Math.round(pobAllocations[i].allocatedAmount * 100);
      const baseMonthlyCents = Math.floor(pobTotalCents / termMonths);
      const remainderCents = pobTotalCents - (baseMonthlyCents * termMonths);

      let runningPobCents = 0;

      for (let m = 1; m <= termMonths; m++) {
        const currentMonth = startMonth + m - 1;
        // Terminal-period remainder absorption: every month gets the floored base amount and the
        // final month absorbs the leftover cents, so the schedule ties out to the allocation exactly.
        const monthlyCents = m === termMonths ? baseMonthlyCents + remainderCents : baseMonthlyCents;
        runningPobCents += monthlyCents;

        const monthlyAmount = monthlyCents / 100;
        const monthlyFixed = BigInt(monthlyCents) * BigInt(10000);
        totalRecognizedFixed += monthlyFixed;

        const remainingCents = pobTotalCents - runningPobCents;
        const remainingDeferred = remainingCents > 0 ? remainingCents / 100 : 0;

        schedulePeriods.push({
          periodIndex: currentMonth,
          periodLabel: `Month ${currentMonth}`,
          pobId: pob.id,
          pobName: pob.name,
          recognizedAmount: monthlyAmount,
          cumulativeRecognized: fromFixedPoint(totalRecognizedFixed),
          remainingDeferred,
          statutoryGstAmount: m === 1 ? pobAllocations[i].statutoryGstAmount : 0 // GST recognized on invoice date
        });
      }
    }
  }

  // 4. Verification gate (integer cents): allocations AND the recognition schedule must both
  // reconcile to the transaction price, and every POB must end with a zero deferred balance.
  const CENT_UNITS = BigInt(10000);
  const allocatedCentsList = allocatedAmountsFixed.map((f) => Number(f / CENT_UNITS));
  if (allocatedCentsList.some((c) => c < 0)) {
    throw new Error('Reconciliation gate failed: a performance obligation would receive a negative allocation (too many obligations for this price).');
  }
  const allocatedCentsTotal = allocatedCentsList.reduce((acc, c) => acc + c, 0);
  const recognizedCentsTotal = Number(totalRecognizedFixed / CENT_UNITS);
  if (allocatedCentsTotal !== totalCents || recognizedCentsTotal !== totalCents) {
    throw new Error(`Reconciliation gate failed: price ${totalCents} cents, allocated ${allocatedCentsTotal}, recognized ${recognizedCentsTotal}.`);
  }
  for (const pob of pobs) {
    const periods = schedulePeriods.filter((p) => p.pobId === pob.id);
    if (periods.length > 0 && periods[periods.length - 1].remainingDeferred !== 0) {
      throw new Error(`Reconciliation gate failed: "${pob.id}" ends with a non-zero deferred balance.`);
    }
  }
  const sumAllocated = allocatedCentsTotal / 100;
  const roundingDrift = Math.abs(totalCents - recognizedCentsTotal) / 100;

  // 5. Generate audit-ready initial booking journal entries
  const totalTax = pobAllocations.reduce((acc, p) => acc + p.statutoryGstAmount, 0);
  const totalReceivable = Math.round((input.totalTransactionPrice + totalTax) * 100) / 100;

  const journalEntries = [
    {
      account: '1100 Accounts Receivable (Trade)',
      debit: totalReceivable,
      credit: 0,
      memo: `Invoice booking for Contract #${input.contractId} (${input.customerName})`
    },
    {
      account: '2500 Deferred Contract Revenue (Contract Liability)',
      debit: 0,
      credit: input.totalTransactionPrice,
      memo: `ASC 606 ratable deferred subscription revenue`
    }
  ];

  if (totalTax > 0) {
    journalEntries.push({
      account: '2210 Statutory GST Output Liability (18%)',
      debit: 0,
      credit: totalTax,
      memo: `Statutory GST Output tax liability isolated from ratable revenue`
    });
  }

  return {
    contractId: input.contractId,
    currency: input.currency,
    totalTransactionPrice: input.totalTransactionPrice,
    totalSsp: fromFixedPoint(totalSspFixed),
    totalAllocated: sumAllocated,
    roundingDrift,
    pobAllocations,
    schedulePeriods,
    journalEntries
  };
}
