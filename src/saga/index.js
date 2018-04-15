import {fork } from 'redux-saga/effects'
import HomeSaga from './home'
import FirebaseSaga from './firebase'
import FAQSaga from './faq'
export default function* root() {
    yield [
        fork(HomeSaga),
        fork(FirebaseSaga),
        fork(FAQSaga)
    ];
}