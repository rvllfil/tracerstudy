import axios from 'axios'
import { returnErrors, clearErrors } from './errorActions'
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from '../types/authTypes'

// Login Admin
export const login = ({email, password}, history) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  // Request body
  const body = JSON.stringify({
    email,
    password
  })
  axios.post('/api/auth/admin', body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
      dispatch(clearErrors())
      history.push('/admin')
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
      dispatch({
        type: LOGIN_FAIL
      })
    })
}

// Check Token and Load User
export const loadAdmin = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING })

  axios.get('/api/auth/admin', tokenConfig(getState))
    .then(res => dispatch({
      type: USER_LOADED,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status))
      dispatch({
        type: AUTH_ERROR
      })
    })
}

// // Register User
// export const register = ({username, nama, jenis_kelamin, email, password}, history) => dispatch => {
//   const role = 'user'
//   // Headers
//   const config = {
//     headers: {
//       "Content-Type": "application/json"
//     }
//   }
//   // Request body
//   const body = JSON.stringify({
//     username,
//     nama,
//     jenis_kelamin,
//     email,
//     password,
//     role
//   })
//   axios.post('/api/users', body, config)
//     .then(res => {
//       dispatch(clearErrors())
//       dispatch({
//         type: REGISTER_SUCCESS,
//       })
//       history.push('/login')
//     })
//     .catch(err => {
//       dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
//       dispatch({
//         type: REGISTER_FAIL
//       })
//     })
// }



export const logout = (history) => dispatch => {
  dispatch({
    type: LOGOUT_SUCCESS
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