import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Correct import for named export
import Cookies from 'js-cookie';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'DOCTOR';
}
interface GoogleUser {
  email: string;
  name: string;
  sub: string;
}


interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Rehydrate user on page reload
  useEffect(() => {
    const token = Cookies.get('authToken');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);

        // Check if the token is expired
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        if (decodedToken.exp && decodedToken.exp < currentTime) {
          console.warn('Token has expired');
          logout();
          return;
        }

        // Rehydrate user state
        const user: User = {
          id: decodedToken.sub || decodedToken.userId,
          name: decodedToken.name || decodedToken.aud,
          email: decodedToken.email,
          role: decodedToken.role,
        };
        setUser(user);

        // Set token in axios headers
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        navigate(user.role === 'DOCTOR' ? '/admin/dashboard' : '/dashboard');
      } catch (error) {
        console.error('Token decoding error:', error);
        logout();
      }
    }
  }, []);

  // Login function
  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:8080/api/authenticate/login', { username, password });

      const token = response.data.data; // Adjust if token is nested
      console.log('Token:', token);

      const decodedToken: any = jwtDecode(token);
      console.log('Decoded Token:', decodedToken);

      const user: User = {
        id: decodedToken.sub || decodedToken.userId,
        name: decodedToken.name || decodedToken.aud,
        email: decodedToken.email,
        role: decodedToken.role,
      };

      // Save token in cookies and axios headers
      Cookies.set('authToken', token, { expires: 7 }); // Token expires in 7 days
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      console.log('User:', user);
      setUser(user);

      // Navigate to appropriate dashboard
      navigate(user.role === 'DOCTOR' ? '/admin/dashboard' : '/dashboard');
    } catch (error) {
      console.error('Login Error:', error);
      alert('Invalid credentials');
    }
  };
  const loginWithGoogle = (googleUser: GoogleUser) => {
    const newUser: User = {
      id: googleUser.sub,
      name: googleUser.name,
      email: googleUser.email,
      role: 'user',
    
    };
    
    setUser(newUser);
    navigate('/dashboard');
  };

  // Logout function
  const logout = () => {
    setUser(null);
    Cookies.remove('authToken');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
