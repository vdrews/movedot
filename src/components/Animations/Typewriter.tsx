// src/components/Typewriter.tsx
import { useEffect, useRef, useState } from "react";

type TypewriterProps = {
  text: string;
  className?: string;
  speed?: number; // ms per character
  startOnView?: boolean; // only start typing once scrolled into view
};

export function Typewriter({
  text,
  className,
  speed = 40,
  startOnView = true,
}: TypewriterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(!startOnView);
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!startOnView) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [startOnView]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;

    const timeout = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);

    return () => clearTimeout(timeout);
  }, [started, displayed, text, speed]);

  return (
    <span ref={ref} className={className}>
      {displayed}
      {started && displayed.length < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
}