import { GET_USERS, USERS_LOADING } from './usersTypes'

const initialState = {
  users : [],
  loading: false
}


const usersReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_USERS: 
      return {
        ...state,
        users: action.payload,
        loading: false
    }
    case USERS_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}

export default usersReducer


