import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
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

    const contactName = fullName || `${first_name || ""} ${last_name || ""}`.trim() || "Finance Executive";
    const enterpriseCompany = company || company_name || "Enterprise Lead";
    const workEmail = (email || "").trim().toLowerCase();
    const title = job_title || "Finance Leader";
    const referenceId = "CONT-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    const timestamp = new Date().toUTCString();

    if (!workEmail) {
      return NextResponse.json({ success: false, error: "Email is required." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "nikhillaky@gmail.com",
        pass: "smvvqvjbpvouwita",
      },
    });

    const internalMailOptions = {
      from: `"Soluqube Inquiries" <nikhillaky@gmail.com>`,
      to: "nikhil@soluqube.com, nikhillaky@gmail.com",
      replyTo: workEmail,
      subject: `📩 Soluqube Contact Inquiry: ${enterpriseCompany} (${contactName})`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background: #0f172a; padding: 20px 24px; color: #ffffff;">
            <div style="font-size: 11px; font-weight: bold; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Soluqube Inquiries</div>
            <h2 style="margin: 0; font-size: 18px; font-weight: 700;">📩 New Contact Form Submission</h2>
          </div>
          <div style="padding: 24px; color: #1e293b; font-size: 14px; line-height: 1.6;">
            <p><strong>Name:</strong> ${contactName} (${title})</p>
            <p><strong>Company:</strong> ${enterpriseCompany} ${company_size ? `(Size: ${company_size})` : ""}</p>
            <p><strong>Email:</strong> <a href="mailto:${workEmail}">${workEmail}</a></p>
            <p><strong>Primary Need:</strong> ${help || services || "General Consultation"}</p>
            ${info ? `<p><strong>Details:</strong> ${info}</p>` : ""}
            <div style="margin-top: 20px; font-size: 11px; color: #94a3b8;">Ref: ${referenceId} • ${timestamp}</div>
          </div>
        </div>
      `,
    };

    const autoresponderMailOptions = {
      from: `"Nikhil Laky | Soluqube" <nikhillaky@gmail.com>`,
      to: workEmail,
      subject: `Thank you for contacting Soluqube (${enterpriseCompany})`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background: #0f172a; padding: 24px; color: #ffffff;">
            <h2 style="margin: 0; font-size: 18px; font-weight: 700;">We received your inquiry</h2>
          </div>
          <div style="padding: 24px; color: #1e293b; font-size: 14px; line-height: 1.6;">
            <p>Dear ${contactName},</p>
            <p>Thank you for reaching out to Soluqube. Our technical accounting team has received your message regarding <strong>${enterpriseCompany}</strong>.</p>
            <p>We will review your requirements and respond within 1 business day.</p>
            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
              <strong>Nikhil Laky</strong><br>
              Founder, Soluqube<br>
              <a href="https://soluqube.com" style="color: #4f46e5;">soluqube.com</a>
            </div>
          </div>
        </div>
      `,
    };

    await Promise.all([
      transporter.sendMail(internalMailOptions),
      transporter.sendMail(autoresponderMailOptions)
    ]);

    return NextResponse.json({ success: true, message: "Inquiry processed successfully." });
  } catch (error: any) {
    console.error("Contact form error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}