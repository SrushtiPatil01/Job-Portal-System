import { LOGIN_USER, LOGOUT_USER, SET_USER_TYPE } from '../actions/userActions';

const initialState = {
  userData: null,
  isAuthenticated: false,
  userType: null, 
};

// User reducer function
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        userData: action.payload,
        isAuthenticated: true,
      };

    case LOGOUT_USER:
      return {
        ...state,
        userData: null,
        isAuthenticated: false,
        userType: null,
      };

    case SET_USER_TYPE:
      return {
        ...state,
        userType: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
