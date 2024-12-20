import React, { useEffect, useRef } from 'react';
import { CircularProgress } from '@mui/material';
import './InfoProdCard.css';

const InfoProdPedidoCard = ({ isOpen, closeCard, productos, isLoadingProductos }) => {
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
    const productList = productos.data || [];

    if(isLoadingProductos){
        return(
            <div className="large-card-prod2" ref={cardRef}>
                <button className="close-button" onClick={closeCard}>X</button>
                <h2 className='text'>Productos en el Pedido</h2>
                <CircularProgress/>
            </div>
        )
    }

    return (
        <div className="large-card-prod2" ref={cardRef}>
            <button className="close-button" onClick={closeCard}>X</button>
            <h2 className='text'>Productos en el Pedido</h2>
                {Array.isArray(productList) && productList.length > 0 ? (
                    productList.map(producto => (
                        <div key={producto.id_producto} className="product-item">
                            <h3>{producto.nombre} - #{producto.id_producto}</h3>
                            <div className='product-details'>
                                <p><strong>Descripción:</strong> {producto.descripción}</p>
                                <p><strong>Precio:</strong> Q.{producto.precio}</p>
                                <p><strong>Cantidad:</strong> {producto.cantidad}</p>
                                {/* Add more fields as necessary */}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay productos para mostrar.</p> // Message when productos is not an array or empty
                )}
        </div>
    );
};

export default InfoProdPedidoCard;

