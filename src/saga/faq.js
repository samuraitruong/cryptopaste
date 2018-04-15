import { takeEvery, call, put } from 'redux-saga/effects'
import FAQActions, { FAQActionTypes } from '../redux/faq-redux'
import Api from '../services/api'

  function* getFAQSaga() {
    try {
        const response = yield call(Api.getFAQ);
        const { data } = response;
        console.log('saga response faq', data)
        if(response.ok) {
            console.log(' call get faq success')
            yield put(FAQActions.getFAQSuccess(data))
        }
        else {
          yield put(FAQActions.getFAQError('error'));
       }
   
     } catch (err) {
        console.error(err);
        yield put(FAQActions.getFAQError('error'));
     }
  }

  export default function * rootSaga () {
    yield [
      takeEvery(FAQActionTypes.GET_F_A_Q, getFAQSaga)
    ]
  
  }
  
  
