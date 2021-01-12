import axios from "axios";

axios.defaults.baseURL = `${process.env.REACT_APP_API_ENDPOINT}`;

export const apiGetAllRooms = () => {
  return axios.get("/room", {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
  });
};

export const apiGetRoomById = (id) => {
  return axios.get(`/room/${id}`, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
  });
};

export const apiLoadRoomWithPlayerInfoById = (id) => {
  return axios.get(`/room/with-player-info/${id}`, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
  });
};

export const apiLoadLatestGameInRoomById = (id) => {
  return axios.get(`/room/${id}/latest-game`, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
  });
};
