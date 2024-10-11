import React, { useEffect, useRef, useState } from 'react';
import './moreCard.css';

const MoreCard = ({ isOpen, closeCard, product}) => {
  const cardRef = useRef(null);
  const [newUnits, setNewUnits] = useState('');
  if (!isOpen) return null;

  return (
    <div className={`large-card-more`} ref={cardRef}>
      <h2 className='more_title'>#{product.id_producto} - {product.nombre}</h2>
      <p>Unidades Disponibles: <strong>{product.disponibilidad}</strong></p>
      <input
        type="number" 
        className="newUnits"
        step="1"
        min="0"
        value={newUnits}
        placeholder="0"
        onChange={(e) => setNewUnits(e.target.value)}
      />
      <div className='add_remove_cant'>
        <button className='moremore-button'>Añadir Cantidad</button>
        <button className='moremore-button'>Eliminar Cantidad</button>
      </div>
      <button className='moremore-button' onClick={closeCard}>Regresar</button>
      <div className='espacio'></div>
    </div>
  );
};

export default MoreCard;
