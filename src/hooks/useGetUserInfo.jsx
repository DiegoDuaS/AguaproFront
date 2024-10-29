import { useState } from 'react';

const useUserInfo = (url) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
  
    const getUserInfo = async (userId) => {
      setIsLoading(true);
      setErrorMessage(null);
  
      try {
        const response = await fetch(`${url}/user/${userId}`, {
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
          setErrorMessage(`Error fetching user: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setErrorMessage('Error connecting to the server.');
      } finally {
        setIsLoading(false);
      }
  
      return { success: false };
    };
  
    return { getUserInfo, isLoading, errorMessage };
  };
  

export default useUserInfo;
