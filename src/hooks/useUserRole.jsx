import { useState, useEffect } from 'react';

const useUserRole = (userId) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        // Obtenemos el token desde localStorage o alguna otra fuente
        const token = localStorage.getItem('token'); 

        const response = await fetch(`https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/user/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  // Header de autorización
            'Content-Type': 'application/json',  // Opcional, dependiendo de si se necesita
          }
        });

        const data = await response.json();
        if (data.status === 'success') {
          setRole(data.data[0].role); // Accede al rol desde la respuesta
        } else {
          setError('Failed to retrieve user role');
        }
      } catch (err) {
        setError('Failed to fetch user role');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserRole();
    }
  }, [userId]);

  return { role, loading, error };
};

export default useUserRole;
