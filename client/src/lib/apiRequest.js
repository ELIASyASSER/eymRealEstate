import axios from "axios"
const SERVER_URL = import.meta.env.VITE_SERVER_URL

const apiRequest = axios.create({
    baseURL:`${SERVER_URL}/api`,
    withCredentials:true

})

export default apiRequest