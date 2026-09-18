import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Search, Plane, Ship, PackageSearch } from "lucide-react";
import { PageHeader, Section, SampleNote } from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/track")({
  head: () => ({
    meta: [
      { title: "Track a Shipment | MoveDot" },
      {
        name: "description",
        content: "Enter your MoveDot tracking number for live status from US warehouse intake to collection in Jamaica.",
      },
      { property: "og:title", content: "Track a MoveDot Shipment" },
      { property: "og:description", content: "Live status from warehouse intake to handover in Jamaica." },
    ],
  }),
  component: Track,
});

/* TODO: SAMPLE DATA — replace with live tracking API results. */
const SAMPLE = {
  id: "MD-4471-JA",
  mode: "air" as const,
  route: "Miami (MIA) → Kingston (KIN)",
  weight: "12.4 lb",
  eta: "In 2 days",
  events: [
    { label: "Received at Miami warehouse", when: "Mon 09:12", state: "done" },
    { label: "Weighed and manifested", when: "Mon 16:40", state: "done" },
    { label: "Departed MIA on flight", when: "Tue 06:05", state: "done" },
    { label: "Customs clearance, Kingston", when: "In progress", state: "active" },
    { label: "Ready for collection", when: "Pending", state: "todo" },
  ],
};

function Track() {
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(false);

  return (
    <>
      <PageHeader
        eyebrow="Tracking"
        title="Where is it right now?"
        description="Every scan from US warehouse intake to handover in Jamaica, on one timeline."
      />
      <Section>
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Track a shipment</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setShown(true);
                }}
              >
                <Input
                  placeholder="e.g. MD-4471-JA"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Tracking number"
                />
                <Button type="submit" className="w-full">
                  Track <Search />
                </Button>
              </form>
              <p className="mt-4 text-xs text-muted-foreground">
                No account needed. For a full history of every shipment,{" "}
                <Link to="/login" className="font-medium text-primary hover:underline">
                  log in
                </Link>
                .
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <PackageSearch className="size-5 text-primary" />
                  {shown && query ? query.toUpperCase() : SAMPLE.id}
                </CardTitle>
                <Badge className="gap-1">
                  {SAMPLE.mode === "air" ? <Plane className="size-3" /> : <Ship className="size-3" />}
                  Air Express
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap justify-between gap-3 text-sm">
                <span className="text-muted-foreground">{SAMPLE.route}</span>
                <span className="text-muted-foreground">{SAMPLE.weight}</span>
              </div>
              <Separator />
              <ol className="space-y-4">
                {SAMPLE.events.map((e) => (
                  <li key={e.label} className="flex items-start gap-3 text-sm">
                    <span
                      className={
                        e.state === "done"
                          ? "mt-1.5 size-2.5 rounded-full bg-primary"
                          : e.state === "active"
                            ? "mt-1.5 size-2.5 animate-pulse rounded-full bg-accent"
                            : "mt-1.5 size-2.5 rounded-full bg-border"
                      }
                    />
                    <span className="flex-1">
                      <span className={e.state === "todo" ? "text-muted-foreground" : "text-foreground"}>{e.label}</span>
                      <span className="block text-xs text-muted-foreground">{e.when}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <Separator />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Estimated handover</span>
                <span className="font-semibold">{SAMPLE.eta}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <SampleNote>
          TODO: this page shows a sample shipment regardless of the tracking number entered — connect it to the real
          tracking system.
        </SampleNote>
      </Section>
    </>
  );
}
