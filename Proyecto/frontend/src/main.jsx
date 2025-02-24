import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { GlobalProvider } from "@/context/GlobalContext";
import ToastContainer from "@/components/ToastContainer";
import "@/styles/index.css";
import Home from "@/pages/Home";
import PatientAdmission from "@/pages/PatientAdmission";
import Login from "@/pages/Login";
import Register from "@/pages/Register.jsx";
import RecoveryPassword from "@/pages/RecoveryPassword.jsx";
import GuidesProtocols from "@/pages/GuidesProtocols";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<h1>Dashboard</h1>} />
            <Route path="patient-admission" element={<PatientAdmission />} />
            <Route path="guides-protocols" element={<GuidesProtocols />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recovery" element={<RecoveryPassword />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </GlobalProvider>
  </StrictMode>,
);
