import { Link, createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section, SampleNote } from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log In | MoveDot" },
      { name: "description", content: "Log in to your MoveDot account to manage shipments and track packages." },
      { property: "og:title", content: "Log in to MoveDot" },
      { property: "og:description", content: "Manage your shipments and US address." },
    ],
  }),
  component: Login,
});

function Login() {
  return (
    <>
      <PageHeader eyebrow="Account" title="Welcome back." description="Log in to manage shipments and your US address." />
      <Section>
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle>Log in</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>
              <Button className="w-full" size="lg" type="submit">
                Log in
              </Button>
            </form>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              New here?{" "}
              <Link to="/signup" className="font-medium text-primary hover:underline">
                Sign up for free
              </Link>
            </p>
          </CardContent>
        </Card>
        <SampleNote>TODO: placeholder page — authentication still to be wired up.</SampleNote>
      </Section>
    </>
  );
}
