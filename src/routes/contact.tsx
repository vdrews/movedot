import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import { PageHeader, Section, SampleNote } from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PARISHES } from "@/lib/rates";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact MoveDot — Shipping Support & Sales" },
      {
        name: "description",
        content: "Talk to MoveDot about air freight, barrel shipping, business rates or an existing shipment.",
      },
      { property: "og:title", content: "Contact MoveDot" },
      { property: "og:description", content: "Support, sales and business enquiries for shipping to Jamaica." },
    ],
  }),
  component: Contact,
});

const REASONS = [
  "General enquiry",
  "Quote / pricing",
  "Existing shipment",
  "Business & wholesale",
  "Last-mile delivery updates",
  "Something else",
];

function Contact() {
  const [reason, setReason] = useState<string>("General enquiry");

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to a person who knows where your package is."
        description="Sales, support and business enquiries all land with the same team."
      />
      <Section>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  // TODO: wire to a real inbox / backend before launch.
                  toast.success("Message received — we'll reply the same working day.");
                  (e.target as HTMLFormElement).reset();
                }}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" required placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required placeholder="you@example.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Subject / reason</Label>
                  <Select value={reason} onValueChange={setReason}>
                    <SelectTrigger id="reason">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {REASONS.map((r) => (
                        <SelectItem key={r} value={r}>
                          {r}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" required rows={6} placeholder="Tell us what you're shipping…" />
                </div>

                <Button type="submit" size="lg">
                  Send message <Send />
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Reach us directly</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                {/* TODO: SAMPLE contact details — replace with real ones. */}
                <p className="flex items-center gap-2">
                  <Mail className="size-4 text-primary" /> hello@movedot.com
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="size-4 text-primary" /> +1 (876) 000-0000
                </p>
                <p className="flex items-start gap-2">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-primary" /> Kingston hub · Miami, Fort Lauderdale and
                  New York/New Jersey warehouses
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/signup">Sign up for free</Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/track">Track a shipment</Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/rates">See rates</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Parishes we serve</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  All 14 parishes: {PARISHES.join(", ")}. Collection hubs in Kingston, St. Andrew, St. Catherine and St.
                  James.
                </p>
                <Separator className="my-4" />
                <p className="text-xs text-muted-foreground">
                  TODO: confirm hub addresses and opening hours for each collection point.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <SampleNote>
          TODO: the contact form currently only shows a confirmation toast — connect it to a real inbox or CRM before
          launch.
        </SampleNote>
      </Section>
    </>
  );
}
