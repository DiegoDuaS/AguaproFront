import { useState } from "react";

const useRegisterUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const registerUser = async (userData) => {
    setLoading(true);
    setError(null); // Reset error on new request
    try {
      const res = await fetch("https://aguapro-back.vercel.app/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Failed to register user.");
      }

      setResponse(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, response, error, loading };
};

export default useRegisterUser;
