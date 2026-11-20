import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";
import { SiteHeader } from "../components/SiteHeader";

export function Home() {
  const user = useSelector((state) => state.user.userData);
  const firstName = user?.name?.split(" ")[0] || "there";
  return <div className="app-shell"><SiteHeader /><main className="page">
    <section className="hero-grid">
      <div><p className="eyebrow">YOUR WORKSPACE</p><h1>Make AI work for you, {firstName}.</h1><p className="lead">Create focused agents that turn repeatable work into something simple, fast, and yours.</p><div className="hero-actions"><Link className="button" to="/agents/new">Create an agent <ArrowRight size={16} /></Link><Link className="text-link" to="/agents">View agents</Link></div></div>
      <div className="section-rule" style={{ paddingTop: 24 }}><p className="body-copy">Autonix gives every idea a place to start. Define what your agent knows, how it thinks, and the tools it can use.</p></div>
    </section>
    <section className="stat-grid"><div className="stat"><span className="stat-value">01</span><span className="stat-label">Create your first agent</span></div><div className="stat"><span className="stat-value">∞</span><span className="stat-label">Ideas to automate</span></div><div className="stat"><span className="stat-value">24/7</span><span className="stat-label">Ready when you are</span></div></section>
    <section style={{ paddingTop: 96 }}><p className="eyebrow">GET STARTED</p><h2>Start with a clear purpose.</h2><p className="muted body-copy" style={{ maxWidth: 560 }}>A great agent does one thing well. Give it a name, a role, and the context it needs to help you move.</p><Link className="text-link" to="/agents/new">Create your first agent <ArrowRight size={14} style={{ verticalAlign: "middle" }} /></Link></section>
  </main></div>;
}
