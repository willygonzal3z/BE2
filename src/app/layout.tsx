import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";
import { CookieConsent } from "@/components/CookieConsent";
import "./globals.css";


const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport = {
  themeColor: "#7c3aed",
};

const SITE_URL = "https://boostexperiences.com";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
const DESCRIPTION =
  "Agencia especializada en UX/UI, Desarrollo Web, Apps Móviles, Inteligencia Artificial y Blockchain. Basados en Argentina, trabajamos globalmente.";

export const metadata: Metadata = {
  title: "Boost Experiences | UX/UI, Desarrollo Web y Apps Móviles",
  description: DESCRIPTION,
  authors: [{ name: "Boost Experiences" }],
  robots: "index, follow",
  manifest: "/site.webmanifest",
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Boost Experiences",
    title: "Boost Experiences | UX/UI, Desarrollo Web y Apps Móviles",
    description: DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Boost Experiences — Agencia Digital UX/UI, Desarrollo Web e IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Boost Experiences | UX/UI, Desarrollo Web y Apps Móviles",
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const safeJSON = (obj: unknown) =>
  JSON.stringify(obj).replace(/<\//g, "<\\/");

const orgSchema = safeJSON({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Boost Experiences",
  description:
    "Agencia especializada en UX/UI, Desarrollo Web, Apps Móviles, Inteligencia Artificial y Blockchain. Basados en Argentina, trabajamos globalmente.",
  url: "https://boostexperiences.com",
  logo: "https://boostexperiences.com/favicon.png",
  email: "hola@boostexperiences.com",
  telephone: "+54-11-7062-6021",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+54-11-7062-6021",
    contactType: "customer service",
    areaServed: "AR",
    availableLanguage: "Spanish",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "AR",
    addressRegion: "Buenos Aires",
  },
  sameAs: ["https://wa.me/5491170626021"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios Digitales",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Diseño UX/UI" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Desarrollo Web" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Apps Móviles" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Automatizaciones" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "IA Aplicada" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Blockchain y Web3" } },
    ],
  },
});

const webSchema = safeJSON({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Boost Experiences",
  url: "https://boostexperiences.com",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${outfit.variable} ${inter.variable} dark`}
      style={{ scrollBehavior: "smooth" }}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: orgSchema }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: webSchema }}
        />
      </head>
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
        <>
          {/* Inicializar Consent Mode por defecto leyendo de localStorage */}
          <Script
            id="google-analytics-consent"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                
                let consentState = 'denied';
                try {
                  const savedConsent = localStorage.getItem("boost_cookie_consent");
                  if (savedConsent === "accepted") {
                    consentState = "granted";
                  }
                } catch (e) {
                  console.error("Error leyendo consentimiento de cookies:", e);
                }

                gtag('consent', 'default', {
                  'analytics_storage': consentState,
                  'ad_storage': consentState,
                  'ad_user_data': consentState,
                  'ad_personalization': consentState
                });
              `,
            }}
          />
          {/* Cargar el script de Google Analytics principal */}
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            strategy="afterInteractive"
          />
          {/* Configurar e iniciar GA4 */}
          <Script
            id="google-analytics-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}
      <body>
        {children}
        <Toaster richColors position="top-right" />
        <CookieConsent />
      </body>
    </html>
  );
}
