import { useState } from 'react';

const useGetSolicitudes = (url) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
  
    const getSolicitudes = async () => {
      setIsLoading(true);
      setErrorMessage(null);
  
      try {
        const response = await fetch(`${url}/solicitudes`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const result = await response.json();
          if (result?.data) {
            return { success: true, data: result.data };
            
          } else {
            setErrorMessage('Unexpected response from server.');
          }
        } else {
          setErrorMessage(`Error fetching solicitudes: ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching solicitudes:', error);
        setErrorMessage('Error connecting to the server.');
      } finally {
        setIsLoading(false);
      }
  
      return { success: false };
    };
  
    return { getSolicitudes, isLoading, errorMessage };
  };
  

export default useGetSolicitudes;
