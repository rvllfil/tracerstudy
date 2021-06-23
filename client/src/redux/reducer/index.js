import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import alumniReducer from './alumniReducer'
import alertReducer from './alertReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  error: errorReducer,
  alumni: alumniReducer,
  alert: alertReducer
})

export default rootReducer