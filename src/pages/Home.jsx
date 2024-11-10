import React from 'react';
import Navbar from '../components/Navbar';
import foto1 from '../assets/foto1.webp';
import foto2 from '../assets/foto2.webp';
import foto3 from '../assets/foto3.webp';
import foto4 from '../assets/foto4.webp';


function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <section id="sobre" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Sobre Nós</h2>
          <p className="text-gray-700">
            Somos uma empresa criada em 2020, formados em eletrotécnica, com compromisso com a sua segurança e bem-estar de todos.
          </p>
        </div>
      </section>
      <section id="servicos" className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Nossos Serviços</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-indigo-600">Instalação e Manutenção de Chuveiro Elétrico</h3>
              <p className="text-gray-700 mt-2">Realizamos a troca e instalação de chuveiros.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-indigo-600">Troca ou Reparo na Fiação</h3>
              <p className="text-gray-700 mt-2">Verificamos toda a fiação, identificamos desgastes e realizamos a troca dos circuitos conforme a norma NBR 5410.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-indigo-600">Instalação e Troca de Tomadas</h3>
              <p className="text-gray-700 mt-2">Realizamos troca ou reparo de tomadas.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-indigo-600">Troca ou Reparo de Lustres</h3>
              <p className="text-gray-700 mt-2">Realizamos troca ou reparo de lustres, luminárias, plafons, spots, etc.</p>
            </div>
          </div>
        </div>
      </section>
      <section id="contato" className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Entre em Contato</h2>
          <p className="text-gray-700">Estamos prontos para atender você. Entre em contato conosco pelos seguintes meios:</p>
          <ul className="mt-4 text-gray-700">
            <li><strong>Email:</strong> dorinei.isa@hotmail.com</li>
            <li><strong>Telefone:</strong> (11) 9 8937-1254</li>
            <li><strong>WhatsApp:</strong> <a href="https://wa.me/5511989371254" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Conversar no WhatsApp</a></li>
            <li><strong>Instagram:</strong> <a href="https://www.instagram.com/dedeletricistas/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">@dedeletricistas</a></li>
          </ul>
        </div>
      </section>
      <section id="fotos" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Galeria de Fotos</h2>
          <p className="text-gray-700">Confira algumas imagens de nossos projetos e serviços realizados.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <img className="h-32 bg-gray-300 rounded-md" src={foto1} alt="Foto descritiva do serviço elétrico" />
            <img className="h-32 bg-gray-300 rounded-md" src={foto2} alt="Foto descritiva do serviço elétrico" />
            <img className="h-32 bg-gray-300 rounded-md" src={foto3} alt="Foto descritiva do serviço elétrico" />
            <img className="h-32 bg-gray-300 rounded-md" src={foto4} alt="Foto descritiva do serviço elétrico" />
          </div>
        </div>
      </section>
      <footer className="bg-indigo-600 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>CNPJ: 51.297.312/0001-40</p>
          <p>Todos os direitos reservados - D&D Eletricistas - 2024</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
