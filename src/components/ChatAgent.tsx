import { useRef, useEffect, useState } from "react";
import { MessageCircle, X, Send, Bot, Sparkles } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const INITIAL_MESSAGE: Message = {
  id: "init",
  role: "assistant",
  content:
    "¡Hola! 👋 Soy Paco, el asistente virtual de **Boost Experiences**. Puedo contarte sobre nuestros servicios, proceso de trabajo, precios y más. ¿En qué puedo ayudarte hoy?",
};

// ─── Markdown-lite renderer ─────────────────────────────────────────────────

function renderMarkdown(text: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
    const rendered = parts.map((part, j) => {
      if (/^\*\*[^*]+\*\*$/.test(part)) {
        return <strong key={j}>{part.slice(2, -2)}</strong>;
      }
      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        return (
          <a
            key={j}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="underline opacity-90 hover:opacity-100"
          >
            {linkMatch[1]}
          </a>
        );
      }
      return part;
    });
    return (
      <span key={i}>
        {rendered}
        {i < lines.length - 1 && <br />}
      </span>
    );
  });
}

// ─── Component ──────────────────────────────────────────────────────────────

// Wrapper: returns null on SSR, only renders after client hydration
export function ChatAgent() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  return <ChatAgentContent />;
}

function ChatAgentContent() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const showTyping = isLoading && messages[messages.length - 1]?.role === "user";

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showTyping]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    setInput("");
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    const history = [...messages, userMsg];
    setMessages(history);
    setIsLoading(true);

    const botId = String(Date.now() + 1);

    try {
      abortRef.current = new AbortController();

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history
            .filter((m) => m.id !== "init")
            .map(({ role, content }) => ({ role, content })),
        }),
        signal: abortRef.current.signal,
      });

      if (!response.ok) {
        const errBody = await response.json().catch(() => ({ error: "API error" })) as { error?: string };
        throw new Error(errBody.error ?? "API error");
      }

      setMessages((prev) => [...prev, { id: botId, role: "assistant", content: "" }]);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          setMessages((prev) =>
            prev.map((m) => (m.id === botId ? { ...m, content: m.content + chunk } : m))
          );
        }
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        let errorMsg = "Lo siento, ocurrió un error. Por favor intentá de nuevo.";
        try {
          const text = err instanceof Error ? err.message : String(err);
          if (text.includes("quota") || text.includes("429")) {
            errorMsg = "⏳ El asistente está temporalmente ocupado por límite de requests. Intentá en unos minutos.";
          }
        } catch {}
        // Try to parse error from a JSON response body
        if (typeof err === "object" && err !== null && "text" in err) {
          try {
            const parsed = JSON.parse((err as { text: string }).text);
            if (parsed?.error) errorMsg = parsed.error;
          } catch {}
        }
        setMessages((prev) =>
          prev.map((m) =>
            m.id === botId ? { ...m, content: errorMsg } : m
          )
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  };

  return (
    <>
      {/* ── Chat panel ── */}
      <div
        className={`fixed bottom-24 right-6 z-50 flex w-[340px] flex-col overflow-hidden rounded-2xl border border-white/15 shadow-2xl transition-all duration-300 md:w-[380px] ${
          open
            ? "max-h-[520px] opacity-100 translate-y-0 pointer-events-auto"
            : "max-h-0 opacity-0 translate-y-4 pointer-events-none"
        }`}
        style={{ background: "hsl(var(--background) / 0.85)", backdropFilter: "blur(20px)" }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-brand-deep to-brand/80 px-4 py-3">
          <div className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-white/15">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white leading-tight">Paco · Asistente IA</p>
            <p className="text-[11px] text-white/70 leading-tight">Responde al instante · Powered by Gemini</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="flex h-7 w-7 flex-none items-center justify-center rounded-lg text-white/70 transition hover:bg-white/15 hover:text-white"
            aria-label="Cerrar chat"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ maxHeight: "360px" }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-gradient-brand mt-0.5">
                  <Bot className="h-3.5 w-3.5 text-white" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-gradient-brand text-white rounded-br-sm"
                    : "bg-white/8 border border-white/10 text-foreground rounded-bl-sm"
                }`}
              >
                {renderMarkdown(msg.content)}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {showTyping && (
            <div className="flex gap-2 justify-start">
              <div className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-gradient-brand mt-0.5">
                <Bot className="h-3.5 w-3.5 text-white" />
              </div>
              <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-white/10 bg-white/8 px-4 py-3">
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0ms]" />
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-white/10 px-3 py-3">
          <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 transition focus-within:border-brand/60 focus-within:bg-white/8">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu consulta..."
              disabled={isLoading}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none disabled:opacity-50"
            />
            <button
              onClick={() => void sendMessage()}
              disabled={!input.trim() || isLoading}
              className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-gradient-brand text-white transition disabled:opacity-40 hover:opacity-90 active:scale-95"
              aria-label="Enviar mensaje"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="mt-1.5 text-center text-[10px] text-muted-foreground/60">
            Powered by Boost Experiences · Gemini AI
          </p>
        </div>
      </div>

      {/* ── Floating button ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar asistente" : "Abrir asistente"}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand shadow-lg shadow-brand/40 transition-all duration-300 hover:scale-110 active:scale-95 ${
          open ? "rotate-0" : "animate-pulse-slow"
        }`}
        style={{ boxShadow: "0 0 24px hsl(var(--brand) / 0.5)" }}
      >
        {open ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </button>
    </>
  );
}
