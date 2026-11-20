import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Plus, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { getAllAgents, deleteAgent } from "../features/agent";
import { SiteHeader } from "../components/SiteHeader";

export function Agents() {
  const [agents, setAgents] = useState([]);
  const [search,setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const fetchAgents = async () => {
    setLoading(true);
    try {
      const data = await getAllAgents();
      setAgents(data);
      setLoading(false);
       
    } catch (error) {
      console.error("Error fetching agents:", error);
    } 
  }  
  useEffect(() => {
    fetchAgents();
  }, []);
  const filteredAgents = agents.filter((agent) =>{
    const query=search.toLowerCase();
    return(
      agent?.name?.toLowerCase()?.includes(search.toLowerCase()) ||
      agent?.instructions?.toLowerCase()?.includes(search.toLowerCase()) ||
      agent?.knowledgeBase?.toLowerCase()?.includes(search.toLowerCase()) 
    )
  });
  const handleDelete = async (agentId) => {
    try {
      await deleteAgent(agentId);
      setAgents((prevAgents) => prevAgents.filter((agent) => agent._id !== agentId));
    } catch (error) {
      console.error("Error deleting agent:", error);
    }
  }
  
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
                      <Badge key={tool} variant="outline" className="rounded-full border-black/20 px-2.5 py-1 font-normal">
                        {tool.replaceAll("_", " ")}
                      </Badge>
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
