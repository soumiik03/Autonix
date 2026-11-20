import { Link } from "react-router-dom";
import { ArrowLeft, Check, ExternalLink } from "lucide-react";
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
          {integrations.map((item) => (
            <article className="integration-card" key={item.name}>
              <div>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
              </div>
              <span className="small muted">
                {item.status === "Connected" ? (
                  <>
                    <Check
                      size={14}
                      style={{ verticalAlign: "middle", marginRight: 5 }}
                    />{" "}
                    {item.status}
                  </>
                ) : (
                  item.status
                )}{" "}
                {item.status !== "Connected" && (
                  <ExternalLink
                    size={13}
                    style={{ verticalAlign: "middle", marginLeft: 5 }}
                  />
                )}
              </span>
            </article>
          ))}
        </div>
        <p style={{ marginTop: 32 }}>
          <Link className="text-link" to="/">
            <ArrowLeft
              size={14}
              style={{ verticalAlign: "middle", marginRight: 5 }}
            />{" "}
            Back to home
          </Link>
        </p>
      </main>
    </div>
  );
}
