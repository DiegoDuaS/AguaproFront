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
<<<<<<< HEAD
                            <div className="table-cell info_des_prod">{product.tipoproducto}</div>
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Precio</div>
                            <div className="table-cell info_des_prod">Q.{product.precio}</div>
=======
                            <div className="table-cell info_des_prod">{product.tipo_producto}</div>
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Precio</div>
                            <div className="table-cell info_des_prod">${product.precio}</div>
>>>>>>> testing
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
<<<<<<< HEAD
                            <div className="table-cell title">Capacidad Mínima</div>
                            <div className="table-cell info_des_prod">{product.capacidadmin}</div>
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Capacidad Máxima</div>
                            <div className="table-cell info_des_prod">{product.capacidadmax}</div>
=======
                            <div className="table-cell title">Profundidad</div>
                            <div className="table-cell info_des_prod">{product.profundidad} mm</div>
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Temperatura Líquida Máxima</div>
                            <div className="table-cell info_des_prod">{product.temperatura_liquida_max} °C</div>
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Conexión de Tubería</div>
                            <div className="table-cell info_des_prod">{product.conexion_tuberia}</div>
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Presión Funcional</div>
                            <div className="table-cell info_des_prod">{product.presion_funcional} bar</div>
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Head</div>
                            <div className="table-cell info_des_prod">{product.head} m</div>
>>>>>>> testing
                        </div>
                    </div>
                </div>
                <div className='section'>
<<<<<<< HEAD
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
=======
                    <div className='vertical-table'>
                        <div className="table-row2">
                            <div className="table-cell title">Aplicaciones</div>
                            <div className="table-cell info_des_prod">{product.aplicaciones}</div>
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Temperatura Media</div>
                            <div className="table-cell info_des_prod">{product.temperatura_media} °C</div>
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">GPM Mínimo</div>
                            <div className="table-cell info_des_prod">{product.min_gpm} GPM</div>
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">GPM Máximo</div>
                            <div className="table-cell info_des_prod">{product.max_gpm} GPM</div>
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">HP Mínimo</div>
                            <div className="table-cell info_des_prod">{product.min_hp} HP</div>
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">HP Máximo</div>
                            <div className="table-cell info_des_prod">{product.max_hp} HP</div>
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Capacitor</div>
                            <div className="table-cell info_des_prod">{product.capacitor}</div>
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Temperatura Líquida Mínima</div>
                            <div className="table-cell info_des_prod">{product.temperatura_liquida_min} °C</div>
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Temperatura Ambiente</div>
                            <div className="table-cell info_des_prod">{product.temperatura_ambiente} °C</div>
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Presión</div>
                            <div className="table-cell info_des_prod">{product.presion} bar</div>
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Caudal</div>
                            <div className="table-cell info_des_prod">{product.flow_rate} L/min</div>
                        </div>
                    </div>
>>>>>>> testing
                </div>
            </div>

        </div>
    );
};

export default InfoProdCard;
