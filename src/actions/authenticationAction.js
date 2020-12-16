import axios from "axios";

export const LOGIN_SUCCESS = `LOGIN_SUCCESS`;
export const LOGIN_FAILURE = `LOGIN_FAILURE`;
axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;

const login = (dispatch) => (username, password) => {
    axios
        .post(`/login`, {
            username: username,
            password: password,
        })
        .then((res) => {
            if (res.status === 200) {
                dispatch({type: LOGIN_SUCCESS, data: res.data});
            } else {
                dispatch({type: LOGIN_FAILURE, data: res.data});
            }
        })
        .catch((err) => {
            dispatch({type: LOGIN_FAILURE, data: err.message});
        });
};
const loginGoogle = (dispatch) => (email, googleId, givenName, familyName) => {
    axios
        .post(`/login-google`, {
            email,
            googleId,
            givenName,
            familyName
        })
        .then((res) => {
            if (res.status === 200) {
                dispatch({type: LOGIN_SUCCESS, data: res.data});
            } else {
                dispatch({type: LOGIN_FAILURE, data: res.data});
            }
        })
        .catch((err) => {
            dispatch({type: LOGIN_FAILURE, data: err.message});
        });
}
const loginFacebook = (dispatch) => (email, facebookId, givenName, familyName) => {
    axios
        .post(`/login-facebook`, {
            email,
            facebookId,
            givenName,
            familyName
        })
        .then((res) => {
            if (res.status === 200) {
                dispatch({type: LOGIN_SUCCESS, data: res.data});
            } else {
                dispatch({type: LOGIN_FAILURE, data: res.data});
            }
        })
        .catch((err) => {
            dispatch({type: LOGIN_FAILURE, data: err.message});
        });
}

export {login, loginGoogle, loginFacebook};


