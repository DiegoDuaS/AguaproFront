import { useState, useEffect } from 'react';
import './index.css';
import menuIcon from './image/menuIcon.png';
import Header from './components/header';
import BombasAgua from './pages/products/bombasagua';
import Mantenimiento from './pages/services/mantenimiento';
import Perforacion from './pages/services/perforacion';
import CustomNav from './components/CustomNav.jsx';
import Cart from './components/cart';
import LoginPage from './pages/products/login';
import RegisterPage from './pages/products/register';
import CheckoutPage from './pages/products/checkout';
import AdminPage from './pages/products/AdminPage';
import { AuthProvider } from './hooks/authProvider.jsx'; 
import validateToken from './hooks/Auth';

function App() {
  const [activePage, setActivePage] = useState(null); // Estado inicial para la página activa
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para la barra lateral
  const [isCartOpen, setIsCartOpen] = useState(false); // Estado para el carrito
  const [cartItems, setCartItems] = useState([]); // Estado para los elementos del carrito
  
  
  useEffect(() => {
    const storedPage = localStorage.getItem('activePage'); // Obtener la página almacenada
    if (storedPage) {
      setActivePage(storedPage); // Establecer la página almacenada como activa
      console.log(`Página activa cargada desde localStorage: ${storedPage}`);
    } else {
      setActivePage('Bombas de agua'); // Página por defecto si no hay ninguna en localStorage
      console.log(`Página activa establecida a valor por defecto: Bombas de agua`);
    }
  }, []);
  
  // Guardar la página activa en localStorage cada vez que cambie
  useEffect(() => {
    if (activePage !== null) { // Asegurarse de que activePage no sea null antes de guardar
      localStorage.setItem('activePage', activePage);
      console.log(`Página activa guardada en localStorage: ${activePage}`);
    }
  }, [activePage]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const navigateToLogin = async () => {
    const token = localStorage.getItem('token');
    console.log(token);

    if (!token) {
      setActivePage('Login');
    } else {
      const isValid = await validateToken(token);
      if (isValid) {
        setActivePage('AdminPage');
      } else {
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
        <CheckoutPage onRouteChange={setActivePage} cartItems={cartItems} />
      )}
      {activePage !== 'RegisterPage' && activePage !== 'CheckoutPage' && activePage !== 'Login' && activePage !== 'AdminPage' && (
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
              checkout={handleCheckout}
            />
          )}
          {activePage === 'Bombas de agua' && <BombasAgua 
              cartItems={cartItems}
              setCartItems={setCartItems}/>}
          {activePage === 'Perforación de Pozos' && <Perforacion />}
          {activePage === 'Mantenimiento de Pozos' && <Mantenimiento />}
        </>
      )}
    </AuthProvider>
  );
}

export default App;
