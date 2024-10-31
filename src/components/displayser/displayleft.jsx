import React, { useEffect, useRef } from 'react';
import './Display.css';

const DisplayLeft = ({ titulo, texto, imagen }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Deja de observar una vez que es visible
                }
            },
            { threshold: 0.1 } // Visible cuando el 10% de la tarjeta está en el viewport
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) observer.unobserve(cardRef.current);
        };
    }, []);

    return (
        <div className="display-card" ref={cardRef}>
            <img src={imagen} alt={titulo} className="display-image left" />
            <div className="display-content">
                <h2>{titulo}</h2>
                <p>{texto}</p>
            </div>
        </div>
    );
};

export default DisplayLeft;
