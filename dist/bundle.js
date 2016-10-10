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
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _glslify = __webpack_require__(1);

	var _glslify2 = _interopRequireDefault(_glslify);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var a = "sfergrefweweok"; // import gl3 from './glcubic.min.js'
	// const gl3 = require('./glcubic.min.js')

	console.log(a);

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = function(strings) {
	  if (typeof strings === 'string') strings = [strings]
	  var exprs = [].slice.call(arguments,1)
	  var parts = []
	  for (var i = 0; i < strings.length-1; i++) {
	    parts.push(strings[i], exprs[i] || '')
	  }
	  parts.push(strings[i])
	  return parts.join('')
	}


/***/ }
/******/ ]);