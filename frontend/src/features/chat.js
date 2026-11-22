import api from "../api";

export async function chat(message) {
  const { data } = await api.post("/api/chat", { messages: message });
  if (typeof data === "string") return data;
  return data?.aiResponse || data?.message || "";
}
