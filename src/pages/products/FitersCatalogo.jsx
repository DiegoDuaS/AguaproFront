import React, { useState } from 'react';
import { FaFilter, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import { BsSortAlphaDown, BsSortAlphaUp } from 'react-icons/bs';
import FilterNav from './FilterNav';  // Import the FilterNav component
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
  const filters = [
    {
      name: 'Marca',
      options: ['Todas las marcas', ...marcas],
    },
    {
      name: 'Material',
      options: ['Todos los materiales', ...materiales],
    },
    {
      name: 'Ordenar por Nombre',
      options: ['A-Z', 'Z-A'],
    },
    {
      name: 'Ordenar por Precio',
      options: ['Bajo a Alto', 'Alto a Bajo'],
    }
  ];

  const handleFilterSelect = (selectedOption) => {
    if (selectedOption === 'A-Z') {
      handleNameSort('asc');  // Sort by name A-Z
    } else if (selectedOption === 'Z-A') {
      handleNameSort('desc'); // Sort by name Z-A
    } else if (selectedOption === 'Bajo a Alto') {
      handleSortChange('asc'); // Sort by price from low to high
    } else if (selectedOption === 'Alto a Bajo') {
      handleSortChange('desc'); // Sort by price from high to low
    } else if (selectedOption === 'Todas las marcas') {
      handleMarcaChange('');
    } else if (selectedOption === 'Todos los materiales') {
      handleMaterialChange(''); 
    } else if (marcas.includes(selectedOption)) {
      handleMarcaChange(selectedOption); // Apply marca filter
    } else if (materiales.includes(selectedOption)) {
      handleMaterialChange(selectedOption); // Apply material filter
    }
  };

  return (
    <div>
      <button onClick={toggleFilter} className="filter-button">
        <FaFilter /> Filtros
      </button>

      {isFilterOpen && (
        <div className="filter-sort-section">
          <FilterNav
            filters={filters}
            onFilterSelect={handleFilterSelect}
            isOpen={isFilterOpen}
            setIsSidebarOpen={toggleFilter}
          />
        </div>
      )}
    </div>
  );
};

export default FilterCatalogo;  
