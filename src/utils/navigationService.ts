import { NavigationContainerRef } from '@react-navigation/native';
import { AuthStackParamList } from '../navigation/types';

let navigationRef: NavigationContainerRef<AuthStackParamList> | null = null;

export const setNavigationRef = (ref: NavigationContainerRef<AuthStackParamList> | null) => {
  navigationRef = ref;
};

export const navigateToLogin = () => {
  if (navigationRef) {
    navigationRef.reset({
      index: 0,
      routes: [{ name: 'Root' as keyof AuthStackParamList }],
    });
  }
};
