import axios from 'axios'

const api = axios.create({
    baseURL: "https://teste-01-back.herokuapp.com"
})

export default api