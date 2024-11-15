import { useState } from 'react';

const useUpdateUserEmail = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Update the user email
  const updateUserEmail = async (userId, newEmail) => {
    //console.log('Current userData:', userData);
    //console.log('New email to set:', newEmail);
    

    try {
      setLoading(true); // Start loading before making the request

      // Fetch user data if not already fetched
      const response = await fetch(`https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/user/${userId}`);
      const data = await response.json();

      if (data.status === 'success') {
        setUserData(data.data[0]); // Store fetched user data
        //console.log('Fetched user data:', data.data[0]);
        // Now update the email after fetching the user data
        const updateResponse = await fetch(`https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/user/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: data.data[0].username, // Use fetched username
            email: newEmail,
          }),
        });

        const updateData = await updateResponse.json();

        if (updateData.status === 'success') {
          setSuccess(true);
        } else {
          throw new Error(updateData.message || 'Failed to update user email');
        }
      } else {
        throw new Error('User not found');
      }
    } catch (err) {
      setError('Failed to fetch or update user data');
    } finally {
      setLoading(false); // Stop loading when done
    }
  };

  // Return states and update function
  return { userData, loading, error, success, updateUserEmail };
};

export default useUpdateUserEmail;

