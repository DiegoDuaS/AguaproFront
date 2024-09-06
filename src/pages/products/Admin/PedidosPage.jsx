import React, { useState, useEffect} from 'react';
import './admin.css';
import { CiEdit } from "react-icons/ci";
import searchIcon from './../../../image/searchIcon.png';
import { CircularProgress } from '@mui/material';
import useApiP from '../../../hooks/useAPIProducts';
import { BiError } from "react-icons/bi";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdOutlineErrorOutline } from "react-icons/md";

const PedidosPage = () => {
  const { data: pedidos, errorMessage, isLoading, refetch } = useApiP('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/pedidos');
  const [estados, setEstados] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessageState, setErrorMessageState] = useState('');

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 5000); 

      return () => clearTimeout(timer); 
    }
  }, [successMessage]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessageState('');
      }, 5000); 

      return () => clearTimeout(timer); 
    }
  }, [errorMessage]);

  const handleEstadoChange = async (pedidoId, newEstado) => {
    let idEstado = 0;

    if (newEstado === "Pendiente") {
        idEstado = 1;
    } else if (newEstado === "Procesando") {
        idEstado = 2;
    } else if (newEstado === "Enviado") {
        idEstado = 3;
    } else if (newEstado === "Entregado") {
        idEstado = 4;
    } else if (newEstado === "Cancelado") {
        idEstado = 5;
    }

    try {
      const response = await fetch(`https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/pedidos/${pedidoId}/status`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pedidoId, estatus: idEstado }),
      });

      if (response.ok){
        setEstados((prevEstados) => ({
          ...prevEstados,
          [pedidoId]: newEstado, 
        }));
        setSuccessMessage('Estado actualizado correctamente');
        setErrorMessageState(''); // Clear any previous error messages
        refetch(); // Reload the data
      } else {
        throw new Error('Error al actualizar el estado del pedido');
      }
    } catch (error) {
      setErrorMessageState('Error al conectar con el servidor. Intente nuevamente.');
      setSuccessMessage(''); // Clear any previous success messages
      console.error(error);
    }
  };
  
  const getClassName = (estado) => {
    const classes = {
      'Pendiente': 'pendiente',
      'Procesando': 'procesando',
      'Enviado': 'enviado',
      'Entregado': 'entregado',
      'Cancelado': 'cancelado',
    };
    return classes[estado] || 'state';
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

      {successMessage && <p className="success-message">{successMessage}  <FaRegCircleCheck size={17}/> </p>}
      {errorMessageState && <p className="error-message">{errorMessageState} <MdOutlineErrorOutline size={17}/></p>}

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
              value={pedido.estado} 
              onChange={(e) => handleEstadoChange(pedido.id_pedido, e.target.value)}
              className={`state ${getClassName(pedido.estado)}`}
            >
              <option className="option" value="Pendiente" key= '1'>Pendiente</option>
              <option className="option" value="Procesando" key= '2'>Procesando</option>
              <option className="option" value="Enviado" key= '3'>Enviado</option>
              <option className="option" value="Entregado" key= '4'>Entregado</option>
              <option className="option" value="Cancelado" key= '5'>Cancelado</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PedidosPage;
