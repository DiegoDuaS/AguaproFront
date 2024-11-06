import { useState } from 'react';

const useUploadImage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    const uploadImage = async (productId, file) => {
        setLoading(true);
        setError(null);

        // Create FormData and append the file
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch(`https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/images/upload/${productId}`, {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                throw new Error(`Failed to upload image: ${res.statusText}`);
            }

            const data = await res.json();
            setResponse(data);
            return data;
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { uploadImage, loading, error, response };
};

export default useUploadImage;
