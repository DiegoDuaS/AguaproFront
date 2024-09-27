import React, { useEffect, useRef, useState } from 'react';
import useRegisterUser from '../hooks/useRegisterUser'; // Import your hook
import './NewUserCard.css'; // Import the CSS

const NewUserCard = ({ isOpen, closeCard, onRegister }) => {
    const cardRef = useRef(null);
    const {  registerUser, response, error, loading} = useRegisterUser();

  //  const { data: usuarios, errorMessage, isLoading, refetch } = useApiP('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/users');

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleRegister = async () => {
        const userData = {
            username,
            password,
            email,
            role,
        };
        await registerUser(userData); // Call the registerUser function with userData
        
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
                                value={username}
                                placeholder="nombre de usuario"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="table-row-nu">
                            <div className="title">Contraseña</div>
                            <input
                                type="password" // Change to password for better security
                                className="input"
                                value={password}
                                placeholder="contraseña"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="table-row-nu">
                            <div className="title">Correo</div>
                            <input
                                type="email" // Change to email for better validation
                                className="input"
                                value={email}
                                placeholder="correo"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="table-row-nu">
                            <div className="title">Rol</div>
                            <input
                                type="text"
                                className="input"
                                value={role}
                                placeholder="rol del usuario"
                                onChange={(e) => setRole(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <button className="save-button-nu" onClick={handleRegister} disabled={loading}>
                {loading ? 'Guardando...' : 'Guardar'}
            </button>
            {error && <p className="error-message">{error}</p>}
            {response && response.message && <p className="success-message">{response.message}</p>} {/* Show success message */}
        </div>
    );
};
  
export default NewUserCard;

