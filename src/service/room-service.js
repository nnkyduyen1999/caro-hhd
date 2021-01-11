import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT

export const apiGetAllRooms = () => {
  return axios.get("/room");
};

export const apiGetRoomById = (id) => {
  return axios.get(`/room/${id}`);
};

export const apiLoadRoomWithPlayerInfoById = (id) => {
  return axios.get(`/room/with-player-info/${id}`);
};

export const apiLoadLatestGameInRoomById = (id) => {
  return axios.get(`/room/${id}/latest-game`);
};
