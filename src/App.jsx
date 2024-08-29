import { useState } from 'react';
import './index.css';
import menuIcon from './image/menuIcon.png';
import Header from './components/header';
import BombasAgua from './pages/products/bombasagua';
import Mantenimiento from './pages/services/mantenimiento';
import Perforacion from './pages/services/perforacion';
import CustomNav from './components/CustomNav.jsx';
import Cart from './components/cart';
import LoginPage from './pages/products/login';
import AdminPage from './pages/products/AdminPage';
import { AuthProvider } from './hooks/authProvider.jsx'; // Importa el AuthProvider

function App() {
  const [activePage, setActivePage] = useState('Bombas de agua'); // Página activa inicial
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para la barra lateral
  const [isCartOpen, setIsCartOpen] = useState(false); // Estado para el carrito
  const [cartItems, setCartItems] = useState([]);  // Estado para los elementos del carrito

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const navigateToLogin = () => {
    setActivePage('Login');
  };

  const handleOptionSelect = (option) => {
    setActivePage(option);
    setIsSidebarOpen(false); // Cierra la barra lateral al seleccionar una opción
  };

  const handleCartUpdate = (updatedCartItems) => {
    setCartItems(updatedCartItems);
  };

  const removeCartItem = (id_producto) => {
    const updatedCartItems = cartItems.filter(item => item.id_producto !== id_producto);
    setCartItems(updatedCartItems);
    handleCartUpdate(updatedCartItems);
  };

  const updateCartItem = (id_producto, newQuantity) => {
    const updatedCartItems = cartItems.map(item =>
      item.id_producto === id_producto ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
    handleCartUpdate(updatedCartItems);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <AuthProvider> 
      {activePage === 'Login' && (
        <LoginPage onRouteChange={setActivePage} />
      )}
      {activePage === 'AdminPage' && (
        <AdminPage onRouteChange={setActivePage} />
      )}
      {activePage !== 'Login' && activePage !== 'AdminPage' && (
        <>
          <Header toggleCart={toggleCart} navigateToLogin={navigateToLogin} />
          <div className="fixed-section">
            <img
              style={{ top: '20px', height: '20px', width: '30px', cursor: 'pointer' }}
              src={menuIcon}
              alt="menu"
              onClick={toggleSidebar}
            />
            <CustomNav
              items={[
                { name: 'Productos', subItems: ['Bombas de agua'] },
                { name: 'Servicios', subItems: ['Perforación de Pozos', 'Mantenimiento de Pozos'] },
              ]}
              onOptionSelect={handleOptionSelect}
              isOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              setActivePage={setActivePage}
            />
          </div>

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
        </>
      )}
    </AuthProvider>
  );
}

export default App;
