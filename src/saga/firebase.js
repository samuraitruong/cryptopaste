import firebase from 'firebase'
import ReduxSagaFirebase from 'redux-saga-firebase'
import { takeEvery, fork } from 'redux-saga/effects'
import HomeActions, { HomeActionTypes } from '../redux/home-redux'
const myFirebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAn7qI8Zd-9W2lO__L4mHBeXHnCt_-2qvw",
    authDomain: "cryptobin-e87cc.firebaseapp.com",
    databaseURL: "https://cryptobin-e87cc.firebaseio.com",
    projectId: "cryptobin-e87cc",
    storageBucket: "cryptobin-e87cc.appspot.com",
    messagingSenderId: "902738227839"
  });
  
  const reduxSagaFirebase = new ReduxSagaFirebase(myFirebaseApp)

  function* syncSaga() {
    yield fork(
      reduxSagaFirebase.database.sync,
      '/',
      { successActionCreator: function (data) {
          console.log('firebase data', data)
          return HomeActions.onSync(data )
      } }
    );
  }

  export default function * rootSaga () {
    yield [
      takeEvery(HomeActionTypes.START_SYNC, syncSaga)
    ]
  
  }
  
  
