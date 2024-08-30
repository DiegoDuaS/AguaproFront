const validateToken = async (token) => {
  try {
    const response = await fetch('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,  // Include 'Bearer ' before the token
      },
      body: JSON.stringify({}), // Sending an empty body if not required
    });

    // Check if the response is JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      return data.status === 'success'; // Check the status field
    } else {
      // Handle unexpected response
      const textResponse = await response.text();
      console.error('Response is not JSON:', textResponse);
      return false;
    }
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
};
export default validateToken;
