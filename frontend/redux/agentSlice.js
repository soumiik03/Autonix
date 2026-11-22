import { createSlice } from "@reduxjs/toolkit";

const agentSlice = createSlice({
  name: "agent",
  initialState: {
    agents: [],
    selectedAgent: "",
    agentsLoading: false,
  },
  reducers: {
    setAgents: (state, action) => {
      state.agents = Array.isArray(action.payload)
        ? action.payload
        : action.payload?.agents || [];
    },
    setSelectedAgent: (state, action) => {
      state.selectedAgent = action.payload;
    },
    setAgentsLoading: (state, action) => {
      state.agentsLoading = action.payload;
    },
    setDelete: (state, action) => {
      const deletedAgent = state.agents.find((agent) => agent._id === action.payload);
      state.agents = state.agents.filter((agent) => agent._id !== action.payload);

      if (deletedAgent?.name === state.selectedAgent) {
        state.selectedAgent = "";
      }
    },
  },
});

export const { setAgents, setSelectedAgent, setAgentsLoading, setDelete } = agentSlice.actions;
export default agentSlice.reducer;
