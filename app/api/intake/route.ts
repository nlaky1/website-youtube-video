import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { checkRateLimit, clampField, escapeHtml, getClientIp, isValidSingleEmail, stripCrlf } from "@/lib/formSecurity";

export async function POST(req: Request) {
  try {
    // Per-IP limit: 3 requests / 10 min (in-memory, per serverless instance).
    if (!checkRateLimit(`intake:${getClientIp(req)}`)) {
      return NextResponse.json({ success: false, error: "Too many requests. Please try again later." }, { status: 429 });
    }

    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ success: false, error: "Invalid request body." }, { status: 400 });
    }
    if (!body || typeof body !== "object") {
      return NextResponse.json({ success: false, error: "Invalid request body." }, { status: 400 });
    }
    const {
      fullName,
      first_name,
      last_name,
      email,
      company,
      company_name,
      job_title,
      title,
      revrecStack,
      erp_system,
      accountingStandard,
      accounting_standard,
      driftAuditOffer,
      help,
      services,
      info,
      notes
    } = body;

    // Length-capped, CR/LF-free values (used in subject / headers); HTML-escaped copies for email bodies.
    const contactName = stripCrlf(clampField(fullName, 200) || `${clampField(first_name, 100)} ${clampField(last_name, 100)}`.trim() || "Finance Executive");
    const enterpriseCompany = stripCrlf(clampField(company, 200) || clampField(company_name, 200) || "Enterprise Lead");
    const workEmail = clampField(body.workEmail || body.email || body.work_email, 320).toLowerCase();
    const jobTitle = stripCrlf(clampField(job_title, 200) || clampField(title, 200) || "Finance / Accounting Leader");
    const erp = clampField(revrecStack, 200) || clampField(erp_system, 200) || "Oracle NetSuite (ARM)";
    const standard = clampField(accountingStandard, 200) || clampField(accounting_standard, 200) || "Both / Cross-Border (ASC 606 & Ind AS 115)";
    const extraScope = clampField(info, 5000) || clampField(notes, 5000) || `${clampField(help, 500)} ${clampField(services, 500)}`.trim();
    const h = {
      contactName: escapeHtml(contactName),
      enterpriseCompany: escapeHtml(enterpriseCompany),
      jobTitle: escapeHtml(jobTitle),
      erp: escapeHtml(erp),
      standard: escapeHtml(standard),
      extraScope: escapeHtml(extraScope),
    };
    const referenceId = "REF-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    const timestamp = new Date().toUTCString();

    if (!workEmail) {
      return NextResponse.json({ success: false, error: "Corporate work email is required." }, { status: 400 });
    }
    if (!isValidSingleEmail(workEmail)) {
      return NextResponse.json({ success: false, error: "Please provide a single valid work email address." }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 465;
    const smtpUser = process.env.SMTP_USER || "nikhil@soluqube.com";
    const smtpPass = process.env.SMTP_PASS || "";
    const senderEmail = process.env.SOLUQUBE_SENDER_EMAIL || "nikhil@soluqube.com";
    const alertEmail = process.env.FOUNDER_ALERT_EMAIL || "nikhil@soluqube.com";

    // Configure Google Workspace SMTP Transport
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // 1. Internal Notification (To Nikhil at Soluqube)
    const internalMailOptions = {
      from: `"Soluqube" <${senderEmail}>`,
      to: `${alertEmail}, nikhillaky@gmail.com`,
      replyTo: workEmail,
      subject: `🚨 New Audit-Defense Workpaper Request: ${enterpriseCompany} (${jobTitle})`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background: #0f172a; padding: 20px 24px; color: #ffffff;">
            <div style="font-size: 11px; font-weight: bold; color: #10b981; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Soluqube • Workpaper request</div>
            <h2 style="margin: 0; font-size: 18px; font-weight: 700;">🚨 New Audit-Defense Workpaper Request</h2>
          </div>
          
          <div style="padding: 24px; color: #1e293b; font-size: 14px; line-height: 1.6;">
            <p style="margin-top: 0;">A finance leader has initialized an audit verification request on <a href="https://soluqube.com/#audit-intake" style="color: #4f46e5; text-decoration: none; font-weight: 600;">soluqube.com</a>.</p>
            
            <table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 13px;">
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: 600; width: 40%;">Reference ID:</td>
                <td style="padding: 10px 0; font-family: monospace; font-weight: bold; color: #0f172a;">${referenceId}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Full Name & Title:</td>
                <td style="padding: 10px 0; font-weight: 600; color: #0f172a;">${h.contactName} (${h.jobTitle})</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Enterprise Company:</td>
                <td style="padding: 10px 0; font-weight: bold; color: #0f172a;">${h.enterpriseCompany}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Corporate Work Email:</td>
                <td style="padding: 10px 0; font-weight: bold; color: #4f46e5;"><a href="mailto:${workEmail}" style="color: #4f46e5;">${workEmail}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Current ERP / Subledger:</td>
                <td style="padding: 10px 0; color: #0f172a;">${h.erp}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Accounting Standard:</td>
                <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${h.standard}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Free 3-Contract Workpaper:</td>
                <td style="padding: 10px 0; color: #059669; font-weight: bold;">${driftAuditOffer !== false ? "✓ Included at no charge" : "Custom Inquiry"}</td>
              </tr>
              ${extraScope ? `
              <tr>
                <td style="padding: 10px 0; color: #64748b; font-weight: 600; vertical-align: top;">Additional Scope:</td>
                <td style="padding: 10px 0; color: #334155;">${h.extraScope}</td>
              </tr>
              ` : ""}
            </table>

            <div style="margin-top: 24px; padding: 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; text-align: center;">
              <a href="mailto:${workEmail}?subject=Soluqube%20Audit%20Request%20-%20${encodeURIComponent(enterpriseCompany)}&body=Hi%20${encodeURIComponent(contactName.split(' ')[0])},%0A%0AThank%20you%20for%20requesting%20a%20Free%203-Contract%20Audit-Defense%20Workpaper%20for%20${encodeURIComponent(enterpriseCompany)}.%20I%20have%20logged%20your%20request%20under%20reference%20${referenceId}.%0A%0ABest%20regards,%0ANikhil%20Laky%0AFounder,%20Soluqube" style="display: inline-block; background: #0f172a; color: #ffffff; padding: 10px 20px; border-radius: 6px; font-weight: 600; font-size: 13px; text-decoration: none;">
                Reply to Prospect in 1-Click &rarr;
              </a>
            </div>

            <div style="margin-top: 16px; font-size: 11px; color: #94a3b8; text-align: center;">
              Received at: ${timestamp} • Patent Pending (App. No. 202621096305)
            </div>
          </div>
        </div>
      `,
    };

    // 2. Autoresponder (To the Prospect) — plain text with no user-supplied fields,
    // sent only to the single validated address above (security review H4).
    const autoresponderMailOptions = {
      from: `"Nikhil Laky | Soluqube" <${senderEmail}>`,
      to: workEmail,
      replyTo: senderEmail,
      subject: `Soluqube: audit request received (${referenceId})`,
      text: [
        "Hello,",
        "",
        `Thank you for requesting a Free 3-Contract Audit-Defense Workpaper with Soluqube. We have logged your request under reference ${referenceId}.`,
        "",
        "What happens next:",
        "1. I will reply within 1 business day with how to share your contracts (mutual NDA on request).",
        "2. You can stage up to 3 customer MSAs or billing schedules.",
        "3. The integer (BigInt) engine will generate your Audit-Defense Workpaper with clause references for each obligation and reconciliation to the cent.",
        "",
        "If you have urgent audit workpapers or upcoming external audit review deadlines, feel free to reply directly to this email.",
        "",
        "Nikhil Laky",
        "Founder, Soluqube",
        "https://soluqube.com",
      ].join("\n"),
    };

    // Send both emails in parallel
    await Promise.all([
      transporter.sendMail(internalMailOptions),
      transporter.sendMail(autoresponderMailOptions)
    ]);

    return NextResponse.json({
      success: true,
      referenceId,
      message: "Audit request successfully logged. Confirmation email dispatched."
    });
  } catch (error: any) {
    console.error("Audit intake submission error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process intake request" },
      { status: 500 }
    );
  }
}
