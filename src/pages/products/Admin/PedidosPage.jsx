import React, { useState, useEffect } from 'react';
import './admin.css';
import { CiEdit } from "react-icons/ci";
import searchIcon from './../../../image/searchIcon.png';
import { CircularProgress } from '@mui/material';
import useApiP from '../../../hooks/useAPIProducts';
import { BiError } from "react-icons/bi";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdOutlineErrorOutline } from "react-icons/md";
import StateCard from '../../../components/stateCard';
import InfoProdPedidoCard from '../../../components/InfoProdPedidoCard';


const PedidosPage = () => {
  const { data: pedidos, errorMessage, isLoading, refetch } = useApiP('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/pedidos');
  const [estados, setEstados] = useState({});
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [direcciones, setDirecciones] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessageState, setErrorMessageState] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [productos, setProductos] = useState([]);
  const [isLoadingProductos, setIsLoadingProductos] = useState(false);

  const fetchProductos = async (pedidoId) => {
    setIsLoadingProductos(true); // Comienza a cargar productos
    try {
        const response = await fetch(`https://aguapro-back.vercel.app/pedidos/${pedidoId}/productos`);
        if (!response.ok) throw new Error('Failed to fetch productos');
        const data = await response.json();
        setProductos(data);
        setIsCardOpen(true);
    } catch (error) {
        console.error(error);
    } finally {
        setIsLoadingProductos(false); // Finaliza la carga (éxito o error)
    }
};

    const handlePedidoClick = (pedidoId) => {
        setSelectedPedido(pedidoId);
        fetchProductos(pedidoId);
        setIsCardOpen(true);
    };
  // Inicializar las direcciones cuando se cargan los pedidos
  useEffect(() => {
    if (pedidos) {
      const initialDirecciones = {};
      pedidos.forEach((pedido) => {
        initialDirecciones[pedido.id_pedido] = pedido.direccion;
      });
      setDirecciones(initialDirecciones);
    }
  }, [pedidos]);

  // Manejo de mensajes de éxito
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 5000); 

      return () => clearTimeout(timer); 
    }
  }, [successMessage]);

  // Manejo de mensajes de error
  useEffect(() => {
    if (errorMessageState) {
      const timer = setTimeout(() => {
        setErrorMessageState('');
      }, 5000); 

      return () => clearTimeout(timer); 
    }
  }, [errorMessageState]);

  // Manejar el cambio de estado de un pedido
  const handleEstadoChange = async (pedidoId, newEstado) => {
    let idEstado = 0;

    switch (newEstado) {
      case "Pendiente": idEstado = 1; break;
      case "Procesando": idEstado = 2; break;
      case "Enviado": idEstado = 3; break;
      case "Entregado": idEstado = 4; break;
      case "Cancelado": idEstado = 5; break;
      default: idEstado = 0;
    }

    try {
      const response = await fetch(`https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/pedidos/${pedidoId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pedidoId, estatus: idEstado }),
      });

      if (response.ok) {
        setEstados((prevEstados) => ({
          ...prevEstados,
          [pedidoId]: newEstado, 
        }));
        setSuccessMessage('Estado actualizado correctamente');
        setErrorMessageState('');
        refetch();
      } else {
        throw new Error('Error al actualizar el estado del pedido');
      }
    } catch (error) {
      setErrorMessageState('Error al conectar con el servidor. Intente nuevamente.');
      setSuccessMessage('');
      console.error(error);
    }
  };

  // Manejar el cambio de dirección en el input
  const handleDireccionChange = (pedidoId, newDireccion) => {
    setDirecciones((prevDirecciones) => ({
      ...prevDirecciones,
      [pedidoId]: newDireccion,
    }));
  };

  // Clase para el estado del pedido
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

  const handleSearch = () => {
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
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const renderPedidosTable = (pedidosToShow) => (
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
      {pedidosToShow.map((pedido, index) => (
        <div className="table-grid table-row" key={index}>
          <p className='table-text'>#{pedido.id_pedido}</p>
          <p className='table-text'>{pedido.cliente}</p>
          <p className='table-text'>{pedido.nit_empresa}</p>
          <p className='table-text'>Q.{pedido.monto_total}</p>
          <p className='table-text'>{pedido.direccion}</p>
          <p className='table-text'>
            {pedido.id_descuento === 0 ? 'N/A' :
             pedido.id_descuento === 1 ? '5%' :
             pedido.id_descuento === 2 ? '10%' :
             pedido.id_descuento === 3 ? '15%' :
             pedido.id_descuento === 4 ? '20%' :
             pedido.id_descuento === 5 ? '25%' :
             'Otro tipo de descuento'}
          </p>
          <button className='more-edit'>...</button>
          <select
            value={pedido.estado} 
            onChange={(e) => handleEstadoChange(pedido.id_pedido, e.target.value)}
            className={`state ${getClassName(pedido.estado)}`}
          >
            <option className="option" value="Pendiente">Pendiente</option>
            <option className="option" value="Procesando">Procesando</option>
            <option className="option" value="Enviado">Enviado</option>
            <option className="option" value="Entregado">Entregado</option>
            <option className="option" value="Cancelado">Cancelado</option>
          </select>
        </div>
      ))}
    </div>
  );

  const closeCard = () => {
    setIsCardOpen(false);
    setSelectedPedido(null); // Optionally clear the selected pedido
  };

  const updateDireccion = async (pedidoId, newDireccion) => {
    try {
      const response = await fetch(`https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/pedidos/${pedidoId}/direccion`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pedidoId, direccion: newDireccion }),
      });

      if (response.ok) {
        setSuccessMessage('Dirección actualizada correctamente');
        setErrorMessageState(''); // Clear any previous error messages
        refetch(); // Reload the data
      } else {
        throw new Error('Error al actualizar la dirección del pedido');
      }
    } catch (error) {
      setErrorMessageState('Error al conectar con el servidor. Intente nuevamente.');
      setSuccessMessage(''); // Clear any previous success messages
      console.error(error);
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
            placeholder="Buscar Pedidos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="search-btn" onClick={handleSearch}>
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
            placeholder="Buscar Pedidos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="search-btn" onClick={handleSearch}>
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
          placeholder="Buscar Clientes, NIT, Dirección o Productos..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="search-btn" onClick={handleSearch}>
          <img src={searchIcon} alt="Search" />
        </button>
      </div>

      <StateCard message={successMessage} isOpen={!!successMessage} type={1}/>
      <StateCard message={errorMessageState} isOpen={!!errorMessageState} type={2}/>

      {isSearchActive ? (
        searchResults.length > 0 ? (
          renderPedidosTable(searchResults)
        ) : (
          <div className="no-results">
            <p>No se encontraron resultados para tu búsqueda.</p>

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
            {pedido.estatus >= 3 ? (
              <p className='table-text'>{pedido.direccion}</p>
            ) : (
              <input
                className="direccionChange"
                type='text'
                value={direcciones[pedido.id_pedido] || ''}
                onChange={(e) => handleDireccionChange(pedido.id_pedido, e.target.value)}
                onBlur={() => updateDireccion(pedido.id_pedido, direcciones[pedido.id_pedido])} // Llamar a la función al perder el foco
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    updateDireccion(pedido.id_pedido, direcciones[pedido.id_pedido]); // Llama a la función si se presiona Enter
                  }
                }}
              />
            )}
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
              onClick={() => handlePedidoClick(pedido.id_pedido)} 
            >
              ...
            </button>
            {isCardOpen && selectedPedido === pedido.id_pedido && (
              <InfoProdPedidoCard 
                isOpen={isCardOpen} 
                closeCard={closeCard} 
                productos={productos}
                isLoadingProductos={isLoadingProductos} // Pass productos as a prop
              />
            )}
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
        )
      ) : (
        renderPedidosTable(pedidos)
      )}
    </div>
  );
};

export default PedidosPage;
