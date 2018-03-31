import {fork } from 'redux-saga/effects'
import HomeSaga from './home'

export default function* root() {
    yield [
        fork(HomeSaga),
    ];
}