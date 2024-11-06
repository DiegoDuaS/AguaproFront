import { useState } from "react";

export const useUpdateClient = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const updateClient = async (id, clientData) => {
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      const response = await fetch(`https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/clientes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clientData),
      });

      if (!response.ok) {
        throw new Error("Failed to update client.");
      }

      const result = await response.json();
      if (result.status === "success") {
        setSuccess(result.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { updateClient, loading, success, error };
};
