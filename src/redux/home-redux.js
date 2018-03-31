import { createReducer, createActions   } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
    submit: ['body','password','expires'],
    submitSuccess: ['body','expiresIn'],
    submitError: ['error'],
  }, {});
  
export const HomeActionTypes = Types;
export default Creators; 
// the initial state of this reducer
export const INITIAL_STATE =  Immutable({ error: false, errorMessage: null, sending: false })

export const submitSuccess = (state = INITIAL_STATE, {messageId, type, remainingCount}) => {
  return { ...state, sending: false, error: false, messageId , remainingCount}
}

export const sendingRequest = (state = INITIAL_STATE, {keyword, domains, schedules}) => {
  
  return { ...state, error: false, sending: true, errorMessage: null, messageId:null }
}

export const submitError = (state = INITIAL_STATE, {error}) => {
  return { ...state, sending: false, error }
}
// map our action types to our reducer functions
export const HANDLERS = {
  [HomeActionTypes.SUBMIT_SUCCESS]: submitSuccess,
  [HomeActionTypes.SUBMIT_ERROR]: submitError,
  [HomeActionTypes.SUBMIT]: sendingRequest
}

export const reducer = createReducer(INITIAL_STATE, HANDLERS)