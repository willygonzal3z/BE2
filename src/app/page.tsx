"use client";

import { ArrowRight, Sparkles, Code2, Smartphone, Workflow, Brain, Palette, Zap, Check, Lightbulb, Search, TrendingDown, Blocks, Link2, ShieldCheck, Layers, Mic, LayoutGrid, ClipboardList, ClipboardCheck, BarChart2, MousePointer2, Eye, GitBranch, MousePointerClick, Activity, Heart, Focus, Rocket, Film, BookOpen, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "@/assets/boost-logo.png";
import heroBg from "@/assets/hero-bg.jpg";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CustomCursor } from "@/components/CustomCursor";
import { ChatAgent } from "@/components/ChatAgent";
import { MetamaskLogo } from "@/components/MetamaskLogo";
import { SmartContactForm } from "@/components/SmartContactForm";

const services = [
  {
    icon: Palette,
    title: "Diseño UX/UI",
    desc: "Interfaces intuitivas, accesibles y memorables, basadas en research e iteración con usuarios reales.",
    details: "Creamos experiencias de usuario que no solo se ven bien, sino que convierten. Nuestro proceso incluye investigación de usuarios, mapas de empatía, arquitectura de información, wireframes y prototipos interactivos con pruebas de usabilidad. Diseñamos sistemas de diseño escalables y accesibles (WCAG AA) para que tu producto sea consistente en cada pantalla. Desde la microinteracción más sutil hasta flujos complejos multipasos, cada decisión está respaldada por datos reales y validada con usuarios.",
  },
  {
    icon: Code2,
    title: "Desarrollo Web",
    desc: "Sitios y plataformas rápidas, escalables y SEO-friendly con las tecnologías más modernas.",
    details: "Desarrollamos con React, Next.js, TanStack, TypeScript y Tailwind CSS — el stack que el mercado demanda hoy. Nuestros sitios alcanzan puntuaciones Lighthouse 95+ con Core Web Vitals optimizados para el ranking en Google. Implementamos arquitecturas Jamstack, edge computing y CDN global para tiempos de carga sub-segundo. Código limpio, testeado y entregado con documentación clara, listo para que tu equipo lo tome y escale.",
  },
  {
    icon: Smartphone,
    title: "Apps Móviles",
    desc: "Aplicaciones nativas y multiplataforma con experiencias fluidas en iOS y Android.",
    details: "Construimos con React Native y Expo para llegar a iOS y Android desde una sola base de código, sin sacrificar la experiencia nativa. Aprovechamos gestos, notificaciones push, cámara, biometría y todas las capacidades del dispositivo. Acompañamos el proceso completo: diseño, desarrollo, QA, publicación en App Store y Google Play, y soporte post-lanzamiento. Performance óptima en dispositivos de gama media y alta.",
  },
  {
    icon: Workflow,
    title: "Automatizaciones",
    desc: "Integramos tus herramientas y procesos para que tu equipo se enfoque en lo importante.",
    details: "Conectamos tus herramientas favoritas — CRM, ERP, Slack, WhatsApp, correo, hojas de cálculo y más — con workflows personalizados en n8n, Make o código propio. Eliminamos el trabajo manual repetitivo, reducimos errores humanos y liberamos a tu equipo para tareas de mayor valor estratégico. Cada automatización viene con monitoreo, alertas y documentación. ROI medible desde el primer mes de operación.",
  },
  {
    icon: Brain,
    title: "IA Aplicada",
    desc: "Modelos y agentes inteligentes que potencian la experiencia y los resultados de tu producto.",
    details: "Integramos LLMs líderes (GPT-4, Claude, Gemini) directamente en tu producto o workflow interno. Construimos agentes autónomos, sistemas RAG con tus datos propios, clasificadores, extractores de información y pipelines de procesamiento de lenguaje natural. Cuando el caso lo requiere, realizamos fine-tuning sobre modelos base. Todo con observabilidad, trazabilidad y evaluación continua para que puedas confiar en cada respuesta generada.",
  },
  {
    icon: Zap,
    title: "Consultoría Producto",
    desc: "Acompañamos la estrategia digital de extremo a extremo: descubrimiento, diseño y entrega.",
    details: "Facilitamos discovery sprints para validar hipótesis antes de construir, definimos roadmaps priorizados por impacto real y establecemos métricas de producto accionables (DAU, retención, NPS, conversión). Acompañamos desde la idea inicial hasta el lanzamiento y el crecimiento sostenido, siempre con el usuario y el negocio como norte. Ideal para startups que quieren acelerar y para equipos internos que necesitan un socio estratégico con visión técnica.",
  },
];

const processSteps = [
  {
    n: "01", t: "Descubrir",
    d: "Entendemos tu negocio, usuarios y objetivos a través de research e inmersión.",
    detail: "Hacemos inmersión profunda en tu negocio: entrevistas con stakeholders, análisis de competidores, research de usuarios y definición de métricas de éxito. Salimos con un mapa claro de qué construir, para quién y por qué — antes de diseñar una sola pantalla.",
  },
  {
    n: "02", t: "Diseñar",
    d: "Prototipamos y validamos experiencias con foco en usabilidad y conversión.",
    detail: "Convertimos el research en arquitectura de información, flujos de usuario y prototipos interactivos. Cada decisión se valida con usuarios reales antes de avanzar. Entregamos un sistema de diseño documentado, accesible (WCAG AA) y listo para implementar.",
  },
  {
    n: "03", t: "Construir",
    d: "Desarrollamos con código limpio, performante y preparado para escalar.",
    detail: "Desarrollamos con el stack más adecuado para tu producto: React, TypeScript, APIs modernas y arquitecturas cloud-native. CI/CD desde el día uno, tests automatizados y code reviews rigurosos garantizan que lo que entregamos funciona hoy y escala mañana.",
  },
  {
    n: "04", t: "Potenciar",
    d: "Integramos IA y automatizaciones que multiplican el valor entregado.",
    detail: "Una vez en producción, integramos capas de inteligencia: modelos de lenguaje, automatizaciones de proceso, analítica de comportamiento y loops de mejora continua. Tu producto no solo se lanza — evoluciona y aprende con cada interacción.",
  },
];

const navLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#ux", label: "UX/UI" },
  { href: "#proceso", label: "Proceso" },
  { href: "#web3", label: "Web3" },
  { href: "#contacto", label: "Contacto" },
];

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="mx-auto mt-4 max-w-6xl px-4">
        <div className="flex items-center justify-between rounded-2xl glass px-5 py-3">
          <a href="#top" onClick={close} className="flex items-center gap-2">
            <img src={logo.src} alt="Boost Experiences" className="h-9 w-auto" />
            <span className="font-display text-sm font-semibold tracking-wide">BOOST EXPERIENCES</span>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="transition hover:text-foreground">{l.label}</a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              className="flex h-9 w-9 items-center justify-center rounded-xl transition hover:bg-white/10 md:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <Button asChild size="sm" className="hidden bg-gradient-brand glow border-0 md:flex">
              <a href="#contacto">Hablemos</a>
            </Button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="mt-2 overflow-hidden rounded-2xl glass md:hidden">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={close}
                className="block border-b border-white/5 px-6 py-4 text-sm font-medium transition last:border-0 hover:bg-white/5"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={close}
              className="mx-3 mb-3 mt-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-brand px-4 py-3 text-sm font-semibold text-white"
            >
              Hablemos <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-40 pb-32">
      <div
        className="absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage: `url(${heroBg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      <div className="mx-auto max-w-5xl px-6 text-center">
        <div className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          UX/UI · Desarrollo · Inteligencia Artificial
        </div>
        <h1 className="animate-fade-up font-display text-5xl font-bold leading-[1.05] md:text-7xl">
          Experiencias digitales <br className="hidden sm:block" />
          <span className="text-gradient">que impulsan tu negocio</span>
        </h1>
        <p className="animate-fade-up mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Somos Boost Experiences. Diseñamos, desarrollamos y potenciamos productos digitales con
          las mejores prácticas de UX/UI y el poder de la inteligencia artificial.
        </p>
        <div className="animate-fade-up mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="bg-gradient-brand glow border-0">
            <a href="#contacto">
              Inicia tu proyecto <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10">
            <a href="#servicios">Ver servicios</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const [hovered, setHovered] = useState<number | null>(null);
  const active = hovered !== null ? services[hovered] : null;

  return (
    <section id="servicios" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-16 max-w-2xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-accent">Servicios</p>
        <h2 className="font-display text-4xl font-bold md:text-5xl">
          Todo lo que tu producto necesita, en un solo equipo.
        </h2>
      </div>
      <div className="relative" onMouseLeave={() => setHovered(null)}>
        {/* Grid base — se desvanece al hacer hover */}
        <div
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 transition-opacity duration-300"
          style={{ opacity: hovered !== null ? 0 : 1 }}
        >
          {services.map(({ icon: Icon, title, desc }, i) => (
            <article
              key={title}
              onMouseEnter={() => setHovered(i)}
              className="group relative overflow-hidden rounded-2xl glass p-7 transition hover:-translate-y-1 hover:border-white/20 cursor-default"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand">
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
              <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-brand/20 opacity-0 blur-3xl transition group-hover:opacity-100" />
            </article>
          ))}
        </div>

        {/* Tarjeta expandida — cubre todo el grid */}
        {active && (
          <div className="animate-fade-in absolute inset-0 flex flex-col justify-center gap-5 overflow-hidden rounded-2xl glass p-7 sm:flex-row sm:items-center sm:gap-10 sm:px-10 sm:py-8">
            <div className="flex-shrink-0">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-brand sm:h-24 sm:w-24">
                <active.icon className="h-8 w-8 text-white sm:h-12 sm:w-12" />
              </div>
            </div>
            <div className="min-w-0">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-accent">Servicio</p>
              <h3 className="font-display mb-3 text-2xl font-bold sm:text-3xl md:text-4xl">{active.title}</h3>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
                {active.details}
              </p>
              <a
                href="#contacto"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
              >
                Hablemos de tu proyecto <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
          </div>
        )}
      </div>
    </section>
  );
}

function Process() {
  const [hovered, setHovered] = useState<number | null>(null);
  const active = hovered !== null ? processSteps[hovered] : null;

  return (
    <section id="proceso" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-accent">Proceso</p>
          <h2 className="font-display text-4xl font-bold md:text-5xl">
            Un método claro, resultados predecibles.
          </h2>
        </div>
        <div className="relative" onMouseLeave={() => setHovered(null)}>
          {/* Grid base */}
          <div
            className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-4 transition-opacity duration-300"
            style={{ opacity: hovered !== null ? 0 : 1 }}
          >
            {processSteps.map((p, i) => (
              <div
                key={p.n}
                onMouseEnter={() => setHovered(i)}
                className="bg-background/80 p-8 backdrop-blur cursor-default"
              >
                <span className="font-display text-4xl font-bold text-gradient">{p.n}</span>
                <h3 className="mt-4 text-lg font-semibold">{p.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
              </div>
            ))}
          </div>

          {/* Tarjeta expandida */}
          {active && (
            <div className="animate-fade-in absolute inset-0 flex flex-col justify-center gap-3 overflow-hidden rounded-2xl border border-white/10 glass p-7 sm:flex-row sm:items-center sm:gap-10 sm:px-10 sm:py-8">
              <span className="font-display shrink-0 text-5xl font-bold leading-none text-gradient sm:text-7xl">{active.n}</span>
              <div className="min-w-0">
                <h3 className="text-xl font-bold sm:text-2xl">{active.t}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:mt-3 sm:text-base">{active.detail}</p>
              </div>
              <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-brand/20 blur-3xl" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const points = [
    "Equipo senior con foco real en UX y métricas de negocio",
    "Integración nativa de IA en cada experiencia que construimos",
    "Entregas iterativas, transparentes y bien documentadas",
    "Diseño accesible (WCAG) y desarrollo performante por defecto",
    "Acompañamiento estratégico, no solo ejecución",
    "Stack moderno: React, TypeScript, Cloud y modelos LLM",
  ];
  return (
    <section id="porque" className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-accent">Por qué Boost Experiences</p>
          <h2 className="font-display text-4xl font-bold md:text-5xl">
            Diseñamos productos pensados para <span className="text-gradient">crecer</span>.
          </h2>
          <p className="mt-5 text-muted-foreground">
            Combinamos investigación, diseño centrado en el usuario y tecnología de punta para
            entregar productos que la gente ama usar y los negocios aman tener.
          </p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-3 rounded-xl glass p-4">
              <span className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-gradient-brand">
                <Check className="h-3.5 w-3.5 text-white" />
              </span>
              <span className="text-sm">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function TellUs() {
  return (
    <section id="cuentanos" className="mx-auto max-w-6xl px-6 py-24">
      <div className="relative overflow-hidden rounded-3xl glass p-10 md:p-16 text-center">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand/30 blur-3xl" />
        <div className="relative">
          <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand glow">
            <Lightbulb className="h-7 w-7 text-white" />
          </div>
          <h2 className="font-display text-4xl font-bold md:text-5xl">
            Cuéntanos tu proyecto o tu idea, <br />
            <span className="text-gradient">nosotros nos encargamos de todo.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            Desde la primera conversación hasta el lanzamiento y la evolución de tu producto.
            Estrategia, diseño, desarrollo e IA en un único equipo.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-gradient-brand glow border-0">
              <a href="#contacto">Cuéntanos tu idea <ArrowRight className="ml-1 h-4 w-4" /></a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

const uxMethods = [
  { icon: Layers,            label: "Business Origami" },
  { icon: Mic,               label: "Entrevistas" },
  { icon: LayoutGrid,        label: "Card Sorting" },
  { icon: ClipboardList,     label: "Encuestas" },
  { icon: ClipboardCheck,    label: "Evaluación Heurística" },
  { icon: BarChart2,         label: "Kano Análisis" },
  { icon: MousePointer2,     label: "Prueba de Usabilidad" },
  { icon: Eye,               label: "Eye Tracking" },
  { icon: GitBranch,         label: "A/B Testing" },
  { icon: MousePointerClick, label: "Primer Click" },
  { icon: Activity,          label: "Benchmarking" },
  { icon: Heart,             label: "Mapa de Empatía" },
  { icon: Focus,             label: "POV (Point of View)" },
  { icon: Rocket,            label: "MVP (Minimum Viable Product)" },
  { icon: Film,              label: "Story Board" },
  { icon: BookOpen,          label: "Story Telling" },
];

function UxMethodCarousel() {
  const [index, setIndex] = useState(0);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setFlipping(true), 2800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!flipping) return;
    const id = setTimeout(() => {
      setIndex((i) => (i + 1) % uxMethods.length);
      setFlipping(false);
    }, 320);
    return () => clearTimeout(id);
  }, [flipping]);

  return (
    <div className="mt-8">
      <div style={{ perspective: "1000px" }}>
        <div
          onClick={() => !flipping && setFlipping(true)}
          style={{
            transformStyle: "preserve-3d",
            transform: flipping ? "rotateY(90deg)" : "rotateY(0deg)",
            transition: "transform 0.3s ease-in-out",
          }}
          className="relative overflow-hidden rounded-2xl glass cursor-pointer select-none px-7 py-6"
        >
          <div className="flex items-center gap-4">
            <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-brand">
              {(() => { const { icon: Icon } = uxMethods[index]; return <Icon className="h-5 w-5 text-white" />; })()}
            </div>
            <p className="font-display text-xl font-bold leading-snug">{uxMethods[index].label}</p>
          </div>
          <div className="mt-5">
            <div className="h-0.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-brand transition-all duration-500"
                style={{ width: `${((index + 1) / uxMethods.length) * 100}%` }}
              />
            </div>
          </div>
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-brand/20 blur-3xl" />
        </div>
      </div>
    </div>
  );
}

function UXMatters() {
  const stats = [
    { icon: TrendingDown, n: "70%", t: "de los productos digitales fracasan", d: "por no validar la experiencia con usuarios reales antes de construir." },
    { icon: Search, n: "100x", t: "más caro corregir después", d: "Resolver un problema en producción cuesta 100 veces más que detectarlo en research." },
    { icon: Sparkles, n: "+200%", t: "en conversión", d: "Un buen diseño UX puede más que duplicar las tasas de conversión de un producto." },
  ];
  return (
    <section id="ux" className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-accent">La importancia del UX/UI</p>
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            La mayoría de los proyectos fracasan por <span className="text-gradient">no invertir en investigación</span>.
          </h2>
          <p className="mt-5 text-muted-foreground">
            Construir sin entender al usuario es la forma más rápida y costosa de equivocarse.
            Una buena investigación previa define qué construir, para quién y por qué — antes
            de escribir una sola línea de código.
          </p>
          <p className="mt-4 text-muted-foreground">
            En Boost Experiences ponemos el research y la estrategia en el centro: validamos hipótesis,
            entendemos comportamientos y diseñamos experiencias que la gente realmente quiere usar.
          </p>
          <UxMethodCarousel />
        </div>
        <div className="grid gap-4">
          {stats.map(({ icon: Icon, n, t, d }) => (
            <div key={t} className="flex gap-5 rounded-2xl glass p-6">
              <div className="flex-none">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand">
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-gradient">{n}</div>
                <div className="mt-1 font-semibold">{t}</div>
                <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Web3() {
  const items = [
    { icon: Blocks, t: "Smart Contracts", d: "Diseño y desarrollo de contratos inteligentes seguros y auditados." },
    { icon: Link2, t: "Integraciones on-chain", d: "Conectamos tu app a wallets, tokens y protocolos DeFi líderes." },
    { icon: ShieldCheck, t: "dApps & NFTs", d: "Aplicaciones descentralizadas y experiencias NFT con UX impecable." },
  ];
  return (
    <section id="web3" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-brand-deep via-background to-background p-10 md:p-16">
          <div className="absolute -right-32 top-10 h-80 w-80 rounded-full bg-brand/30 blur-3xl" />
          <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative">
            {/* MetaMask 3D logo — top right */}
            <div className="absolute -top-6 right-0 hidden lg:block">
              <MetamaskLogo className="w-[200px] h-[200px]" />
            </div>
            <p className="mb-3 text-sm font-medium uppercase tracking-wider text-accent">Web 3.0 · Blockchain</p>
            <h2 className="font-display text-4xl font-bold md:text-5xl max-w-3xl">
              ¿Quieres llevar tu proyecto a la <span className="text-gradient">Blockchain</span>? <br />
              Llegaste al sitio correcto.
            </h2>
            <p className="mt-5 max-w-2xl text-muted-foreground">
              Diseñamos y desarrollamos productos Web3 con la misma obsesión por la experiencia
              de usuario que aplicamos a la Web tradicional. De la idea al mainnet.
            </p>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {items.map(({ icon: Icon, t, d }) => (
                <div key={t} className="rounded-2xl glass p-6">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold">{t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Button asChild size="lg" className="bg-gradient-brand glow border-0">
                <a href="#contacto">Lleva tu proyecto a Web3 <ArrowRight className="ml-1 h-4 w-4" /></a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="contacto" className="mx-auto max-w-6xl px-6 py-24">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-brand-deep via-background to-background p-10 md:p-16">
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-brand/30 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
        <SmartContactForm />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <div className="flex items-center gap-2">
          <img src={logo.src} alt="Boost Experiences" className="h-12 w-auto" />
          <span className="text-sm text-muted-foreground">© {new Date().getFullYear()} Boost Experiences</span>
        </div>
        <p className="text-xs text-muted-foreground">Diseño · Desarrollo · IA</p>
      </div>
    </footer>
  );
}

export default function Index() {
  return (
    <div className="min-h-screen">
      <CustomCursor key="custom-cursor-v2" />
      <ChatAgent />
      <Nav />
      <main>
        <Hero />
        <Services />
        <UXMatters />
        <Process />
        <WhyUs />
        <Web3 />
        <TellUs />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
