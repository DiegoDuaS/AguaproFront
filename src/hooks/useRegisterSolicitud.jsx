import { useState } from 'react';

function useRegisterSolicitud() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    const registerSolicitud = async (solicitudData) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/solicitud', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(solicitudData),
            });

            const data = await res.json();
            if (res.ok) {
                setResponse(data);
            } else {
                throw new Error(data.message || 'Failed to submit request');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { registerSolicitud, loading, error, response };
}

export default useRegisterSolicitud;
