import { configureStore } from "@reduxjs/toolkit";
import agentReducer from "./agentSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    agent: agentReducer,
  },
});
