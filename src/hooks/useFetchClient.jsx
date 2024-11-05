import { useState, useEffect } from "react";

export const useFetchClient = (userReference) => {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClient = async () => {
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
    if (userReference) {
      fetchClient();
    }
  }, [userReference]);

  return { client, loading, error };
};
