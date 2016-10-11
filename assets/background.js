/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	import { createStore, compose, applyMiddleware } from 'redux';
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

	const middleware = [thunk, logger];

	const store = compose(applyMiddleware(...middleware))(createStore)(rootReducer);

	wrapStore(store, {
	    portName: 'setgov'
	});

/***/ }
/******/ ]);