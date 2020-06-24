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
        return `${normalize(hours)} hr`;
    }
    else if (mins > 0) {
        return `${normalize(mins)} m `;
    }
    else if (seconds > 0) {
        return `${normalize(seconds)} s`;
    }
}
exports.getTimeasString = getTimeasString;
function normalize(num) {
    let n = Math.floor(num);
    let renderString = n.toString();
    return n;
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tncm91bmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGtCQUFrQixtQkFBTyxDQUFDLG1DQUFXO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxzQkFBc0I7QUFDakU7QUFDQTtBQUNBLDJDQUEyQyx3QkFBd0I7QUFDbkU7QUFDQSxLQUFLO0FBQ0wsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsZ0JBQWdCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxnQkFBZ0I7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxtQkFBbUI7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsV0FBVztBQUNsRCw4Q0FBOEMsZ0JBQWdCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2hJYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQSxrQkFBa0IsaUJBQWlCO0FBQ25DO0FBQ0E7QUFDQSxrQkFBa0IsZ0JBQWdCO0FBQ2xDO0FBQ0E7QUFDQSxrQkFBa0IsbUJBQW1CO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2JhY2tncm91bmQudHNcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGhlbHBlcnNfMSA9IHJlcXVpcmUoXCIuL2hlbHBlcnNcIik7XG4vLyBPdmVycmlkaW5nIEN1c3RvbSBXaW5kb3cgT2JqZWN0IFNpbmNlIGNhbm5vdCBhbSB1bmFibGUgdG8gZXh0ZW5kIHRoZSBkZWZhdWx0IHdpbmRvdyBvYmpcbmxldCB3aW5kb3dPYmogPSB3aW5kb3c7XG4vLyBTZXR0aW5nIFBvcHVwIGR5bmFtaWNhbGx5XG5jaHJvbWUudGFicy5vbkFjdGl2YXRlZC5hZGRMaXN0ZW5lcihmdW5jdGlvbiAoYWN0aXZlSW5mbykge1xuICAgIGxldCB1cmxSZWdleCA9IG5ldyBSZWdFeHAoXCJodHRwczovL2xlZXRjb2RlLmNvbS9wcm9ibGVtcy8qXCIpO1xuICAgIGNvbnN0IGFjdGl2ZVRhYklkID0gYWN0aXZlSW5mby50YWJJZDtcbiAgICBjaHJvbWUudGFicy5nZXQoYWN0aXZlVGFiSWQsIGZ1bmN0aW9uICh0YWIpIHtcbiAgICAgICAgY29uc3QgY3VycmVudFVybCA9IHRhYi51cmw7XG4gICAgICAgIGlmICh1cmxSZWdleC50ZXN0KGN1cnJlbnRVcmwpKSB7XG4gICAgICAgICAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRQb3B1cCh7IHBvcHVwOiBcInBvcHVwLmh0bWxcIiB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNocm9tZS5icm93c2VyQWN0aW9uLnNldFBvcHVwKHsgcG9wdXA6IFwiaW52YWxpZC5odG1sXCIgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xuLy8gUGVyc2lzdGluZyBEYXRhIFN0dWZmc3RcbmNvbnN0IHByb2JsZW0gPSB7fTtcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbiAocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcbiAgICBpZiAocmVxdWVzdCkge1xuICAgICAgICBpZiAocmVxdWVzdC5hY3Rpb24gPT0gXCJzZXRQcm9ibGVtXCIpIHtcbiAgICAgICAgICAgIHByb2JsZW0ucHJvYmxlbU5hbWUgPSByZXF1ZXN0LnBheWxvYWQucHJvYmxlbU5hbWU7XG4gICAgICAgICAgICBwcm9ibGVtLmRpZmZpY3VsdHkgPSByZXF1ZXN0LnBheWxvYWQuZGlmZmljdWx0eTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChyZXF1ZXN0LmFjdGlvbiA9PSBcImdldFByb2JsZW1cIikge1xuICAgICAgICAgICAgc2VuZFJlc3BvbnNlKHByb2JsZW0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHJlcXVlc3QuYWN0aW9uID09IFwic2V0VGltZXJcIikge1xuICAgICAgICAgICAgc3RhcnRTdG9wKCk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbi8vIFVwZGF0aW5nIFRpbWVyIFN0dWZmc1xubGV0IHN0YXJ0c3RvcCA9IDA7XG5sZXQgeDtcbi8qIFRvZ2dsZSBTdGFydFN0b3AgKi9cbmZ1bmN0aW9uIHN0YXJ0U3RvcCgpIHtcbiAgICBzdGFydHN0b3AgPSBzdGFydHN0b3AgKyAxO1xuICAgIGxldCBkb2N1bWVudCA9IGNocm9tZS5leHRlbnNpb24uZ2V0Vmlld3MoeyB0eXBlOiBcInBvcHVwXCIgfSlbMF0uZG9jdW1lbnQ7XG4gICAgaWYgKHN0YXJ0c3RvcCA9PSAxKSB7XG4gICAgICAgIHN0YXJ0VGltZXIoKTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydFwiKS5pbm5lckhUTUwgPSBcIlBhdXNlXCI7XG4gICAgfVxuICAgIGVsc2UgaWYgKHN0YXJ0c3RvcCA9PSAyKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnRcIikuaW5uZXJIVE1MID0gXCJTdGFydFwiO1xuICAgICAgICBzdGFydHN0b3AgPSAwO1xuICAgICAgICBzdG9wVGltZXIoKTtcbiAgICB9XG59XG4vLyBDcmVhdGluZyBteSBDdXN0b20gV2luZG93IG9iamVjdCBzaW5jZSBUeXBlc2NyaXB0IGRvZXNudCBhbGxvdyBtdWNoIGZsZXhpYmxpdHlcbndpbmRvd09iai5zdGFydFN0b3AgPSBzdGFydFN0b3A7XG53aW5kb3dPYmoucmVzZXRGdW5jID0gcmVzZXQ7XG4vL1N0YXJ0cyB0aGUgVGltZXJcbmZ1bmN0aW9uIHN0YXJ0VGltZXIoKSB7XG4gICAgeCA9IHNldEludGVydmFsKHRpbWVyLCAxMCk7XG59XG4vLyBTdG9wcyB0aGUgdGltZXJcbmZ1bmN0aW9uIHN0b3BUaW1lcigpIHtcbiAgICBjbGVhckludGVydmFsKHgpO1xufVxuLy8gRGVjbGFyaW5nIFZhcmlhYmxlc1xubGV0IG1pbGlzZWMgPSAwO1xubGV0IHNlYyA9IDA7IC8qIGhvbGRzIGluY3JlbWVudGluZyB2YWx1ZSAqL1xubGV0IG1pbiA9IDA7XG5sZXQgaG91ciA9IDA7XG5sZXQgbWlsaVNlY091dCA9IDA7XG5sZXQgc2VjT3V0ID0gMDtcbmxldCBtaW5PdXQgPSAwO1xubGV0IGhvdXJPdXQgPSAwO1xuLy8gRHJpdmVyIGZvciBUaW1lclxuZnVuY3Rpb24gdGltZXIoKSB7XG4gICAgbGV0IHBvcHVwID0gY2hyb21lLmV4dGVuc2lvbi5nZXRWaWV3cyh7IHR5cGU6IFwicG9wdXBcIiB9KVswXTtcbiAgICBsZXQgZG9jdW1lbnQgPSBwb3B1cCAmJiBwb3B1cC5kb2N1bWVudDtcbiAgICBtaWxpU2VjT3V0ID0gY2hlY2tUaW1lKG1pbGlzZWMpO1xuICAgIHNlY091dCA9IGNoZWNrVGltZShzZWMpO1xuICAgIG1pbk91dCA9IGNoZWNrVGltZShtaW4pO1xuICAgIGhvdXJPdXQgPSBjaGVja1RpbWUoaG91cik7XG4gICAgbWlsaXNlYyA9ICsrbWlsaXNlYztcbiAgICBpZiAobWlsaXNlYyA9PT0gMTAwKSB7XG4gICAgICAgIG1pbGlzZWMgPSAwO1xuICAgICAgICBzZWMgPSArK3NlYztcbiAgICB9XG4gICAgaWYgKHNlYyA9PSA2MCkge1xuICAgICAgICBtaW4gPSArK21pbjtcbiAgICAgICAgc2VjID0gMDtcbiAgICB9XG4gICAgaWYgKG1pbiA9PSA2MCkge1xuICAgICAgICBtaW4gPSAwO1xuICAgICAgICBob3VyID0gKytob3VyO1xuICAgIH1cbiAgICAvLyBVcGRhdGVzIERPTVxuICAgIGlmIChkb2N1bWVudCkge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1pbGlzZWNcIikuaW5uZXJIVE1MID0gbWlsaVNlY091dC50b1N0cmluZygpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlY1wiKS5pbm5lckhUTUwgPSBzZWNPdXQudG9TdHJpbmcoKTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtaW5cIikuaW5uZXJIVE1MID0gbWluT3V0LnRvU3RyaW5nKCk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG91clwiKS5pbm5lckhUTUwgPSBob3VyT3V0LnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGNvbnN0IHRpbWVTdHJpbmcgPSBoZWxwZXJzXzEuZ2V0VGltZWFzU3RyaW5nKHNlY091dCwgbWluT3V0LCBob3VyT3V0KTtcbiAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRCYWRnZVRleHQoeyB0ZXh0OiB0aW1lU3RyaW5nIH0pO1xuICAgIC8vIFVwZGF0ZSB0aGUgYmFkZ2UgVGV4dFxufVxuLy8gQ2hlY2tzIHRpbWUgdG8gYWRkIDAgb3Igbm90XG5mdW5jdGlvbiBjaGVja1RpbWUoaSkge1xuICAgIGlmIChpIDwgMTApIHtcbiAgICAgICAgaSA9IFwiMFwiICsgaTtcbiAgICB9XG4gICAgcmV0dXJuIGk7XG59XG4vLyBSZXNldHMgdGhlIHRpbWVyXG5mdW5jdGlvbiByZXNldCgpIHtcbiAgICBjb25zb2xlLmxvZyhcImhleVwiKTtcbiAgICBzdG9wVGltZXIoKTtcbiAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRCYWRnZVRleHQoeyB0ZXh0OiBcIlwiIH0pO1xuICAgIGxldCBkb2N1bWVudCA9IGNocm9tZS5leHRlbnNpb24uZ2V0Vmlld3MoeyB0eXBlOiBcInBvcHVwXCIgfSlbMF0uZG9jdW1lbnQ7XG4gICAgLypSZXNldCovXG4gICAgc3RhcnRzdG9wID0gMDtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0XCIpLmlubmVySFRNTCA9IFwiU3RhcnRcIjtcbiAgICBtaWxpc2VjID0gMDtcbiAgICBzZWMgPSAwO1xuICAgIG1pbiA9IDA7XG4gICAgaG91ciA9IDA7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtaWxpc2VjXCIpLmlubmVySFRNTCA9IFwiMDBcIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlY1wiKS5pbm5lckhUTUwgPSBcIjAwXCI7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtaW5cIikuaW5uZXJIVE1MID0gXCIwMFwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG91clwiKS5pbm5lckhUTUwgPSBcIjAwXCI7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIGdldFRpbWVhc1N0cmluZyhzZWNvbmRzLCBtaW5zLCBob3Vycykge1xuICAgIGlmIChob3VycyA+IDApIHtcbiAgICAgICAgcmV0dXJuIGAke25vcm1hbGl6ZShob3Vycyl9IGhyYDtcbiAgICB9XG4gICAgZWxzZSBpZiAobWlucyA+IDApIHtcbiAgICAgICAgcmV0dXJuIGAke25vcm1hbGl6ZShtaW5zKX0gbSBgO1xuICAgIH1cbiAgICBlbHNlIGlmIChzZWNvbmRzID4gMCkge1xuICAgICAgICByZXR1cm4gYCR7bm9ybWFsaXplKHNlY29uZHMpfSBzYDtcbiAgICB9XG59XG5leHBvcnRzLmdldFRpbWVhc1N0cmluZyA9IGdldFRpbWVhc1N0cmluZztcbmZ1bmN0aW9uIG5vcm1hbGl6ZShudW0pIHtcbiAgICBsZXQgbiA9IE1hdGguZmxvb3IobnVtKTtcbiAgICBsZXQgcmVuZGVyU3RyaW5nID0gbi50b1N0cmluZygpO1xuICAgIHJldHVybiBuO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==