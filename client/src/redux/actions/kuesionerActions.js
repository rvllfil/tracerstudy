import axios from 'axios';
import {
  CREATE_KUESIONER,
  RETRIEVE_KUESIONER,
  UPDATE_KUESIONER,
  DELETE_KUESIONER,
  LOADING_KUESIONER
} from '../types/kuesionerTypes'
import { setAlertFailed, setAlertSuccess } from './alertActions';

export const createKuesioner = (data) => dispatch => {
  console.log(data)
  axios
    .post('/api/kuesioner', data)
    .then(res =>
      dispatch({
        type: CREATE_KUESIONER,
        payload: res.data
      }),
      dispatch(setAlertSuccess('Data berhasil ditambahkan'))
    )
    .catch(err =>
      dispatch(setAlertFailed(`${err.response.data}: ${err.response.data}`))
    );
}