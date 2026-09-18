// src/components/Parallax.tsx
import { useEffect, useRef, type ReactNode } from "react";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  speed?: number; // -1 to 1. Negative = moves up as you scroll down, positive = moves down
};

export function Parallax({ children, className, speed = 0.3 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const windowCenter = window.innerHeight / 2;
      const elCenter = rect.top + rect.height / 2;
      const distanceFromCenter = elCenter - windowCenter;
      el.style.transform = `translateY(${distanceFromCenter * speed * -1}px)`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}