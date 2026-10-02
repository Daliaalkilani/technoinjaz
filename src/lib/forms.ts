// Direct form delivery to the Techno Enjaz inbox through FormSubmit
// (https://formsubmit.co): no account and no API key. The browser posts the form to
// their AJAX endpoint and the message is emailed to INBOX. The very first submission
// sends a one-time "Activate" email to INBOX; after that click, every message is
// delivered automatically. Works the same on Cloudflare Workers (no backend needed).

export const INBOX = 'info@technoenjaz.com';

const ENDPOINT = `https://formsubmit.co/ajax/${INBOX}`;

export function formsConfigured() {
  return true;
}

export async function sendForm(subject: string, fields: Record<string, string>, replyTo?: string): Promise<boolean> {
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: subject,
        _template: 'table',
        _captcha: 'false',
        ...(replyTo ? { _replyto: replyTo } : {}),
        ...fields
      })
    });
    const data = (await res.json().catch(() => null)) as { success?: string | boolean } | null;
    return res.ok && (data?.success === true || data?.success === 'true');
  } catch {
    return false;
  }
}
