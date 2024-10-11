import './header.css'
import { IoCartOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";

function Header({toggleCart, navigateToLogin }) {

    return (
        <header className="fixed-header">
        <div className="brand">AGUATESA</div>
        <div style={{marginRight: '20px'}} className="icons">
          {/* Cart, User, and Notification icons */}
          <IoCartOutline size={40} onClick={toggleCart} color='black' className='icon'></IoCartOutline>
          <FaUser size={32} onClick={navigateToLogin} color='black' className='icon'></FaUser>
          <IoIosNotifications size={38} color='black' className='icon'></IoIosNotifications>
        </div>
      </header>
    );
}

export default Header
