import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      businessEmail,
      phoneNumber,
      propertyName,
      propertyType,
      cityLocation,
      parkingSpaces,
      additionalDetails,
    } = body;

    // Validate required fields
    if (!fullName || !businessEmail || !propertyName) {
      return NextResponse.json(
        { error: 'Full Name, Business Email, and Property Name are required.' },
        { status: 400 }
      );
    }

    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'hr@dassgroup.in';

    if (!smtpUser || !smtpPass) {
      console.warn('SMTP credentials (SMTP_USER / SMTP_PASS) not configured in environment variables.');
      return NextResponse.json(
        {
          error:
            'Server email configuration is missing. Please set SMTP_USER and SMTP_PASS in environment variables.',
        },
        { status: 500 }
      );
    }

    const cleanSmtpUser = smtpUser?.trim().replace(/^['"]|['"]$/g, '');
    const cleanSmtpPass = smtpPass?.trim().replace(/^['"]|['"]$/g, '');

    const isSecure = process.env.SMTP_SECURE === 'true' || smtpPort === 465;

    // Configure Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: isSecure,
      auth: {
        user: cleanSmtpUser,
        pass: cleanSmtpPass,
      },
      tls: {
        rejectUnauthorized: false, // Prevents certificate mismatches on custom domain SMTP
      },
    });

    const emailSubject = `New EV Stay Lead: ${propertyName} - ${fullName}`;

    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f8; margin: 0; padding: 20px; color: #333; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
            .header { background: #16a34a; color: #ffffff; padding: 24px; text-align: center; }
            .header h1 { margin: 0; font-size: 22px; font-weight: 600; }
            .header p { margin: 4px 0 0 0; font-size: 14px; opacity: 0.9; }
            .content { padding: 30px; }
            .table-container { width: 100%; border-collapse: collapse; margin-top: 15px; }
            .table-container td { padding: 12px 10px; border-bottom: 1px solid #e5e7eb; font-size: 14px; }
            .table-container td.label { font-weight: 600; color: #4b5563; width: 40%; }
            .table-container td.value { color: #111827; }
            .badge { display: inline-block; padding: 4px 12px; background: #dcfce7; color: #15803d; border-radius: 20px; font-weight: 600; font-size: 12px; }
            .footer { background: #f9fafb; text-align: center; padding: 16px; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>EV Stay Contact Enquiry</h1>
              <p>New Property Partnership Lead Received</p>
            </div>
            <div class="content">
              <p style="font-size: 15px; line-height: 1.5; margin-top: 0;">You have received a new contact form submission on EV Stay.</p>
              
              <table class="table-container">
                <tr>
                  <td class="label">Full Name</td>
                  <td class="value"><strong>${fullName}</strong></td>
                </tr>
                <tr>
                  <td class="label">Business Email</td>
                  <td class="value"><a href="mailto:${businessEmail}" style="color: #16a34a;">${businessEmail}</a></td>
                </tr>
                <tr>
                  <td class="label">Phone Number</td>
                  <td class="value">${phoneNumber || 'Not Provided'}</td>
                </tr>
                <tr>
                  <td class="label">Property Name</td>
                  <td class="value"><strong>${propertyName}</strong></td>
                </tr>
                <tr>
                  <td class="label">Property Type</td>
                  <td class="value"><span class="badge">${propertyType || 'Hotel'}</span></td>
                </tr>
                <tr>
                  <td class="label">City / Location</td>
                  <td class="value">${cityLocation || 'Not Provided'}</td>
                </tr>
                <tr>
                  <td class="label">Parking Spaces</td>
                  <td class="value">${parkingSpaces || 'Not Specified'}</td>
                </tr>
                <tr>
                  <td class="label">Additional Details</td>
                  <td class="value">${additionalDetails || 'None'}</td>
                </tr>
              </table>
            </div>
            <div class="footer">
              <p>This message was automatically sent by EV Stay, Please do not reply to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const mailOptions = {
      from: `"EV Stay Website" <${cleanSmtpUser}>`,
      to: receiverEmail,
      replyTo: businessEmail,
      subject: emailSubject,
      html: htmlTemplate,
      text: `
New Contact Enquiry from EV Stay:
----------------------------------
Full Name: ${fullName}
Business Email: ${businessEmail}
Phone Number: ${phoneNumber || 'N/A'}
Property Name: ${propertyName}
Property Type: ${propertyType || 'N/A'}
City/Location: ${cityLocation || 'N/A'}
Parking Spaces: ${parkingSpaces || 'N/A'}
Additional Details: ${additionalDetails || 'N/A'}
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: 'Enquiry submitted successfully! We will get back to you soon.',
    });
  } catch (error: any) {
    console.error('Nodemailer Error:', error);
    return NextResponse.json(
      {
        error:
          error?.message ||
          'Failed to send email. Please check server SMTP configuration.',
      },
      { status: 500 }
    );
  }
}
