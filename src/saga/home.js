import { call, put, takeEvery,all } from 'redux-saga/effects'
import {push} from 'react-router-redux'
import HomeActions, {HomeActionTypes} from '../redux/home-redux'
import Api from '../services/api'
import { ErrorMessages } from '../shared/error-messages'
function* submitRequestSaga({text, password, expires, oneTime}) {
   try {
      const response = yield call(Api.submitRequest, {text, expires, password, oneTime});
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
  try {
     const response = yield call(Api.getTicketInfo, ticketId);
     const { data } = response;
     if(response.ok) {
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
function* decryptTicketSaga({id, password}) {
  try {
     const response = yield call(Api.decrypTicket, {id, password});
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
function* deleteTicketSaga({id, password}) {
  try {
     const response = yield call(Api.deleteTicket, {id, password});
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

function* homeSaga() {
  yield all([
    takeEvery(HomeActionTypes.SUBMIT, submitRequestSaga),
    takeEvery(HomeActionTypes.GET_TICKET_INFO, getTicketInfoSaga),
    takeEvery(HomeActionTypes.DECRYPT_TICKET, decryptTicketSaga),
    takeEvery(HomeActionTypes.DELETE_TICKET, deleteTicketSaga),
  ])
}

export default homeSaga;