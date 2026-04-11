import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Preview from "./pages/Preview";
import Login from "./pages/Login";
import ResumeBuilder from "./pages/ResumeBuilder";
import { useDispatch } from "react-redux";
import api from "./config/api";
import { login, setLoading } from "./app/features/authSlice";
import { Toaster } from "react-hot-toast";

const App = () => {
  const dispatch = useDispatch();

  const getUserData = async () => {
    dispatch(setLoading(true));
    try {
      const { data } = await api.get("/api/users/profile", {
        withCredentials: true,
      });
      if (data) dispatch(login(data));
    } catch (error) {
      console.log(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  // ✅ Mobile scaling for resume preview
  useEffect(() => {
    const scaleResumeForMobile = () => {
      const preview = document.getElementById("resume-preview");
      if (!preview) return;

      const screenWidth = window.innerWidth;
      if (screenWidth < 794) {
        const scale = screenWidth / 794;
        preview.style.transform = `scale(${scale})`;
        preview.style.transformOrigin = "top left";
        preview.style.width = "794px";
        preview.style.height = `${1123 * scale}px`;
      } else {
        preview.style.transform = "";
        preview.style.transformOrigin = "";
        preview.style.width = "";
        preview.style.height = "";
      }
    };

    // Run on load and every resize
    scaleResumeForMobile();
    window.addEventListener("resize", scaleResumeForMobile);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", scaleResumeForMobile);
  }, []);

  return (
    <>
      <Toaster />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Protected */}
        <Route path="/app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="builder/:resumeId" element={<ResumeBuilder />} />
        </Route>

        {/* Public share link */}
        <Route path="view/:resumeId" element={<Preview />} />
      </Routes>
    </>
  );
};

export default App;
