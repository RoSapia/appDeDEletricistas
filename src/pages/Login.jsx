import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import api from '../api';
import { getPayloadFromToken } from '../utils';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await api.post('/clientes/login', formData);
      if (response.status === 200) {
        toast.success('Login realizado com sucesso!');
        const payload = getPayloadFromToken(response.data.token)
        sessionStorage.setItem("cpf", payload.cpf);
        sessionStorage.setItem("nome", payload.nomeCompleto);
        sessionStorage.setItem("perfil", payload.perfil);
        sessionStorage.setItem("token", response.data.token);
        navigate("/agendamentos");
      }
    } catch (error) {
      toast.error('Email e/ou senha inválidos');
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Digite seu email"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600">Senha</label>
              <input
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Digite sua senha"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
            >
              Entrar
            </button>
          </form>
          <p className="text-center text-gray-600">
            Não tem uma conta?{' '}
            <Link to="/cadastro" className="text-indigo-600 hover:underline">Cadastre-se</Link>
          </p>
        </div>
      </div>
      
      {/* Toast container */}
      <ToastContainer />
    </>
  );
}

export default Login;
