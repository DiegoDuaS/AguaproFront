import React from "react";
import PropTypes from 'prop-types';
import './CustomNav.css';

const CustomNav = ({ items, onOptionSelect, isOpen, setIsSidebarOpen, setActivePage }) => {
  const [selectedOption, setSelectedOption] = React.useState(null); 

  const handleOptionClick = (option) => {
    if (selectedOption === option) {
      setSelectedOption(null); // Close the dropdown if the same option is clicked again
    } else {
      setSelectedOption(option); // Open the dropdown for the clicked option
    }
    if (option.name === "Sobre Nosotros" || option.name === "Productos") {
      setIsSidebarOpen(true); // Open the sidebar if "Servicios" or "Productos" are clicked
    } else {
      setIsSidebarOpen(false); // Close the sidebar for other options
    }
  };

  const handleSubMenuClick = (subItem) => {
    onOptionSelect(subItem); // Notifica al padre sobre la selección
    setIsSidebarOpen(false); // Cierra el menú
    setSelectedOption(null); // Limpia la selección del menú
    window.scrollTo({
      top: 0, 
    });
  };

  return (
    <nav className="navbar-menu" style={{ width: isOpen ? 250 : 0 }}>
      <ul className="navbar__list" style={{ display: isOpen ? "block" : "none" }}>
        {items.map((item, index) => (
          <div
            className={`navbar__li-box ${
              index === 1 && selectedOption?.name === "Productos" ? "second-item-moved" : ""
            }`}
            key={index}
          >
            <li className="navbar__li" onClick={() => handleOptionClick(item)}>
              {item.name}
              {selectedOption === item && isOpen && item.subItems && (
                <ul className={`submenu ${selectedOption.name === item.name ? 'open' : ''}`}>
                  {item.subItems.map((subItem, subIndex) => (
                    <li key={subIndex} onClick={() => handleSubMenuClick(subItem)}>
                      {subItem}
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

CustomNav.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      subItems: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  onOptionSelect: PropTypes.func.isRequired,
  isOpen: PropTypes.func.isRequired,
};

export default CustomNav;

