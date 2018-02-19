import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { alias, wrapStore } from 'react-chrome-redux';

const logger = createLogger({
    level: 'info',
    collapsed: true
});

const middleware = [thunk, logger];

const store = compose(
    applyMiddleware(...middleware)
)(createStore)(rootReducer);

wrapStore(store, {
    portName: 'example'
});

chrome.tabs.onActivated.addListener(function(tabId, changeInfo, tab) {
    chrome.tabs.executeScript(null, { file: 'content.js' });
});