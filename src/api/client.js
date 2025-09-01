import { create } from "apisauce";
import { BASE_URL, LOCAL_URL } from "./apiUrls";
import { getItem, StorageKeys } from "../utils/storage";




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

// For Debugging
apiClient.addMonitor(response => {
    console.log('API Response:', response);
  });

export default apiClient;