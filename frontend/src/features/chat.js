import api from "../api";

export async function chat(message) {
  const { data } = await api.post("/api/chat", { messages: message });
  return data;
}