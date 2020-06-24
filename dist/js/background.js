/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/background.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/background.ts":
/*!***************************!*\
  !*** ./src/background.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = __webpack_require__(/*! ./helpers */ "./src/helpers.ts");
// Overriding Custom Window Object Since cannot am unable to extend the default window obj
let windowObj = window;
// Setting Popup dynamically
chrome.tabs.onActivated.addListener(function (activeInfo) {
    let urlRegex = new RegExp("https://leetcode.com/problems/*");
    const activeTabId = activeInfo.tabId;
    chrome.tabs.get(activeTabId, function (tab) {
        const currentUrl = tab.url;
        if (urlRegex.test(currentUrl)) {
            chrome.browserAction.setPopup({ popup: "popup.html" });
        }
        else {
            chrome.browserAction.setPopup({ popup: "invalid.html" });
        }
    });
});
// Persisting Data Stuffst
const problem = {};
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request) {
        if (request.action == "setProblem") {
            problem.problemName = request.payload.problemName;
            problem.difficulty = request.payload.difficulty;
        }
        else if (request.action == "getProblem") {
            sendResponse(problem);
        }
        else if (request.action == "setTimer") {
            startStop();
        }
    }
});
// Updating Timer Stuffs
let startstop = 0;
let x;
/* Toggle StartStop */
function startStop() {
    startstop = startstop + 1;
    let document = chrome.extension.getViews({ type: "popup" })[0].document;
    if (startstop == 1) {
        startTimer();
        document.getElementById("start").innerHTML = "Pause";
    }
    else if (startstop == 2) {
        document.getElementById("start").innerHTML = "Start";
        startstop = 0;
        stopTimer();
    }
}
// Creating my Custom Window object since Typescript doesnt allow much flexiblity
windowObj.startStop = startStop;
windowObj.resetFunc = reset;
//Starts the Timer
function startTimer() {
    x = setInterval(timer, 10);
}
// Stops the timer
function stopTimer() {
    clearInterval(x);
}
// Declaring Variables
let milisec = 0;
let sec = 0; /* holds incrementing value */
let min = 0;
let hour = 0;
let miliSecOut = 0;
let secOut = 0;
let minOut = 0;
let hourOut = 0;
// Driver for Timer
function timer() {
    let popup = chrome.extension.getViews({ type: "popup" })[0];
    let document = popup && popup.document;
    miliSecOut = checkTime(milisec);
    secOut = checkTime(sec);
    minOut = checkTime(min);
    hourOut = checkTime(hour);
    milisec = ++milisec;
    if (milisec === 100) {
        milisec = 0;
        sec = ++sec;
    }
    if (sec == 60) {
        min = ++min;
        sec = 0;
    }
    if (min == 60) {
        min = 0;
        hour = ++hour;
    }
    // Updates DOM
    if (document) {
        document.getElementById("milisec").innerHTML = miliSecOut.toString();
        document.getElementById("sec").innerHTML = secOut.toString();
        document.getElementById("min").innerHTML = minOut.toString();
        document.getElementById("hour").innerHTML = hourOut.toString();
    }
    const timeString = helpers_1.getTimeasString(secOut, minOut, hourOut);
    chrome.browserAction.setBadgeText({ text: timeString });
    // Update the badge Text
}
// Checks time to add 0 or not
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
// Resets the timer
function reset() {
    console.log("hey");
    stopTimer();
    chrome.browserAction.setBadgeText({ text: "" });
    let document = chrome.extension.getViews({ type: "popup" })[0].document;
    /*Reset*/
    startstop = 0;
    document.getElementById("start").innerHTML = "Start";
    milisec = 0;
    sec = 0;
    min = 0;
    hour = 0;
    document.getElementById("milisec").innerHTML = "00";
    document.getElementById("sec").innerHTML = "00";
    document.getElementById("min").innerHTML = "00";
    document.getElementById("hour").innerHTML = "00";
}


/***/ }),

/***/ "./src/helpers.ts":
/*!************************!*\
  !*** ./src/helpers.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function getTimeasString(seconds, mins, hours) {
    if (hours > 0) {
        return `${hours.toString()} hr`;
    }
    else if (mins > 0) {
        return `${mins.toString()} min `;
    }
    else if (seconds > 0) {
        return `${seconds.toString()} sec`;
    }
}
exports.getTimeasString = getTimeasString;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tncm91bmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGtCQUFrQixtQkFBTyxDQUFDLG1DQUFXO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxzQkFBc0I7QUFDakU7QUFDQTtBQUNBLDJDQUEyQyx3QkFBd0I7QUFDbkU7QUFDQSxLQUFLO0FBQ0wsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsZ0JBQWdCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxnQkFBZ0I7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxtQkFBbUI7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsV0FBVztBQUNsRCw4Q0FBOEMsZ0JBQWdCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2hJYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQSxrQkFBa0IsaUJBQWlCO0FBQ25DO0FBQ0E7QUFDQSxrQkFBa0IsZ0JBQWdCO0FBQ2xDO0FBQ0E7QUFDQSxrQkFBa0IsbUJBQW1CO0FBQ3JDO0FBQ0E7QUFDQSIsImZpbGUiOiJiYWNrZ3JvdW5kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYmFja2dyb3VuZC50c1wiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgaGVscGVyc18xID0gcmVxdWlyZShcIi4vaGVscGVyc1wiKTtcbi8vIE92ZXJyaWRpbmcgQ3VzdG9tIFdpbmRvdyBPYmplY3QgU2luY2UgY2Fubm90IGFtIHVuYWJsZSB0byBleHRlbmQgdGhlIGRlZmF1bHQgd2luZG93IG9ialxubGV0IHdpbmRvd09iaiA9IHdpbmRvdztcbi8vIFNldHRpbmcgUG9wdXAgZHluYW1pY2FsbHlcbmNocm9tZS50YWJzLm9uQWN0aXZhdGVkLmFkZExpc3RlbmVyKGZ1bmN0aW9uIChhY3RpdmVJbmZvKSB7XG4gICAgbGV0IHVybFJlZ2V4ID0gbmV3IFJlZ0V4cChcImh0dHBzOi8vbGVldGNvZGUuY29tL3Byb2JsZW1zLypcIik7XG4gICAgY29uc3QgYWN0aXZlVGFiSWQgPSBhY3RpdmVJbmZvLnRhYklkO1xuICAgIGNocm9tZS50YWJzLmdldChhY3RpdmVUYWJJZCwgZnVuY3Rpb24gKHRhYikge1xuICAgICAgICBjb25zdCBjdXJyZW50VXJsID0gdGFiLnVybDtcbiAgICAgICAgaWYgKHVybFJlZ2V4LnRlc3QoY3VycmVudFVybCkpIHtcbiAgICAgICAgICAgIGNocm9tZS5icm93c2VyQWN0aW9uLnNldFBvcHVwKHsgcG9wdXA6IFwicG9wdXAuaHRtbFwiIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0UG9wdXAoeyBwb3B1cDogXCJpbnZhbGlkLmh0bWxcIiB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xufSk7XG4vLyBQZXJzaXN0aW5nIERhdGEgU3R1ZmZzdFxuY29uc3QgcHJvYmxlbSA9IHt9O1xuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmN0aW9uIChyZXF1ZXN0LCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xuICAgIGlmIChyZXF1ZXN0KSB7XG4gICAgICAgIGlmIChyZXF1ZXN0LmFjdGlvbiA9PSBcInNldFByb2JsZW1cIikge1xuICAgICAgICAgICAgcHJvYmxlbS5wcm9ibGVtTmFtZSA9IHJlcXVlc3QucGF5bG9hZC5wcm9ibGVtTmFtZTtcbiAgICAgICAgICAgIHByb2JsZW0uZGlmZmljdWx0eSA9IHJlcXVlc3QucGF5bG9hZC5kaWZmaWN1bHR5O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHJlcXVlc3QuYWN0aW9uID09IFwiZ2V0UHJvYmxlbVwiKSB7XG4gICAgICAgICAgICBzZW5kUmVzcG9uc2UocHJvYmxlbSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocmVxdWVzdC5hY3Rpb24gPT0gXCJzZXRUaW1lclwiKSB7XG4gICAgICAgICAgICBzdGFydFN0b3AoKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuLy8gVXBkYXRpbmcgVGltZXIgU3R1ZmZzXG5sZXQgc3RhcnRzdG9wID0gMDtcbmxldCB4O1xuLyogVG9nZ2xlIFN0YXJ0U3RvcCAqL1xuZnVuY3Rpb24gc3RhcnRTdG9wKCkge1xuICAgIHN0YXJ0c3RvcCA9IHN0YXJ0c3RvcCArIDE7XG4gICAgbGV0IGRvY3VtZW50ID0gY2hyb21lLmV4dGVuc2lvbi5nZXRWaWV3cyh7IHR5cGU6IFwicG9wdXBcIiB9KVswXS5kb2N1bWVudDtcbiAgICBpZiAoc3RhcnRzdG9wID09IDEpIHtcbiAgICAgICAgc3RhcnRUaW1lcigpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0XCIpLmlubmVySFRNTCA9IFwiUGF1c2VcIjtcbiAgICB9XG4gICAgZWxzZSBpZiAoc3RhcnRzdG9wID09IDIpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydFwiKS5pbm5lckhUTUwgPSBcIlN0YXJ0XCI7XG4gICAgICAgIHN0YXJ0c3RvcCA9IDA7XG4gICAgICAgIHN0b3BUaW1lcigpO1xuICAgIH1cbn1cbi8vIENyZWF0aW5nIG15IEN1c3RvbSBXaW5kb3cgb2JqZWN0IHNpbmNlIFR5cGVzY3JpcHQgZG9lc250IGFsbG93IG11Y2ggZmxleGlibGl0eVxud2luZG93T2JqLnN0YXJ0U3RvcCA9IHN0YXJ0U3RvcDtcbndpbmRvd09iai5yZXNldEZ1bmMgPSByZXNldDtcbi8vU3RhcnRzIHRoZSBUaW1lclxuZnVuY3Rpb24gc3RhcnRUaW1lcigpIHtcbiAgICB4ID0gc2V0SW50ZXJ2YWwodGltZXIsIDEwKTtcbn1cbi8vIFN0b3BzIHRoZSB0aW1lclxuZnVuY3Rpb24gc3RvcFRpbWVyKCkge1xuICAgIGNsZWFySW50ZXJ2YWwoeCk7XG59XG4vLyBEZWNsYXJpbmcgVmFyaWFibGVzXG5sZXQgbWlsaXNlYyA9IDA7XG5sZXQgc2VjID0gMDsgLyogaG9sZHMgaW5jcmVtZW50aW5nIHZhbHVlICovXG5sZXQgbWluID0gMDtcbmxldCBob3VyID0gMDtcbmxldCBtaWxpU2VjT3V0ID0gMDtcbmxldCBzZWNPdXQgPSAwO1xubGV0IG1pbk91dCA9IDA7XG5sZXQgaG91ck91dCA9IDA7XG4vLyBEcml2ZXIgZm9yIFRpbWVyXG5mdW5jdGlvbiB0aW1lcigpIHtcbiAgICBsZXQgcG9wdXAgPSBjaHJvbWUuZXh0ZW5zaW9uLmdldFZpZXdzKHsgdHlwZTogXCJwb3B1cFwiIH0pWzBdO1xuICAgIGxldCBkb2N1bWVudCA9IHBvcHVwICYmIHBvcHVwLmRvY3VtZW50O1xuICAgIG1pbGlTZWNPdXQgPSBjaGVja1RpbWUobWlsaXNlYyk7XG4gICAgc2VjT3V0ID0gY2hlY2tUaW1lKHNlYyk7XG4gICAgbWluT3V0ID0gY2hlY2tUaW1lKG1pbik7XG4gICAgaG91ck91dCA9IGNoZWNrVGltZShob3VyKTtcbiAgICBtaWxpc2VjID0gKyttaWxpc2VjO1xuICAgIGlmIChtaWxpc2VjID09PSAxMDApIHtcbiAgICAgICAgbWlsaXNlYyA9IDA7XG4gICAgICAgIHNlYyA9ICsrc2VjO1xuICAgIH1cbiAgICBpZiAoc2VjID09IDYwKSB7XG4gICAgICAgIG1pbiA9ICsrbWluO1xuICAgICAgICBzZWMgPSAwO1xuICAgIH1cbiAgICBpZiAobWluID09IDYwKSB7XG4gICAgICAgIG1pbiA9IDA7XG4gICAgICAgIGhvdXIgPSArK2hvdXI7XG4gICAgfVxuICAgIC8vIFVwZGF0ZXMgRE9NXG4gICAgaWYgKGRvY3VtZW50KSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWlsaXNlY1wiKS5pbm5lckhUTUwgPSBtaWxpU2VjT3V0LnRvU3RyaW5nKCk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VjXCIpLmlubmVySFRNTCA9IHNlY091dC50b1N0cmluZygpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1pblwiKS5pbm5lckhUTUwgPSBtaW5PdXQudG9TdHJpbmcoKTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3VyXCIpLmlubmVySFRNTCA9IGhvdXJPdXQudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgY29uc3QgdGltZVN0cmluZyA9IGhlbHBlcnNfMS5nZXRUaW1lYXNTdHJpbmcoc2VjT3V0LCBtaW5PdXQsIGhvdXJPdXQpO1xuICAgIGNocm9tZS5icm93c2VyQWN0aW9uLnNldEJhZGdlVGV4dCh7IHRleHQ6IHRpbWVTdHJpbmcgfSk7XG4gICAgLy8gVXBkYXRlIHRoZSBiYWRnZSBUZXh0XG59XG4vLyBDaGVja3MgdGltZSB0byBhZGQgMCBvciBub3RcbmZ1bmN0aW9uIGNoZWNrVGltZShpKSB7XG4gICAgaWYgKGkgPCAxMCkge1xuICAgICAgICBpID0gXCIwXCIgKyBpO1xuICAgIH1cbiAgICByZXR1cm4gaTtcbn1cbi8vIFJlc2V0cyB0aGUgdGltZXJcbmZ1bmN0aW9uIHJlc2V0KCkge1xuICAgIGNvbnNvbGUubG9nKFwiaGV5XCIpO1xuICAgIHN0b3BUaW1lcigpO1xuICAgIGNocm9tZS5icm93c2VyQWN0aW9uLnNldEJhZGdlVGV4dCh7IHRleHQ6IFwiXCIgfSk7XG4gICAgbGV0IGRvY3VtZW50ID0gY2hyb21lLmV4dGVuc2lvbi5nZXRWaWV3cyh7IHR5cGU6IFwicG9wdXBcIiB9KVswXS5kb2N1bWVudDtcbiAgICAvKlJlc2V0Ki9cbiAgICBzdGFydHN0b3AgPSAwO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnRcIikuaW5uZXJIVE1MID0gXCJTdGFydFwiO1xuICAgIG1pbGlzZWMgPSAwO1xuICAgIHNlYyA9IDA7XG4gICAgbWluID0gMDtcbiAgICBob3VyID0gMDtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1pbGlzZWNcIikuaW5uZXJIVE1MID0gXCIwMFwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VjXCIpLmlubmVySFRNTCA9IFwiMDBcIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1pblwiKS5pbm5lckhUTUwgPSBcIjAwXCI7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3VyXCIpLmlubmVySFRNTCA9IFwiMDBcIjtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gZ2V0VGltZWFzU3RyaW5nKHNlY29uZHMsIG1pbnMsIGhvdXJzKSB7XG4gICAgaWYgKGhvdXJzID4gMCkge1xuICAgICAgICByZXR1cm4gYCR7aG91cnMudG9TdHJpbmcoKX0gaHJgO1xuICAgIH1cbiAgICBlbHNlIGlmIChtaW5zID4gMCkge1xuICAgICAgICByZXR1cm4gYCR7bWlucy50b1N0cmluZygpfSBtaW4gYDtcbiAgICB9XG4gICAgZWxzZSBpZiAoc2Vjb25kcyA+IDApIHtcbiAgICAgICAgcmV0dXJuIGAke3NlY29uZHMudG9TdHJpbmcoKX0gc2VjYDtcbiAgICB9XG59XG5leHBvcnRzLmdldFRpbWVhc1N0cmluZyA9IGdldFRpbWVhc1N0cmluZztcbiJdLCJzb3VyY2VSb290IjoiIn0=