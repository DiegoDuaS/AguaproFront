import React, { useState } from 'react';
import { FaFilter, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import { MdFilterAltOff } from "react-icons/md";

const FilterSectionSolicitudes = ({ 
  isFilterOpen, 
  departamentos,
  filters,
  handleFilterChange,
  handleResetFilters,
  sortOrder,
  handleSortChange 
}) => {
  const [isFilterOpenDepartamentos, setIsFilterOpenDepartamentos] = useState(false);
  const [isFilterOpenEstados, setIsFilterOpenEstados] = useState(false);
  const [isFilterOpenFechas, setIsFilterOpenFechas] = useState(false);
  const [isFilterOpenNombres, setIsFilterOpenNombres] = useState(false);

  const hasActiveFilters = filters.departamento || filters.estado || sortOrder;

  const toggleSort = (field, direction) => {
    const sortKey = `${field}_${direction}`;
    handleSortChange(sortOrder === sortKey ? '' : sortKey);
  };

  const estados = [
    { label: 'Pendiente', value: 'pendiente' },
    { label: 'En seguimiento', value: 'enviado' },
    { label: 'Completada', value: 'entregado' },
    { label: 'Cancelada', value: 'cancelado' }
  ];

  return (
    <div>
      {isFilterOpen && (
        <div className='filter-sort-section'>
          {/* Departamentos Filter */}
          <button 
            onClick={() => setIsFilterOpenDepartamentos(!isFilterOpenDepartamentos)} 
            className="filter-dropdown"
          >
            Departamento
          </button>
          {isFilterOpenDepartamentos && (
            <div className="filter-dropdown">
              <select 
                value={filters.departamento} 
                onChange={(e) => handleFilterChange('departamento', e.target.value)}
              >
                <option value="">Todos los departamentos</option>
                {Object.entries(departamentos).map(([id, nombre]) => (
                  <option key={id} value={id}>{nombre}</option>
                ))}
              </select>
            </div>
          )}

          {/* Estados Filter */}
          <button 
            onClick={() => setIsFilterOpenEstados(!isFilterOpenEstados)} 
            className="filter-dropdown"
          >
            Estado
          </button>
          {isFilterOpenEstados && (
            <div className="filter-dropdown">
              <select 
                value={filters.estado} 
                onChange={(e) => handleFilterChange('estado', e.target.value)}
              >
                <option value="">Todos los estados</option>
                {estados.map((estado) => (
                  <option key={estado.value} value={estado.value}>
                    {estado.label}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          
          {/* Fecha Sort */}
          <button 
            onClick={() => setIsFilterOpenFechas(!isFilterOpenFechas)} 
            className="filter-dropdown"
          >
            Fecha
          </button>
          {isFilterOpenFechas && (
            <div className="filter-dropdown">
              <button 
                onClick={() => toggleSort('fecha', 'asc')} 
                className={`sort-button ${sortOrder === 'fecha_asc' ? 'active' : ''}`}
              >
                <FaSortAmountUp /> Fecha: Antigua a Reciente
              </button>
              <button 
                onClick={() => toggleSort('fecha', 'desc')} 
                className={`sort-button ${sortOrder === 'fecha_desc' ? 'active' : ''}`}
              >
                <FaSortAmountDown /> Fecha: Reciente a Antigua
              </button>
            </div>
          )}

          {/* Nombre Sort */}
          <button 
            onClick={() => setIsFilterOpenNombres(!isFilterOpenNombres)} 
            className="filter-dropdown"
          >
            Nombre
          </button>
          {isFilterOpenNombres && (
            <div className="filter-dropdown">
              <button 
                onClick={() => toggleSort('nombre', 'asc')} 
                className={`sort-button ${sortOrder === 'nombre_asc' ? 'active' : ''}`}
              >
                <FaSortAmountUp /> Nombre: A-Z
              </button>
              <button 
                onClick={() => toggleSort('nombre', 'desc')} 
                className={`sort-button ${sortOrder === 'nombre_desc' ? 'active' : ''}`}
              >
                <FaSortAmountDown /> Nombre: Z-A
              </button>
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

export default FilterSectionSolicitudes;