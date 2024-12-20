import React, { useState, useRef } from 'react';
import { FaFilter, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import { BsSortAlphaDown, BsSortAlphaUp } from 'react-icons/bs';
import FilterNav from './FilterNav';  // Import the FilterNav component
import './filterscatalogo.css';
import { MdFilterAltOff } from "react-icons/md";

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
  const handleResetFilters = () => {
    console.log("Reseted")
    handleMarcaChange('');
    handleMaterialChange('');
    handleSortChange('');
    handleNameSort('');
    if (isFilterOpen === true){
      toggleFilter();
    }
  };

  const filterButtonRef = useRef(null);
  const unfilterButtonRef = useRef(null);
  
  const hasActiveFilters = filterMarca || filterMaterial || sortOrder || sortName;


  return (
    <div className="filter-container">
    <div className="filter-controls">
      <button ref={filterButtonRef} onClick={toggleFilter} className="filter-button2">
        <FaFilter /> Filtros
      </button>
      {hasActiveFilters && (
        <button 
          ref={unfilterButtonRef}
          onClick={handleResetFilters}
          className="filter-reset-btn"
          title="Reset all filters"
        >
          <MdFilterAltOff />
        </button>
      )}
    </div>

    {isFilterOpen && (
      <div className="filter-sort-section2">
        <FilterNav
          filters={filters}
          onFilterSelect={handleFilterSelect}
          isOpen={isFilterOpen}
          setIsSidebarOpen={toggleFilter}
          filterButtonRef={filterButtonRef}
          unfilterButtonRef={unfilterButtonRef}
        />
      </div>
    )}
  </div>
);
};

export default FilterCatalogo;  
