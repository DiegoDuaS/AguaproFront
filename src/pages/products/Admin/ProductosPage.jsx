import React from 'react';
import './admin.css';
import searchIcon from './../../../image/searchIcon.png';
import { CircularProgress } from '@mui/material';
import useApiP from '../../../hooks/useAPIProducts';
import { useState } from 'react';
import { CiEdit } from "react-icons/ci";
import InfoProdCard from '../../../components/infoProdCard';
import { BiError } from "react-icons/bi";

const ProductosPage = () => {

  const { data: productos, errorMessage, isLoading } = useApiP('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/productos');
  const [isInformationCardOpen, setisInformationCardOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openCard = (producto) => {
    setSelectedProduct(producto);
    setisInformationCardOpen(true);
  };

  const closeCard = () => {
    setisInformationCardOpen(false);
    setSelectedProduct(null);
  };

  if (isLoading) {
    return (
      <div className="container">
        <div className="text">Productos</div>
        <div className="search-bar">
          <input
            className="searchbar"
            type="text"
            placeholder="Search Productos..."
          />
          <button className="search-btn">
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

  // Pantalla de Error
  if (errorMessage) {
    return (
      <div className="container">
        <div className="text">Productos</div>
        <div className="search-bar">
          <input
            className="searchbar"
            type="text"
            placeholder="Search Productos..."
          />
          <button className="search-btn">
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
            placeholder="Search Productos..."
          />
          <button className="search-btn">
            <img src={searchIcon} alt="Search" />
          </button>
        </div>
        <button className='addbutton'> Agregar Producto +</button>
      </div>
      {/* PANTALLA PRINCIPAL SIN BUSCAR */}
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
        {productos.map((producto, index) => (
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
            <button className='more-edit'> <CiEdit size={25}/> </button>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <InfoProdCard
          isOpen={isInformationCardOpen}
          closeCard={closeCard}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default ProductosPage;
