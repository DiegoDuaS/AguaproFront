import React, { useState, useEffect, useCallback } from 'react';
import './admin.css';
import { CiEdit } from "react-icons/ci";
import searchIcon from './../../../image/searchIcon.png';
import { CircularProgress } from '@mui/material';
import useApiP from '../../../hooks/useAPIProducts';
import { BiError } from "react-icons/bi";
import StateCard from '../../../components/cards/stateCard';
import InfoProdPedidoCard from '../../../components/cards/InfoProdPedidoCard';

const API_BASE_URL = 'https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app';

const PedidosPage = () => {
  const { data: pedidos, errorMessage, isLoading, refetch } = useApiP(`${API_BASE_URL}/pedidos`);
  const [direcciones, setDirecciones] = useState({});
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessageState, setErrorMessageState] = useState('');
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [productos, setProductos] = useState([]);
  const [isLoadingProductos, setIsLoadingProductos] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    if (pedidos) {
      const initialDirecciones = pedidos.reduce((acc, pedido) => {
        acc[pedido.id_pedido] = pedido.direccion;
        return acc;
      }, {});
      setDirecciones(initialDirecciones);
    }
  }, [pedidos]);

  const showMessage = useCallback((message, isError = false) => {
    if (isError) {
      setErrorMessageState(message);
      setSuccessMessage('');
    } else {
      setSuccessMessage(message);
      setErrorMessageState('');
    }
    setTimeout(() => {
      setSuccessMessage('');
      setErrorMessageState('');
    }, 5000);
  }, []);

  const fetchProductos = useCallback(async (pedidoId) => {
    setIsLoadingProductos(true);
    try {
      const response = await fetch(`${API_BASE_URL}/pedidos/${pedidoId}/productos`);
      if (!response.ok) throw new Error('Failed to fetch productos');
      const data = await response.json();
      setProductos(data);
      setIsCardOpen(true);
    } catch (error) {
      console.error(error);
      showMessage('Error al cargar productos', true);
    } finally {
      setIsLoadingProductos(false);
    }
  }, [showMessage]);

  const handlePedidoClick = useCallback((pedidoId) => {
    setSelectedPedido(pedidoId);
    fetchProductos(pedidoId);
  }, [fetchProductos]);

  const handleEstadoChange = useCallback(async (pedidoId, newEstado) => {
    const estadoMap = { "Pendiente": 1, "Procesando": 2, "Enviado": 3, "Entregado": 4, "Cancelado": 5 };
    const idEstado = estadoMap[newEstado] || 0;

    try {
      const response = await fetch(`${API_BASE_URL}/pedidos/${pedidoId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pedidoId, estatus: idEstado }),
      });

      if (response.ok) {
        showMessage('Estado actualizado correctamente');
        refetch();
      } else {
        throw new Error('Error al actualizar el estado del pedido');
      }
    } catch (error) {
      showMessage('Error al conectar con el servidor. Intente nuevamente.', true);
      console.error(error);
    }
  }, [refetch, showMessage]);

  const handleDireccionChange = useCallback((pedidoId, newDireccion) => {
    setDirecciones(prev => ({ ...prev, [pedidoId]: newDireccion }));
  }, []);

  const updateDireccion = useCallback(async (pedidoId, newDireccion) => {
    try {
      const response = await fetch(`${API_BASE_URL}/pedidos/${pedidoId}/direccion`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pedidoId, direccion: newDireccion }),
      });

      if (response.ok) {
        showMessage('Dirección actualizada correctamente');
        refetch();
      } else {
        throw new Error('Error al actualizar la dirección del pedido');
      }
    } catch (error) {
      showMessage('Error al conectar con el servidor. Intente nuevamente.', true);
      console.error(error);
    }
  }, [refetch, showMessage]);

/*
 pedido.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.nit_empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.direccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pedido.productos && pedido.productos.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    setSearchResults(filteredResults);
    setIsSearchActive(true);
     */

  const handleSearch = useCallback(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setIsSearchActive(false);
      return;
    }

    const filteredResults = pedidos.filter(pedido =>
      pedido.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.nit_empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.direccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pedido.productos && pedido.productos.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    setSearchResults(filteredResults);
    setIsSearchActive(true);
  }, [searchTerm, pedidos]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  if (isLoading) {
    return (
      <div className="container">
        <div className="text">Pedidos</div>
        <div className="search-bar">
          <input
            className="searchbar"
            type="text"
            placeholder="Search Productos..."
            aria-label="Search Productos"
          />
          <button className="search-btn" aria-label="Search">
            <img src={searchIcon} alt="" />
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
            placeholder="Buscar Pedidos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            aria-label="Buscar Pedidos"
          />
          <button className="search-btn" onClick={handleSearch} aria-label="Search">
            <img src={searchIcon} alt="" />
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

  const pedidosToDisplay = isSearchActive ? searchResults : pedidos;

  return (
    <div className="container">
      <div className="text">Pedidos</div>
      <div className="search-bar">
        <input 
          className="searchbar" 
          type="text" 
          placeholder="Buscar Clientes, NIT, Dirección o Productos..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          aria-label="Buscar Clientes, NIT, Dirección o Productos"
        />
        <button className="search-btn" onClick={handleSearch} aria-label="Search">
          <img src={searchIcon} alt="" />
        </button>
      </div>
      
      <StateCard message={successMessage} isOpen={!!successMessage} type={1}/>
      <StateCard message={errorMessageState} isOpen={!!errorMessageState} type={2}/>

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
        {pedidosToDisplay.map((pedido) => (
          <div className="table-grid table-row" key={pedido.id_pedido}>
            <p className='table-text'>#{pedido.id_pedido}</p>
            <p className='table-text'>{pedido.cliente}</p>
            <p className='table-text'>{pedido.nit_empresa}</p>
            <p className='table-text'>Q.{pedido.monto_total}</p>
            {pedido.estatus >= 3 ? (
              <p className='table-text'>{pedido.direccion}</p>
            ) : (
              <input
                className="direccionChange"
                type='text'
                value={direcciones[pedido.id_pedido] || ''}
                onChange={(e) => handleDireccionChange(pedido.id_pedido, e.target.value)}
                onBlur={() => updateDireccion(pedido.id_pedido, direcciones[pedido.id_pedido])}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    updateDireccion(pedido.id_pedido, direcciones[pedido.id_pedido]);
                  }
                }}
                aria-label={`Dirección para pedido ${pedido.id_pedido}`}
              />
            )}
            <p className='table-text'>
              {['N/A', '5%', '10%', '15%', '20%', '25%'][pedido.id_descuento] || 'Otro tipo de descuento'}
            </p>
            <button 
              className='more-edit'
              onClick={() => handlePedidoClick(pedido.id_pedido)}
              aria-label={`Ver productos para pedido ${pedido.id_pedido}`}
            >
              ...
            </button>
            {isCardOpen && selectedPedido === pedido.id_pedido && (
              <InfoProdPedidoCard 
                isOpen={isCardOpen} 
                closeCard={() => setIsCardOpen(false)} 
                productos={productos}
                isLoadingProductos={isLoadingProductos}
              />
            )}
            <select
              value={pedido.estado} 
              onChange={(e) => handleEstadoChange(pedido.id_pedido, e.target.value)}
              className={`state ${pedido.estado.toLowerCase()}`}
              aria-label={`Estado para pedido ${pedido.id_pedido}`}
            >
              {['Pendiente', 'Procesando', 'Enviado', 'Entregado', 'Cancelado'].map((estado, index) => (
                <option className="option" value={estado} key={index + 1}>{estado}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PedidosPage;