import { useState } from 'react';

const useVerificationCode = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const emailVerification = async (email) => {
    setLoading(true);
    setError(null);
    setResponse(null); // Reseteamos la respuesta anterior
  
    const body = JSON.stringify({ email });
  
    try {
      const res = await fetch(
        `https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/passwordrecovery`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: body,
        }
      );
  
      if (!res.ok) {
        throw new Error('Error al enviar la solicitud'); // Lanzamos error si el status no es 200
      }
  
      const data = await res.json();
  
      if (data.status === 'success') {
        setResponse(data); // Guardamos la respuesta en el estado
        return { status: 'success', message: data.message }; // Devolvemos éxito explícitamente
      } else if (data.status === 'failed') {
        setError(data.error || 'Ocurrió un error desconocido.'); // Guardamos error en estado
        return { status: 'failed', error: data.error || 'Error desconocido' }; // Devolvemos fallo explícitamente
      } else {
        throw new Error('Respuesta inesperada del servidor.'); // Manejo de estado inesperado
      }
    } catch (err) {
      setError(err.message);
      return { status: 'failed', error: err.message }; // Devolvemos error explícitamente
    } finally {
      setLoading(false);
    }
  };
  

  return { emailVerification, loading, error, response};
};

export default useVerificationCode;
