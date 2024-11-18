import { useState } from 'react';

const useVerifyUser = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const verifyUser = async (username, email) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch(`${url}/verify/${username}/${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.status === 'success') {
          return { success: true, message: result.message };
        } else {
          setErrorMessage('Unexpected response from server.');
        }
      } else {
        setErrorMessage(`Error verifying user: ${response.status}`);
      }
    } catch (error) {
      console.error('Error verifying user:', error);
      setErrorMessage('Error connecting to the server.');
    } finally {
      setIsLoading(false);
    }

    return { success: false };
  };

  return { verifyUser, isLoading, errorMessage };
};

export default useVerifyUser;
