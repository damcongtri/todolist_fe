import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:5678",
});

export default axiosClient;