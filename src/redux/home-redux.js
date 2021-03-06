import { createReducer, createActions   } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
    submit: ['text','password','expires', 'oneTime', 'ipAddresses', 'clientMode'],
    submitSuccess: ['id','expires'],
    submitError: ['error'],
    getTicketInfo:['ticketId'],
    getTicketInfoSuccess:['ticket'],
    getTicketInfoError:['error'],
    decryptTicket : ['ticket', 'password'],
    decryptTicketSuccess:['ticket'],
    decryptTicketError:['error'],
    reset: null,
    deleteTicket: ['ticket', 'password'],
    deleteTicketSuccess: ['ticket'],
    deleteTicketError: ['error'],
    onSync: ['stats'],
    startSync: null,
    detectIp: null,
    detectIpSuccess: ['ip'],
    detectIpError: ['status']
  }, {});
  
export const HomeActionTypes = Types;
export default Creators; 
// the initial state of this reducer
export const INITIAL_STATE =  Immutable({ stats:{}, ticket:null, error: null, errorMessage: null, sending: false, deleted : false, deleting: false })

export const submitSuccess = (state = INITIAL_STATE, {id, expires}) => {
  return { ...state, sending: false, error: null, id, expires }
}

export const getTicketInfo = (state = INITIAL_STATE, {ticketId}) => {
  return { ...state, error: null, sending: true, id:ticketId}
}
export const submit = (state = INITIAL_STATE, action) => {
  return { ...state, error: null, sending: true, id:null}
}
export const submitError = (state = INITIAL_STATE, {error}) => {
  return { ...state, sending: false, error }
}

export const getTicketInfoSuccess = (state = INITIAL_STATE, {ticket}) => {
  return { ...state, sending: false, error: null, ticket, id: ticket.id }
}
export const detectIpSuccess = (state = INITIAL_STATE, {ip}) => {
  console.log('detectIpSuccess', ip)
  return { ...state, ip }
}

export const getTicketInfoError = (state = INITIAL_STATE, {error}) => {
  return { ...state, sending: false, error, ticket: null}
}
export const decryptTicketRequest = (state = INITIAL_STATE, {ticketId, password}) => {
  return { ...state, sending: true, error: null}
}
export const decryptTicketError = (state = INITIAL_STATE, {error}) => {
  return { ...state, sending: false, error: 'Could not decrypt the message, Please check if you provide correct password'}
}
export const decryptTicketSuccess = (state = INITIAL_STATE, {ticket}) => {
  return { ...state, sending: false, error:null, ticket, id: ticket.id, decrypted: true }
}

export const reset = (state = INITIAL_STATE, action) => {
  return { ...state, sending: false, error: null, id: null, ticket: null , decrypted: false, deleting: false, deleted: false}
}
export const deleteTicket = (state = INITIAL_STATE, action) => {
  return { ...state, deleting: true, error: null,}
}

export const deleteTicketSuccess = (state = INITIAL_STATE, {ticket}) => {
  return { ...state, deleting: false, error: null, deleted: true}
}

export const onSync = (state = INITIAL_STATE, {stats}) => {
  return { ...state, stats}
}
export const detectIpError = (state = INITIAL_STATE, {status}) => {
  console.log('status', status)
  return { ...state, status}
}
// map our action types to our reducer functions
export const HANDLERS = {
  [HomeActionTypes.SUBMIT_SUCCESS]: submitSuccess,
  [HomeActionTypes.SUBMIT]: submit,
  [HomeActionTypes.SUBMIT_ERROR]: submitError,
  [HomeActionTypes.GET_TICKET_INFO]: getTicketInfo,
  [HomeActionTypes.GET_TICKET_INFO_SUCCESS]: getTicketInfoSuccess,
  [HomeActionTypes.GET_TICKET_INFO_ERROR]: getTicketInfoError,
  [HomeActionTypes.DECRYPT_TICKET]: decryptTicketRequest,
  [HomeActionTypes.DECRYPT_TICKET_ERROR]: decryptTicketError,
  [HomeActionTypes.DECRYPT_TICKET_SUCCESS]: decryptTicketSuccess,
  [HomeActionTypes.RESET]: reset,
  [HomeActionTypes.DELETE_TICKET]: deleteTicket,
  [HomeActionTypes.DELETE_TICKET_SUCCESS]: deleteTicketSuccess,
  [HomeActionTypes.ON_SYNC]: onSync,
  [HomeActionTypes.DETECT_IP_SUCCESS]: detectIpSuccess,
}

export const reducer = createReducer(INITIAL_STATE, HANDLERS)