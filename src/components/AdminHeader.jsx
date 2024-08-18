import './adminheader.css';
import PropTypes from 'prop-types';
import menuIcon from '../image/menuIcon.png';
import userIcon from '../image/userIcon.png';

const AdminHeader = ({ handleLogout, isExpanded, toggleMenu }) => {
  return (
    <header className="admin-header">
      <div className="burger-icon" onClick={toggleMenu}>
        <img src={menuIcon} alt="Menu" style={{ cursor: 'pointer' }} />
      </div>
      <div className="company-name">AGUATESA ADMIN</div>
      <div style={{marginRight: '40px'}} className="user-icon" onClick={handleLogout}>
        <img src={userIcon} alt="User" style={{ cursor: 'pointer' }} />
      </div>
    </header>
  );
}

AdminHeader.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

export default AdminHeader;
