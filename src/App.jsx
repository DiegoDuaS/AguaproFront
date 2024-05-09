import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import menuIcon from './image/menuIcon.png';
import Card from './components/card'
import Header from './components/header'
import BombasAgua from './pages/products/bombasagua'
import Mantenimiento from './pages/services/mantenimiento'
import Perforacion from './pages/services/perforacion'
import CustomNav from "./components/CustomNav.jsx";

function App() {
  const [activePage, setActivePage] = useState('Perforacion'); // Assuming 'Perforacion' is the default active page
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar open/close

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleOptionSelect = (option) => {
    setActivePage(option);
    setIsSidebarOpen(false); // Close sidebar when an option is selected
  };

  return (
    <>
      <Header />
      <div className="fixed-section">
        <img
          style={{ top: '20px', height: '20px', width: '30px', cursor: 'pointer' }}
          src={menuIcon}
          alt="menu"
          onClick={toggleSidebar} // Use toggleSidebar here
        />
        <CustomNav
          li={["Productos", "Servicios"]} // Simplified the array structure
          onOptionSelect={handleOptionSelect}
          isOpen={isSidebarOpen} // Pass the state to CustomNav
        />
      </div>
      <div>
        {activePage === 'Servicios' && (
          <div>
            <Perforacion />
          </div>
         )}
      </div>
      <footer>Todos los Derechos Reservados a Aguatesa 2024</footer>
    </>
  );
}

export default App;
