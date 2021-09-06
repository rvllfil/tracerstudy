import {
  CREATE_LOKER,
  RETRIEVE_LOKER,
  UPDATE_LOKER,
  DELETE_LOKER,
  LOADING_LOKER
} from '../types/lokerTypes'
import axios from 'axios'
import { setAlertFailed, setAlertSuccess } from './alertActions'

export const retrieveLoker = () => dispatch => {
  dispatch(setLoadingLoker())
  axios
    .get('/api/loker')
    .then(res =>
      dispatch({
        type: RETRIEVE_LOKER,
        payload: res.data
      })
    )
}

export const createLoker = (data) => dispatch => {
  dispatch(setLoadingLoker())
  axios
    .post('/api/loker', data)
    .then(res =>
      dispatch({
        type: CREATE_LOKER,
        payload: res.data
      }),
      dispatch(setAlertSuccess('Data berhasil ditambahkan'))
    )
    .catch(err =>
      dispatch(setAlertFailed(`${err.response.data}: ${err.response.data}`))
    );
}

export const updateLoker = ({
  id, judul, isi, jurusan, gambar
}) => dispatch => {
  dispatch(setLoadingLoker())
  axios
    .put(`/api/loker/${id}`, {judul, isi, jurusan, gambar})
    .then(res =>
      dispatch({
        type: UPDATE_LOKER,
        payload: res.data[0]
      }),
      dispatch(setAlertSuccess('Data berhasil diubah'))
    )
    .catch(err =>
      dispatch(setAlertFailed(`${err.response.status}: ${err.response.data.msg}`))
    );
}

export const deleteLoker = (id) => dispatch => {
  axios
    .delete(`/api/loker/${id}`)
    .then(res =>
      // console.log(res.data[0])
      dispatch({
        type: DELETE_LOKER,
        payload: res.data[0]
      }),
      dispatch(setAlertSuccess('Berhasil menghapus data'))
    )
    .catch(err =>
      dispatch(setAlertFailed(`${err.response.status}: ${err.response.data.msg}`))
    );
}

export const setLoadingLoker = () => {
  return {
    type: LOADING_LOKER
  }
}