import { call, put, takeEvery,all } from 'redux-saga/effects'
import {push} from 'react-router-redux'
import HomeActions, {HomeActionTypes} from '../redux/home-redux'
import Api from '../services/api'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* submitRequestSaga({domain, keywords, schedules, redirect}) {
   try {
      const response = yield call(Api.submit, {domain, keywords, schedules});
//      console.log(response);
      const {messageId, remainingQuota} = response.data.payload;
      
      if(response.ok) {
        yield put(HomeActions.rankCheckSuccess(messageId, remainingQuota))
      }
      else {
        yield put(HomeActions.rankCheckError(response.status, remainingQuota));
     }

   } catch (err) {
      console.log(err);
      yield put(HomeActions.rankCheckError());
   }
}

function* homeSaga() {
  yield all([
    takeEvery(HomeActionTypes.SUBMIT, submitRequestSaga),
  ])
}

export default homeSaga;