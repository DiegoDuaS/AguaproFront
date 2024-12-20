import React, { useState } from 'react';
import { FaFilter, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import { MdFilterAltOff } from "react-icons/md";

const FilterSection = ({ 
  isFilterOpen, 
  toggleFilter, 
  filterAvailability, 
  handleFilterChange,
  filterVisibility,
  handleVisibilityChange, 
  sortOrder, 
  handleSortChange 
}) => {
  const [isFilterOpenAvailability, setIsFilterOpenAvailability] = useState(false);
  const [isFilterOpenVisibility, setIsFilterOpenVisibility] = useState(false);
  const [isFilterOpenPrice, setIsFilterOpenPrice] = useState(false);

  const handleResetFilters = () => {
    handleFilterChange({ target: { value: '' } });
    handleVisibilityChange({ target: { value: '' } });
    handleSortChange('');
  };

  const hasActiveFilters = filterAvailability || filterVisibility || sortOrder;

  return (
    <div>
      {isFilterOpen && (
        <>
        <div className='filter-sort-section'>
          <button 
            onClick={() => setIsFilterOpenVisibility(!isFilterOpenVisibility)} 
            className="filter-dropdown"
          >
            Visibilidad
          </button>
          {isFilterOpenVisibility && (
            <div className="filter-dropdown">
              <select value={filterVisibility} onChange={handleVisibilityChange}>
                <option value="">Todos</option>
                <option value="hidden">Ocultos</option>
                <option value="visible">En venta</option>
              </select>
            </div>
          )}

          <button 
            onClick={() => setIsFilterOpenAvailability(!isFilterOpenAvailability)} 
            className="filter-dropdown"
          >
            Disponibilidad
          </button>
          {isFilterOpenAvailability && (
            <div className="filter-dropdown">
              <select value={filterAvailability} onChange={handleFilterChange}>
                <option value="">Todos</option>
                <option value="available">Disponible</option>
                <option value="unavailable">No Disponible</option>
              </select>
            </div>
          )}

          <button 
            onClick={() => setIsFilterOpenPrice(!isFilterOpenPrice)} 
            className="filter-dropdown"
          >
            Precio
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
        </>
      )}
    </div>
  );
};

export default FilterSection;