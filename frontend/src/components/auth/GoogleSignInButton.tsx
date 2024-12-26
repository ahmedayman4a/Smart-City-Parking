import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';

export default function GoogleSignInButton() {
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        // Log the response for debugging
        console.log('Google Sign In response:', response);

        // Use the access_token from Google response
        const token = response.access_token;

        // Send token to the backend
        const backendResponse = await fetch('http://localhost:8080/api/authenticate/thirdParty/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }), // Send only the token
        });

        if (!backendResponse.ok) {
          throw new Error('Failed to authenticate with backend');
        }

        const result = await backendResponse.json();
        console.log('Backend response:', result);
      } catch (error) {
        console.error('Error during backend authentication:', error);
      }
    },
    onError: () => {
      console.error('Google Sign In was unsuccessful');
    },
  });

  return (
    <button
      onClick={() => login()}
      className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google logo"
        className="w-5 h-5 mr-2"
      />
      Continue with Google
    </button>
  );
}
