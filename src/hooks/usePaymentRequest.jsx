import { useState } from 'react';

const usePaymentRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const sendPaymentRequest = async (clientPay) => {
    setLoading(true);
    setError(null);
    
    try { 
      
      //console.log("doing pay");
      const response = await fetch('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/pedido/pago', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
         body: JSON.stringify(clientPay),
      });
      //console.log(response.status);
      const result = await response.json();
      //console.log(result);
      if (response.status === 200) {
        setSuccess(true);
      } else {
        setError(result.message || 'Error sending payment request');
      }
    } catch (error) {
      setError(error.message || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return {
    sendPaymentRequest,
    loading,
    error,
    success,
  };
};

export default usePaymentRequest;
