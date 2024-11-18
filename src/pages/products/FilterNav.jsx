import React, { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import './FilterNav.css';

const FilterNav = ({ filters, onFilterSelect, isOpen, setIsSidebarOpen, filterButtonRef, unfilterButtonRef }) => {
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        filterButtonRef.current &&
        !filterButtonRef.current.contains(event.target) &&
        unfilterButtonRef.current &&
        !unfilterButtonRef.current.contains(event.target) 
      ) {
        setIsSidebarOpen(false); // Cierra el menú
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsSidebarOpen]);

  const handleFilterClick = (filter) => {
    setSelectedFilter((prevFilter) => (prevFilter === filter ? null : filter));
  };

  const handleSubMenuClick = (filterName, option) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [filterName]: option,
    }));
    onFilterSelect(option);
  };

  return (
    <nav ref={menuRef} className="navbar-menu-fi" style={{ width: isOpen ? 250 : 0 }}>
      <ul className="navbar__list-fi" style={{ display: isOpen ? "block" : "none" }}>
        {filters.map((filter, index) => (
          <div
            className={`navbar__li-box-fi 
              ${index === 1 && selectedFilter?.name === "Marca" ? "second-item-moved" : ""} 
              ${index === 2 && selectedFilter?.name === "Material" ? "third-item-moved" : ""} 
              ${index === 3 && selectedFilter?.name === "Ordenar por Nombre" ? "fourth-item-moved" : ""}`}
            key={index}
          >
            <li className="navbar__li-fi" onClick={() => handleFilterClick(filter)}>
              {filter.name}
              {selectedFilter === filter && isOpen && filter.options && (
                <ul className={`submenu-fi ${selectedFilter.name === filter.name ? 'open' : ''}`}>
                  {filter.options.map((option, subIndex) => (
                    <li
                      key={subIndex}
                      onClick={() => handleSubMenuClick(filter.name, option)}
                      className={selectedOptions[filter.name] === option ? "selected-option" : ""}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </div>
        ))}
      </ul>
    </nav>
  );
};

export default FilterNav;

