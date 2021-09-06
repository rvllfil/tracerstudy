import axios from 'axios'
import {
  ALUMNI_UPDATE,
  ALUMNI_LOADED,
  ALUMNI_LOADING,
  ALUMNI_AUTH_ERROR,
  ALUMNI_LOGIN_SUCCESS,
  ALUMNI_LOGIN_FAIL,
  ALUMNI_LOGOUT_SUCCESS,
} from '../types/alumniAuthTypes'
import { returnErrors, clearErrors } from './errorActions'


// Login Alumni
export const login = ({nisn, tanggal_lahir}, history) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  // Request body
  const body = JSON.stringify({
    nisn,
    tanggal_lahir
  })
  axios.post('/api/auth/alumni', body, config)
    .then(res => {
      dispatch({
        type: ALUMNI_LOGIN_SUCCESS,
        payload: res.data
      })
      dispatch(clearErrors())
      history.push('/tracer-study')
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
      dispatch({
        type: ALUMNI_LOGIN_FAIL
      })
    })
}

// Check Token and Load User
export const loadAlumni = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: ALUMNI_LOADING })

  axios.get('/api/auth/alumni', tokenConfig(getState))
    .then(res => dispatch({
      type: ALUMNI_LOADED,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status))
      dispatch({
        type: ALUMNI_AUTH_ERROR
      })
    })
}

export const alumniUpdate = ({
  email, no_hp, alamat
}, id) => dispatch => {
  axios
    .put(`/api/alumni/${id}`, {email, no_hp, alamat})
    .then(res =>
      dispatch({
        type: ALUMNI_UPDATE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
}

export const logout = (history) => dispatch => {
  dispatch({
    type: ALUMNI_LOGOUT_SUCCESS
  })
  history.push('/login')
}

// Setup config/headers and token
export const tokenConfig = getState => {
   // GET token from localStorage
   const token = getState().auth.token

   // Headers
   const config = {
     headers: {
       "Content-Type": "application/json"
     }
   }
 
   // If token, add to headers
   if(token) {
     config.headers['x-auth-token'] = token
   }

   return config
}
