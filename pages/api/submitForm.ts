import { type NextApiRequest, type NextApiResponse } from 'next';
import { contactSubject } from '../../config';
import z from 'zod';

// Zod Schema
interface FormData {
  Name: string;
  Subject: string;
  Email: string;
  Message: string;
}
const formDataSchema = z.strictObject({
  Name: z.string().max(200),
  Subject: contactSubject,
  Email: z.string().max(200),
  Message: z.string().max(1000),
});

export const processFormData = (formRequest: unknown): FormData | undefined => {
  const result = formDataSchema.safeParse(formRequest);
  switch (result.success) {
    case true:
      return result.data;
    case false:
      console.error('Invalid Form Submission', result.error);
      return undefined;
  }
};
// Basic code block escaping - We shouldn't need anything fancy here
const escapeBlock = (content: string) => {
  return content.normalize().replaceAll('`', '');
};
// Api Request
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  try {
    switch (req.method) {
      case 'POST': {
        // Validate Body
        const validData = processFormData(req.body);
        if (validData == undefined) {
          // Note: We do not log the payload here as we assume the payload is malicious
          res.status(400).json({ message: 'Invalid Form Submission' });
          return;
        }
        // Send Discord Data
        const { Email, Subject, Name, Message } = req.body;
        // Sanitize Inputs
        const webhookPayload = {
          content: `**Subject:** \`${escapeBlock(Subject)}\`\n**Name:** \`${escapeBlock(Name)}\`\n**Email:** \`${escapeBlock(Email)}\`\n**Message:**\n\`\`\`\n${escapeBlock(Message)}\n\`\`\``,
          username: 'TCSCA Contact Form',
        };
        const payload = z
          .string()
          .max(2000)
          .safeParse(JSON.stringify(webhookPayload));
        if (payload.success == false) {
          // Note: This should physically be impossible but we check anyways to be safe
          // Note: We do not log the payload here as we assume the payload is malicious
          console.error('Impossible: Form payload outside valid length');
          res.status(400).json({ message: 'Invalid Form Submission' });
          return;
        }
        // Get Webhook
        const WEBHOOK_URL = z
          .string()
          .safeParse(process.env.DISCORD_WEBHOOK_URL);
        if (WEBHOOK_URL.success == false) {
          // Note: We log impossible here because it should be impossible for a user to see
          console.error('Impossible: Invalid Webhook URL');
          res
            .status(400)
            .json({ message: 'Impossible: Invalid Webhook Configuration' });
          return;
        }
        try {
          const response = await fetch(WEBHOOK_URL.data, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(webhookPayload),
          });
          if (response.ok) {
            // Note: We assume a valid submission is safe enough to log
            console.log(
              `Form Submission: ${JSON.stringify(req.body, null, 2)}`
            );
            res.status(200).json({ message: 'Form submitted successfully' });
            return;
          } else {
            // Note: We do not log the payload here as we assume the payload is malicious
            console.error('Error response from Discord:', response.status);
            res
              .status(200)
              .json({ message: 'Error submitting form to Discord' });
            return;
          }
        } catch (error) {
          // Note: We do not log the payload here as we assume the payload is malicious
          console.error('Error submitting to Discord webhook:', error);
          return res.status(500).json({ message: 'Internal server error' });
        }
      }
      // Default Routes
      case 'GET':
        res.status(200).json({ message: 'Post Only Route' });
        return;
      default:
        res.status(501).end(); // 501: Route not implemented
        return;
    }
  } catch (e) {
    // This case should be impossible, but let's handle it to prevent server failure anyways
    // Note: We do not log the payload here as we assume the payload is malicious
    console.error('Impossible: Exception on route handle');
    res.status(400).end();
  }
}
