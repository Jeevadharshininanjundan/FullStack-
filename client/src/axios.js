import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true ,// This allows cookies to be sent with requests
});

export default instance;