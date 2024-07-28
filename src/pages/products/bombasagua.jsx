import React, { useState } from 'react';
import Card from "../../components/card";
import LargeCard from "../../components/LargeCard";
import './products.css'

const BombasAgua = ({ onCartUpdate }) => {
  const [isLargeCardOpen, setIsLargeCardOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const openCard = (product) => {
    setSelectedProduct(product);
    console.log('producto:', product);
    setIsLargeCardOpen(true);
  };

  const closeCard = () => {
    setIsLargeCardOpen(false);
    setSelectedProduct(null);
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + product.quantity } : item
        );
      } else {
        return [...prevItems, product];
      }
    });

    onCartUpdate([...cartItems, product]);
  };


  const products = [
    {
      id: 1,
      nombre: 'Producto 1',
      precio: 20.00,
      imagen: 'https://images.squarespace-cdn.com/content/v1/5b60a97de7494070b92f2702/1633103417460-HSYJWDNDGRI5GC5PHXS3/aguatesa.png>',
      description: 'Descripción de Producto 1'
    },
    {
      id: 2,
      nombre: 'Producto 2',
      precio: 20.00,
      imagen: 'https://images.squarespace-cdn.com/content/v1/5b60a97de7494070b92f2702/1633103417460-HSYJWDNDGRI5GC5PHXS3/aguatesa.png>',
      description: 'Descripción de Producto 2'
    },
    {
      id: 3,
      nombre: 'Producto 3',
      precio: 20.00,
      imagen: 'https://images.squarespace-cdn.com/content/v1/5b60a97de7494070b92f2702/1633103417460-HSYJWDNDGRI5GC5PHXS3/aguatesa.png>',
      description: 'Descripción de Producto 3'
    },
    {
      id: 4,
      nombre: 'Producto 4',
      precio: 20.00,
      imagen: 'https://images.squarespace-cdn.com/content/v1/5b60a97de7494070b92f2702/1633103417460-HSYJWDNDGRI5GC5PHXS3/aguatesa.png>',
      description: 'Descripción de Producto 4'
    },
    {
      id: 5,
      nombre: 'Producto 5',
      precio: 20.00,
      imagen: 'https://images.squarespace-cdn.com/content/v1/5b60a97de7494070b92f2702/1633103417460-HSYJWDNDGRI5GC5PHXS3/aguatesa.png>',
      description: 'Descripción de Producto 5'
    }
  ];

  return (
    <main className="main-content-prod">
      <h2>Bombas de Agua</h2>
      <ul className="small-card-list">
        {products.map(product => (
          <Card
            nombre={product.nombre}
            precio={product.precio}
            imagen={product.imagen}
            onMoreInfoClick={() => openCard(product)}
          />
        ))}
      </ul>
      <LargeCard
        isOpen={isLargeCardOpen}
        closeCard={closeCard}
        product={selectedProduct}
        addToCart={addToCart}
      />
    </main>
  );
};

export default BombasAgua;
