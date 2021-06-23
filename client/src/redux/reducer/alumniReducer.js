import {
  CREATE_ALUMNI,
  CREATE_BATCH_ALUMNI,
  RETRIEVE_ALUMNI,
  UPDATE_ALUMNI,
  DELETE_ALUMNI,
  LOADING_ALUMNI
} from '../types/alumniTypes'

const initialState = {
  alumni : [],
  loading: false
}


const alumniReducer = (state = initialState, action) => {
  const {type, payload} = action
  
  switch(type) {
    
    case CREATE_ALUMNI:
    case CREATE_BATCH_ALUMNI:
      return{
        ...state,
        alumni: [...state.alumni, ...payload],
        loading: false
      }
    
    case RETRIEVE_ALUMNI: 
      return {
        ...state,
        alumni: payload,
        loading: false
      }

    case UPDATE_ALUMNI:
      return {
        ...state,
        alumni: state.alumni.map(data => {
          if(data.id === payload.id){
            return {...data, ...payload}
          } else {
            return data
          }
        })
      }
    
    case DELETE_ALUMNI:
      return {
        ...state,
        alumni: state.alumni.filter(item => item.id !== payload)
      }
    
    case LOADING_ALUMNI:
      return {
        ...state,
        loading: true
      }

    default:
      return state
  
  }
}

export default alumniReducer

