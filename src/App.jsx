import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import './styles.css'
import menuIcon from './image/menuIcon.png';
import Card from './components/card'
import Header from './components/header'


function App() {

  return (
    <>
      <Header></Header>
      <div className="fixed-section">
          <img style={{ top: '20px',height:'20px', width:'30px'}} src={menuIcon} alt="menu" />
      </div>
      <main className="main-content">
        <h2> Tipo de Producto</h2>
        <ul>
          <Card nombre = 'Producto 1' precio = 'Q.20.00' imagen="https://images.squarespace-cdn.com/content/v1/5b60a97de7494070b92f2702/1633103417460-HSYJWDNDGRI5GC5PHXS3/aguatesa.png"/>
          <Card nombre = 'Producto 2' precio = 'Q.20.00' imagen="https://images.squarespace-cdn.com/content/v1/5b60a97de7494070b92f2702/1633103417460-HSYJWDNDGRI5GC5PHXS3/aguatesa.png"/>
          <Card nombre = 'Producto 3' precio = 'Q.20.00' imagen="https://images.squarespace-cdn.com/content/v1/5b60a97de7494070b92f2702/1633103417460-HSYJWDNDGRI5GC5PHXS3/aguatesa.png"/>
          <Card nombre = 'Producto 4' precio = 'Q.20.00' imagen="https://images.squarespace-cdn.com/content/v1/5b60a97de7494070b92f2702/1633103417460-HSYJWDNDGRI5GC5PHXS3/aguatesa.png"/>
          <Card nombre = 'Producto 5' precio = 'Q.20.00' imagen="https://images.squarespace-cdn.com/content/v1/5b60a97de7494070b92f2702/1633103417460-HSYJWDNDGRI5GC5PHXS3/aguatesa.png"/>
        </ul>
      </main>
      <footer>
        Todos los Derechos Reservados a Aguatesa 2024
      </footer>
    </>
  );
}

export default App
