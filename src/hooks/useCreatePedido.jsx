import { useState, useCallback } from 'react';

const useCreatePedido = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [pedidoId, setPedidoId] = useState(null);

  const createPedido = useCallback(async (pedidoData) => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/save_purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedidoData),
      });
      //console.log(response);
      if (!response.ok) {
        throw new Error('Failed to create pedido');
      }

      const data = await response.json();
      //console.log(data.message);
      if (data.message === 'Compra guardada exitosamente.') {
        setPedidoId(data.pedidoId);
        setMessage(data.message);
      } else {
        setError(data.message || 'Unknown error');
      }
    } catch (error) {
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    createPedido,
    loading,
    error,
    message,
    pedidoId,
  };
};

export default useCreatePedido;
