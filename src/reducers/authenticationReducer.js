import {LOGIN_SUCCESS, LOGIN_FAILURE} from "../actions/authenticationAction";

export const authenReducer = (prevState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...prevState,
        isAuthenticated: true,
        token: action.data.token,
        userInfo: action.data.userInfo,
        errMsg: null
      };
    case LOGIN_FAILURE:
      return { ...prevState, isAuthenticated: false, errMsg: action.data.errMsg };
    default:
      return new Error();
  }
};

