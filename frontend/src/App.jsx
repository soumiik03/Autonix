import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { me } from "./features/auth";
import { setUserData } from "../redux/userSlice";
import Login from "./pages/Login";
import { Home } from "./pages/Home";
import { Agents } from "./pages/Agents";
import { Integration } from "./pages/Integration";
import { CreateAgent } from "./pages/CreateAgents";
import "./App.css";
import { chat } from "./features/chat";

function App() {
  const dispatch = useDispatch();
  const [authLoading, setAuthLoading] = useState(true);
  const userData = useSelector((state) => state.user.userData);
  
  useEffect(() => {
    me()
      .then((data) => dispatch(setUserData(data || null)))
      .catch(() => dispatch(setUserData(null)))
      .finally(() => setAuthLoading(false));
  }, [dispatch]);

  if (authLoading)
    return (
      <main className="login-page">
        <p className="muted small">Restoring your workspace...</p>
      </main>
    );
  const protectedPage = (element) =>
    userData ? element : <Navigate to="/login" replace />;
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={userData ? <Navigate to="/" replace /> : <Login />}
        />
        <Route path="/" element={protectedPage(<Home />)} />
        <Route path="/agents" element={protectedPage(<Agents />)} />
        <Route path="/agents/new" element={protectedPage(<CreateAgent />)} />
        <Route path="/integration" element={protectedPage(<Integration />)} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
