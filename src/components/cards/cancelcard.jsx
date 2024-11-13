import React, { useEffect, useRef, useState } from 'react';
import './cancelcard.css';

const CancelCard = ({ isOpen, closeCard, pedidoId, newEstado, setSuccsessMessage, setErrorMessage, refetch }) => {
  const cardRef = useRef(null);

  if (!isOpen) return null;

  return (
    <div className={`large-card-cancel`} ref={cardRef}>
      <h2>¿Por qué estas cancelando el pedido?</h2>
      <textarea placeholder="Razón de la Cancelación..."className='text-area-cancel'></textarea>
      <div className='cancel-area-button'>
        <button>Regresar</button>
        <button onClick={() => closeCard(false)}>Cancelar</button>
      </div>
    </div>
  );
};

export default CancelCard;