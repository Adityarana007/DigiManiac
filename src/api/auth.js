import { GET_CATEGORIES, GET_PROFILE, LOGIN, REGISTER, UPDATE_PASSWORD, VERIFY_EMAIL } from "./apiUrls";
import apiClient from "./client";

export const register = async (params) => {
    return await apiClient.post(REGISTER, params)
};

export const login = async (params) => {
    return await apiClient.post(LOGIN, params)
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