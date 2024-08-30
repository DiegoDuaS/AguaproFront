import { useState } from 'react';

const useUpdateProduct = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const updateProduct = async (productId, productData) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch(`${url}/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.message === 'Product updated successfully') {
          // Update was successful
          return { success: true };
        } else {
          setErrorMessage('Respuesta inesperada del servidor.');
        }
      } else {
        setErrorMessage(`Error al actualizar producto: ${response.status}`);
      }
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      setErrorMessage('Error al conectarse al servidor.');
    } finally {
      setIsLoading(false);
    }

    return { success: false };
  };

  return { updateProduct, isLoading, errorMessage };
};

export default useUpdateProduct;

