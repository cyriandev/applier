import {
  AUTH_ERROR,
  AUTH_LOADING,
  SET_USER,
  USER_LOADING,
  REGISTER,
  LOGIN,
  LOGOUT,
  RESET_PASSWORD,
  SET_PERSONAL_INFORMATION,
} from '../types'

export default (state, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        loading: true,
      }

    case USER_LOADING:
      return {
        ...state,
        userLoading: true,
      }

    case SET_USER:
      return {
        ...state,
        user: action.payload,
        userLoading: false,
        loading: false,
      }

    case AUTH_ERROR:
      return {
        ...state,
        userLoading: false,
        loading: false,
      }

    case REGISTER:
    case LOGIN:
      return {
        ...state,
        // loading: false,
      }
    case LOGOUT:
      return {
        ...state,
        user: null,
        loading: false,
      }
    case SET_PERSONAL_INFORMATION:
      return {
        ...state,
        personalInformation: action.payload,
        loading: false,
      }
    case RESET_PASSWORD:
      return {
        ...state,
        loading: false,
      }

    default:
      return state
  }
}
