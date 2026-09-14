// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { sendContactEnquiryNotification } from '../../../lib/email';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, organization, company, phone, country, message, requirements, type, items } = body || {};

    // Validate email
    const clientEmail = email ? String(email).trim().toLowerCase() : '';
    if (!clientEmail || !clientEmail.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    const clientName = name ? String(name).trim() : '';
    const clientOrg = organization ? String(organization).trim() : (company ? String(company).trim() : '');
    const clientPhone = phone ? String(phone).trim() : '';
    const clientCountry = country ? String(country).trim() : '';
    const clientMessage = message ? String(message).trim() : (requirements ? String(requirements).trim() : '');
    const enquiryType = type ? String(type).trim() : 'contact';
    const compoundItems = Array.isArray(items) ? items : [];

    // Dispatch email notification to info.pharmavive@gmail.com
    // Non-blocking catch to ensure response is returned quickly
    sendContactEnquiryNotification({
      name: clientName,
      email: clientEmail,
      organization: clientOrg,
      phone: clientPhone,
      country: clientCountry,
      message: clientMessage,
      type: enquiryType,
      items: compoundItems,
      timestamp: new Date(),
    }).catch((emailErr) => {
      console.error('[Contact API] Failed to dispatch contact notification email:', emailErr);
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Your inquiry has been received. Our scientific desk will respond with feasibility and quotation within 2-4 business hours.',
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Internal server error.';
    console.error('[Contact API] Error processing inquiry:', errorMsg);
    return NextResponse.json(
      { success: false, error: errorMsg },
      { status: 500 }
    );
  }
}
