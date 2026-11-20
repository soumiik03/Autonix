import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
      setAgents(data?.agents || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching agents:", error);
      setAgents([]);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchAgents();
  }, []);
  const filteredAgents = agents.filter((agent) =>{
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
      <main className="mx-auto w-full max-w-[1152px] px-6 py-16 sm:px-8 sm:py-20">
        <div className="mb-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-4 text-[12px] leading-[1.33] text-[#737373]">WORKSPACE</p>
            <h1 className="mb-4 text-[32px] font-medium leading-[1.18] tracking-[-0.035em]">Agents</h1>
            <p className="text-[18px] leading-[1.33] tracking-[-0.025em] text-[#737373]">
              Your focused AI workers, all in one place.
            </p>
          </div>
          <Link
            className="inline-flex h-11 items-center justify-center gap-2 rounded-[14px] bg-[#171717] px-5 text-[15px] !text-white no-underline transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-black hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
            to="/agents/new"
          >
            <Plus size={16} /> New agent
          </Link>
        </div>

        <div className="mb-8 flex flex-col gap-4 border-y border-[#e5e5e5] py-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex h-11 w-full items-center gap-3 rounded-[12px] border border-[#d9d9d9] px-3 text-[#737373] transition-colors duration-200 focus-within:border-[#171717] sm:max-w-[420px]">
            <span aria-hidden="true">⌕</span>
            <input
              className="w-full bg-transparent text-[15px] text-[#171717] outline-none placeholder:text-[#737373]"
              placeholder="Search agents..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
          <span className="text-[12px] leading-[1.33] text-[#737373]">
            {agents.length} {agents.length === 1 ? "agent" : "agents"}
          </span>
        </div>
        {loading ? (
          <p className="text-[12px] leading-[1.33] text-[#737373]">Loading agents...</p>
        ) : filteredAgents.length === 0 ? (
          <div className="rounded-[20px] border border-[#d9d9d9] px-6 py-12 sm:px-8">
            <h2 className="mb-3 text-[22px] font-medium leading-[1.38] tracking-[-0.025em]">
              {agents.length === 0 ? "No agents yet." : "No matching agents."}
            </h2>
            <p className="mb-6 text-[18px] leading-[1.33] tracking-[-0.025em] text-[#737373]">
              Create your first agent and give it a job to do.
            </p>
            <Link className="inline-flex items-center gap-2 text-[15px] text-[#171717] no-underline transition-colors duration-200 hover:text-[#737373]" to="/agents/new">
              Create an agent <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="grid max-w-[820px] gap-3 md:grid-cols-2">
            {filteredAgents.map((agent) => (
              <article className="group rounded-[16px] border border-[#d9d9d9] bg-white p-4 transition-all duration-200 ease-out hover:-translate-y-1 hover:border-[#171717] hover:shadow-[0_10px_22px_rgba(0,0,0,0.07)]" key={agent._id}>
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#d9d9d9] text-[14px] font-medium text-[#171717] transition-colors duration-200 group-hover:border-[#171717]">
                    AI
                  </div>
                  <Button
                    variant="ghost"
                    className="h-8 w-8 rounded-full p-0 text-[#737373] transition-all duration-200 hover:bg-[#737373] hover:text-white"
                    aria-label={`Delete ${agent.name}`}
                    onClick={() => handleDelete(agent._id)}
                  >
                    <Trash2 size={15} />
                  </Button>
                </div>
                <h2 className="mb-2 text-[18px] font-medium leading-[1.38] tracking-[-0.025em]">{agent.name}</h2>
                <p className="mb-4 line-clamp-2 min-h-[40px] text-[14px] leading-[1.5] text-[#737373]">{agent.instructions}</p>
                <div className="mb-4 flex flex-wrap gap-2">
                    {(agent.tools || []).map((tool) => (
                      <Badge key={tool} variant="outline" className="rounded-full border-[#d9d9d9] px-2.5 py-1 text-[12px] font-normal text-[#737373]">
                        {tool.replaceAll("_", " ")}
                      </Badge>
                    ))}
                </div>
                <div className="flex items-center justify-between border-t border-[#e5e5e5] pt-3">
                  <span className="text-[12px] leading-[1.33] text-[#737373]">
                    {new Date(agent.createdAt).toLocaleDateString()}
                  </span>
                  <span className="inline-flex items-center gap-2 text-[14px] text-[#171717] transition-colors duration-200 group-hover:text-[#737373]">
                    View agent <ArrowRight size={14} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
