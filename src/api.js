import axios from "axios";

const api = axios.create({
    baseURL: "https://dedeletricistasbackend-production.up.railway.app/api"
})

export default api;