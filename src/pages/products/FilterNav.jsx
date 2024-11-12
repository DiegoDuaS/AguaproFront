import React, { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import './FilterNav.css';

const FilterNav = ({ filters, onFilterSelect, isOpen, setIsSidebarOpen }) => {
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  
  const menuRef = useRef(null);

  // Close the menu if clicking outside, without clearing selectedOptions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsSidebarOpen(false); // Close the menu only
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setIsSidebarOpen]);

  const handleFilterClick = (filter) => {
    setSelectedFilter((prevFilter) => (prevFilter === filter ? null : filter));
  };

  const handleSubMenuClick = (filterName, option) => {
    // Set selected option for the specific submenu
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [filterName]: option,
    }));
    onFilterSelect(option);
  };

  return (
    <nav className="navbar-menu-fi" style={{ width: isOpen ? 250 : 0 }}>
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

FilterNav.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  onFilterSelect: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsSidebarOpen: PropTypes.func.isRequired,
};

export default FilterNav;

