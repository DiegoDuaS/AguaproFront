import React from 'react';
import './admin.css';
import { CircularProgress } from '@mui/material';
import searchIcon from './../../../image/searchIcon.png';
import useApiP from '../../../hooks/useAPIProducts';
import { BiError } from "react-icons/bi";

const ClientesPage = () => {
  const { data: pedidos, errorMessage, isLoading } = useApiP('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/pedidos');

  if (isLoading) {
    return (
      <div className="container">
        <div className="text">Clientes</div>
        <div className="search-bar">
          <input
            className="searchbar"
            type="text"
            placeholder="Search Clientes..."
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
        <div className="text">Clientes</div>
        <div className="search-bar">
          <input
            className="searchbar"
            type="text"
            placeholder="Search Clientes..."
          />
          <button className="search-btn">
            <img src={searchIcon} alt="Search" />
          </button>
        </div>
        <div className='space' />
        <div className='error-container'>
          <BiError color='black' size={80}/>
          <p className='loading'>Error Cargando Clientes - {errorMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="text">Clientes</div>
      <div className="search-bar">
        <input 
          className="searchbar" 
          type="text" 
          placeholder="Search Clientes..." 
        />
        <button className="search-btn">
          <img src={searchIcon} alt="Search" />
        </button>
      </div>

      {/* PANTALLA PRINCIPAL SIN BUSCAR */}
      <div className="table">
        <div className="table-grid table-header">
          <h3>Cliente Id</h3>
          <h3>Nombre</h3>
          <h3>NIT</h3>
        </div>
        {pedidos.map((pedido, index) => (
          <div className="table-grid table-row" key={index}>
            <p className='table-text'>#{pedido.id_pedido}</p>
            <p className='table-text'>{pedido.cliente}</p>
            <p className='table-text'>{pedido.nit_empresa}</p>
            <p className='table-text'>Q.{pedido.monto_total}</p>
            <p className='table-text'>{pedido.direccion}</p>
            <button 
              className='more-edit' 
            >
              ...
            </button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientesPage;
