import React, { useState } from 'react';
import './admin.css';
import { CiEdit } from "react-icons/ci";
import searchIcon from './../../../image/searchIcon.png';
import { CircularProgress } from '@mui/material';
import useApiP from '../../../hooks/useAPIProducts';
import { BiError } from "react-icons/bi";

const PedidosPage = () => {
  const { data: pedidos, errorMessage, isLoading } = useApiP('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/pedidos');
  const [estados, setEstados] = useState({}); // Estado para manejar los estados individuales de cada pedido

  const handleEstadoChange = (pedidoId, newEstado) => {
    setEstados((prevEstados) => ({
      ...prevEstados,
      [pedidoId]: newEstado, // Actualiza el estado específico de este pedido
    }));
  };

  const getClassName = (estado) => {
    switch (estado) {
      case 'Pendiente':
        return 'pendiente';
      case 'Procesando':
        return 'procesando';
      case 'Enviado':
        return 'enviado';
      case 'Entregado':
        return 'entregado';
      case 'Cancelado':
        return 'cancelado';
      default:
        return 'state';
    }
  };

  if (isLoading) {
    return (
      <div className="container">
        <div className="text">Pedidos</div>
        <div className="search-bar">
          <input
            className="searchbar"
            type="text"
            placeholder="Search Pedidos..."
          />
          <button className="search-btn">
            <img src={searchIcon} alt="Search" />
          </button>
        </div>
        <div className='space' />
        <div className='loadingcontainer'>
          <CircularProgress />
          <p className='loading'>Cargando pedidos...</p>
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="container">
        <div className="text">Pedidos</div>
        <div className="search-bar">
          <input
            className="searchbar"
            type="text"
            placeholder="Search Pedidos..."
          />
          <button className="search-btn">
            <img src={searchIcon} alt="Search" />
          </button>
        </div>
        <div className='space' />
        <div className='error-container'>
          <BiError color='black' size={80}/>
          <p className='loading'>Error Cargando Pedidos - {errorMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="text">Pedidos</div>
      <div className="search-bar">
        <input 
          className="searchbar" 
          type="text" 
          placeholder="Search Pedidos..." 
        />
        <button className="search-btn">
          <img src={searchIcon} alt="Search" />
        </button>
      </div>

      {/* PANTALLA PRINCIPAL SIN BUSCAR */}
      <div className="table">
        <div className="table-grid table-header">
          <h3>Pedido Id</h3>
          <h3>Cliente</h3>
          <h3>NIT</h3>
          <h3>Total</h3>
          <h3>Dirección</h3>
          <h3>Descuento</h3>
          <h3>Productos</h3>
          <h3>Estado</h3>
        </div>
        {pedidos.map((pedido, index) => (
          <div className="table-grid table-row" key={index}>
            <p className='table-text'>#{pedido.id_pedido}</p>
            <p className='table-text'>{pedido.cliente}</p>
            <p className='table-text'>{pedido.nit_empresa}</p>
            <p className='table-text'>Q.{pedido.monto_total}</p>
            <p className='table-text'>{pedido.direccion}</p>
            <p className='table-text'>
              {pedido.id_descuento === 0 ? (
                'N/A'
              ) : pedido.id_descuento === 1 ? (
                '5%'
              ) : pedido.id_descuento === 2 ? (
                '10%'
              ) : pedido.id_descuento === 3 ? (
                '15%'
              ) : pedido.id_descuento === 4 ? (
                '20%'
              ) : pedido.id_descuento === 5 ? (
                '25%'
              ) : (
                'Otro tipo de descuento'
              )}
            </p>
            <button 
              className='more-edit' 
            >
              ...
            </button>
            <select
              value={estados[pedido.id_pedido] || pedido.estado} 
              onChange={(e) => handleEstadoChange(pedido.id_pedido, e.target.value)}
              className={`state ${getClassName(estados[pedido.id_pedido] || pedido.estado)}`}
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Procesando">Procesando</option>
              <option value="Enviado">Enviado</option>
              <option value="Entregado">Entregado</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PedidosPage;
