import axios from "axios";

export const LOGIN_SUCCESS = `LOGIN_SUCCESS`;
export const LOGIN_FAILURE = `LOGIN_FAILURE`;

const login = (dispatch) => (username, password) => {
  axios
    .post(`http://localhost:3000/login`, {
      username: "adDien",
      password: "00000",
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: LOGIN_SUCCESS, data: res.data });
      } else {
        dispatch({ type: LOGIN_FAILURE });
      }
    })
    .catch((err) => {
      dispatch({ type: LOGIN_FAILURE });
    });
};

export {login};


