import React from 'react';
// import {render} from 'react-dom';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './Main'; // Our custom react component
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
// render(<Main />, document.getElementById('app'));


ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <Main />
    </Provider>
    , document.getElementById('app'));