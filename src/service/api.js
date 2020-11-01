import axios from 'axios';

//https://cors-anywhere.herokuapp.com/ para deploy en heroku
//const server = 'https://cors-anywhere.herokuapp.com/http://ec2-3-131-160-45.us-east-2.compute.amazonaws.com';
// const server = 'http://ec2-3-131-160-45.us-east-2.compute.amazonaws.com'
// const server = 'http://127.0.0.1:8000'
const server = 'https://back.galaestampas.ar'

const API = {
    get: path => axios.get(`${server}${path}`).then(response => response.data),
    put: (path, body) => axios.put(`${server}${path}`, body).then(response => response.data),
    post: (path, body) => axios.post(`${server}${path}`, body).then(response => response.data),
    delete: path => axios.delete(`${server}${path}`).then(response => response.data),
};

axios.interceptors.request.use(
    (config) => {
        let token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = 'Token ' + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default API;