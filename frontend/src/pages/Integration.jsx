import { Link } from "react-router-dom";
import { ArrowLeft, Check, ExternalLink } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { SiteHeader } from "../components/SiteHeader";

const integrations = [
  {
    name: "Google",
    description: "Use your Google account to securely sign in to Autonix.",
    status: "Connected",
  },
  {
    name: "Webhooks",
    description: "Connect agents to the tools and workflows you already use.",
    status: "Coming soon",
  },
  {
    name: "API access",
    description: "Bring your agents into your own applications and services.",
    status: "Coming soon",
  },
  {
    name: "Knowledge sources",
    description: "Give agents useful context from your existing information.",
    status: "Coming soon",
  },
];

function IntegrationStatus({ status }) {
  const isConnected = status === "Connected";

  return (
    <span className="small muted">
      {isConnected ? <Check size={14} className="mr-1 inline" /> : null}
      {status}
      {!isConnected ? <ExternalLink size={13} className="ml-1 inline" /> : null}
    </span>
  );
}

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
          {integrations.map(({ name, description, status }) => (
            <Card
              className="integration-card rounded-none border-0 shadow-none"
              key={name}
            >
              <CardContent className="flex h-full flex-col justify-between p-6">
                <div>
                  <h2>{name}</h2>
                  <p>{description}</p>
                </div>
                <IntegrationStatus status={status} />
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
