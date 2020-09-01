import axios from 'axios';

//const server = 'https://algo-backend.herokuapp.com'; url de ejemplo
// const server = 'http://localhost:8080';

const API = {
    get: path => axios.get(`${server}${path}`).then(response => response.data),
    put: (path, body) => axios.put(`${server}${path}`, body).then(response => response.data),
    post: (path, body) => axios.post(`${server}${path}`, body).then(response => response.data),
};

axios.interceptors.request.use(
    (config) => {
        let token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default API;