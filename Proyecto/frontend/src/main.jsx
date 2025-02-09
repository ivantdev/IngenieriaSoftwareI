import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // ⬅ Usa "react-router-dom"
import "/src/styles/index.css"; // ⬅ Usa importación relativa estándar

import Home from "/src/pages/Home";
import Login from "/src/pages/Login";
//import Dashboard from ".../pages/Dashboard"; // ⬅ Descomentar si lo necesitas

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Home />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> ⬅ Usa esto si tienes un Dashboard separado */}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
