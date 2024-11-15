import { useState, useEffect } from 'react';

const useUserData = (userId) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      // Obtener el token de localStorage
      const token = localStorage.getItem('token');

      try {
        const response = await fetch(`https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/user/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : '', // Incluir el token si existe
          }
        });
        
        const data = await response.json();  // Parse the response as JSON
        if (data.status === 'success') {
          setUserData(data.data[0]);  // Set the entire user data from the response
        } else {
          setError('Failed to retrieve user data');
        }
      } catch (err) {
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  return { userData, loading, error };
};

export default useUserData;
