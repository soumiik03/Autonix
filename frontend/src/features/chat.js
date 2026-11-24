import api from "../api";

export async function chat(message, threadId) {
  const { data } = await api.post("/api/chat", {
    messages: message,
    threadId,
  });
  if (typeof data === "string") return data;
  return data?.aiResponse || data?.message || "";
}

export async function agentChat(message, agent) {
  const { data } = await api.post("/api/chat/agent", {
    messages: message,
    agent,
  });
  if (typeof data === "string") return data;
  return data?.aiResponse || data?.message || "";
}

