import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT

export const apiGetAllRooms = () => {
  return axios.get("/room");
};

export const apiGetRoomById = (id) => {
  return axios.get(`/room/${id}`);
};
