import { useState, useEffect, useCallback } from 'react';

const useApiP = (url) => {
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await fetch(url);

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.status === 'success' && Array.isArray(responseData.data)) {
          setData(responseData.data);
          setErrorMessage(null);
        } else {
          setErrorMessage('Respuesta inesperada del servidor.');
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
