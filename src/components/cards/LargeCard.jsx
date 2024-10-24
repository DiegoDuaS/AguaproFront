import React, { useEffect, useRef, useState } from 'react';
import './LargeCard.css';

const LargeCard = ({ isOpen, closeCard, product, addToCart, imageRef}) => {
  const cardRef = useRef(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeSelected, setSizeSelected] = useState('4\'\'');
  const [animateClass, setAnimateClass] = useState('');

  useEffect(() => {
    if (isOpen) {
      setAnimateClass('slide-in'); // Añade la clase para mostrar la tarjeta
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      setAnimateClass('slide-out'); // Añade la clase para ocultar la tarjeta
      setTimeout(() => {
        document.removeEventListener('mousedown', handleClickOutside);
      }, 500); // Remueve el listener después de la animación
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleClickOutside = (event) => {
    if (cardRef.current && !cardRef.current.contains(event.target)) {
      closeCard();
    }
  };

  if (!isOpen && animateClass === '') return null;

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      quantity: quantity,
      size: sizeSelected,
    };
    addToCart(productToAdd);
  };

  return (
    <div className={`large-card ${animateClass}`} ref={cardRef}>
      <button className="close-button" onClick={closeCard}>X</button>
      <div className="left-section">
        <div className='photo-title'>
          <img className='imagecard' src={imageRef} alt={product.nombre} />
          <div className="product-title">{product.nombre}</div>
          <p className='price'>Q {product.precio.toFixed(2)}</p>
        </div>
      </div>
      <div className="right-section">
        <div className="infobox">
          <p className='info'><strong>Descripción:</strong> {product.descripción}</p>
          <p className='info'><strong>Marca:</strong> {product.marca}</p>
          <p className='info'><strong>Material:</strong> {product.material}</p>
          <p className='info'><strong>Modelo:</strong> {product.modelo} m</p>
          <p className='info'><strong>Capacidad Mínima:</strong> {product.capacidadmin} g(L)</p>
          <p className='info'><strong>Capacidad Máxima:</strong> {product.capacidadmax} g(L)</p>
        </div>
        <div className="add-to-cart">
          <div className='cuantity-box'>
            <button className='addq' onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
            <span className="quantity">{quantity}</span>
            <button className='remove' onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
          <button className='add' onClick={handleAddToCart}>Agregar al Carrito</button>
        </div>
      </div>
    </div>
  );
};

export default LargeCard;
