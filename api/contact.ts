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
    // Send email using MailerSend API
    const response = await fetch('https://api.mailersend.com/v1/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MAILERSEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: {
          email: 'noreply@cleanventnyc.com',
          name: 'CleanVent NYC Website',
        },
        to: [
          { email: 'yadgaro@gmail.com', name: 'Omri' },
          { email: 'Shiraleonardshailin@gmail.com', name: 'Shira' },
          { email: 'Oriannyc@gmail.com', name: 'Orian' },
          { email: 'cleanventprofessional@gmail.com', name: 'CleanVent Professional' },
        ],
        subject: 'New Lead from CleanVent NYC Website',
        text: `New lead received:

Name: ${name}
Email: ${email}
Service: ${service}

Please respond within 2 hours.`,
        html: `<h2>New Lead from CleanVent NYC Website</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Service:</strong> ${service}</p>
<hr>
<p style="color: #666; font-size: 12px;">Please respond within 2 hours.</p>`,
        reply_to: {
          email: email,
          name: name,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('MailerSend error:', errorData);
      return res.status(response.status).json({
        error: 'MailerSend API error',
        details: errorData,
        message: 'You may need to verify your domain in MailerSend dashboard'
      });
    }

    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({
      error: 'Failed to send email',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
