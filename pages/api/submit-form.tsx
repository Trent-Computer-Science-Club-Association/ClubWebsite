import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('Request method:', req.method);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  switch (req.method) {
    case 'OPTIONS':
      return res.status(200).end();
    case 'GET':
      return res.status(200).json({ message: 'API route is working' });
    case 'POST':
      break;
    default:
      return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { Email, Subject, Name, Message } = req.body;
  console.log('Received form data:', { Email, Subject, Name, Message });

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('Webhook URL not configured');
    return res.status(500).json({ message: 'Webhook URL not configured' });
  }

  const webhookPayload = {
    content: `**Subject:** ${Subject}\n**Name:** ${Name}\n**Email:** ${Email}\n**Message:**\n${Message}`,
    username: 'TCSCA Contact Form',
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(webhookPayload),
    });

    if (response.ok) {
      res.status(200).json({ message: 'Form submitted successfully' });
    } else {
      console.error(
        'Error response from Discord:',
        response.status,
        await response.text()
      );
      res.status(response.status).json({ message: 'Error submitting form' });
    }
  } catch (error) {
    console.error('Error submitting to Discord webhook:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
