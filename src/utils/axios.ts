import axios from "axios"

const base_url = import.meta.env.VITE_BASE_URL;

const axiosFetch = axios.create({
    baseURL: base_url
});

axiosFetch.interceptors.request.use(
    async function (config) {
        const token = localStorage.getItem('Authorization');

        if (token) {
            config.headers.Authorization = `${token}`;
        }

        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

axiosFetch.interceptors.response.use(
    function (response) {
        if (response.config.url?.includes("/login") || response.config.url?.includes("/register")) {
            // console.log("Authorization:", response.headers.authorization)
            localStorage.setItem("Authorization", response.headers.authorization)
        }
        return response;
    },
    function (error) {
        console.error("Axios response error:", error.response ?? error);
        return Promise.reject(error);
    }
);

export default axiosFetch