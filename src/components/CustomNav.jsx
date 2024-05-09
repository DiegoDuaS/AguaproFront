import { useState } from "react";
import PropTypes from 'prop-types';
import './_CustomNav.css'
import menuIcon from '../image/menuIcon.png';

const CustomNav = ({ li, onOptionSelect, isOpen }) => { // Receive isOpen prop
  const handleOptionClick = (option) => {
    onOptionSelect(option);
  };

  return (
    <nav className="navbar-menu" style={{ width: isOpen ? 250 : 0 }}>
      
      <ul className="navbar__list" style={{ display: isOpen ? "block" : "none" }}> 
        {li.map((item, i) => (
          <div className="navbar__li-box" key={i} onClick={() => handleOptionClick(item)}>
            <li className="navbar__li" >{item}</li> 
          </div>
        ))}
      </ul>
    </nav>
  );
};

CustomNav.propTypes = {
  li: PropTypes.arrayOf(PropTypes.string).isRequired,
  onOptionSelect: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired, // isOpen prop validation
};

export default CustomNav;

  
