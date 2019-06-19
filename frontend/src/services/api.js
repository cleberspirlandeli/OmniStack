import axios from 'axios';

// const token = localStorage.getItem("x-token") || null;

// const getToken = async () => {
//     let createApi;
//     if (token) {
//         return createApi = await axios.create({
//             baseURL: process.env.REACT_APP_BASE_URL_API,
//             headers: {'authenticated': token}
//         });
//     } else {
//         return createApi = await axios.create({
//             baseURL: process.env.REACT_APP_BASE_URL_API
//         });
//     }
// }

// const api = getToken(); 

const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL_API
});

export default api;