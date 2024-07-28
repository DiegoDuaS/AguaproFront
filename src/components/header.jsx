import './header.css'
import userIcon from '../image/userIcon.png';
import notificationIcon from '../image/notificationIcon.png';
import cartIcon from '../image/cartIcon.png';

function Header({ nombre, precio, imagen, toggleCart }) {

    return (
        <header className="fixed-header">
        <div className="brand">AGUATESA</div>
        <div style={{marginRight: '20px'}} className="icons">
          {/* Cart, User, and Notification icons */}
          <img src={cartIcon} alt="Cart" onClick={toggleCart}/>
          <img src={userIcon} alt="User" />
          <img src={notificationIcon} alt="Notifications" />
        </div>
      </header>
    );
}

export default Header
