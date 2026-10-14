import { NextRequest, NextResponse } from "next/server";
import { stripe, AUDIT_PACKAGE_PRICE_CENTS, AUDIT_PACKAGE_NAME, AUDIT_PACKAGE_DESCRIPTION } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { name, email, company, erp = "NetSuite", contractValue = 100000, notes = "" } = body;

    if (!email || !name) {
      return NextResponse.json(
        { success: false, error: "Name and work email are required to generate an audit package." },
        { status: 400 }
      );
    }

    const host = req.headers.get("host") || "soluqube.com";
    const protocol = host.includes("localhost") ? "http" : "https";
    const origin = `${protocol}://${host}`;

    // If Stripe secret key is not set or is placeholder, return simulated checkout confirmation for staging
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes("placeholder")) {
      const mockSessionId = "sim_audit_" + Math.random().toString(36).substring(2, 10);
      return NextResponse.json({
        success: true,
        url: `${origin}/audit?status=success&session_id=${mockSessionId}&demo=true`,
        sessionId: mockSessionId,
        mode: "mock"
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: AUDIT_PACKAGE_NAME,
              description: AUDIT_PACKAGE_DESCRIPTION,
              images: [`${origin}/icon.png`],
            },
            unit_amount: AUDIT_PACKAGE_PRICE_CENTS,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: email,
      metadata: {
        lead_name: name,
        lead_company: company,
        erp_system: erp,
        contract_value: String(contractValue),
        notes: notes.slice(0, 500),
      },
      success_url: `${origin}/audit?status=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/audit?status=cancelled`,
    });

    return NextResponse.json({
      success: true,
      url: session.url,
      sessionId: session.id,
      mode: "live"
    });
  } catch (err: unknown) {
    console.error("Checkout session creation failed:", err);
    return NextResponse.json(
      { success: false, error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
