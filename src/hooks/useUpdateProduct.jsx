import { useState } from 'react';

const useUpdateProduct = (url) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const updateProduct = async (productId, productData) => {
    setIsUpdating(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(`${url}/productos/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        const responseData = await response.json();
        setSuccessMessage('Product updated successfully!');
        return responseData;
      } else if (response.status === 404) {
        setErrorMessage('Product not found.');
      } else {
        setErrorMessage('Failed to update product.');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      setErrorMessage('Error connecting to the server.');
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateProduct, isUpdating, errorMessage, successMessage };
};

export default useUpdateProduct;
