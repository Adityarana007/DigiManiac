import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import BootSplash from 'react-native-bootsplash';
import {AuthProvider} from './src/context/AuthContext';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NetworkDebugger from './src/utils/NetworkDebugger';
import { setNavigationRef } from './src/utils/navigationService';

const App = () => {
  useEffect(() => {
    setTimeout(async () => {
      await BootSplash.hide({fade: true});
    }, 3000);
  }, []);
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer ref={setNavigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Root" component={RootNavigator} />
      </Stack.Navigator>
      {__DEV__ && <NetworkDebugger />}

    </NavigationContainer>
  );
};

export default App;
