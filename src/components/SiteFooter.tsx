import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Separator } from "@/components/ui/separator";

const COLUMNS = [
  {
    title: "Ship",
    links: [
      { to: "/services", label: "Services" },
      { to: "/calculator", label: "Quote calculator" },
      { to: "/rates", label: "Rates" },
      { to: "/track", label: "Track a shipment" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/how-it-works", label: "How it works" },
      { to: "/faqs", label: "FAQs" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Account",
    links: [
      { to: "/signup", label: "Sign up for free" },
      { to: "/login", label: "Log in" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Air and sea freight from Miami, Fort Lauderdale and New York/New Jersey to all 14 parishes of Jamaica —
              one operator, end to end.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm text-foreground">{col.title}</h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} MoveDot. Every Package, Every Move.</p>
          {/* TODO: replace with real contact details */}
          <p>hello@movedot.com · +1 (876) 000-0000 · Sample contact details</p>
        </div>
      </div>
    </footer>
  );
}
