import { Link, createFileRoute } from "@tanstack/react-router";
import { Plane, ArrowRight } from "lucide-react";
import { PageHeader, Section, SampleNote } from "@/components/Section";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WEIGHT_RATE_TABLE, ORIGINS, TRANSIT, OUTER_PARISH_FEE } from "@/lib/rates";

const jmd = new Intl.NumberFormat("en-JM", { style: "currency", currency: "JMD", maximumFractionDigits: 0 });

export const Route = createFileRoute("/rates")({
  head: () => ({
    meta: [
      { title: "Shipping Rates to Jamaica — Air Express | MoveDot" },
      {
        name: "description",
        content: "MoveDot air freight rates per lb, in JMD, from Miami, Fort Lauderdale and New York to Jamaica.",
      },
      { property: "og:title", content: "MoveDot Shipping Rates" },
      { property: "og:description", content: "Rates per lb for air freight to Jamaica." },
    ],
  }),
  component: Rates,
});

function Rates() {
  return (
    <>
      <PageHeader eyebrow="Rates" title="Rates per lb." description="Air Express, priced in JMD." />
      <Section>
        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <CardTitle className="flex items-center gap-1.5">
                <Plane className="size-4" /> Air Express
              </CardTitle>
              <Badge variant="secondary">{TRANSIT}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Weight (lb)</TableHead>
                  <TableHead>Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {WEIGHT_RATE_TABLE.map((rate, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{i + 1}</TableCell>
                    <TableCell>{jmd.format(rate)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <SampleNote>
          Sample rates — final pricing confirmed at checkout. TODO: replace every figure on this page (and in{" "}
          <code>src/lib/rates.ts</code>, which the calculator reads from) with confirmed MoveDot pricing.
        </SampleNote>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Origin surcharges</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              {ORIGINS.map((o) => (
                <div key={o.id} className="flex justify-between">
                  <span>{o.label}</span>
                  <span className="font-medium text-foreground">
                    {o.surcharge ? `+ ${jmd.format(o.surcharge)}` : "No surcharge"}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Parish coverage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>
                Collection hubs in Kingston, St. Andrew, St. Catherine and St. James. All other parishes are served via
                an outer-parish handoff (+ {jmd.format(OUTER_PARISH_FEE)} sample fee).
              </p>
              <p className="text-xs">TODO: confirm handoff fee.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Business & wholesale</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>Commercial volume, pallets and repeat lanes are quote-based, not table-priced.</p>
              <Button asChild size="sm" variant="outline">
                <Link to="/contact">
                  Request a quote <ArrowRight />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-10">
          <Button asChild size="lg">
            <Link to="/calculator">Price my shipment</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}