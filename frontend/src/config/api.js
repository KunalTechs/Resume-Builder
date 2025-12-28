import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

console.log("API Base URL:", import.meta.env.VITE_BASE_URL); // Check if this is correct

export default api;