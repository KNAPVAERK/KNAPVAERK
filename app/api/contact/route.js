import { Resend } from 'resend'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, subject, message } = body

    // Basic validation
    if (!email || !subject || !message) {
      return NextResponse.json(
        { error: 'Alle felter skal udfyldes' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Ugyldig email adresse' },
        { status: 400 }
      )
    }

    // Initialize Resend at runtime
    const resend = new Resend(process.env.RESEND_API_KEY)

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'KNAPVÆRK Kontaktformular <onboarding@resend.dev>', // Resend's test email
      to: ['bjerre@knapvaerk.com'], // Resend verified email
      replyTo: email, // User's email for easy reply
      subject: `Ny besked: ${subject}`,
      text: `
Fra: ${email}
Emne: ${subject}

Besked:
${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a; border-bottom: 2px solid #1a1a1a; padding-bottom: 10px;">
            Ny besked fra kontaktformular
          </h2>

          <div style="margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Fra:</strong> ${email}</p>
            <p style="margin: 5px 0;"><strong>Emne:</strong> ${subject}</p>
          </div>

          <div style="background: #f5f5f5; padding: 20px; border-radius: 4px; margin-top: 20px;">
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `
    })

    return NextResponse.json({ success: true, id: data.id }, { status: 200 })

  } catch (error) {
    console.error('Email send error:', error)
    return NextResponse.json(
      { error: 'Der opstod en fejl. Prøv igen senere.' },
      { status: 500 }
    )
  }
}
