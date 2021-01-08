import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT

export const apiGetOnlineUsers = () => {
    return axios.get('/user/online')
}

