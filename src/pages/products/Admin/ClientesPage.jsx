import React, { useState, useCallback } from 'react';
import './admin.css';
import { CircularProgress } from '@mui/material';
import searchIcon from './../../../image/searchIcon.png';
import useApiP from '../../../hooks/useAPIProducts';
import { BiError } from "react-icons/bi";
import FilterSectionClientes from './Filtros/FilterSectionClientes';
import { FaFilter } from 'react-icons/fa';



const ClientesPage = () => {
  const { data: clientes, errorMessage, isLoading } = useApiP('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/clientes');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterNIT, setFilterNIT] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  const handleFilterChange = (e) => {
    setFilterNIT(e.target.value);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const filteredAndSortedClientes = useCallback(() => {
    let result = isSearchActive ? searchResults : clientes;
    
    // Apply NIT filter
    if (filterNIT) {
      if (filterNIT === 'with_nit') {
        result = result.filter(cliente => cliente.nit && cliente.nit.trim() !== '');
      } else if (filterNIT === 'without_nit') {
        result = result.filter(cliente => !cliente.nit || cliente.nit.trim() === '');
      }
    }

  // Apply sorting
  if (sortOrder) {
    const [field, order] = sortOrder.split('_');
    result = [...result].sort((a, b) => {
      if (field === 'id') {
        return order === 'asc' 
          ? a.id_cliente - b.id_cliente 
          : b.id_cliente - a.id_cliente;
      } else if (field === 'name') {
        return order === 'asc'
          ? a.nombre.localeCompare(b.nombre)
          : b.nombre.localeCompare(a.nombre);
      }
      return 0;
    });
  }

  return result;
  }, [isSearchActive, searchResults, clientes, filterNIT, sortOrder]);

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

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const clientesToDisplay = isSearchActive ? searchResults : clientes;
  const totalPages = Math.ceil(clientesToDisplay.length / 10);
  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;

  const clientesEnPagina = filteredAndSortedClientes().slice(startIndex, endIndex);

  if (isLoading) {
    return (
      <div className="container">
        <div className="text">Clientes</div>
        <div className="search-bar">
          <input
            className="searchbar"
            type="text"
            placeholder="Buscar Clientes..."
            value="" // Add this to make it controlled
            onChange={() => {}} // Add empty handler
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
            value={searchTerm} // Use searchTerm here
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
        <button onClick={toggleFilter} className="filter-button">
          <FaFilter /> Filter
        </button>
      </div>
      <FilterSectionClientes 
          isFilterOpen={isFilterOpen}
          filterNIT={filterNIT}
          handleFilterChange={handleFilterChange}
          sortOrder={sortOrder}
          handleSortChange={handleSortChange}
        />

      <div className='clients-tablespace'> 
        <div className="table2">
          <div className="table2-grid table2-header">
            <h3>Cliente Id</h3>
            <h3>Nombre</h3>
            <h3>Dirección</h3>
            <h3>Teléfono</h3>
            <h3>NIT</h3>
          </div>
          {clientesEnPagina.map((cliente, index) => (
            <div className="table2-grid table-row" key={index}>
              <p className='table-text'>#{cliente.id_cliente}</p>
              <p className='table-text'>{cliente.nombre}</p>
              <p className='table-text'>{cliente.direccion}</p>
              <p className='table-text'>{cliente.telefono}</p>
              <p className='table-text'>{cliente.nit}</p>
            </div>
          ))}
        </div>
        <div className="pagination-controls">
          <div className='change-page'>
            <button 
              onClick={() => handlePageChange(currentPage - 1)} 
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <span>Página {currentPage} de {totalPages}</span>
            <button 
              onClick={() => handlePageChange(currentPage + 1)} 
              disabled={currentPage === totalPages}
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientesPage;