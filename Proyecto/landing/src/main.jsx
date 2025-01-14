import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";

import '@/styles/index.css';
import Home from '@/pages/Home';
import PreRegistration from '@/pages/PreRegistration';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pre-registration" element={<PreRegistration />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);