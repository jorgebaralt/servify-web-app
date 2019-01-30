import axios from 'axios';

export const CancelToken = axios.CancelToken;

const instance = axios.create({
    baseURL: 'https://us-central1-servify-716c6.cloudfunctions.net/',
});

export default instance;