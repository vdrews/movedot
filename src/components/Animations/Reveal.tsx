// src/components/Reveal.tsx
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealVariant =
  | "rise"
  | "blur"
  | "fade"
  | "left-pan"
  | "right-pan"
  | "scale-up"
  | "flip-up";

type RevealProps = {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number; // ms
};

export function Reveal({ children, className, variant = "rise", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const variants: Record<RevealVariant, string> = {
    rise: isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
    blur: isVisible
      ? "blur-0 opacity-100 scale-100"
      : "blur-md opacity-0 scale-95",
    fade: isVisible ? "opacity-100" : "opacity-0",
    "left-pan": isVisible
      ? "translate-x-0 opacity-100"
      : "-translate-x-12 opacity-0",
    "right-pan": isVisible
      ? "translate-x-0 opacity-100"
      : "translate-x-12 opacity-0",
    "scale-up": isVisible
      ? "scale-100 opacity-100"
      : "scale-75 opacity-0",
    "flip-up": isVisible
      ? "[transform:perspective(800px)_rotateX(0deg)] opacity-100"
      : "[transform:perspective(800px)_rotateX(35deg)] opacity-0",
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-700 ease-out",
        variants[variant],
        className
      )}
    >
      {children}
    </div>
  );
}