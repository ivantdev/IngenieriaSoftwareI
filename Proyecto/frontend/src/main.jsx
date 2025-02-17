import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { GlobalProvider } from "@/context/GlobalContext";
import ToastContainer from "@/components/ToastContainer";
import "@/styles/index.css";
import Home from "@/pages/Home";
import PatientAdmission from "@/pages/PatientAdmission";
import Login from "@/pages/Login";
import RecuperarPassword from "@/pages/RecuperarPassword";
import Registro from "@/pages/Registro.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<h1>Dashboard</h1>} />
            <Route path="patient-admission" element={<PatientAdmission />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/recuperar" element={<RecuperarPassword />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </GlobalProvider>
  </StrictMode>,
);
