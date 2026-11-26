import { useEffect, useRef, useState } from "react";
import { ArrowUp, Bot, Check, ChevronDown, Plus, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Brand } from "../components/Brand";
import { agentChat, chat } from "../features/chat";
import { getAllAgents } from "../features/agent";
import { setAgents, setAgentsLoading, setSelectedAgent } from "../../redux/agentSlice";

function cleanResponse(text) {
  return String(text)
    .replace(/^#{1,6}\s*/gm, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/`{1,3}/g, "")
    .replace(/^\s*[-*]\s+/gm, "• ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function Chat() {
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [agentMenuOpen, setAgentMenuOpen] = useState(false);
  const threadRef = useRef(null);
  const conversationId = useRef(crypto.randomUUID());
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { agents, selectedAgent: savedAgent, agentsLoading } = useSelector((state) => state.agent);
  const selectedAgent = agents.some((agent) => agent.name === savedAgent) ? savedAgent : "";
  const activeAgentName = selectedAgent || "Autonix";
  const suggestions = ["Plan my workday", "Create an agent", "Review an idea"];

  useEffect(() => {
    if (agents.length > 0) return;

    async function loadAgents() {
      dispatch(setAgentsLoading(true));

      try {
        const data = await getAllAgents();
        dispatch(setAgents(data));
      } catch (error) {
        console.error("Error fetching agents:", error);
      } finally {
        dispatch(setAgentsLoading(false));
      }
    }

    loadAgents();
  }, [agents.length, dispatch]);

  useEffect(() => {
    const thread = threadRef.current;
    if (thread) thread.scrollTop = thread.scrollHeight;
  }, [messages, chatLoading]);

  async function sendMessage(message = draft) {
    const cleanMessage = message.trim();
    if (!cleanMessage || chatLoading) return;

    setMessages((current) => [...current, { role: "user", text: cleanMessage }]);
    setDraft("");

    setChatLoading(true);
    try {
      const response = selectedAgent
        ? await agentChat(cleanMessage, selectedAgent)
        : await chat(cleanMessage, conversationId.current);
      setMessages((current) => [
        ...current,
        { role: "assistant", text: response || "The assistant did not return a response." },
      ]);
    } catch (error) {
      console.error("Chat request failed:", error);
      const errorMessage = error.response?.data?.error || error.message;
      setMessages((current) => [
        ...current,
        { role: "assistant", text: errorMessage || "I could not get a response. Please try again." },
      ]);
    } finally {
      setChatLoading(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage();
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }

  function chooseSuggestion(suggestion) {
    setDraft(suggestion);
  }

  function chooseAgent(agentName) {
    dispatch(setSelectedAgent(agentName));
    setAgentMenuOpen(false);
  }

  function startNewConversation() {
    setMessages([]);
    setDraft("");
    conversationId.current = crypto.randomUUID();
  }

  function createNewAgent() {
    setAgentMenuOpen(false);
    navigate("/agents/new");
  }

  return (
    <main className="chat-page">
      <header className="chat-header">
        <Link className="chat-brand" to="/" aria-label="Back to Autonix home">
          <span className="chat-brand-mark"><Brand /></span>
          <span className="chat-wordmark">AUTONIX</span>
        </Link>
        <div className="chat-header-actions">
          <Link className="chat-home-link" to="/agents">Agents</Link>
          <span className="chat-avatar" aria-label="Account">A</span>
        </div>
      </header>

      <section className="chat-content" aria-label="Chat with Autonix">
        {messages.length === 0 && (
          <div className="chat-intro">
            <p className="chat-kicker">Chat</p>
            <h1>What are you working on?</h1>
            <p>Start with a clear task and shape the next step.</p>
            <div className="chat-suggestions" aria-label="Suggested messages">
              {suggestions.map((suggestion) => (
                <button type="button" key={suggestion} onClick={() => chooseSuggestion(suggestion)}>
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="chat-thread" ref={threadRef}>
          {messages.map((message, index) => (
            <div className={`chat-message chat-message-${message.role}`} key={`${message.role}-${index}`}>
              <span className="chat-message-icon" aria-hidden="true">
                {message.role === "assistant" ? <Bot size={17} /> : <UserRound size={16} />}
              </span>
              <p>{message.role === "assistant" ? cleanResponse(message.text) : message.text}</p>
            </div>
          ))}
          {chatLoading && <p className="chat-loading">Thinking...</p>}
        </div>

        <form className="chat-composer" onSubmit={handleSubmit}>
          <p className="chat-agent-context">
            Using <strong>{activeAgentName}</strong>
          </p>
          <textarea value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={handleKeyDown} placeholder={selectedAgent ? `Message ${selectedAgent}` : "Ask Autonix anything"} rows="2" aria-label={`Message ${activeAgentName}`} />
          <div className="chat-composer-footer">
            <div className="chat-agent-picker">
              <button className="chat-agent-trigger" type="button" onClick={() => setAgentMenuOpen((open) => !open)} aria-expanded={agentMenuOpen} aria-haspopup="listbox" disabled={agentsLoading}>
                <span>{activeAgentName}</span>
                <ChevronDown size={15} />
              </button>
              {agentMenuOpen && (
                <div className="chat-agent-menu" role="listbox" aria-label="Choose an agent">
                  <button type="button" className={!selectedAgent ? "is-selected" : ""} onClick={() => chooseAgent("")} aria-selected={!selectedAgent}>
                    <span>Autonix</span>
                    {!selectedAgent && <Check size={15} aria-hidden="true" />}
                  </button>
                  {agents.length === 0 && <span className="chat-agent-empty">No agents yet</span>}
                  {agents.map((agent) => (
                    <button type="button" className={selectedAgent === agent.name ? "is-selected" : ""} key={agent._id} onClick={() => chooseAgent(agent.name)} aria-selected={selectedAgent === agent.name}>
                      <span>{agent.name}</span>
                      {selectedAgent === agent.name && <Check size={15} aria-hidden="true" />}
                    </button>
                  ))}
                  <button type="button" className="chat-create-agent" onClick={createNewAgent}>Create new agent</button>
                </div>
              )}
            </div>
            <button className="chat-new-button" type="button" onClick={startNewConversation}><Plus size={14} /> New conversation</button>
            <button className="chat-send-button" type="submit" aria-label="Send message" disabled={!draft.trim() || chatLoading}><ArrowUp size={17} /></button>
          </div>
        </form>
      </section>
    </main>
  );
}
