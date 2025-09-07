import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import SessionExpiredModal from '../components/common/SessionExpiredModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthStackParamList } from '../navigation/types';
import { setGlobalSessionHandler } from '../api/client';
import { StorageKeys } from '../utils/storage';
import { AppState } from 'react-native';
import { navigateToLogin } from '../utils/navigationService';

interface SessionContextType {
  showSessionExpiredModal: () => void;
  hideSessionExpiredModal: () => void;
}

interface SessionProviderProps {
  children: ReactNode;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<SessionProviderProps> = ({ 
  children 
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Set the global session handler when component mounts
    setGlobalSessionHandler(showSessionExpiredModal);
    
    // Check for expired session on app startup
    checkSessionOnStartup();
    
    // Listen for app state changes
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === 'active' && isInitialized) {
        // Check session when app becomes active again
        checkSessionOnStartup();
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    
    return () => {
      subscription?.remove();
    };
  }, [isInitialized]);

  const checkSessionOnStartup = async () => {
    try {
      const token = await AsyncStorage.getItem(StorageKeys.TOKEN);
      const sessionExpired = await AsyncStorage.getItem('SESSION_EXPIRED');
      
      // If there's a token but session was marked as expired, show modal
      if (token && sessionExpired === 'true') {
        console.log('Session was expired on app startup - showing modal');
        // Add a small delay to ensure the app is fully loaded
        setTimeout(() => {
          showSessionExpiredModal();
        }, 1000);
      }
      
      setIsInitialized(true);
    } catch (error) {
      console.error('Error checking session on startup:', error);
      setIsInitialized(true);
    }
  };

  const showSessionExpiredModal = async () => {
    setIsModalVisible(true);
    // Mark session as expired in storage
    try {
      await AsyncStorage.setItem('SESSION_EXPIRED', 'true');
    } catch (error) {
      console.error('Error marking session as expired:', error);
    }
  };

  const hideSessionExpiredModal = () => {
    setIsModalVisible(false);
  };

  const handleLogout = async () => {
    try {
      // Clear all stored data including session expired flag
      await AsyncStorage.clear();
      
      // Hide modal
      setIsModalVisible(false);
      
      // Navigate to login screen using navigation service
      navigateToLogin();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <SessionContext.Provider
      value={{
        showSessionExpiredModal,
        hideSessionExpiredModal,
      }}>
      {children}
      <SessionExpiredModal
        visible={isModalVisible}
        onLogout={handleLogout}
      />
    </SessionContext.Provider>
  );
};

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
