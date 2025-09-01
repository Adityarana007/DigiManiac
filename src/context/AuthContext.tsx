import React, { createContext, useContext, useEffect, useState } from 'react';
import { getItem, removeItem, setItem, StorageKeys } from '../utils/storage';

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const restoreToken = async () => {
    const token = await getItem<string>(StorageKeys.TOKEN);
    setIsAuthenticated(!!token);
    setLoading(false);
  };

  useEffect(() => {
    restoreToken();
  }, []);

  const signIn = async (token: string) => {
    await setItem(StorageKeys.TOKEN, token);
    setIsAuthenticated(true);
  };

  const signOut = async () => {
    await removeItem(StorageKeys.TOKEN);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
