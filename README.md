# Boost Experiences

Sitio web institucional de **Boost Experiences**, una agencia digital especializada en Diseño UX/UI, Desarrollo Web, Apps Móviles, Inteligencia Artificial y soluciones Blockchain.

Este sitio es una Single Page Application (SPA) optimizada para el mercado latinoamericano, desarrollada con Next.js 15, React 19 y Tailwind CSS v4. Incluye un chatbot interactivo con Gemini 2.5 Flash, un formulario de contacto seguro con verificación Cloudflare Turnstile, y animaciones avanzadas en el cliente.

---

## 🚀 Tecnologías Principales

- **Framework**: Next.js 15 (App Router)
- **UI & Estilos**: React 19, Tailwind CSS v4, Radix UI (via shadcn/ui) y Lucide Icons
- **IA**: Google Gemini 2.5 Flash (a través del Vercel AI SDK)
- **Seguridad**: Cloudflare Turnstile CAPTCHA
- **Notificaciones**: Resend (envío de emails) y Sonner (toasts)
- **Animaciones**: Custom CSS + `requestAnimationFrame`

---

## 🛠️ Requisitos de Entorno

Para que la aplicación funcione completamente, se deben configurar las siguientes variables de entorno en producción (Vercel) y en tu archivo `.env` local:

```env
# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=           # Clave pública de sitio
CLOUDFLARE_TURNSTILE_SECRET_KEY=          # Clave secreta (solo servidor)

# Email (Resend)
RESEND_API_KEY=                           # API key de resend.com
CONTACT_EMAIL=                            # Email destinatario de los leads

# IA (Google Gemini)
GOOGLE_GENERATIVE_AI_API_KEY=             # API key de aistudio.google.com
```

---

## 💻 Desarrollo Local

Para ejecutar el proyecto en tu entorno local:

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo**:
   En Windows (Node.js 24) se requiere el flag de certificados de sistema:
   ```powershell
   $env:NODE_OPTIONS = "--use-system-ca"; npm run dev
   ```
   En macOS / Linux:
   ```bash
   npm run dev
   ```

3. **Compilar para producción**:
   ```bash
   npm run build
   ```
