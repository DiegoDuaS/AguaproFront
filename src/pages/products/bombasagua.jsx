import React, { useState } from 'react';
import Card from "../../components/card";
import LargeCard from "../../components/LargeCard";
import './products.css'

const BombasAgua = () => {
  const [isLargeCardOpen, setIsLargeCardOpen] = useState(false);

  const openCard = () => {
    setIsLargeCardOpen(true);
  };

  const closeCard = () => {
    setIsLargeCardOpen(false);
  };

  return (
    <main className="main-content-prod">
      <h2>Bombas de Agua</h2>
      <ul className="small-card-list">
        <Card
          nombre='Producto 1'
          precio='Q.20.00'
          imagen="https://images.squarespace-cdn.com/content/v1/5b60a97de7494070b92f2702/1633103417460-HSYJWDNDGRI5GC5PHXS3/aguatesa.png"
          onMoreInfoClick={openCard}
        />
        <Card
          nombre='Producto 2'
          precio='Q.20.00'
          imagen="https://images.squarespace-cdn.com/content/v1/5b60a97de7494070b92f2702/1633103417460-HSYJWDNDGRI5GC5PHXS3/aguatesa.png"
          onMoreInfoClick={openCard}
        />
        <Card
          nombre='Producto 3'
          precio='Q.20.00'
          imagen="https://images.squarespace-cdn.com/content/v1/5b60a97de7494070b92f2702/1633103417460-HSYJWDNDGRI5GC5PHXS3/aguatesa.png"
          onMoreInfoClick={openCard}
        />
        <Card
          nombre='Producto 4'
          precio='Q.20.00'
          imagen="https://images.squarespace-cdn.com/content/v1/5b60a97de7494070b92f2702/1633103417460-HSYJWDNDGRI5GC5PHXS3/aguatesa.png"
          onMoreInfoClick={openCard}
        />
        <Card
          nombre='Producto 5'
          precio='Q.20.00'
          imagen="https://images.squarespace-cdn.com/content/v1/5b60a97de7494070b92f2702/1633103417460-HSYJWDNDGRI5GC5PHXS3/aguatesa.png"
          onMoreInfoClick={openCard}
        />
      </ul>
      <LargeCard
        isOpen={isLargeCardOpen}
        closeCard={closeCard}
      />
    </main>
  );
};

export default BombasAgua;
