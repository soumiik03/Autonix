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
      <main className="page page-narrow">
        <div className="form-header">
          <Link className="text-link" to="/agents">
            <ArrowLeft size={14} className="mr-1 inline" /> Back to agents
          </Link>
          <p className="eyebrow mt-12">NEW AGENT</p>
          <h1>Create your agent</h1>
          <p className="muted body-copy">
            Set a purpose, instructions, and the tools it can use.
          </p>
        </div>
        <form className="form" onSubmit={submit}>
          <section className="form-section">
            <h2 className="form-section-title">Agent details</h2>
            <p className="form-section-description">
              Give your agent enough context to make good decisions.
            </p>
            <div className="field-grid">
              <div className="field field-full">
                <Label htmlFor="agent-name">Agent name *</Label>
                <Input
                  id="agent-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Research assistant"
                  maxLength={60}
                  required
                  className="h-11 rounded-xl border-[#bdbdbd] shadow-none focus-visible:ring-1 focus-visible:ring-black"
                />
              </div>
              <div className="field">
                <Label htmlFor="agent-instructions">Instructions *</Label>
                <Textarea
                  id="agent-instructions"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="Describe the agent's role and how it should respond..."
                  maxLength={1500}
                  required
                  className="min-h-[116px] rounded-xl border-[#bdbdbd] shadow-none focus-visible:ring-1 focus-visible:ring-black"
                />
                <span className="counter">{instructions.length} / 1500</span>
              </div>
              <div className="field">
                <Label htmlFor="agent-knowledge">Knowledge base *</Label>
                <Textarea
                  id="agent-knowledge"
                  value={knowledgeBase}
                  onChange={(e) => setKnowledgeBase(e.target.value)}
                  placeholder="Add context or reference material..."
                  maxLength={3000}
                  required
                  className="min-h-[116px] rounded-xl border-[#bdbdbd] shadow-none focus-visible:ring-1 focus-visible:ring-black"
                />
                <span className="counter">{knowledgeBase.length} / 3000</span>
              </div>
            </div>
          </section>
          <section className="form-section">
            <h2 className="form-section-title">Capabilities</h2>
            <p className="form-section-description">
              Select the tools this agent can use.
            </p>
            <div className="tool-grid">
              {availableTools.map(({ id, label, Icon }) => (
                <Label className="tool-option" htmlFor={id} key={id}>
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
              <p className="error" role="alert">
                {error}
              </p>
            )}
          </section>
          <div className="form-footer">
            <span className="small muted">All fields are required.</span>
            <Button
              type="submit"
              disabled={loading}
              className="rounded-full bg-[#171717] px-6 text-white hover:bg-black"
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
