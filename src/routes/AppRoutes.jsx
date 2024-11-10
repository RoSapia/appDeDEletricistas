import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import Agendamentos from '../pages/Agendamentos';
import RegistrarAtendimento from '../pages/RegistrarAtendimento';
import Home from '../pages/Home';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/agendamentos" element={<Agendamentos />} />
        <Route path="/registrar-atendimento" element={<RegistrarAtendimento />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
