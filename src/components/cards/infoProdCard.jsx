import React, { useEffect, useRef, useState } from 'react';
import './InfoProdCard.css';

const InfoProdCard = ({ isOpen, closeCard, product}) => {
    
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
        <div className="large-card-prod" ref={cardRef}>
            <button className="close-button" onClick={closeCard}>X</button>
            <h2 className='text'>{product.nombre} - #{product.id_producto}</h2>
            <div className='tables-section'>
                <div className="section">
                    <div className="vertical-table">
                        <div className="table-row2">
                            <div className="table-cell title">Descripción</div>
                            <div className="table-cell info_des_prod">{product.descripción}</div>
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Tipo de Producto</div>
                            <div className="table-cell info_des_prod">{product.tipoproducto}</div>
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Precio</div>
                            <div className="table-cell info_des_prod">Q.{product.precio}</div>
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Disponibilidad</div>
                            <div className="table-cell info_des_prod">{product.disponibilidad} en stock</div>
                        </div>  
                        <div className="table-row2">
                            <div className="table-cell title">Marca</div>
                            <div className="table-cell info_des_prod">{product.marca}</div>
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Material</div>
                            <div className="table-cell info_des_prod">{product.material}</div>
                        </div>
                    </div>
                </div>
                <div className='section'>
                    <div className="table-cell title">Imagen del Producto</div>
                    <img className='img_prod2' src='https://elarenal.com.gt/cdn/shop/products/PLO-ROT-BACR5_bf4c08cb-f95f-44b2-8536-d995a4d337ed.jpg?v=1643991840' alt='Bomba de agua' />
                </div>
            </div>

        </div>
    );
};

export default InfoProdCard;
