import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Driver' | 'Admin' | 'ParkingManager';
}

interface GoogleUser {
  email: string;
  name: string;
  sub: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  error: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
    const token = Cookies.get('authToken');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp && decodedToken.exp < currentTime) {
          console.warn('Token has expired');
          logout();
          return;
        }

        const user: User = {
          id: decodedToken.sub || decodedToken.userId,
          name: decodedToken.name || decodedToken.aud,
          email: decodedToken.email,
          role: decodedToken.role,
        };
        setUser(user);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (error) {
        console.error('Token decoding error:', error);
        logout();
      }
    }
    setIsLoading(false);
  };

  initializeAuth();
}, []);


  const login = async (email: string, password: string) => {
    try {
      setError('');
      console.log('Logging in...');
      const response = await axios.post('http://localhost:8080/api/authenticate/login', { email, password });

      const token = response.data.data;
      const decodedToken: any = jwtDecode(token);

      const user: User = {
        id: decodedToken.sub || decodedToken.userId,
        name: decodedToken.name || decodedToken.aud,
        email: decodedToken.email,
        role: decodedToken.role,
      };

      Cookies.set('authToken', token, { expires: 7 });
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      switch (user.role) {
        case 'Admin':
          navigate('/admin/dashboard');
          break;
        case 'ParkingManager':
          navigate('/manager/dashboard');
          break;
        default:
          navigate('/dashboard');
      }

    } catch (error: any) {
      console.error('Login Error:', error);
      if (error.response?.status === 404) {
        setError('Email not found');
      } else if (error.response?.status === 401) {
        setError('password is incorrect');

      }else if (error.response?.status === 400) {
        setError('Account is not activated');
      } 
      else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  const loginWithGoogle = (googleUser: GoogleUser) => {
    const newUser: User = {
      id: googleUser.sub,
      name: googleUser.name,
      email: googleUser.email,
      role: 'Driver',
    };
    
    setUser(newUser);
    navigate('/dashboard');
  };

  const logout = () => {
    setUser(null);
    setError('');
    Cookies.remove('authToken');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      logout,
      error 
    }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}