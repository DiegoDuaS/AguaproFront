import { useState } from 'react';

const useRegisterClient = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const registerClient = async (clientData) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // POST request to register the client
      const response = await fetch(`${url}/clientes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData),
      });

      if (response.ok) {
        const result = await response.json();
        
        if (result.status === 'success') {
          setSuccessMessage(result.message);
        } else {
          setErrorMessage('Unexpected response from server.');
        }
      } else {
        setErrorMessage(`Error registering client: ${response.status}`);
      }
    } catch (error) {
      console.error('Error registering client:', error);
      setErrorMessage('Error connecting to the server.');
    } finally {
      setIsLoading(false);
    }
  };

  return { registerClient, isLoading, errorMessage, successMessage };
};

export default useRegisterClient;

