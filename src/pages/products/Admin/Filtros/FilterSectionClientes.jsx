import React, { useState } from 'react';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import { MdFilterAltOff } from "react-icons/md";

const FilterSectionClientes = ({ 
  isFilterOpen, 
  filterNIT, 
  handleFilterChange, 
  sortOrder, 
  handleSortChange,
}) => {
  const [isFilterOpenNIT, setIsFilterOpenNIT] = useState(false);
  const [isFilterOpenID, setIsFilterOpenID] = useState(false);
  const [isFilterOpenName, setIsFilterOpenName] = useState(false);

  const toggleSort = (field, order) => {
    const sortKey = `${field}_${order}`;
    if (sortOrder === sortKey) {
      handleSortChange('');
    } else {
      handleSortChange(sortKey);
    }
  };

  const handleResetFilters = () => {
    handleFilterChange({ target: { value: '' } });
    handleSortChange('');
  };

  const hasActiveFilters = filterNIT || sortOrder;

  return (
    <div>
      {isFilterOpen && (
        <div className='filter-sort-section'>
          <button 
            onClick={() => setIsFilterOpenNIT(!isFilterOpenNIT)} 
            className="filter-dropdown"
          >
            NIT
          </button>
          {isFilterOpenNIT && (
            <div className="filter-dropdown">
              <select 
                value={filterNIT} 
                onChange={handleFilterChange}
                className="role-select"
              >
                <option value="">Todos los NIT</option>
                <option value="with_nit">Con NIT</option>
                <option value="without_nit">Sin NIT</option>
              </select>
            </div>
          )}
          
          <button 
            onClick={() => setIsFilterOpenID(!isFilterOpenID)} 
            className="filter-dropdown"
          >
            Id's
          </button>
          {isFilterOpenID && (
            <div className="sort-controls">
              <div className='filter-dropdown'>
                <button 
                  onClick={() => toggleSort('id', 'asc')} 
                  className={`sort-button ${sortOrder === 'id_asc' ? 'active' : ''}`}
                >
                  <FaSortAmountUp /> ID: Menor a Mayor
                </button>
                <button 
                  onClick={() => toggleSort('id', 'desc')} 
                  className={`sort-button ${sortOrder === 'id_desc' ? 'active' : ''}`}
                >
                  <FaSortAmountDown /> ID: Mayor a Menor
                </button>
              </div>
            </div>
          )}

          <button 
            onClick={() => setIsFilterOpenName(!isFilterOpenName)} 
            className="filter-dropdown"
          >
            Nombre
          </button>
          {isFilterOpenName && (
            <div className="sort-controls">
              <div className='filter-dropdown'>
                <button 
                  onClick={() => toggleSort('name', 'asc')} 
                  className={`sort-button ${sortOrder === 'name_asc' ? 'active' : ''}`}
                >
                  <FaSortAmountUp /> Nombre: A-Z
                </button>
                <button 
                  onClick={() => toggleSort('name', 'desc')} 
                  className={`sort-button ${sortOrder === 'name_desc' ? 'active' : ''}`}
                >
                  <FaSortAmountDown /> Nombre: Z-A
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

export default FilterSectionClientes;