import Link from "next/link";
import { Shield, ArrowLeft, Mail, Calendar, Eye, Lock } from "lucide-react";
import logo from "@/assets/boost-logo.png";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Política de Privacidad | Boost Experiences",
  description: "Política de privacidad de Boost Experiences. Conoce cómo tratamos y protegemos tus datos personales.",
};

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-brand/30">
      {/* Header simplificado */}
      <header className="fixed top-0 z-50 w-full">
        <div className="mx-auto mt-4 max-w-4xl px-4">
          <div className="flex items-center justify-between rounded-2xl glass px-5 py-3">
            <Link href="/" className="flex items-center gap-2">
              <img src={logo.src} alt="Boost Experiences" className="h-9 w-auto" />
              <span className="font-display text-sm font-semibold tracking-wide">BOOST EXPERIENCES</span>
            </Link>
            <Button asChild size="sm" variant="outline" className="border-white/10 hover:bg-white/5 gap-2">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" /> Volver al inicio
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="mx-auto max-w-4xl px-6 pt-32 pb-24">
        <div className="animate-fade-up space-y-8">
          
          {/* Badge & Titulo */}
          <div className="text-center md:text-left space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-muted-foreground">
              <Shield className="h-3.5 w-3.5 text-accent" />
              Compromiso de Privacidad y Seguridad
            </div>
            <h1 className="font-display text-4xl font-bold md:text-5xl">
              Política de <span className="text-gradient">Privacidad</span>
            </h1>
            <p className="text-muted-foreground text-sm flex items-center gap-2 justify-center md:justify-start">
              <Calendar className="h-4 w-4" /> Última actualización: Mayo 2026
            </p>
          </div>

          {/* Tarjeta de Contenido Legal */}
          <div className="rounded-3xl glass border border-white/10 p-6 md:p-10 space-y-8 backdrop-blur-md">
            
            <section className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <h2 className="text-xl font-bold text-foreground">1. Introducción y Responsable</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm pl-11">
                En <strong>Boost Experiences</strong> nos tomamos muy en serio la privacidad de tus datos. Esta Política de Privacidad describe cómo recopilamos, utilizamos, almacenamos y protegemos la información personal que nos proporcionas al interactuar con nuestro sitio web y formulario de contacto.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm pl-11">
                El responsable del tratamiento de tus datos es <strong>Boost Experiences</strong>. Si tienes dudas o consultas sobre el uso de tus datos personales, puedes escribirnos en cualquier momento a: <a href="mailto:hola@boostexperiences.com" className="text-accent hover:underline">hola@boostexperiences.com</a>.
              </p>
            </section>

            <section className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand">
                  <Eye className="h-4 w-4 text-white" />
                </div>
                <h2 className="text-xl font-bold text-foreground">2. Datos que Recopilamos</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm pl-11">
                Recopilamos únicamente los datos mínimos necesarios para atender tus solicitudes de contacto y presupuestos. A través de nuestro formulario, los datos guardados son:
              </p>
              <ul className="list-disc list-inside text-muted-foreground text-sm pl-16 space-y-1">
                <li><strong>Nombre completo:</strong> Para dirigirnos a ti de manera personalizada.</li>
                <li><strong>Dirección de correo electrónico:</strong> Para responder a tu consulta.</li>
                <li><strong>Servicio de interés:</strong> Para comprender qué tipo de solución necesitas.</li>
                <li><strong>Mensaje o descripción del proyecto:</strong> Para analizar tu requerimiento técnico.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand">
                  <Lock className="h-4 w-4 text-white" />
                </div>
                <h2 className="text-xl font-bold text-foreground">3. Finalidad del Tratamiento</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm pl-11">
                Tratamos tus datos con el único propósito de gestionar y responder a tu solicitud de información, programar la sesión de descubrimiento técnico sin costo y elaborar presupuestos adaptados a tu proyecto.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm pl-11">
                <strong>No utilizaremos</strong> tus datos personales para enviar correos comerciales masivos (SPAM) sin tu consentimiento explícito previa solicitud, ni los venderemos a terceras partes bajo ningún concepto.
              </p>
            </section>

            <section className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <h2 className="text-xl font-bold text-foreground">4. Legitimación del Tratamiento</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm pl-11">
                La base legal para el tratamiento de tus datos es tu **consentimiento inequívoco**. Al rellenar y enviar de forma voluntaria el formulario de contacto, y al marcar la casilla de aceptación, estás otorgando tu permiso para que procesemos tus datos conforme a los fines indicados.
              </p>
            </section>

            <section className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand">
                  <Lock className="h-4 w-4 text-white" />
                </div>
                <h2 className="text-xl font-bold text-foreground">5. Proveedores y Destinatarios de Datos</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm pl-11">
                Para el correcto funcionamiento del formulario de contacto y garantizar la seguridad del sitio, utilizamos herramientas de proveedores externos de confianza:
              </p>
              <ul className="list-disc list-inside text-muted-foreground text-sm pl-16 space-y-2">
                <li>
                  <strong>Resend:</strong> Plataforma mediante la cual procesamos y nos enviamos la notificación del email con tu consulta de forma segura. Su política de privacidad cumple con estándares estrictos de protección de datos.
                </li>
                <li>
                  <strong>Cloudflare Turnstile:</strong> Solución de protección contra spam y bots que valida que el envío no sea automatizado. Turnstile recopila ciertos datos de telemetría del navegador de forma anónima para verificar que eres humano, sin recopilar información de identificación personal.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <h2 className="text-xl font-bold text-foreground">6. Tus Derechos</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm pl-11">
                De acuerdo con la normativa vigente en protección de datos, tienes derecho a:
              </p>
              <ul className="list-disc list-inside text-muted-foreground text-sm pl-16 space-y-1">
                <li>Conocer qué datos personales poseemos sobre ti (Acceso).</li>
                <li>Solicitar la rectificación de datos inexactos o incompletos (Rectificación).</li>
                <li>Solicitar la eliminación total de tus datos personales de nuestros registros (Supresión).</li>
                <li>Oponerte o limitar el tratamiento de tus datos en determinadas circunstancias.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed text-sm pl-11">
                Puedes ejercer cualquiera de estos derechos de forma gratuita enviando un correo electrónico a <a href="mailto:hola@boostexperiences.com" className="text-accent hover:underline">hola@boostexperiences.com</a> indicando tu nombre completo y el derecho que deseas ejercer.
              </p>
            </section>

          </div>

          {/* Footer simplificado */}
          <div className="text-center pt-8 border-t border-white/10">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Boost Experiences · Todos los derechos reservados.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
