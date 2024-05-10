import React from "react";
import PropTypes from 'prop-types';
import './_CustomNav.css'
import menuIcon from '../image/menuIcon.png';

const CustomNav = ({ items, onOptionSelect, isOpen, setIsSidebarOpen, setActivePage }) => {
  const [selectedOption, setSelectedOption] = React.useState(null); 

  const handleOptionClick = (option) => {
    if (selectedOption === option) {
      setSelectedOption(null); // Close the dropdown if the same option is clicked again
    } else {
      setSelectedOption(option); // Open the dropdown for the clicked option
    }
    if (option.name === "Servicios" || option.name === "Productos") {
      setIsSidebarOpen(true); // Open the sidebar if "Servicios" or "Productos" are clicked
    } else {
      setIsSidebarOpen(false); // Close the sidebar for other options
    }
  };

  const handleSubMenuClick = (subItem) => {
    onOptionSelect(subItem);
    setIsSidebarOpen(false); // Close the sidebar when a submenu item is clicked
  };

const sidebarHeight = selectedOption && selectedOption.subItems ? selectedOption.subItems.length * 43 + 120 : 120;

  return (
    <nav className="navbar-menu" style={{ width: isOpen ? 250 : 0 }}>
      <ul className="navbar__list" style={{ display: isOpen ? "block" : "none" }}>
        {items.map((item, index) => (
          <div className="navbar__li-box"  key={index}>
            <li className="navbar__li" >
              <div onClick={() => handleOptionClick(item)}>{item.name}</div>
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
  isOpen: PropTypes.bool.isRequired,
};

export default CustomNav;
