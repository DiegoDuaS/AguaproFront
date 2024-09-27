import { useState, useEffect, useCallback } from 'react';

const useSearchPedidos = (baseUrl) => {
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const searchPedidos = useCallback(async (searchTerm) => {
    if (!searchTerm) {
      setSearchResults([]);
      setErrorMessage(null);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch(`${baseUrl}/search/${encodeURIComponent(searchTerm)}`);
      const responseData = await response.json();

      if (response.ok) {
        if (responseData.status === 'success' && Array.isArray(responseData.data)) {
          setSearchResults(responseData.data);
        } else {
          setErrorMessage(responseData.message || 'Respuesta inesperada del servidor.');
        }
      } else {
        setErrorMessage(responseData.message || `Error al buscar pedidos: ${response.status}`);
      }
    } catch (error) {
      console.error('Error al buscar pedidos:', error);
      setErrorMessage('Error al conectarse al servidor.');
    } finally {
      setIsLoading(false);
    }
  }, [baseUrl]);

  return { searchResults, errorMessage, isLoading, searchPedidos };
};

export default useSearchPedidos;