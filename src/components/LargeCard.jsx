import React, { useEffect, useRef, useState } from 'react';
import './LargeCard.css'; // Import your CSS file
import { IoIosArrowDown } from "react-icons/io";

const LargeCard = ({ isOpen, closeCard }) => {
  const cardRef = useRef(null);
  const [sizeSelected, setSizeSelected] = useState(1);

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
      <button className="close-button" onClick={closeCard}>X</button>
      <div className="left-section">
        <div className='photo-title'>
          <img src="https://images.squarespace-cdn.com/content/v1/5b60a97de7494070b92f2702/1633103417460-HSYJWDNDGRI5GC5PHXS3/aguatesa.png" alt="Descripción de la imagen" className='image-maxcard' />
          <div className="product-title">Bomba Sumergible de Acero Inoxidable</div>
          <p className='price'>Q.1000.00</p>
        </div>
      </div>
      <div className="right-section">
        <div className="infobox">
          <p className='info'><strong>Descpripción:</strong> Placeholder de una descpripcion de producto larga para probar la funcionalidad del texto.</p>
          <p className='info'><strong>Marca:</strong> Placeholder</p>
          <p className='info'><strong>Material:</strong> Placeholder</p>
          <p className='info'><strong>Profundidad:</strong> Placeholder</p>
          <p className='info'><strong>Presión Funcional:</strong> Placeholder</p>
          <p className='info'><strong>Cabeza:</strong> Placeholder</p>
          <p className='info'><strong>Descarga:</strong> Placeholder</p>
          <p className='info'><strong>Aplicaciones:</strong> Placeholder</p>
          <p className='info'><strong>Temperatura Media:</strong> Placeholder</p>
          <p className='info'><strong>Energía Máxima:</strong> Placeholder</p>
        </div>
        <div className="size-section">
          <div className="brand">Tamaño</div>
            <div className='selection'>
              <li className='select-size'> 4'' </li>
              <li className='select-size'> 6'' </li>
              <li className='select-size'> 8'' </li>
              <li className='select-size'> 10'' </li>
            </div>
        </div>
        <div className="add-to-cart"> 
          <div className='cuantity-box'>
            1
            <IoIosArrowDown />
          </div>

          <button className='add'>Agregar al Carrito</button>
        </div>
      </div>
    </div>
  );
};

export default LargeCard;
