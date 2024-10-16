import React, { useState, useEffect, useCallback } from 'react';
import './admin.css';
import FilterSection from './FilterSectionProductos';
import searchIcon from './../../../image/searchIcon.png';
import { CircularProgress } from '@mui/material';
import useApiP from '../../../hooks/useAPIProducts';
import { CiEdit } from "react-icons/ci";
import { BiError } from "react-icons/bi";
import { FaTrash } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import InfoProdCard from '../../../components/cards/infoProdCard';
import EditProdCard from '../../../components/cards/EditProdCard';
import NewProdCard from '../../../components/cards/NewProdCard';
import StateCard from '../../../components/cards/stateCard';
import DeleteCard from '../../../components/cards/deleteCard';
import MoreCard from '../../../components/cards/moreCard';
import { FaFilter } from 'react-icons/fa';

const ProductosPage = () => {
  const { data: productos, errorMessage, isLoading, refetch } = useApiP('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/catalogo');
  const [isInformationCardOpen, setIsInformationCardOpen] = useState(false);
  const [isNewCardOpen, setIsNewCardOpen] = useState(false);
  const [isEditCardOpen, setIsEditCardOpen] = useState(false);
  const [isDeleteCardOpen, setIsDeleteCardOpen] = useState(false);
  const [isMoreCardOpen, setIsMoreCardOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessageState, setErrorMessageState] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterAvailability, setFilterAvailability] = useState('');
  const [sortOrder, setSortOrder] = useState('');


  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage('');
      setErrorMessageState('');
    }, 5000);

    return () => clearTimeout(timer);
  }, [successMessage, errorMessageState]);

  const handleSearch = useCallback(() => {
    const trimmedSearchTerm = searchTerm.trim().toLowerCase();
    if (!trimmedSearchTerm) {
      setSearchResults([]);
      setIsSearchActive(false);
      return;
    }

    const filteredResults = productos.filter(producto =>
      Object.values(producto).some(value => 
        String(value).toLowerCase().includes(trimmedSearchTerm)
      )
    );

    setSearchResults(filteredResults);
    setIsSearchActive(true);
  }, [searchTerm, productos]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const openCard = (cardType, producto = null) => {
    setSelectedProduct(producto);
    switch (cardType) {
      case 'info':
        setIsInformationCardOpen(true);
        break;
      case 'edit':
        setIsEditCardOpen(true);
        break;
      case 'new':
        setIsNewCardOpen(true);
        break;
      case 'delete':
        setIsDeleteCardOpen(true);
        break;
      case 'more':
        setIsMoreCardOpen(true);
      default:
        break;
    }
  };

  const closeCard = (cardType) => {
    switch (cardType) {
      case 'info':
        setIsInformationCardOpen(false);
        break;
      case 'edit':
        setIsEditCardOpen(false);
        break;
      case 'new':
        setIsNewCardOpen(false);
        break;
      case 'delete':
        setIsDeleteCardOpen(false);
        break;
      case 'more':
        setIsMoreCardOpen(false);
        break;
      default:
        break;
    }
    setSelectedProduct(null);
  };

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  const handleFilterChange = (e) => {
    setFilterAvailability(e.target.value);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };
  const filteredAndSortedProducts = useCallback(() => {
    let result = isSearchActive ? searchResults : productos;

    // Apply availability filter
    if (filterAvailability) {
      result = result.filter(producto => 
        filterAvailability === 'available' ? producto.disponibilidad > 0 : producto.disponibilidad === 0
      );
    }

    // Apply sorting
    if (sortOrder) {
      result.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.precio - b.precio;
        } else {
          return b.precio - a.precio;
        }
      });
    }

    return result;
  }, [isSearchActive, searchResults, productos, filterAvailability, sortOrder]);

  const productsToDisplay = filteredAndSortedProducts();

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
        <div className='filter-section'>
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
          <button onClick={toggleFilter} className="filter-button">
            <FaFilter /> Filter
          </button>
        </div>
        
        <button className='addbutton' onClick={() => openCard('new')}> Agregar Producto +</button>
      </div>
      <FilterSection 
            isFilterOpen={isFilterOpen}
            toggleFilter={toggleFilter}
            filterAvailability={filterAvailability}
            handleFilterChange={handleFilterChange}
            sortOrder={sortOrder}
            handleSortChange={handleSortChange}
          />
      <div className="table">
        <div className="table3-grid table-header">
          <h3></h3>
          <h3>Id</h3>
          <h3>Nombre</h3>
          <h3>Descripción</h3>
          <h3>Precio Unitario</h3>
          <h3>Disponibilidad</h3>
          <h3>Marca</h3>
          <h3>Mas Información</h3>
          <h3>Editar</h3>
        </div>
        {productsToDisplay.map((producto) => (
          <div className="table3-grid table-row" key={producto.id_producto}>
            <FaTrash color='#00668C' className='trash_icon' onClick={() => openCard('delete', producto)} />
            <p className='table-text'>#{producto.id_producto}</p>
            <p className='table-text'>{producto.nombre}</p>
            <p className='table-text descriptionprod'>{producto.descripción}</p>
            <p className='table-text'>Q.{producto.precio}</p>
            <div className='units_sec'>
              <p className='table-text'>{producto.disponibilidad} Unidades</p>
              <IoMdAdd color='#00668C'className='add_more_prod_icon'onClick={() => openCard('more', producto)}/>
            </div>
            <p className='table-text'>{producto.marca}</p>
            <button className='more-edit' onClick={() => openCard('info', producto)}>...</button>
            <button className='more-edit' onClick={() => openCard('edit', producto)}><CiEdit size={25}/></button>
          </div>
        ))}
      </div>
      {selectedProduct && isInformationCardOpen && (
        <InfoProdCard
          isOpen={isInformationCardOpen}
          closeCard={() => closeCard('info')}
          product={selectedProduct}
        />
      )}
      {selectedProduct && isEditCardOpen && (
        <EditProdCard
          isOpen={isEditCardOpen}
          closeCard={() => closeCard('edit')}
          product={selectedProduct}
          refetchProducts={refetch}
          setSuccsessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessageState}
        />
      )}
      {isNewCardOpen && (
        <NewProdCard
          isOpen={isNewCardOpen}
          closeCard={() => closeCard('new')}
          refetchProducts={refetch}
          setSuccsessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessageState}
        />
      )}
      {isDeleteCardOpen && (
        <DeleteCard
          isOpen={isDeleteCardOpen}
          closeCard={() => closeCard('delete')}
          product={selectedProduct}
          setSuccsessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessageState}
          refetchProducts={refetch}
        />
      )}
      {isMoreCardOpen && (
        <MoreCard
          isOpen={isMoreCardOpen}
          closeCard={() => closeCard('more')}
          product={selectedProduct}
        />
      )}
      <StateCard message={successMessage} isOpen={!!successMessage} type={1}/>
      <StateCard message={errorMessageState} isOpen={!!errorMessageState} type={2}/>
    </div>
  );
};

export default ProductosPage;