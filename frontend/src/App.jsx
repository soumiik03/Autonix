import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import { Home } from "./pages/Home";
import { Agents } from "./pages/Agents";
import { Integration } from "./pages/Integration";
import { CreateAgent } from "./pages/CreateAgents";
import { useDispatch } from "react-redux";
import { me } from "./features/auth";
import { setUserData } from "../redux/userSlice";
import { useEffect, useState } from "react";

function App() {
  const dispatch=useDispatch();
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const fetch=async () => {
      try {
        const data=await me();
        console.log(data);
        dispatch(setUserData(data));
      } catch (error) {
        console.error(error);
      } finally {
        setAuthLoading(false);
      }
    };
    fetch();
  }, [dispatch]);
  const {userData}=useSelector((state)=>state.user);
  const loadingPage = (
    <main className="flex min-h-screen items-center justify-center bg-[#0b0c0f] font-sans text-sm text-[#aeb5bf]">
      Restoring your workspace...
    </main>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={authLoading ? loadingPage : userData ? <Navigate to={"/"} /> : <Login />} />
        <Route path="/" element={authLoading ? loadingPage : userData ? <Home /> : <Navigate to={"/login"} />} />
        <Route path="/agents" element={authLoading ? loadingPage : userData ? <Agents /> : <Navigate to={"/login"} />} />
        <Route path="/integration" element={authLoading ? loadingPage : userData ? <Integration/> : <Navigate to={"/login"} />} />
        <Route path="/agents/new" element={authLoading ? loadingPage : userData ? <CreateAgent/> : <Navigate to={"/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
