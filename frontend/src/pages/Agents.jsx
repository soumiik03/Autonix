import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Plus, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { getAllAgents, deleteAgent } from "../features/agent";
import { SiteHeader } from "../components/SiteHeader";

export function Agents() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    getAllAgents()
      .then((data) => setAgents(data?.agents || []))
      .finally(() => setLoading(false));
  }, []);
  const remove = async (id) => {
    if (!window.confirm("Delete this agent?")) return;
    await deleteAgent(id);
    setAgents((items) => items.filter((agent) => agent._id !== id));
  };
  return (
    <div className="app-shell">
      <SiteHeader />
      <main className="page">
        <div className="list-toolbar">
          <div>
            <p className="eyebrow">WORKSPACE</p>
            <h1>Agents</h1>
            <p className="muted body-copy">
              Your focused AI workers, all in one place.
            </p>
          </div>
          <Button
            className="rounded-full bg-[#171717] px-6 text-white hover:bg-black"
            onClick={() => navigate("/agents/new")}
          >
            <Plus size={16} /> New agent
          </Button>
        </div>
        {loading ? (
          <p className="muted small">Loading agents...</p>
        ) : agents.length === 0 ? (
          <div className="empty-state">
            <h2>No agents yet.</h2>
            <p className="muted body-copy">
              Create your first agent and give it a job to do.
            </p>
            <Link className="text-link" to="/agents/new">
              Create an agent{" "}
              <ArrowRight size={14} className="inline align-middle" />
            </Link>
          </div>
        ) : (
          <div className="agent-list">
            {agents.map((agent) => (
              <article className="agent-row" key={agent._id}>
                <div>
                  <h2 className="agent-name">{agent.name}</h2>
                  <p className="small muted">
                    {new Date(agent.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="small muted mb-2.5">{agent.instructions}</p>
                  <div className="agent-tools">
                    {(agent.tools || []).map((tool) => (
                      <span className="tag" key={tool}>
                        {tool.replaceAll("_", " ")}
                      </span>
                    ))}
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="rounded-full border-[#d9d9d9]"
                  onClick={() => remove(agent._id)}
                >
                  <Trash2 size={15} /> Delete
                </Button>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
