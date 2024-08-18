import React from 'react';
import './admin.css';
import searchIcon from './../../../image/searchIcon.png';
import { CircularProgress } from '@mui/material';
import useApiP from '../../../hooks/useAPIProducts';
import { Grid, Typography } from '@mui/material';

const ProductosPage = () => {

  const { data: productos, errorMessage, isLoading } = useApiP('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/productos');


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
    return <p>{errorMessage}</p>;
  }

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
      {/* Add additional content here */}
      <div className="product-table">
      <div className="table-grid table-header">
        <h3>Id</h3>
        <h3>Nombre</h3>
        <h3>Descripción</h3>
        <h3>Precio</h3>
        <h3>Disponibilidad</h3>
        <h3>Tipo</h3>
        <h3>...</h3>
      </div>
    </div>
      
    </div>
  );
};

export default ProductosPage;
