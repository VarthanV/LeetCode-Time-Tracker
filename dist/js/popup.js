/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"popup": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/popup.ts","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/popup.ts":
/*!**********************!*\
  !*** ./src/popup.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const chart_js_1 = __webpack_require__(/*! chart.js */ "./node_modules/chart.js/dist/Chart.js");
//Dev Stuffs
// @ts-ignore
const console = chrome.extension.getBackgroundPage().console;
/*
Cache Dom

*/
const problemTitleDiv = document.querySelector("#problem-title");
const difficultyDiv = document.querySelector("#problem-difficulty");
const tableDiv = document.querySelector("#problem-table");
const difficultySelectorDiv = document.querySelector("#difficulty-selector");
const millisecondsDiv = document.getElementById("milisec");
const secondsDiv = document.getElementById("sec");
const minutesDiv = document.getElementById("min");
const hoursDiv = document.getElementById("hour");
const searchQueryDiv = document.getElementById("search-text");
// Buttons Div
const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");
const saveBtn = document.getElementById("save");
const exportToCSVButton = document.getElementById("export-to-csv");
const searchBtn = document.getElementById("search-btn");
// Get Title of the Current Page and URL
const backgroundPage = chrome.extension.getBackgroundPage();
let easyProblems;
let mediumProblems;
let hardProblems;
let selectedValue = "all";
//  Background Page
/*
Adding Event Listeners

*/
//@ts-ignore
startBtn.addEventListener("click", function () {
    //@ts-ignore
    backgroundPage.startStop();
});
resetBtn.addEventListener("click", function () {
    //@ts-ignore
    backgroundPage.resetFunc();
});
saveBtn.addEventListener("click", function () {
    //@ts-ignore
    backgroundPage.saveData();
});
searchBtn.addEventListener("click", function () {
    search();
});
exportToCSVButton.addEventListener("click", function () {
    if (selectedValue === "all") {
        export_table_to_csv(document, "leetcodestats.csv");
    }
    else if (selectedValue === "easy") {
        export_table_to_csv(document, "leetcode_easystats.csv");
    }
    else if (selectedValue === "medium") {
        export_table_to_csv(document, "leetcode_mediumstats.csv");
    }
    else if (selectedValue === "hard") {
        export_table_to_csv(document, "leetcode_hardstats.csv");
    }
});
difficultySelectorDiv.addEventListener("change", function () {
    selectedValue =
        difficultySelectorDiv.options[difficultySelectorDiv.selectedIndex].value;
    clearUI();
    if (selectedValue == "all") {
        renderTable();
    }
    else if (selectedValue === "easy") {
        renderItem(easyProblems, selectedValue);
    }
    else if (selectedValue === "medium") {
        renderItem(mediumProblems, selectedValue);
    }
    else if (selectedValue == "hard") {
        renderItem(hardProblems, selectedValue);
    }
});
/*
Rendering DOM

*/
document.addEventListener("DOMContentLoaded", function () {
    renderTimerPage();
    renderChart();
    renderTable();
});
// Renders Timer
function renderTimerPage() {
    let problemDict = {};
    // Get the Problem's Name and update DOMM
    const action = {
        action: "getProblem",
    };
    chrome.runtime.sendMessage(action, function (response) {
        problemDict.problemName = response.problemName;
        problemDict.difficulty = response.difficulty;
        if (problemDict.problemName) {
            let name = problemDict.problemName.split(".")[1];
            let difficulty = problemDict.difficulty;
            problemTitleDiv.innerText = name;
            difficultyDiv.innerText = difficulty;
            difficultyDiv.classList.add(difficulty.toLowerCase());
        }
    });
    // Get the Current State and update DOM
    const timerAction = {
        action: "getTimer",
    };
    chrome.runtime.sendMessage(timerAction, function (response) {
        if (response.startstop == 1) {
            document.getElementById("start").innerHTML = "Pause";
        }
        else if (response.startstop == 2) {
            document.getElementById("start").innerHTML = "Start";
        }
    });
    //  Get how much time has elapsed
    const getCurrentTimeAction = {
        action: "getCurrentTime",
    };
    chrome.runtime.sendMessage(getCurrentTimeAction, function (response) {
        const result = specialCase(response.miliSecOut, response.secOut, response.minOut, response.hourOut);
        if (result) {
            millisecondsDiv.innerText = "00";
            secondsDiv.innerText = "00";
            minutesDiv.innerText = "00";
            hoursDiv.innerText = "00";
        }
        else {
            millisecondsDiv.innerText = response.miliSecOut.toString();
            secondsDiv.innerText = response.secOut.toString();
            minutesDiv.innerText = response.minOut.toString();
            hoursDiv.innerText = response.hourOut.toString();
        }
    });
}
function specialCase(milisec, second, minute, hour) {
    if (milisec === 0 && second === 0 && minute === 0 && hour === 0) {
        return true;
    }
    return false;
}
// Listeners
// Listens for Changes and update UI  Accordingly
chrome.runtime.onMessage.addListener(function (request) {
    if (request.showGraph) {
        renderChart();
        clearUI();
        renderTable();
    }
});
/*
Clear's UI
*/
function clearUI() {
    tableDiv.innerHTML = null;
}
/*
Renders Chart

*/
//@ts-ignore
function renderChart() {
    let easyCount = 0;
    let mediumCount = 0;
    let hardCount = 0;
    const items = localStorage.getItem("leetCodeExtensionDetails");
    if (items) {
        const parsedItem = JSON.parse(items);
        easyCount = parsedItem.easy.filter((item) => typeof item.duplicateIndex == "number").length;
        mediumCount = parsedItem.medium.filter((item) => typeof item.duplicateIndex == "number").length;
        hardCount = parsedItem.hard.filter((item) => typeof item.duplicateIndex == "number").length;
    }
    //@ts-ignore
    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new chart_js_1.Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Easy", "Medium", "Hard"],
            datasets: [
                {
                    label: "# of Votes",
                    data: [easyCount, mediumCount, hardCount],
                    backgroundColor: [
                        "rgb(68,160,72)",
                        "rgb(239,113,9)",
                        "rgb(233,32,99)",
                    ],
                },
            ],
        },
        options: {},
    });
}
/*
Renders Table
*/
function renderTable() {
    const items = localStorage.getItem("leetCodeExtensionDetails");
    if (items) {
        const parsed = JSON.parse(items);
        easyProblems = parsed.easy;
        mediumProblems = parsed.medium;
        hardProblems = parsed.hard;
        renderItem(easyProblems, "easy");
        renderItem(mediumProblems, "medium");
        renderItem(hardProblems, "hard");
    }
}
/*
Renders Each Individual Table item

*/
function renderItem(items, classname) {
    for (const item of items) {
        const row = document.createElement("tr");
        const timeTaken = document.createElement("td");
        const problemLink = document.createElement("a");
        const problemName = document.createElement("td");
        const difficulty = document.createElement("td");
        const dateSolved = document.createElement("td");
        problemLink.innerText = item.problemName;
        problemLink.href = item.problemUrl;
        problemLink.setAttribute("target", "blank");
        problemName.appendChild(problemLink);
        difficulty.innerText = item.difficulty;
        difficulty.classList.add(classname !== undefined ? classname : item.difficulty.toLowerCase());
        timeTaken.innerText = item.timeTaken;
        dateSolved.innerText = item.date;
        // Appending to the Row
        row.appendChild(problemName);
        row.appendChild(difficulty);
        row.appendChild(timeTaken);
        row.appendChild(dateSolved);
        tableDiv.appendChild(row);
    }
}
/*
CSV Helpers
Credits : https://jsfiddle.net/gengns/j1jm2tjx/

*/
function download_csv(csv, filename) {
    let csvFile;
    let downloadLink;
    // CSV FILE
    csvFile = new Blob([csv], { type: "text/csv" });
    // Download link
    downloadLink = document.createElement("a");
    // File name
    downloadLink.download = filename;
    // We have to create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);
    // Make sure that the link is not displayed
    downloadLink.style.display = "none";
    // Add the link to your DOM
    document.body.appendChild(downloadLink);
    // Lanzamos
    downloadLink.click();
}
function export_table_to_csv(html, filename) {
    var csv = [];
    let tRowsLength = tableDiv.querySelectorAll('tr').length;
    var rows = document.querySelectorAll("table tr");
    if (tRowsLength > 0) {
        for (var i = 0; i < rows.length; i++) {
            var row = [], cols = rows[i].querySelectorAll("td, th");
            for (var j = 0; j < cols.length; j++)
                //@ts-ignore
                row.push(cols[j].innerText);
            csv.push(row.join(","));
        }
        // Download CSV
        download_csv(csv.join("\n"), filename);
    }
    else {
        alert("Nothing to Export");
    }
}
// Search Logic
function search() {
    //  Spreading problems
    let problems = [...easyProblems, ...mediumProblems, ...hardProblems];
    let query = searchQueryDiv.value;
    query = query.toLowerCase();
    let searches = problems.filter((item) => {
        return item.problemName.toLowerCase().includes(query);
    });
    clearUI();
    if (searches.length > 0) {
        renderItem(searches);
    }
    else {
        const spanElem = document.createElement('span');
        spanElem.innerText = 'Oops ! Nothing found';
        tableDiv.appendChild(spanElem);
    }
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BvcHVwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLFFBQVEsb0JBQW9CO1FBQzVCO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsaUJBQWlCLDRCQUE0QjtRQUM3QztRQUNBO1FBQ0Esa0JBQWtCLDJCQUEyQjtRQUM3QztRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGdCQUFnQix1QkFBdUI7UUFDdkM7OztRQUdBO1FBQ0E7UUFDQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDdkphO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsbUJBQW1CLG1CQUFPLENBQUMsdURBQVU7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7QUFDVCxtQkFBbUI7QUFDbkIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLG1CQUFtQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsaUJBQWlCO0FBQ3hDO0FBQ0EsMkJBQTJCLGlCQUFpQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJwb3B1cC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJwb3B1cFwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFtcIi4vc3JjL3BvcHVwLnRzXCIsXCJ2ZW5kb3JcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBjaGFydF9qc18xID0gcmVxdWlyZShcImNoYXJ0LmpzXCIpO1xyXG4vL0RldiBTdHVmZnNcclxuLy8gQHRzLWlnbm9yZVxyXG5jb25zdCBjb25zb2xlID0gY2hyb21lLmV4dGVuc2lvbi5nZXRCYWNrZ3JvdW5kUGFnZSgpLmNvbnNvbGU7XHJcbi8qXHJcbkNhY2hlIERvbVxyXG5cclxuKi9cclxuY29uc3QgcHJvYmxlbVRpdGxlRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9ibGVtLXRpdGxlXCIpO1xyXG5jb25zdCBkaWZmaWN1bHR5RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9ibGVtLWRpZmZpY3VsdHlcIik7XHJcbmNvbnN0IHRhYmxlRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9ibGVtLXRhYmxlXCIpO1xyXG5jb25zdCBkaWZmaWN1bHR5U2VsZWN0b3JEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RpZmZpY3VsdHktc2VsZWN0b3JcIik7XHJcbmNvbnN0IG1pbGxpc2Vjb25kc0RpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWlsaXNlY1wiKTtcclxuY29uc3Qgc2Vjb25kc0RpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VjXCIpO1xyXG5jb25zdCBtaW51dGVzRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtaW5cIik7XHJcbmNvbnN0IGhvdXJzRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3VyXCIpO1xyXG5jb25zdCBzZWFyY2hRdWVyeURpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoLXRleHRcIik7XHJcbi8vIEJ1dHRvbnMgRGl2XHJcbmNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydFwiKTtcclxuY29uc3QgcmVzZXRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlc2V0XCIpO1xyXG5jb25zdCBzYXZlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzYXZlXCIpO1xyXG5jb25zdCBleHBvcnRUb0NTVkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXhwb3J0LXRvLWNzdlwiKTtcclxuY29uc3Qgc2VhcmNoQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2gtYnRuXCIpO1xyXG4vLyBHZXQgVGl0bGUgb2YgdGhlIEN1cnJlbnQgUGFnZSBhbmQgVVJMXHJcbmNvbnN0IGJhY2tncm91bmRQYWdlID0gY2hyb21lLmV4dGVuc2lvbi5nZXRCYWNrZ3JvdW5kUGFnZSgpO1xyXG5sZXQgZWFzeVByb2JsZW1zO1xyXG5sZXQgbWVkaXVtUHJvYmxlbXM7XHJcbmxldCBoYXJkUHJvYmxlbXM7XHJcbmxldCBzZWxlY3RlZFZhbHVlID0gXCJhbGxcIjtcclxuLy8gIEJhY2tncm91bmQgUGFnZVxyXG4vKlxyXG5BZGRpbmcgRXZlbnQgTGlzdGVuZXJzXHJcblxyXG4qL1xyXG4vL0B0cy1pZ25vcmVcclxuc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgYmFja2dyb3VuZFBhZ2Uuc3RhcnRTdG9wKCk7XHJcbn0pO1xyXG5yZXNldEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgLy9AdHMtaWdub3JlXHJcbiAgICBiYWNrZ3JvdW5kUGFnZS5yZXNldEZ1bmMoKTtcclxufSk7XHJcbnNhdmVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgYmFja2dyb3VuZFBhZ2Uuc2F2ZURhdGEoKTtcclxufSk7XHJcbnNlYXJjaEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgc2VhcmNoKCk7XHJcbn0pO1xyXG5leHBvcnRUb0NTVkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHNlbGVjdGVkVmFsdWUgPT09IFwiYWxsXCIpIHtcclxuICAgICAgICBleHBvcnRfdGFibGVfdG9fY3N2KGRvY3VtZW50LCBcImxlZXRjb2Rlc3RhdHMuY3N2XCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoc2VsZWN0ZWRWYWx1ZSA9PT0gXCJlYXN5XCIpIHtcclxuICAgICAgICBleHBvcnRfdGFibGVfdG9fY3N2KGRvY3VtZW50LCBcImxlZXRjb2RlX2Vhc3lzdGF0cy5jc3ZcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChzZWxlY3RlZFZhbHVlID09PSBcIm1lZGl1bVwiKSB7XHJcbiAgICAgICAgZXhwb3J0X3RhYmxlX3RvX2Nzdihkb2N1bWVudCwgXCJsZWV0Y29kZV9tZWRpdW1zdGF0cy5jc3ZcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChzZWxlY3RlZFZhbHVlID09PSBcImhhcmRcIikge1xyXG4gICAgICAgIGV4cG9ydF90YWJsZV90b19jc3YoZG9jdW1lbnQsIFwibGVldGNvZGVfaGFyZHN0YXRzLmNzdlwiKTtcclxuICAgIH1cclxufSk7XHJcbmRpZmZpY3VsdHlTZWxlY3RvckRpdi5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIHNlbGVjdGVkVmFsdWUgPVxyXG4gICAgICAgIGRpZmZpY3VsdHlTZWxlY3RvckRpdi5vcHRpb25zW2RpZmZpY3VsdHlTZWxlY3RvckRpdi5zZWxlY3RlZEluZGV4XS52YWx1ZTtcclxuICAgIGNsZWFyVUkoKTtcclxuICAgIGlmIChzZWxlY3RlZFZhbHVlID09IFwiYWxsXCIpIHtcclxuICAgICAgICByZW5kZXJUYWJsZSgpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoc2VsZWN0ZWRWYWx1ZSA9PT0gXCJlYXN5XCIpIHtcclxuICAgICAgICByZW5kZXJJdGVtKGVhc3lQcm9ibGVtcywgc2VsZWN0ZWRWYWx1ZSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChzZWxlY3RlZFZhbHVlID09PSBcIm1lZGl1bVwiKSB7XHJcbiAgICAgICAgcmVuZGVySXRlbShtZWRpdW1Qcm9ibGVtcywgc2VsZWN0ZWRWYWx1ZSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChzZWxlY3RlZFZhbHVlID09IFwiaGFyZFwiKSB7XHJcbiAgICAgICAgcmVuZGVySXRlbShoYXJkUHJvYmxlbXMsIHNlbGVjdGVkVmFsdWUpO1xyXG4gICAgfVxyXG59KTtcclxuLypcclxuUmVuZGVyaW5nIERPTVxyXG5cclxuKi9cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgcmVuZGVyVGltZXJQYWdlKCk7XHJcbiAgICByZW5kZXJDaGFydCgpO1xyXG4gICAgcmVuZGVyVGFibGUoKTtcclxufSk7XHJcbi8vIFJlbmRlcnMgVGltZXJcclxuZnVuY3Rpb24gcmVuZGVyVGltZXJQYWdlKCkge1xyXG4gICAgbGV0IHByb2JsZW1EaWN0ID0ge307XHJcbiAgICAvLyBHZXQgdGhlIFByb2JsZW0ncyBOYW1lIGFuZCB1cGRhdGUgRE9NTVxyXG4gICAgY29uc3QgYWN0aW9uID0ge1xyXG4gICAgICAgIGFjdGlvbjogXCJnZXRQcm9ibGVtXCIsXHJcbiAgICB9O1xyXG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoYWN0aW9uLCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICBwcm9ibGVtRGljdC5wcm9ibGVtTmFtZSA9IHJlc3BvbnNlLnByb2JsZW1OYW1lO1xyXG4gICAgICAgIHByb2JsZW1EaWN0LmRpZmZpY3VsdHkgPSByZXNwb25zZS5kaWZmaWN1bHR5O1xyXG4gICAgICAgIGlmIChwcm9ibGVtRGljdC5wcm9ibGVtTmFtZSkge1xyXG4gICAgICAgICAgICBsZXQgbmFtZSA9IHByb2JsZW1EaWN0LnByb2JsZW1OYW1lLnNwbGl0KFwiLlwiKVsxXTtcclxuICAgICAgICAgICAgbGV0IGRpZmZpY3VsdHkgPSBwcm9ibGVtRGljdC5kaWZmaWN1bHR5O1xyXG4gICAgICAgICAgICBwcm9ibGVtVGl0bGVEaXYuaW5uZXJUZXh0ID0gbmFtZTtcclxuICAgICAgICAgICAgZGlmZmljdWx0eURpdi5pbm5lclRleHQgPSBkaWZmaWN1bHR5O1xyXG4gICAgICAgICAgICBkaWZmaWN1bHR5RGl2LmNsYXNzTGlzdC5hZGQoZGlmZmljdWx0eS50b0xvd2VyQ2FzZSgpKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIC8vIEdldCB0aGUgQ3VycmVudCBTdGF0ZSBhbmQgdXBkYXRlIERPTVxyXG4gICAgY29uc3QgdGltZXJBY3Rpb24gPSB7XHJcbiAgICAgICAgYWN0aW9uOiBcImdldFRpbWVyXCIsXHJcbiAgICB9O1xyXG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UodGltZXJBY3Rpb24sIGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGFydHN0b3AgPT0gMSkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0XCIpLmlubmVySFRNTCA9IFwiUGF1c2VcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAocmVzcG9uc2Uuc3RhcnRzdG9wID09IDIpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydFwiKS5pbm5lckhUTUwgPSBcIlN0YXJ0XCI7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAvLyAgR2V0IGhvdyBtdWNoIHRpbWUgaGFzIGVsYXBzZWRcclxuICAgIGNvbnN0IGdldEN1cnJlbnRUaW1lQWN0aW9uID0ge1xyXG4gICAgICAgIGFjdGlvbjogXCJnZXRDdXJyZW50VGltZVwiLFxyXG4gICAgfTtcclxuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKGdldEN1cnJlbnRUaW1lQWN0aW9uLCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBzcGVjaWFsQ2FzZShyZXNwb25zZS5taWxpU2VjT3V0LCByZXNwb25zZS5zZWNPdXQsIHJlc3BvbnNlLm1pbk91dCwgcmVzcG9uc2UuaG91ck91dCk7XHJcbiAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBtaWxsaXNlY29uZHNEaXYuaW5uZXJUZXh0ID0gXCIwMFwiO1xyXG4gICAgICAgICAgICBzZWNvbmRzRGl2LmlubmVyVGV4dCA9IFwiMDBcIjtcclxuICAgICAgICAgICAgbWludXRlc0Rpdi5pbm5lclRleHQgPSBcIjAwXCI7XHJcbiAgICAgICAgICAgIGhvdXJzRGl2LmlubmVyVGV4dCA9IFwiMDBcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIG1pbGxpc2Vjb25kc0Rpdi5pbm5lclRleHQgPSByZXNwb25zZS5taWxpU2VjT3V0LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIHNlY29uZHNEaXYuaW5uZXJUZXh0ID0gcmVzcG9uc2Uuc2VjT3V0LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIG1pbnV0ZXNEaXYuaW5uZXJUZXh0ID0gcmVzcG9uc2UubWluT3V0LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIGhvdXJzRGl2LmlubmVyVGV4dCA9IHJlc3BvbnNlLmhvdXJPdXQudG9TdHJpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5mdW5jdGlvbiBzcGVjaWFsQ2FzZShtaWxpc2VjLCBzZWNvbmQsIG1pbnV0ZSwgaG91cikge1xyXG4gICAgaWYgKG1pbGlzZWMgPT09IDAgJiYgc2Vjb25kID09PSAwICYmIG1pbnV0ZSA9PT0gMCAmJiBob3VyID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuLy8gTGlzdGVuZXJzXHJcbi8vIExpc3RlbnMgZm9yIENoYW5nZXMgYW5kIHVwZGF0ZSBVSSAgQWNjb3JkaW5nbHlcclxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmN0aW9uIChyZXF1ZXN0KSB7XHJcbiAgICBpZiAocmVxdWVzdC5zaG93R3JhcGgpIHtcclxuICAgICAgICByZW5kZXJDaGFydCgpO1xyXG4gICAgICAgIGNsZWFyVUkoKTtcclxuICAgICAgICByZW5kZXJUYWJsZSgpO1xyXG4gICAgfVxyXG59KTtcclxuLypcclxuQ2xlYXIncyBVSVxyXG4qL1xyXG5mdW5jdGlvbiBjbGVhclVJKCkge1xyXG4gICAgdGFibGVEaXYuaW5uZXJIVE1MID0gbnVsbDtcclxufVxyXG4vKlxyXG5SZW5kZXJzIENoYXJ0XHJcblxyXG4qL1xyXG4vL0B0cy1pZ25vcmVcclxuZnVuY3Rpb24gcmVuZGVyQ2hhcnQoKSB7XHJcbiAgICBsZXQgZWFzeUNvdW50ID0gMDtcclxuICAgIGxldCBtZWRpdW1Db3VudCA9IDA7XHJcbiAgICBsZXQgaGFyZENvdW50ID0gMDtcclxuICAgIGNvbnN0IGl0ZW1zID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJsZWV0Q29kZUV4dGVuc2lvbkRldGFpbHNcIik7XHJcbiAgICBpZiAoaXRlbXMpIHtcclxuICAgICAgICBjb25zdCBwYXJzZWRJdGVtID0gSlNPTi5wYXJzZShpdGVtcyk7XHJcbiAgICAgICAgZWFzeUNvdW50ID0gcGFyc2VkSXRlbS5lYXN5LmZpbHRlcigoaXRlbSkgPT4gdHlwZW9mIGl0ZW0uZHVwbGljYXRlSW5kZXggPT0gXCJudW1iZXJcIikubGVuZ3RoO1xyXG4gICAgICAgIG1lZGl1bUNvdW50ID0gcGFyc2VkSXRlbS5tZWRpdW0uZmlsdGVyKChpdGVtKSA9PiB0eXBlb2YgaXRlbS5kdXBsaWNhdGVJbmRleCA9PSBcIm51bWJlclwiKS5sZW5ndGg7XHJcbiAgICAgICAgaGFyZENvdW50ID0gcGFyc2VkSXRlbS5oYXJkLmZpbHRlcigoaXRlbSkgPT4gdHlwZW9mIGl0ZW0uZHVwbGljYXRlSW5kZXggPT0gXCJudW1iZXJcIikubGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgLy9AdHMtaWdub3JlXHJcbiAgICB2YXIgY3R4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteUNoYXJ0XCIpLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgIHZhciBteUNoYXJ0ID0gbmV3IGNoYXJ0X2pzXzEuQ2hhcnQoY3R4LCB7XHJcbiAgICAgICAgdHlwZTogXCJkb3VnaG51dFwiLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgbGFiZWxzOiBbXCJFYXN5XCIsIFwiTWVkaXVtXCIsIFwiSGFyZFwiXSxcclxuICAgICAgICAgICAgZGF0YXNldHM6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCIjIG9mIFZvdGVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW2Vhc3lDb3VudCwgbWVkaXVtQ291bnQsIGhhcmRDb3VudF0sXHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmdiKDY4LDE2MCw3MilcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZ2IoMjM5LDExMyw5KVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInJnYigyMzMsMzIsOTkpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBvcHRpb25zOiB7fSxcclxuICAgIH0pO1xyXG59XHJcbi8qXHJcblJlbmRlcnMgVGFibGVcclxuKi9cclxuZnVuY3Rpb24gcmVuZGVyVGFibGUoKSB7XHJcbiAgICBjb25zdCBpdGVtcyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibGVldENvZGVFeHRlbnNpb25EZXRhaWxzXCIpO1xyXG4gICAgaWYgKGl0ZW1zKSB7XHJcbiAgICAgICAgY29uc3QgcGFyc2VkID0gSlNPTi5wYXJzZShpdGVtcyk7XHJcbiAgICAgICAgZWFzeVByb2JsZW1zID0gcGFyc2VkLmVhc3k7XHJcbiAgICAgICAgbWVkaXVtUHJvYmxlbXMgPSBwYXJzZWQubWVkaXVtO1xyXG4gICAgICAgIGhhcmRQcm9ibGVtcyA9IHBhcnNlZC5oYXJkO1xyXG4gICAgICAgIHJlbmRlckl0ZW0oZWFzeVByb2JsZW1zLCBcImVhc3lcIik7XHJcbiAgICAgICAgcmVuZGVySXRlbShtZWRpdW1Qcm9ibGVtcywgXCJtZWRpdW1cIik7XHJcbiAgICAgICAgcmVuZGVySXRlbShoYXJkUHJvYmxlbXMsIFwiaGFyZFwiKTtcclxuICAgIH1cclxufVxyXG4vKlxyXG5SZW5kZXJzIEVhY2ggSW5kaXZpZHVhbCBUYWJsZSBpdGVtXHJcblxyXG4qL1xyXG5mdW5jdGlvbiByZW5kZXJJdGVtKGl0ZW1zLCBjbGFzc25hbWUpIHtcclxuICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xyXG4gICAgICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcclxuICAgICAgICBjb25zdCB0aW1lVGFrZW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgY29uc3QgcHJvYmxlbUxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcclxuICAgICAgICBjb25zdCBwcm9ibGVtTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgICAgICBjb25zdCBkaWZmaWN1bHR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG4gICAgICAgIGNvbnN0IGRhdGVTb2x2ZWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgcHJvYmxlbUxpbmsuaW5uZXJUZXh0ID0gaXRlbS5wcm9ibGVtTmFtZTtcclxuICAgICAgICBwcm9ibGVtTGluay5ocmVmID0gaXRlbS5wcm9ibGVtVXJsO1xyXG4gICAgICAgIHByb2JsZW1MaW5rLnNldEF0dHJpYnV0ZShcInRhcmdldFwiLCBcImJsYW5rXCIpO1xyXG4gICAgICAgIHByb2JsZW1OYW1lLmFwcGVuZENoaWxkKHByb2JsZW1MaW5rKTtcclxuICAgICAgICBkaWZmaWN1bHR5LmlubmVyVGV4dCA9IGl0ZW0uZGlmZmljdWx0eTtcclxuICAgICAgICBkaWZmaWN1bHR5LmNsYXNzTGlzdC5hZGQoY2xhc3NuYW1lICE9PSB1bmRlZmluZWQgPyBjbGFzc25hbWUgOiBpdGVtLmRpZmZpY3VsdHkudG9Mb3dlckNhc2UoKSk7XHJcbiAgICAgICAgdGltZVRha2VuLmlubmVyVGV4dCA9IGl0ZW0udGltZVRha2VuO1xyXG4gICAgICAgIGRhdGVTb2x2ZWQuaW5uZXJUZXh0ID0gaXRlbS5kYXRlO1xyXG4gICAgICAgIC8vIEFwcGVuZGluZyB0byB0aGUgUm93XHJcbiAgICAgICAgcm93LmFwcGVuZENoaWxkKHByb2JsZW1OYW1lKTtcclxuICAgICAgICByb3cuYXBwZW5kQ2hpbGQoZGlmZmljdWx0eSk7XHJcbiAgICAgICAgcm93LmFwcGVuZENoaWxkKHRpbWVUYWtlbik7XHJcbiAgICAgICAgcm93LmFwcGVuZENoaWxkKGRhdGVTb2x2ZWQpO1xyXG4gICAgICAgIHRhYmxlRGl2LmFwcGVuZENoaWxkKHJvdyk7XHJcbiAgICB9XHJcbn1cclxuLypcclxuQ1NWIEhlbHBlcnNcclxuQ3JlZGl0cyA6IGh0dHBzOi8vanNmaWRkbGUubmV0L2dlbmducy9qMWptMnRqeC9cclxuXHJcbiovXHJcbmZ1bmN0aW9uIGRvd25sb2FkX2Nzdihjc3YsIGZpbGVuYW1lKSB7XHJcbiAgICBsZXQgY3N2RmlsZTtcclxuICAgIGxldCBkb3dubG9hZExpbms7XHJcbiAgICAvLyBDU1YgRklMRVxyXG4gICAgY3N2RmlsZSA9IG5ldyBCbG9iKFtjc3ZdLCB7IHR5cGU6IFwidGV4dC9jc3ZcIiB9KTtcclxuICAgIC8vIERvd25sb2FkIGxpbmtcclxuICAgIGRvd25sb2FkTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xyXG4gICAgLy8gRmlsZSBuYW1lXHJcbiAgICBkb3dubG9hZExpbmsuZG93bmxvYWQgPSBmaWxlbmFtZTtcclxuICAgIC8vIFdlIGhhdmUgdG8gY3JlYXRlIGEgbGluayB0byB0aGUgZmlsZVxyXG4gICAgZG93bmxvYWRMaW5rLmhyZWYgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChjc3ZGaWxlKTtcclxuICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBsaW5rIGlzIG5vdCBkaXNwbGF5ZWRcclxuICAgIGRvd25sb2FkTGluay5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAvLyBBZGQgdGhlIGxpbmsgdG8geW91ciBET01cclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZG93bmxvYWRMaW5rKTtcclxuICAgIC8vIExhbnphbW9zXHJcbiAgICBkb3dubG9hZExpbmsuY2xpY2soKTtcclxufVxyXG5mdW5jdGlvbiBleHBvcnRfdGFibGVfdG9fY3N2KGh0bWwsIGZpbGVuYW1lKSB7XHJcbiAgICB2YXIgY3N2ID0gW107XHJcbiAgICBsZXQgdFJvd3NMZW5ndGggPSB0YWJsZURpdi5xdWVyeVNlbGVjdG9yQWxsKCd0cicpLmxlbmd0aDtcclxuICAgIHZhciByb3dzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInRhYmxlIHRyXCIpO1xyXG4gICAgaWYgKHRSb3dzTGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm93cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgcm93ID0gW10sIGNvbHMgPSByb3dzW2ldLnF1ZXJ5U2VsZWN0b3JBbGwoXCJ0ZCwgdGhcIik7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY29scy5sZW5ndGg7IGorKylcclxuICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgcm93LnB1c2goY29sc1tqXS5pbm5lclRleHQpO1xyXG4gICAgICAgICAgICBjc3YucHVzaChyb3cuam9pbihcIixcIikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBEb3dubG9hZCBDU1ZcclxuICAgICAgICBkb3dubG9hZF9jc3YoY3N2LmpvaW4oXCJcXG5cIiksIGZpbGVuYW1lKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KFwiTm90aGluZyB0byBFeHBvcnRcIik7XHJcbiAgICB9XHJcbn1cclxuLy8gU2VhcmNoIExvZ2ljXHJcbmZ1bmN0aW9uIHNlYXJjaCgpIHtcclxuICAgIC8vICBTcHJlYWRpbmcgcHJvYmxlbXNcclxuICAgIGxldCBwcm9ibGVtcyA9IFsuLi5lYXN5UHJvYmxlbXMsIC4uLm1lZGl1bVByb2JsZW1zLCAuLi5oYXJkUHJvYmxlbXNdO1xyXG4gICAgbGV0IHF1ZXJ5ID0gc2VhcmNoUXVlcnlEaXYudmFsdWU7XHJcbiAgICBxdWVyeSA9IHF1ZXJ5LnRvTG93ZXJDYXNlKCk7XHJcbiAgICBsZXQgc2VhcmNoZXMgPSBwcm9ibGVtcy5maWx0ZXIoKGl0ZW0pID0+IHtcclxuICAgICAgICByZXR1cm4gaXRlbS5wcm9ibGVtTmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHF1ZXJ5KTtcclxuICAgIH0pO1xyXG4gICAgY2xlYXJVSSgpO1xyXG4gICAgaWYgKHNlYXJjaGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICByZW5kZXJJdGVtKHNlYXJjaGVzKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IHNwYW5FbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIHNwYW5FbGVtLmlubmVyVGV4dCA9ICdPb3BzICEgTm90aGluZyBmb3VuZCc7XHJcbiAgICAgICAgdGFibGVEaXYuYXBwZW5kQ2hpbGQoc3BhbkVsZW0pO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=