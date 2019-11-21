import axios from 'axios';

const api = axios.create({
    baseURL:"http://192.168.4.35:63600/api"
})

export default api;