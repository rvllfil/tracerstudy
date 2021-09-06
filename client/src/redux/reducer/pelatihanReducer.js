import {
  CREATE_PELATIHAN,
  RETRIEVE_PELATIHAN,
  UPDATE_PELATIHAN,
  DELETE_PELATIHAN,
  LOADING_PELATIHAN
} from '../types/pelatihanTypes'

const initialState = {
  pelatihan : [],
  loading: false
}


const pelatihanReducer = (state = initialState, action) => {
  const {type, payload} = action
  
  switch(type) {
    
    case CREATE_PELATIHAN:
      return{
        ...state,
        pelatihan: [...state.pelatihan, ...payload],
        loading: false
      }
    
    case RETRIEVE_PELATIHAN: 
      return {
        ...state,
        pelatihan: payload,
        loading: false
      }

    case UPDATE_PELATIHAN:
      return {
        ...state,
        pelatihan: state.pelatihan.map(data => {
          if(data.id === payload.id){
            return {...data, ...payload}
          } else {
            return data
          }
        }),
        loading: false
      }
    
    case DELETE_PELATIHAN:
      return {
        ...state,
        pelatihan: state.pelatihan.filter(item => item.id !== payload.id)
      }
    
    case LOADING_PELATIHAN:
      return {
        ...state,
        loading: true
      }

    default:
      return state
  
  }
}

export default pelatihanReducer
