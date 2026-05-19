import { useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };

export function CustomCursor() {
  const pointerRef = useRef<Point>({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dot, setDot] = useState<Point>({ x: 0, y: 0 });
  const [ring, setRing] = useState<Point>({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    const start = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    pointerRef.current = start;
    setDot(start);
    setRing(start);
    setEnabled(true);
    document.documentElement.classList.add("cursor-none-root");

    const onMove = (e: MouseEvent) => {
      const next = { x: e.clientX, y: e.clientY };
      pointerRef.current = next;
      setDot(next);
      setVisible(true);

      const target = e.target as HTMLElement | null;
      setHover(!!target?.closest("a,button,[role='button'],input,textarea,select,label"));
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("cursor-none-root");
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let frame = 0;

    const animate = () => {
      setRing((current) => ({
        x: current.x + (pointerRef.current.x - current.x) * 0.18,
        y: current.y + (pointerRef.current.y - current.y) * 0.18,
      }));
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [enabled]);

  return (
    <>
      <div
        aria-hidden="true"
        data-testid="custom-cursor-dot"
        className="pointer-events-none fixed z-[2147483647] h-3 w-3 rounded-full"
        style={{
          left: dot.x,
          top: dot.y,
          transform: "translate3d(-50%, -50%, 0)",
          opacity: enabled && visible ? 1 : 0,
          background: "var(--brand-glow)",
          boxShadow: "0 0 14px 2px var(--brand-glow), 0 0 28px 6px var(--brand)",
          transition: "opacity 160ms ease-out",
        }}
      />
      <div
        aria-hidden="true"
        data-testid="custom-cursor-ring"
        className="pointer-events-none fixed z-[2147483647] rounded-full transition-[width,height,opacity,border-color,box-shadow] duration-200"
        style={{
          left: ring.x,
          top: ring.y,
          transform: "translate3d(-50%, -50%, 0)",
          width: hover ? 56 : 32,
          height: hover ? 56 : 32,
          opacity: enabled && visible ? (hover ? 1 : 0.92) : 0,
          border: "1.5px solid var(--brand-glow)",
          boxShadow: "0 0 24px -2px var(--brand-glow), inset 0 0 12px -4px var(--brand-glow)",
          transition: "width 200ms ease, height 200ms ease, opacity 160ms ease-out, border-color 200ms ease, box-shadow 200ms ease",
        }}
      />
    </>
  );
}
