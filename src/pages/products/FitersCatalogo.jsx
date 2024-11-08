import React, { useState } from 'react';
import { FaFilter, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import { BsSortAlphaDown, BsSortAlphaUp } from 'react-icons/bs';
import './filterscatalogo.css';

const FilterCatalogo = ({ 
  isFilterOpen, 
  toggleFilter,
  marcas,
  materiales,
  filterMarca,
  filterMaterial,
  handleMarcaChange,
  handleMaterialChange,
  sortOrder,
  handleSortChange,
  sortName,
  handleNameSort
}) => {
  const [isFilterOpenMarca, setIsFilterOpenMarca] = useState(false);
  const [isFilterOpenMaterial, setIsFilterOpenMaterial] = useState(false);
  const [isFilterOpenName, setIsFilterOpenName] = useState(false);
  const [isFilterOpenPrice, setIsFilterOpenPrice] = useState(false);

  return (
    <div>
      <button onClick={toggleFilter} className="filter-button">
        <FaFilter /> Filtros
      </button>

      {isFilterOpen && (
        <div className='filter-sort-section'>
          {/* Marca Filter */}
          <button 
            onClick={() => setIsFilterOpenMarca(!isFilterOpenMarca)} 
            className="filter-dropdown"
          >
            Marca
          </button>
          {isFilterOpenMarca && (
            <div className="filter-dropdown">
              <select value={filterMarca} onChange={handleMarcaChange}>
                <option value="">Todas las marcas</option>
                {marcas.map(marca => (
                  <option key={marca} value={marca}>{marca}</option>
                ))}
              </select>
            </div>
          )}

          {/* Material Filter */}
          <button 
            onClick={() => setIsFilterOpenMaterial(!isFilterOpenMaterial)} 
            className="filter-dropdown"
          >
            Material
          </button>
          {isFilterOpenMaterial && (
            <div className="filter-dropdown">
              <select value={filterMaterial} onChange={handleMaterialChange}>
                <option value="">Todos los materiales</option>
                {materiales.map(material => (
                  <option key={material} value={material}>{material}</option>
                ))}
              </select>
            </div>
          )}

          {/* Name Sort */}
          <button 
            onClick={() => setIsFilterOpenName(!isFilterOpenName)} 
            className="filter-dropdown"
          >
            Ordenar por Nombre
          </button>
          {isFilterOpenName && (
            <div className="sort-controls">
              <div className='filter-dropdown'>
                <button 
                  onClick={() => handleNameSort('asc')} 
                  className={`sort-button ${sortName === 'asc' ? 'active' : ''}`}
                >
                  <BsSortAlphaDown /> A-Z
                </button>
                <button 
                  onClick={() => handleNameSort('desc')} 
                  className={`sort-button ${sortName === 'desc' ? 'active' : ''}`}
                >
                  <BsSortAlphaUp /> Z-A
                </button>
              </div>
            </div>
          )}

          {/* Price Sort */}
          <button 
            onClick={() => setIsFilterOpenPrice(!isFilterOpenPrice)} 
            className="filter-dropdown"
          >
            Ordenar por Precio
          </button>
          {isFilterOpenPrice && (
            <div className="sort-controls">
              <div className='filter-dropdown'>
                <button 
                  onClick={() => handleSortChange('asc')} 
                  className={`sort-button ${sortOrder === 'asc' ? 'active' : ''}`}
                >
                  <FaSortAmountUp /> Precio: Bajo a Alto
                </button>
                <button 
                  onClick={() => handleSortChange('desc')} 
                  className={`sort-button ${sortOrder === 'desc' ? 'active' : ''}`}
                >
                  <FaSortAmountDown /> Precio: Alto a Bajo
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterCatalogo;