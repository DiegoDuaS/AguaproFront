import PropTypes from 'prop-types';
import './AdminNav.css';

const AdminNav = ({ li, onOptionSelect, isExpanded }) => {
  return (
    <nav className={`Anavbar-menu ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <ul className="Anavbar__list">
        {li.map(([label, Icon], i) => (
          <li key={i} className="Anavbar__li-box" onClick={() => onOptionSelect(label)}>
            <Icon style={{ color: 'black' }} className="Anavbar__icon" /> {/* Render Icon as a component */}
            {isExpanded && <span className="Anavbar__label">{label}</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
};

AdminNav.propTypes = {
  li: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]) // Icon is a component, so it's elementType
    )
  ).isRequired,
  onOptionSelect: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired
};

export default AdminNav;
