// Importar y usar la librería Material-UI
// Créditos: Esta librería fue creada por MUI
// Fuente: https://github.com/mui/material-ui/tree/master
// Descripción: Componentes que implementan el Material Design System de Google

import { useState } from 'react';
import useApiP from '../../hooks/useAPIProducts';
import Card from "../../components/cards/card";
import LargeCard from "../../components/cards/LargeCard";
import { CircularProgress } from '@mui/material';
import { BiError } from "react-icons/bi";
import './products.css';

const BombasAgua = ({cartItems, setCartItems, setSuccessMessage }) => {
  const [isLargeCardOpen, setIsLargeCardOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { data: productos, errorMessage, isLoading } = useApiP('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/catalogo');

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

      const updatedItems = existingItem
        ? prevItems.map((item) =>
            item.id_producto === product.id_producto
              ? { ...item, quantity: item.quantity + (product.quantity || 1) }
              : item
          )
        : [...prevItems, { ...product, quantity: product.quantity || 1 }]; // Use the quantity from the product

      return updatedItems;
    });
    setSuccessMessage("Tu producto se añadió al carrito")
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
    <main className="main-content-loading">
        <h2>Bombas de Agua</h2>
        <div className='space' />
        <BiError color='black' size={80}/>
        <p className='loading'>Error Cargando Productos:{errorMessage}</p>
        <div className='space' />
      </main>
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
            imagen={`/image/${product.id_producto}.png`}
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
          cartItems={cartItems}
        />
      )}
    </main>
  );
};

export default BombasAgua;
