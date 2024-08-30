import { useState, useEffect } from 'react';

export const useApi = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const responseData = await fetchPosts();
                setData(responseData.data);
            } catch (error) {
                setError('Error de comunicación con el API. Por favor, inténtalo de nuevo más tarde.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const userLogin = async (login, username, password) => {
        setLoading(true);
        const body = JSON.stringify({ username, password })
        console.log(body)

        try {
            const response = await fetch(`https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body
            
            });
    
            const responseData = await response.json();
    
            if (response.status === 200) {
                localStorage.setItem('token', responseData.token);
                login(responseData.token, {
                    username: responseData.username,
                    role: responseData.role,
                    id: responseData.id,
                });
                return response;
            } else {
                const errorMsg = 'El usuario o contraseña están incorrectos';
                setError(errorMsg);
                throw new Error(errorMsg); 
            }
        } catch (error) {
            console.error(error);
            throw new Error(error); 
        } finally {
            setLoading(false);
        }
    };
    



    return { userLogin };
};