import { useState } from 'react';

const useUpdateDisponibilidad = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const updateDisponibilidad = async (productId, disponibilidad) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // Obtener el token de localStorage
      const token = localStorage.getItem('token');

      const response = await fetch(`${url}/productos/disponibilidad/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',  // Incluir el token si existe
        },
        body: JSON.stringify({ disponibilidad }), // Enviar solo la disponibilidad
      });

      if (response.ok) {
        const result = await response.json();
        if (result.message === 'Product updated successfully') {
          // Actualización exitosa
          return { success: true };
        } else {
          setErrorMessage('Respuesta inesperada del servidor.');
        }
      } else {
        setErrorMessage(`Error al actualizar la disponibilidad del producto: ${response.status}`);
      }
    } catch (error) {
      console.error('Error al actualizar la disponibilidad del producto:', error);
      setErrorMessage('Error al conectarse al servidor.');
    } finally {
      setIsLoading(false);
    }

    return { success: false };
  };

  return { updateDisponibilidad, isLoading, errorMessage };
};

export default useUpdateDisponibilidad;
