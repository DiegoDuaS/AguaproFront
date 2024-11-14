import React, { useEffect, useRef, useState } from 'react';
import useRegisterUser from '../../hooks/useRegisterUser'; // Import your hook
import './NewUserCard.css'; // Import the CSS

const NewUserCard = ({ isOpen, closeCard, onRegister,  setSuccessMessage, setErrorMessage }) => {
    const cardRef = useRef(null);
    const { registerUser,loading,error } = useRegisterUser();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');


    const handleRegister = async () => {
        const userData = { username, password, email, role };
        const result = await registerUser(userData); // Wait for the result

        // Check if result contains data or error
        if (result.data) {
            onRegister(userData); // Notify the parent to refetch users
            setSuccessMessage('Usuario registrado con exito'); // Set success message
            setErrorMessage(''); // Clear error message
        } else if (result.error) {
            setErrorMessage('Error al registrar el usuario'); // Set error message if exists
            setSuccessMessage(''); // Clear success message
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
                                className="input2"
                                value={username}
                                placeholder="Nombre de usuario"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="table-row-nu">
                            <div className="title">Contraseña</div>
                            <input
                                type="password" // Change to password for better security
                                className="input2"
                                value={password}
                                placeholder="Contraseña"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="table-row-nu">
                            <div className="title">Correo</div>
                            <input
                                type="email" // Change to email for better validation
                                className="input2"
                                value={email}
                                placeholder="Correo"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="table-row-nu">
                            <div className="title">Rol</div>
                            <input
                                type="text"
                                className="input2"
                                value={role}
                                placeholder="Rol del usuario"
                                onChange={(e) => setRole(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <button className="save-button-nu" onClick={handleRegister} disabled={loading}>
                {loading ? 'Guardando...' : 'Guardar'}
            </button>
        </div>
    );
};
  
export default NewUserCard;

