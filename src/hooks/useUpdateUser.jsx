import { useState } from 'react';

const useUpdateUser = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const updateUser = async (userId, userData) => {
    setIsLoading(true);
    setErrorMessage(null);

    // Obtener el token de localStorage o donde esté guardado
    const token = localStorage.getItem('token'); 

    try {
      const response = await fetch(`${url}/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '', // Agregar el token si existe
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.status === 'success') {
          return { success: true, message: result.message };
        } else {
          setErrorMessage('Unexpected response from server.');
        }
      } else {
        setErrorMessage(`Error updating user: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating user:', error);
      setErrorMessage('Error connecting to the server.');
    } finally {
      setIsLoading(false);
    }

    return { success: false };
  };

  return { updateUser, isLoading, errorMessage };
};

export default useUpdateUser;
