// Page where the usuario filter will be, the usuario filter should just order on the date of the creation and the rols of the person 

import React, { useState } from 'react';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';

const FilterSectionUsuarios = ({ 
  isFilterOpen, 
  filterRole, 
  handleFilterChange, 
  sortOrder, 
  handleSortChange 
}) => {
  const [isFilterOpenRole, setIsFilterOpenRole] = useState(false);
  const [isFilterOpenDate, setIsFilterOpenDate] = useState(false);
  const toggleSort = (order) => {
    if (sortOrder === order) {
      handleSortChange('');
    } else {
      handleSortChange(order);
    }
  };
  return (
    <div>
      {isFilterOpen && (
        <div className='filter-sort-section'>
          <button 
            onClick={() => setIsFilterOpenRole(!isFilterOpenRole)} 
            className="filter-dropdown"
          >
            Rol
          </button>
          {isFilterOpenRole && (
            <div className="filter-dropdown">
              <select value={filterRole} onChange={handleFilterChange}>
                <option value="">Todos</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
          )}

          <button 
            onClick={() => setIsFilterOpenDate(!isFilterOpenDate)} 
            className="filter-dropdown"
          >
            Fecha de Creación
          </button>
          {isFilterOpenDate && (
            <div className="sort-controls">
              <div className='filter-dropdown'>
                <button 
                  onClick={() => toggleSort('asc')} 
                  className={`sort-button ${sortOrder === 'asc' ? 'active' : ''}`}
                >
                  <FaSortAmountUp /> Fecha: Antiguo a Reciente
                </button>
                <button 
                  onClick={() => toggleSort('desc')} 
                  className={`sort-button ${sortOrder === 'desc' ? 'active' : ''}`}
                >
                  <FaSortAmountDown /> Fecha: Reciente a Antiguo
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};


export default FilterSectionUsuarios;