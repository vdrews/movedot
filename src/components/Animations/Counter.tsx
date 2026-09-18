// src/components/Counter.tsx
import { useEffect, useRef, useState } from "react";

type CounterProps = {
  from?: number;      // starting number
  to: number;          // number to stop at
  duration?: number;   // ms, how long the animation takes
  startOnView?: boolean;
  prefix?: string;     // e.g. "$"
  suffix?: string;     // e.g. "+", "%", "kg"
  decimals?: number;   // decimal places to show
  className?: string;
};

export function Counter({
  from = 0,
  to,
  duration = 1500,
  startOnView = true,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(from);
  const [started, setStarted] = useState(!startOnView);

  useEffect(() => {
    if (!startOnView) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry || !entry.isIntersecting) return;

        setStarted(true);
        observer.unobserve(el);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [startOnView]);

  useEffect(() => {
    if (!started) return;

    let rafId: number;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // ease-out cubic: fast start, slow finish
      const eased = 1 - Math.pow(1 - progress, 3);

      const current = from + (to - from) * eased;
      setValue(current);

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setValue(to); // snap exactly to target at the end
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [started, from, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}