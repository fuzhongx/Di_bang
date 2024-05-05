import axios from "axios";

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const serve = axios.create({
    baseURL: 'http://smart.yinuoerp.com:9103',
    timeout: 9000
})
serve.interceptors.request.use((config) => {
    if (localStorage.getItem('token')) {
        config.headers['auth'] = localStorage.getItem('token');
        config.headers['timestamp'] = Date.parse(new Date())
    }
    return config;
}),
    (error) => {
        return Promise.reject(error);
    },
    serve.interceptors.response.use((response) => {
        return response;
    }),
    (error) => {
        return Promise.reject(error);
    }

export default serve