import React, { useState, useEffect } from 'react';
import './admin.css';
import searchIcon from './../../../image/searchIcon.png';
import { CircularProgress } from '@mui/material';
import useApiP from '../../../hooks/useAPIProducts';
import { CiEdit } from "react-icons/ci";
import InfoProdCard from '../../../components/infoProdCard';
import EditProdCard from '../../../components/EditProdCard';
import NewProdCard from '../../../components/NewProdCard';
import { BiError } from "react-icons/bi";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdOutlineErrorOutline } from "react-icons/md";

const ProductosPage = () => {
  const { data: productos, errorMessage, isLoading, refetch } = useApiP('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/productos');
  const [isInformationCardOpen, setisInformationCardOpen] = useState(false);
  const [isNewCardOpen, setisNewCardOpen] = useState(false);
  const [isEditCardOpen, setisEditCardOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
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
    if (errorMessageState) {
      const timer = setTimeout(() => {
        setErrorMessageState('');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [errorMessageState]);

  const openCard = (producto) => {
    setSelectedProduct(producto);
    setisInformationCardOpen(true);
  };

  const closeCard = () => {
    setisInformationCardOpen(false);
    setSelectedProduct(null);
  };

  const openEditCard = (producto) => {
    setSelectedProduct(producto);
    setisEditCardOpen(true);
  };

  const closeEditCard = () => {
    setisEditCardOpen(false);
    setSelectedProduct(null);
  };

  const openNewCard = () => {
    setisNewCardOpen(true);
  };

  const closeNewCard = () => {
    setisNewCardOpen(false);
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setIsSearchActive(false);
      return;
    }

    const filteredResults = productos.filter(producto =>
      producto.id_producto.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.descripción.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.precio.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.disponibilidad.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.marca.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(filteredResults);
    setIsSearchActive(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const renderProductosTable = (productosToShow) => (
    <div className="table">
      <div className="table-grid table-header">
        <h3>Id</h3>
        <h3>Nombre</h3>
        <h3>Descripción</h3>
        <h3>Precio Unitario</h3>
        <h3>Disponibilidad</h3>
        <h3>Marca</h3>
        <h3>Mas Información</h3>
        <h3>Editar</h3>
      </div>
      {productosToShow.map((producto, index) => (
        <div className="table-grid table-row" key={index}>
          <p className='table-text'>#{producto.id_producto}</p>
          <p className='table-text'>{producto.nombre}</p>
          <p className='table-text'>{producto.descripción}</p>
          <p className='table-text'>Q.{producto.precio}</p>
          <p className='table-text'>{producto.disponibilidad} Unidades</p>
          <p className='table-text'>{producto.marca}</p>
          <button 
            className='more-edit' 
            onClick={() => openCard(producto)}>
            ...
          </button>
          <button className='more-edit'
            onClick={() => openEditCard(producto)}>
            <CiEdit size={25}/>
          </button>
        </div>
      ))}
    </div>
  );

  if (isLoading) {
    return (
      <div className="container">
        <div className="text">Productos</div>
        <div className="search-bar">
          <input
            className="searchbar"
            type="text"
            placeholder="Buscar Productos..."
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
          <p className='loading'>Cargando productos...</p>
        </div>
      </div>
    );
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
          <p className='loading'>Error Cargando Productos - {errorMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="text">Productos</div>
      <div className='modbar'>
        <div className="search-bar">
          <input
            className="searchbar"
            type="text"
            placeholder="Buscar ID, Nombre, Descripción, Precio, Disponibilidad o Marca..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="search-btn" onClick={handleSearch}>
            <img src={searchIcon} alt="Search" />
          </button>
        </div>
        <button className='addbutton' onClick={() => openNewCard()}> Agregar Producto +</button>
      </div>

      {successMessage && <p className="success-message">{successMessage} <FaRegCircleCheck size={17}/></p>}
      {errorMessageState && <p className="error-message">{errorMessageState} <MdOutlineErrorOutline size={17}/></p>}

      {isSearchActive ? (
        searchResults.length > 0 ? (
          renderProductosTable(searchResults)
        ) : (
          <div className="no-results">
            <p>No se encontraron resultados para tu búsqueda.</p>
          </div>
        )
      ) : (
        renderProductosTable(productos)
      )}

      {selectedProduct && isInformationCardOpen && (
        <InfoProdCard
          isOpen={isInformationCardOpen}
          closeCard={closeCard}
          product={selectedProduct}
        />
      )}
      {selectedProduct && isEditCardOpen && (
        <EditProdCard
          isOpen={isEditCardOpen}
          closeCard={closeEditCard}
          product={selectedProduct}
          refetchProducts={refetch}
        />
      )}
      {isNewCardOpen && (
        <NewProdCard
          isOpen={isNewCardOpen}
          closeCard={closeNewCard}
          refetchProducts={refetch}
        />
      )}
    </div>
  );
};

export default ProductosPage;