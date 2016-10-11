import {createStore, compose, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { alias, wrapStore } from 'react-chrome-redux';



// const aliases = {
//   // this key is the name of the action to proxy, the value is the action
//   // creator that gets executed when the proxied action is received in the
//   // background
//   'user-clicked-alias': () => {
//     // this call can only be made in the background script
//     chrome.notifications.create(...);

//   };
// };
const logger = createLogger({
    level: 'info',
    collapsed: true
});


const middleware = [  thunk, logger];


const store  = compose(
    applyMiddleware(...middleware)
)(createStore)(rootReducer);


wrapStore(store, {
  portName: 'example'
});


