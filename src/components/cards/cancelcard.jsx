import React, { useEffect, useRef, useState } from 'react';
import './cancelcard.css';
import useCancelacion from '../../hooks/email/useCancelacion';

const CancelCard = ({ isOpen, closeCard, userMail, pedidoId, setSuccessMessage, setErrorMessage, setWarningMessage, refetch }) => {
  const cardRef = useRef(null);
  const [mensaje, setMensaje] = useState("");
  const { emailCancelacion, loading, error, response } = useCancelacion();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");  // Reset success message
    setErrorMessage("");    // Reset error message
    setWarningMessage("");
    
    if (mensaje === "") {
      setWarningMessage("Agrega una razón para la cancelación");
    } 
    else {
      await emailCancelacion(userMail, mensaje);
      if (error) {
        setErrorMessage("Error al enviar el correo de cancelacion");
      } else {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/pedidos/${pedidoId}/status`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token ? `Bearer ${token}` : '',  // Incluir el token si existe
            },
            body: JSON.stringify({ pedidoId, estatus: 6 }),
          });
    
          if (response.ok) {
            setSuccessMessage("Estado actualizado correctamente");
            refetch();
            closeCard(false); 
          } else {
            setErrorMessage("Error al actualizar el estado del pedido");
          }
        } catch (error) {
          setErrorMessage("Error al conectar con el servidor. Intente nuevamente.");
          console.error(error);
        }
      }
    }
  };

  return (
    <div className={`large-card-cancel`} ref={cardRef}>
      <h2>¿Por qué estas cancelando el pedido?</h2>
      <textarea 
        placeholder="Razón de la Cancelación..."
        className='text-area-cancel' 
        value={mensaje} 
        onChange={(e) => setMensaje(e.target.value)}
      />
      <div className='cancel-area-button'>
        <button onClick={() => closeCard(false)}>Regresar</button>
        <button onClick={handleSubmit}>Cancelar Pedido</button>
      </div>
    </div>
  );
};

export default CancelCard;
