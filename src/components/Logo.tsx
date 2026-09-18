import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import movedotlogo from "./../assets/movedot.svg";

export function Logo({ className, compact }: { className?: string; compact?: boolean }) {
  return (
    <Link
      to="/"
      className={cn("group flex items-center gap-2.5", className)}
      aria-label="MoveDot home"
    >
      <img
        src={movedotlogo}
        alt="MoveDot logo"
        className="h-85 w-auto"
      />

    
    </Link>
  );
}