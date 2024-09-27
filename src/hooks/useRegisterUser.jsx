import { useState } from 'react';

const useRegisterUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const registerUser = async (userData) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch('https://aguapro-back.vercel.app/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Registration failed.');

            setLoading(false);
            return { data }; // Return the data object
        } catch (err) {
            setLoading(false);
            setError(err.message);
            return { error: err.message };
        }
    };

    return { registerUser, loading, error };
};

export default useRegisterUser;

