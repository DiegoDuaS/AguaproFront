import React, { useEffect, useRef } from 'react';
import './InfoProdCard.css';

const InfoProdPedidoCard = ({ isOpen, closeCard, productos }) => {
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
            <h2 className='text'>Productos en el Pedido</h2>
            <div className='tables-section'>
                {productos.map(producto => (
                    <div key={producto.id_producto} className="product-item">
                        <h3>{producto.nombre} - #{producto.id_producto}</h3>
                        <div className='product-details'>
                            <p><strong>Descripción:</strong> {producto.descripción}</p>
                            <p><strong>Precio:</strong> ${producto.precio}</p>
                            <p><strong>Cantidad:</strong> {producto.cantidad}</p>
                            {/* Add more fields as necessary */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InfoProdPedidoCard;
