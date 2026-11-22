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
import { Chat } from "./pages/Chat";
import "./App.css";

function ProtectedRoute({ children, isAuthenticated }) {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

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

  if (authLoading) {
    return (
      <main className="login-page">
        <p className="muted small">Restoring your workspace...</p>
      </main>
    );
  }

  const isAuthenticated = Boolean(userData);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agents"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Agents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agents/new"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CreateAgent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/integration"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Integration />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
