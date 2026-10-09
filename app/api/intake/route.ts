import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
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

    const contactName = fullName || `${first_name || ""} ${last_name || ""}`.trim() || "Finance Executive";
    const enterpriseCompany = company || company_name || "Enterprise Lead";
    const workEmail = (body.workEmail || body.email || body.work_email || "").trim().toLowerCase();
    const jobTitle = job_title || title || "Finance / Accounting Leader";
    const erp = revrecStack || erp_system || "Oracle NetSuite (ARM)";
    const standard = accountingStandard || accounting_standard || "Both / Cross-Border (ASC 606 & Ind AS 115)";
    const referenceId = "REF-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    const timestamp = new Date().toUTCString();

    if (!workEmail) {
      return NextResponse.json({ success: false, error: "Corporate work email is required." }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 465;
    const smtpUser = process.env.SMTP_USER || "nikhil@soluqube.com";
    const smtpPass = process.env.SMTP_PASS || "vpcqiicernrapfhv";
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
      from: `"Soluqube Audit Enclave" <${senderEmail}>`,
      to: `${alertEmail}, nikhillaky@gmail.com`,
      replyTo: workEmail,
      subject: `🚨 New Historical Drift Audit Request: ${enterpriseCompany} (${jobTitle})`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background: #0f172a; padding: 20px 24px; color: #ffffff;">
            <div style="font-size: 11px; font-weight: bold; color: #10b981; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Soluqube Deterministic Engine • Executive Intake</div>
            <h2 style="margin: 0; font-size: 18px; font-weight: 700;">🚨 New Historical Drift Audit Ingest Request</h2>
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
                <td style="padding: 10px 0; font-weight: 600; color: #0f172a;">${contactName} (${jobTitle})</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Enterprise Company:</td>
                <td style="padding: 10px 0; font-weight: bold; color: #0f172a;">${enterpriseCompany}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Corporate Work Email:</td>
                <td style="padding: 10px 0; font-weight: bold; color: #4f46e5;"><a href="mailto:${workEmail}" style="color: #4f46e5;">${workEmail}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Current ERP / Subledger:</td>
                <td style="padding: 10px 0; color: #0f172a;">${erp}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Accounting Standard:</td>
                <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${standard}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: 600;">3-Contract Drift Audit:</td>
                <td style="padding: 10px 0; color: #059669; font-weight: bold;">${driftAuditOffer !== false ? "✓ Included ($4,500 value waived)" : "Custom Inquiry"}</td>
              </tr>
              ${info || notes || help || services ? `
              <tr>
                <td style="padding: 10px 0; color: #64748b; font-weight: 600; vertical-align: top;">Additional Scope:</td>
                <td style="padding: 10px 0; color: #334155;">${info || notes || `${help || ""} ${services || ""}`.trim()}</td>
              </tr>
              ` : ""}
            </table>

            <div style="margin-top: 24px; padding: 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; text-align: center;">
              <a href="mailto:${workEmail}?subject=Soluqube%20Audit%20Vault%20Initialization%20-%20${encodeURIComponent(enterpriseCompany)}&body=Hi%20${encodeURIComponent(contactName.split(' ')[0])},%0A%0AThank%20you%20for%20requesting%20a%20historical%20drift%20audit%20for%20${encodeURIComponent(enterpriseCompany)}.%20I%20have%20initialized%20your%20secure%20enclave%20reference%20${referenceId}.%0A%0ABest%20regards,%0ANikhil%20Laky%0AFounder,%20Soluqube" style="display: inline-block; background: #0f172a; color: #ffffff; padding: 10px 20px; border-radius: 6px; font-weight: 600; font-size: 13px; text-decoration: none;">
                Reply to Prospect in 1-Click &rarr;
              </a>
            </div>

            <div style="margin-top: 16px; font-size: 11px; color: #94a3b8; text-align: center;">
              Received at: ${timestamp} • Patent Priority #202621096305
            </div>
          </div>
        </div>
      `,
    };

    // 2. Autoresponder (To the Prospect)
    const autoresponderMailOptions = {
      from: `"Nikhil Laky | Soluqube" <${senderEmail}>`,
      to: workEmail,
      replyTo: senderEmail,
      subject: `Deterministic Audit Initialization: Soluqube Engine Tie-Out Prep (${enterpriseCompany})`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background: #0f172a; padding: 24px; color: #ffffff;">
            <div style="font-size: 11px; font-weight: bold; color: #10b981; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">Soluqube Deterministic Verification Engine</div>
            <h2 style="margin: 0; font-size: 20px; font-weight: 700;">Audit Request Confirmed</h2>
          </div>
          
          <div style="padding: 24px; color: #1e293b; font-size: 14px; line-height: 1.6;">
            <p>Dear ${contactName},</p>
            
            <p>Thank you for initializing your <strong>Complimentary 3-Contract Historical Drift Audit</strong> with Soluqube. We have logged your request under reference <strong>${referenceId}</strong>.</p>
            
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 20px 0;">
              <h4 style="margin: 0 0 10px 0; font-size: 13px; color: #0f172a; text-transform: uppercase; letter-spacing: 0.05em;">Engagement Parameters Confirmed:</h4>
              <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #334155; space-y: 4px;">
                <li><strong>Enterprise Entity:</strong> ${enterpriseCompany}</li>
                <li><strong>Target Standard:</strong> ${standard}</li>
                <li><strong>General Ledger Subledger:</strong> ${erp}</li>
                <li><strong>Confidentiality:</strong> Protected under strict Mutual NDA & Zero-Retention Memory Enclave</li>
              </ul>
            </div>

            <h3 style="font-size: 15px; font-weight: 700; color: #0f172a; margin-top: 24px;">What Happens Next:</h3>
            <ol style="padding-left: 20px; font-size: 13px; color: #475569; line-height: 1.7;">
              <li>Our technical accounting team will provision your transient upload vault within <strong>1 business day</strong>.</li>
              <li>You can stage up to 3 customer MSAs or billing schedules.</li>
              <li>Our 128-bit fixed-point DAG will generate your comprehensive <strong>Historical Drift & PCAOB AS 3101 Tie-Out Workpaper</strong> with spatial PDF bounding boxes and $0.00 cent reconciliation.</li>
            </ol>

            <p style="margin-top: 24px; font-size: 13px; color: #475569;">
              If you have urgent audit workpapers or upcoming Big 4 quarterly review deadlines, feel free to reply directly to this email.
            </p>

            <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
              <strong>Nikhil Laky</strong><br>
              Founder & Chief Architect, Soluqube<br>
              <a href="https://soluqube.com" style="color: #4f46e5; text-decoration: none;">soluqube.com</a> • Dual ASC 606 & Ind AS 115 Compliance
            </div>
          </div>
        </div>
      `,
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
      { success: false, error: error.message || "Failed to process intake request" },
      { status: 500 }
    );
  }
}
