import { call, put, takeEvery,all } from 'redux-saga/effects'
import {push} from 'react-router-redux'
import HomeActions, {HomeActionTypes} from '../redux/home-redux'
import Api from '../services/api'
import { ErrorMessages } from '../shared/error-messages'
import encryption from '../services/encryption'

function* submitRequestSaga({text, password, expires, oneTime, ipAddresses, clientMode}) {
   try {
     let submitData =  {text, password, expires, oneTime, ipAddresses, clientMode}
     if(clientMode) {
        const encryptedData = encryption.encrypt(text, password)
        delete submitData.password
        submitData = {...submitData, ...encryptedData }
     }

      const response = yield call(Api.submitRequest, submitData);
      const { data } = response;
      
      if(response.ok) {
        yield put(HomeActions.submitSuccess(data.id, data.expires))
        yield put(push(`/${data.id}`))
      }
      else {
        yield put(HomeActions.submitError(response.status));
     }

   } catch (err) {
      console.log(err);
      yield put(HomeActions.submitError());
   }
}

function* getTicketInfoSaga({ticketId}) {
  console.log('getTicketInfoSaga', ticketId)
  try {
     const response = yield call(Api.getTicketInfo, ticketId);
     const { data } = response;
     if(response.ok) {
       if(data.s3) {
         const ticketContentResponse = yield call(Api.getS3Content, ticketId)
         if(ticketContentResponse.status === 200) {
          data.text = ticketContentResponse.data;
         }
         else{
           return put(HomeActions.getTicketInfoError(ErrorMessages[response.status]));
         }
       }
       yield put(HomeActions.getTicketInfoSuccess(data))
     }
     else {
       console.log('getTicketInfoError saga', response.status)
       yield put(HomeActions.getTicketInfoError(ErrorMessages[response.status]));
    }

  } catch (err) {
     console.log(err);
     yield put(HomeActions.getTicketInfoError());
  }
}
function* decryptTicketSaga({ticket, password}) {
  try {
     if(ticket.clientMode) {
        console.log('client decryption')
        ticket.text = encryption.decrypt(ticket.text, password, ticket.iv, ticket.tag)
      
        yield put(HomeActions.decryptTicketSuccess(ticket))
        return;
     }
     const response = yield call(Api.decrypTicket, {id: ticket.id, password});
     
     const { data } = response;
     if(response.ok) {
       yield put(HomeActions.decryptTicketSuccess(data))
     }
     else {
       yield put(HomeActions.decryptTicketError(response.status));
    }

  } catch (err) {
     console.log(err);
     yield put(HomeActions.decryptTicketError());
  }
}
function* deleteTicketSaga({ticket, password}) {
  try {
      console.log('delete ticket', ticket)
       if(ticket.clientMode) {
         password = null
       }

      const response = yield call(Api.deleteTicket, {id: ticket.id, password});
      const { data } = response;
      if(response.ok) {
        yield put(HomeActions.deleteTicketSuccess(data))
      }
      else {
        yield put(HomeActions.deleteTicketError(response.status));
      }

  } catch (err) {
     console.log(err);
     yield put(HomeActions.deleteTicketError());
  }
}

function* detectIPSaga() {
  try {
     const response = yield call(Api.detectIp);
     const { data } = response;
     if(response.status === 200) {
       yield put(HomeActions.detectIpSuccess(data.ip))
     }
     else {
       yield put(HomeActions.detectIpError());
    }

  } catch (err) {
     console.log(err);
     yield put(HomeActions.detectIpError());
  }
}


function* homeSaga() {
  yield all([
    takeEvery(HomeActionTypes.SUBMIT, submitRequestSaga),
    takeEvery(HomeActionTypes.GET_TICKET_INFO, getTicketInfoSaga),
    takeEvery(HomeActionTypes.DECRYPT_TICKET, decryptTicketSaga),
    takeEvery(HomeActionTypes.DELETE_TICKET, deleteTicketSaga),
    takeEvery(HomeActionTypes.DETECT_IP, detectIPSaga),
  ])
}

export default homeSaga;