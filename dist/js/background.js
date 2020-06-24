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
// Setting Popup dynamically
console.log(chrome.extension.getViews({ type: "popup" }));
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
// Removes trailing zeroes from the TimeStamp
function normalize(num) {
    let n = Math.floor(num);
    return n;
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tncm91bmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGYTtBQUNiO0FBQ0EsMkJBQTJCLCtEQUErRCxnQkFBZ0IsRUFBRSxFQUFFO0FBQzlHO0FBQ0EsbUNBQW1DLE1BQU0sNkJBQTZCLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDakcsa0NBQWtDLE1BQU0saUNBQWlDLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDcEcsK0JBQStCLHFGQUFxRjtBQUNwSDtBQUNBLEtBQUs7QUFDTDtBQUNBLDhDQUE4QyxjQUFjO0FBQzVELGtCQUFrQixtQkFBTyxDQUFDLG1DQUFXO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLGdCQUFnQjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsc0JBQXNCO0FBQ2pFO0FBQ0E7QUFDQSwyQ0FBMkMsd0JBQXdCO0FBQ25FO0FBQ0EsS0FBSztBQUNMLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGdCQUFnQjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxnQkFBZ0I7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxtQkFBbUI7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLFdBQVc7QUFDbEQsOENBQThDLGdCQUFnQjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRDtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLDBCQUEwQjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLG9CQUFvQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOzs7Ozs7Ozs7Ozs7O0FDck5hO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGlCQUFpQjtBQUNuQztBQUNBO0FBQ0Esa0JBQWtCLGdCQUFnQjtBQUNsQztBQUNBO0FBQ0Esa0JBQWtCLG1CQUFtQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJhY2tncm91bmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9iYWNrZ3JvdW5kLnRzXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGhlbHBlcnNfMSA9IHJlcXVpcmUoXCIuL2hlbHBlcnNcIik7XG4vLyBPdmVycmlkaW5nIEN1c3RvbSBXaW5kb3cgT2JqZWN0IFNpbmNlIGNhbm5vdCBhbSB1bmFibGUgdG8gZXh0ZW5kIHRoZSBkZWZhdWx0IHdpbmRvdyBvYmpcbmxldCB3aW5kb3dPYmogPSB3aW5kb3c7XG5sZXQgdGltZVN0cmluZztcbi8vIFNldHRpbmcgUG9wdXAgZHluYW1pY2FsbHlcbmNvbnNvbGUubG9nKGNocm9tZS5leHRlbnNpb24uZ2V0Vmlld3MoeyB0eXBlOiBcInBvcHVwXCIgfSkpO1xuY2hyb21lLnRhYnMub25BY3RpdmF0ZWQuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKGFjdGl2ZUluZm8pIHtcbiAgICBsZXQgdXJsUmVnZXggPSBuZXcgUmVnRXhwKFwiaHR0cHM6Ly9sZWV0Y29kZS5jb20vcHJvYmxlbXMvKlwiKTtcbiAgICBjb25zdCBhY3RpdmVUYWJJZCA9IGFjdGl2ZUluZm8udGFiSWQ7XG4gICAgY2hyb21lLnRhYnMuZ2V0KGFjdGl2ZVRhYklkLCBmdW5jdGlvbiAodGFiKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRVcmwgPSB0YWIudXJsO1xuICAgICAgICBpZiAodXJsUmVnZXgudGVzdChjdXJyZW50VXJsKSkge1xuICAgICAgICAgICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0UG9wdXAoeyBwb3B1cDogXCJwb3B1cC5odG1sXCIgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRQb3B1cCh7IHBvcHVwOiBcImludmFsaWQuaHRtbFwiIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG59KTtcbi8vIFBlcnNpc3RpbmcgRGF0YSBTdHVmZnN0XG5jb25zdCBwcm9ibGVtID0ge307XG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKHJlcXVlc3QsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSB7XG4gICAgaWYgKHJlcXVlc3QpIHtcbiAgICAgICAgaWYgKHJlcXVlc3QuYWN0aW9uID09IFwic2V0UHJvYmxlbVwiKSB7XG4gICAgICAgICAgICBwcm9ibGVtLnByb2JsZW1OYW1lID0gcmVxdWVzdC5wYXlsb2FkLnByb2JsZW1OYW1lO1xuICAgICAgICAgICAgcHJvYmxlbS5kaWZmaWN1bHR5ID0gcmVxdWVzdC5wYXlsb2FkLmRpZmZpY3VsdHk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocmVxdWVzdC5hY3Rpb24gPT0gXCJnZXRQcm9ibGVtXCIpIHtcbiAgICAgICAgICAgIHNlbmRSZXNwb25zZShwcm9ibGVtKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChyZXF1ZXN0LmFjdGlvbiA9PSBcInNldFRpbWVyXCIpIHtcbiAgICAgICAgICAgIHN0YXJ0U3RvcCgpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG4vLyBVcGRhdGluZyBUaW1lciBTdHVmZnNcbmxldCBzdGFydHN0b3AgPSAwO1xubGV0IHg7XG4vKiBUb2dnbGUgU3RhcnRTdG9wICovXG5mdW5jdGlvbiBzdGFydFN0b3AoKSB7XG4gICAgc3RhcnRzdG9wID0gc3RhcnRzdG9wICsgMTtcbiAgICBsZXQgZG9jdW1lbnQgPSBjaHJvbWUuZXh0ZW5zaW9uLmdldFZpZXdzKHsgdHlwZTogXCJwb3B1cFwiIH0pWzBdLmRvY3VtZW50O1xuICAgIGlmIChzdGFydHN0b3AgPT0gMSkge1xuICAgICAgICBzdGFydFRpbWVyKCk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnRcIikuaW5uZXJIVE1MID0gXCJQYXVzZVwiO1xuICAgIH1cbiAgICBlbHNlIGlmIChzdGFydHN0b3AgPT0gMikge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0XCIpLmlubmVySFRNTCA9IFwiU3RhcnRcIjtcbiAgICAgICAgc3RhcnRzdG9wID0gMDtcbiAgICAgICAgc3RvcFRpbWVyKCk7XG4gICAgfVxufVxuLy8gQ3JlYXRpbmcgbXkgQ3VzdG9tIFdpbmRvdyBvYmplY3Qgc2luY2UgVHlwZXNjcmlwdCBkb2VzbnQgYWxsb3cgbXVjaCBmbGV4aWJsaXR5XG53aW5kb3dPYmouc3RhcnRTdG9wID0gc3RhcnRTdG9wO1xud2luZG93T2JqLnJlc2V0RnVuYyA9IHJlc2V0O1xud2luZG93T2JqLnNhdmVEYXRhID0gc2F2ZURhdGE7XG4vL1N0YXJ0cyB0aGUgVGltZXJcbmZ1bmN0aW9uIHN0YXJ0VGltZXIoKSB7XG4gICAgeCA9IHNldEludGVydmFsKHRpbWVyLCAxMCk7XG59XG4vLyBTdG9wcyB0aGUgdGltZXJcbmZ1bmN0aW9uIHN0b3BUaW1lcigpIHtcbiAgICBjbGVhckludGVydmFsKHgpO1xufVxuLy8gRGVjbGFyaW5nIFZhcmlhYmxlc1xubGV0IG1pbGlzZWMgPSAwO1xubGV0IHNlYyA9IDA7IC8qIGhvbGRzIGluY3JlbWVudGluZyB2YWx1ZSAqL1xubGV0IG1pbiA9IDA7XG5sZXQgaG91ciA9IDA7XG5sZXQgbWlsaVNlY091dCA9IDA7XG5sZXQgc2VjT3V0ID0gMDtcbmxldCBtaW5PdXQgPSAwO1xubGV0IGhvdXJPdXQgPSAwO1xuLy8gRHJpdmVyIGZvciBUaW1lclxuZnVuY3Rpb24gdGltZXIoKSB7XG4gICAgbGV0IHBvcHVwID0gY2hyb21lLmV4dGVuc2lvbi5nZXRWaWV3cyh7IHR5cGU6IFwicG9wdXBcIiB9KVswXTtcbiAgICBsZXQgZG9jdW1lbnQgPSBwb3B1cCAmJiBwb3B1cC5kb2N1bWVudDtcbiAgICBtaWxpU2VjT3V0ID0gY2hlY2tUaW1lKG1pbGlzZWMpO1xuICAgIHNlY091dCA9IGNoZWNrVGltZShzZWMpO1xuICAgIG1pbk91dCA9IGNoZWNrVGltZShtaW4pO1xuICAgIGhvdXJPdXQgPSBjaGVja1RpbWUoaG91cik7XG4gICAgbWlsaXNlYyA9ICsrbWlsaXNlYztcbiAgICBpZiAobWlsaXNlYyA9PT0gMTAwKSB7XG4gICAgICAgIG1pbGlzZWMgPSAwO1xuICAgICAgICBzZWMgPSArK3NlYztcbiAgICB9XG4gICAgaWYgKHNlYyA9PSA2MCkge1xuICAgICAgICBtaW4gPSArK21pbjtcbiAgICAgICAgc2VjID0gMDtcbiAgICB9XG4gICAgaWYgKG1pbiA9PSA2MCkge1xuICAgICAgICBtaW4gPSAwO1xuICAgICAgICBob3VyID0gKytob3VyO1xuICAgIH1cbiAgICAvLyBVcGRhdGVzIERPTVxuICAgIC8qXG4gICAgV2hlbiB0aGUgUG9wdXAgaXMgY2xvc2VkIGJhY2tncm91bmQgZG9lcydudCBoYXZlIHJlZmVyZW5jZSB0byB0aGUgUG9wdXAnc1xuICAgIGRvY3VtZW50IG9iamVjdCAgd2Ugbm8gbmVlZCB0byByZW5kZXIgd2hlbiB0aGUgcG9wdXAgaXMgbm90IG9wZW5lZFxuICBcbiAgXG4gICAgKi9cbiAgICBpZiAoZG9jdW1lbnQpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtaWxpc2VjXCIpLmlubmVySFRNTCA9IG1pbGlTZWNPdXQudG9TdHJpbmcoKTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWNcIikuaW5uZXJIVE1MID0gc2VjT3V0LnRvU3RyaW5nKCk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWluXCIpLmlubmVySFRNTCA9IG1pbk91dC50b1N0cmluZygpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdXJcIikuaW5uZXJIVE1MID0gaG91ck91dC50b1N0cmluZygpO1xuICAgIH1cbiAgICAvLyBVcGRhdGUgdGhlIGJhZGdlIFRleHRcbiAgICB0aW1lU3RyaW5nID0gaGVscGVyc18xLmdldFRpbWVhc1N0cmluZyhzZWNPdXQsIG1pbk91dCwgaG91ck91dCk7XG4gICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0QmFkZ2VUZXh0KHsgdGV4dDogdGltZVN0cmluZyB9KTtcbn1cbi8vIENoZWNrcyB0aW1lIHRvIGFkZCAwIG9yIG5vdFxuZnVuY3Rpb24gY2hlY2tUaW1lKGkpIHtcbiAgICBpZiAoaSA8IDEwKSB7XG4gICAgICAgIGkgPSBcIjBcIiArIGk7XG4gICAgfVxuICAgIHJldHVybiBpO1xufVxuLy8gUmVzZXRzIHRoZSB0aW1lclxuZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgY29uc29sZS5sb2coXCJoZXlcIik7XG4gICAgc3RvcFRpbWVyKCk7XG4gICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0QmFkZ2VUZXh0KHsgdGV4dDogXCJcIiB9KTtcbiAgICBsZXQgZG9jdW1lbnQgPSBjaHJvbWUuZXh0ZW5zaW9uLmdldFZpZXdzKHsgdHlwZTogXCJwb3B1cFwiIH0pWzBdLmRvY3VtZW50O1xuICAgIC8qUmVzZXQqL1xuICAgIHN0YXJ0c3RvcCA9IDA7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydFwiKS5pbm5lckhUTUwgPSBcIlN0YXJ0XCI7XG4gICAgbWlsaXNlYyA9IDA7XG4gICAgc2VjID0gMDtcbiAgICBtaW4gPSAwO1xuICAgIGhvdXIgPSAwO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWlsaXNlY1wiKS5pbm5lckhUTUwgPSBcIjAwXCI7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWNcIikuaW5uZXJIVE1MID0gXCIwMFwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWluXCIpLmlubmVySFRNTCA9IFwiMDBcIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdXJcIikuaW5uZXJIVE1MID0gXCIwMFwiO1xufVxuZnVuY3Rpb24gc2V0RGF0YSgpIHtcbiAgICBjb25zb2xlLmxvZyhcImhpXCIpO1xuICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImxlZXRDb2RlRXh0ZW5zaW9uRGV0YWlsc1wiKSk7XG4gICAgbGV0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICAvL0B0cy1pZ25vcmVcbiAgICBsZXQgZGQgPSBTdHJpbmcodG9kYXkuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIik7XG4gICAgLy9AdHMtaWdub3JlXG4gICAgbGV0IG1tID0gU3RyaW5nKHRvZGF5LmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCBcIjBcIik7IC8vSmFudWFyeSBpcyAwIVxuICAgIGxldCB5eXl5ID0gdG9kYXkuZ2V0RnVsbFllYXIoKTtcbiAgICBjb25zdCB0b2RheVN0cmluZyA9IGRkICsgXCIvXCIgKyBtbSArIFwiL1wiICsgeXl5eTtcbiAgICBjb25zdCBwcm9ibGVtTmFtZSA9IHByb2JsZW0ucHJvYmxlbU5hbWUuc3BsaXQoXCIuXCIpWzFdO1xuICAgIGNvbnN0IGRhdGFNYXAgPSB7XG4gICAgICAgIHByb2JsZW1OYW1lOiBwcm9ibGVtTmFtZSxcbiAgICAgICAgZGlmZmljdWx0eTogcHJvYmxlbS5kaWZmaWN1bHR5LFxuICAgICAgICB0aW1lVGFrZW46IHRpbWVTdHJpbmcsXG4gICAgICAgIGRhdGU6IHRvZGF5U3RyaW5nLFxuICAgIH07XG4gICAgbGV0IGN1cnJlbnREaWZmUHJvYmxlbUFycmF5ID0gZGF0YVtwcm9ibGVtLmRpZmZpY3VsdHkudG9Mb3dlckNhc2UoKV07XG4gICAgbGV0IGV4aXN0cyA9IGN1cnJlbnREaWZmUHJvYmxlbUFycmF5LmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4gaXRlbS5wcm9ibGVtTmFtZSA9PT0gcHJvYmxlbU5hbWU7XG4gICAgfSk7XG4gICAgbGV0IHByb2JsZW1PYmogPSBleGlzdHNbMF07XG4gICAgY29uc29sZS5sb2coZXhpc3RzLmxlbmd0aCk7XG4gICAgaWYgKGV4aXN0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vIGRhdGFNYXAucHJvYmxlbU5hbWUgKz0gIHByb2JsZW1PYmouZHVwbGljYXRlSW5kZXgudG9TdHJpbmcoKTtcbiAgICAgICAgcHJvYmxlbU9iai5kdXBsaWNhdGVJbmRleCArPSAxO1xuICAgICAgICBjb25zdCBpdGVtVG9GaW5kID0gKGl0ZW0pID0+IGl0ZW0ucHJvYmxlbU5hbWUgPT0gZGF0YU1hcC5wcm9ibGVtTmFtZTtcbiAgICAgICAgbGV0IGlkeCA9IGN1cnJlbnREaWZmUHJvYmxlbUFycmF5LmZpbmRJbmRleChpdGVtVG9GaW5kKTtcbiAgICAgICAgZGF0YVtwcm9ibGVtLmRpZmZpY3VsdHkudG9Mb3dlckNhc2UoKV1baWR4XSA9IHByb2JsZW1PYmo7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTG9nZ2luZyBNYXBcIik7XG4gICAgICAgIGRhdGFNYXAucHJvYmxlbU5hbWUgKz0gYCAoJHtwcm9ibGVtT2JqLmR1cGxpY2F0ZUluZGV4fSlgO1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhTWFwKTtcbiAgICAgICAgZGF0YVtwcm9ibGVtT2JqLmRpZmZpY3VsdHkudG9Mb3dlckNhc2UoKV0ucHVzaChkYXRhTWFwKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJsZWV0Q29kZUV4dGVuc2lvbkRldGFpbHNcIiwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgICAgICBjb25zb2xlLmxvZyhsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImxlZXRDb2RlRXh0ZW5zaW9uRGV0YWlsc1wiKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBkYXRhTWFwLmR1cGxpY2F0ZUluZGV4ID0gMDtcbiAgICAgICAgZGF0YVtkYXRhTWFwLmRpZmZpY3VsdHkudG9Mb3dlckNhc2UoKV0ucHVzaChkYXRhTWFwKTtcbiAgICAgICAgbGV0IGRhdGFUb1NldCA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhVG9TZXQpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImxlZXRDb2RlRXh0ZW5zaW9uRGV0YWlsc1wiLCBkYXRhVG9TZXQpO1xuICAgICAgICBjb25zb2xlLmxvZyhsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImxlZXRDb2RlRXh0ZW5zaW9uRGV0YWlsc1wiKSk7XG4gICAgfVxuICAgIGFsZXJ0KFwiU2F2ZWQhXCIpO1xuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgXCJzaG93R3JhcGhcIjogdHJ1ZSB9KTtcbn1cbmZ1bmN0aW9uIHNhdmVEYXRhKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHlpZWxkIHJlc2V0KCk7XG4gICAgICAgIGlmICghbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJsZWV0Q29kZUV4dGVuc2lvbkRldGFpbHNcIikpIHtcbiAgICAgICAgICAgIHNldEluaXRpYWxEYXRhKCk7XG4gICAgICAgICAgICBzZXREYXRhKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzZXREYXRhKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHNldEluaXRpYWxEYXRhKCkge1xuICAgIHZhciBwcm9ibGVtRGV0YWlscyA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgZWFzeTogW10sXG4gICAgICAgIG1lZGl1bTogW10sXG4gICAgICAgIGhhcmQ6IFtdLFxuICAgIH0pO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibGVldENvZGVFeHRlbnNpb25EZXRhaWxzXCIsIHByb2JsZW1EZXRhaWxzKTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLy8gQ29udmVydHMgdGhlIGdpdmVuIGluZGl2aWR1dmFsIHRpbWUgcGFydHMgdG8gaHVtYW4gcmVhZGFibGUgZm9ybVxuZnVuY3Rpb24gZ2V0VGltZWFzU3RyaW5nKHNlY29uZHMsIG1pbnMsIGhvdXJzKSB7XG4gICAgaWYgKGhvdXJzID4gMCkge1xuICAgICAgICByZXR1cm4gYCR7bm9ybWFsaXplKGhvdXJzKX0gaHJgO1xuICAgIH1cbiAgICBlbHNlIGlmIChtaW5zID4gMCkge1xuICAgICAgICByZXR1cm4gYCR7bm9ybWFsaXplKG1pbnMpfSBtIGA7XG4gICAgfVxuICAgIGVsc2UgaWYgKHNlY29uZHMgPiAwKSB7XG4gICAgICAgIHJldHVybiBgJHtub3JtYWxpemUoc2Vjb25kcyl9IHNgO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0VGltZWFzU3RyaW5nID0gZ2V0VGltZWFzU3RyaW5nO1xuLy8gUmVtb3ZlcyB0cmFpbGluZyB6ZXJvZXMgZnJvbSB0aGUgVGltZVN0YW1wXG5mdW5jdGlvbiBub3JtYWxpemUobnVtKSB7XG4gICAgbGV0IG4gPSBNYXRoLmZsb29yKG51bSk7XG4gICAgcmV0dXJuIG47XG59XG4iXSwic291cmNlUm9vdCI6IiJ9