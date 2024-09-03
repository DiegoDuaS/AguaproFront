import React from 'react';
import './admin.css';
import { CircularProgress } from '@mui/material';
import searchIcon from './../../../image/searchIcon.png';
import useApiP from '../../../hooks/useAPIProducts';
import { BiError } from "react-icons/bi";

const ClientesPage = () => {
  const { data: clientes, errorMessage, isLoading } = useApiP('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/clientes');

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
          <p className='loading'>Cargando Clientes...</p>
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

      <div className='clients-tablespace'> 
      {/* PANTALLA PRINCIPAL SIN BUSCAR */}
        <div className="table2">
          <div className="table2-grid table2-header">
            <h3>Cliente Id</h3>
            <h3>Nombre</h3>
            <h3>Dirección</h3>
            <h3>Teléfono</h3>
            <h3>NIT</h3>
          </div>
          {clientes.map((cliente, index) => (
            <div className="table2-grid table-row" key={index}>
              <p className='table-text'>#{cliente.id_cliente}</p>
              <p className='table-text'>{cliente.nombre}</p>
              <p className='table-text'>{cliente.direccion}</p>
              <p className='table-text'>{cliente.telefono}</p>
              <p className='table-text'>{cliente.nit}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientesPage;
