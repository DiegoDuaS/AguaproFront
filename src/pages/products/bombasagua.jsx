// Importar y usar la librería Material-UI
// Créditos: Esta librería fue creada por MUI
// Fuente: https://github.com/mui/material-ui/tree/master
// Descripción: Componentes que implementan el Material Design System de Google

import { useState } from 'react';
import useApiP from '../../hooks/useAPIProducts';
import useApiPr from '../../hooks/useAPIProduct';
import Card from "../../components/card";
import LargeCard from "../../components/LargeCard";
import { CircularProgress } from '@mui/material';
import './products.css';

const BombasAgua = ({ onCartUpdate }) => {
  const [isLargeCardOpen, setIsLargeCardOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const { data: productos, errorMessage, isLoading } = useApiP('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/productos');

  // Función para abrir tarjeta de información
  const openCard = (product) => {
    setSelectedProduct(product);
    setIsLargeCardOpen(true);
  };

  // Función para cerrar tarjeta de información
  const closeCard = () => {
    setIsLargeCardOpen(false);
    setSelectedProduct(null);
  };

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id_producto === product.id_producto);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id_producto === product.id_producto ? { ...item, quantity: item.quantity + product.quantity } : item
        );
      } else {
        return [...prevItems, product];
      }
    });

    onCartUpdate([...cartItems, product]);
  };

  // Pantalla de carga
  if (isLoading) {
    return (
      <main className="main-content-loading">
        <h2>Bombas de Agua</h2>
        <div className='space' />
        <CircularProgress />
        <p className='loading'>Cargando productos...</p>
        <div className='space' />
      </main>
    );
  }

  // Pantalla de Error
  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  // Pantalla Principal
  return (
    <main className="main-content-prod">
      <h2>Bombas de Agua</h2>
      <ul className="small-card-list">
        {productos.map(product => (
          <Card
            key={product.id_producto}
            nombre={product.nombre}
            precio={product.precio}
            imagen={'https://images.squarespace-cdn.com/content/v1/5b60a97de7494070b92f2702/1633103417460-HSYJWDNDGRI5GC5PHXS3/aguatesa.png>'}
            onMoreInfoClick={() => openCard(product)}
          />
        ))}
      </ul>
      {selectedProduct && (
        <LargeCard
          isOpen={isLargeCardOpen}
          closeCard={closeCard}
          product={selectedProduct}
          addToCart={addToCart}
        />
      )}
    </main>
  );
};

export default BombasAgua;
