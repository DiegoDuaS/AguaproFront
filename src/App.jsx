import { useState } from 'react'
import './index.css'
import menuIcon from './image/menuIcon.png';
import Header from './components/header'
import BombasAgua from './pages/products/bombasagua'
import Mantenimiento from './pages/services/mantenimiento'
import Perforacion from './pages/services/perforacion'
import CustomNav from "./components/CustomNav.jsx";

function App() {
  const [activePage, setActivePage] = useState('Bombas de agua'); // Assuming 'Perforacion' is the default active page
  console.log('Initial active page:', activePage);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar open/close

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleOptionSelect = (option) => {
    setActivePage(option);
    setIsSidebarOpen(false); // Close sidebar when an option is selected
  };

  // Define your page components, e.g., BombasAgua, Mantenimiento, Perforacion, etc.

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
      {activePage === 'Bombas de agua' && <BombasAgua />}
      {activePage === 'Perforación de Pozos' && <Perforacion />}
      {activePage === 'Mantenimiento de Pozos' && <Mantenimiento />}

      <footer>Todos los Derechos Reservados a Aguatesa 2024</footer>
    </>
  );
}

export default App;
