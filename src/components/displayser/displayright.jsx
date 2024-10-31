import React, { useEffect, useRef } from 'react';
import './Display.css';

const DisplayRight = ({ titulo, texto, imagen }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
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
            <div className="display-content">
                <h2>{titulo}</h2>
                <p>{texto}</p>
            </div>
            <img src={imagen} alt={titulo} className="display-image right" />
        </div>
    );
};

export default DisplayRight;
