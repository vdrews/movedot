import { Link, createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section, SampleNote } from "@/components/Section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "FAQs — Shipping to Jamaica | MoveDot" },
      {
        name: "description",
        content: "Answers on MoveDot signup cost, air freight timelines (as fast as 24 hours), collection and tracking.",
      },
      { property: "og:title", content: "MoveDot FAQs" },
      { property: "og:description", content: "Costs, timelines, collection and tracking — answered." },
    ],
  }),
  component: Faqs,
});

const FAQS = [
  {
    q: "How much does it cost to sign up?",
    a: "Nothing. Creating a MoveDot account and getting your free US shipping address costs $0, with no monthly fee. You only pay when you actually ship something.",
  },
  {
    q: "How long does air freight take?",
    a: "Air Express runs as fast as 24 hours door to door — from the moment your package is received at our US warehouse to handover in Jamaica, including customs clearance. Weather, holidays and customs inspections can add time.",
  },
  {
    q: "Where do I collect my package? Does last-mile delivery exist yet?",
    a: "Today you collect from a MoveDot hub in Kingston, St. Andrew, St. Catherine or St. James. Last-mile door-to-door delivery to all 14 parishes is being finalised operationally — we're not quoting delivery timelines until routes are locked. PLACEHOLDER: confirm hub addresses, opening hours and the last-mile launch date.",
  },
  {
    q: "How do I track my shipment?",
    a: "Every scan appears in your MoveDot dashboard, and you can look up any tracking number on the Track page without logging in. You'll see warehouse intake, departure, customs clearance and ready-for-collection.",
  },
  {
    q: "What can't I ship?",
    a: "PLACEHOLDER: prohibited and restricted items list to be confirmed with operations (hazardous goods, perishables, firearms, certain electronics and agricultural items typically restricted into Jamaica).",
  },
  {
    q: "Are duties and customs charges included in my quote?",
    a: "PLACEHOLDER: not currently included in the calculator estimate. Confirm how duty is assessed and collected before publishing final pricing.",
  },
];

function Faqs() {
  return (
    <>
      <PageHeader
        eyebrow="FAQs"
        title="The questions we get asked most."
        description="If something isn't answered here, the contact form gets to a human the same working day."
      />
      <Section>
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left text-base font-semibold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <SampleNote>
          TODO: three answers above contain PLACEHOLDER text (last-mile launch and hub details, prohibited items,
          duties/customs handling) that need real operational information.
        </SampleNote>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/contact">Ask us something</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/calculator">Get instant quote</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}