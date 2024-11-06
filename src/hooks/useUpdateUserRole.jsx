import { useState } from 'react';

const useUpdateUserRole = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const updateUserRole = async (userId, roleData) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch(`${url}/user/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roleData),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.status === 'success') {
          return { success: true, message: result.message };
        } else {
          setErrorMessage('Unexpected response from server.');
        }
      } else {
        setErrorMessage(`Error updating user role: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      setErrorMessage('Error connecting to the server.');
    } finally {
      setIsLoading(false);
    }

    return { success: false };
  };

  return { updateUserRole, isLoading, errorMessage };
};

export default useUpdateUserRole;
