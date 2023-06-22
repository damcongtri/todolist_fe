import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://todolist-chi-two.vercel.app",
});

export default axiosClient;