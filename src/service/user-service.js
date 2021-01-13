import axios from "axios";

axios.defaults.baseURL = `${process.env.REACT_APP_API_ENDPOINT}`;

export const apiGetOnlineUsers = () => {
  return axios.get("/user/online", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const apiGetTopPlayers = () => {
  return axios.get(`/user/top-players`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const apiGetUserById = (id) => {
  return axios.get(`/user/profile/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const apiGetFinishedGamesById = (id) => {
  return axios.get(`/user/finished-game/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
