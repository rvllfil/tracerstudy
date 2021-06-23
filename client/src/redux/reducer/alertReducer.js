import { SET_ALERT_SUCCESS, SET_ALERT_FAILED, LOADING_ALERT, CLEAR_ALERT } from '../types/alertTypes'

const initialState = {
  alert : 0,
  msg: '',
  loading: false
}


const alertReducer = (state = initialState, action) => {
  const {type, payload} = action
  
  switch(type) {
    
    case SET_ALERT_SUCCESS:
    case SET_ALERT_FAILED:   
      return {
        ...state,
        alert: payload.alert,
        msg: payload.msg,
        loading: false
      }
    
    case CLEAR_ALERT:
      return {
        ...state,
        alert: 0,
        msg: '',
      }

    case LOADING_ALERT:
      return {
        ...state,
        loading: true
      }

    default:
      return state
  
  }
}

export default alertReducer

