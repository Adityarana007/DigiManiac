import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigator from './AuthNavigator'
import AppNavigator from './AppNavigator';
import { getItem, StorageKeys } from '../utils/storage';
import Loader from '../components/common/Loader';

const RootNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await getItem<string>(StorageKeys.TOKEN);
      setIsAuthenticated(!!token);
    };

    checkToken();
  }, []);
  console.log('isAuthenticated', isAuthenticated)
  if (isAuthenticated === null) return <Loader visible={true} />;


  return (
    isAuthenticated ? <AppNavigator /> : <AuthNavigator />
  );
}

export default RootNavigator
