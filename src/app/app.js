import React from 'react';
// import {render} from 'react-dom';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import PromisedThunk from 'redux-promised-thunk';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './Main'; // Our custom react component
import ReduxPromise from 'redux-promise'
import reducers from './reducers';

//---- Investigate share store between reducers ----
const _reducer = combineReducers(reducers);
const actionPromises = [];
const _createStoreWithMiddleware = applyMiddleware(
    PromisedThunk((promisedAction, action, store) => {
            actionPromises.push(promisedAction);
        }
    )(createStore));
const _store = _createStoreWithMiddleware(_reducer);
//---- Investigate share store between reducers ----

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const store = createStoreWithMiddleware(reducers);

// console.log('store vs _store'),
// console.log('store', store,);
// console.log('_store', _store);

const rootElementId = document.getElementById('app').getAttribute('data-id');

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
// render(<Main />, document.getElementById('app'));


ReactDOM.render(
    <Provider store={store}>
        <Main rootElementId={rootElementId} />
    </Provider>
    , document.getElementById('app'));