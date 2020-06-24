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
// Setting Popup dynamically
console.log(chrome.extension.getViews({ type: "popup" }));
chrome.tabs.onActivated.addListener(function (activeInfo) {
    let urlRegex = new RegExp("https://leetcode.com/problems/*");
    const activeTabId = activeInfo.tabId;
    chrome.tabs.get(activeTabId, function (tab) {
        currentUrl = tab.url;
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
function setData() {
    console.log("hi");
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
        problemUrl: currentUrl
    };
    let currentDiffProblemArray = data[problem.difficulty.toLowerCase()];
    let exists = currentDiffProblemArray.filter((item) => {
        return item.problemName === problemName;
    });
    let problemObj = exists[0];
    console.log(exists.length);
    if (exists.length > 0) {
        // dataMap.problemName +=  problemObj.duplicateIndex.toString();
        problemObj.duplicateIndex += 1;
        const itemToFind = (item) => item.problemName == dataMap.problemName;
        let idx = currentDiffProblemArray.findIndex(itemToFind);
        data[problem.difficulty.toLowerCase()][idx] = problemObj;
        console.log("Logging Map");
        dataMap.problemName += ` (${problemObj.duplicateIndex})`;
        console.log(dataMap);
        data[problemObj.difficulty.toLowerCase()].push(dataMap);
        localStorage.setItem("leetCodeExtensionDetails", JSON.stringify(data));
        console.log(localStorage.getItem("leetCodeExtensionDetails"));
    }
    else {
        dataMap.duplicateIndex = 0;
        data[dataMap.difficulty.toLowerCase()].push(dataMap);
        let dataToSet = JSON.stringify(data);
        console.log(dataToSet);
        localStorage.setItem("leetCodeExtensionDetails", dataToSet);
        console.log(localStorage.getItem("leetCodeExtensionDetails"));
    }
    alert("Saved!");
    chrome.runtime.sendMessage({ "showGraph": true });
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
        return `${normalize(hours)} hr ${normalize(mins)} min`;
    }
    else if (hours > 0) {
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
// Removes trailing zeroes from the TimeStamp
function normalize(num) {
    let n = Math.floor(num);
    return n;
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tncm91bmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGYTtBQUNiO0FBQ0EsMkJBQTJCLCtEQUErRCxnQkFBZ0IsRUFBRSxFQUFFO0FBQzlHO0FBQ0EsbUNBQW1DLE1BQU0sNkJBQTZCLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDakcsa0NBQWtDLE1BQU0saUNBQWlDLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDcEcsK0JBQStCLHFGQUFxRjtBQUNwSDtBQUNBLEtBQUs7QUFDTDtBQUNBLDhDQUE4QyxjQUFjO0FBQzVELGtCQUFrQixtQkFBTyxDQUFDLG1DQUFXO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsZ0JBQWdCO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxzQkFBc0I7QUFDakU7QUFDQTtBQUNBLDJDQUEyQyx3QkFBd0I7QUFDbkU7QUFDQSxLQUFLO0FBQ0wsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsZ0JBQWdCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLGdCQUFnQjtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLG1CQUFtQjtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsV0FBVztBQUNsRCw4Q0FBOEMsZ0JBQWdCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkRBQTJEO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQywwQkFBMEI7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxvQkFBb0I7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3ZOYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixpQkFBaUIsTUFBTSxnQkFBZ0I7QUFDekQ7QUFDQTtBQUNBLGtCQUFrQixpQkFBaUI7QUFDbkM7QUFDQTtBQUNBLGtCQUFrQixnQkFBZ0I7QUFDbEM7QUFDQTtBQUNBLGtCQUFrQixtQkFBbUI7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJiYWNrZ3JvdW5kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYmFja2dyb3VuZC50c1wiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBoZWxwZXJzXzEgPSByZXF1aXJlKFwiLi9oZWxwZXJzXCIpO1xuLy8gT3ZlcnJpZGluZyBDdXN0b20gV2luZG93IE9iamVjdCBTaW5jZSBjYW5ub3QgYW0gdW5hYmxlIHRvIGV4dGVuZCB0aGUgZGVmYXVsdCB3aW5kb3cgb2JqXG5sZXQgd2luZG93T2JqID0gd2luZG93O1xubGV0IHRpbWVTdHJpbmc7XG5sZXQgY3VycmVudFVybDtcbi8vIFNldHRpbmcgUG9wdXAgZHluYW1pY2FsbHlcbmNvbnNvbGUubG9nKGNocm9tZS5leHRlbnNpb24uZ2V0Vmlld3MoeyB0eXBlOiBcInBvcHVwXCIgfSkpO1xuY2hyb21lLnRhYnMub25BY3RpdmF0ZWQuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKGFjdGl2ZUluZm8pIHtcbiAgICBsZXQgdXJsUmVnZXggPSBuZXcgUmVnRXhwKFwiaHR0cHM6Ly9sZWV0Y29kZS5jb20vcHJvYmxlbXMvKlwiKTtcbiAgICBjb25zdCBhY3RpdmVUYWJJZCA9IGFjdGl2ZUluZm8udGFiSWQ7XG4gICAgY2hyb21lLnRhYnMuZ2V0KGFjdGl2ZVRhYklkLCBmdW5jdGlvbiAodGFiKSB7XG4gICAgICAgIGN1cnJlbnRVcmwgPSB0YWIudXJsO1xuICAgICAgICBpZiAodXJsUmVnZXgudGVzdChjdXJyZW50VXJsKSkge1xuICAgICAgICAgICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0UG9wdXAoeyBwb3B1cDogXCJwb3B1cC5odG1sXCIgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRQb3B1cCh7IHBvcHVwOiBcImludmFsaWQuaHRtbFwiIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG59KTtcbi8vIFBlcnNpc3RpbmcgRGF0YSBTdHVmZnN0XG5jb25zdCBwcm9ibGVtID0ge307XG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKHJlcXVlc3QsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSB7XG4gICAgaWYgKHJlcXVlc3QpIHtcbiAgICAgICAgaWYgKHJlcXVlc3QuYWN0aW9uID09IFwic2V0UHJvYmxlbVwiKSB7XG4gICAgICAgICAgICBwcm9ibGVtLnByb2JsZW1OYW1lID0gcmVxdWVzdC5wYXlsb2FkLnByb2JsZW1OYW1lO1xuICAgICAgICAgICAgcHJvYmxlbS5kaWZmaWN1bHR5ID0gcmVxdWVzdC5wYXlsb2FkLmRpZmZpY3VsdHk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocmVxdWVzdC5hY3Rpb24gPT0gXCJnZXRQcm9ibGVtXCIpIHtcbiAgICAgICAgICAgIHNlbmRSZXNwb25zZShwcm9ibGVtKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChyZXF1ZXN0LmFjdGlvbiA9PSBcInNldFRpbWVyXCIpIHtcbiAgICAgICAgICAgIHN0YXJ0U3RvcCgpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG4vLyBVcGRhdGluZyBUaW1lciBTdHVmZnNcbmxldCBzdGFydHN0b3AgPSAwO1xubGV0IHg7XG4vKiBUb2dnbGUgU3RhcnRTdG9wICovXG5mdW5jdGlvbiBzdGFydFN0b3AoKSB7XG4gICAgc3RhcnRzdG9wID0gc3RhcnRzdG9wICsgMTtcbiAgICBsZXQgZG9jdW1lbnQgPSBjaHJvbWUuZXh0ZW5zaW9uLmdldFZpZXdzKHsgdHlwZTogXCJwb3B1cFwiIH0pWzBdLmRvY3VtZW50O1xuICAgIGlmIChzdGFydHN0b3AgPT0gMSkge1xuICAgICAgICBzdGFydFRpbWVyKCk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnRcIikuaW5uZXJIVE1MID0gXCJQYXVzZVwiO1xuICAgIH1cbiAgICBlbHNlIGlmIChzdGFydHN0b3AgPT0gMikge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0XCIpLmlubmVySFRNTCA9IFwiU3RhcnRcIjtcbiAgICAgICAgc3RhcnRzdG9wID0gMDtcbiAgICAgICAgc3RvcFRpbWVyKCk7XG4gICAgfVxufVxuLy8gQ3JlYXRpbmcgbXkgQ3VzdG9tIFdpbmRvdyBvYmplY3Qgc2luY2UgVHlwZXNjcmlwdCBkb2VzbnQgYWxsb3cgbXVjaCBmbGV4aWJsaXR5XG53aW5kb3dPYmouc3RhcnRTdG9wID0gc3RhcnRTdG9wO1xud2luZG93T2JqLnJlc2V0RnVuYyA9IHJlc2V0O1xud2luZG93T2JqLnNhdmVEYXRhID0gc2F2ZURhdGE7XG4vL1N0YXJ0cyB0aGUgVGltZXJcbmZ1bmN0aW9uIHN0YXJ0VGltZXIoKSB7XG4gICAgeCA9IHNldEludGVydmFsKHRpbWVyLCAxMCk7XG59XG4vLyBTdG9wcyB0aGUgdGltZXJcbmZ1bmN0aW9uIHN0b3BUaW1lcigpIHtcbiAgICBjbGVhckludGVydmFsKHgpO1xufVxuLy8gRGVjbGFyaW5nIFZhcmlhYmxlc1xubGV0IG1pbGlzZWMgPSAwO1xubGV0IHNlYyA9IDA7IC8qIGhvbGRzIGluY3JlbWVudGluZyB2YWx1ZSAqL1xubGV0IG1pbiA9IDA7XG5sZXQgaG91ciA9IDA7XG5sZXQgbWlsaVNlY091dCA9IDA7XG5sZXQgc2VjT3V0ID0gMDtcbmxldCBtaW5PdXQgPSAwO1xubGV0IGhvdXJPdXQgPSAwO1xuLy8gRHJpdmVyIGZvciBUaW1lclxuZnVuY3Rpb24gdGltZXIoKSB7XG4gICAgbGV0IHBvcHVwID0gY2hyb21lLmV4dGVuc2lvbi5nZXRWaWV3cyh7IHR5cGU6IFwicG9wdXBcIiB9KVswXTtcbiAgICBsZXQgZG9jdW1lbnQgPSBwb3B1cCAmJiBwb3B1cC5kb2N1bWVudDtcbiAgICBtaWxpU2VjT3V0ID0gY2hlY2tUaW1lKG1pbGlzZWMpO1xuICAgIHNlY091dCA9IGNoZWNrVGltZShzZWMpO1xuICAgIG1pbk91dCA9IGNoZWNrVGltZShtaW4pO1xuICAgIGhvdXJPdXQgPSBjaGVja1RpbWUoaG91cik7XG4gICAgbWlsaXNlYyA9ICsrbWlsaXNlYztcbiAgICBpZiAobWlsaXNlYyA9PT0gMTAwKSB7XG4gICAgICAgIG1pbGlzZWMgPSAwO1xuICAgICAgICBzZWMgPSArK3NlYztcbiAgICB9XG4gICAgaWYgKHNlYyA9PSA2MCkge1xuICAgICAgICBtaW4gPSArK21pbjtcbiAgICAgICAgc2VjID0gMDtcbiAgICB9XG4gICAgaWYgKG1pbiA9PSA2MCkge1xuICAgICAgICBtaW4gPSAwO1xuICAgICAgICBob3VyID0gKytob3VyO1xuICAgIH1cbiAgICAvLyBVcGRhdGVzIERPTVxuICAgIC8qXG4gICAgV2hlbiB0aGUgUG9wdXAgaXMgY2xvc2VkIGJhY2tncm91bmQgZG9lcydudCBoYXZlIHJlZmVyZW5jZSB0byB0aGUgUG9wdXAnc1xuICAgIGRvY3VtZW50IG9iamVjdCAgd2Ugbm8gbmVlZCB0byByZW5kZXIgd2hlbiB0aGUgcG9wdXAgaXMgbm90IG9wZW5lZFxuICBcbiAgXG4gICAgKi9cbiAgICBpZiAoZG9jdW1lbnQpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtaWxpc2VjXCIpLmlubmVySFRNTCA9IG1pbGlTZWNPdXQudG9TdHJpbmcoKTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWNcIikuaW5uZXJIVE1MID0gc2VjT3V0LnRvU3RyaW5nKCk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWluXCIpLmlubmVySFRNTCA9IG1pbk91dC50b1N0cmluZygpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdXJcIikuaW5uZXJIVE1MID0gaG91ck91dC50b1N0cmluZygpO1xuICAgIH1cbiAgICAvLyBVcGRhdGUgdGhlIGJhZGdlIFRleHRcbiAgICB0aW1lU3RyaW5nID0gaGVscGVyc18xLmdldFRpbWVhc1N0cmluZyhzZWNPdXQsIG1pbk91dCwgaG91ck91dCk7XG4gICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0QmFkZ2VUZXh0KHsgdGV4dDogdGltZVN0cmluZyB9KTtcbn1cbi8vIENoZWNrcyB0aW1lIHRvIGFkZCAwIG9yIG5vdFxuZnVuY3Rpb24gY2hlY2tUaW1lKGkpIHtcbiAgICBpZiAoaSA8IDEwKSB7XG4gICAgICAgIGkgPSBcIjBcIiArIGk7XG4gICAgfVxuICAgIHJldHVybiBpO1xufVxuLy8gUmVzZXRzIHRoZSB0aW1lclxuZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgY29uc29sZS5sb2coXCJoZXlcIik7XG4gICAgc3RvcFRpbWVyKCk7XG4gICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0QmFkZ2VUZXh0KHsgdGV4dDogXCJcIiB9KTtcbiAgICBsZXQgZG9jdW1lbnQgPSBjaHJvbWUuZXh0ZW5zaW9uLmdldFZpZXdzKHsgdHlwZTogXCJwb3B1cFwiIH0pWzBdLmRvY3VtZW50O1xuICAgIC8qUmVzZXQqL1xuICAgIHN0YXJ0c3RvcCA9IDA7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydFwiKS5pbm5lckhUTUwgPSBcIlN0YXJ0XCI7XG4gICAgbWlsaXNlYyA9IDA7XG4gICAgc2VjID0gMDtcbiAgICBtaW4gPSAwO1xuICAgIGhvdXIgPSAwO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWlsaXNlY1wiKS5pbm5lckhUTUwgPSBcIjAwXCI7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWNcIikuaW5uZXJIVE1MID0gXCIwMFwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWluXCIpLmlubmVySFRNTCA9IFwiMDBcIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdXJcIikuaW5uZXJIVE1MID0gXCIwMFwiO1xufVxuZnVuY3Rpb24gc2V0RGF0YSgpIHtcbiAgICBjb25zb2xlLmxvZyhcImhpXCIpO1xuICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImxlZXRDb2RlRXh0ZW5zaW9uRGV0YWlsc1wiKSk7XG4gICAgbGV0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICAvL0B0cy1pZ25vcmVcbiAgICBsZXQgZGQgPSBTdHJpbmcodG9kYXkuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIik7XG4gICAgLy9AdHMtaWdub3JlXG4gICAgbGV0IG1tID0gU3RyaW5nKHRvZGF5LmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCBcIjBcIik7IC8vSmFudWFyeSBpcyAwIVxuICAgIGxldCB5eXl5ID0gdG9kYXkuZ2V0RnVsbFllYXIoKTtcbiAgICBjb25zdCB0b2RheVN0cmluZyA9IGRkICsgXCIvXCIgKyBtbSArIFwiL1wiICsgeXl5eTtcbiAgICBjb25zdCBwcm9ibGVtTmFtZSA9IHByb2JsZW0ucHJvYmxlbU5hbWUuc3BsaXQoXCIuXCIpWzFdO1xuICAgIGNvbnN0IGRhdGFNYXAgPSB7XG4gICAgICAgIHByb2JsZW1OYW1lOiBwcm9ibGVtTmFtZSxcbiAgICAgICAgZGlmZmljdWx0eTogcHJvYmxlbS5kaWZmaWN1bHR5LFxuICAgICAgICB0aW1lVGFrZW46IHRpbWVTdHJpbmcsXG4gICAgICAgIGRhdGU6IHRvZGF5U3RyaW5nLFxuICAgICAgICBwcm9ibGVtVXJsOiBjdXJyZW50VXJsXG4gICAgfTtcbiAgICBsZXQgY3VycmVudERpZmZQcm9ibGVtQXJyYXkgPSBkYXRhW3Byb2JsZW0uZGlmZmljdWx0eS50b0xvd2VyQ2FzZSgpXTtcbiAgICBsZXQgZXhpc3RzID0gY3VycmVudERpZmZQcm9ibGVtQXJyYXkuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtLnByb2JsZW1OYW1lID09PSBwcm9ibGVtTmFtZTtcbiAgICB9KTtcbiAgICBsZXQgcHJvYmxlbU9iaiA9IGV4aXN0c1swXTtcbiAgICBjb25zb2xlLmxvZyhleGlzdHMubGVuZ3RoKTtcbiAgICBpZiAoZXhpc3RzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gZGF0YU1hcC5wcm9ibGVtTmFtZSArPSAgcHJvYmxlbU9iai5kdXBsaWNhdGVJbmRleC50b1N0cmluZygpO1xuICAgICAgICBwcm9ibGVtT2JqLmR1cGxpY2F0ZUluZGV4ICs9IDE7XG4gICAgICAgIGNvbnN0IGl0ZW1Ub0ZpbmQgPSAoaXRlbSkgPT4gaXRlbS5wcm9ibGVtTmFtZSA9PSBkYXRhTWFwLnByb2JsZW1OYW1lO1xuICAgICAgICBsZXQgaWR4ID0gY3VycmVudERpZmZQcm9ibGVtQXJyYXkuZmluZEluZGV4KGl0ZW1Ub0ZpbmQpO1xuICAgICAgICBkYXRhW3Byb2JsZW0uZGlmZmljdWx0eS50b0xvd2VyQ2FzZSgpXVtpZHhdID0gcHJvYmxlbU9iajtcbiAgICAgICAgY29uc29sZS5sb2coXCJMb2dnaW5nIE1hcFwiKTtcbiAgICAgICAgZGF0YU1hcC5wcm9ibGVtTmFtZSArPSBgICgke3Byb2JsZW1PYmouZHVwbGljYXRlSW5kZXh9KWA7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGFNYXApO1xuICAgICAgICBkYXRhW3Byb2JsZW1PYmouZGlmZmljdWx0eS50b0xvd2VyQ2FzZSgpXS5wdXNoKGRhdGFNYXApO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImxlZXRDb2RlRXh0ZW5zaW9uRGV0YWlsc1wiLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibGVldENvZGVFeHRlbnNpb25EZXRhaWxzXCIpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGRhdGFNYXAuZHVwbGljYXRlSW5kZXggPSAwO1xuICAgICAgICBkYXRhW2RhdGFNYXAuZGlmZmljdWx0eS50b0xvd2VyQ2FzZSgpXS5wdXNoKGRhdGFNYXApO1xuICAgICAgICBsZXQgZGF0YVRvU2V0ID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGFUb1NldCk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibGVldENvZGVFeHRlbnNpb25EZXRhaWxzXCIsIGRhdGFUb1NldCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibGVldENvZGVFeHRlbnNpb25EZXRhaWxzXCIpKTtcbiAgICB9XG4gICAgYWxlcnQoXCJTYXZlZCFcIik7XG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyBcInNob3dHcmFwaFwiOiB0cnVlIH0pO1xufVxuZnVuY3Rpb24gc2F2ZURhdGEoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgeWllbGQgcmVzZXQoKTtcbiAgICAgICAgaWYgKCFsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImxlZXRDb2RlRXh0ZW5zaW9uRGV0YWlsc1wiKSkge1xuICAgICAgICAgICAgc2V0SW5pdGlhbERhdGEoKTtcbiAgICAgICAgICAgIHNldERhdGEoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNldERhdGEoKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZnVuY3Rpb24gc2V0SW5pdGlhbERhdGEoKSB7XG4gICAgdmFyIHByb2JsZW1EZXRhaWxzID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBlYXN5OiBbXSxcbiAgICAgICAgbWVkaXVtOiBbXSxcbiAgICAgICAgaGFyZDogW10sXG4gICAgfSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJsZWV0Q29kZUV4dGVuc2lvbkRldGFpbHNcIiwgcHJvYmxlbURldGFpbHMpO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vLyBDb252ZXJ0cyB0aGUgZ2l2ZW4gaW5kaXZpZHV2YWwgdGltZSBwYXJ0cyB0byBodW1hbiByZWFkYWJsZSBmb3JtXG5mdW5jdGlvbiBnZXRUaW1lYXNTdHJpbmcoc2Vjb25kcywgbWlucywgaG91cnMpIHtcbiAgICBpZiAoaG91cnMgPiAwICYmIG1pbnMgPiAwKSB7XG4gICAgICAgIHJldHVybiBgJHtub3JtYWxpemUoaG91cnMpfSBociAke25vcm1hbGl6ZShtaW5zKX0gbWluYDtcbiAgICB9XG4gICAgZWxzZSBpZiAoaG91cnMgPiAwKSB7XG4gICAgICAgIHJldHVybiBgJHtub3JtYWxpemUoaG91cnMpfSBocmA7XG4gICAgfVxuICAgIGVsc2UgaWYgKG1pbnMgPiAwKSB7XG4gICAgICAgIHJldHVybiBgJHtub3JtYWxpemUobWlucyl9IG0gYDtcbiAgICB9XG4gICAgZWxzZSBpZiAoc2Vjb25kcyA+IDApIHtcbiAgICAgICAgcmV0dXJuIGAke25vcm1hbGl6ZShzZWNvbmRzKX0gc2A7XG4gICAgfVxufVxuZXhwb3J0cy5nZXRUaW1lYXNTdHJpbmcgPSBnZXRUaW1lYXNTdHJpbmc7XG4vLyBSZW1vdmVzIHRyYWlsaW5nIHplcm9lcyBmcm9tIHRoZSBUaW1lU3RhbXBcbmZ1bmN0aW9uIG5vcm1hbGl6ZShudW0pIHtcbiAgICBsZXQgbiA9IE1hdGguZmxvb3IobnVtKTtcbiAgICByZXR1cm4gbjtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=