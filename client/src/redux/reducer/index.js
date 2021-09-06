import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import alumniReducer from './alumniReducer'
import alertReducer from './alertReducer'
import alumniAuthReducer from './alumniAuthReducer'
import pelatihanReducer from './pelatihanReducer'
import lokerReducer from './lokerReducer'


const rootReducer = combineReducers({
  auth: authReducer,
  alumniAuth: alumniAuthReducer,
  error: errorReducer,
  alumni: alumniReducer,
  alert: alertReducer,
  loker: lokerReducer,
  pelatihan: pelatihanReducer,
})

export default rootReducer