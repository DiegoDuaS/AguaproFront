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
      <button className="close-button" onClick={closeCard}>x</button>
    </div>
  );
};

export default LargeCard;
