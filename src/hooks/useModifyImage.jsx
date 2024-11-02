import { useState } from 'react';

const useModifyImage = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const modifyImage = async (itemId, file) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const formData = new FormData();
      console.log(file);
      formData.append('file', file);

      const response = await fetch(`${url}/images/replace/${itemId}.PNG`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setSuccessMessage(result.fileId);
        return { success: true, fileId: result.fileId };
      } else {
        setErrorMessage(`Error with the Image`);
        return { success: false};
      }
    } catch (error) {
      console.error('Error with the image:', error);
      setErrorMessage('Error connecting to the server.');
    } finally {
      setIsLoading(false);
    }
  };

  return { modifyImage, isLoading, errorMessage, successMessage };
};

export default useModifyImage;
