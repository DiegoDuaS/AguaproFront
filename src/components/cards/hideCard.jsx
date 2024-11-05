import React, { useEffect, useRef, useState } from 'react';
import './hideCard.css';

const HideCard = ({ isOpen, closeCard, product, setSuccsessMessage, setErrorMessage, refetchProducts}) => {
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

  const handleHide = async () => {
    if(writtenName === product.nombre){
        try {
            const response = await fetch(`https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/productos/hide/${product.id_producto}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' }
            });
      
            if (response.ok) {
              setSuccsessMessage('Producto ocultado correctamente.');
              setErrorMessage(''); 
              await refetchProducts(); 
              closeCard();
            } else {
              throw new Error('Error al ocultar el producto');
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

  const handleUnHide = async () => {
        try {
            const response = await fetch(`https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/productos/unhide/${product.id_producto}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' }
            });
      
            if (response.ok) {
              setSuccsessMessage('Producto publicado correctamente.');
              setErrorMessage(''); 
              await refetchProducts(); 
              closeCard();
            } else {
              throw new Error('Error al publicar el producto');
            }
          } catch (error) {
            setErrorMessage('Error al conectar con el servidor. Intente nuevamente.');
            setSuccsessMessage(''); 
          }
  }

  if (state === 1  && product.estado == "en venta"){
    return (
        <div className={`large-card-delete`} ref={cardRef}>
          <p className='delete_text'>¿Seguro que quieres ocultar '{product.nombre}'?</p>
          <div className='select_delete'>
            <button className='delete_button' onClick={() => handleStateChange()}>Si</button>
            <button className='delete_button' onClick={closeCard}>No</button>
          </div>
        </div>
      );
  }

  if (state === 1  && product.estado == "oculto"){
    return (
        <div className={`large-card-delete`} ref={cardRef}>
          <p className='delete_text'>¿Seguro que quieres poner visible '{product.nombre}'?</p>
          <div className='select_delete'>
            <button className='delete_button' onClick={() => handleUnHide()}>Si</button>
            <button className='delete_button' onClick={closeCard}>No</button>
          </div>
        </div>
      );
  }

  if (state === 2 && product.estado == "en venta"){
    return(
        <div className={`large-card-delete`} ref={cardRef}>
            <p className='delete_text'> Escribe el nombre del producto para ocultarlo:</p>
            <p className='delete_text'> <strong>{product.nombre}</strong></p>
            <input
                    type="text"
                    placeholder="Nombre"
                    value={writtenName}
                    onChange={handleWrittenName}
                    className='deleter'
            />
            {notMatch && <p className='delete_text'>{notMatch}</p>}
            <div className='select_delete'>
                <button className='delete_button2' onClick={() => handleHide()}>Ocultar</button>
                <button className='delete_button2' onClick={closeCard}>Regresar</button>
            </div>
        </div>
    );
  }
  
};

export default HideCard;
