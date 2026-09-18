import { Link, createFileRoute } from "@tanstack/react-router";
import { Radar } from "lucide-react";
import { PageHeader, Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — Shipping with MoveDot" },
      {
        name: "description",
        content: "Ship air freight to Jamaica and track every step, live, from warehouse intake to arrival.",
      },
      { property: "og:title", content: "How MoveDot Works" },
      { property: "og:description", content: "Live tracking, every step of the journey." },
    ],
  }),
  component: HowItWorks,
});

function HowItWorks() {
  return (
    <>
      <PageHeader
        eyebrow="How it works"
        title="From a US checkout page to your hand in Jamaica."
        description="One operator across the whole journey. Air freight, same account, same tracking."
      />
      <Section>
        <Card className="border-border/70">
          <CardHeader>
            <div className="flex items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10">
                <Radar className="size-5 text-primary" />
              </span>
              <CardTitle className="text-xl">Track every step with live updates</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground sm:pl-15">
              Every scan is published to your dashboard — warehouse intake, departure, customs, arrival. No calling
              to ask where your package is.
            </p>
          </CardContent>
        </Card>

        <div className="mt-12 rounded-2xl bg-brand-gradient px-8 py-12 text-center">
          <h2 className="text-display text-3xl text-primary-foreground">Start with a free US address.</h2>
          <p className="mx-auto mt-3 max-w-lg text-primary-foreground/85">
            It takes a minute and costs nothing until you ship something.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="secondary">
              <Link to="/signup">Sign up for free</Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/calculator">Get instant quote</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}