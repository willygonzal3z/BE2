"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, ShieldAlert, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verificar si ya se guardó la decisión en localStorage
    const consent = localStorage.getItem("boost_cookie_consent");
    if (!consent) {
      // Retrasar la aparición del banner para una entrada más elegante
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("boost_cookie_consent", "accepted");
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
      });
    }
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("boost_cookie_consent", "declined");
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 z-50 mx-auto max-w-4xl animate-fade-up">
      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-card/95 p-5 md:p-6 backdrop-blur-xl shadow-2xl transition-all hover:border-white/20">
        
        {/* Glow de fondo sutil */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-brand/10 blur-2xl" />

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
          
          {/* Ícono e Información */}
          <div className="flex items-start gap-4">
            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-brand">
              <Cookie className="h-5 w-5 text-white" />
            </div>
            <div className="space-y-1">
              <h4 className="font-display font-bold text-foreground flex items-center gap-2">
                Control de Cookies
                <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">
                  <ShieldAlert className="h-3 w-3" /> GDPR / Ley 25.326
                </span>
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
                Utilizamos cookies propias y de terceros para optimizar el rendimiento de la web, analizar la navegación y mejorar tu experiencia. Al aceptar, permites el análisis de visitas. Consulta los detalles en nuestra{" "}
                <Link href="/privacidad" className="text-accent underline hover:text-accent/80 transition-colors">
                  política de privacidad
                </Link>
                .
              </p>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex flex-wrap items-center gap-2 shrink-0 justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDecline}
              className="border-white/10 hover:bg-white/5 text-xs h-9"
            >
              Rechazar
            </Button>
            <Button
              size="sm"
              onClick={handleAccept}
              className="bg-gradient-brand glow border-0 text-white font-semibold text-xs h-9 px-5"
            >
              Aceptar cookies
            </Button>
            
            {/* Botón de Cerrar (Equivale a cerrar el aviso sin guardar preferencia) */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-3 right-3 text-muted-foreground/60 hover:text-foreground transition-colors md:relative md:top-auto md:right-auto md:ml-2"
              aria-label="Cerrar aviso"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
