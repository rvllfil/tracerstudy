import {
  CREATE_ALUMNI,
  CREATE_BATCH_ALUMNI,
  RETRIEVE_ALUMNI,
  UPDATE_ALUMNI,
  DELETE_ALUMNI,
  DELETE_ALL_ALUMNI,
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

export const updateAlumni = ({
  id, nisn, nama, jenis_kelamin, tempat_lahir, tanggal_lahir, jurusa, tahun_lulus
}) => dispatch => {
  dispatch(setLoadingAlumni())
  axios
    .put(`/api/alumni/${id}`, {nisn, nama, jenis_kelamin, tempat_lahir, tanggal_lahir, jurusa, tahun_lulus})
    .then(res =>
      dispatch({
        type: UPDATE_ALUMNI,
        payload: res.data[0]
      }),
      dispatch(setAlertSuccess('Data berhasil diubah'))
    )
    .catch(err =>
      dispatch(setAlertFailed(`${err.response.status}: ${err.response.data.msg}`))
    );
}

export const deleteAllAlumni = () => dispatch => {
  axios
    .delete('/api/alumni')
    .then(res =>
      dispatch({
        type: DELETE_ALL_ALUMNI
      }),
      dispatch(setAlertSuccess('Berhasil menghapus semua data'))
    )
    .catch(err =>
      dispatch(setAlertFailed(`${err.response.status}: ${err.response.data.msg}`))
    );
}

export const deleteAlumni = (id) => dispatch => {
  axios
    .delete(`/api/alumni/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_ALUMNI,
        payload: res.data[0]
      }),
      dispatch(setAlertSuccess('Berhasil menghapus data'))
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