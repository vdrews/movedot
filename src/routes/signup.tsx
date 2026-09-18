import { Link, createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section, SampleNote } from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign Up Free — Get a US Address | MoveDot" },
      {
        name: "description",
        content: "Create a free MoveDot account and get a US shipping address for air and sea freight to Jamaica.",
      },
      { property: "og:title", content: "Sign up free with MoveDot" },
      { property: "og:description", content: "Free US shipping address, no monthly fee." },
    ],
  }),
  component: Signup,
});

function Signup() {
  return (
    <>
      <PageHeader
        eyebrow="Create account"
        title="Sign up free. Get your US address today."
        description="No signup fee, no monthly fee — you only pay when you ship."
      />
      <Section>
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle>Create your MoveDot account</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>
              <Button className="w-full" size="lg" type="submit">
                Sign up for free
              </Button>
            </form>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary hover:underline">
                Log in
              </Link>
            </p>
          </CardContent>
        </Card>
        <SampleNote>TODO: placeholder page — no accounts are created yet. Authentication still to be wired up.</SampleNote>
      </Section>
    </>
  );
}
