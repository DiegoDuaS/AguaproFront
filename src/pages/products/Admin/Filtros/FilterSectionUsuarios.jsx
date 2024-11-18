import React, { useState } from 'react';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import { MdFilterAltOff } from "react-icons/md";

const FilterSectionUsuarios = ({ 
  isFilterOpen, 
  filterRole, 
  handleFilterChange, 
  sortOrder, 
  handleSortChange,
  availableRoles
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

  const handleResetFilters = () => {
    handleFilterChange({ target: { value: '' } });
    handleSortChange('');
  };

  const hasActiveFilters = filterRole || sortOrder;

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
              <select 
                value={filterRole} 
                onChange={handleFilterChange}
                className="role-select"
              >
                <option value="">Todos los Roles</option>
                {availableRoles.map((role) => (
                  <option key={role} value={role.toLowerCase()}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </option>
                ))}
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

export default FilterSectionUsuarios;