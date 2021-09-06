import {
  CREATE_LOKER,
  RETRIEVE_LOKER,
  UPDATE_LOKER,
  DELETE_LOKER,
  LOADING_LOKER
} from '../types/lokerTypes'

const initialState = {
  loker : [],
  loading: false
}


const lokerReducer = (state = initialState, action) => {
  const {type, payload} = action
  
  switch(type) {
    
    case CREATE_LOKER:
      return{
        ...state,
        loker: [...state.loker, payload],
        loading: false
      }
    
    case RETRIEVE_LOKER: 
      return {
        ...state,
        loker: payload,
        loading: false
      }

    case UPDATE_LOKER:
      return {
        ...state,
        loker: state.loker.map(data => {
          if(data.id === payload.id){
            return {...data, ...payload}
          } else {
            return data
          }
        }),
        loading: false
      }
    
    case DELETE_LOKER:
      return {
        ...state,
        loker: state.loker.filter(item => item.id !== payload.id)
      }
    
    case LOADING_LOKER:
      return {
        ...state,
        loading: true
      }

    default:
      return state
  
  }
}

export default lokerReducer
