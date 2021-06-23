import { SET_ALERT_SUCCESS, SET_ALERT_FAILED, CLEAR_ALERT, LOADING_ALERT } from '../types/alertTypes'

export const setAlertSuccess = (message) => dispatch => {
  dispatch(setLoadingAlert())
  dispatch({
    type: SET_ALERT_SUCCESS,
    payload: {alert: 1, msg: message}
  })
}

export const setAlertFailed = (message) => dispatch => {
  dispatch(setLoadingAlert())
  dispatch({
    type: SET_ALERT_FAILED,
    payload: {alert: 2, msg: message}
  })
}

export const clearAlert = () => dispatch => {
  dispatch({
    type: CLEAR_ALERT,
    payload: 0
  })
}

export const setLoadingAlert = () => {
  return {
    type: LOADING_ALERT
  }
}