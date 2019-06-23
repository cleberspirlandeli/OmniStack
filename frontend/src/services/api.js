import axios from 'axios';

const token = localStorage.getItem("x-token") || null;

const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL_API,
    headers: { 'authorization': token }
});

export default api;