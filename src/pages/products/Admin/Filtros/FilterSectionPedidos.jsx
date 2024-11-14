import React, { useState } from 'react';
import { FaFilter, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import { MdFilterAltOff } from "react-icons/md";

const FilterSectionPedidos = ({ 
  isFilterOpen, 
  filterState, 
  handleFilterChange,
  sortOrder, 
  handleSortChange 
}) => {
  const [isFilterOpenEstados, setIsFilterOpenEstados] = useState(false);
  const [isFilterOpenPrecios, setIsFilterOpenPrecios] = useState(false);

  const handleResetFilters = () => {
    handleFilterChange({ target: { value: '' } });
    handleSortChange('');
  };

  const hasActiveFilters = filterState || sortOrder;

  return (
    <div>
      {isFilterOpen && (
        <div className='filter-sort-section'>
          <button 
            onClick={() => setIsFilterOpenEstados(!isFilterOpenEstados)} 
            className="filter-dropdown"
          >
            Estado
          </button>
          {isFilterOpenEstados && (
            <div className="filter-dropdown">
              <select value={filterState} onChange={handleFilterChange}>
                <option value="">Todos los estados</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Procesando">Procesando</option>
                <option value="Enviado">Enviado</option>
                <option value="Entregado">Entregado</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>
          )}

          <button 
            onClick={() => setIsFilterOpenPrecios(!isFilterOpenPrecios)} 
            className="filter-dropdown"
          >
            Precio
          </button>
          {isFilterOpenPrecios && (
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

          {hasActiveFilters && (
            <button 
              onClick={handleResetFilters}
              className="filter-reset-btn"
              title="Reset all filters"
            >
              <MdFilterAltOff />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterSectionPedidos;