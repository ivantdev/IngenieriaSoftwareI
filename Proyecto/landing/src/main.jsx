import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import "@/styles/index.css";
import Home from "@/pages/Home";
import PreRegistration from "@/pages/PreRegistration";
import Servicios from "@/pages/Servicios";
import Especialidades from "@/pages/Especialidades";
import Ubicacion from "@/pages/Ubicacion";
import Horarios from "@/pages/Horarios";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pre-registration" element={<PreRegistration />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/especialidades" element={<Especialidades />} />
        <Route path="/ubicacion" element={<Ubicacion />} />
        <Route path="/horarios" element={<Horarios />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
