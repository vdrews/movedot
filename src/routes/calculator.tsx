import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Plane, ArrowRight } from "lucide-react";
import { PageHeader, Section, SampleNote } from "@/components/Section";
import { ProductSearch } from "@/components/ProductSearch";
import { PartnerLinks } from "@/components/PartnerLinks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CARGO_TYPES, ORIGINS, PARISHES, quote } from "@/lib/rates";

const jmd = new Intl.NumberFormat("en-JM", { style: "currency", currency: "JMD", maximumFractionDigits: 0 });

export const Route = createFileRoute("/calculator")({
  head: () => ({
    meta: [
      { title: "Quote Calculator — Shipping to Jamaica | MoveDot" },
      {
        name: "description",
        content:
          "Estimate your MoveDot air freight cost in seconds: origin warehouse, destination parish and weight — priced per lb in JMD.",
      },
      { property: "og:title", content: "MoveDot Quote Calculator" },
      { property: "og:description", content: "Instant air freight estimates for shipments to Jamaica, priced per lb." },
    ],
  }),
  component: Calculator,
});

function Calculator() {
  const [originId, setOriginId] = useState("mia");
  const [parish, setParish] = useState("Kingston");
  const [weight, setWeight] = useState("12");
  const [cargoId, setCargoId] = useState("box");

  const w = Number(weight) || 0;
  const result = quote({ weight: w, originId, parish, cargoId });

  return (
    <>
      <PageHeader
        eyebrow="Quote calculator"
        title="Price your shipment in under a minute."
        description="Air freight, priced per lb in JMD. Estimates use the same rate table published on our Rates page — no separate maths, no surprise number."
      />

      <Section>
        <div className="space-y-3">
          <h2 className="text-lg ">Not sure what you're shipping yet?</h2>
          <p className="text-sm text-muted-foreground">
            Search for an item to find it on Amazon, Shein, Fashion Nova and more — then come back down to quote the
            shipping cost.
          </p>
          <ProductSearch />
          <PartnerLinks />
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader>
              <CardTitle>Shipment details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 p-4">
                <Plane className="size-4 text-primary" />
                <div>
                  <p className="text-sm font-semibold">Air Express</p>
                  <p className="text-xs text-muted-foreground">As fast as 24 hours, door to door</p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="origin">Origin warehouse</Label>
                  <Select value={originId} onValueChange={setOriginId}>
                    <SelectTrigger id="origin">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ORIGINS.map((o) => (
                        <SelectItem key={o.id} value={o.id}>
                          {o.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parish">Destination parish</Label>
                  <Select value={parish} onValueChange={setParish}>
                    <SelectTrigger id="parish">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PARISHES.map((p) => (
                        <SelectItem key={p} value={p}>
                          {p}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (lb)</Label>
                  <Input
                    id="weight"
                    type="number"
                    min={0}
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cargo">Cargo type</Label>
                  <Select value={cargoId} onValueChange={setCargoId}>
                    <SelectTrigger id="cargo">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CARGO_TYPES.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="h-fit border-primary/30 bg-secondary/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Your estimate</CardTitle>
                <Badge className="gap-1">
                  <Plane className="size-3" />
                  Air Express
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-display text-4xl">{jmd.format(result.total)}</p>
                <p className="text-sm text-muted-foreground">Estimated total, JMD</p>
              </div>
              <Separator />
              <dl className="space-y-2 text-sm">
                {[
                  ["Billed weight", `${result.billedWeight} lb`],
                  ["Freight", jmd.format(result.freight)],
                  ["Cargo factor", `× ${result.cargoMultiplier.toFixed(2)}`],
                  ["Origin surcharge", jmd.format(result.originSurcharge)],
                  ["Outer-parish handoff", jmd.format(result.outerParishFee)],
                  ["Estimated transit", result.transit],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="text-right font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
              <Button asChild className="w-full" size="lg">
                <Link to="/signup">
                  Book this shipment <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="ghost" className="w-full">
                <Link to="/rates">See the full rate table</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <SampleNote>
          Sample rates — final pricing confirmed at checkout. TODO: swap the figures in <code>src/lib/rates.ts</code>{" "}
          (shared by this calculator and the Rates page) for real per-lb JMD pricing, including duties and customs
          charges, which are not yet included here.
        </SampleNote>
      </Section>
    </>
  );
}