import { useState } from 'react'
import './index.css'
import menuIcon from './image/menuIcon.png';
import Header from './components/header'
import BombasAgua from './pages/products/bombasagua'
import Mantenimiento from './pages/services/mantenimiento'
import Perforacion from './pages/services/perforacion'
import CustomNav from "./components/CustomNav.jsx";
import Cart from './components/cart';

function App() {
  const [activePage, setActivePage] = useState('Bombas de agua'); // Assuming 'Perforacion' is the default active page
  console.log('Initial active page:', activePage);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar open/close
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);  

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleOptionSelect = (option) => {
    setActivePage(option);
    setIsSidebarOpen(false); // Close sidebar when an option is selected
  };
  const handleCartUpdate = (updatedCartItems) => {
    setCartItems(updatedCartItems);
  };
  
  const removeCartItem = (id) => {
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCartItems);
    handleCartUpdate(updatedCartItems);
  };

  const updateCartItem = (id, newQuantity) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
    handleCartUpdate(updatedCartItems);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };
  // Define your page components, e.g., BombasAgua, Mantenimiento, Perforacion, etc.

  return (
    <>
      <Header toggleCart={toggleCart} />
      <div className="fixed-section">
        <img
          style={{ top: '20px', height: '20px', width: '30px', cursor: 'pointer' }}
          src={menuIcon}
          alt="menu"
          onClick={toggleSidebar} // Use toggleSidebar here
        />
        <CustomNav
          items={[
            { name: 'Productos', subItems: ['Bombas de agua'] }, // Define submenu items
            { name: 'Servicios', subItems: ['Perforación de Pozos', 'Mantenimiento de Pozos'] }, // Define submenu items
          ]}
          onOptionSelect={handleOptionSelect}
          isOpen={isSidebarOpen} // Pass the state to CustomNav
          setIsSidebarOpen={setIsSidebarOpen}
          setActivePage={setActivePage}
        />
      </div>

      {/* Render your active page based on activePage state */}
      {isCartOpen && (
        <Cart
          cartItems={cartItems}
          updateCartItem={updateCartItem}
          removeCartItem={removeCartItem}
          closeCart={closeCart}
        />
      )}
      {activePage === 'Bombas de agua' && <BombasAgua onCartUpdate={handleCartUpdate}/>}
      {activePage === 'Perforación de Pozos' && <Perforacion />}
      {activePage === 'Mantenimiento de Pozos' && <Mantenimiento />}
      
      <footer>Todos los Derechos Reservados a Aguatesa 2024</footer>
    </>
  );
}

export default App;
