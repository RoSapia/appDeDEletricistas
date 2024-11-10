import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import api from '../api';
import Navbar from '../components/Navbar';

function Agendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [cpf, setCpf] = useState('');
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAgendamento, setSelectedAgendamento] = useState(null);
  
  const perfil = sessionStorage.getItem("perfil");
  const isCliente = perfil === 'USUARIO';
  const isAdmin = perfil === 'ADMIN';
  const navigate = useNavigate();

  useEffect(() => {
    fetchAgendamentos();
  }, [isCliente]);

  const fetchAgendamentos = async () => {
    try {
      const token = sessionStorage.getItem("token");
      
      let response;
      if (isCliente) {
        const cpf = sessionStorage.getItem("cpf");
        response = await api.get(`/agendamentos?cpf=${cpf}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        response = await api.get(`/agendamentos/todos`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      setAgendamentos(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
      toast.error("Erro ao buscar agendamentos");
    }
  };

  const handleCpfSearch = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await api.get(`/agendamentos?cpf=${cpf}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAgendamentos(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.warn("CPF não encontrado");
      } else {
        console.error("Erro ao buscar agendamentos por CPF:", error);
        toast.error("Erro ao buscar agendamentos por CPF");
      }
    }
  };

  const handleDateSearch = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await api.get(`/agendamentos/data?dataInicial=${dataInicial}&dataFinal=${dataFinal}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAgendamentos(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Erro ao buscar agendamentos por intervalo de datas:", error);
      toast.error("Erro ao buscar agendamentos por intervalo de datas");
    }
  };

  const handleRegistrarAtendimento = () => {
    navigate('/registrar-atendimento');
  };

  const openEditModal = (agendamento) => {
    setSelectedAgendamento({
      ...agendamento,
      dataAgendamento: formatDate(agendamento.dataAgendamento),
      horario: formatTime(agendamento.horario)
    });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (agendamento) => {
    setSelectedAgendamento(agendamento);
    setIsDeleteModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedAgendamento(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedAgendamento(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("token");
      
      const data = {
        id: selectedAgendamento.id,
        tituloDoServico: selectedAgendamento.tituloDoServico,
        descricao: selectedAgendamento.descricao,
        dataAgendamento: selectedAgendamento.dataAgendamento,
        horario: selectedAgendamento.horario,
        clienteCpf: selectedAgendamento.clienteCpf
      };

      await api.put(`/agendamentos`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Agendamento atualizado com sucesso!');
      closeEditModal();
      fetchAgendamentos(); 
    } catch (error) {
      if(error.status === 404){
        toast.warn("O CPF informado não foi encontrado");
      } else {
        toast.error("Erro ao atualizar agendamento");
      }
    }
  };

  const handleDelete = async () => {
    try {
      const token = sessionStorage.getItem("token");
      await api.delete(`/agendamentos/${selectedAgendamento.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Agendamento deletado com sucesso!');
      closeDeleteModal();
      fetchAgendamentos(); 
    } catch (error) {
      console.error("Erro ao deletar agendamento:", error);
      toast.error("Erro ao deletar agendamento");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedAgendamento((prev) => ({ ...prev, [name]: value }));
  };

  const formatDate = (dateArray) => {
    if (!dateArray || dateArray.length < 3) return '';
    const [year, month, day] = dateArray;
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const formatTime = (timeArray) => {
    if (!timeArray || timeArray.length < 2) return '';
    const [hour, minute] = timeArray;
    return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
        {isCliente && (
          <h2 className="text-3xl font-bold text-gray-700 mb-6">Minha Agenda</h2>
        )}
        {isAdmin && (
          <h2 className="text-3xl font-bold text-gray-700 mb-6">Agendamentos</h2>
        )}

        {isAdmin && (
          <button
            onClick={handleRegistrarAtendimento}
            className="px-4 py-2 mb-6 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Registrar Atendimento
          </button>
        )}

        {isAdmin && (
          <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Filtros de Pesquisa</h3>

            <div className="mb-4">
              <label className="block text-gray-600">Pesquisar por CPF</label>
              <div className="flex items-center space-x-2">
                <InputMask
                  mask="999.999.999-99"
                  type="text"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Digite o CPF"
                />
                <button
                  onClick={handleCpfSearch}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Buscar
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-600">Pesquisar por Intervalo de Datas</label>
              <div className="flex items-center space-x-2">
                <input
                  type="date"
                  value={dataInicial}
                  onChange={(e) => setDataInicial(e.target.value)}
                  className="px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-gray-600">até</span>
                <input
                  type="date"
                  value={dataFinal}
                  onChange={(e) => setDataFinal(e.target.value)}
                  className="px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={handleDateSearch}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Buscar
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {agendamentos.length > 0 ? (
            agendamentos.map((agendamento, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-indigo-600">{agendamento.tituloDoServico}</h3>
                <p className="text-gray-700 mt-2">{agendamento.descricao}</p>
                <p className="text-gray-700 mt-2">
                  <strong>Data:</strong> {new Date(...agendamento.dataAgendamento).toLocaleDateString()}
                </p>
                <p className="text-gray-700">
                  <strong>Horário:</strong> {agendamento.horario[0]}:{agendamento.horario[1].toString().padStart(2, '0')}
                </p>
                <p className="text-gray-700">
                  <strong>CPF do Cliente:</strong> {agendamento.clienteCpf}
                </p>

                {isAdmin && (
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => openEditModal(agendamento)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Editar ✏️
                    </button>
                    <button
                      onClick={() => openDeleteModal(agendamento)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Excluir 🗑️
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-600">Nenhum agendamento encontrado.</p>
          )}
        </div>

        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Editar Agendamento</h3>
              <form onSubmit={handleEditSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-600">Título do Serviço</label>
                  <input
                    type="text"
                    name="tituloDoServico"
                    value={selectedAgendamento?.tituloDoServico || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600">Descrição</label>
                  <textarea
                    name="descricao"
                    value={selectedAgendamento?.descricao || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600">Data de Agendamento</label>
                  <input
                    type="date"
                    name="dataAgendamento"
                    value={selectedAgendamento?.dataAgendamento || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600">Horário</label>
                  <input
                    type="time"
                    name="horario"
                    value={selectedAgendamento?.horario || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600">CPF do Cliente</label>
                  <InputMask
                    mask="999.999.999-99"
                    type="text"
                    name="clienteCpf"
                    value={selectedAgendamento?.clienteCpf || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={closeEditModal}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Confirmar Exclusão</h3>
              <p className="text-gray-700 mb-4">
                Tem certeza de que deseja excluir este agendamento?
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={closeDeleteModal}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        )}

        <ToastContainer />
      </div>
    </>
  );
}

export default Agendamentos;
