import React, { useEffect, useState, useCallback } from 'react';
import searchIcon from './../../../image/searchIcon.png';
import { CircularProgress } from '@mui/material';
import useApiP from '../../../hooks/useAPIProducts';
import { BiError } from "react-icons/bi";
import StateCard from '../../../components/cards/stateCard';
import { FaFilter } from 'react-icons/fa';
import FilterSectionSolicitudes from './Filtros/FilterSectionSolicitudes';

const SolicitudesPage = () => {
  const { data: solicitudes, errorMessage, isLoading, refetch } = useApiP('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/solicitudes');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessageState, setErrorMessageState] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const departamentos = {
    1: "Guatemala",
    2: "El Progreso",
    3: "Sacatepequez",
    4: "Chimaltenango",
    5: "Escuintla",
    6: "Santa Rosa",
    7: "Sololá",
    8: "Totonicapán",
    9: "Quetzaltenango",
    10: "Suchitepequez",
    11: "Retalhuleu",
    12: "San Marcos",
    13: "Huehuetenango",
    14: "Quiché",
    15: "Baja Verapaz",
    16: "Alta Verapaz",
    17: "Petén",
    18: "Izabal",
    19: "Zacapa",
    20: "Chiquimula",
    21: "Jalapa",
    22: "Jutiapa"
  };
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    departamento: '',
    estado: '',
    fechaInicio: '',
    fechaFin: '',
    nombre: ''
  });
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    setCurrentPage(1);
  }, [isSearchActive, searchResults, filters, sortOrder]);

  const handleSearch = useCallback(() => {
    const trimmedSearchTerm = searchTerm.trim().toLowerCase();
    if (!trimmedSearchTerm) {
      setSearchResults([]);
      setIsSearchActive(false);
      return;
    }

    const filteredResults = solicitudes.filter(solicitud => {
      const searchFields = [
        solicitud.nombre,
        solicitud.correo,
        solicitud.telefono,
        solicitud.empresa,
        departamentos[solicitud.departamento],
        solicitud.estado
      ];
      
      return searchFields.some(field => 
        String(field).toLowerCase().includes(trimmedSearchTerm)
      );
    });

    setSearchResults(filteredResults);
    setIsSearchActive(true);
    setCurrentPage(1);
  }, [searchTerm, solicitudes, departamentos]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
    setCurrentPage(1);
  };
  
  const handleResetFilters = () => {
    setFilters({
      departamento: '',
      estado: '',
    });
    setSortOrder('');
    setCurrentPage(1);
  };

  const filteredSolicitudes = (isSearchActive ? searchResults : solicitudes).filter(solicitud => {
    const matchesDepartamento = !filters.departamento || 
      solicitud.departamento.toString() === filters.departamento;
    
    const matchesEstado = !filters.estado || 
      solicitud.estado === filters.estado;
    
    return matchesDepartamento && matchesEstado;
  });
  
  const sortedSolicitudes = [...filteredSolicitudes].sort((a, b) => {
    if (!sortOrder) return 0;
    
    const [field, direction] = sortOrder.split('_');
    const multiplier = direction === 'asc' ? 1 : -1;
    
    switch (field) {
      case 'fecha':
        return multiplier * (new Date(a.fecha_creacion) - new Date(b.fecha_creacion));
      case 'nombre':
        return multiplier * a.nombre.localeCompare(b.nombre);
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedSolicitudes.length / 10);
  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const SolicitudesEnPagina = sortedSolicitudes.slice(startIndex, endIndex);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage('');
      setErrorMessageState('');
    }, 5000);

    return () => clearTimeout(timer);
  }, [successMessage, errorMessageState]);

  const handleEstadoChange = useCallback(async (solicitudId, nuevoEstado) => {
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch(`https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/solicitud/${solicitudId}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({ estado: nuevoEstado }),
      });
  
      if (response.ok) {
        setSuccessMessage('Estado de solicitud actualizado correctamente');
        refetch();
      } else {
        setErrorMessageState('Error al actualizar el estado de la solicitud');
        throw new Error('Error al actualizar el estado de la solicitud');
      }
    } catch (error) {
      setErrorMessageState('Error al actualizar el estado de la solicitud');
    }
  }, [refetch, setSuccessMessage, setErrorMessageState]);
  
  if (isLoading) {
    return(
      <div className="container">
        <div className="text">Solicitudes</div>
        <div className='filter-section'>
          <div className="search-bar">
            <input
              className="searchbar"
              type="text"
              placeholder="Buscar Solicitudes..."
            />
            <button className="search-btn">
              <img src={searchIcon} alt="Search" />
            </button>
          </div>
        </div>
        <div className='space' />
        <div className='loadingcontainer'>
          <CircularProgress />
          <p className='loading'>Cargando solicitudes...</p>
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="container">
        <div className="text">Solicitudes</div>
        <div className="search-bar">
          <input
            className="searchbar"
            type="text"
            placeholder="Buscar Solicitudes..."
          />
          <button className="search-btn" >
            <img src={searchIcon} alt="Search" />
          </button>
        </div>
        <div className='space' />
        <div className='error-container'>
          <BiError color='black' size={80}/>
          <p className='loading'>Error Cargando Solicitudes - {errorMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="text">Solicitudes</div>
      <div className='filter-section'>
        <div className="search-bar">
          <input
            className="searchbar"
            type="text"
            placeholder="Buscar por nombre, correo, teléfono, empresa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="search-btn" onClick={handleSearch}>
            <img src={searchIcon} alt="Search" />
          </button>
          <button onClick={toggleFilter} className="filter-button">
            <FaFilter /> Filter
          </button>
        </div>
      </div>  
      <FilterSectionSolicitudes
        isFilterOpen={isFilterOpen}
        departamentos={departamentos}
        filters={filters}
        handleFilterChange={handleFilterChange}
        handleResetFilters={handleResetFilters}
        sortOrder={sortOrder}
        handleSortChange={handleSortChange}
      />
      <div className="table">
        <div className="table-grid table-header">
          <h3>Nombre</h3>
          <h3>Correo</h3>
          <h3>Teléfono</h3>
          <h3>Empresa</h3>
          <h3>Departamento</h3>
          <h3>Servicio</h3>
          <h3>Fecha de Solicitud</h3>
          <h3>Estado</h3>
        </div>
        {SolicitudesEnPagina.map((solicitud) => {
          return(
            <div className="table-grid table-row" key={solicitud.id_solicitud}>
              <p className='table-text'>{solicitud.nombre}</p>
              <p className='table-text'>{solicitud.correo}</p>
              <p className='table-text'>{solicitud.telefono}</p>
              <p className='table-text'>{solicitud.empresa}</p>
              <p className='table-text'>{departamentos[solicitud.departamento]}</p>
              <p className='table-text'>{solicitud.tipo_servicio}</p>
              <p className='table-text'>{solicitud.fecha_creacion.slice(0,10)}</p>
              <select
                value={solicitud.estado} 
                onChange={(e) => handleEstadoChange(solicitud.id_solicitud, e.target.value)}
                className={`state ${solicitud.estado.toLowerCase()}`}
                aria-label={`Estado para solicitud ${solicitud.id_solicitud}`}
              >
                {[
                  { label: 'Pendiente', value: 'pendiente' },
                  { label: 'En seguimiento', value: 'enviado' },
                  { label: 'Completada', value: 'entregado' },
                  { label: 'Cancelada por cliente', value: 'cancelado' },
                ].map((estado, index) => (
                  <option className="option" value={estado.value} key={index + 1}>
                    {estado.label}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
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
      <StateCard message={successMessage} isOpen={!!successMessage} type={1}/>
      <StateCard message={errorMessageState} isOpen={!!errorMessageState} type={2}/>
    </div>
  );
};

export default SolicitudesPage;