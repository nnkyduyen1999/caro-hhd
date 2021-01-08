import axios from 'axios'

axios.defaults.baseURL = `${process.env.REACT_APP_API_ENDPOINT}/user`

export const apiGetOnlineUsers = () => {
    return axios.get('/online')
}

