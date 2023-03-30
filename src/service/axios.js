import axios from "axios";

console.log(process.env.API_URL)
const instance = axios.create({
    baseURL: "https://demo-mppi.onrender.com/api"
});
instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
});
export default instance;

