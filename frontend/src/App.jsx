import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Preview from "./pages/Preview";
import Login from "./pages/Login";
import ResumeBuilder from "./pages/ResumeBuilder";


const App = () => {
  return (
    <>
      <Routes>
          {/* Root route */}
        <Route path='/' element={<Home />} />

        {/* Nested routes under /app */}
        <Route path='app' element={<Layout />} >
        <Route index element={<Dashboard />} />
        <Route path='builder/:resumeId' element={<ResumeBuilder />} />
        </Route>

        <Route path='view/:resumeId' element={<Preview/>}/>
        
         {/* Login route */}
        <Route path='login' element={<Login/>}/>
      </Routes>

    </>
  );
};

export default App;
