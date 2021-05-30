import axios from 'axios'

const api = axios.create({
    //http://localhost:3333
    baseURL: "https://teste-telecom.herokuapp.com"
})

export default api