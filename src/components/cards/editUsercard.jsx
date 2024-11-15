import React, { useEffect, useRef, useState } from 'react';
import './EditProdCard.css';
import './editUsercard.css';
import useUpdateUser from '../../hooks/useUpdateUser';
import useUpdateUserRole from '../../hooks/useUpdateUserRole';

const EditUserCard = ({ isOpen, closeCard, user, refetchUsers }) => {
  const cardRef = useRef(null);

  const { updateUser, isLoading: isUpdatingUser, errorMessage: userError } = useUpdateUser('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app');
  const { updateUserRole, isLoading: isUpdatingRole, errorMessage: roleError } = useUpdateUserRole('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app');

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [message, setMessage] = useState('');

  // Close card if clicking outside the card area
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
    setMessage(''); // Clear any previous messages
    try {
      const updateUserResult = await updateUser(user.id, { username, email });
      const updateRoleResult = await updateUserRole(user.id, { role });

      if (updateUserResult.success && updateRoleResult.success) {
        setMessage('Cambios guardados exitosamente.');
        refetchUsers();
        closeCard(); // Optionally close the card after successful save
      } else {
        setMessage('Hubo un error al guardar los cambios.');
      }
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
      setMessage('Hubo un error al guardar los cambios. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="large-card-prod-nu" ref={cardRef}>
      <button className="close-button" onClick={closeCard}>X</button>
      <h2 className='text'>{user.username} - #{user.id}</h2>
     
              <div className="title">Username</div>
              <input
                type="text"
                className="input2"
                value={username}
                placeholder={user.username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <div className="title">Email</div>
              <input
                type="text"
                className="input2"
                value={email}
                placeholder={user.email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="title">Rol</div>
              <select
                className="input2"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="" disabled>{user.role || "Selecciona un rol"}</option>
                <option value="vendedor">vendedor</option>
                <option value="secretaria">secretaría</option>
                <option value="analista">analista</option>
                <option value="bodeguero">bodeguero</option>
                <option value="admin">admin</option>
                <option value="user">user</option>
              </select>
      <button className="save-button" onClick={handleSave} disabled={isUpdatingUser || isUpdatingRole}>
        {(isUpdatingUser || isUpdatingRole) ? 'Guardando...' : 'Guardar'}
      </button>
      {message && <p className="message">{message}</p>}
      {(userError || roleError) && <p className="error-message">{userError || roleError}</p>}
    </div>
  );
};

export default EditUserCard;

