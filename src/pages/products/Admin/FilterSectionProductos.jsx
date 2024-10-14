import React, { useState } from 'react';
import { FaFilter, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';

const FilterSection = ({ 
  isFilterOpen, 
  toggleFilter, 
  filterAvailability, 
  handleFilterChange, 
  sortOrder, 
  handleSortChange 
}) => {
  const [isFilterOpenAvailability, setIsFilterOpenAvailability] = useState(false);
  const [isFilterOpenPrice, setIsFilterOpenPrice] = useState(false);

  return (
    <div>
      {isFilterOpen && (
        <>
        <div className='filter-sort-section'>
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
        </div>
         
        </>
      )}
    </div>
  );
};

export default FilterSection;