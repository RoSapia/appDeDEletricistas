import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import InputMask from 'react-input-mask';
import { FaCheck } from 'react-icons/fa';
import api from '../api';

function Cadastro() {
  const [formData, setFormData] = useState({
    cpf: '',
    nomeCompleto: '',
    email: '',
    senha: '',
    endereco: {
      cep: '',
      numero: '',
      complemento: ''
    }
  });
  const [cepValid, setCepValid] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('endereco.')) {
      const field = name.split('.')[1];
      setFormData((prevData) => ({
        ...prevData,
        endereco: { ...prevData.endereco, [field]: value }
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await api.post("/clientes", formData);
      if(response.status === 201) {
        setModalMessage('Cadastro realizado com sucesso!');
        setShowModal(true);
        setIsSuccessModal(true);
      }
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
      setModalMessage('Erro ao realizar o cadastro. Tente novamente.');
      setShowModal(true);
      setIsSuccessModal(false);
    } finally {
      setIsLoading(false);
    }
  };

  const validateCep = async () => {
    const cep = formData.endereco.cep.replace('-', '');
    if (cep.length !== 8) {
      setModalMessage('CEP inválido. Certifique-se de que possui 8 dígitos.');
      setShowModal(true);
      setCepValid(false);
      setIsSuccessModal(false);
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setModalMessage('CEP inválido.');
        setCepValid(false);
      } else {
        setModalMessage('CEP válido!');
        setCepValid(true);
      }
      setShowModal(true);
      setIsSuccessModal(false); 
    } catch (error) {
      console.error('Erro ao validar o CEP:', error);
      setModalMessage('Erro ao validar o CEP.');
      setShowModal(true);
      setCepValid(false);
      setIsSuccessModal(false); 
    }
  };

  const closeModal = () => {
    setShowModal(false);
    if (isSuccessModal) {
      navigate('/login');
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 py-10">
        <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-700">Cadastro</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-600">CPF</label>
              <InputMask
                mask="999.999.999-99"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Digite seu CPF"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600">Nome Completo</label>
              <input
                type="text"
                name="nomeCompleto"
                value={formData.nomeCompleto}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Digite seu nome completo"
                required
              />
            </div>
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
            <div>
              <label className="block text-gray-600">CEP</label>
              <div className="flex items-center space-x-2">
                <InputMask
                  mask="99999-999"
                  name="endereco.cep"
                  value={formData.endereco.cep}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Digite o CEP"
                  required
                />
                <button
                  type="button"
                  onClick={validateCep}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg focus:outline-none hover:bg-indigo-700"
                >
                  {cepValid ? <FaCheck className="text-green-500" /> : 'Validar'}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-gray-600">Número</label>
              <input
                type="text"
                name="endereco.numero"
                value={formData.endereco.numero}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Número da residência"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600">Complemento</label>
              <input
                type="text"
                name="endereco.complemento"
                value={formData.endereco.complemento}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Complemento"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full px-4 py-2 text-white rounded-lg focus:outline-none ${
                isLoading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {isLoading ? (
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6 mx-auto"></div>
              ) : (
                'Cadastrar'
              )}
            </button>
          </form>
          <p className="text-center text-gray-600">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Faça login
            </Link>
          </p>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
            <h2 className="text-xl font-semibold mb-4">{modalMessage}</h2>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <style>{`
        .loader {
          border-color: #ffffff;
          border-top-color: #4f46e5;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}

export default Cadastro;
