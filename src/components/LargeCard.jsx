import React, { useEffect, useRef, useState } from 'react';
import './LargeCard.css'; // Import your CSS file
import { IoIosArrowDown } from "react-icons/io";

const LargeCard = ({ isOpen, closeCard, product, addToCart }) => {
  const cardRef = useRef(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeSelected, setSizeSelected] = useState('4\'\'');

  const handleClickOutside = (event) => {
    if (cardRef.current && !cardRef.current.contains(event.target)) {
      closeCard();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      quantity: quantity,
      size: sizeSelected,
    };
    addToCart(productToAdd);
  };

  return (
    <div className="large-card" ref={cardRef}>
      <button className="close-button" onClick={closeCard}>X</button>
      <div className="left-section">
        <div className='photo-title'>
          <img className='imagecard' src={`/image/${product.id_producto}.png`} alt={product.nombre} />
          <div className="product-title">{product.nombre}</div>
          <p className='price'>Q {product.precio}</p>
        </div>
      </div>
      <div className="right-section">
        <div className="infobox">
          <p className='info'><strong>Descpripción:</strong> {product.descripción}</p>
          <p className='info'><strong>Marca:</strong> {product.marca}</p>
          <p className='info'><strong>Material:</strong> {product.material}</p>
          <p className='info'><strong>Profundidad:</strong> {product.profundidad}m</p>
          <p className='info'><strong>Conexión Tuberia:</strong> {product.conexion_tuberia}</p>
          <p className='info'><strong>Presion Funcional:</strong> {product.presion_funcional}atm</p>
          <p className='info'><strong>Boquilla:</strong> {product.head}cm</p>
          <p className='info'><strong>Caudal:</strong> {product.flow_rate}</p>
          <p className='info'><strong>Aplicaciones:</strong> {product.aplicaciones}</p>
          <p className='info'><strong>Temperatura Media:</strong> {product.temperatura_media}°C</p>
          <p className='info'><strong>Galones Por Minuto Minimo:</strong> {product.min_gpm}</p>
          <p className='info'><strong>Galones Por Minuto Máximo:</strong> {product.max_gpm}</p>
          <p className='info'><strong>Capacitor:</strong> {product.capacitor}</p>
          <p className='info'><strong>Temperatura Liquida Minima:</strong> {product.temperatura_liquida_min}°C</p>
          <p className='info'><strong>Temperatura Liquida Máxima:</strong> {product.temperatura_liquida_max}°C</p>
          <p className='info'><strong>Temperatura Ambiente:</strong> {product.temperatura_ambiente}°C</p>
          <p className='info'><strong>Presión:</strong> {product.presion}</p>
          {/* Add other product details as needed */}
        </div>
        <div className="size-section">
          <div className="brand2">Tamaño</div>
          <div className='selection'>
            {['4\'\'', '6\'\'', '8\'\'', '10\'\''].map(size => (
              <li
                key={size}
                className={`select-size ${sizeSelected === size ? 'selected' : ''}`}
                onClick={() => setSizeSelected(size)}
              >
                {size}
              </li>
            ))}
          </div>
        </div>
        <div className="add-to-cart">
          <div className='cuantity-box'>
            <button class='addq' onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
            <span class="quantity">{quantity}</span>
            <button class='remove' onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
          <button className='add' onClick={handleAddToCart}>Agregar al Carrito</button>
        </div>
      </div>
    </div>
  );
};

export default LargeCard;
