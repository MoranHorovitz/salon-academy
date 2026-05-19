// api/send-guide.js — Vercel Serverless Function
// Called from thank-you.html after successful enrollment
// Sends the guide PDF link via Resend

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, name } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Missing email' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const GUIDE_URL = process.env.GUIDE_URL || 'https://salon-hayazamiot.co.il/guides/reels/';

  const firstName = (name || '').split(' ')[0] || 'יקרה';

  const html = `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: 'Helvetica Neue', Arial, sans-serif; background: #0d0d1a; color: #e8e8f0; margin: 0; padding: 0; }
    .wrap { max-width: 560px; margin: 0 auto; padding: 40px 24px; }
    .logo { font-size: 22px; font-weight: 900; color: #ff3cbe; margin-bottom: 32px; }
    h1 { font-size: 26px; font-weight: 900; color: #ffffff; margin: 0 0 12px; }
    p { font-size: 16px; line-height: 1.7; color: #b0b0c8; margin: 0 0 20px; }
    .btn { display: inline-block; background: linear-gradient(135deg, #ff3cbe, #b44fff); color: #ffffff !important; text-decoration: none; padding: 16px 36px; border-radius: 12px; font-size: 17px; font-weight: 800; margin: 8px 0 28px; }
    .footer { font-size: 13px; color: #555570; border-top: 1px solid #222240; padding-top: 20px; margin-top: 32px; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="logo">Salon Academy 🌸</div>
    <h1>ברוכה הבאה, ${firstName}!</h1>
    <p>תודה שהצטרפת לקורס <strong style="color:#ff3cbe">לא משתעבדת לתוכן</strong> 🎉</p>
    <p>הגישה שלך פעילה. הנה המדריך שלך:</p>
    <a href="${GUIDE_URL}" class="btn">פתחי את המדריך ←</a>
    <p style="font-size:14px;color:#6666aa;">אם הכפתור לא עובד, העתיקי את הקישור:<br>
      <a href="${GUIDE_URL}" style="color:#ff3cbe;">${GUIDE_URL}</a>
    </p>
    <div class="footer">
      Salon Academy | salon-hayazamiot.co.il<br>
      קיבלת את המייל הזה כי נרשמת לקורס.
    </div>
  </div>
</body>
</html>`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Salon Academy <noreply@salon-hayazamiot.co.il>',
        to: [email],
        subject: '🌸 ברוכה הבאה! המדריך שלך מחכה לך',
        html,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Resend error:', data);
      return res.status(500).json({ error: data.message || 'Failed to send email' });
    }

    return res.status(200).json({ ok: true, id: data.id });
  } catch (err) {
    console.error('Send guide error:', err);
    return res.status(500).json({ error: err.message });
  }
}
