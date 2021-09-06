import {
  CREATE_KUESIONER,
  RETRIEVE_KUESIONER,
  UPDATE_KUESIONER,
  DELETE_KUESIONER,
  LOADING_KUESIONER
} from '../types/kuesionerTypes'

const initialState = {
  kuesioner : [],
  loading: false
}


const kuesionerReducer = (state = initialState, action) => {
  const {type, payload} = action
  
  switch(type) {
    
    case CREATE_KUESIONER:
      return{
        ...state,
        kuesioner: [...state.kuesioner, ...payload],
        loading: false
      }
    
    case RETRIEVE_KUESIONER: 
      return {
        ...state,
        kuesioner: payload,
        loading: false
      }

    case UPDATE_KUESIONER:
      return {
        ...state,
        kuesioner: state.kuesioner.map(data => {
          if(data.id === payload.id){
            return {...data, ...payload}
          } else {
            return data
          }
        }),
        loading: false
      }
    
    case DELETE_KUESIONER:
      return {
        ...state,
        kuesioner: state.kuesioner.filter(item => item.id !== payload.id)
      }

    case LOADING_KUESIONER:
      return {
        ...state,
        loading: true
      }

    default:
      return state
  
  }
}

export default kuesionerReducer

