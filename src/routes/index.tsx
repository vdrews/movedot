import { Link, createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Animations/Reveal";
import { Parallax } from "@/components/Animations/Parallax";
import { Typewriter } from "@/components/Animations/Typewriter";
import { Counter } from "@/components/Animations/Counter";

import { ArrowRight, Plane, Truck, Building2, ShieldCheck, Timer, MapPin, Radio, Radar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Section } from "@/components/Section";
import { Testimonials } from "@/components/Testimonials";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MoveDot — Air Shipping to Jamaica. Every Package, Every Move." },
      {
        name: "description",
        content:
          "Air freight to Jamaica in as fast as 24 hours. One operator from US warehouse through customs to your door, all 14 parishes.",
      },
      { property: "og:title", content: "MoveDot — Every Package, Every Move" },
      {
        property: "og:description",
        content: "Air freight in as fast as 24 hours, Miami to Kingston or all 14 parishes.",
      },
    ],
  }),
  component: Home,
});

/* TODO: SAMPLE DATA — confirm real operational stats before launch. */
const STATS = [
  { value: "24 hrs", label: "Fastest transit, door to door", icon: Plane },
  { value: "98.4%", label: "On-time delivery, last 90 days", icon: Timer },
  { value: "24 hrs", label: "Average customs turnaround", icon: ShieldCheck },
  { value: "14", label: "Parishes served", icon: MapPin },
];

const SERVICES = [
  {
    icon: Plane,
    title: "Air Express",
    badge: "As fast as 24 hrs",
    body: "Time-sensitive packages, documents and high-value parcels flown from the US and cleared for you.",
  },
  {
    icon: Truck,
    title: "Last-Mile Delivery",
    badge: "Coming soon",
    body: "Door-to-door delivery across all 14 parishes. Details still being finalised.",
  },
  {
    icon: Building2,
    title: "Business & Wholesale",
    badge: "Quote-based",
    body: "Dedicated commercial clearing, bulk rates and a shipper portal for retail, manufacturing and hospitality.",
  },
];

const STEPS = [{ n: "01", title: "Track it, then collect or get it delivered", body: "Live status from the warehouse scan to handover." }];

export function Home() {
  return (
    <>
      {/* Hero */}


  <section className="border-b border-border bg-hero-mesh">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">

   <Reveal variant="scale-up" delay={60}>
          <div>
            <Badge variant="secondary" className="mb-5 gap-1.5">
              <Plane className="size-3.5" /> Air freight
            </Badge>
           <br />
           <Typewriter  className="text-display text-4xl leading-[1.05] text-foreground sm:text-5xl lg:text-[3.6rem]" text="Every package, every move." > </Typewriter>



        
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Air freight from Miami to Kingston — or all 14 parishes — in as fast as{" "}
              <span className="font-semibold text-foreground">24 hours</span>.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/calculator">
                  Get instant quote <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/track">Track a shipment</Link>
              </Button>
            </div>
          </div>

    </Reveal>

          {/* Live tracking feed module — air shipment by default */}
           <Reveal variant="blur" delay={400}>
          <Card className="border-border/70  shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Radio className="size-4 animate-pulse text-primary" /> Live shipment feed
                </CardTitle>
                <Badge className="gap-1">
                  <Plane className="size-3" /> Air
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* TODO: SAMPLE DATA — wire to real tracking once the API is available. */}
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Shipment</p>
                <p className="text-display text-lg">MD-4471-JA</p>
                <p className="text-sm text-muted-foreground">Miami (MIA) → Kingston (KIN) · 12.4 lb</p>
              </div>
              <Separator />
              <ol className="space-y-3">
                {[
                  ["Received at Miami warehouse", "done"],
                  ["Departed MIA on flight", "done"],
                  ["Customs clearance, Kingston", "active"],
                  ["Ready for collection", "todo"],
                ].map(([label, state]) => (
                  <li key={label} className="flex items-center gap-3 text-sm">
                    <span
                      className={
                        state === "done"
                          ? "size-2.5 rounded-full bg-primary"
                          : state === "active"
                            ? "size-2.5 animate-pulse rounded-full bg-accent"
                            : "size-2.5 rounded-full bg-border"
                      }
                    />
                    <span className={state === "todo" ? "text-muted-foreground" : "text-foreground"}>{label}</span>
                  </li>
                ))}
              </ol>
              <Separator />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Estimated handover</span>
                <span className="font-semibold">In 2 days</span>
              </div>
            </CardContent>
          </Card>
          </Reveal>
        </div>

        {/* Stats strip */}
        <Reveal variant="left-pan">
                  <div className="border-t border-border/70 bg-background/60">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 py-8 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="flex items-start gap-3">
                <s.icon className="mt-1 size-5 shrink-0 text-primary" />
                <div>
                  
                  <p className="text-display text-2xl">{s.value}</p>
                  <p className="text-xs leading-snug text-muted-foreground">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
          
        </div>
        </Reveal>
      
        
      </section>
      
     
    

      {/* Services teaser */}

      <Reveal variant="rise" delay={200}>
<Section
        eyebrow="What we move"
        title="Every package, every move."
        description="One team, start to finish. Air freight, every time."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <Card key={s.title} className="h-full border-border/70 transition-shadow hover:shadow-md">
              <CardHeader>
                <s.icon className="size-6 text-primary" />
                <CardTitle className="mt-3 text-lg">{s.title}</CardTitle>
                <Badge variant="secondary" className="mt-1 w-fit">
                  {s.badge}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8">
          <Button asChild variant="outline">
            <Link to="/services">
              See all services <ArrowRight />
            </Link>
          </Button>
        </div>
      </Section>
      </Reveal>
      

      {/* How it works teaser */}
      <div className="border-y border-border bg-secondary/40">
        <Section eyebrow="How it works" title="Track every step, from checkout to collection.">
          <div className="mx-auto max-w-md">
            {STEPS.map((s) => (
              <div key={s.n} className="flex items-start gap-4 rounded-xl border border-border bg-card p-6">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10">
                  <Radar className="size-5 text-primary" />
                </span>
                <div>
                  <h3 className="text-lg">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/signup">Sign up for free</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/how-it-works">
                Full walkthrough <ArrowRight />
              </Link>
            </Button>
          </div>
        </Section>
      </div>

      {/* Testimonials teaser */}
      <Section eyebrow="Testimonials" title="Trusted by shippers who can't afford to be late.">
        <Testimonials limit={3} />
      </Section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="rounded-2xl bg-brand-gradient px-8 py-14 text-center">
          <h2 className="text-display text-3xl text-primary-foreground md:text-4xl">Ready to ship without the wait?</h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/85">
            Register or sign up in under a minute — no fee until you ship something.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="secondary">
              <Link to="/signup">Register or sign up</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/contact">Talk to sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}