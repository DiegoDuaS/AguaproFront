import React, { useEffect, useRef, useState } from 'react';
import useApiPr from '../hooks/useAPIProduct';
import './InfoProdCard.css';
import ProductosPage from '../pages/products/Admin/ProductosPage';

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
                            <div className="table-cell info">{product.descripción}</div>
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Tipo de Producto</div>
                            <div className="table-cell info">{product.tipo_producto}</div>
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Precio</div>
                            <div className="table-cell info">${product.precio}</div>
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Disponibilidad</div>
                            <div className="table-cell info">{product.disponibilidad} en stock</div>
                        </div>  
                        <div className="table-row2">
                            <div className="table-cell title">Marca</div>
                            <div className="table-cell info">{product.marca}</div>
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Material</div>
                            <div className="table-cell info">{product.material}</div>
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Profundidad</div>
                            <div className="table-cell info">{product.profundidad} mm</div>
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Temperatura Líquida Máxima</div>
                            <div className="table-cell info">{product.temperatura_liquida_max} °C</div>
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Conexión de Tubería</div>
                            <div className="table-cell info">{product.conexion_tuberia}</div>
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Presión Funcional</div>
                            <div className="table-cell info">{product.presion_funcional} bar</div>
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Head</div>
                            <div className="table-cell info">{product.head} m</div>
                        </div>
                    </div>
                </div>
                <div className='section'>
                    <div className='vertical-table'>
                        <div className="table-row2">
                            <div className="table-cell title">Aplicaciones</div>
                            <div className="table-cell info">{product.aplicaciones}</div>
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Temperatura Media</div>
                            <div className="table-cell info">{product.temperatura_media} °C</div>
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">GPM Mínimo</div>
                            <div className="table-cell info">{product.min_gpm} GPM</div>
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">GPM Máximo</div>
                            <div className="table-cell info">{product.max_gpm} GPM</div>
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">HP Mínimo</div>
                            <div className="table-cell info">{product.min_hp} HP</div>
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">HP Máximo</div>
                            <div className="table-cell info">{product.max_hp} HP</div>
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Capacitor</div>
                            <div className="table-cell info">{product.capacitor}</div>
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Temperatura Líquida Mínima</div>
                            <div className="table-cell info">{product.temperatura_liquida_min} °C</div>
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Temperatura Ambiente</div>
                            <div className="table-cell info">{product.temperatura_ambiente} °C</div>
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Presión</div>
                            <div className="table-cell info">{product.presion} bar</div>
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Caudal</div>
                            <div className="table-cell info">{product.flow_rate} L/min</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default InfoProdCard;
