import React, { useEffect, useRef, useState } from 'react';
import { CircularProgress } from '@mui/material';
import './InfoProdCard.css';

const InfoProdCard = ({ isOpen, closeCard, product}) => {

    const [imageSrc, setImageSrc] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const cardRef = useRef(null);

    useEffect(() => {
        const fetchImage = async () => {

          try {
            const response = await fetch(`https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/images/visualize/${product.id_producto}.png`, {
              method: 'GET',
            });
            console.log()
    
            if (response.ok) {
              const blob = await response.blob();
              const url = URL.createObjectURL(blob);
              setImageSrc(url);
            } else {
              setError('Error al obtener la imagen');
            }
          } catch (error) {
            console.error('Error al cargar la imagen:', error);
            setError('Error al cargar la imagen');
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchImage();
      });

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
                        <div className="table-row2">
                            <div className="table-cell title">Capacidad Mínima</div>
                            <div className="table-cell info_des_prod">{product.capacidadmin}</div>
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Capacidad Máxima</div>
                            <div className="table-cell info_des_prod">{product.capacidadmax}</div>
                        </div>
                    </div>
                </div>
                <div className='section'>
                    <div className="table-cell title">Imagen del Producto</div>
                    {isLoading ? (
                        <>
                            <p>Cargando imagen...</p>
                            <CircularProgress/>
                        </>  
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                     <img className='img_prod2' src={imageSrc} alt='Bomba de agua' />
                     )}
                </div>
            </div>

        </div>
    );
};

export default InfoProdCard;
