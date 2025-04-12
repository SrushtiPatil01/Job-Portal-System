export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_USER_TYPE = 'SET_USER_TYPE';

export const loginUser = (userCredentials) => {
  return {
    type: LOGIN_USER,
    payload: userCredentials,
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const setUserType = (userType) => {
  return {
    type: SET_USER_TYPE,
    payload: userType,
  };
};
