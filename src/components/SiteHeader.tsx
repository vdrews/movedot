import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sun, Moon, Menu} from 'lucide-react';
import { useState, useEffect } from "react";

function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return [isDark, setIsDark] as const;
}


const NAV = [
  { to: "/calculator", label: "Calculator" },
  { to: "/faqs", label: "FAQs" },
  { to: "/rates", label: "Rates" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
   const [isDark, setIsDark] = useDarkMode();
  return (


    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/85 backdrop-blur">

      

      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-5 py-3">
      


        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground data-[status=active]:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="ghost" size="sm">
            <Link to="/track">Track shipment</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/signup">Sign up for free</Link>
          </Button>

          <button onClick={() => setIsDark(!isDark)}>
            {isDark ? <Sun className="h-3"/> : <Moon className="h-3"/>}
          </button>

        </div>
             <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <div className="mt-10 flex flex-col gap-1 px-4">
              {[...NAV, { to: "/services", label: "Services" }, { to: "/how-it-works", label: "How it works" }].map(
                (item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="rounded-md px-3 py-2.5 text-base font-medium text-foreground hover:bg-secondary"
                  >
                    {item.label}
                  </Link>
                ),
              )}
              <Button asChild variant="outline" className="mt-4">
                <Link to="/track">Track shipment</Link>
              </Button>
              <Button asChild className="mt-2">
                <Link to="/signup">Sign up for free</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
     
      </div>
    </header>
  );
}





