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
    // Recipients list
    const recipients = [
      { email: 'yadgaro@gmail.com', name: 'Omri' },
      { email: 'Shiraleonardshailin@gmail.com', name: 'Shira' },
      { email: 'Oriannyc@gmail.com', name: 'Orian' },
      { email: 'cleanventprofessional@gmail.com', name: 'CleanVent Professional' },
    ];

    // Email content
    const emailContent = {
      from: {
        email: 'noreply@cleanventnyc.com',
        name: 'CleanVent NYC Website',
      },
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
    };

    // Send separate email to each recipient (MailerSend trial allows 1 recipient per email)
    const emailPromises = recipients.map(recipient =>
      fetch('https://api.mailersend.com/v1/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.MAILERSEND_API_KEY}`,
        },
        body: JSON.stringify({
          ...emailContent,
          to: [recipient], // Only 1 recipient per email
        }),
      })
    );

    // Wait for all emails to send
    const responses = await Promise.all(emailPromises);

    // Check if any failed
    const failedResponses = responses.filter(r => !r.ok);
    if (failedResponses.length > 0) {
      const errorData = await failedResponses[0].json();
      console.error('MailerSend error:', errorData);
      return res.status(failedResponses[0].status).json({
        error: 'MailerSend API error',
        details: errorData,
        message: 'Failed to send to some recipients'
      });
    }

    return res.status(200).json({ success: true, message: 'Emails sent successfully to all recipients' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({
      error: 'Failed to send email',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
