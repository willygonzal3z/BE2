import { useState, useEffect } from "react";
import { Turnstile } from '@marsidev/react-turnstile';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { ArrowRight, Loader2, CheckCircle2, Sparkles, MessageCircle } from "lucide-react";

const serviceOptions = [
  "Diseño UX/UI",
  "Desarrollo Web",
  "Apps Móviles",
  "Automatizaciones e Integraciones",
  "IA Aplicada",
  "Web 3.0 / Blockchain",
  "Consultoría de Producto",
  "Otro",
];

const formSchema = z.object({
  name: z.string().trim().min(1, "Ingresa tu nombre").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  service: z.string().min(1, "Selecciona un servicio"),
  message: z.string().trim().min(1, "Cuéntanos sobre tu proyecto").max(1000),
});

export function SmartContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isDevelopment, setIsDevelopment] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      if (hostname === "localhost" || hostname === "127.0.0.1") {
        setIsDevelopment(true);
      }
    }
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      service: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!captchaToken) {
      toast.error("Por favor completa el Captcha antes de enviar.");
      return;
    }
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          'cf-turnstile-response': captchaToken,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        toast.success("¡Mensaje enviado con éxito!");
        
        // WhatsApp Redirect after success (Optional, keeping from index.tsx logic)
        const text = `Hola Boost Experiences, soy ${values.name} (${values.email}).\nServicio de interés: ${values.service}\n\n${values.message}`;
        const url = `https://wa.me/5491170626021?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank", "noopener,noreferrer");
        
        form.reset();
        setCaptchaToken(null);
      } else {
        toast.error(data.error || "Hubo un problema al enviar tu mensaje.");
      }
    } catch (error) {
      toast.error("Error de conexión. Por favor intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 rounded-2xl glass p-10 border border-brand/20 bg-brand/5 backdrop-blur-xl animate-fade-up">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-brand shadow-2xl glow">
          <CheckCircle2 className="h-10 w-10 text-white" />
          <div className="absolute -top-2 -right-2 h-6 w-6 animate-bounce rounded-full bg-accent flex items-center justify-center shadow-lg">
             <Sparkles className="h-3 w-3 text-white" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-foreground">¡Solicitud recibida!</h3>
          <p className="text-muted-foreground">
            Gracias por confiar en Boost Experiences. <br />
            Te contactaremos en menos de 24 horas.
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setIsSuccess(false)}
          className="border-white/10 hover:bg-white/5"
        >
          Enviar otro mensaje
        </Button>
      </div>
    );
  }

  return (
    <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
      <div className="flex flex-col items-start gap-4">
        <h2 className="font-display text-4xl font-bold md:text-5xl">
          ¿Listo para <span className="text-gradient">despegar</span>?
        </h2>
        <p className="mt-2 text-muted-foreground">
          Cuéntanos sobre tu proyecto. Te respondemos en menos de 24 horas con una propuesta
          de descubrimiento sin costo.
        </p>
        <Button asChild size="lg" className="bg-gradient-brand glow border-0 mt-2">
          <a href="https://wa.me/5491170626021" target="_blank" rel="noopener noreferrer">
            <MessageCircle className="mr-2 h-4 w-4" /> +54 11 7062 6021
          </a>
        </Button>
        <p className="text-xs text-muted-foreground">Respondemos en menos de 24 hs</p>
      </div>

      <div className="rounded-2xl glass p-6 border border-white/10 bg-background/50 backdrop-blur-md shadow-xl transition-all hover:border-white/20">
        <Form {...form}>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit(onSubmit)(e);
            }} 
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground/70">Nombre completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Tu nombre" className="bg-white/5 border-white/10 focus:border-brand/50 transition-all" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground/70">Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="tu@email.com" className="bg-white/5 border-white/10 focus:border-brand/50 transition-all" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground/70">Servicio de interés</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-white/5 border-white/10 focus:border-brand/50 transition-all">
                        <SelectValue placeholder="Selecciona un servicio" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-background/95 backdrop-blur-xl border-white/10">
                      {serviceOptions.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground/70">Cuéntanos tu proyecto</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe tu idea o necesidad..."
                      className="resize-none bg-white/5 border-white/10 min-h-[100px] focus:border-brand/50 transition-all"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-center py-2 transition-opacity">
              <Turnstile 
                siteKey={isDevelopment ? "1x00000000000000000000AA" : (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA")}
                onSuccess={(token) => setCaptchaToken(token)}
                options={{ theme: 'dark', size: 'flexible' }}
              />
            </div>

            <Button 
              type="submit"  
              className="w-full bg-gradient-brand shadow-lg shadow-brand/20 glow border-0 mt-2 py-6 text-lg transition-all hover:scale-[1.02] active:scale-95" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Procesando...
                </>
              ) : (
                <>
                  Enviar mensaje <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
            <p className="text-center text-[10px] text-muted-foreground/40">
              Al enviar aceptas nuestra{" "}
              <a href="/privacidad" target="_blank" rel="noopener noreferrer" className="underline hover:text-accent transition-colors">
                política de privacidad
              </a>
              .
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
