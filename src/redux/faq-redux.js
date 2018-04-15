import { createReducer, createActions   } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
    getFAQ: null,
    getFAQSuccess: ['faqs'],
    getFAQError: ['error']
  }, {});
  
export const FAQActionTypes = Types;
export default Creators; 
// the initial state of this reducer
export const INITIAL_STATE =  Immutable({ loading: false, faqs: [] })

export const getFAQSuccess = (state = INITIAL_STATE, { faqs }) => {
    console.log('faqa', faqs)
  return { ...state, loading: false, faqs }
}

export const getFAQ = (state = INITIAL_STATE, action) => {
    return { ...state, loading: true }
}

console.log('FAQActionTypes', FAQActionTypes)
// map our action types to our reducer functions
export const HANDLERS = {
  [FAQActionTypes.GET_F_A_Q_SUCCESS]: getFAQSuccess,
  [FAQActionTypes.GET_F_A_Q]: getFAQ,
  
}

export const reducer = createReducer(INITIAL_STATE, HANDLERS)