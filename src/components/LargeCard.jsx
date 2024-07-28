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
          <img src={product.imagen} alt={product.nombre} />
          <div className="product-title">{product.nombre}</div>
          <p className='price'>Q {product.precio}</p>
        </div>
      </div>
      <div className="right-section">
        <div className="infobox">
          <p className='info'><strong>Descpripción:</strong> {product.description}</p>
          {/* Add other product details as needed */}
        </div>
        <div className="size-section">
          <div className="brand">Tamaño</div>
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
          <div className='quantity-box'>
            <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
          <button className='add' onClick={handleAddToCart}>Agregar al Carrito</button>
        </div>
      </div>
    </div>
  );
};

export default LargeCard;
