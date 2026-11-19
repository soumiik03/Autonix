import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import { Home } from "./pages/Home";
import { useDispatch } from "react-redux";
import { me } from "./features/auth";
import { setUserData } from "/redux/userSlice";
import { useEffect } from "react";

function App() {
  const dispatch=useDispatch();
  useEffect(() => {
    const fetch=async () => {
      try {
        const data=await me();
        console.log(data);
        dispatch(setUserData(data));
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);
  const {userData}=useSelector((state)=>state.user);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={userData ? <Navigate to={"/"} /> : <Login />} />
        <Route path="/" element={userData ? <Home /> : <Navigate to={"/login"} />} />
        <Route path="/agents" element={userData ? <Agents /> : <Navigate to={"/login"} />} />
        <Route path="/integration" element={userData ? <Integration/> : <Navigate to={"/login"} />} />
        <Route path="/agents/new" element={userData ? <CreateAgent/> : <Navigate to={"/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
