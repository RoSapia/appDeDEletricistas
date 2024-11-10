import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputMask from 'react-input-mask';
import Navbar from '../components/Navbar';

function RegistrarAtendimento() {
  const [formData, setFormData] = useState({
    tituloDoServico: '',
    descricao: '',
    dataAgendamento: '',
    horario: '',
    clienteCpf: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("token");
      await api.post('/agendamentos', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Atendimento registrado com sucesso!');
      setTimeout(() => {
        navigate('/agendamentos');
      }, 1500);
    } catch (error) {
      if(error.status === 404) {
        toast.warn("CPF informado não foi encontrado!");
      } else {
        toast.error("Erro ao registrar atendimento");
      }
     
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
        <h2 className="text-3xl font-bold text-gray-700 mb-6">Registrar Atendimento</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md space-y-4">
          <div>
            <label className="block text-gray-600">Título do Serviço</label>
            <input
              type="text"
              name="tituloDoServico"
              value={formData.tituloDoServico}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Título do serviço"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600">Descrição</label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Descrição do serviço"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600">Data de Agendamento</label>
            <input
              type="date"
              name="dataAgendamento"
              value={formData.dataAgendamento}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600">Horário</label>
            <input
              type="time"
              name="horario"
              value={formData.horario}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600">CPF do Cliente</label>
            <InputMask
              mask="999.999.999-99"
              type="text"
              name="clienteCpf"
              value={formData.clienteCpf}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="CPF do cliente"
              required
            />
          </div>
          <button type="submit" className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Registrar Atendimento
          </button>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}

export default RegistrarAtendimento;
