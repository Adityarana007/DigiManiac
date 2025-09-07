import { create } from "apisauce";
import { BASE_URL, LOCAL_URL } from "./apiUrls";
import { getItem, StorageKeys } from "../utils/storage";

// Global session handler - will be set by SessionProvider
let globalSessionHandler = null;
let isInitialValidation = false;

export const setGlobalSessionHandler = (handler) => {
  globalSessionHandler = handler;
};

export const setInitialValidation = (value) => {
  isInitialValidation = value;
};




const apiClient = create({
    // baseURL: BASE_URL,
    baseURL: LOCAL_URL,
    headers: {
        Accept: 'application/json'
    },
    timeout: 10000,
});

// Attach token before every request
apiClient.addAsyncRequestTransform(async (request) => {
    const token = await getItem(StorageKeys.TOKEN);
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
  });

// Handle token expiration and clear session expired flag on successful requests
apiClient.addResponseTransform(async response => {
    if (response.status === 401) {
      console.log('Token expired - showing session expired modal');
      // Only show modal if it's not during initial validation
      if (globalSessionHandler && !isInitialValidation) {
        globalSessionHandler();
      }
    } else if (response.status >= 200 && response.status < 300) {
      // Clear session expired flag on successful requests
      try {
        const AsyncStorage = require('@react-native-async-storage/async-storage').default;
        await AsyncStorage.removeItem('SESSION_EXPIRED');
      } catch (error) {
        console.error('Error clearing session expired flag:', error);
      }
    }
  });

// For Debugging
apiClient.addMonitor(response => {
    console.log('API Response:', response);
  });

export default apiClient;