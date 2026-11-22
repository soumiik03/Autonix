import { useState } from "react";
import { ArrowUp, Bot, Paperclip, Plus, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Brand } from "../components/Brand";

export function Chat() {
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const selectedAgent = useSelector((state) => state.agent.selectedAgent);
  const suggestions = ["Plan my workday", "Create an agent", "Review an idea"];

  function sendMessage(message = draft) {
    const cleanMessage = message.trim();
    if (!cleanMessage) return;

    setMessages((current) => [
      ...current,
      { role: "user", text: cleanMessage },
      { role: "assistant", text: "I have that noted. Tell me what outcome you want, and we can shape the next step." },
    ]);
    setDraft("");
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
        <div className="chat-intro">
          <p className="chat-kicker">Chat</p>
          <h1>What are you working on?</h1>
          <p>Start with a clear task and shape the next step.</p>
        </div>

        <div className="chat-thread">
          {messages.length === 0 ? (
            <div className="chat-empty-state">
              <p>Write your first message</p>
              <div className="chat-suggestions" aria-label="Suggested messages">
                {suggestions.map((suggestion) => (
                  <button type="button" key={suggestion} onClick={() => chooseSuggestion(suggestion)}>
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : messages.map((message, index) => (
            <div className={`chat-message chat-message-${message.role}`} key={`${message.role}-${index}`}>
              <span className="chat-message-icon" aria-hidden="true">
                {message.role === "assistant" ? <Bot size={17} /> : <UserRound size={16} />}
              </span>
              <p>{message.text}</p>
            </div>
          ))}
        </div>

        <form className="chat-composer" onSubmit={handleSubmit}>
          {selectedAgent && (
            <p className="chat-agent-context">
              Using <strong>{selectedAgent}</strong>
            </p>
          )}
          <textarea value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={handleKeyDown} placeholder={selectedAgent ? `Message ${selectedAgent}` : "Ask Autonix anything"} rows="2" aria-label="Message Autonix" />
          <div className="chat-composer-footer">
            <button className="chat-tool-button" type="button" aria-label="Add attachment"><Paperclip size={17} /></button>
            <span className="chat-hint"><Plus size={14} /> New conversation</span>
            <button className="chat-send-button" type="submit" aria-label="Send message" disabled={!draft.trim()}><ArrowUp size={17} /></button>
          </div>
        </form>
      </section>
    </main>
  );
}
