import { useState } from 'react';

const useCancelacion = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    const emailCancelacion = async (mailto, razon) => {
        setLoading(true);
        setError(null);
    
        const body1 = JSON.stringify({ mailto, razon });
    
        console.log(body1);
    
        try {
            const res = await fetch(`https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/cancelacion`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body1,
            });
    
            if (!res.ok) {
                throw new Error(`Error Enviando Correo`);
            }
    
            // Determinar si la respuesta es JSON o texto plano
            const contentType = res.headers.get("content-type");
            let data;
            
            if (contentType && contentType.includes("application/json")) {
                data = await res.json(); // Leer como JSON si el tipo de contenido es JSON
            } else {
                data = await res.text(); // Leer como texto si no es JSON
            }
    
            setResponse(data);
            console.log(data);
        } catch (err) {
            setError(err.message);
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return { emailCancelacion, loading, error, response };
};

export default useCancelacion;
