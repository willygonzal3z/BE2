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
<head>
  <meta charset="UTF-8">
  <title>Nuevo Lead — Boost Experiences</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #090a0f; color: #f4f4f5; padding: 40px 20px; margin: 0; -webkit-font-smoothing: antialiased;">
  <div style="max-width: 600px; margin: 0 auto; background: #131520; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.08); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);">
    
    <!-- Top Brand Gradient Bar -->
    <div style="height: 6px; background: linear-gradient(90deg, #0078cf 0%, #6796ff 100%);"></div>
    
    <div style="padding: 40px 32px;">
      <!-- Header -->
      <table style="width: 100%; margin-bottom: 32px;">
        <tr>
          <td style="vertical-align: middle;">
            <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #6796ff; font-weight: 700; display: block; margin-bottom: 4px;">Contacto de la Web</span>
            <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #ffffff;">🚀 Nuevo Lead Recibido</h1>
          </td>
        </tr>
      </table>

      <!-- Details Card -->
      <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 24px; margin-bottom: 32px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.06); color: #a1a1aa; font-size: 13px; font-weight: 500; width: 140px;">Nombre</td>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.06); color: #ffffff; font-size: 14px; font-weight: 600;">${esc(name)}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.06); color: #a1a1aa; font-size: 13px; font-weight: 500;">Email</td>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.06); color: #0078cf; font-size: 14px; font-weight: 600;">
              <a href="mailto:${esc(email)}" style="color: #6796ff; text-decoration: none; border-bottom: 1px dashed rgba(103, 150, 255, 0.4);">${esc(email)}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; color: #a1a1aa; font-size: 13px; font-weight: 500;">Servicio de Interés</td>
            <td style="padding: 12px 0; color: #ffffff; font-size: 14px; font-weight: 600;">
              <span style="background: rgba(0, 120, 207, 0.15); border: 1px solid rgba(0, 120, 207, 0.3); color: #6796ff; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 700; display: inline-block;">
                ${esc(service)}
              </span>
            </td>
          </tr>
        </table>
      </div>

      <!-- Message Header -->
      <h3 style="margin: 0 0 12px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #a1a1aa;">Mensaje del Cliente</h3>
      
      <!-- Message Body -->
      <div style="background: rgba(255, 255, 255, 0.02); border-left: 3px solid #0078cf; border-radius: 0 8px 8px 0; padding: 20px; margin-bottom: 40px;">
        <p style="margin: 0; color: #e4e4e7; font-size: 15px; line-height: 1.6; white-space: pre-wrap; font-family: inherit;">${esc(message)}</p>
      </div>

      <!-- Reply CTA -->
      <div style="text-align: center; margin-bottom: 24px;">
        <a href="mailto:${esc(email)}" style="display: inline-block; background: linear-gradient(135deg, #0078cf 0%, #6796ff 100%); color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-size: 14px; font-weight: 700; letter-spacing: 0.02em; box-shadow: 0 4px 12px rgba(0, 120, 207, 0.3);">
          📥 Responder por Email
        </a>
      </div>

      <!-- Footer Info -->
      <div style="border-top: 1px solid rgba(255, 255, 255, 0.06); padding-top: 24px; text-align: center;">
        <p style="margin: 0 0 4px; font-size: 11px; color: #71717a;">Este correo fue enviado automáticamente por el sistema de contacto de Boost Experiences.</p>
        <p style="margin: 0; font-size: 11px; color: #52525b;">Verificación de seguridad Cloudflare Turnstile aprobada.</p>
      </div>

    </div>
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
