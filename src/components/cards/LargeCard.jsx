import React, { useEffect, useRef, useState } from 'react';
import './LargeCard.css';

const LargeCard = ({ isOpen, closeCard, product, addToCart, cartItems }) => {
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
          <img className='imagecard' src={`/image/${product.id_producto}.png`} alt={product.nombre} />
          <div className="product-title">{product.nombre}</div>
          <p className='price'>Q {product.precio.toFixed(2)}</p>
        </div>
      </div>
      <div className="right-section">
        <div className="infobox">
          <p className='info'><strong>Descripción:</strong> {product.descripción}</p>
          <p className='info'><strong>Marca:</strong> {product.marca}</p>
          <p className='info'><strong>Material:</strong> {product.material}</p>
          <p className='info'><strong>Profundidad:</strong> {product.profundidad} m</p>
          <p className='info'><strong>Conexión Tubería:</strong> {product.conexion_tuberia}</p>
          <p className='info'><strong>Presión Funcional:</strong> {product.presion_funcional} bar</p>
          <p className='info'><strong>Head:</strong> {product.head} m</p>
          <p className='info'><strong>Caudal:</strong> {product.flow_rate} m³/h</p>
          <p className='info'><strong>Aplicaciones:</strong> {product.aplicaciones}</p>
          <p className='info'><strong>Temperatura Media:</strong> {product.temperatura_media} °C</p>
          <p className='info'><strong>GPM Mínimo:</strong> {product.min_gpm} gal/min</p>
          <p className='info'><strong>GPM Máximo:</strong> {product.max_gpm} gal/min</p>
          <p className='info'><strong>Capacitor:</strong> {product.capacitor}</p>
          <p className='info'><strong>Temperatura Líquida Mínima:</strong> {product.temperatura_liquida_min} °C</p>
          <p className='info'><strong>Temperatura Líquida Máxima:</strong> {product.temperatura_liquida_max} °C</p>
          <p className='info'><strong>Temperatura Ambiente:</strong> {product.temperatura_ambiente} °C</p>
          <p className='info'><strong>Presión:</strong> {product.presion} bar</p>
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
