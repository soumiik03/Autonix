import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";
import { Button } from "../components/ui/button";
import { SiteHeader } from "../components/SiteHeader";

export function Home() {
  const name =
    useSelector((state) => state.user.userData?.name)?.split(" ")[0] || "there";
  const navigate = useNavigate();
  return (
    <div className="app-shell">
      <SiteHeader />
      <main className="page">
        <section className="hero-grid">
          <div>
            <p className="eyebrow">YOUR WORKSPACE</p>
            <h1>Make AI work for you, {name}.</h1>
            <p className="lead">
              Create focused agents that turn repeatable work into something
              simple, fast, and yours.
            </p>
            <div className="hero-actions">
              <Button
                className="rounded-full bg-[#171717] px-6 text-white hover:bg-black"
                onClick={() => navigate("/agents/new")}
              >
                Create an agent <ArrowRight size={16} />
              </Button>
              <Link className="text-link" to="/agents">
                View agents
              </Link>
            </div>
          </div>
          <div className="section-rule pt-6">
            <p className="body-copy">
              Autonix gives every idea a place to start. Define what your agent
              knows, how it thinks, and the tools it can use.
            </p>
          </div>
        </section>
        <section className="stat-grid">
          <div className="stat">
            <span className="stat-value">01</span>
            <span className="stat-label">Create your first agent</span>
          </div>
          <div className="stat">
            <span className="stat-value">∞</span>
            <span className="stat-label">Ideas to automate</span>
          </div>
          <div className="stat">
            <span className="stat-value">24/7</span>
            <span className="stat-label">Ready when you are</span>
          </div>
        </section>
        <section className="pt-24">
          <p className="eyebrow">GET STARTED</p>
          <h2>Start with a clear purpose.</h2>
          <p className="muted body-copy max-w-[560px]">
            A great agent does one thing well. Give it a name, a role, and the
            context it needs to help you move.
          </p>
          <Link className="text-link" to="/agents/new">
            Create your first agent{" "}
            <ArrowRight size={14} className="inline align-middle" />
          </Link>
        </section>
      </main>
    </div>
  );
}
