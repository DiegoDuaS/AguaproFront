import { useState } from 'react';

const useSalesReviewRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const sendSalesReviewRequest = async (PayInfo) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/pedidos/revision', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(PayInfo),
      });
      
      const result = await response.json();
      if (result.status === 'success') {
        setSuccess(true);
      } else {
        setError(result.message || 'Error sending sales review request');
      }
    } catch (error) {
      setError(error.message || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return {
    sendSalesReviewRequest,
    loading,
    error,
    success,
  };
};

export default useSalesReviewRequest;
