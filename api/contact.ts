import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, service } = req.body;

  // Validate required fields
  if (!name || !email || !service) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Send email using Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'CleanVent NYC <onboarding@resend.dev>',
        to: ['info@upsidedown.solutions'],
        reply_to: email,
        subject: 'New Lead from CleanVent NYC Website',
        html: `
          <h2>New Lead from CleanVent NYC Website</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Service:</strong> ${service}</p>
          <hr>
          <p style="color: #666; font-size: 12px;">Please respond within 2 hours.</p>
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Resend error:', errorData);
      return res.status(response.status).json({ error: 'Failed to send email', details: errorData });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
