import { useState, useEffect, useCallback } from 'react';

const useApiP = (url) => {
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);

    // Obtener el token de localStorage o donde sea que esté guardado
    const token = localStorage.getItem('token'); 

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '', // Solo agregar el token si existe
          'Content-Type': 'application/json', // Si es necesario, añade este header
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.status === 'success' && Array.isArray(responseData.data)) {
          setData(responseData.data);
          setErrorMessage(null);
        } else {
          setErrorMessage('Respuesta inesperada del servidor.');
          console.log("Error", errorMessage)
        }
      } else {
        setErrorMessage(`Error al obtener datos: ${response.status}`);
      }
    } catch (error) {
      setErrorMessage('Error al conectarse al servidor.');
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, errorMessage, isLoading, refetch: fetchData };
};

export default useApiP;
