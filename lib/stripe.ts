import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  apiVersion: "2025-02-24.acacia" as any,
  typescript: true,
});

export const AUDIT_PACKAGE_PRICE_CENTS = 49900; // $499.00 USD
export const AUDIT_PACKAGE_NAME = "Soluqube PCAOB Defensible 3-Contract Audit Tie-Out Package";
export const AUDIT_PACKAGE_DESCRIPTION = "Deterministic fixed-point recalculation, PDF clause bounding-box grounding, and an audit-ready ASC 606 workpaper package.";
