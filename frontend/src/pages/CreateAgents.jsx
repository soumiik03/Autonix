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
import { createAgent } from "../features/agent";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const tools = [
  { id: "web_search", label: "Web search", Icon: Globe2 },
  { id: "file_analysis", label: "File analysis", Icon: FileSearch2 },
  { id: "code_execution", label: "Code execution", Icon: Code2 },
];

export const CreateAgent = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [knowledgeBase, setKnowledgeBase] = useState("");
  const [selectedTools, setSelectedTools] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const toggleTool = (toolId, checked) => {
    setSelectedTools((current) =>
      checked ? [...current, toolId] : current.filter((tool) => tool !== toolId),
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!name.trim() || !instructions.trim() || !knowledgeBase.trim()) {
      setErrorMessage("Complete each required field before creating your agent.");
      return;
    }

    if (!selectedTools.length) {
      setErrorMessage("Choose at least one capability for your agent.");
      return;
    }

    setIsSubmitting(true);
    try {
      await createAgent({
        name: name.trim(),
        instructions: instructions.trim(),
        knowledgeBase: knowledgeBase.trim(),
        tools: selectedTools,
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
    <main className="flex h-dvh min-h-[480px] flex-col overflow-hidden bg-[#050607] font-sans text-[#e7e9ed]">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-[#1d2229] px-4 sm:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-[#cbd0d7] no-underline"
          aria-label="Autonix home"
        >
          <svg
            aria-hidden="true"
            className="size-7 text-[#c3c9d1]"
            viewBox="0 0 40 40"
            fill="none"
          >
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
          AUTONIX
        </Link>
        <Link
          to="/agents"
          className="flex items-center gap-2 text-xs text-[#9299a3] no-underline hover:text-[#e7e9ed]"
        >
          <ArrowLeft size={15} />
          Back to agents
        </Link>
      </header>

      <div className="mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col px-4 py-4 sm:px-6 sm:py-5">
        <div className="mb-4 shrink-0">
          <h1 className="m-0 text-2xl font-medium tracking-tight text-[#f0f2f4] sm:text-[28px]">
            Create your agent
          </h1>
          <p className="mt-1 text-xs text-[#9299a3]">
            Set a purpose, instructions, and the tools it can use.
          </p>
        </div>

        <form
          className="flex min-h-0 flex-1 items-center justify-center"
          onSubmit={handleSubmit}
        >
          <Card className="w-full gap-0 overflow-hidden rounded-md border-[#343a44] bg-[#111419] py-0 text-[#e7e9ed] shadow-none ring-1 ring-white/10">
            <CardHeader className="border-b border-[#2a3038] px-4 py-3 sm:px-5">
              <CardTitle className="text-sm font-medium text-[#e7e9ed]">
                Agent details
              </CardTitle>
              <CardDescription className="text-xs text-[#9299a3]">
                Name and instructions for your agent.
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-4 p-4 sm:gap-5 sm:p-5">
              <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2 sm:gap-y-4">
                <div className="flex min-w-0 flex-col gap-1.5 sm:col-span-2">
                  <Label htmlFor="agent-name" className="text-xs text-[#c9ced5]">
                    Agent name *
                  </Label>
                  <Input
                    id="agent-name"
                    className="h-9 rounded-md border-[#333942] bg-[#080a0d] text-sm text-[#e7e9ed] placeholder:text-[#77808b] focus-visible:border-[#aeb6c1] focus-visible:ring-0"
                    placeholder="e.g. Research assistant"
                    maxLength={60}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </div>

                <div className="flex min-w-0 flex-col gap-1.5">
                  <Label
                    htmlFor="agent-instructions"
                    className="text-xs text-[#c9ced5]"
                  >
                    Instructions *
                  </Label>
                  <Textarea
                    id="agent-instructions"
                    className="h-20 min-h-0 resize-none rounded-md border-[#333942] bg-[#080a0d] text-sm text-[#e7e9ed] placeholder:text-[#77808b] focus-visible:border-[#aeb6c1] focus-visible:ring-0"
                    placeholder="Describe the agent's role and how it should respond..."
                    maxLength={1500}
                    value={instructions}
                    onChange={(event) => setInstructions(event.target.value)}
                    required
                  />
                  <span className="text-right text-[10px] tabular-nums text-[#858d98]">
                    {instructions.length} / 1500
                  </span>
                </div>

                <div className="flex min-w-0 flex-col gap-1.5">
                  <Label
                    htmlFor="agent-knowledge"
                    className="text-xs text-[#c9ced5]"
                  >
                    Knowledge base *
                  </Label>
                  <Textarea
                    id="agent-knowledge"
                    className="h-20 min-h-0 resize-none rounded-md border-[#333942] bg-[#080a0d] text-sm text-[#e7e9ed] placeholder:text-[#77808b] focus-visible:border-[#aeb6c1] focus-visible:ring-0"
                    placeholder="Add context or reference material..."
                    maxLength={3000}
                    value={knowledgeBase}
                    onChange={(event) => setKnowledgeBase(event.target.value)}
                    required
                  />
                  <span className="text-right text-[10px] tabular-nums text-[#858d98]">
                    {knowledgeBase.length} / 3000
                  </span>
                </div>
              </div>

              <fieldset className="border-0 border-t border-solid border-[#2a3038] p-0 pt-3">
                <legend className="px-0 text-xs text-[#c9ced5]">
                  Capabilities *
                </legend>
                <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-4">
                  {tools.map(({ id, label, Icon }) => (
                    <div className="flex min-w-0 items-center gap-2 text-xs text-[#cbd0d7]" key={id}>
                      <Icon size={16} className="text-[#9299a3]" aria-hidden="true" />
                      <span>{label}</span>
                      <Checkbox
                        className="rounded-sm border-[#555d67] bg-[#080a0d] data-checked:border-[#cbd1d9] data-checked:bg-[#cbd1d9] data-checked:text-[#08090b] focus-visible:ring-0"
                        checked={selectedTools.includes(id)}
                        onCheckedChange={(checked) => toggleTool(id, checked)}
                        aria-label={label}
                      />
                    </div>
                  ))}
                </div>
              </fieldset>

              {errorMessage && (
                <p className="m-0 text-xs text-[#c4c9d0]" role="alert">
                  {errorMessage}
                </p>
              )}

              <CardFooter className="justify-end rounded-none border-t border-[#2a3038] bg-transparent px-0 py-3">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-md bg-[#d3d7dd] text-[#08090b] hover:bg-[#e2e5e9] focus-visible:ring-0"
                >
                  {isSubmitting ? (
                    <>
                      <LoaderCircle className="animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      Create agent
                      <ArrowRight />
                    </>
                  )}
                </Button>
              </CardFooter>
            </CardContent>
          </Card>
        </form>
      </div>
    </main>
  );
};
