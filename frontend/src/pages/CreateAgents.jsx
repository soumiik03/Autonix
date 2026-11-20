import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Code2,
  FileSearch2,
  Globe2,
  LoaderCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { createAgent } from "../features/agent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "./CreateAgents.css";

const availableTools = [
  {
    id: "web_search",
    label: "Web search",
    description: "Find current information online",
    Icon: Globe2,
  },
  {
    id: "file_analysis",
    label: "File analysis",
    description: "Read and understand documents",
    Icon: FileSearch2,
  },
  {
    id: "code_execution",
    label: "Code execution",
    description: "Work through code and data",
    Icon: Code2,
  },
];

export const CreateAgent = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [knowledgeBase, setKnowledgeBase] = useState("");
  const [tools, setTools] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const toggleTool = (toolId) => {
    setTools((currentTools) =>
      currentTools.includes(toolId)
        ? currentTools.filter((tool) => tool !== toolId)
        : [...currentTools, toolId],
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!name.trim() || !instructions.trim() || !knowledgeBase.trim()) {
      setErrorMessage("Complete each required field before creating your agent.");
      return;
    }

    if (!tools.length) {
      setErrorMessage("Choose at least one capability for your agent.");
      return;
    }

    setIsSubmitting(true);
    try {
      await createAgent({
        name: name.trim(),
        instructions: instructions.trim(),
        knowledgeBase: knowledgeBase.trim(),
        tools,
      });
      navigate("/agents");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          "Your agent could not be created. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="agent-builder">
      <header className="agent-builder__header">
        <Link className="agent-builder__brand" to="/" aria-label="Autonix home">
          <span className="agent-builder__brand-mark">
            <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <path
                d="M20 3.5 35 12v16L20 36.5 5 28V12L20 3.5Z"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <path
                d="M13 27V13l14 14V13"
                stroke="currentColor"
                strokeWidth="1.8"
              />
            </svg>
          </span>
          <span>AUTONIX</span>
        </Link>
        <Link className="agent-builder__back" to="/agents">
          <ArrowLeft size={15} strokeWidth={1.8} />
          <span>Back to agents</span>
        </Link>
      </header>

      <div className="agent-builder__content">
        <div className="agent-builder__intro">
          <div className="agent-builder__title-row">
            <div>
              <h1>Create your agent</h1>
              <p>Set a purpose, instructions, and the tools it can use.</p>
            </div>
          </div>
        </div>

        <form className="agent-builder__layout" onSubmit={handleSubmit}>
          <section className="agent-builder__form-card">
            <div className="agent-builder__fields">
              <div className="agent-builder__field">
                <Label htmlFor="agent-name" className="agent-builder__label">
                  Agent name <span>*</span>
                </Label>
                <Input
                  id="agent-name"
                  className="agent-builder__input"
                  placeholder="e.g. Research assistant"
                  maxLength={60}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>

              <div className="agent-builder__field">
                <Label htmlFor="agent-instructions" className="agent-builder__label">
                  Instructions <span>*</span>
                </Label>
                <textarea
                  id="agent-instructions"
                  className="agent-builder__textarea"
                  placeholder="Describe the agent's role, its approach, and how it should respond..."
                  value={instructions}
                  onChange={(event) => setInstructions(event.target.value)}
                  maxLength={1500}
                  rows={5}
                  required
                />
                <div className="agent-builder__field-meta">
                  <span>{instructions.length} / 1500</span>
                </div>
              </div>

              <div className="agent-builder__field">
                <Label htmlFor="agent-knowledge" className="agent-builder__label">
                  Knowledge base <span>*</span>
                </Label>
                <textarea
                  id="agent-knowledge"
                  className="agent-builder__textarea agent-builder__textarea--knowledge"
                  placeholder="Add the context, reference material, or domain knowledge your agent should use..."
                  value={knowledgeBase}
                  onChange={(event) => setKnowledgeBase(event.target.value)}
                  maxLength={3000}
                  rows={4}
                  required
                />
                <div className="agent-builder__field-meta">
                  <span>{knowledgeBase.length} / 3000</span>
                </div>
              </div>
            </div>

            <div className="agent-builder__tools">
              <div className="agent-builder__tools-heading">
                <div>
                  <Label className="agent-builder__label">
                    Capabilities <span>*</span>
                  </Label>
                </div>
                <span className="agent-builder__tool-count">
                  {tools.length} selected
                </span>
              </div>
              <div className="agent-builder__tool-list">
                {availableTools.map(({ id, label, description, Icon }) => {
                  const isSelected = tools.includes(id);
                  return (
                    <button
                      type="button"
                      key={id}
                      className={`agent-builder__tool${isSelected ? " is-selected" : ""}`}
                      aria-pressed={isSelected}
                      onClick={() => toggleTool(id)}
                    >
                      <span className="agent-builder__tool-icon">
                        <Icon size={17} strokeWidth={1.7} />
                      </span>
                      <span className="agent-builder__tool-copy">
                        <span>{label}</span>
                        <small>{description}</small>
                      </span>
                      <span className="agent-builder__tool-check">
                        {isSelected && <Check size={13} strokeWidth={2.2} />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {errorMessage && (
              <p className="agent-builder__error" role="alert">
                {errorMessage}
              </p>
            )}

            <div className="agent-builder__form-footer">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="agent-builder__submit"
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="animate-spin" size={16} />
                    Creating agent
                  </>
                ) : (
                  <>
                    Create agent
                    <ArrowRight size={16} strokeWidth={1.8} />
                  </>
                )}
              </Button>
            </div>
          </section>
        </form>
      </div>
    </main>
  );
};
