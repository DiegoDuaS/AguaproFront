import React, { useEffect, useState, useCallback } from 'react';
import searchIcon from './../../../image/searchIcon.png';
import { CircularProgress } from '@mui/material';
import useApiP from '../../../hooks/useAPIProducts';
import { BiError } from "react-icons/bi";
import StateCard from '../../../components/cards/stateCard';

const SolicitudesPage = () => {
  const { data: solicitudes, errorMessage, isLoading, refetch } = useApiP('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/solicitudes');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessageState, setErrorMessageState] = useState('');
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage('');
      setErrorMessageState('');
    }, 5000);

    return () => clearTimeout(timer);
  }, [successMessage, errorMessageState]);

  const handleEstadoChange = useCallback(async (solicitudId, nuevoEstado) => {
    try {
      const response = await fetch(`https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/solicitud/${solicitudId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nuevoEstado }),
      });

      if (response.ok) {
        setSuccessMessage('Estado de solicitud actualizado correctamente');
        refetch();
      } else {
        setErrorMessageState('Error al actualizar el estado de la solicitud')
        throw new Error('Error al actualizar el estado de la solicitud');
      }
    } catch (error) {
      setErrorMessageState('Error al actualizar el estado de la solicitud')
    }
  }, [refetch, successMessage]);
  
  if (isLoading) {
    return(
      <div className="container">
        <div className='filter-section'>
          <div className="search-bar">
            <input
              className="searchbar"
              type="text"
              placeholder="Buscar ID, Nombre, Descripción, Precio, Disponibilidad o Marca..."
            />
            <button className="search-btn">
              <img src={searchIcon} alt="Search" />
            </button>
          </div>
        </div>
        <div className='space' />
        <div className='loadingcontainer'>
          <CircularProgress />
          <p className='loading'>Cargando productos...</p>
        </div>
      </div>
    ) ;
  }

  if (errorMessage) {
    return (
      <div className="container">
        <div className="text">Productos</div>
        <div className="search-bar">
          <input
            className="searchbar"
            type="text"
            placeholder="Buscar Productos..."
          />
          <button className="search-btn" >
            <img src={searchIcon} alt="Search" />
          </button>
        </div>
        <div className='space' />
        <div className='error-container'>
          <BiError color='black' size={80}/>
          <p className='loading'>Error Cargando Productos - {errorMessage}</p>
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
              placeholder="Buscar ID, Nombre, Descripción, Precio, Disponibilidad o Marca..."
            />
            <button className="search-btn">
              <img src={searchIcon} alt="Search" />
            </button>
          </div>
        </div>

        <div className="table">
        <div className="table-grid table-header">
          <h3>Id</h3>
          <h3>Nombre</h3>
          <h3>Correo</h3>
          <h3>Empresa</h3>
          <h3>Departamento</h3>
          <h3>Servicio</h3>
          <h3>Fecha de Solicitud</h3>
          <h3>Estado</h3>
        </div>
        {solicitudes.map((solicitud) => {
          return(
            <div className="table-grid table-row">
              <p className='table-text'>#{solicitud.id_solicitud}</p>
              <p className='table-text'>{solicitud.nombre}</p>
              <p className='table-text'>{solicitud.correo}</p>
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
                { label: 'En seguimiento', value: 'seguimiento' },
                { label: 'Completada', value: 'completada' },
                { label: 'Cancelada por cliente', value: 'cancelada_por_cliente' },
              ].map((estado, index) => (
                <option className="option" value={estado.value} key={index + 1}>
                  {estado.label}
                </option>
              ))}
            </select>
            </div>
          )
      })}
      </div>
      <StateCard message={successMessage} isOpen={!!successMessage} type={1}/>
      <StateCard message={errorMessageState} isOpen={!!errorMessageState} type={2}/>
    </div>
    
  );
};

export default SolicitudesPage;
