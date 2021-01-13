import axios from "axios";

axios.defaults.baseURL = `${process.env.REACT_APP_API_ENDPOINT}`;

export const apiGetGameHistoryDetail = (id) => {
  return axios.get(`/game/${id}/with-board-history`, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
  });
};