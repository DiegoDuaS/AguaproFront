import React, { useEffect, useRef, useState } from 'react';
import useUpdateDisponibilidad from '../../hooks/useUpdateDisponibilidad';
import './moreCard.css';

const MoreCard = ({ isOpen, closeCard, product, setSuccsessMessage, setErrorMessage, refetchProducts }) => {
  const cardRef = useRef(null);
  const [newUnits, setNewUnits] = useState('');
  const { updateDisponibilidad, isLoading, errorMessage } = useUpdateDisponibilidad('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app');

  if (!isOpen) return null;

  // Convertir newUnits a número para evitar operaciones incorrectas con strings
  const parsedUnits = parseInt(newUnits, 10);

  const handleAdd = async () => {
    try {
      if (parsedUnits <= 0) {
        setErrorMessage('Por favor, ingresa una cantidad válida.');
        return;
      }

      const disponibilidad = product.disponibilidad + parsedUnits;

      const result = await updateDisponibilidad(product.id_producto, disponibilidad);

      if (result.success) {
        await refetchProducts();
        setSuccsessMessage('Unidades añadidas correctamente.');
        closeCard();
      } else {
        setErrorMessage('Hubo un error al añadir las unidades.');
      }
    } catch (error) {
      console.error('Error al guardar las unidades:', error);
      setErrorMessage('Hubo un error al guardar las unidades. Inténtalo de nuevo.');
    }
  };

  const handleRemove = async () => {
    try {
      if (parsedUnits <= 0) {
        setErrorMessage('Por favor, ingresa una cantidad válida.');
        return;
      }

      if (parsedUnits > product.disponibilidad) {
        setErrorMessage('No se puede remover más productos de los disponibles.');
        return;
      }

      const disponibilidad = product.disponibilidad - parsedUnits;

      const result = await updateDisponibilidad(product.id_producto, disponibilidad);

      if (result.success) {
        await refetchProducts();
        setSuccsessMessage('Unidades removidas correctamente.');
        closeCard();
      } else {
        setErrorMessage('Hubo un error al remover las unidades.');
      }
    } catch (error) {
      console.error('Error al guardar las unidades:', error);
      setErrorMessage('Hubo un error al guardar las unidades. Inténtalo de nuevo.');
    }
  };

  return (
    <div className={`large-card-more`} ref={cardRef}>
      <h2 className='more_title'>#{product.id_producto} - {product.nombre}</h2>
      <p>Unidades Disponibles: <strong>{product.disponibilidad}</strong></p>
      <input
        type="number"
        className="newUnits"
        step="1"
        min="0"
        value={newUnits}
        placeholder="0"
        onChange={(e) => setNewUnits(e.target.value)}
      />
      <div className='add_remove_cant'>
        {/* Corregir la ejecución de funciones en onClick */}
        <button className='moremore-button' onClick={handleAdd}>Añadir Cantidad</button>
        <button className='moremore-button' onClick={handleRemove}>Eliminar Cantidad</button>
      </div>
      <button className='moremore-button' onClick={closeCard}>Regresar</button>
      <div className='espacio'></div>
    </div>
  );
};

export default MoreCard;
