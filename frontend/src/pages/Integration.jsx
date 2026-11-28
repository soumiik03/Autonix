import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CalendarDays, Check, ExternalLink, LoaderCircle, Mail } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { SiteHeader } from "../components/SiteHeader";
import {
  connectGoogle,
  disconnectGoogle,
  getIntegrations,
} from "../features/Integrations";

const integrations = [
  {
    key: "gmail",
    name: "Gmail",
    description: "Let your agents read and send email through your Google account.",
    Icon: Mail,
  },
  {
    key: "google_calender",
    name: "Google Calendar",
    description: "Let your agents view calendars and create calendar events.",
    Icon: CalendarDays,
  },
];

function IntegrationStatus({ connected }) {
  return (
    <span className="small muted">
      {connected ? <Check size={14} className="mr-1 inline" /> : <ExternalLink size={13} className="mr-1 inline" />}
      {connected ? "Connected" : "Not connected"}
    </span>
  );
}

export function Integration() {
  const [statuses, setStatuses] = useState({});
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");

  const loadIntegrations = async () => {
    try {
      setStatuses((await getIntegrations()) || {});
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to load integrations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIntegrations();
  }, []);

  const handleConnect = async () => {
    try {
      setWorking(true);
      setError("");
      const { url } = await connectGoogle();
      window.location.assign(url);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to connect Google.");
      setWorking(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      setWorking(true);
      setError("");
      await disconnectGoogle();
      await loadIntegrations();
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to disconnect Google.");
    } finally {
      setWorking(false);
    }
  };

  return (
    <div className="app-shell">
      <SiteHeader />
      <main className="page">
        <p className="eyebrow">WORKSPACE</p>
        <h1>Integrations</h1>
        <p className="lead">
          Connect Autonix to the services that make your agents more useful.
        </p>
        {error ? <p className="small muted" role="alert">{error}</p> : null}
        <div className="integration-grid">
          {integrations.map(({ key, name, description, Icon }) => {
            const connected = Boolean(statuses[key]?.connected);
            return (
              <Card className="integration-card" key={key}>
                <CardContent className="flex h-full flex-col justify-between p-6">
                  <div>
                    <div className="integration-heading">
                      <span className="integration-icon"><Icon size={17} strokeWidth={1.8} /></span>
                      <h2>{name}</h2>
                    </div>
                    <p>{description}</p>
                    {connected && statuses[key].email ? (
                      <p className="small muted">{statuses[key].email}</p>
                    ) : null}
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <IntegrationStatus connected={connected} />
                    <Button
                      className="integration-action-button"
                      size="sm"
                      variant={connected ? "outline" : "default"}
                      disabled={loading || working}
                      onClick={connected ? handleDisconnect : handleConnect}
                    >
                      {working ? <LoaderCircle className="animate-spin" /> : connected ? "Disconnect" : "Connect"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
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
