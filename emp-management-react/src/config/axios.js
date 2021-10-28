//Axios configuration
import axios from 'axios'
export const HTTP=axios.create({
    headers:{"Accept":"*/*",'Content-Type': 'application/json'},
    baseURL:"http://localhost:4000"
})