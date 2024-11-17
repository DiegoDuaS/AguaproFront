import './header.css'
import { IoCartOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import logoGrua from "../../image/logogrua.png"
import { IoIosNotifications } from "react-icons/io";

function Header({ toggleCart, navigateToLogin, cantItemscart }) {

  return (
    <header className="fixed-header">
      <div className='logoname-holder'>
        <img className="logo-image" src={logoGrua}></img>
        <div className="brand">AGUATESA</div>
      </div>
      <div style={{ marginRight: '20px' }} className="icons">
        <div style={{ position: 'relative' }}>
          {/* Icono del carrito */}
          <IoCartOutline size={40} onClick={toggleCart} color='black' className='icon' />
          {cantItemscart > 0 && (
            <div className="cart-badge">
              {cantItemscart}
            </div>
          )}
        </div>
        <FaUser size={32} onClick={navigateToLogin} color='black' className='icon' />
      </div>
    </header>
  );
}

export default Header
