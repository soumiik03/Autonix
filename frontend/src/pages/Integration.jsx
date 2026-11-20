import { Link } from "react-router-dom";
import { ArrowLeft, Check, ExternalLink } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { SiteHeader } from "../components/SiteHeader";

const integrations = [
  [
    "Google",
    "Use your Google account to securely sign in to Autonix.",
    "Connected",
  ],
  [
    "Webhooks",
    "Connect agents to the tools and workflows you already use.",
    "Coming soon",
  ],
  [
    "API access",
    "Bring your agents into your own applications and services.",
    "Coming soon",
  ],
  [
    "Knowledge sources",
    "Give agents useful context from your existing information.",
    "Coming soon",
  ],
];

export function Integration() {
  return (
    <div className="app-shell">
      <SiteHeader />
      <main className="page">
        <p className="eyebrow">WORKSPACE</p>
        <h1>Integrations</h1>
        <p className="lead">
          Connect Autonix to the services that make your agents more useful.
        </p>
        <div className="integration-grid">
          {integrations.map(([name, description, status]) => (
            <Card
              className="integration-card rounded-none border-0 shadow-none"
              key={name}
            >
              <CardContent className="flex h-full flex-col justify-between p-6">
                <div>
                  <h2>{name}</h2>
                  <p>{description}</p>
                </div>
                <span className="small muted">
                  {status === "Connected" ? (
                    <>
                      <Check size={14} className="mr-1 inline" />
                      {status}
                    </>
                  ) : (
                    <>
                      {status}{" "}
                      <ExternalLink size={13} className="ml-1 inline" />
                    </>
                  )}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mt-8">
          <Link className="text-link" to="/">
            <ArrowLeft size={14} className="mr-1 inline" /> Back to home
          </Link>
        </p>
      </main>
    </div>
  );
}
