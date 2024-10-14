import { useState, useEffect } from 'react';
import './index.css';
import menuIcon from './image/menuIcon.png';
import Header from './components/headers/header';
import BombasAgua from './pages/products/bombasagua';
import Mantenimiento from './pages/services/mantenimiento';
import Perforacion from './pages/services/perforacion';
import CustomNav from './components/CustomNav.jsx';
import Cart from './components/cart';
import UserMenu from './components/UserMenu';
import LoginPage from './pages/products/login';
import RegisterPage from './pages/products/register';
import ClientInfoPage from './pages/products/ClientInfo';
import CheckoutPage from './pages/products/checkout';
import AdminPage from './pages/products/AdminPage';
import { AuthProvider } from './hooks/authProvider.jsx'; 
import validateToken from './hooks/Auth';
import useUserRole from './hooks/useUserRole';
import StateCard from './components/cards/stateCard.jsx';
import { AiOutlineConsoleSql } from 'react-icons/ai';

function App() {
  const [activePage, setActivePage] = useState(null); // Estado inicial para la página activa
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para la barra lateral
  const [isCartOpen, setIsCartOpen] = useState(false); // Estado para el carrito
  const [cartItems, setCartItems] = useState([]); // Estado para los elementos del carrito
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage('');
    }, 4000);

    return () => clearTimeout(timer);
  }, [successMessage]);

  useEffect(() => {
    const storedPage = localStorage.getItem('activePage'); // Obtener la página almacenada
    if (storedPage) {
      setActivePage(storedPage); // Establecer la página almacenada como activa
    } else {
      setActivePage('Bombas de agua'); // Página por defecto si no hay ninguna en localStorage
    }
  }, []);
  
  // Guardar la página activa en localStorage cada vez que cambie
  useEffect(() => {
    if (activePage !== null) { // Asegurarse de que activePage no sea null antes de guardar
      localStorage.setItem('activePage', activePage);
    }
  }, [activePage]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);  // Toggle UserMenu on click
  };

const userId = localStorage.getItem('id');
const { role, loading, error } = useUserRole(userId);

  const navigateToLogin = async () => {
    const token = localStorage.getItem('token');
    console.log(token);
    console.log(role);
    if (!token) {
      setActivePage('Login');
    } else {
      console.log("hay token");
      const isValid = await validateToken(token);
      if (isValid && role === 'admin') {
        console.log("Es admin");
        setActivePage('AdminPage');
      } else if (isValid) {
        console.log("No es admin");
        setIsUserMenuOpen(true);
      } else {
        console.log("Token no valido");
        setActivePage('Login');
      }
    }
  };
  
  const handleCheckout = ()=> {
    setActivePage('CheckoutPage');
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
  };

  const updateCartItem = (id_producto, newQuantity) => {
    const updatedCartItems = cartItems.map(item =>
      item.id_producto === id_producto ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };
  
  const closeUserMenu = () => {
    setIsUserMenuOpen(false);  // Close the UserMenu
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    setActivePage('Bombas de agua');
    closeUserMenu();
  };

  const handleViewInfo = () => {
    setActivePage('ClientInfoPage');
    closeUserMenu();
  };
 
  return (
    <AuthProvider> 
      {activePage === 'Login' && (
        <LoginPage onRouteChange={setActivePage} />
      )}
      {activePage === 'RegisterPage' && (
        <RegisterPage onRouteChange={setActivePage} />
      )}
      {activePage === 'AdminPage' && (
        <AdminPage onRouteChange={setActivePage} />
      )}
      {activePage === 'CheckoutPage' && (
        <CheckoutPage onRouteChange={setActivePage} 
          cartItems={cartItems} 
          navigateToLogin={navigateToLogin} />
      )}
     {isUserMenuOpen && (
            <UserMenu
              closeUserMenu={closeUserMenu}
              onLogout={handleLogout}
              onViewInfo={handleViewInfo}
            />
      )}
      {activePage !== 'RegisterPage' && activePage !== 'CheckoutPage' && activePage !== 'Login' && activePage !== 'AdminPage' && (
        <>
          <Header toggleCart={toggleCart} navigateToLogin={navigateToLogin} cantItemscart={cartItems.length}/>
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
            <StateCard message={successMessage} isOpen={!!successMessage} type={3}/>
          </div>
          
          {isCartOpen && (
            <Cart
              cartItems={cartItems}
              updateCartItem={updateCartItem}
              removeCartItem={removeCartItem}
              closeCart={closeCart}
              checkout={handleCheckout}
            />
          )}
          
          {activePage === 'Bombas de agua' && <BombasAgua 
              cartItems={cartItems}
              setCartItems={setCartItems}
              setSuccessMessage={setSuccessMessage}/>}
          {activePage === 'Perforación de Pozos' && <Perforacion />}
          {activePage === 'Mantenimiento de Pozos' && <Mantenimiento />}
          {activePage === 'ClientInfoPage' && (<ClientInfoPage onRouteChange={setActivePage}/>)}
        </>
      )}
    </AuthProvider>
  );
}

export default App;
