import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('Request method:', req.method);

  if (req.method !== 'POST') {
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
