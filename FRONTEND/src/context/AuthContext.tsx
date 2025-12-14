import React, { createContext, useContext, useState, useCallback } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, phone: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // Mock login - in real app, this would call an API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email && password) {
      setUser({
        id: '1',
        name: 'John Doe',
        email: email,
        phone: '+91 98765 43210',
        isAdmin: false,
      });
      return true;
    }
    return false;
  }, []);

  const adminLogin = useCallback(async (email: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'admin@zovo.com' && password === 'admin123') {
      setUser({
        id: 'admin',
        name: 'Admin',
        email: email,
        phone: '',
        isAdmin: true,
      });
      return true;
    }
    return false;
  }, []);

  const signup = useCallback(async (
    name: string,
    email: string,
    phone: string,
    password: string
  ): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (name && email && phone && password) {
      setUser({
        id: '1',
        name,
        email,
        phone,
        isAdmin: false,
      });
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isAdmin: user?.isAdmin || false,
      login,
      adminLogin,
      signup,
      logout,
    }}>
      {children}
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
