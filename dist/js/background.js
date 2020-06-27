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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tncm91bmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGYTtBQUNiO0FBQ0EsMkJBQTJCLCtEQUErRCxnQkFBZ0IsRUFBRSxFQUFFO0FBQzlHO0FBQ0EsbUNBQW1DLE1BQU0sNkJBQTZCLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDakcsa0NBQWtDLE1BQU0saUNBQWlDLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDcEcsK0JBQStCLHFGQUFxRjtBQUNwSDtBQUNBLEtBQUs7QUFDTDtBQUNBLDhDQUE4QyxjQUFjO0FBQzVELGtCQUFrQixtQkFBTyxDQUFDLG1DQUFXO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsbUJBQW1CO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsdUJBQXVCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGdCQUFnQjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsZ0JBQWdCO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsbUJBQW1CO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsV0FBVztBQUNsRCw4Q0FBOEMsZ0JBQWdCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQ7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsMEJBQTBCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLGtCQUFrQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOzs7Ozs7Ozs7Ozs7O0FDMU5hO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGlCQUFpQixLQUFLLGdCQUFnQjtBQUN4RDtBQUNBO0FBQ0Esa0JBQWtCLGlCQUFpQjtBQUNuQztBQUNBO0FBQ0Esa0JBQWtCLGdCQUFnQjtBQUNsQztBQUNBO0FBQ0Esa0JBQWtCLG1CQUFtQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2JhY2tncm91bmQudHNcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IGhlbHBlcnNfMSA9IHJlcXVpcmUoXCIuL2hlbHBlcnNcIik7XHJcbi8vIE92ZXJyaWRpbmcgQ3VzdG9tIFdpbmRvdyBPYmplY3QgU2luY2UgY2Fubm90IGFtIHVuYWJsZSB0byBleHRlbmQgdGhlIGRlZmF1bHQgd2luZG93IG9ialxyXG5sZXQgd2luZG93T2JqID0gd2luZG93O1xyXG5sZXQgdGltZVN0cmluZztcclxubGV0IGN1cnJlbnRVcmw7XHJcbmxldCBtaWxpc2VjID0gMDtcclxubGV0IHNlYyA9IDA7IC8qIGhvbGRzIGluY3JlbWVudGluZyB2YWx1ZSAqL1xyXG5sZXQgbWluID0gMDtcclxubGV0IGhvdXIgPSAwO1xyXG5sZXQgbWlsaVNlY091dCA9IDA7XHJcbmxldCBzZWNPdXQgPSAwO1xyXG5sZXQgbWluT3V0ID0gMDtcclxubGV0IGhvdXJPdXQgPSAwO1xyXG4vLyBTZXR0aW5nIFBvcHVwIGR5bmFtaWNhbGx5XHJcbmNocm9tZS5icm93c2VyQWN0aW9uLnNldEJhZGdlQmFja2dyb3VuZENvbG9yKHsgY29sb3I6IFwiIzVDQUQ2MlwiIH0pO1xyXG5jaHJvbWUudGFicy5vbkFjdGl2YXRlZC5hZGRMaXN0ZW5lcihmdW5jdGlvbiAoYWN0aXZlSW5mbykge1xyXG4gICAgY29uc3QgYWN0aXZlVGFiSWQgPSBhY3RpdmVJbmZvLnRhYklkO1xyXG4gICAgY2hyb21lLnRhYnMuZ2V0KGFjdGl2ZVRhYklkLCBmdW5jdGlvbiAodGFiKSB7XHJcbiAgICAgICAgY3VycmVudFVybCA9IHRhYi51cmw7XHJcbiAgICB9KTtcclxufSk7XHJcbi8vIFBlcnNpc3RpbmcgRGF0YSBTdHVmZnN0XHJcbmNvbnN0IHByb2JsZW0gPSB7fTtcclxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmN0aW9uIChyZXF1ZXN0LCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xyXG4gICAgaWYgKHJlcXVlc3QpIHtcclxuICAgICAgICBpZiAocmVxdWVzdC5hY3Rpb24gPT0gXCJzZXRQcm9ibGVtXCIpIHtcclxuICAgICAgICAgICAgcHJvYmxlbS5wcm9ibGVtTmFtZSA9IHJlcXVlc3QucGF5bG9hZC5wcm9ibGVtTmFtZTtcclxuICAgICAgICAgICAgcHJvYmxlbS5kaWZmaWN1bHR5ID0gcmVxdWVzdC5wYXlsb2FkLmRpZmZpY3VsdHk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHJlcXVlc3QuYWN0aW9uID09IFwiZ2V0UHJvYmxlbVwiKSB7XHJcbiAgICAgICAgICAgIHNlbmRSZXNwb25zZShwcm9ibGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAocmVxdWVzdC5hY3Rpb24gPT0gXCJzZXRUaW1lclwiKSB7XHJcbiAgICAgICAgICAgIHN0YXJ0U3RvcCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChyZXF1ZXN0LmFjdGlvbiA9PSBcImdldFRpbWVyXCIpIHtcclxuICAgICAgICAgICAgc2VuZFJlc3BvbnNlKHsgc3RhcnRzdG9wOiBzdGFydHN0b3AgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHJlcXVlc3QuYWN0aW9uID09PSAnZ2V0Q3VycmVudFRpbWUnKSB7XHJcbiAgICAgICAgICAgIHNlbmRSZXNwb25zZSh7XHJcbiAgICAgICAgICAgICAgICBtaWxpU2VjT3V0OiBtaWxpU2VjT3V0LFxyXG4gICAgICAgICAgICAgICAgaG91ck91dDogaG91ck91dCxcclxuICAgICAgICAgICAgICAgIHNlY091dDogc2VjT3V0LFxyXG4gICAgICAgICAgICAgICAgbWluT3V0OiBtaW5PdXRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuLy8gVXBkYXRpbmcgVGltZXIgU3R1ZmZzXHJcbmxldCBzdGFydHN0b3AgPSAwO1xyXG5sZXQgeDtcclxuLyogVG9nZ2xlIFN0YXJ0U3RvcCAqL1xyXG5mdW5jdGlvbiBzdGFydFN0b3AoKSB7XHJcbiAgICBzdGFydHN0b3AgPSBzdGFydHN0b3AgKyAxO1xyXG4gICAgbGV0IGRvY3VtZW50ID0gY2hyb21lLmV4dGVuc2lvbi5nZXRWaWV3cyh7IHR5cGU6IFwicG9wdXBcIiB9KVswXS5kb2N1bWVudDtcclxuICAgIGlmIChzdGFydHN0b3AgPT0gMSkge1xyXG4gICAgICAgIHN0YXJ0VGltZXIoKTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0XCIpLmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cIm1hdGVyaWFsLWljb25zIG1hdGVyaWFsLWljb25zLW91dGxpbmVkXCI+cGF1c2U8L3NwYW4+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJidG4tdHh0XCI+UGF1c2U8L3NwYW4+YDtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHN0YXJ0c3RvcCA9PSAyKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydFwiKS5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1pY29ucyBtYXRlcmlhbC1pY29ucy1vdXRsaW5lZFwiPmFycm93X2ZvcndhcmRfaW9zIDwvc3Bhbj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImJ0bi10eHRcIj5TdGFydDwvc3Bhbj5gO1xyXG4gICAgICAgIHN0YXJ0c3RvcCA9IDA7XHJcbiAgICAgICAgc3RvcFRpbWVyKCk7XHJcbiAgICB9XHJcbn1cclxuLy8gQ3JlYXRpbmcgbXkgQ3VzdG9tIFdpbmRvdyBvYmplY3Qgc2luY2UgVHlwZXNjcmlwdCBkb2VzbnQgYWxsb3cgbXVjaCBmbGV4aWJsaXR5XHJcbndpbmRvd09iai5zdGFydFN0b3AgPSBzdGFydFN0b3A7XHJcbndpbmRvd09iai5yZXNldEZ1bmMgPSByZXNldDtcclxud2luZG93T2JqLnNhdmVEYXRhID0gc2F2ZURhdGE7XHJcbi8vU3RhcnRzIHRoZSBUaW1lclxyXG5mdW5jdGlvbiBzdGFydFRpbWVyKCkge1xyXG4gICAgeCA9IHNldEludGVydmFsKHRpbWVyLCAxMCk7XHJcbn1cclxuLy8gU3RvcHMgdGhlIHRpbWVyXHJcbmZ1bmN0aW9uIHN0b3BUaW1lcigpIHtcclxuICAgIGNsZWFySW50ZXJ2YWwoeCk7XHJcbn1cclxuLy8gRGVjbGFyaW5nIFZhcmlhYmxlc1xyXG4vLyBEcml2ZXIgZm9yIFRpbWVyXHJcbmZ1bmN0aW9uIHRpbWVyKCkge1xyXG4gICAgbGV0IHBvcHVwID0gY2hyb21lLmV4dGVuc2lvbi5nZXRWaWV3cyh7IHR5cGU6IFwicG9wdXBcIiB9KVswXTtcclxuICAgIGxldCBkb2N1bWVudCA9IHBvcHVwICYmIHBvcHVwLmRvY3VtZW50O1xyXG4gICAgbWlsaVNlY091dCA9IGNoZWNrVGltZShtaWxpc2VjKTtcclxuICAgIHNlY091dCA9IGNoZWNrVGltZShzZWMpO1xyXG4gICAgbWluT3V0ID0gY2hlY2tUaW1lKG1pbik7XHJcbiAgICBob3VyT3V0ID0gY2hlY2tUaW1lKGhvdXIpO1xyXG4gICAgbWlsaXNlYyA9ICsrbWlsaXNlYztcclxuICAgIGlmIChtaWxpc2VjID09PSAxMDApIHtcclxuICAgICAgICBtaWxpc2VjID0gMDtcclxuICAgICAgICBzZWMgPSArK3NlYztcclxuICAgIH1cclxuICAgIGlmIChzZWMgPT0gNjApIHtcclxuICAgICAgICBtaW4gPSArK21pbjtcclxuICAgICAgICBzZWMgPSAwO1xyXG4gICAgfVxyXG4gICAgaWYgKG1pbiA9PSA2MCkge1xyXG4gICAgICAgIG1pbiA9IDA7XHJcbiAgICAgICAgaG91ciA9ICsraG91cjtcclxuICAgIH1cclxuICAgIC8vIFVwZGF0ZXMgRE9NXHJcbiAgICAvKlxyXG4gICAgV2hlbiB0aGUgUG9wdXAgaXMgY2xvc2VkIGJhY2tncm91bmQgZG9lcydudCBoYXZlIHJlZmVyZW5jZSB0byB0aGUgUG9wdXAnc1xyXG4gICAgZG9jdW1lbnQgb2JqZWN0ICB3ZSBubyBuZWVkIHRvIHJlbmRlciB3aGVuIHRoZSBwb3B1cCBpcyBub3Qgb3BlbmVkXHJcbiAgXHJcbiAgXHJcbiAgICAqL1xyXG4gICAgaWYgKGRvY3VtZW50KSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtaWxpc2VjXCIpLmlubmVySFRNTCA9IG1pbGlTZWNPdXQudG9TdHJpbmcoKTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlY1wiKS5pbm5lckhUTUwgPSBzZWNPdXQudG9TdHJpbmcoKTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1pblwiKS5pbm5lckhUTUwgPSBtaW5PdXQudG9TdHJpbmcoKTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdXJcIikuaW5uZXJIVE1MID0gaG91ck91dC50b1N0cmluZygpO1xyXG4gICAgfVxyXG4gICAgLy8gVXBkYXRlIHRoZSBiYWRnZSBUZXh0XHJcbiAgICB0aW1lU3RyaW5nID0gaGVscGVyc18xLmdldFRpbWVhc1N0cmluZyhzZWNPdXQsIG1pbk91dCwgaG91ck91dCk7XHJcbiAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRCYWRnZVRleHQoeyB0ZXh0OiB0aW1lU3RyaW5nIH0pO1xyXG59XHJcbi8vIENoZWNrcyB0aW1lIHRvIGFkZCAwIG9yIG5vdFxyXG5mdW5jdGlvbiBjaGVja1RpbWUoaSkge1xyXG4gICAgaWYgKGkgPCAxMCkge1xyXG4gICAgICAgIGkgPSBcIjBcIiArIGk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaTtcclxufVxyXG4vLyBSZXNldHMgdGhlIHRpbWVyXHJcbmZ1bmN0aW9uIHJlc2V0KCkge1xyXG4gICAgc3RvcFRpbWVyKCk7XHJcbiAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRCYWRnZVRleHQoeyB0ZXh0OiBcIlwiIH0pO1xyXG4gICAgbGV0IGRvY3VtZW50ID0gY2hyb21lLmV4dGVuc2lvbi5nZXRWaWV3cyh7IHR5cGU6IFwicG9wdXBcIiB9KVswXS5kb2N1bWVudDtcclxuICAgIC8qUmVzZXQqL1xyXG4gICAgc3RhcnRzdG9wID0gMDtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnRcIikuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgbWF0ZXJpYWwtaWNvbnMtb3V0bGluZWRcIj5hcnJvd19mb3J3YXJkX2lvcyA8L3NwYW4+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJidG4tdHh0XCI+U3RhcnQ8L3NwYW4+YDtcclxuICAgIG1pbGlzZWMgPSAwO1xyXG4gICAgc2VjID0gMDtcclxuICAgIG1pbiA9IDA7XHJcbiAgICBob3VyID0gMDtcclxuICAgIG1pbGlTZWNPdXQgPSAwO1xyXG4gICAgaG91ck91dCA9IDA7XHJcbiAgICBtaW5PdXQgPSAwO1xyXG4gICAgc2VjT3V0ID0gMDtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWlsaXNlY1wiKS5pbm5lckhUTUwgPSBcIjAwXCI7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlY1wiKS5pbm5lckhUTUwgPSBcIjAwXCI7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1pblwiKS5pbm5lckhUTUwgPSBcIjAwXCI7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdXJcIikuaW5uZXJIVE1MID0gXCIwMFwiO1xyXG59XHJcbmZ1bmN0aW9uIHNldERhdGEoKSB7XHJcbiAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJsZWV0Q29kZUV4dGVuc2lvbkRldGFpbHNcIikpO1xyXG4gICAgbGV0IHRvZGF5ID0gbmV3IERhdGUoKTtcclxuICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgbGV0IGRkID0gU3RyaW5nKHRvZGF5LmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG4gICAgLy9AdHMtaWdub3JlXHJcbiAgICBsZXQgbW0gPSBTdHJpbmcodG9kYXkuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsIFwiMFwiKTsgLy9KYW51YXJ5IGlzIDAhXHJcbiAgICBsZXQgeXl5eSA9IHRvZGF5LmdldEZ1bGxZZWFyKCk7XHJcbiAgICBjb25zdCB0b2RheVN0cmluZyA9IGRkICsgXCIvXCIgKyBtbSArIFwiL1wiICsgeXl5eTtcclxuICAgIGNvbnN0IHByb2JsZW1OYW1lID0gcHJvYmxlbS5wcm9ibGVtTmFtZS5zcGxpdChcIi5cIilbMV07XHJcbiAgICBjb25zdCBkYXRhTWFwID0ge1xyXG4gICAgICAgIHByb2JsZW1OYW1lOiBwcm9ibGVtTmFtZSxcclxuICAgICAgICBkaWZmaWN1bHR5OiBwcm9ibGVtLmRpZmZpY3VsdHksXHJcbiAgICAgICAgdGltZVRha2VuOiB0aW1lU3RyaW5nLFxyXG4gICAgICAgIGRhdGU6IHRvZGF5U3RyaW5nLFxyXG4gICAgICAgIHByb2JsZW1Vcmw6IGN1cnJlbnRVcmwsXHJcbiAgICB9O1xyXG4gICAgbGV0IGN1cnJlbnREaWZmUHJvYmxlbUFycmF5ID0gZGF0YVtwcm9ibGVtLmRpZmZpY3VsdHkudG9Mb3dlckNhc2UoKV07XHJcbiAgICBsZXQgZXhpc3RzID0gY3VycmVudERpZmZQcm9ibGVtQXJyYXkuZmlsdGVyKChpdGVtKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW0ucHJvYmxlbU5hbWUgPT09IHByb2JsZW1OYW1lO1xyXG4gICAgfSk7XHJcbiAgICBsZXQgcHJvYmxlbU9iaiA9IGV4aXN0c1swXTtcclxuICAgIGlmIChleGlzdHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIC8vIGRhdGFNYXAucHJvYmxlbU5hbWUgKz0gIHByb2JsZW1PYmouZHVwbGljYXRlSW5kZXgudG9TdHJpbmcoKTtcclxuICAgICAgICBwcm9ibGVtT2JqLmR1cGxpY2F0ZUluZGV4ICs9IDE7XHJcbiAgICAgICAgY29uc3QgaXRlbVRvRmluZCA9IChpdGVtKSA9PiBpdGVtLnByb2JsZW1OYW1lID09IGRhdGFNYXAucHJvYmxlbU5hbWU7XHJcbiAgICAgICAgbGV0IGlkeCA9IGN1cnJlbnREaWZmUHJvYmxlbUFycmF5LmZpbmRJbmRleChpdGVtVG9GaW5kKTtcclxuICAgICAgICBkYXRhW3Byb2JsZW0uZGlmZmljdWx0eS50b0xvd2VyQ2FzZSgpXVtpZHhdID0gcHJvYmxlbU9iajtcclxuICAgICAgICBkYXRhTWFwLnByb2JsZW1OYW1lICs9IGAgKCR7cHJvYmxlbU9iai5kdXBsaWNhdGVJbmRleH0pYDtcclxuICAgICAgICBkYXRhW3Byb2JsZW1PYmouZGlmZmljdWx0eS50b0xvd2VyQ2FzZSgpXS5wdXNoKGRhdGFNYXApO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibGVldENvZGVFeHRlbnNpb25EZXRhaWxzXCIsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGRhdGFNYXAuZHVwbGljYXRlSW5kZXggPSAwO1xyXG4gICAgICAgIGRhdGFbZGF0YU1hcC5kaWZmaWN1bHR5LnRvTG93ZXJDYXNlKCldLnB1c2goZGF0YU1hcCk7XHJcbiAgICAgICAgbGV0IGRhdGFUb1NldCA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibGVldENvZGVFeHRlbnNpb25EZXRhaWxzXCIsIGRhdGFUb1NldCk7XHJcbiAgICB9XHJcbiAgICBhbGVydChcIlNhdmVkIVwiKTtcclxuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgc2hvd0dyYXBoOiB0cnVlIH0pO1xyXG59XHJcbmZ1bmN0aW9uIHNhdmVEYXRhKCkge1xyXG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICB5aWVsZCByZXNldCgpO1xyXG4gICAgICAgIGlmICghbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJsZWV0Q29kZUV4dGVuc2lvbkRldGFpbHNcIikpIHtcclxuICAgICAgICAgICAgc2V0SW5pdGlhbERhdGEoKTtcclxuICAgICAgICAgICAgc2V0RGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgc2V0RGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbmZ1bmN0aW9uIHNldEluaXRpYWxEYXRhKCkge1xyXG4gICAgdmFyIHByb2JsZW1EZXRhaWxzID0gSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgIGVhc3k6IFtdLFxyXG4gICAgICAgIG1lZGl1bTogW10sXHJcbiAgICAgICAgaGFyZDogW10sXHJcbiAgICB9KTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibGVldENvZGVFeHRlbnNpb25EZXRhaWxzXCIsIHByb2JsZW1EZXRhaWxzKTtcclxufVxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG4vLyBDb252ZXJ0cyB0aGUgZ2l2ZW4gaW5kaXZpZHV2YWwgdGltZSBwYXJ0cyB0byBodW1hbiByZWFkYWJsZSBmb3JtXHJcbmZ1bmN0aW9uIGdldFRpbWVhc1N0cmluZyhzZWNvbmRzLCBtaW5zLCBob3Vycykge1xyXG4gICAgaWYgKGhvdXJzID4gMCAmJiBtaW5zID4gMCkge1xyXG4gICAgICAgIHJldHVybiBgJHtub3JtYWxpemUoaG91cnMpfWhyICR7bm9ybWFsaXplKG1pbnMpfW1pbnV0ZXNgO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaG91cnMgPiAwKSB7XHJcbiAgICAgICAgcmV0dXJuIGAke25vcm1hbGl6ZShob3Vycyl9IGhvdXJgO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAobWlucyA+IDApIHtcclxuICAgICAgICByZXR1cm4gYCR7bm9ybWFsaXplKG1pbnMpfSBtaW51dGVzYDtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHNlY29uZHMgPiAwKSB7XHJcbiAgICAgICAgcmV0dXJuIGAke25vcm1hbGl6ZShzZWNvbmRzKX0gc2Vjb25kc2A7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gJzAgc2Vjb25kcyAoOig6JztcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmdldFRpbWVhc1N0cmluZyA9IGdldFRpbWVhc1N0cmluZztcclxuLy8gUmVtb3ZlcyB0cmFpbGluZyB6ZXJvZXMgZnJvbSB0aGUgVGltZVN0YW1wXHJcbmZ1bmN0aW9uIG5vcm1hbGl6ZShudW0pIHtcclxuICAgIGxldCBuID0gTWF0aC5mbG9vcihudW0pO1xyXG4gICAgcmV0dXJuIG47XHJcbn1cclxuZXhwb3J0cy5ub3JtYWxpemUgPSBub3JtYWxpemU7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=