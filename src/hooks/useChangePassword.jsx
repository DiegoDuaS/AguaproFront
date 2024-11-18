import { useState } from 'react';

const useChangePassword = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const changePassword = async (email, recoveryCode, newPassword) => {
    setIsLoading(true);
    setErrorMessage(null);

    const body = JSON.stringify({ email, recoveryCode, newPassword });

    try {
      const response = await fetch(`${url}/changepassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });

      if (response.ok) {
        const result = await response.json();

        if (result.status === 'success') {
          return { success: true, message: result.message };
        } else if (result.status === 'failed') {
          setErrorMessage(result.error); 
          return { success: false, error: result.error };
        } else {
          setErrorMessage('Respuesta inesperada del servidor.');
          return { success: false };
        }
      } else {
        setErrorMessage(`Error en la solicitud: ${response.status}`);
        return { success: false };
      }
    } catch (error) {
      setErrorMessage('Error al conectar con el servidor.');
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  return { changePassword, isLoading, errorMessage};
};

export default useChangePassword;
