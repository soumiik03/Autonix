import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Code2,
  FileSearch2,
  Globe2,
  LoaderCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import { SiteHeader } from "../components/SiteHeader";
import { createAgent } from "../features/agent";

const availableTools = [
  { id: "web_search", label: "Web search", Icon: Globe2 },
  { id: "file_analysis", label: "File analysis", Icon: FileSearch2 },
  { id: "code_execution", label: "Code execution", Icon: Code2 },
];

export function CreateAgent() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [knowledgeBase, setKnowledgeBase] = useState("");
  const [tools, setTools] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const toggleTool = (id) =>
    setTools((current) =>
      current.includes(id)
        ? current.filter((tool) => tool !== id)
        : [...current, id],
    );
  const submit = async (event) => {
    event.preventDefault();
    setError("");
    if (!name.trim() || !instructions.trim() || !knowledgeBase.trim())
      return setError(
        "Complete each required field before creating your agent.",
      );
    if (!tools.length)
      return setError("Choose at least one capability for your agent.");
    setLoading(true);
    try {
      await createAgent({
        name: name.trim(),
        instructions: instructions.trim(),
        knowledgeBase: knowledgeBase.trim(),
        tools,
      });
      navigate("/agents");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Your agent could not be created.",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="app-shell">
      <SiteHeader />
      <main className="mx-auto w-full max-w-[800px] px-6 py-10 sm:px-8 sm:py-14">
        <div className="mb-12">
          <Link className="inline-flex items-center gap-2 text-[15px] text-[#737373] no-underline transition-colors duration-200  hover:text-black" to="/agents">
            <ArrowLeft size={14} /> Back to agents
          </Link>
          
          <h1 className="mb-4 text-[32px] font-medium leading-[1.18] tracking-[-0.035em]">Create your agent</h1>
          <p className="text-[18px] leading-[1.33] tracking-[-0.025em] text-[#737373]">
            Set a purpose, instructions, and the tools it can use.
          </p>
        </div>
        <form className="rounded-[28px] border border-[#d9d9d9] bg-white p-6 shadow-none sm:p-10" onSubmit={submit}>
          <section className="border-b border-[#e5e5e5] pb-8">
            <h2 className="mb-2 text-[18px] font-medium leading-[1.38] tracking-[-0.025em]">Agent details</h2>
            <p className="mb-6 text-[14px] leading-[1.5] text-[#737373]">
              Give your agent enough context to make good decisions.
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2 sm:col-span-2">
                <Label className="text-[12px] font-normal text-[#171717]" htmlFor="agent-name">Agent name *</Label>
                <Input
                  id="agent-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Research assistant"
                  maxLength={60}
                  required
                  className="h-11 rounded-[10px] border-[#d9d9d9] px-3 shadow-none transition-colors duration-200 focus-visible:border-[#171717] focus-visible:ring-1 focus-visible:ring-[#171717]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-[12px] font-normal text-[#171717]" htmlFor="agent-instructions">Instructions *</Label>
                <Textarea
                  id="agent-instructions"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="Describe the agent's role and how it should respond..."
                  maxLength={1500}
                  required
                  className="min-h-[132px] resize-none rounded-[10px] border-[#d9d9d9] px-3 py-3 shadow-none transition-colors duration-200 focus-visible:border-[#171717] focus-visible:ring-1 focus-visible:ring-[#171717]"
                />
                <span className="self-end text-[12px] leading-[1.33] text-[#737373]">{instructions.length} / 1500</span>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-[12px] font-normal text-[#171717]" htmlFor="agent-knowledge">Knowledge base *</Label>
                <Textarea
                  id="agent-knowledge"
                  value={knowledgeBase}
                  onChange={(e) => setKnowledgeBase(e.target.value)}
                  placeholder="Add context or reference material..."
                  maxLength={3000}
                  required
                  className="min-h-[132px] resize-none rounded-[10px] border-[#d9d9d9] px-3 py-3 shadow-none transition-colors duration-200 focus-visible:border-[#171717] focus-visible:ring-1 focus-visible:ring-[#171717]"
                />
                <span className="self-end text-[12px] leading-[1.33] text-[#737373]">{knowledgeBase.length} / 3000</span>
              </div>
            </div>
          </section>
          <section className="border-b border-[#e5e5e5] py-8">
            <h2 className="mb-2 text-[18px] font-medium leading-[1.38] tracking-[-0.025em]">Capabilities</h2>
            <p className="mb-6 text-[14px] leading-[1.5] text-[#737373]">
              Select the tools this agent can use.
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {availableTools.map(({ id, label, Icon }) => (
                <Label className="flex cursor-pointer items-center gap-3 rounded-[10px] border border-[#d9d9d9] px-4 py-4 text-[14px] font-normal text-[#171717] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#171717] hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)]" htmlFor={id} key={id}>
                  <Checkbox
                    id={id}
                    checked={tools.includes(id)}
                    onCheckedChange={() => toggleTool(id)}
                  />
                  <Icon size={16} /> {label}
                </Label>
              ))}
            </div>
            {error && (
              <p className="mt-4 text-[14px] leading-[1.5] text-[#171717]" role="alert">
                {error}
              </p>
            )}
          </section>
          <div className="flex flex-col items-start justify-between gap-4 pt-6 sm:flex-row sm:items-center">
            <span className="text-[12px] leading-[1.33] text-[#737373]">All fields are required.</span>
            <Button
              type="submit"
              disabled={loading}
              className="h-11 rounded-[14px] bg-[#171717] px-6 text-[18px] font-normal leading-[1.33] tracking-[-0.025em] text-white shadow-none transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-black hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] active:translate-y-0 focus-visible:ring-2 focus-visible:ring-[#171717] focus-visible:ring-offset-2"
            >
              {loading ? (
                <>
                  <LoaderCircle size={16} className="animate-spin" />{" "}
                  Creating...
                </>
              ) : (
                <>
                  Create agent <ArrowRight size={16} />
                </>
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
