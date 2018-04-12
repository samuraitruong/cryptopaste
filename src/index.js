import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import HomeActions from './redux/home-redux'

import './index.scss';
import App from './App';
import store from './redux/store'
import registerServiceWorker from './registerServiceWorker';
store.dispatch(HomeActions.startSync())
store.dispatch(HomeActions.detectIp())

ReactDOM.render((<Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
</Provider>), document.getElementById('root'));
registerServiceWorker();
