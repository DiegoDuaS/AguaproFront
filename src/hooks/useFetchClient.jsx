import { useState, useEffect } from "react";

export const useFetchClient = (userReference) => {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch client data
  const fetchClient = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/clientes/user/${userReference}`);
      if (!response.ok) {
        throw new Error("Failed to fetch client data.");
      }
      const data = await response.json();
      setClient(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch client data on initial render or when userReference changes
  useEffect(() => {
    if (userReference) {
      fetchClient();
    }
  }, [userReference]);

  // Return the client data, loading state, and error state along with the refetch function
  return { client, loading, error, refetch: fetchClient };
};


