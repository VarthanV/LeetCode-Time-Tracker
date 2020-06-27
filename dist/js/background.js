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
    document.getElementById("start").innerHTML = "Start";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tncm91bmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGYTtBQUNiO0FBQ0EsMkJBQTJCLCtEQUErRCxnQkFBZ0IsRUFBRSxFQUFFO0FBQzlHO0FBQ0EsbUNBQW1DLE1BQU0sNkJBQTZCLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDakcsa0NBQWtDLE1BQU0saUNBQWlDLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDcEcsK0JBQStCLHFGQUFxRjtBQUNwSDtBQUNBLEtBQUs7QUFDTDtBQUNBLDhDQUE4QyxjQUFjO0FBQzVELGtCQUFrQixtQkFBTyxDQUFDLG1DQUFXO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsbUJBQW1CO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsdUJBQXVCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGdCQUFnQjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsZ0JBQWdCO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsbUJBQW1CO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsV0FBVztBQUNsRCw4Q0FBOEMsZ0JBQWdCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkRBQTJEO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLDBCQUEwQjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxrQkFBa0I7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3pOYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixpQkFBaUIsS0FBSyxnQkFBZ0I7QUFDeEQ7QUFDQTtBQUNBLGtCQUFrQixpQkFBaUI7QUFDbkM7QUFDQTtBQUNBLGtCQUFrQixnQkFBZ0I7QUFDbEM7QUFDQTtBQUNBLGtCQUFrQixtQkFBbUI7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJhY2tncm91bmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9iYWNrZ3JvdW5kLnRzXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBoZWxwZXJzXzEgPSByZXF1aXJlKFwiLi9oZWxwZXJzXCIpO1xyXG4vLyBPdmVycmlkaW5nIEN1c3RvbSBXaW5kb3cgT2JqZWN0IFNpbmNlIGNhbm5vdCBhbSB1bmFibGUgdG8gZXh0ZW5kIHRoZSBkZWZhdWx0IHdpbmRvdyBvYmpcclxubGV0IHdpbmRvd09iaiA9IHdpbmRvdztcclxubGV0IHRpbWVTdHJpbmc7XHJcbmxldCBjdXJyZW50VXJsO1xyXG5sZXQgbWlsaXNlYyA9IDA7XHJcbmxldCBzZWMgPSAwOyAvKiBob2xkcyBpbmNyZW1lbnRpbmcgdmFsdWUgKi9cclxubGV0IG1pbiA9IDA7XHJcbmxldCBob3VyID0gMDtcclxubGV0IG1pbGlTZWNPdXQgPSAwO1xyXG5sZXQgc2VjT3V0ID0gMDtcclxubGV0IG1pbk91dCA9IDA7XHJcbmxldCBob3VyT3V0ID0gMDtcclxuLy8gU2V0dGluZyBQb3B1cCBkeW5hbWljYWxseVxyXG5jaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRCYWRnZUJhY2tncm91bmRDb2xvcih7IGNvbG9yOiBcIiM1Q0FENjJcIiB9KTtcclxuY2hyb21lLnRhYnMub25BY3RpdmF0ZWQuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKGFjdGl2ZUluZm8pIHtcclxuICAgIGNvbnN0IGFjdGl2ZVRhYklkID0gYWN0aXZlSW5mby50YWJJZDtcclxuICAgIGNocm9tZS50YWJzLmdldChhY3RpdmVUYWJJZCwgZnVuY3Rpb24gKHRhYikge1xyXG4gICAgICAgIGN1cnJlbnRVcmwgPSB0YWIudXJsO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4vLyBQZXJzaXN0aW5nIERhdGEgU3R1ZmZzdFxyXG5jb25zdCBwcm9ibGVtID0ge307XHJcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbiAocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcclxuICAgIGlmIChyZXF1ZXN0KSB7XHJcbiAgICAgICAgaWYgKHJlcXVlc3QuYWN0aW9uID09IFwic2V0UHJvYmxlbVwiKSB7XHJcbiAgICAgICAgICAgIHByb2JsZW0ucHJvYmxlbU5hbWUgPSByZXF1ZXN0LnBheWxvYWQucHJvYmxlbU5hbWU7XHJcbiAgICAgICAgICAgIHByb2JsZW0uZGlmZmljdWx0eSA9IHJlcXVlc3QucGF5bG9hZC5kaWZmaWN1bHR5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChyZXF1ZXN0LmFjdGlvbiA9PSBcImdldFByb2JsZW1cIikge1xyXG4gICAgICAgICAgICBzZW5kUmVzcG9uc2UocHJvYmxlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHJlcXVlc3QuYWN0aW9uID09IFwic2V0VGltZXJcIikge1xyXG4gICAgICAgICAgICBzdGFydFN0b3AoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAocmVxdWVzdC5hY3Rpb24gPT0gXCJnZXRUaW1lclwiKSB7XHJcbiAgICAgICAgICAgIHNlbmRSZXNwb25zZSh7IHN0YXJ0c3RvcDogc3RhcnRzdG9wIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChyZXF1ZXN0LmFjdGlvbiA9PT0gJ2dldEN1cnJlbnRUaW1lJykge1xyXG4gICAgICAgICAgICBzZW5kUmVzcG9uc2Uoe1xyXG4gICAgICAgICAgICAgICAgbWlsaVNlY091dDogbWlsaVNlY091dCxcclxuICAgICAgICAgICAgICAgIGhvdXJPdXQ6IGhvdXJPdXQsXHJcbiAgICAgICAgICAgICAgICBzZWNPdXQ6IHNlY091dCxcclxuICAgICAgICAgICAgICAgIG1pbk91dDogbWluT3V0XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcbi8vIFVwZGF0aW5nIFRpbWVyIFN0dWZmc1xyXG5sZXQgc3RhcnRzdG9wID0gMDtcclxubGV0IHg7XHJcbi8qIFRvZ2dsZSBTdGFydFN0b3AgKi9cclxuZnVuY3Rpb24gc3RhcnRTdG9wKCkge1xyXG4gICAgc3RhcnRzdG9wID0gc3RhcnRzdG9wICsgMTtcclxuICAgIGxldCBkb2N1bWVudCA9IGNocm9tZS5leHRlbnNpb24uZ2V0Vmlld3MoeyB0eXBlOiBcInBvcHVwXCIgfSlbMF0uZG9jdW1lbnQ7XHJcbiAgICBpZiAoc3RhcnRzdG9wID09IDEpIHtcclxuICAgICAgICBzdGFydFRpbWVyKCk7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydFwiKS5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1pY29ucyBtYXRlcmlhbC1pY29ucy1vdXRsaW5lZFwiPnBhdXNlPC9zcGFuPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYnRuLXR4dFwiPlBhdXNlPC9zcGFuPmA7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChzdGFydHN0b3AgPT0gMikge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnRcIikuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgbWF0ZXJpYWwtaWNvbnMtb3V0bGluZWRcIj5hcnJvd19mb3J3YXJkX2lvcyA8L3NwYW4+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJidG4tdHh0XCI+U3RhcnQ8L3NwYW4+YDtcclxuICAgICAgICBzdGFydHN0b3AgPSAwO1xyXG4gICAgICAgIHN0b3BUaW1lcigpO1xyXG4gICAgfVxyXG59XHJcbi8vIENyZWF0aW5nIG15IEN1c3RvbSBXaW5kb3cgb2JqZWN0IHNpbmNlIFR5cGVzY3JpcHQgZG9lc250IGFsbG93IG11Y2ggZmxleGlibGl0eVxyXG53aW5kb3dPYmouc3RhcnRTdG9wID0gc3RhcnRTdG9wO1xyXG53aW5kb3dPYmoucmVzZXRGdW5jID0gcmVzZXQ7XHJcbndpbmRvd09iai5zYXZlRGF0YSA9IHNhdmVEYXRhO1xyXG4vL1N0YXJ0cyB0aGUgVGltZXJcclxuZnVuY3Rpb24gc3RhcnRUaW1lcigpIHtcclxuICAgIHggPSBzZXRJbnRlcnZhbCh0aW1lciwgMTApO1xyXG59XHJcbi8vIFN0b3BzIHRoZSB0aW1lclxyXG5mdW5jdGlvbiBzdG9wVGltZXIoKSB7XHJcbiAgICBjbGVhckludGVydmFsKHgpO1xyXG59XHJcbi8vIERlY2xhcmluZyBWYXJpYWJsZXNcclxuLy8gRHJpdmVyIGZvciBUaW1lclxyXG5mdW5jdGlvbiB0aW1lcigpIHtcclxuICAgIGxldCBwb3B1cCA9IGNocm9tZS5leHRlbnNpb24uZ2V0Vmlld3MoeyB0eXBlOiBcInBvcHVwXCIgfSlbMF07XHJcbiAgICBsZXQgZG9jdW1lbnQgPSBwb3B1cCAmJiBwb3B1cC5kb2N1bWVudDtcclxuICAgIG1pbGlTZWNPdXQgPSBjaGVja1RpbWUobWlsaXNlYyk7XHJcbiAgICBzZWNPdXQgPSBjaGVja1RpbWUoc2VjKTtcclxuICAgIG1pbk91dCA9IGNoZWNrVGltZShtaW4pO1xyXG4gICAgaG91ck91dCA9IGNoZWNrVGltZShob3VyKTtcclxuICAgIG1pbGlzZWMgPSArK21pbGlzZWM7XHJcbiAgICBpZiAobWlsaXNlYyA9PT0gMTAwKSB7XHJcbiAgICAgICAgbWlsaXNlYyA9IDA7XHJcbiAgICAgICAgc2VjID0gKytzZWM7XHJcbiAgICB9XHJcbiAgICBpZiAoc2VjID09IDYwKSB7XHJcbiAgICAgICAgbWluID0gKyttaW47XHJcbiAgICAgICAgc2VjID0gMDtcclxuICAgIH1cclxuICAgIGlmIChtaW4gPT0gNjApIHtcclxuICAgICAgICBtaW4gPSAwO1xyXG4gICAgICAgIGhvdXIgPSArK2hvdXI7XHJcbiAgICB9XHJcbiAgICAvLyBVcGRhdGVzIERPTVxyXG4gICAgLypcclxuICAgIFdoZW4gdGhlIFBvcHVwIGlzIGNsb3NlZCBiYWNrZ3JvdW5kIGRvZXMnbnQgaGF2ZSByZWZlcmVuY2UgdG8gdGhlIFBvcHVwJ3NcclxuICAgIGRvY3VtZW50IG9iamVjdCAgd2Ugbm8gbmVlZCB0byByZW5kZXIgd2hlbiB0aGUgcG9wdXAgaXMgbm90IG9wZW5lZFxyXG4gIFxyXG4gIFxyXG4gICAgKi9cclxuICAgIGlmIChkb2N1bWVudCkge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWlsaXNlY1wiKS5pbm5lckhUTUwgPSBtaWxpU2VjT3V0LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWNcIikuaW5uZXJIVE1MID0gc2VjT3V0LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtaW5cIikuaW5uZXJIVE1MID0gbWluT3V0LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3VyXCIpLmlubmVySFRNTCA9IGhvdXJPdXQudG9TdHJpbmcoKTtcclxuICAgIH1cclxuICAgIC8vIFVwZGF0ZSB0aGUgYmFkZ2UgVGV4dFxyXG4gICAgdGltZVN0cmluZyA9IGhlbHBlcnNfMS5nZXRUaW1lYXNTdHJpbmcoc2VjT3V0LCBtaW5PdXQsIGhvdXJPdXQpO1xyXG4gICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0QmFkZ2VUZXh0KHsgdGV4dDogdGltZVN0cmluZyB9KTtcclxufVxyXG4vLyBDaGVja3MgdGltZSB0byBhZGQgMCBvciBub3RcclxuZnVuY3Rpb24gY2hlY2tUaW1lKGkpIHtcclxuICAgIGlmIChpIDwgMTApIHtcclxuICAgICAgICBpID0gXCIwXCIgKyBpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGk7XHJcbn1cclxuLy8gUmVzZXRzIHRoZSB0aW1lclxyXG5mdW5jdGlvbiByZXNldCgpIHtcclxuICAgIHN0b3BUaW1lcigpO1xyXG4gICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0QmFkZ2VUZXh0KHsgdGV4dDogXCJcIiB9KTtcclxuICAgIGxldCBkb2N1bWVudCA9IGNocm9tZS5leHRlbnNpb24uZ2V0Vmlld3MoeyB0eXBlOiBcInBvcHVwXCIgfSlbMF0uZG9jdW1lbnQ7XHJcbiAgICAvKlJlc2V0Ki9cclxuICAgIHN0YXJ0c3RvcCA9IDA7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0XCIpLmlubmVySFRNTCA9IFwiU3RhcnRcIjtcclxuICAgIG1pbGlzZWMgPSAwO1xyXG4gICAgc2VjID0gMDtcclxuICAgIG1pbiA9IDA7XHJcbiAgICBob3VyID0gMDtcclxuICAgIG1pbGlTZWNPdXQgPSAwO1xyXG4gICAgaG91ck91dCA9IDA7XHJcbiAgICBtaW5PdXQgPSAwO1xyXG4gICAgc2VjT3V0ID0gMDtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWlsaXNlY1wiKS5pbm5lckhUTUwgPSBcIjAwXCI7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlY1wiKS5pbm5lckhUTUwgPSBcIjAwXCI7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1pblwiKS5pbm5lckhUTUwgPSBcIjAwXCI7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdXJcIikuaW5uZXJIVE1MID0gXCIwMFwiO1xyXG59XHJcbmZ1bmN0aW9uIHNldERhdGEoKSB7XHJcbiAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJsZWV0Q29kZUV4dGVuc2lvbkRldGFpbHNcIikpO1xyXG4gICAgbGV0IHRvZGF5ID0gbmV3IERhdGUoKTtcclxuICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgbGV0IGRkID0gU3RyaW5nKHRvZGF5LmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG4gICAgLy9AdHMtaWdub3JlXHJcbiAgICBsZXQgbW0gPSBTdHJpbmcodG9kYXkuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsIFwiMFwiKTsgLy9KYW51YXJ5IGlzIDAhXHJcbiAgICBsZXQgeXl5eSA9IHRvZGF5LmdldEZ1bGxZZWFyKCk7XHJcbiAgICBjb25zdCB0b2RheVN0cmluZyA9IGRkICsgXCIvXCIgKyBtbSArIFwiL1wiICsgeXl5eTtcclxuICAgIGNvbnN0IHByb2JsZW1OYW1lID0gcHJvYmxlbS5wcm9ibGVtTmFtZS5zcGxpdChcIi5cIilbMV07XHJcbiAgICBjb25zdCBkYXRhTWFwID0ge1xyXG4gICAgICAgIHByb2JsZW1OYW1lOiBwcm9ibGVtTmFtZSxcclxuICAgICAgICBkaWZmaWN1bHR5OiBwcm9ibGVtLmRpZmZpY3VsdHksXHJcbiAgICAgICAgdGltZVRha2VuOiB0aW1lU3RyaW5nLFxyXG4gICAgICAgIGRhdGU6IHRvZGF5U3RyaW5nLFxyXG4gICAgICAgIHByb2JsZW1Vcmw6IGN1cnJlbnRVcmwsXHJcbiAgICB9O1xyXG4gICAgbGV0IGN1cnJlbnREaWZmUHJvYmxlbUFycmF5ID0gZGF0YVtwcm9ibGVtLmRpZmZpY3VsdHkudG9Mb3dlckNhc2UoKV07XHJcbiAgICBsZXQgZXhpc3RzID0gY3VycmVudERpZmZQcm9ibGVtQXJyYXkuZmlsdGVyKChpdGVtKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW0ucHJvYmxlbU5hbWUgPT09IHByb2JsZW1OYW1lO1xyXG4gICAgfSk7XHJcbiAgICBsZXQgcHJvYmxlbU9iaiA9IGV4aXN0c1swXTtcclxuICAgIGlmIChleGlzdHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIC8vIGRhdGFNYXAucHJvYmxlbU5hbWUgKz0gIHByb2JsZW1PYmouZHVwbGljYXRlSW5kZXgudG9TdHJpbmcoKTtcclxuICAgICAgICBwcm9ibGVtT2JqLmR1cGxpY2F0ZUluZGV4ICs9IDE7XHJcbiAgICAgICAgY29uc3QgaXRlbVRvRmluZCA9IChpdGVtKSA9PiBpdGVtLnByb2JsZW1OYW1lID09IGRhdGFNYXAucHJvYmxlbU5hbWU7XHJcbiAgICAgICAgbGV0IGlkeCA9IGN1cnJlbnREaWZmUHJvYmxlbUFycmF5LmZpbmRJbmRleChpdGVtVG9GaW5kKTtcclxuICAgICAgICBkYXRhW3Byb2JsZW0uZGlmZmljdWx0eS50b0xvd2VyQ2FzZSgpXVtpZHhdID0gcHJvYmxlbU9iajtcclxuICAgICAgICBkYXRhTWFwLnByb2JsZW1OYW1lICs9IGAgKCR7cHJvYmxlbU9iai5kdXBsaWNhdGVJbmRleH0pYDtcclxuICAgICAgICBkYXRhW3Byb2JsZW1PYmouZGlmZmljdWx0eS50b0xvd2VyQ2FzZSgpXS5wdXNoKGRhdGFNYXApO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibGVldENvZGVFeHRlbnNpb25EZXRhaWxzXCIsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGRhdGFNYXAuZHVwbGljYXRlSW5kZXggPSAwO1xyXG4gICAgICAgIGRhdGFbZGF0YU1hcC5kaWZmaWN1bHR5LnRvTG93ZXJDYXNlKCldLnB1c2goZGF0YU1hcCk7XHJcbiAgICAgICAgbGV0IGRhdGFUb1NldCA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibGVldENvZGVFeHRlbnNpb25EZXRhaWxzXCIsIGRhdGFUb1NldCk7XHJcbiAgICB9XHJcbiAgICBhbGVydChcIlNhdmVkIVwiKTtcclxuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgc2hvd0dyYXBoOiB0cnVlIH0pO1xyXG59XHJcbmZ1bmN0aW9uIHNhdmVEYXRhKCkge1xyXG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICB5aWVsZCByZXNldCgpO1xyXG4gICAgICAgIGlmICghbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJsZWV0Q29kZUV4dGVuc2lvbkRldGFpbHNcIikpIHtcclxuICAgICAgICAgICAgc2V0SW5pdGlhbERhdGEoKTtcclxuICAgICAgICAgICAgc2V0RGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgc2V0RGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbmZ1bmN0aW9uIHNldEluaXRpYWxEYXRhKCkge1xyXG4gICAgdmFyIHByb2JsZW1EZXRhaWxzID0gSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgIGVhc3k6IFtdLFxyXG4gICAgICAgIG1lZGl1bTogW10sXHJcbiAgICAgICAgaGFyZDogW10sXHJcbiAgICB9KTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibGVldENvZGVFeHRlbnNpb25EZXRhaWxzXCIsIHByb2JsZW1EZXRhaWxzKTtcclxufVxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG4vLyBDb252ZXJ0cyB0aGUgZ2l2ZW4gaW5kaXZpZHV2YWwgdGltZSBwYXJ0cyB0byBodW1hbiByZWFkYWJsZSBmb3JtXHJcbmZ1bmN0aW9uIGdldFRpbWVhc1N0cmluZyhzZWNvbmRzLCBtaW5zLCBob3Vycykge1xyXG4gICAgaWYgKGhvdXJzID4gMCAmJiBtaW5zID4gMCkge1xyXG4gICAgICAgIHJldHVybiBgJHtub3JtYWxpemUoaG91cnMpfWhyICR7bm9ybWFsaXplKG1pbnMpfW1pbnV0ZXNgO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaG91cnMgPiAwKSB7XHJcbiAgICAgICAgcmV0dXJuIGAke25vcm1hbGl6ZShob3Vycyl9IGhvdXJgO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAobWlucyA+IDApIHtcclxuICAgICAgICByZXR1cm4gYCR7bm9ybWFsaXplKG1pbnMpfSBtaW51dGVzYDtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHNlY29uZHMgPiAwKSB7XHJcbiAgICAgICAgcmV0dXJuIGAke25vcm1hbGl6ZShzZWNvbmRzKX0gc2Vjb25kc2A7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gJzAgc2Vjb25kcyAoOig6JztcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmdldFRpbWVhc1N0cmluZyA9IGdldFRpbWVhc1N0cmluZztcclxuLy8gUmVtb3ZlcyB0cmFpbGluZyB6ZXJvZXMgZnJvbSB0aGUgVGltZVN0YW1wXHJcbmZ1bmN0aW9uIG5vcm1hbGl6ZShudW0pIHtcclxuICAgIGxldCBuID0gTWF0aC5mbG9vcihudW0pO1xyXG4gICAgcmV0dXJuIG47XHJcbn1cclxuZXhwb3J0cy5ub3JtYWxpemUgPSBub3JtYWxpemU7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=