import {
  CREATE_ALUMNI,
  CREATE_BATCH_ALUMNI,
  RETRIEVE_ALUMNI,
  UPDATE_ALUMNI,
  DELETE_ALUMNI,
  LOADING_ALUMNI
} from '../types/alumniTypes'
import axios from 'axios'

export const retrieveAlumni = () => dispatch => {
  dispatch(setLoadingAlumni())
  axios
    .get('/api/alumni')
    .then(res =>
      dispatch({
        type: RETRIEVE_ALUMNI,
        payload: res.data
      })
    )
}

export const createAlumni = (data) => dispatch => {
  dispatch(setLoadingAlumni())
  axios
    .post('/api/alumni', data)
    .then(res =>
      dispatch({
        type: CREATE_ALUMNI,
        payload: res.data
      })
    )
}


export const setLoadingAlumni = () => {
  return {
    type: LOADING_ALUMNI
  }
}