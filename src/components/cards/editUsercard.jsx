import React, { useEffect, useRef, useState } from 'react';
import './EditProdCard.css';
import useUpdateUser from '../../hooks/useUpdateUser';
import useUpdateUserRole from '../../hooks/useUpdateUserRole';

const EditUserCard = ({ isOpen, closeCard, user}) => {
  const cardRef = useRef(null);
    
    const { updateUser, isLoading, errorMessage } = useUpdateUser('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app');
    const { updateUserRole, isLoading2, errorMessage: roleError } = useUpdateUserRole('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app');

    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [role, setRole] = useState(user.role);
    const [succsessMessage, setSuccsessMessage] = useState('');
    const [setErrorMessage]=useState('');

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
    
    const handleSave = async () => {
      try {
        const result = await updateUser(user.id, { username, email });
        const result2 = await updateUserRole(user.id, { role });
        if (result.success && result2.success) {
          //await refetchProducts();
          setSuccsessMessage('Cambios guardados exitosamente.');
          closeCard();
        } else {
          setErrorMessage('Hubo un error al guardar los cambios.');
        }
      } catch (error) {
        console.error('Error al guardar los cambios:', error);
        setErrorMessage('Hubo un error al guardar los cambios. Inténtalo de nuevo.');
      }
    };
            

    return (
        <div className="large-card-edit" ref={cardRef}>
            <button className="close-button" onClick={closeCard}>X</button>
            <h2 className='text'>{user.username} - #{user.id}</h2>
            <div className='tables-section'>
                <div className="section">
                    <div className="vertical-table">
                        <div className="table-row2">
                            <div className="table-cell title">Username</div>
                            <input
                                type="text"
                                className="table-cell input"
                                value={username}
                                placeholder={user.username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Email</div>
                            <input
                                type="text"
                                className="table-cell input"
                                value={email}
                                placeholder={user.email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Role</div>
                            <input
                                type="text"
                                className="table-cell input"
                                value={role}
                                placeholder={user.role}
                                onChange={(e) => setRole(e.target.value)}
                            />
                        </div>  
                    </div>
                </div>
            </div>
            <button className="save-button" onClick={handleSave} disabled={isLoading}>
                {isLoading ? 'Guardando...' : 'Guardar'}
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}	    
        </div>
    );
};

export default EditUserCard;
