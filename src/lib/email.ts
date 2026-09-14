// src/lib/email.ts
import nodemailer from 'nodemailer';

export interface CustomerSignupDetails {
  name: string;
  email: string;
  institution?: string;
  role?: string;
  timestamp?: Date | string;
}

export interface EmailDispatchResult {
  success: boolean;
  delivered: boolean;
  error?: string;
  reason?: string;
}

/**
 * Creates and returns a nodemailer transporter if SMTP credentials are provided.
 */
function getTransporter(): nodemailer.Transporter | null {
  const user = process.env.GMAIL_USER || process.env.SMTP_USER;
  const pass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: user.trim(),
      pass: pass.trim(),
    },
  });
}

/**
 * Sends an email notification to the administrator (info.pharmavive@gmail.com)
 * with the full profile details of a newly registered customer.
 */
export async function sendNewCustomerNotification(
  customer: CustomerSignupDetails
): Promise<EmailDispatchResult> {
  const recipient = process.env.ADMIN_NOTIFICATION_EMAIL || 'info.pharmavive@gmail.com';
  const senderUser = process.env.GMAIL_USER || process.env.SMTP_USER || 'info.pharmavive@gmail.com';

  const formattedDate = new Date(customer.timestamp || Date.now()).toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'medium',
    timeZone: 'UTC',
  }) + ' (UTC)';

  const customerName = customer.name || 'New Customer';
  const customerEmail = customer.email;
  const organization = customer.institution?.trim() || 'Not specified';
  const professionalRole = customer.role?.trim() || 'Not specified';

  // Plain-text fallback for email clients that do not render HTML
  const textContent = `
NEW CUSTOMER REGISTRATION - PHARMAVIVE
======================================

A new customer has just created an account on the Pharmavive scientific portal.

Customer Details:
-----------------
• Full Name:           ${customerName}
• Work Email:          ${customerEmail}
• Organization:        ${organization}
• Professional Role:   ${professionalRole}
• Registration Date:   ${formattedDate}

Direct Reply:
mailto:${customerEmail}

--
Pharmavive Chemical Operations & Customer Intelligence
https://pharmavive.com
`.trim();

  // Polished HTML email template
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Customer Registration</title>
</head>
<body style="margin:0;padding:0;background-color:#F2FBF8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1E293B;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F2FBF8;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background-color:#FFFFFF;border-radius:20px;border:1px solid #E2E8F0;box-shadow:0 10px 25px -5px rgba(14,35,88,0.06);overflow:hidden;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background:linear-gradient(135deg,#0E2358 0%,#0B3B3C 100%);padding:32px 32px 28px 32px;text-align:left;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <span style="display:inline-block;padding:4px 12px;background-color:rgba(0,163,137,0.2);border:1px solid rgba(0,163,137,0.4);border-radius:9999px;color:#00A389;font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;margin-bottom:12px;">
                      ✦ New Customer Registration
                    </span>
                    <h1 style="margin:0;color:#FFFFFF;font-size:24px;font-weight:800;letter-spacing:-0.02em;">
                      Pharmavive Account Created
                    </h1>
                    <p style="margin:6px 0 0 0;color:#94A3B8;font-size:13px;">
                      A new researcher or procurement specialist has registered on the portal.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Customer Data Card -->
          <tr>
            <td style="padding:32px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F8FCFB;border:1px solid #E2F7F4;border-radius:14px;padding:20px;margin-bottom:24px;">
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #E2F0ED;">
                    <span style="font-size:11px;font-weight:700;color:#64748B;text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:2px;">Full Name</span>
                    <span style="font-size:15px;font-weight:700;color:#0E2358;">${customerName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #E2F0ED;">
                    <span style="font-size:11px;font-weight:700;color:#64748B;text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:2px;">Email Address</span>
                    <a href="mailto:${customerEmail}" style="font-size:14px;font-weight:600;color:#00A389;text-decoration:none;">${customerEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #E2F0ED;">
                    <span style="font-size:11px;font-weight:700;color:#64748B;text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:2px;">Organization / Company</span>
                    <span style="font-size:14px;font-weight:600;color:#1E293B;">${organization}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #E2F0ED;">
                    <span style="font-size:11px;font-weight:700;color:#64748B;text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:2px;">Professional Role</span>
                    <span style="font-size:14px;font-weight:600;color:#1E293B;">${professionalRole}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0 2px 0;">
                    <span style="font-size:11px;font-weight:700;color:#64748B;text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:2px;">Registration Timestamp</span>
                    <span style="font-size:13px;color:#475569;font-family:monospace;">${formattedDate}</span>
                  </td>
                </tr>
              </table>

              <!-- Action Button -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:8px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${customerEmail}?subject=${encodeURIComponent('Welcome to Pharmavive - Precision Chemical Synthesis & Reference Standards')}" style="display:inline-block;padding:12px 28px;background:linear-gradient(135deg,#0E2358 0%,#0B3B3C 100%);color:#FFFFFF;text-decoration:none;font-size:13px;font-weight:700;border-radius:12px;box-shadow:0 4px 12px rgba(14,35,88,0.15);">
                      ✉️ Reply Directly to Customer
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#F8FAFC;padding:20px 32px;border-top:1px solid #E2E8F0;text-align:center;">
              <p style="margin:0 0 4px 0;font-size:11px;color:#94A3B8;">
                This automated notification was dispatched to <strong>${recipient}</strong> upon customer signup.
              </p>
              <p style="margin:0;font-size:11px;color:#94A3B8;">
                © ${new Date().getFullYear()} Pharmavive Chemical Operations. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();

  try {
    const transporter = getTransporter();

    if (!transporter) {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📬 [EMAIL DISPATCH NOTICE] New Customer Registration Alert:');
      console.log(`• Name:         ${customerName}`);
      console.log(`• Email:        ${customerEmail}`);
      console.log(`• Institution:  ${organization}`);
      console.log(`• Role:         ${professionalRole}`);
      console.log(`• Time:         ${formattedDate}`);
      console.log(`• Intended To:  ${recipient}`);
      console.log('------------------------------------------------------------');
      console.log('[Notice] Live SMTP email sending is pending configuration of');
      console.log('GMAIL_APP_PASSWORD in .env.local. Once set, emails will automatically');
      console.log(`be sent to ${recipient} via smtp.gmail.com.`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      return {
        success: true,
        delivered: false,
        reason: 'SMTP credentials (GMAIL_APP_PASSWORD) not configured in environment',
      };
    }

    const info = await transporter.sendMail({
      from: `"Pharmavive Portal" <${senderUser}>`,
      to: recipient,
      replyTo: customerEmail,
      subject: `[New Customer] ${customerName} registered on Pharmavive`,
      text: textContent,
      html: htmlContent,
    });

    console.log(`[Email Service] Successfully delivered new customer alert for ${customerEmail} to ${recipient}. MessageId: ${info.messageId}`);
    return {
      success: true,
      delivered: true,
    };
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`[Email Service] Failed to deliver customer alert to ${recipient}:`, errorMsg);
    // Non-blocking: returns error status without crashing customer signup
    return {
      success: false,
      delivered: false,
      error: errorMsg,
    };
  }
}

export interface EnquiryCompoundItem {
  name: string;
  catNumber?: string;
  casNumber?: string;
  quantity?: number | string;
  packSize?: string;
  purity?: string;
  notes?: string;
}

export interface ContactEnquiryDetails {
  name?: string;
  email: string;
  organization?: string;
  phone?: string;
  country?: string;
  message?: string;
  type?: 'contact' | 'rfq_cart' | 'service_rfq' | string;
  items?: EnquiryCompoundItem[];
  timestamp?: Date | string;
}

/**
 * Sends an email notification to info.pharmavive@gmail.com with
 * the details of a contact form inquiry, custom synthesis request, or RFQ cart submission.
 */
export async function sendContactEnquiryNotification(
  enquiry: ContactEnquiryDetails
): Promise<EmailDispatchResult> {
  const recipient = process.env.ADMIN_NOTIFICATION_EMAIL || 'info.pharmavive@gmail.com';
  const senderUser = process.env.GMAIL_USER || process.env.SMTP_USER || 'info.pharmavive@gmail.com';

  const formattedDate = new Date(enquiry.timestamp || Date.now()).toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'medium',
    timeZone: 'UTC',
  }) + ' (UTC)';

  const clientName = enquiry.name?.trim() || 'Client (Not specified)';
  const clientEmail = enquiry.email.trim();
  const organization = enquiry.organization?.trim() || 'Not specified';
  const phone = enquiry.phone?.trim() || 'Not provided';
  const country = enquiry.country?.trim() || 'Not provided';
  const message = enquiry.message?.trim() || 'No additional message provided.';
  const type = enquiry.type || 'contact';
  const items = enquiry.items || [];

  let subjectType = 'Technical Inquiry';
  let badgeLabel = '✦ Technical Inquiry';
  if (type === 'rfq_cart') {
    subjectType = `Quotation Request (${items.length} Compounds)`;
    badgeLabel = '✦ Chemical RFQ & Dossier';
  } else if (type === 'service_rfq') {
    subjectType = 'Custom Synthesis / Service RFQ';
    badgeLabel = '✦ Custom Synthesis Inquiry';
  }

  const emailSubject = `[${subjectType}] from ${organization !== 'Not specified' ? organization : clientName}`;

  // Plain-text fallback
  let textContent = `
PHARMAVIVE TECHNICAL INQUIRY & RFQ
==================================

A new technical enquiry has been submitted on the Pharmavive website.

Client Profile:
---------------
• Full Name:      ${clientName}
• Organization:   ${organization}
• Email:          ${clientEmail}
• Phone:          ${phone}
• Country:        ${country}
• Date:           ${formattedDate}
• Inquiry Type:   ${type}
`;

  if (items.length > 0) {
    textContent += `\nRequested Compounds (${items.length}):\n--------------------------\n`;
    items.forEach((item, idx) => {
      textContent += `${idx + 1}. ${item.name}\n`;
      if (item.catNumber) textContent += `   Cat No: ${item.catNumber}\n`;
      if (item.casNumber) textContent += `   CAS: ${item.casNumber}\n`;
      if (item.quantity && item.packSize) textContent += `   Quantity: ${item.quantity} x ${item.packSize}\n`;
      if (item.purity) textContent += `   Purity: ${item.purity}\n`;
      if (item.notes) textContent += `   Special Requirement: ${item.notes}\n`;
      textContent += `\n`;
    });
  }

  textContent += `\nProject Specifications & Requirements:\n------------------------------------\n${message}\n\n`;
  textContent += `Direct Reply: mailto:${clientEmail}\n--\nPharmavive Scientific Operations\nhttps://pharmavive.com`;

  // HTML items table
  let itemsHtml = '';
  if (items.length > 0) {
    itemsHtml = `
      <div style="margin-top:24px;margin-bottom:24px;">
        <span style="font-size:12px;font-weight:800;color:#0E2358;text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:12px;">
          Requested Chemical Compounds (${items.length})
        </span>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;background-color:#FFFFFF;border:1px solid #E2E8F0;border-radius:12px;overflow:hidden;font-size:12px;">
          <thead>
            <tr style="background-color:#F1F5F9;text-align:left;color:#475569;font-weight:700;">
              <th style="padding:10px 12px;border-bottom:1px solid #E2E8F0;">#</th>
              <th style="padding:10px 12px;border-bottom:1px solid #E2E8F0;">Compound Name</th>
              <th style="padding:10px 12px;border-bottom:1px solid #E2E8F0;">Cat No / CAS</th>
              <th style="padding:10px 12px;border-bottom:1px solid #E2E8F0;">Quantity</th>
              <th style="padding:10px 12px;border-bottom:1px solid #E2E8F0;">Purity</th>
            </tr>
          </thead>
          <tbody>
            ${items
              .map(
                (item, idx) => `
              <tr style="border-bottom:1px solid #F1F5F9;">
                <td style="padding:10px 12px;color:#94A3B8;font-weight:bold;">${idx + 1}</td>
                <td style="padding:10px 12px;font-weight:700;color:#0E2358;">
                  ${item.name}
                  ${item.notes ? `<div style="font-size:11px;color:#00A389;font-weight:normal;margin-top:3px;">Note: ${item.notes}</div>` : ''}
                </td>
                <td style="padding:10px 12px;font-family:monospace;color:#475569;">
                  <div>${item.catNumber || '—'}</div>
                  <div style="color:#94A3B8;font-size:11px;">CAS: ${item.casNumber || '—'}</div>
                </td>
                <td style="padding:10px 12px;color:#1E293B;font-weight:600;">
                  ${item.quantity ? `${item.quantity} × ${item.packSize || 'Unit'}` : item.packSize || '1 Unit'}
                </td>
                <td style="padding:10px 12px;color:#00A389;font-weight:600;">
                  ${item.purity || 'Standard'}
                </td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  // HTML Email Template
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${emailSubject}</title>
</head>
<body style="margin:0;padding:0;background-color:#F2FBF8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1E293B;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F2FBF8;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="620" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;background-color:#FFFFFF;border-radius:20px;border:1px solid #E2E8F0;box-shadow:0 10px 25px -5px rgba(14,35,88,0.06);overflow:hidden;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background:linear-gradient(135deg,#0E2358 0%,#0B3B3C 100%);padding:32px 32px 28px 32px;text-align:left;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <span style="display:inline-block;padding:4px 12px;background-color:rgba(0,163,137,0.2);border:1px solid rgba(0,163,137,0.4);border-radius:9999px;color:#00A389;font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;margin-bottom:12px;">
                      ${badgeLabel}
                    </span>
                    <h1 style="margin:0;color:#FFFFFF;font-size:24px;font-weight:800;letter-spacing:-0.02em;">
                      ${subjectType}
                    </h1>
                    <p style="margin:6px 0 0 0;color:#94A3B8;font-size:13px;">
                      Received from ${organization !== 'Not specified' ? organization : clientName} via Pharmavive Website.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Client Profile & Details -->
          <tr>
            <td style="padding:32px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F8FCFB;border:1px solid #E2F7F4;border-radius:14px;padding:20px;margin-bottom:24px;">
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #E2F0ED;">
                    <span style="font-size:11px;font-weight:700;color:#64748B;text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:2px;">Client Full Name</span>
                    <span style="font-size:15px;font-weight:700;color:#0E2358;">${clientName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #E2F0ED;">
                    <span style="font-size:11px;font-weight:700;color:#64748B;text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:2px;">Organization / Company</span>
                    <span style="font-size:14px;font-weight:600;color:#1E293B;">${organization}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #E2F0ED;">
                    <span style="font-size:11px;font-weight:700;color:#64748B;text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:2px;">Contact Email</span>
                    <a href="mailto:${clientEmail}" style="font-size:14px;font-weight:600;color:#00A389;text-decoration:none;">${clientEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #E2F0ED;">
                    <span style="font-size:11px;font-weight:700;color:#64748B;text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:2px;">Phone &amp; Location</span>
                    <span style="font-size:14px;color:#1E293B;">${phone} • ${country}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0 2px 0;">
                    <span style="font-size:11px;font-weight:700;color:#64748B;text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:2px;">Submission Timestamp</span>
                    <span style="font-size:13px;color:#475569;font-family:monospace;">${formattedDate}</span>
                  </td>
                </tr>
              </table>

              ${itemsHtml}

              <!-- Inquiry Message / Specifications -->
              <div style="margin-bottom:28px;">
                <span style="font-size:12px;font-weight:800;color:#0E2358;text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:8px;">
                  Project Specifications &amp; Requirements:
                </span>
                <div style="background-color:#F8FAFC;border-left:4px solid #00A389;border-radius:4px;padding:16px;font-size:13px;color:#334155;line-height:1.6;white-space:pre-wrap;">
${message}
                </div>
              </div>

              <!-- Quick Reply Action Button -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <a href="mailto:${clientEmail}?subject=${encodeURIComponent(`Re: ${emailSubject}`)}" style="display:inline-block;padding:13px 32px;background:linear-gradient(135deg,#0E2358 0%,#0B3B3C 100%);color:#FFFFFF;text-decoration:none;font-size:13px;font-weight:700;border-radius:12px;box-shadow:0 4px 12px rgba(14,35,88,0.15);">
                      ✉️ Reply Directly to Client (${clientEmail})
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#F8FAFC;padding:20px 32px;border-top:1px solid #E2E8F0;text-align:center;">
              <p style="margin:0 0 4px 0;font-size:11px;color:#94A3B8;">
                Dispatched to <strong>${recipient}</strong> from Pharmavive Web Consultation Gateway.
              </p>
              <p style="margin:0;font-size:11px;color:#94A3B8;">
                © ${new Date().getFullYear()} Pharmavive Precision Chemical Synthesis &amp; Standards.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();

  try {
    const transporter = getTransporter();

    if (!transporter) {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📬 [EMAIL DISPATCH NOTICE] New Contact / RFQ Enquiry Alert:');
      console.log(`• Type:         ${type}`);
      console.log(`• Client:       ${clientName}`);
      console.log(`• Email:        ${clientEmail}`);
      console.log(`• Organization: ${organization}`);
      console.log(`• Phone:        ${phone}`);
      console.log(`• Country:      ${country}`);
      console.log(`• Compounds:    ${items.length} items`);
      console.log(`• Message:      ${message.substring(0, 100)}${message.length > 100 ? '...' : ''}`);
      console.log(`• Intended To:  ${recipient}`);
      console.log('------------------------------------------------------------');
      console.log('[Notice] Live SMTP email sending is pending configuration of');
      console.log('GMAIL_APP_PASSWORD in .env.local. Once set, emails will automatically');
      console.log(`be sent to ${recipient} via smtp.gmail.com.`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      return {
        success: true,
        delivered: false,
        reason: 'SMTP credentials (GMAIL_APP_PASSWORD) not configured in environment',
      };
    }

    const info = await transporter.sendMail({
      from: `"Pharmavive Inquiries" <${senderUser}>`,
      to: recipient,
      replyTo: clientEmail,
      subject: emailSubject,
      text: textContent,
      html: htmlContent,
    });

    console.log(`[Email Service] Successfully delivered enquiry from ${clientEmail} to ${recipient}. MessageId: ${info.messageId}`);
    return {
      success: true,
      delivered: true,
    };
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`[Email Service] Failed to deliver enquiry to ${recipient}:`, errorMsg);
    return {
      success: false,
      delivered: false,
      error: errorMsg,
    };
  }
}

