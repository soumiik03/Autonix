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
      <main className="home-main">
        <section className="home-hero">
          <p className="home-eyebrow">YOUR WORKSPACE</p>
          <h1>
            Make AI work for you, {name}.
          </h1>
          <p className="home-lead">
            Create focused agents that turn repeatable work into something simple, fast, and yours.
          </p>
          <div className="home-actions">
            <Button
              className="h-11 rounded-full bg-[#171717] px-6 text-[18px] font-normal leading-[1.33] tracking-[-0.025em] text-white transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-black hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] active:translate-y-0 focus-visible:ring-2 focus-visible:ring-[#171717] focus-visible:ring-offset-2"
              onClick={() => navigate("/agents/new")}
            >
              Create an agent <ArrowRight size={16} />
            </Button>
            <Link className="home-secondary-link" to="/agents">
              View agents
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
            <span className="home-stat-label">Ideas to automate</span>
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
