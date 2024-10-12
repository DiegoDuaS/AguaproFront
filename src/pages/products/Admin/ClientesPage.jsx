import React, { useState, useCallback } from 'react';
import './admin.css';
import { CircularProgress } from '@mui/material';
import searchIcon from './../../../image/searchIcon.png';
import useApiP from '../../../hooks/useAPIProducts';
import { BiError } from "react-icons/bi";

const ClientesPage = () => {
  const { data: clientes, errorMessage, isLoading } = useApiP('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/clientes');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSearch = useCallback(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setIsSearchActive(false);
      return;
    }

    const filteredResults = clientes.filter(cliente =>
      cliente.id_cliente.toString().includes(searchTerm.toLowerCase()) ||
      cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.direccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.telefono.includes(searchTerm) ||
      cliente.nit.includes(searchTerm)
    );

    setSearchResults(filteredResults);
    setIsSearchActive(true);
  }, [searchTerm, clientes]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  if (isLoading) {
    return (
      <div className="container">
        <div className="text">Clientes</div>
        <div className="search-bar">
          <input
            className="searchbar"
            type="text"
            placeholder="Buscar Clientes..."
            aria-label="Buscar Clientes"
          />
          <button className="search-btn" aria-label="Search">
            <img src={searchIcon} alt="" />
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
            placeholder="Buscar Clientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            aria-label="Buscar Clientes"
          />
          <button className="search-btn" onClick={handleSearch} aria-label="Search">
            <img src={searchIcon} alt="" />
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

  const clientesToDisplay = isSearchActive ? searchResults : clientes;

  return (
    <div className="container">
      <div className="text">Clientes</div>
      <div className="search-bar">
        <input 
          className="searchbar" 
          type="text" 
          placeholder="Buscar por ID, Nombre, Dirección, Teléfono o NIT..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          aria-label="Buscar por ID, Nombre, Dirección, Teléfono o NIT"
        />
        <button className="search-btn" onClick={handleSearch} aria-label="Search">
          <img src={searchIcon} alt="" />
        </button>
      </div>

      <div className='clients-tablespace'> 
        <div className="table2">
          <div className="table2-grid table2-header">
            <h3>Cliente Id</h3>
            <h3>Nombre</h3>
            <h3>Dirección</h3>
            <h3>Teléfono</h3>
            <h3>NIT</h3>
          </div>
          {clientesToDisplay.map((cliente, index) => (
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