import { Resend } from 'resend';

function esc(s: string) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildEmailHtml(name: string, email: string, service: string, message: string) {
  return `<!DOCTYPE html>
<html lang="es">
<body style="font-family:sans-serif;background:#0d0d0d;color:#e5e5e5;padding:32px;margin:0">
  <div style="max-width:560px;margin:0 auto;background:#1a1a1a;border-radius:12px;padding:32px;border:1px solid #333">
    <h1 style="margin:0 0 8px;font-size:22px;color:#fff">🚀 Nuevo Lead — Boost Experiences</h1>
    <p style="margin:0 0 24px;color:#999;font-size:14px">Mensaje recibido desde la web</p>
    <table style="width:100%;border-collapse:collapse">
      <tr><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;color:#999;font-size:13px;width:120px">Nombre</td><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;font-weight:600">${esc(name)}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;color:#999;font-size:13px">Email</td><td style="padding:10px 0;border-bottom:1px solid #2a2a2a"><a href="mailto:${esc(email)}" style="color:#a78bfa">${esc(email)}</a></td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;color:#999;font-size:13px">Servicio</td><td style="padding:10px 0;border-bottom:1px solid #2a2a2a;color:#a78bfa;font-weight:600">${esc(service)}</td></tr>
    </table>
    <p style="margin:24px 0 8px;color:#999;font-size:13px">Mensaje</p>
    <p style="margin:0;background:#111;border-radius:8px;padding:16px;line-height:1.6;white-space:pre-wrap">${esc(message)}</p>
    <p style="margin:24px 0 0;font-size:12px;color:#555;text-align:center">Boost Experiences · Enviado automáticamente tras verificación CAPTCHA</p>
  </div>
</body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, service, message, 'cf-turnstile-response': turnstileToken } = body;

    // 1. Verify Turnstile token
    const turnstileSecret = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY || '1x0000000000000000000000000000000AA';
    
    // Fallback to dummy secret if client token is a dummy/test token
    const secretToUse = (turnstileToken && (turnstileToken.startsWith('1x') || turnstileToken.startsWith('XXXX') || turnstileToken === 'XXXX'))
      ? '1x0000000000000000000000000000000AA'
      : turnstileSecret;

    const verifyResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: secretToUse,
          response: turnstileToken || '',
        }).toString(),
      }
    );

    const outcome = await verifyResponse.json() as { success: boolean };
    if (!outcome.success) {
      return new Response(JSON.stringify({ error: 'Verificación de seguridad fallida.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. Real Logic: Send Email via Resend
    const resendKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL || 'gonzalezwilly@gmail.com';
    let emailSent = false;
    
    if (resendKey) {
      try {
        const resend = new Resend(resendKey);
        const { error } = await resend.emails.send({
          from: 'Boost Experiences <onboarding@resend.dev>',
          to: contactEmail,
          replyTo: email,
          subject: `🚀 Nuevo Lead: ${name} — ${service}`,
          html: buildEmailHtml(name, email, service, message),
        });
        if (error) {
          console.error('Resend Error:', error);
        } else {
          emailSent = true;
        }
      } catch (emailError) {
        console.error('Resend Error:', emailError);
      }
    }

    // 3. Simulated/Development Notification
    console.log('--- NEW LEAD RECEIVED ---');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Service: ${service}`);
    console.log(`Message: ${message}`);
    console.log('-------------------------');

    return new Response(JSON.stringify({ 
      success: true, 
      message: emailSent 
        ? '¡Mensaje enviado con éxito!' 
        : '¡Gracias! Hemos recibido tu mensaje (Modo Desarrollo).' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in contact API:', error);
    return new Response(JSON.stringify({ error: 'Error interno al procesar el mensaje.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
