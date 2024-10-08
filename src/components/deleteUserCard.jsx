import React, { useEffect, useRef, useState } from 'react';
import './deleteUserCard.css';

const DeleteUserCard = ({ isOpen, closeCard, user, setSuccsessMessage, setErrorMessage, refetchUsers}) => {
  const cardRef = useRef(null);
  const[state, setState] = useState(1);
  const [writtenName, setWrittenName] = useState('');
  const [notMatch, setNotMatch] = useState('');

  if (!isOpen) return null;

  const handleStateChange = () => {
    setState(2);
  };

  const handleWrittenName = (e) => setWrittenName(e.target.value);

  useEffect(() => {
    if (notMatch) {
      const timer = setTimeout(() => {
        setNotMatch('');
      }, 5000); 

      return () => clearTimeout(timer); 
    }
  }, [notMatch]);

  const handleDelete = async () => {
    if(writtenName === user.username){
        try {
            const response = await fetch(`https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/user/${user.id}`, {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' }
            });
      
            if (response.ok) {
              setSuccsessMessage('Usuario eliminado correctamente.');
              setErrorMessage(''); // Clear any previous error messages
              await refetchUsers(); 
              closeCard();
            } else {
              throw new Error('Error al eliminar el usuario');
            }
          } catch (error) {
            setErrorMessage('Error al conectar con el servidor. Intente nuevamente.');
            setSuccsessMessage(''); 
          }
    }
    else{
        setNotMatch('Los nombres no coinciden, intenta nuevamente.')
    }
  }

  if (state === 1){
    return (
        <div className={`large-card-delete`} ref={cardRef}>
          <p className='delete_text'>¿Seguro que quieres borrar al usuario '{user.username}'?</p>
          <div className='select_delete'>
            <button className='delete_button' onClick={() => handleStateChange()}>Si</button>
            <button className='delete_button' onClick={closeCard}>No</button>
          </div>
        </div>
      );
  }

  if (state === 2){
    return(
        <div className={`large-card-delete`} ref={cardRef}>
            <p className='delete_text'> Escribe el nombre del usuario para eliminarlo:</p>
            <p className='delete_text'> <strong>{user.username}</strong></p>
            <input
                    type="text"
                    placeholder="Nombre"
                    value={writtenName}
                    onChange={handleWrittenName}
                    className='deleter'
            />
            {notMatch && <p className='delete_text'>{notMatch}</p>}
            <div className='select_delete'>
                <button className='delete_button2' onClick={() => handleDelete()}>Eliminar</button>
                <button className='delete_button2' onClick={closeCard}>Regresar</button>
            </div>
        </div>
    );
  }
  
};

export default DeleteUserCard;
