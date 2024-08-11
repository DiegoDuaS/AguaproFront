import React from 'react';
import './admin.css';
import searchIcon from './../../../image/searchIcon.png';

const ProductosPage = () => {
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
    </div>
  );
};

export default ProductosPage;
