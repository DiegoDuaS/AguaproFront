import { useState } from 'react';
const useRegisterClient = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [updatedResult, setUpdatedResult] = useState(null);

  const registerClient = async (clientData, userReference) => {
    setIsLoading(true);
    setErrorMessage(null);
    setUpdatedResult(null);

    //console.log(clientData);
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
        //console.log(result);
        if (result.status === 'success') {
          setSuccessMessage(result.message);
          //setUpdatedResult(result.data);
          // Secondary PUT request to update user_reference if available
          if (userReference && userReference!= null) {
            const updateResponse = await fetch(`${url}/clientes/user/${result.data.id_cliente}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ user_reference: userReference }),
            });
            if (!updateResponse.ok) {
              throw new Error("Failed to update user reference.");
            }
            const updateResult = await updateResponse.json();
            console.log(updateResult);
            if (updateResult.status === 'success') {
              setSuccessMessage(updateResult.message);
              setUpdatedResult(updateResult.data);
            }
          } else {
             setUpdatedResult(result.data);
          }
           
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
  return {updatedResult, registerClient, isLoading, errorMessage, successMessage };
};
export default useRegisterClient;
