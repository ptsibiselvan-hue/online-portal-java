import * as constants from '../constants/authConstants';

const getStoredUser = () => {
  try {
    const user = localStorage.getItem('user');
    return user && user !== "undefined" ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Invalid user data in localStorage:", error);
    return null;
  }
};

const initialState = {
  loading: false,
  user: getStoredUser(),
  error: null,
  isAuthenticated: !!localStorage.getItem('token'),
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case constants.AUTH_LOGIN_REQUEST:
    case constants.AUTH_REGISTER_REQUEST:
    case constants.AUTH_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case constants.AUTH_LOGIN_SUCCESS:
    case constants.AUTH_REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        isAuthenticated: true,
        error: null,
      };

    case constants.AUTH_PROFILE_SUCCESS:
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
      };

    case constants.AUTH_LOGIN_FAIL:
    case constants.AUTH_REGISTER_FAIL:
    case constants.AUTH_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case constants.AUTH_LOGOUT:
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: null,
      };

    default:
      return state;
  }
}
