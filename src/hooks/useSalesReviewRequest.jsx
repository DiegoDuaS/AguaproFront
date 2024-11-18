import { useState } from 'react';

const useSalesReviewRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const sendSalesReviewRequest = async (PayInfo, file) => {
    setLoading(true);
    setError(null);
    //console.log(PayInfo);
    try {
      const formData = new FormData();

      // Append payment fields
      Object.keys(PayInfo).forEach((key) => {
      if (key === 'mailTo') {
        // Check if 'mailTo' is a string
        let emails = [];
        if (typeof PayInfo[key] === 'string') {
          // If it's a string, split it by commas
          emails = PayInfo[key].split(',').map(email => email.trim());
        } else if (Array.isArray(PayInfo[key])) {
          // If it's already an array, use it directly
          emails = PayInfo[key];
        }

        // Append each email as a separate form field
        emails.forEach(email => {
          formData.append('mailTo[]', email); // 'mailTo[]' is the expected key format
        });
      } else {
        formData.append(key, PayInfo[key]);
      }
    });

      // Append file if provided
      if (file) {
      // Check if the file has a .png extension and if not, rename it
        //console.log("File type:", file.type);
        //console.log("File name:", file.name);
        const fileName = file.name.endsWith('.png') ? file.name : file.name + '.png';
        formData.append('file', file, fileName); // Append with correct file name (as .png)
      }
      //console.log(file.name);
      const response = await fetch('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/pedidos/revision', {
        method: 'POST',
        body: formData,
      });
      //console.log(response);
      const result = await response.json();
      //console.log(result);
      if (result.status === 'success') {
        setSuccess(true);
      } else {
        setError(result.message || 'Error sending sales review request');
      }
    } catch (error) {
      setError(error.message || 'Network error');
      console.log(error);
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
