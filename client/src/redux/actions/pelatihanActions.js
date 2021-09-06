import {
  CREATE_PELATIHAN,
  RETRIEVE_PELATIHAN,
  UPDATE_PELATIHAN,
  DELETE_PELATIHAN,
  LOADING_PELATIHAN
} from '../types/pelatihanTypes'
import axios from 'axios'
import { setAlertFailed, setAlertSuccess } from './alertActions'

export const retrievePelatihan = () => dispatch => {
  dispatch(setLoadingPelatihan())
  axios
    .get('/api/pelatihan')
    .then(res =>
      dispatch({
        type: RETRIEVE_PELATIHAN,
        payload: res.data
      })
    )
}

export const createPelatihan = (data) => dispatch => {
  dispatch(setLoadingPelatihan())
  axios
    .post('/api/pelatihan', data)
    .then(res =>
      dispatch({
        type: CREATE_PELATIHAN,
        payload: res.data
      }),
      dispatch(setAlertSuccess('Data berhasil ditambahkan'))
    )
    .catch(err =>
      dispatch(setAlertFailed(`${err.response.data}: ${err.response.data}`))
    );
}

export const updatePelatihan = ({
  id, judul, isi, jurusan, gambar
}) => dispatch => {
  dispatch(setLoadingPelatihan())
  axios
    .put(`/api/pelatihan/${id}`, {judul, isi, jurusan, gambar})
    .then(res =>
      dispatch({
        type: UPDATE_PELATIHAN,
        payload: res.data[0]
      }),
      dispatch(setAlertSuccess('Data berhasil diubah'))
    )
    .catch(err =>
      dispatch(setAlertFailed(`${err.response.status}: ${err.response.data.msg}`))
    );
}

export const deletePelatihan = (id) => dispatch => {
  axios
    .delete(`/api/pelatihan/${id}`)
    .then(res =>
      // console.log(res.data[0])
      dispatch({
        type: DELETE_PELATIHAN,
        payload: res.data[0]
      }),
      dispatch(setAlertSuccess('Berhasil menghapus data'))
    )
    .catch(err =>
      dispatch(setAlertFailed(`${err.response.status}: ${err.response.data.msg}`))
    );
}

export const setLoadingPelatihan = () => {
  return {
    type: LOADING_PELATIHAN
  }
}