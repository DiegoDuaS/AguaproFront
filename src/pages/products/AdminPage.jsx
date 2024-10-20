import PedidosPage from './Admin/PedidosPage';
import ProductosPage from './Admin/ProductosPage';
import AnaliticaPage from './Admin/AnaliticaPage';
import ClientesPage from './Admin/ClientesPage';
import SolicitudesPage from './Admin/SolicitudesPage';
import { useState, useEffect } from "react";
import CustomNav from "../../components/AdminNav.jsx";
import AdminHeader from "../../components/headers/AdminHeader.jsx";
import PropTypes from 'prop-types';
import UsuariosPage from './Admin/UsuariosPage.jsx';
import { BsBoxSeam, BsGraphUp, BsGear } from "react-icons/bs";
import {FaUsers } from "react-icons/fa";
import { GoMail } from "react-icons/go";
import { PiClipboardText } from "react-icons/pi";


const AdminPage = ({ onRouteChange }) => {
  const [selectedOption, setSelectedOption] = useState(() => {
    return localStorage.getItem('activeOption') || 'Pedidos';
  });
  
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (selectedOption) {
      localStorage.setItem('activeOption', selectedOption);
    }
  }, [selectedOption]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const renderSelectedPage = () => {
    switch (selectedOption) {
      case 'Pedidos':
        return <PedidosPage />;
      case 'Productos':
        return <ProductosPage />;
      case 'Analítica':
        return <AnaliticaPage />;
      case 'Clientes':
        return <ClientesPage />;
      case 'Usuarios':
        return <UsuariosPage />;
      case 'Solicitudes':
        return <SolicitudesPage />;
      default:
        return <PedidosPage />; // Página por defecto
    }
  };

  const handleLogout = () => {
    // Lógica para cerrar sesión
    localStorage.removeItem('token');
    localStorage.removeItem('activeOption');
    onRouteChange('Bombas de agua');
  };

  const handleLeave = () => {
    onRouteChange('Bombas de agua');
  };

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AdminHeader 
        handleLogout={handleLogout} 
        isExpanded={isExpanded} 
        toggleMenu={toggleMenu} 
        handleLeave={handleLeave}
      />
      <div style={{ display: 'flex', flex: '1' }}>
        <CustomNav
          li={[
            ["Pedidos", PiClipboardText ],
            ["Productos", BsBoxSeam],
            ["Analítica", BsGraphUp],
            ["Clientes", FaUsers],
            ["Usuarios", BsGear],
            ["Solicitudes", GoMail]
          ]}
          onOptionSelect={handleOptionSelect}
          isExpanded={isExpanded}
        />
        <div className="admin-content-container" style={{ flex: '1', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
          {renderSelectedPage()}
        </div>
      </div>
    </div>
  );
};

AdminPage.propTypes = {
  onRouteChange: PropTypes.func.isRequired
};

export default AdminPage;
