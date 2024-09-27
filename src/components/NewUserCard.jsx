import React, { useEffect, useRef, useState } from 'react';
import useRegisterUser from '../hooks/useRegisterUser'; // Import your hook
//import './EditProdCard.css'; // Import the CSS
import './NewUserCard.css'; // Import the CSS

const NewUserCard = ({ isOpen, closeCard }) => {
    const cardRef = useRef(null);
    const { registerUser, isLoading, errorMessage, successMessage } = useRegisterUser();

    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [rol, setRol] = useState('');

    const handleRegister = async () => {
        const userData = {
            nombre,
            correo,
            contraseña,
            rol,
        };
        
        await registerUser(userData); // Call the registerUser function with userData
        if (successMessage) {
            closeCard(); // Close the card if registration is successful
        }
    };

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
        <div className="large-card-prod-nu" ref={cardRef}>
            <button className="close-button" onClick={closeCard}>X</button>
            <h2 className='text-nu'>Nuevo Usuario</h2>
            <div className='tables-section-nu'>
                <div className="section-nu">
                    <div className="vertical-table-nu">
                        <div className="table-row-nu">
                            <div className="title">Nombre de Usuario</div>
                            <input
                                type="text"
                                className="input"
                                value={nombre}
                                placeholder="nombre de usuario"
                                onChange={(e) => setNombre(e.target.value)}
                            />
                            <div className="title">Contraseña</div>
                            <input
                                type="password" // Change to password for better security
                                className="input"
                                value={contraseña}
                                placeholder="contraseña"
                                onChange={(e) => setContraseña(e.target.value)}
                            />
                            <div className="title">Correo</div>
                            <input
                                type="email" // Change to email for better validation
                                className="input"
                                value={correo}
                                placeholder="correo"
                                onChange={(e) => setCorreo(e.target.value)}
                            />
                            <div className="title">Rol</div>
                            <input
                                type="text"
                                className="input"
                                value={rol}
                                placeholder="rol del usuario"
                                onChange={(e) => setRol(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <button className="save-button-nu" onClick={handleRegister} disabled={isLoading}>
                {isLoading ? 'Guardando...' : 'Guardar'}
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>} {/* Show success message */}
        </div>
    );
};

export default NewUserCard;

