import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import alumniReducer from './alumniReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  error: errorReducer,
  alumni: alumniReducer
})

export default rootReducer