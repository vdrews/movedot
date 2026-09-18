import { Link, createFileRoute } from "@tanstack/react-router";
import { Plane, Ship, Truck, Building2, ShoppingBag, ArrowRight } from "lucide-react";
import { PageHeader, Section, SampleNote } from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Air, Sea & Business Freight | MoveDot" },
      {
        name: "description",
        content:
          "MoveDot services: Air Express in about 5 days, barrel and sea freight, last-mile delivery, business wholesale, and free US package forwarding.",
      },
      { property: "og:title", content: "MoveDot Services — Air, Sea & Business Freight" },
      {
        property: "og:description",
        content: "Air Express, barrel and sea freight, business wholesale and US package forwarding to Jamaica.",
      },
    ],
  }),
  component: Services,
});

/*
 * NAMING OPTIONS for the "Personal Shopping" service (final name not locked yet):
 *   1. PersonalShopper
 *   2. MyMoveDot Address
 *   3. ShopIt Forward
 *   4. US Direct
 * Live copy currently defaults to "Personal Shopping".
 */

const SERVICES = [
  {
    icon: Plane,
    title: "Air Express",
    badge: "≈ 5 business days",
    flagship: true,
    body: "Our flagship service. Fast, reliable air freight for time-sensitive packages, documents and high-value parcels — roughly 5 business days door to door, from the US warehouse through Jamaican customs to handover. Every leg is scanned and tracked.",
    points: ["Time-sensitive parcels & documents", "High-value goods with declared-value cover", "Customs handled by our in-house brokers"],
  },
  {
    icon: Ship,
    title: "Barrel & Sea Freight",
    badge: "2+ weeks transit",
    body: "Weekly ocean consolidations from Florida and New York to Kingston and Montego Bay, priced at fixed rates by barrel. Transit takes longer than two weeks — this is the budget-friendly, bulk option for shippers who aren't in a rush, not a fast lane.",
    points: ["Fixed per-barrel pricing", "Weekly sailings from FL and NY", "Best for household goods and bulk stock"],
  },
  {
    icon: Truck,
    title: "Last-Mile Delivery",
    badge: "Coming soon",
    body: "Door-to-door delivery across all 14 parishes — details coming soon. We're finalising routes and partner coverage, so we're not quoting turnaround times yet.",
    points: ["All 14 parishes planned", "Scheduled and on-demand options under review"],
    cta: { label: "Notify me", to: "/contact" as const },
  },
  {
    icon: Building2,
    title: "Business & Wholesale",
    badge: "Quote-based",
    body: "Dedicated commercial clearing, bulk rates and a shipper API/portal built for retailers, manufacturers and hospitality groups moving repeat volume.",
    points: ["Named account manager", "Commercial clearing & documentation", "Shipper API and portal access"],
    cta: { label: "Request a quote", to: "/contact" as const },
  },
  {
    icon: ShoppingBag,
    title: "Personal Shopping",
    badge: "Free US address",
    body: "A free US shipping address so you can shop any US store online and have your order forwarded to Jamaica. Consolidate multiple orders into one shipment and choose air or sea at checkout.",
    points: ["Free to sign up, no monthly fee", "Consolidation of multiple orders", "Choose air or sea per shipment"],
    cta: { label: "Sign up for free", to: "/signup" as const },
  },
];

function Services() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Air first. Sea when the load is big and the clock isn't."
        description="Five service lines, one operator across the whole journey — US warehouse, freight, customs and handover in Jamaica."
      />
      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          {SERVICES.map((s) => (
            <Card
              key={s.title}
              className={`h-full border-border/70 ${s.flagship ? "ring-2 ring-primary/40" : ""}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <s.icon className="size-7 text-primary" />
                  <div className="flex gap-2">
                    {s.flagship && <Badge>Flagship</Badge>}
                    <Badge variant="secondary">{s.badge}</Badge>
                  </div>
                </div>
                <CardTitle className="mt-3 text-xl">{s.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                <ul className="space-y-1.5">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-2 text-sm text-foreground/90">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                      {p}
                    </li>
                  ))}
                </ul>
                {s.cta && (
                  <Button asChild variant="outline" size="sm">
                    <Link to={s.cta.to}>
                      {s.cta.label} <ArrowRight />
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <SampleNote>
          TODO / open items: Last-Mile Delivery turnaround times are unconfirmed. The &quot;Personal Shopping&quot;
          service name is not final — alternates on the table: PersonalShopper, MyMoveDot Address, ShopIt Forward, US
          Direct.
        </SampleNote>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/calculator">Get instant quote</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/rates">See rates</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
