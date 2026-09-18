import { ShoppingBag, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

/**
 * Static "useful links" boxes — quick shortcuts to popular retailers people
 * ship from. Distinct from ProductSearch (which is query-driven): these
 * just jump straight to each retailer's homepage.
 *
 * Usage:
 *   <PartnerLinks />
 */

type PartnerLink = {
  id: string;
  label: string;
  url: string;
  color: string; // tailwind bg class, roughly matches the brand
};

const PARTNER_LINKS: PartnerLink[] = [
  { id: "amazon", label: "Amazon", url: "https://www.amazon.com", color: "bg-orange-500" },
  { id: "shein", label: "Shein", url: "https://us.shein.com", color: "bg-black" },
  { id: "fashionnova", label: "Fashion Nova", url: "https://www.fashionnova.com", color: "bg-fuchsia-600" },
  { id: "aliexpress", label: "AliExpress", url: "https://www.aliexpress.com", color: "bg-rose-500" },
];

export function PartnerLinks() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {PARTNER_LINKS.map((p) => (
        <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer nofollow">
          <Card className="h-full transition-colors hover:border-primary/40">
            <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
              <span className={`flex size-10 items-center justify-center rounded-full ${p.color} text-white`}>
                <ShoppingBag className="size-5" />
              </span>
              <span className="flex items-center gap-1 text-sm font-medium">
                {p.label}
                <ArrowUpRight className="size-3.5 text-muted-foreground" />
              </span>
            </CardContent>
          </Card>
        </a>
      ))}
    </div>
  );
}
