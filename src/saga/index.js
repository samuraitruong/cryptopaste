import {fork } from 'redux-saga/effects'
import HomeSaga from './home'
import FirebaseSaga from './firebase'
export default function* root() {
    yield [
        fork(HomeSaga),
        fork(FirebaseSaga),
    ];
}