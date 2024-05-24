import React, { useEffect, useRef } from 'react';
import './LargeCard.css'; // Import your CSS file

const LargeCard = ({ isOpen, closeCard }) => {
  const cardRef = useRef(null);

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

  return (
    <div className="large-card" ref={cardRef}>
      <div className="left-section">
        <img src="https://images.squarespace-cdn.com/content/v1/5b60a97de7494070b92f2702/1633103417460-HSYJWDNDGRI5GC5PHXS3/aguatesa.png" alt="Descripción de la imagen" className='image-maxcard' />
        <div className="brand">Nombre del Producto</div>
        <p className='price'>Q.1000.00</p>
      </div>
      <button className="close-button" onClick={closeCard}>X</button>
      <div className="right-section">
    
      </div>
    </div>
  );
};

export default LargeCard;
