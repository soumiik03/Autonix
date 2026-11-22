import api from "../api";

export async function createAgent(agent) {
  const { data } = await api.post("/api/agent/create", agent);
  return data;
}

export async function getAllAgents() {
  const { data } = await api.get("/api/agent/all");
  return data;
}

export async function getAgentById(id) {
  const { data } = await api.get(`/api/agent/${id}`);
  return data;
}

export async function deleteAgent(id) {
  const { data } = await api.delete(`/api/agent/${id}`);
  return data;
}
