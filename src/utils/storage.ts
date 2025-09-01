import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageKeys = {
  TOKEN: 'token',
  USER: 'user',
};

// Set data
export const setItem = async (key: string, value: any): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    console.log('jsonValue',jsonValue)
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.log(`AsyncStorage setItem error for key "${key}":`, error);
  }
};

// Get data
export const getItem = async <T = any>(key: string): Promise<T | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.log(`AsyncStorage getItem error for key "${key}":`, error);
    return null;
  }
};

// Remove data
export const removeItem = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(`AsyncStorage removeItem error for key "${key}":`, error);
  }
};

// Clear all AsyncStorage (use with caution)
export const clearStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log('AsyncStorage clear error:', error);
  }
};
