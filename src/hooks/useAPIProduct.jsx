import { useState, useEffect } from 'react';

const useApiPr = (id) => {
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/productos/${id}`);

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
        console.error('Error al usar Get Product:', error);
        setErrorMessage('Error al conectarse al servidor.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, errorMessage, isLoading };
};

export default useApiPr;
