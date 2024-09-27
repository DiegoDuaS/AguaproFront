import React, { useEffect, useRef, useState } from 'react';
import './editUsercard.css';

const EditUserCard = ({ isOpen, closeCard, user}) => {
  const cardRef = useRef(null);
  
  if (!isOpen) return null;

  return (
    <div className={`edituser-card`} ref={cardRef}>
      <button className="close-button" onClick={closeCard}>X</button>
      <p>prueba</p>
    </div>
  );
};

export default EditUserCard;
