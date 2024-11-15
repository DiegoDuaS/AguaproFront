import React, { useEffect, useState } from 'react';
import './successCard.css';
import { FaRegCircleCheck } from "react-icons/fa6";

const SuccessCard = ({ message, isOpen }) => {
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    let timer;
    if (isOpen) {
      setShowCard(true);
      timer = setTimeout(() => setShowCard(false), 3000); // Oculta la tarjeta después de 3 segundos
    } else {
      setShowCard(false);
    }

    return () => clearTimeout(timer); // Limpia el temporizador cuando el componente se desmonta o cambia
  }, [isOpen]);

  return (
    <div className={`success-card ${showCard ? 'slide-in' : 'slide-out'}`}>
      <div className="success-message2">
        <FaRegCircleCheck size={24} />
        {message}
      </div>
    </div>
  );
};

export default SuccessCard;
