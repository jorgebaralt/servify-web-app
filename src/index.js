import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Store
import reducers from './store/reducers'

// Firebase & Public Keys
import * as firebase from 'firebase/app';
import { FIREBASE_KEY } from './shared/publicKeys';

// react router dom
import { BrowserRouter } from 'react-router-dom';

// redux sagas
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import * as sagas from './store/sagas/';

// firebase
const init = () => {
    firebase.initializeApp({
        apiKey: FIREBASE_KEY,
        authDomain: 'servify-716c6.firebaseapp.com',
        databaseURL: 'https://servify-716c6.firebaseio.com',
        projectId: 'servify-716c6',
        storageBucket: 'servify-716c6.appspot.com',
        messagingSenderId: '737506787644'
    });
}

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : null ;

const store = createStore(reducers, composeEnhancers ? composeEnhancers(applyMiddleware(sagaMiddleware)) : applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas.watchMobile);
sagaMiddleware.run(sagas.watchServices);
sagaMiddleware.run(sagas.watchAuth);

ReactDOM.render(<Provider store={store}><BrowserRouter><App onInit={init} /></BrowserRouter></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
