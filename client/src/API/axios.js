import axios from 'axios'

const api = axios.create({
    baseURL:'https://gate-pass-backend-ucbn.onrender.com/api'
})

//ADD AUTHORIZATION TOKEN AUTOMATICALLY :
api.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token')

    if(token){
        config.headers.Authorization =`Bearer ${token}`
    }
    return config
})

export default api