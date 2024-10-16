import { useState, useEffect } from 'react';

const useUserRole = (userId) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch(`https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/user/${userId}`);
        const data = await response.json();  // Parse the response as JSON
        if (data.status === 'success') {
          setRole(data.data[0].role);  // Access the role from the response
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

