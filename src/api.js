import axios from "axios";

const api = axios.create({
    //baseURL: "http://localhost:8080/api"
    baseURL: "https://dedeletricistasbackend-production.up.railway.app/api/"
})

export default api;