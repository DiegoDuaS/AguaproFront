import React, { useEffect, useState } from 'react';
import './stateCard.css';
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdOutlineErrorOutline } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { IoWarningOutline } from "react-icons/io5";

const StateCard = ({ message, isOpen, type }) => {
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

  if (type === 1){
    return(
      <div className={`success-card ${showCard ? 'slide-in' : 'slide-out'}`}>
        <div className="success-message2">
          <FaRegCircleCheck  size={24} />
          {message}
        </div>
      </div>
    )
  }

  if (type === 2){
    return(
      <div className={`success-card ${showCard ? 'slide-in' : 'slide-out'}`}>
        <div className="success-message2">
          <MdOutlineErrorOutline  size={24} />
          {message}
        </div>
      </div>
    )
  }

  if (type === 3){
    return(
      <div className={`success-card ${showCard ? 'slide-in' : 'slide-out'}`}>
        <div className="success-message2">
          <IoCartOutline  size={24} />
          {message}
        </div>
      </div>
    )
  }

  if (type === 4){
    return(
      <div className={`success-card ${showCard ? 'slide-in' : 'slide-out'}`}>
        <div className="success-message2">
          <IoWarningOutline size={24} />
          {message}
        </div>
      </div>
    )
  }

  else {
    return(
      <div className={`success-card ${showCard ? 'slide-in' : 'slide-out'}`}>
        <div className="success-message2">
          <FaRegCircleCheck  size={24} />
          {message}
        </div>
      </div>
    )
  }
};

export default StateCard;
