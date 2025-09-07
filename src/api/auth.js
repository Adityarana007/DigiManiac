import { GET_CATEGORIES, GET_PROFILE, LOGIN, REGISTER, UPDATE_PASSWORD, VERIFY_EMAIL, UPDATE_PROFILE, CLOCK_IN, CLOCK_OUT, TIME_STATUS, TIME_ENTRIES } from "./apiUrls";
import apiClient from "./client";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const register = async (params) => {
    return await apiClient.post(REGISTER, params)
};

export const login = async (params) => {
    const response = await apiClient.post(LOGIN, params);
    
    // Clear session expired flag on successful login
    if (response.status === 200) {
        try {
            await AsyncStorage.removeItem('SESSION_EXPIRED');
        } catch (error) {
            console.error('Error clearing session expired flag on login:', error);
        }
    }
    
    return response;
}

export const verifyEmail = async (params) => {
    return await apiClient.post(VERIFY_EMAIL, params)
}
export const updatePassword = async (params) => {
    return await apiClient.post(UPDATE_PASSWORD, params)
}

export const getCategories = async (params) => {
    return await apiClient.get(GET_CATEGORIES)
}

export const getProfile = async (params) => {
    return await apiClient.get(GET_PROFILE)
}

export const updateProfile = async (params) => {
    return await apiClient.put(UPDATE_PROFILE, params)
}

export const clockIn = async (params) => {
    return await apiClient.post(CLOCK_IN, params)
}

export const clockOut = async (params) => {
    return await apiClient.post(CLOCK_OUT, params)
}

export const getTimeStatus = async () => {
    return await apiClient.get(TIME_STATUS)
}

export const getTimeEntries = async (params = {}) => {
    return await apiClient.get(TIME_ENTRIES, params)
}