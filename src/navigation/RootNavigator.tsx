import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigator from './AuthNavigator'
import AppNavigator from './AppNavigator';
import { getItem, StorageKeys } from '../utils/storage';
import Loader from '../components/common/Loader';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SessionProvider } from '../context/SessionContext';
import { getProfile } from '../api/auth';
import { setInitialValidation } from '../api/client';

const RootNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isSessionChecked, setIsSessionChecked] = useState(false);

  useEffect(() => {
    const validateSession = async () => {
      try {
        const token = await getItem<string>(StorageKeys.TOKEN);
        const sessionExpired = await getItem<string>('SESSION_EXPIRED');
        
        // If no token, user is not authenticated
        if (!token) {
          console.log('No token found - user not authenticated');
          setIsAuthenticated(false);
          setIsSessionChecked(true);
          return;
        }
        
        // If session was marked as expired, don't consider user as authenticated
        if (sessionExpired === 'true') {
          console.log('Session expired detected on app startup');
          setIsAuthenticated(false);
          setIsSessionChecked(true);
          return;
        }
        
        // If we have a token and no session expired flag, validate it with API
        console.log('Validating token with API call...');
        setInitialValidation(true); // Prevent automatic modal during validation
        
        try {
          // Add timeout to prevent hanging
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('API timeout')), 10000)
          );
          
          const apiPromise = getProfile();
          const response = await Promise.race([apiPromise, timeoutPromise]) as any;
          
          if (response.status === 200) {
            console.log('Token is valid - user authenticated');
            setIsAuthenticated(true);
          } else if (response.status === 401) {
            console.log('Token is invalid/expired - user not authenticated');
            setIsAuthenticated(false);
          } else {
            console.log('API error - assuming token is valid for now');
            setIsAuthenticated(true);
          }
        } catch (apiError) {
          console.log('API call failed or timed out - assuming token is valid for now');
          setIsAuthenticated(true);
        } finally {
          setInitialValidation(false); // Re-enable automatic modal
        }
        
        setIsSessionChecked(true);
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false);
        setIsSessionChecked(true);
      }
    };

    validateSession();
  }, []);
  
  console.log('isAuthenticated', isAuthenticated)
  if (!isSessionChecked) return <Loader visible={true} />;

  const handleLogout = () => {
    // Reset authentication state to show login screen
    setIsAuthenticated(false);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SessionProvider>
        {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
      </SessionProvider>
    </GestureHandlerRootView>
  );
}

export default RootNavigator
