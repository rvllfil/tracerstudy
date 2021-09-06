import {
  ALUMNI_UPDATE,
  ALUMNI_LOADED,
  ALUMNI_LOADING,
  ALUMNI_AUTH_ERROR,
  ALUMNI_LOGIN_SUCCESS,
  ALUMNI_LOGIN_FAIL,
  ALUMNI_LOGOUT_SUCCESS,
} from '../types/alumniAuthTypes'

const initialState = {
  token: localStorage.getItem('token'),
  isAlumni: null,
  isLoading: false,
  user: null
}

const alumniAuthReducer = (state = initialState, action) => {
  switch(action.type) {
    case ALUMNI_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case ALUMNI_UPDATE:
      return {
        ...state,
        user: action.payload
      }
    case ALUMNI_LOADED:
      return {
        ...state,
        isAlumni: true,
        isLoading: false,
        user: action.payload
      }
    case ALUMNI_LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        ...action.payload,
        isAlumni: true,
        isLoading: false,
      }
    case ALUMNI_AUTH_ERROR:
    case ALUMNI_LOGIN_FAIL:
    case ALUMNI_LOGOUT_SUCCESS:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAlumni: false,
        isLoading: false,
        user: null
      }
    default:
      return state

  }
}

export default alumniAuthReducer