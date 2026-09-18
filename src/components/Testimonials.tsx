import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

/** TODO: SAMPLE TESTIMONIALS — swap for real customer quotes with permission. */
export const TESTIMONIALS = [
  {
    quote:
      "I ordered a replacement laptop part on a Monday and had it in my hand in Kingston the next Monday. Five days, tracked the whole way. That's the fastest anyone has moved anything for me.",
    name: "Andre W.",
    role: "IT contractor, Kingston",
    service: "Air Express",
  },
  {
    quote:
      "We run a small pharmacy and air freight with MoveDot is the only reason our time-sensitive stock arrives on schedule. Customs is handled before we even ask about it.",
    name: "Simone P.",
    role: "Pharmacy owner, Montego Bay",
    service: "Air Express",
  },
  {
    quote:
      "Two barrels a month from Fort Lauderdale for the shop. It's not fast — and they never pretended it was — but the price is fixed and nothing has ever gone missing.",
    name: "Delroy B.",
    role: "Retailer, Portmore",
    service: "Barrel & Sea",
  },
];

export function Testimonials({ limit }: { limit?: number }) {
  const items = limit ? TESTIMONIALS.slice(0, limit) : TESTIMONIALS;
  return (
    <div className="grid gap-5  md:grid-cols-3">
      {items.map((t) => (
        <Card key={t.name} className="h-full border-border/70">
          <CardContent className="flex h-full flex-col gap-4 pt-2">
            <div className="flex items-center gap-1 text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
            <p className="flex-1 text-sm leading-relaxed text-foreground/90">“{t.quote}”</p>
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
              <Badge variant="secondary">{t.service}</Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
