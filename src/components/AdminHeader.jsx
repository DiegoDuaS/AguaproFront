import './adminheader.css';
import PropTypes from 'prop-types';
import menuIcon from '../image/menuIcon.png';
import { CiLogout } from "react-icons/ci";
import { FaUser } from "react-icons/fa";

const AdminHeader = ({ handleLogout, isExpanded, toggleMenu, handleLeave}) => {
  return (
    <header className="admin-header">
      <div className="burger-icon" onClick={toggleMenu}>
        <img src={menuIcon} alt="Menu" style={{ cursor: 'pointer' }} />
      </div>
      <div className="company-name">AGUATESA ADMIN</div>
      <div style={{marginRight: '40px'}} className="user-icon" onClick={handleLeave} title="Página Principal">
        <FaUser style={{ cursor: 'pointer' }} color='black' size={30}/>
      </div>
      <div style={{marginRight: '40px'}} className="logout-icon" onClick={handleLogout} title="Logout">
    	  <CiLogout style={{ cursor: 'pointer' }} color='black' size={30} />
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
