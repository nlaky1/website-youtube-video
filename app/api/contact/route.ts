import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { checkRateLimit, clampField, escapeHtml, getClientIp, isValidSingleEmail, stripCrlf } from "@/lib/formSecurity";

export async function POST(req: Request) {
  try {
    // Per-IP limit: 3 requests / 10 min (in-memory, per serverless instance).
    if (!checkRateLimit(`contact:${getClientIp(req)}`)) {
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
      first_name,
      last_name,
      fullName,
      email,
      company_name,
      company,
      job_title,
      help,
      services,
      company_size,
      info
    } = body;

    // Length-capped, CR/LF-free values (used in subject / headers); HTML-escaped copies for email bodies.
    const contactName = stripCrlf(clampField(fullName, 200) || `${clampField(first_name, 100)} ${clampField(last_name, 100)}`.trim() || "Finance Executive");
    const enterpriseCompany = stripCrlf(clampField(company, 200) || clampField(company_name, 200) || "Enterprise Lead");
    const workEmail = clampField(email, 320).toLowerCase();
    const title = clampField(job_title, 200) || "Finance Leader";
    const companySize = clampField(company_size, 100);
    const primaryNeed = clampField(help, 500) || clampField(services, 500) || "General Consultation";
    const details = clampField(info, 5000);
    const h = {
      contactName: escapeHtml(contactName),
      enterpriseCompany: escapeHtml(enterpriseCompany),
      title: escapeHtml(title),
      companySize: escapeHtml(companySize),
      primaryNeed: escapeHtml(primaryNeed),
      details: escapeHtml(details),
    };
    const referenceId = "CONT-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    const timestamp = new Date().toUTCString();

    if (!workEmail) {
      return NextResponse.json({ success: false, error: "Email is required." }, { status: 400 });
    }
    if (!isValidSingleEmail(workEmail)) {
      return NextResponse.json({ success: false, error: "Please provide a single valid email address." }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 465;
    const smtpUser = process.env.SMTP_USER || "nikhil@soluqube.com";
    const smtpPass = process.env.SMTP_PASS || "";
    const senderEmail = process.env.SOLUQUBE_SENDER_EMAIL || "nikhil@soluqube.com";
    const alertEmail = process.env.FOUNDER_ALERT_EMAIL || "nikhil@soluqube.com";

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const internalMailOptions = {
      from: `"Soluqube Inquiries" <${senderEmail}>`,
      to: `${alertEmail}, nikhillaky@gmail.com`,
      replyTo: workEmail,
      subject: `📩 Soluqube Contact Inquiry: ${enterpriseCompany} (${contactName})`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background: #0f172a; padding: 20px 24px; color: #ffffff;">
            <div style="font-size: 11px; font-weight: bold; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Soluqube Inquiries</div>
            <h2 style="margin: 0; font-size: 18px; font-weight: 700;">📩 New Contact Form Submission</h2>
          </div>
          <div style="padding: 24px; color: #1e293b; font-size: 14px; line-height: 1.6;">
            <p><strong>Name:</strong> ${h.contactName} (${h.title})</p>
            <p><strong>Company:</strong> ${h.enterpriseCompany} ${companySize ? `(Size: ${h.companySize})` : ""}</p>
            <p><strong>Email:</strong> <a href="mailto:${workEmail}">${workEmail}</a></p>
            <p><strong>Primary Need:</strong> ${h.primaryNeed}</p>
            ${details ? `<p><strong>Details:</strong> ${h.details}</p>` : ""}
            <div style="margin-top: 20px; font-size: 11px; color: #94a3b8;">Ref: ${referenceId} • ${timestamp}</div>
          </div>
        </div>
      `,
    };

    // Autoresponder — plain text with no user-supplied fields, sent only to the
    // single validated address above (security review H4).
    const autoresponderMailOptions = {
      from: `"Nikhil Laky | Soluqube" <${senderEmail}>`,
      to: workEmail,
      replyTo: senderEmail,
      subject: "Thank you for contacting Soluqube",
      text: [
        "Hello,",
        "",
        "Thank you for reaching out to Soluqube. Our technical accounting team has received your message.",
        "",
        "We will review your requirements and respond within 1 business day.",
        "",
        "Nikhil Laky",
        "Founder, Soluqube",
        "https://soluqube.com",
      ].join("\n"),
    };

    await Promise.all([
      transporter.sendMail(internalMailOptions),
      transporter.sendMail(autoresponderMailOptions)
    ]);

    return NextResponse.json({ success: true, message: "Inquiry processed successfully." });
  } catch (error: any) {
    console.error("Contact form error:", error);
    return NextResponse.json({ success: false, error: "Failed to process inquiry" }, { status: 500 });
  }
}