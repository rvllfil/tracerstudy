import {
  CREATE_ALUMNI,
  CREATE_BATCH_ALUMNI,
  RETRIEVE_ALUMNI,
  UPDATE_ALUMNI,
  DELETE_ALUMNI,
  LOADING_ALUMNI
} from '../types/alumniTypes'
import axios from 'axios'
import { setAlertFailed, setAlertSuccess } from './alertActions'

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
      }),
      dispatch(setAlertSuccess('Data berhasil ditambahkan'))
    )
    .catch(err =>
      dispatch(setAlertFailed(`${err.response.data}: ${err.response.data}`))
    );
}

export const createBatchAlumni = (data) => dispatch => {
  dispatch(setLoadingAlumni())
  console.log(data)
  axios
    .post('/api/alumni', data)
    .then(res =>
      dispatch({
        type: CREATE_BATCH_ALUMNI,
        payload: res.data
      }),
      dispatch(setAlertSuccess('Data berhasil ditambahkan'))
    )
    .catch(err =>
      dispatch(setAlertFailed(`${err.response.status}: ${err.response.data.msg}`))
    );
}

export const setLoadingAlumni = () => {
  return {
    type: LOADING_ALUMNI
  }
}