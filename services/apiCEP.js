import axios from 'axios'

const apiCEP = axios.create({
    //http://localhost:3333
    baseURL: "https://viacep.com.br/ws/"
})

export default apiCEP