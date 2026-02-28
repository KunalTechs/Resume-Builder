import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    }
});

console.log("API Base URL:", import.meta.env.VITE_API_URL); 

export default api;