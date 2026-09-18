import type { ReactNode } from "react";

export function Section({
  eyebrow,
  title,
  description,
  children,
  className = "",
  center,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  center?: boolean;
}) {
  return (
    <section className={`mx-auto w-full max-w-6xl px-5 py-16  md:py-20 ${className}`}>
      {(eyebrow || title || description) && (
        <div className={`mb-10 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
          {eyebrow && (
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent">{eyebrow}</p>
          )}
          {title && <h2 className="text-display text-3xl text-foreground md:text-4xl">{title}</h2>}
          {description && <p className="mt-3 text-base leading-relaxed text-muted-foreground">{description}</p>}
        </div>
      )}
      {children}
    </section>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="border-b border-border bg-hero-mesh">
      <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
        {eyebrow && <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent">{eyebrow}</p>}
        <h1 className="text-display max-w-3xl text-4xl text-foreground md:text-5xl">{title}</h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{description}</p>
        )}
        {children && <div className="mt-7">{children}</div>}
      </div>
    </div>
  );
}

/** Visible marker for numbers/details that still need real operational data. */
export function SampleNote({ children }: { children: ReactNode }) {
  return (
    <p className="mt-4 rounded-lg border border-dashed border-accent/40 bg-accent/5 px-4 py-2.5 text-xs font-medium text-accent">
      {children}
    </p>
  );
}
