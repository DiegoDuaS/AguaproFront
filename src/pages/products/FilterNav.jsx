import React, { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import './FilterNav.css';

const FilterNav = ({ filters, onFilterSelect, isOpen, setIsSidebarOpen }) => {
  const [selectedFilter, setSelectedFilter] = React.useState(null);
  
  const menuRef = useRef(null); // Ref for the menu container

  // Close the menu if click happens outside of the menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsSidebarOpen(false); // Close the menu
      }
    };

    // Attach the event listener to the document
    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setIsSidebarOpen]);

  const handleFilterClick = (filter) => {
    if (selectedFilter === filter) {
      setSelectedFilter(null); // Close if clicked again
    } else {
      setSelectedFilter(filter);
    }
  };

  const handleSubMenuClick = (subFilter) => {
    onFilterSelect(subFilter);
    //setIsSidebarOpen(false); // Close sidebar after selection
  };

  return (
    <nav className="navbar-menu-fi" style={{ width: isOpen ? 250 : 0 }}>
      <ul className="navbar__list-fi" style={{ display: isOpen ? "block" : "none" }}>
        {filters.map((filter, index) => (
           <div
             className={`navbar__li-box-fi 
                 ${index === 1 && selectedFilter?.name === "Marca" ? "second-item-moved": ""} 
                 ${index === 2 && selectedFilter?.name === "Material" ? "third-item-moved" : ""} 
                 ${index === 3 && selectedFilter?.name === "Ordenar por Nombre" ? "fourth-item-moved" : ""}`}
               key={index}
            >
            <li className="navbar__li-fi" onClick={() => handleFilterClick(filter)}>
              {filter.name}
              {selectedFilter === filter && isOpen && filter.options && (
                <ul className={`submenu-fi ${selectedFilter.name === filter.name ? 'open' : ''}`}>
                  {filter.options.map((option, subIndex) => (
                    <li key={subIndex} onClick={() => handleSubMenuClick(option)}>
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

FilterNav.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  onFilterSelect: PropTypes.func.isRequired,
  isOpen: PropTypes.func.isRequired,
  setIsSidebarOpen: PropTypes.func.isRequired,
};

export default FilterNav;
