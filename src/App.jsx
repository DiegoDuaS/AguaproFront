import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import './styles.css'
import searchIcon from './image/searchIcon.png'; // Placeholder search icon
import cartIcon from './image/cartIcon.png'; // Placeholder cart icon
import userIcon from './image/userIcon.png'; // Placeholder user icon
import notificationIcon from './image/notificationIcon.png'; // Placeholder notification icon
import menuIcon from './image/menuIcon.png';

function App() {

  const [searchTerm, setSearchTerm] = useState('');

  // Function to handle search term change
  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Function to handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Search term:', searchTerm);
  };

  return (
    <>
      <header className="fixed-header">
        <div className="brand">AGUATESA</div>
        <div className="search-bar">
          <div className="dropdown">
            {/* Dropdown menu */}
            <button className="dropdown-btn">Todo</button>
            <div className="dropdown-content">
              {/* Dropdown items */}
              <a href="#">Item 1</a>
              <a href="#">Item 2</a>
              <a href="#">Item 3</a>
            </div>
          </div>
          {/* Search input */}
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
            {/* Search button with image */}
            <button type="submit" className="search-btn">
             <img style={{ width: '15px', height: '15px' }} src={searchIcon} alt="Search" />

            </button>
          </form>
        </div>
        <div style={{marginRight: '20px'}} className="icons">
          {/* Cart, User, and Notification icons */}
          <img src={cartIcon} alt="Cart" />
          <img src={userIcon} alt="User" />
          <img src={notificationIcon} alt="Notifications" />
        </div>
      </header>
      <div className="fixed-section">
          <img style={{ top: '20px',height:'20px', width:'30px'}} src={menuIcon} alt="menu" />
      </div>
      <main className="main-content">
        {/* Your main content goes here */}
        <div>
          <p>Hola</p>
        </div>
      </main>
    </>
  );
}

export default App
