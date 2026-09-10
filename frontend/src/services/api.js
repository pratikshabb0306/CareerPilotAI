import axios from "axios";

const api = axios.create({
   baseURL: "https://backend-hqm3bdpma-pratikshabhong0306-8153s-projects.vercel.app/api"
});

api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("token");

        console.log("TOKEN:", token);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

export default api;