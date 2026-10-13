import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const sig = req.headers.get("stripe-signature");
    const rawBody = await req.text();
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    if (webhookSecret && sig) {
      try {
        event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Webhook signature verification failed";
        return NextResponse.json({ error: message }, { status: 400 });
      }
    } else {
      // Direct JSON parse for testing or local simulation
      try {
        event = JSON.parse(rawBody);
      } catch {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
      }
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const customerEmail = session.customer_details?.email || session.customer_email;
      const metadata = session.metadata || {};

      // Send confirmation notification via SMTP
      const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
      const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 465;
      const smtpUser = process.env.SMTP_USER || "nikhil@soluqube.com";
      const smtpPass = process.env.SMTP_PASS || "";
      const senderEmail = process.env.SOLUQUBE_SENDER_EMAIL || "nikhil@soluqube.com";
      const alertEmail = process.env.FOUNDER_ALERT_EMAIL || "nikhil@soluqube.com";

      if (!smtpPass) {
        console.warn("SMTP_PASS is not configured in environment; skipping email dispatch.");
        return NextResponse.json({ received: true, type: event.type, emailSent: false });
      }

      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: { user: smtpUser, pass: smtpPass },
        });

        await transporter.sendMail({
          from: `"Soluqube Billing" <${senderEmail}>`,
          to: `${alertEmail}, nikhillaky@gmail.com`,
          subject: `💰 $499 Paid Audit Package Unlocked: ${metadata.lead_company || "Enterprise"} (${customerEmail})`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #1e293b;">
              <h2 style="color: #059669;">🎉 $499 Audit Tie-Out Package Purchased!</h2>
              <p><strong>Customer:</strong> ${metadata.lead_name || "Lead"} &lt;${customerEmail}&gt;</p>
              <p><strong>Company:</strong> ${metadata.lead_company || "N/A"}</p>
              <p><strong>ERP System:</strong> ${metadata.erp_system || "NetSuite"}</p>
              <p><strong>Contract Scope Value:</strong> $${metadata.contract_value || "100,000"}</p>
              <p><strong>Stripe Session ID:</strong> ${session.id}</p>
              <p>Action: Generate 8-Tab audit-ready workpaper package and deliver within 1 business day.</p>
            </div>
          `,
        });
      } catch (mailErr) {
        console.error("Failed to send audit dispatch alert email:", mailErr);
      }
    }

    return NextResponse.json({ received: true, type: event.type });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Webhook handler failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
