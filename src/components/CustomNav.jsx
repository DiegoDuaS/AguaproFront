import { useState } from "react";
import PropTypes from 'prop-types';

const CustomNav = ({ li, onOptionSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    onOptionSelect(option);
    setIsOpen(false);
  };

  return (
    <nav className="navbar-menu" style={{ width: isOpen ? 250 : 0, overflow: 'hidden' }}>
      <div className="burger" onClick={toggleSidebar}>
        <img style={{ width: '50px', height: '50px' }} src={menu} alt="burger" />
      </div>
      <ul className="navbar__list">
        {li.map((item, i) => (
          <div className="navbar__li-box" key={i} onClick={() => handleOptionClick(item[0])}>
            <li className="navbar__li" style={{ display: isOpen ? "block" : "none" }}>
              {item[0]}
            </li>
          </div>
        ))}
      </ul>
    </nav>
  );
};

CustomNav.propTypes = {
  li: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.node]))).isRequired,
  onOptionSelect: PropTypes.func.isRequired
};

export default CustomNav;
