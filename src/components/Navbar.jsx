import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  // Verifica se o token está presente para definir se o usuário está logado
  const isLoggedIn = !!sessionStorage.getItem("token");

  // Função de logout
  const handleLogout = () => {
    // Remove os dados de autenticação da sessionStorage
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("cpf");
    sessionStorage.removeItem("nome");
    sessionStorage.removeItem("perfil");
    navigate("/login"); // Redireciona para a página de login
  };

  return (
    <nav className="bg-indigo-600 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-semibold">
          D&D Eletricistas
        </Link>
        <div className="flex space-x-4">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-white hover:bg-indigo-500 px-3 py-2 rounded-lg"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white hover:bg-indigo-500 px-3 py-2 rounded-lg"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
