# Boost Experiences — Especificación Técnica del Proyecto

## Resumen

Sitio web institucional de **Boost Experiences**, agencia digital especializada en UX/UI, Desarrollo Web, Apps Móviles, Inteligencia Artificial y Blockchain. El sitio es una Single Page Application (SPA) en español orientada al mercado latinoamericano, con diseño oscuro, formulario de contacto con email, chat de IA y animaciones interactivas.

---

## Stack Tecnológico

| Categoría | Tecnología | Versión |
|-----------|-----------|---------|
| Framework | Next.js | 15.1.0 |
| Lenguaje | TypeScript | ^5.0 |
| UI Library | React | ^19.0 |
| Estilos | Tailwind CSS | ^4.0 |
| Componentes | shadcn/ui (Radix UI) | — |
| Formularios | React Hook Form + Zod | ^7.71 / ^3.24 |
| Email | Resend | ^6.12 |
| CAPTCHA | Cloudflare Turnstile | ^1.5 |
| IA / Chat | Google Gemini 2.5 Flash | via @ai-sdk/google |
| Notificaciones | Sonner | ^2.0 |
| Animaciones | CSS + requestAnimationFrame | — |
| Iconos | Lucide React | ^0.575 |
| Fuentes | Outfit (display) + Inter (body) | via next/font |
| Web3 | @metamask/logo | ^4.0 |
| Analíticas | Google Analytics (GA4) | via next/script + Consent Mode |

---

## Estructura del Proyecto

```
be2/
├── src/
│   ├── app/
│   │   ├── page.tsx               # Página principal (SPA — client component)
│   │   ├── layout.tsx             # Root layout, metadata SEO, fuentes, Toaster
│   │   ├── globals.css            # Design system (Tailwind v4, CSS variables, utilidades)
│   │   └── api/
│   │       ├── chat/route.ts      # Endpoint streaming del chat IA (Gemini)
│   │       └── contact/route.ts   # Endpoint del formulario de contacto (Resend + Turnstile)
│   ├── components/
│   │   ├── SmartContactForm.tsx   # Formulario de contacto con CAPTCHA
│   │   ├── ChatAgent.tsx          # Widget de chat IA "Paco"
│   │   ├── CustomCursor.tsx       # Cursor animado personalizado
│   │   ├── ThemeToggle.tsx        # Toggle dark/light mode
│   │   ├── MetamaskLogo.tsx       # Logo 3D MetaMask (sección Web3)
│   │   └── ui/                    # 47 componentes shadcn/ui
│   ├── hooks/
│   │   └── use-mobile.tsx         # Hook para detección de breakpoint mobile
│   └── lib/
│       ├── utils.ts               # Utilidades (cn para clases)
│       ├── gtag.ts                # Utilidades de Google Analytics (Consent Mode + custom events)
│       ├── error-capture.ts       # Captura de errores
│       └── error-page.ts          # Template de página de error
├── public/
│   ├── favicon.png / .svg / .ico  # Favicons multi-formato
│   ├── apple-touch-icon.png       # Ícono iOS
│   ├── robots.txt                 # Directivas de crawl
│   ├── sitemap.xml                # Sitemap estático
│   └── site.webmanifest           # Manifiesto PWA
├── SPEC.md                        # Este documento
├── .env                           # Variables de entorno (NO commitear)
├── .gitignore                     # Excluye .env*, node_modules, .next
├── next.config.ts                 # Configuración Next.js
├── postcss.config.mjs             # PostCSS con @tailwindcss/postcss
├── tsconfig.json                  # Configuración TypeScript
└── package.json                   # Dependencias y scripts
```

---

## Secciones del Sitio (page.tsx)

El sitio es una única página con navegación por anchors `#seccion`.

| # | Sección | ID Anchor | Descripción |
|---|---------|-----------|-------------|
| 1 | Navegación | — | Header fijo con glassmorphism, logo, links, ThemeToggle, menú mobile |
| 2 | Hero | `#inicio` | Headline, badge animado, CTAs, fondo con gradiente radial |
| 3 | Servicios | `#servicios` | 6 tarjetas con hover expandible (UX/UI, Web, Mobile, IA, etc.) |
| 4 | UX Matters | — | 3 estadísticas + carrusel de 16 metodologías UX con flip 3D |
| 5 | Proceso | `#proceso` | 4 pasos expandibles: Descubrir → Diseñar → Construir → Potenciar |
| 6 | Por qué Boost | — | 6 diferenciadores con íconos de check |
| 7 | Web3 | `#web3` | Smart Contracts, On-chain, dApps/NFTs + logo 3D MetaMask |
| 8 | Cuéntanos | — | CTA intermedio con ícono Lightbulb |
| 9 | Contacto | `#contacto` | SmartContactForm + link de WhatsApp |
| 10 | Footer | — | Logo, copyright, tagline |

---

## API Routes

### `POST /api/contact`

Recibe el envío del formulario de contacto.

**Body esperado:**
```json
{
  "name": "string",
  "email": "string",
  "service": "string",
  "message": "string",
  "cf-turnstile-response": "string"
}
```

**Flujo:**
1. Verifica token de Cloudflare Turnstile
2. Envía email HTML vía Resend a `CONTACT_EMAIL`
3. Loguea el lead en consola como fallback
4. Retorna `{ success: true, message: "..." }`

**Variables de entorno requeridas:**
- `RESEND_API_KEY` — API key de Resend
- `CONTACT_EMAIL` — Destino del email (default: gonzalezwilly@gmail.com)
- `CLOUDFLARE_TURNSTILE_SECRET_KEY` — Secret key de Turnstile

---

### `POST /api/chat`

Endpoint de streaming para el chat IA "Paco".

**Body esperado:**
```json
{ "messages": [{ "role": "user", "content": "string" }] }
```

**Flujo:**
1. Recibe historial de mensajes
2. Llama a Gemini 2.5 Flash con system prompt de Boost Experiences
3. Retorna respuesta como text stream

**Variables de entorno requeridas:**
- `GOOGLE_GENERATIVE_AI_API_KEY` — API key de Google AI Studio

---

## Variables de Entorno

El archivo `.env` está excluido del repositorio (`.gitignore` cubre `.env*`). Estas variables deben configurarse manualmente en el servidor de producción:

```env
# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=   # Site key (público, va al cliente)
CLOUDFLARE_TURNSTILE_SECRET_KEY=  # Secret key (solo servidor)

# Email (Resend)
RESEND_API_KEY=                   # API key de resend.com
CONTACT_EMAIL=                    # Email donde llegan los leads

# IA (Google Gemini)
GOOGLE_GENERATIVE_AI_API_KEY=     # API key de aistudio.google.com

# Google Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS=     # ID de medición (G-XXXXXXXXXX)
```

---

## Design System

Definido en `src/app/globals.css` mediante Tailwind CSS v4 (CSS-first).

### Colores (oklch)

| Token | Valor | Uso |
|-------|-------|-----|
| `--brand` | `oklch(0.62 0.22 255)` | Primario, botones, links |
| `--brand-glow` | `oklch(0.78 0.18 235)` | Hover, gradientes, acentos |
| `--brand-deep` | `oklch(0.32 0.18 265)` | Fondos con tinte |
| `--background` | `oklch(0.14 0.03 260)` | Fondo de página |
| `--foreground` | `oklch(0.98 0.005 250)` | Texto principal |
| `--muted-foreground` | `oklch(0.7 0.03 255)` | Texto secundario |

### Tipografía

| Variable | Fuente | Pesos |
|----------|--------|-------|
| `--font-display` | Outfit | 400, 500, 600, 700 |
| `--font-sans` | Inter | 300, 400, 500, 600, 700 |

### Utilidades CSS personalizadas

| Clase | Descripción |
|-------|-------------|
| `.glass` | Glassmorphism (blur + transparencia) |
| `.glow` | Box-shadow de marca |
| `.bg-gradient-brand` | Gradiente lineal brand → brand-glow |
| `.text-gradient` | Texto con gradiente (clip) |
| `.animate-float` | Flotación suave 6s loop |
| `.animate-fade-up` | Entrada fade + slide-up |
| `.animate-fade-in` | Entrada fade |

---

## SEO

### Metadata (Next.js Metadata API)

- **Title:** "Boost Experiences | UX/UI, Desarrollo Web y Apps Móviles"
- **Description:** texto descriptivo de la agencia
- **Canonical:** `https://boostexperiences.com`
- **Robots:** `index, follow`
- **Open Graph:** tipo website, locale `es_AR`, imagen OG 1200×630
- **Twitter Card:** `summary_large_image`
- **Manifest:** `/site.webmanifest`

### JSON-LD (Structured Data)

Dos schemas incluidos en el `<head>`:
- `Organization` — nombre, URL, logo, email, teléfono, dirección, catálogo de servicios
- `WebSite` — nombre y URL del sitio

### Archivos de crawl

- `public/robots.txt` — permite todo excepto `/api/`
- `public/sitemap.xml` — homepage con `priority: 1.0`

### Pendientes (antes de ir a producción)

- [ ] Crear `public/og-image.jpg` (1200×630px) — requerido por Open Graph y Twitter Card
- [ ] Crear `public/icon-192.png` y `public/icon-512.png` — requeridos por el manifiesto PWA
- [ ] Configurar dominio real en Cloudflare Turnstile dashboard

---

## Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
# (en Windows con Node.js 24, requiere este flag para certificados SSL)
$env:NODE_OPTIONS = "--use-system-ca"; npm run dev

# Build de producción
npm run build

# Iniciar servidor de producción
npm start
```

> **Nota Windows / Node.js 24:** El flag `NODE_OPTIONS=--use-system-ca` es necesario localmente porque Node.js 24 no usa el store de certificados del sistema por defecto. En servidores Linux esto no es necesario.

---

## Componentes Clave

### SmartContactForm

- Validación con Zod: nombre (max 100), email, servicio (select), mensaje (max 1000)
- En `localhost` usa el site key de prueba de Turnstile automáticamente
- Al enviar exitosamente: muestra estado de éxito + abre WhatsApp con datos prellenados
- Requiere `<Toaster>` montado en el layout para las notificaciones toast

### ChatAgent ("Paco")

- Se monta solo en el cliente (hydration guard)
- Streaming con AbortController (el usuario puede cancelar)
- Detecta errores de quota de API (429) y los muestra de forma amigable
- Historial de mensajes en estado local (se pierde al recargar)

### CustomCursor

- Solo activo en dispositivos con puntero fino (`pointer: fine`)
- Usa `requestAnimationFrame` para animación suave
- Cambia de tamaño al hover sobre elementos interactivos
- Deshabilitado en mobile/tablet automáticamente

---

## Tareas Pendientes

### Diseño e Identidad Visual

- [ ] **Modificar el favicon** — Reemplazar `public/favicon.png`, `public/favicon.svg` y `public/favicon.ico` con el ícono definitivo de la marca. Generar también `public/apple-touch-icon.png` (180×180px), `public/icon-192.png` y `public/icon-512.png` para el manifiesto PWA.

- [ ] **Ajustar las fuentes de títulos (H1–H4)** — Revisar la fuente display actual (Outfit) y los pesos/tamaños aplicados en los headings. Si se cambia la fuente, actualizar la importación en `src/app/layout.tsx` (en el `Outfit({...})` de `next/font/google`) y la variable `--font-display` en `src/app/globals.css`.

- [ ] **Ajustar el estilo del correo de notificación** — El template HTML del email de contacto está en `src/app/api/contact/route.ts` en la función `buildEmailHtml()`. Actualmente usa fondo oscuro genérico (`#0d0d0d`). Actualizar colores, tipografía y estructura para que sea coherente con la identidad visual de Boost Experiences (colores brand, fuentes, logo, etc.).

### Legal y Privacidad

- [ ] **Política de Privacidad** — Crear una página `/privacidad` (nuevo archivo `src/app/privacidad/page.tsx`) con la política de privacidad de Boost Experiences. Debe cubrir: datos recopilados por el formulario de contacto, uso de cookies de seguimiento, terceros (Google Analytics, etc.), derechos del usuario (acceso, rectificación, eliminación), y datos de contacto para ejercer derechos. Actualizar el link en el formulario (`SmartContactForm.tsx`, línea del texto "política de privacidad").

- [x] **Banner de consentimiento de cookies** — Implementado banner de aceptación que cumple con GDPR / Ley 25.326 (Argentina), con integración dinámica de Google Analytics (Consent Mode). Permite aceptar/rechazar, guarda la preferencia en `localStorage` y actualiza analíticas en tiempo real.

### Assets SEO

- [ ] **Crear `public/og-image.jpg`** (1200×630px) — Requerido por Open Graph y Twitter Card para el preview al compartir en redes sociales.
- [ ] **Configurar dominio real en Cloudflare Turnstile dashboard** — Autorizar el dominio de producción para el site key configurado.

---

## Notas de Producción

1. **Dominio del email (Resend):** El remitente actual es `onboarding@resend.dev` (dominio de prueba de Resend). Para producción, configurar un dominio propio en resend.com y actualizar el campo `from` en `/api/contact/route.ts`.

2. **Turnstile:** Verificar que el dominio de producción esté autorizado en el Cloudflare Turnstile dashboard para el site key configurado.

3. **TypeScript/ESLint en build:** El `next.config.ts` tiene `ignoreBuildErrors: true` y `ignoreDuringBuilds: true`. Revisar y corregir los errores reales antes de desactivar estos flags.

4. **og-image.jpg:** Crear una imagen de 1200×630px para que los links al sitio se vean correctamente al compartir en redes sociales (WhatsApp, Twitter/X, LinkedIn, etc.).
