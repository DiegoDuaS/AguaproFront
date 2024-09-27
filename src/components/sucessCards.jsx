import React, { useEffect, useState } from 'react';
import './successCard.css';
import { FaRegCircleCheck } from "react-icons/fa6";

const SuccessCard = ({ message, isOpen }) => {
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowCard(true);
      const timer = setTimeout(() => setShowCard(false), 3000); // Oculta la tarjeta después de 3 segundos
      return () => clearTimeout(timer);
    } else {
      setShowCard(false);
    }
  }, [isOpen]);

  return (
    <div className={`success-card ${showCard ? 'slide-in' : 'slide-out'}`}>
      <div className="success-message2">
        <FaRegCircleCheck  size={24} />
        {message}
      </div>
    </div>
  );
};

export default SuccessCard;
