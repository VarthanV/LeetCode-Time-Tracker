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

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = __webpack_require__(/*! ./helpers */ "./src/helpers.ts");
// Overriding Custom Window Object Since cannot am unable to extend the default window obj
let windowObj = window;
let timeString;
let currentUrl;
let milisec = 0;
let sec = 0; /* holds incrementing value */
let min = 0;
let hour = 0;
let miliSecOut = 0;
let secOut = 0;
let minOut = 0;
let hourOut = 0;
// Setting Popup dynamically
chrome.browserAction.setBadgeBackgroundColor({ color: "#5CAD62" });
chrome.tabs.onActivated.addListener(function (activeInfo) {
    const activeTabId = activeInfo.tabId;
    chrome.tabs.get(activeTabId, function (tab) {
        currentUrl = tab.url;
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
        else if (request.action == "getTimer") {
            sendResponse({ startstop: startstop });
        }
        else if (request.action === 'getCurrentTime') {
            sendResponse({
                miliSecOut: miliSecOut,
                hourOut: hourOut,
                secOut: secOut,
                minOut: minOut
            });
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
        document.getElementById("start").innerHTML = `<span class="material-icons material-icons-outlined">pause</span>
        <span class="btn-txt">Pause</span>`;
    }
    else if (startstop == 2) {
        document.getElementById("start").innerHTML = `<span class="material-icons material-icons-outlined">arrow_forward_ios </span>
        <span class="btn-txt">Start</span>`;
        startstop = 0;
        stopTimer();
    }
}
// Creating my Custom Window object since Typescript doesnt allow much flexiblity
windowObj.startStop = startStop;
windowObj.resetFunc = reset;
windowObj.saveData = saveData;
//Starts the Timer
function startTimer() {
    x = setInterval(timer, 10);
}
// Stops the timer
function stopTimer() {
    clearInterval(x);
}
// Declaring Variables
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
    /*
    When the Popup is closed background does'nt have reference to the Popup's
    document object  we no need to render when the popup is not opened
  
  
    */
    if (document) {
        document.getElementById("milisec").innerHTML = miliSecOut.toString();
        document.getElementById("sec").innerHTML = secOut.toString();
        document.getElementById("min").innerHTML = minOut.toString();
        document.getElementById("hour").innerHTML = hourOut.toString();
    }
    // Update the badge Text
    timeString = helpers_1.getTimeasString(secOut, minOut, hourOut);
    chrome.browserAction.setBadgeText({ text: timeString });
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
    stopTimer();
    chrome.browserAction.setBadgeText({ text: "" });
    let document = chrome.extension.getViews({ type: "popup" })[0].document;
    /*Reset*/
    startstop = 0;
    document.getElementById("start").innerHTML = `<span class="material-icons material-icons-outlined">arrow_forward_ios </span>
        <span class="btn-txt">Start</span>`;
    milisec = 0;
    sec = 0;
    min = 0;
    hour = 0;
    miliSecOut = 0;
    hourOut = 0;
    minOut = 0;
    secOut = 0;
    document.getElementById("milisec").innerHTML = "00";
    document.getElementById("sec").innerHTML = "00";
    document.getElementById("min").innerHTML = "00";
    document.getElementById("hour").innerHTML = "00";
}
function setData() {
    let data = JSON.parse(localStorage.getItem("leetCodeExtensionDetails"));
    let today = new Date();
    //@ts-ignore
    let dd = String(today.getDate()).padStart(2, "0");
    //@ts-ignore
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();
    const todayString = dd + "/" + mm + "/" + yyyy;
    const problemName = problem.problemName.split(".")[1];
    const dataMap = {
        problemName: problemName,
        difficulty: problem.difficulty,
        timeTaken: timeString,
        date: todayString,
        problemUrl: currentUrl,
    };
    let currentDiffProblemArray = data[problem.difficulty.toLowerCase()];
    let exists = currentDiffProblemArray.filter((item) => {
        return item.problemName === problemName;
    });
    let problemObj = exists[0];
    if (exists.length > 0) {
        // dataMap.problemName +=  problemObj.duplicateIndex.toString();
        problemObj.duplicateIndex += 1;
        const itemToFind = (item) => item.problemName == dataMap.problemName;
        let idx = currentDiffProblemArray.findIndex(itemToFind);
        data[problem.difficulty.toLowerCase()][idx] = problemObj;
        dataMap.problemName += ` (${problemObj.duplicateIndex})`;
        data[problemObj.difficulty.toLowerCase()].push(dataMap);
        localStorage.setItem("leetCodeExtensionDetails", JSON.stringify(data));
    }
    else {
        dataMap.duplicateIndex = 0;
        data[dataMap.difficulty.toLowerCase()].push(dataMap);
        let dataToSet = JSON.stringify(data);
        localStorage.setItem("leetCodeExtensionDetails", dataToSet);
    }
    alert("Saved!");
    chrome.runtime.sendMessage({ showGraph: true });
}
function saveData() {
    return __awaiter(this, void 0, void 0, function* () {
        yield reset();
        if (!localStorage.getItem("leetCodeExtensionDetails")) {
            setInitialData();
            setData();
        }
        else {
            setData();
        }
    });
}
function setInitialData() {
    var problemDetails = JSON.stringify({
        easy: [],
        medium: [],
        hard: [],
    });
    localStorage.setItem("leetCodeExtensionDetails", problemDetails);
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
// Converts the given individuval time parts to human readable form
function getTimeasString(seconds, mins, hours) {
    if (hours > 0 && mins > 0) {
        return `${normalize(hours)}hr ${normalize(mins)}minutes`;
    }
    else if (hours > 0) {
        return `${normalize(hours)} hour`;
    }
    else if (mins > 0) {
        return `${normalize(mins)} minutes`;
    }
    else if (seconds > 0) {
        return `${normalize(seconds)} seconds`;
    }
    else {
        return '0 seconds (:(:';
    }
}
exports.getTimeasString = getTimeasString;
// Removes trailing zeroes from the TimeStamp
function normalize(num) {
    let n = Math.floor(num);
    return n;
}
exports.normalize = normalize;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tncm91bmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGYTtBQUNiO0FBQ0EsMkJBQTJCLCtEQUErRCxnQkFBZ0IsRUFBRSxFQUFFO0FBQzlHO0FBQ0EsbUNBQW1DLE1BQU0sNkJBQTZCLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDakcsa0NBQWtDLE1BQU0saUNBQWlDLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDcEcsK0JBQStCLHFGQUFxRjtBQUNwSDtBQUNBLEtBQUs7QUFDTDtBQUNBLDhDQUE4QyxjQUFjO0FBQzVELGtCQUFrQixtQkFBTyxDQUFDLG1DQUFXO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsbUJBQW1CO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsdUJBQXVCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGdCQUFnQjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsZ0JBQWdCO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsbUJBQW1CO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsV0FBVztBQUNsRCw4Q0FBOEMsZ0JBQWdCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQ7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsMEJBQTBCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLGtCQUFrQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOzs7Ozs7Ozs7Ozs7O0FDMU5hO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGlCQUFpQixLQUFLLGdCQUFnQjtBQUN4RDtBQUNBO0FBQ0Esa0JBQWtCLGlCQUFpQjtBQUNuQztBQUNBO0FBQ0Esa0JBQWtCLGdCQUFnQjtBQUNsQztBQUNBO0FBQ0Esa0JBQWtCLG1CQUFtQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2JhY2tncm91bmQudHNcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgaGVscGVyc18xID0gcmVxdWlyZShcIi4vaGVscGVyc1wiKTtcbi8vIE92ZXJyaWRpbmcgQ3VzdG9tIFdpbmRvdyBPYmplY3QgU2luY2UgY2Fubm90IGFtIHVuYWJsZSB0byBleHRlbmQgdGhlIGRlZmF1bHQgd2luZG93IG9ialxubGV0IHdpbmRvd09iaiA9IHdpbmRvdztcbmxldCB0aW1lU3RyaW5nO1xubGV0IGN1cnJlbnRVcmw7XG5sZXQgbWlsaXNlYyA9IDA7XG5sZXQgc2VjID0gMDsgLyogaG9sZHMgaW5jcmVtZW50aW5nIHZhbHVlICovXG5sZXQgbWluID0gMDtcbmxldCBob3VyID0gMDtcbmxldCBtaWxpU2VjT3V0ID0gMDtcbmxldCBzZWNPdXQgPSAwO1xubGV0IG1pbk91dCA9IDA7XG5sZXQgaG91ck91dCA9IDA7XG4vLyBTZXR0aW5nIFBvcHVwIGR5bmFtaWNhbGx5XG5jaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRCYWRnZUJhY2tncm91bmRDb2xvcih7IGNvbG9yOiBcIiM1Q0FENjJcIiB9KTtcbmNocm9tZS50YWJzLm9uQWN0aXZhdGVkLmFkZExpc3RlbmVyKGZ1bmN0aW9uIChhY3RpdmVJbmZvKSB7XG4gICAgY29uc3QgYWN0aXZlVGFiSWQgPSBhY3RpdmVJbmZvLnRhYklkO1xuICAgIGNocm9tZS50YWJzLmdldChhY3RpdmVUYWJJZCwgZnVuY3Rpb24gKHRhYikge1xuICAgICAgICBjdXJyZW50VXJsID0gdGFiLnVybDtcbiAgICB9KTtcbn0pO1xuLy8gUGVyc2lzdGluZyBEYXRhIFN0dWZmc3RcbmNvbnN0IHByb2JsZW0gPSB7fTtcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbiAocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcbiAgICBpZiAocmVxdWVzdCkge1xuICAgICAgICBpZiAocmVxdWVzdC5hY3Rpb24gPT0gXCJzZXRQcm9ibGVtXCIpIHtcbiAgICAgICAgICAgIHByb2JsZW0ucHJvYmxlbU5hbWUgPSByZXF1ZXN0LnBheWxvYWQucHJvYmxlbU5hbWU7XG4gICAgICAgICAgICBwcm9ibGVtLmRpZmZpY3VsdHkgPSByZXF1ZXN0LnBheWxvYWQuZGlmZmljdWx0eTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChyZXF1ZXN0LmFjdGlvbiA9PSBcImdldFByb2JsZW1cIikge1xuICAgICAgICAgICAgc2VuZFJlc3BvbnNlKHByb2JsZW0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHJlcXVlc3QuYWN0aW9uID09IFwic2V0VGltZXJcIikge1xuICAgICAgICAgICAgc3RhcnRTdG9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocmVxdWVzdC5hY3Rpb24gPT0gXCJnZXRUaW1lclwiKSB7XG4gICAgICAgICAgICBzZW5kUmVzcG9uc2UoeyBzdGFydHN0b3A6IHN0YXJ0c3RvcCB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChyZXF1ZXN0LmFjdGlvbiA9PT0gJ2dldEN1cnJlbnRUaW1lJykge1xuICAgICAgICAgICAgc2VuZFJlc3BvbnNlKHtcbiAgICAgICAgICAgICAgICBtaWxpU2VjT3V0OiBtaWxpU2VjT3V0LFxuICAgICAgICAgICAgICAgIGhvdXJPdXQ6IGhvdXJPdXQsXG4gICAgICAgICAgICAgICAgc2VjT3V0OiBzZWNPdXQsXG4gICAgICAgICAgICAgICAgbWluT3V0OiBtaW5PdXRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufSk7XG4vLyBVcGRhdGluZyBUaW1lciBTdHVmZnNcbmxldCBzdGFydHN0b3AgPSAwO1xubGV0IHg7XG4vKiBUb2dnbGUgU3RhcnRTdG9wICovXG5mdW5jdGlvbiBzdGFydFN0b3AoKSB7XG4gICAgc3RhcnRzdG9wID0gc3RhcnRzdG9wICsgMTtcbiAgICBsZXQgZG9jdW1lbnQgPSBjaHJvbWUuZXh0ZW5zaW9uLmdldFZpZXdzKHsgdHlwZTogXCJwb3B1cFwiIH0pWzBdLmRvY3VtZW50O1xuICAgIGlmIChzdGFydHN0b3AgPT0gMSkge1xuICAgICAgICBzdGFydFRpbWVyKCk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnRcIikuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgbWF0ZXJpYWwtaWNvbnMtb3V0bGluZWRcIj5wYXVzZTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJidG4tdHh0XCI+UGF1c2U8L3NwYW4+YDtcbiAgICB9XG4gICAgZWxzZSBpZiAoc3RhcnRzdG9wID09IDIpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydFwiKS5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1pY29ucyBtYXRlcmlhbC1pY29ucy1vdXRsaW5lZFwiPmFycm93X2ZvcndhcmRfaW9zIDwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJidG4tdHh0XCI+U3RhcnQ8L3NwYW4+YDtcbiAgICAgICAgc3RhcnRzdG9wID0gMDtcbiAgICAgICAgc3RvcFRpbWVyKCk7XG4gICAgfVxufVxuLy8gQ3JlYXRpbmcgbXkgQ3VzdG9tIFdpbmRvdyBvYmplY3Qgc2luY2UgVHlwZXNjcmlwdCBkb2VzbnQgYWxsb3cgbXVjaCBmbGV4aWJsaXR5XG53aW5kb3dPYmouc3RhcnRTdG9wID0gc3RhcnRTdG9wO1xud2luZG93T2JqLnJlc2V0RnVuYyA9IHJlc2V0O1xud2luZG93T2JqLnNhdmVEYXRhID0gc2F2ZURhdGE7XG4vL1N0YXJ0cyB0aGUgVGltZXJcbmZ1bmN0aW9uIHN0YXJ0VGltZXIoKSB7XG4gICAgeCA9IHNldEludGVydmFsKHRpbWVyLCAxMCk7XG59XG4vLyBTdG9wcyB0aGUgdGltZXJcbmZ1bmN0aW9uIHN0b3BUaW1lcigpIHtcbiAgICBjbGVhckludGVydmFsKHgpO1xufVxuLy8gRGVjbGFyaW5nIFZhcmlhYmxlc1xuLy8gRHJpdmVyIGZvciBUaW1lclxuZnVuY3Rpb24gdGltZXIoKSB7XG4gICAgbGV0IHBvcHVwID0gY2hyb21lLmV4dGVuc2lvbi5nZXRWaWV3cyh7IHR5cGU6IFwicG9wdXBcIiB9KVswXTtcbiAgICBsZXQgZG9jdW1lbnQgPSBwb3B1cCAmJiBwb3B1cC5kb2N1bWVudDtcbiAgICBtaWxpU2VjT3V0ID0gY2hlY2tUaW1lKG1pbGlzZWMpO1xuICAgIHNlY091dCA9IGNoZWNrVGltZShzZWMpO1xuICAgIG1pbk91dCA9IGNoZWNrVGltZShtaW4pO1xuICAgIGhvdXJPdXQgPSBjaGVja1RpbWUoaG91cik7XG4gICAgbWlsaXNlYyA9ICsrbWlsaXNlYztcbiAgICBpZiAobWlsaXNlYyA9PT0gMTAwKSB7XG4gICAgICAgIG1pbGlzZWMgPSAwO1xuICAgICAgICBzZWMgPSArK3NlYztcbiAgICB9XG4gICAgaWYgKHNlYyA9PSA2MCkge1xuICAgICAgICBtaW4gPSArK21pbjtcbiAgICAgICAgc2VjID0gMDtcbiAgICB9XG4gICAgaWYgKG1pbiA9PSA2MCkge1xuICAgICAgICBtaW4gPSAwO1xuICAgICAgICBob3VyID0gKytob3VyO1xuICAgIH1cbiAgICAvLyBVcGRhdGVzIERPTVxuICAgIC8qXG4gICAgV2hlbiB0aGUgUG9wdXAgaXMgY2xvc2VkIGJhY2tncm91bmQgZG9lcydudCBoYXZlIHJlZmVyZW5jZSB0byB0aGUgUG9wdXAnc1xuICAgIGRvY3VtZW50IG9iamVjdCAgd2Ugbm8gbmVlZCB0byByZW5kZXIgd2hlbiB0aGUgcG9wdXAgaXMgbm90IG9wZW5lZFxuICBcbiAgXG4gICAgKi9cbiAgICBpZiAoZG9jdW1lbnQpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtaWxpc2VjXCIpLmlubmVySFRNTCA9IG1pbGlTZWNPdXQudG9TdHJpbmcoKTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWNcIikuaW5uZXJIVE1MID0gc2VjT3V0LnRvU3RyaW5nKCk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWluXCIpLmlubmVySFRNTCA9IG1pbk91dC50b1N0cmluZygpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdXJcIikuaW5uZXJIVE1MID0gaG91ck91dC50b1N0cmluZygpO1xuICAgIH1cbiAgICAvLyBVcGRhdGUgdGhlIGJhZGdlIFRleHRcbiAgICB0aW1lU3RyaW5nID0gaGVscGVyc18xLmdldFRpbWVhc1N0cmluZyhzZWNPdXQsIG1pbk91dCwgaG91ck91dCk7XG4gICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0QmFkZ2VUZXh0KHsgdGV4dDogdGltZVN0cmluZyB9KTtcbn1cbi8vIENoZWNrcyB0aW1lIHRvIGFkZCAwIG9yIG5vdFxuZnVuY3Rpb24gY2hlY2tUaW1lKGkpIHtcbiAgICBpZiAoaSA8IDEwKSB7XG4gICAgICAgIGkgPSBcIjBcIiArIGk7XG4gICAgfVxuICAgIHJldHVybiBpO1xufVxuLy8gUmVzZXRzIHRoZSB0aW1lclxuZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgc3RvcFRpbWVyKCk7XG4gICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0QmFkZ2VUZXh0KHsgdGV4dDogXCJcIiB9KTtcbiAgICBsZXQgZG9jdW1lbnQgPSBjaHJvbWUuZXh0ZW5zaW9uLmdldFZpZXdzKHsgdHlwZTogXCJwb3B1cFwiIH0pWzBdLmRvY3VtZW50O1xuICAgIC8qUmVzZXQqL1xuICAgIHN0YXJ0c3RvcCA9IDA7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydFwiKS5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1pY29ucyBtYXRlcmlhbC1pY29ucy1vdXRsaW5lZFwiPmFycm93X2ZvcndhcmRfaW9zIDwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJidG4tdHh0XCI+U3RhcnQ8L3NwYW4+YDtcbiAgICBtaWxpc2VjID0gMDtcbiAgICBzZWMgPSAwO1xuICAgIG1pbiA9IDA7XG4gICAgaG91ciA9IDA7XG4gICAgbWlsaVNlY091dCA9IDA7XG4gICAgaG91ck91dCA9IDA7XG4gICAgbWluT3V0ID0gMDtcbiAgICBzZWNPdXQgPSAwO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWlsaXNlY1wiKS5pbm5lckhUTUwgPSBcIjAwXCI7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWNcIikuaW5uZXJIVE1MID0gXCIwMFwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWluXCIpLmlubmVySFRNTCA9IFwiMDBcIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdXJcIikuaW5uZXJIVE1MID0gXCIwMFwiO1xufVxuZnVuY3Rpb24gc2V0RGF0YSgpIHtcbiAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJsZWV0Q29kZUV4dGVuc2lvbkRldGFpbHNcIikpO1xuICAgIGxldCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgLy9AdHMtaWdub3JlXG4gICAgbGV0IGRkID0gU3RyaW5nKHRvZGF5LmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpO1xuICAgIC8vQHRzLWlnbm9yZVxuICAgIGxldCBtbSA9IFN0cmluZyh0b2RheS5nZXRNb250aCgpICsgMSkucGFkU3RhcnQoMiwgXCIwXCIpOyAvL0phbnVhcnkgaXMgMCFcbiAgICBsZXQgeXl5eSA9IHRvZGF5LmdldEZ1bGxZZWFyKCk7XG4gICAgY29uc3QgdG9kYXlTdHJpbmcgPSBkZCArIFwiL1wiICsgbW0gKyBcIi9cIiArIHl5eXk7XG4gICAgY29uc3QgcHJvYmxlbU5hbWUgPSBwcm9ibGVtLnByb2JsZW1OYW1lLnNwbGl0KFwiLlwiKVsxXTtcbiAgICBjb25zdCBkYXRhTWFwID0ge1xuICAgICAgICBwcm9ibGVtTmFtZTogcHJvYmxlbU5hbWUsXG4gICAgICAgIGRpZmZpY3VsdHk6IHByb2JsZW0uZGlmZmljdWx0eSxcbiAgICAgICAgdGltZVRha2VuOiB0aW1lU3RyaW5nLFxuICAgICAgICBkYXRlOiB0b2RheVN0cmluZyxcbiAgICAgICAgcHJvYmxlbVVybDogY3VycmVudFVybCxcbiAgICB9O1xuICAgIGxldCBjdXJyZW50RGlmZlByb2JsZW1BcnJheSA9IGRhdGFbcHJvYmxlbS5kaWZmaWN1bHR5LnRvTG93ZXJDYXNlKCldO1xuICAgIGxldCBleGlzdHMgPSBjdXJyZW50RGlmZlByb2JsZW1BcnJheS5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW0ucHJvYmxlbU5hbWUgPT09IHByb2JsZW1OYW1lO1xuICAgIH0pO1xuICAgIGxldCBwcm9ibGVtT2JqID0gZXhpc3RzWzBdO1xuICAgIGlmIChleGlzdHMubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyBkYXRhTWFwLnByb2JsZW1OYW1lICs9ICBwcm9ibGVtT2JqLmR1cGxpY2F0ZUluZGV4LnRvU3RyaW5nKCk7XG4gICAgICAgIHByb2JsZW1PYmouZHVwbGljYXRlSW5kZXggKz0gMTtcbiAgICAgICAgY29uc3QgaXRlbVRvRmluZCA9IChpdGVtKSA9PiBpdGVtLnByb2JsZW1OYW1lID09IGRhdGFNYXAucHJvYmxlbU5hbWU7XG4gICAgICAgIGxldCBpZHggPSBjdXJyZW50RGlmZlByb2JsZW1BcnJheS5maW5kSW5kZXgoaXRlbVRvRmluZCk7XG4gICAgICAgIGRhdGFbcHJvYmxlbS5kaWZmaWN1bHR5LnRvTG93ZXJDYXNlKCldW2lkeF0gPSBwcm9ibGVtT2JqO1xuICAgICAgICBkYXRhTWFwLnByb2JsZW1OYW1lICs9IGAgKCR7cHJvYmxlbU9iai5kdXBsaWNhdGVJbmRleH0pYDtcbiAgICAgICAgZGF0YVtwcm9ibGVtT2JqLmRpZmZpY3VsdHkudG9Mb3dlckNhc2UoKV0ucHVzaChkYXRhTWFwKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJsZWV0Q29kZUV4dGVuc2lvbkRldGFpbHNcIiwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZGF0YU1hcC5kdXBsaWNhdGVJbmRleCA9IDA7XG4gICAgICAgIGRhdGFbZGF0YU1hcC5kaWZmaWN1bHR5LnRvTG93ZXJDYXNlKCldLnB1c2goZGF0YU1hcCk7XG4gICAgICAgIGxldCBkYXRhVG9TZXQgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJsZWV0Q29kZUV4dGVuc2lvbkRldGFpbHNcIiwgZGF0YVRvU2V0KTtcbiAgICB9XG4gICAgYWxlcnQoXCJTYXZlZCFcIik7XG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyBzaG93R3JhcGg6IHRydWUgfSk7XG59XG5mdW5jdGlvbiBzYXZlRGF0YSgpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB5aWVsZCByZXNldCgpO1xuICAgICAgICBpZiAoIWxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibGVldENvZGVFeHRlbnNpb25EZXRhaWxzXCIpKSB7XG4gICAgICAgICAgICBzZXRJbml0aWFsRGF0YSgpO1xuICAgICAgICAgICAgc2V0RGF0YSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2V0RGF0YSgpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5mdW5jdGlvbiBzZXRJbml0aWFsRGF0YSgpIHtcbiAgICB2YXIgcHJvYmxlbURldGFpbHMgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGVhc3k6IFtdLFxuICAgICAgICBtZWRpdW06IFtdLFxuICAgICAgICBoYXJkOiBbXSxcbiAgICB9KTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImxlZXRDb2RlRXh0ZW5zaW9uRGV0YWlsc1wiLCBwcm9ibGVtRGV0YWlscyk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8vIENvbnZlcnRzIHRoZSBnaXZlbiBpbmRpdmlkdXZhbCB0aW1lIHBhcnRzIHRvIGh1bWFuIHJlYWRhYmxlIGZvcm1cbmZ1bmN0aW9uIGdldFRpbWVhc1N0cmluZyhzZWNvbmRzLCBtaW5zLCBob3Vycykge1xuICAgIGlmIChob3VycyA+IDAgJiYgbWlucyA+IDApIHtcbiAgICAgICAgcmV0dXJuIGAke25vcm1hbGl6ZShob3Vycyl9aHIgJHtub3JtYWxpemUobWlucyl9bWludXRlc2A7XG4gICAgfVxuICAgIGVsc2UgaWYgKGhvdXJzID4gMCkge1xuICAgICAgICByZXR1cm4gYCR7bm9ybWFsaXplKGhvdXJzKX0gaG91cmA7XG4gICAgfVxuICAgIGVsc2UgaWYgKG1pbnMgPiAwKSB7XG4gICAgICAgIHJldHVybiBgJHtub3JtYWxpemUobWlucyl9IG1pbnV0ZXNgO1xuICAgIH1cbiAgICBlbHNlIGlmIChzZWNvbmRzID4gMCkge1xuICAgICAgICByZXR1cm4gYCR7bm9ybWFsaXplKHNlY29uZHMpfSBzZWNvbmRzYDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiAnMCBzZWNvbmRzICg6KDonO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0VGltZWFzU3RyaW5nID0gZ2V0VGltZWFzU3RyaW5nO1xuLy8gUmVtb3ZlcyB0cmFpbGluZyB6ZXJvZXMgZnJvbSB0aGUgVGltZVN0YW1wXG5mdW5jdGlvbiBub3JtYWxpemUobnVtKSB7XG4gICAgbGV0IG4gPSBNYXRoLmZsb29yKG51bSk7XG4gICAgcmV0dXJuIG47XG59XG5leHBvcnRzLm5vcm1hbGl6ZSA9IG5vcm1hbGl6ZTtcbiJdLCJzb3VyY2VSb290IjoiIn0=