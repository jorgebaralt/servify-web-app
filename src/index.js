import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// react router dom
import { BrowserRouter } from 'react-router-dom';

// sagas
import mobileReducer from './store/reducers/mobile';
import * as sagas from './store/sagas/';

const rootReducer = combineReducers({
    mobileReducer: mobileReducer
});

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(sagas.watchMobile);

ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
