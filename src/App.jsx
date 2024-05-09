import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import './styles.css'
import menuIcon from './image/menuIcon.png';
import Card from './components/card'
import Header from './components/header'
import BombasAgua from './pages/products/bombasagua'
import Mantenimiento from './pages/services/mantenimiento'
import Perforacion from './pages/services/perforacion'


function App() {

  return (
    <>
      <Header></Header>
      <div className="fixed-section">
          <img style={{ top: '20px',height:'20px', width:'30px'}} src={menuIcon} alt="menu" />
      </div>
      <Perforacion></Perforacion>
      <footer>
        Todos los Derechos Reservados a Aguatesa 2024
      </footer>
    </>
  );
}

export default App
