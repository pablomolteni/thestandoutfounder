import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Send notification to Paula
    await resend.emails.send({
      from: 'The Standout Founder <noreply@thestandoutfounder.com>',
      to: 'paula@thestandoutfounder.com',
      reply_to: email,
      subject: `New contact from ${name}`,
      html: `
        <h2>New message from thestandoutfounder.com</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
