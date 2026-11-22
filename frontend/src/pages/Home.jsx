import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";

export function Home() {
  return (
    <div className="app-shell">
      <SiteHeader />
      <main className="home-main">
        <section className="home-hero">
          <p className="home-eyebrow">YOUR WORKSPACE</p>
          <h1>Focused agents for the work that repeats</h1>
          <p className="home-lead">Create focused agents that turn repeatable work into something simple, fast, and yours.</p>
          <div className="home-actions">
            <Link className="home-primary-button" to="/agents/new">
              Create an agent <ArrowRight size={16} />
            </Link>
            <Link className="home-secondary-link" to="/agents">
              View agents
            </Link>
            <Link className="home-chat-link" to="/chat">
              Open workspace
            </Link>
          </div>
        </section>

        <section className="home-stats">
          <div>
            <span className="home-stat-value">01</span>
            <span className="home-stat-label">Create your first agent</span>
          </div>
          <div>
            <span className="home-stat-value">∞</span>
            <span className="home-stat-label">Workflows to shape</span>
          </div>
          <div>
            <span className="home-stat-value">24/7</span>
            <span className="home-stat-label">Ready when you are</span>
          </div>
        </section>

        <section className="home-start">
          <p className="home-eyebrow">GET STARTED</p>
          <h2>Start with a clear purpose.</h2>
          <p>
            A great agent does one thing well. Give it a name, a role, and the context it needs to help you move.
          </p>
          <Link className="home-primary-link" to="/agents/new">
            Create your first agent <ArrowRight size={14} className="ml-1 inline align-middle" />
          </Link>
        </section>
      </main>
    </div>
  );
}
