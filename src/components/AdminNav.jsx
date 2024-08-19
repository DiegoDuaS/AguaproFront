import PropTypes from 'prop-types';
import './AdminNav.css';

const AdminNav = ({ li, onOptionSelect, isExpanded }) => {
  return (
    <nav className={`Anavbar-menu ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <ul className="Anavbar__list">
        {li.map(([label, icon], i) => (
          <li key={i} className="Anavbar__li-box" onClick={() => onOptionSelect(label)}>
            <img src={icon} alt={label} className="Anavbar__icon" />
            {isExpanded && <span className="Anavbar__label">{label}</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
}

AdminNav.propTypes = {
  li: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  onOptionSelect: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired
};

export default AdminNav;
