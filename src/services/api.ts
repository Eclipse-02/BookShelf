import axios from 'axios';

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL  || 'https://openlibrary.org';

export const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (!error.response) {
            return Promise.reject({
                message: 'Network error. Please check your connection.',
            });
        }

        return Promise.reject({
            message: error.response.data?.message || 'Something went wrong',
            status: error.response.status,
        });
    }
);