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
const datePickerDiv = document.querySelector("#problem-date");
// Buttons Div
const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");
const saveBtn = document.getElementById("save");
const exportToCSVButton = document.getElementById("export-to-csv");
const searchBtn = document.getElementById("search-btn");
const clearBtn = document.getElementById("clear-btn");
// Get Title of the Current Page and URL
const backgroundPage = chrome.extension.getBackgroundPage();
// Variable Declarations
let easyProblems;
let mediumProblems;
let hardProblems;
let selectedValue = "all";
let selectedDate = null;
let dateString = "";
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
    if (selectedDate === null) {
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
    }
    else {
        renderWithRespectToDate();
    }
});
datePickerDiv.addEventListener("change", function () {
    selectedDate = datePickerDiv.value;
    selectedDate = new Date(selectedDate);
    let dd = String(selectedDate.getDate()).padStart(2, "0");
    //@ts-ignore
    let mm = String(selectedDate.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = selectedDate.getFullYear();
    dateString = dd + "/" + mm + "/" + yyyy;
    renderWithRespectToDate();
});
function renderWithRespectToDate() {
    let easyProblemsRender = easyProblems.filter((item) => {
        return item.date === dateString;
    });
    let mediumProblemsRender = mediumProblems.filter((item) => {
        return item.date === dateString;
    });
    let hardProblemsRender = hardProblems.filter((item) => {
        return item.date === dateString;
    });
    clearUI();
    if (selectedValue === "all") {
        renderItem(easyProblemsRender, "easy");
        renderItem(mediumProblemsRender, "medium");
        renderItem(hardProblemsRender, "hard");
    }
    else if (selectedValue === "easy") {
        renderItem(easyProblemsRender, "easy");
    }
    else if (selectedValue === "medium") {
        renderItem(mediumProblemsRender, "medium");
    }
    else if (selectedValue === "hard") {
        renderItem(hardProblemsRender, "hard");
    }
}
// Search Triggers when enter key is pressed
searchQueryDiv.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        if (searchQueryDiv.value) {
            search();
        }
    }
});
clearBtn.addEventListener("click", function () {
    selectedDate = null;
    datePickerDiv.value = null;
    selectedValue = "all";
    difficultySelectorDiv.value = "all";
    clearUI();
    renderTable();
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
        console.log(problemDict);
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
            document.getElementById("start").innerHTML = `<span class="material-icons material-icons-outlined">pause</span>
        <span class="btn-txt">Pause</span>`;
        }
        else if (response.startstop == 2) {
            document.getElementById("start").innerHTML = `<span class="material-icons material-icons-outlined">arrow_forward_ios </span>
        <span class="btn-txt">Start</span>`;
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
    let tRowsLength = tableDiv.querySelectorAll("tr").length;
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
        const spanElem = document.createElement("span");
        spanElem.innerText = "Oops ! Nothing found";
        tableDiv.appendChild(spanElem);
    }
    searchQueryDiv.value = "";
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BvcHVwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLFFBQVEsb0JBQW9CO1FBQzVCO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsaUJBQWlCLDRCQUE0QjtRQUM3QztRQUNBO1FBQ0Esa0JBQWtCLDJCQUEyQjtRQUM3QztRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGdCQUFnQix1QkFBdUI7UUFDdkM7OztRQUdBO1FBQ0E7UUFDQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDdkphO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsbUJBQW1CLG1CQUFPLENBQUMsdURBQVU7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRUFBa0U7QUFDbEU7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7QUFDVCxtQkFBbUI7QUFDbkIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLG1CQUFtQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsaUJBQWlCO0FBQ3hDO0FBQ0EsMkJBQTJCLGlCQUFpQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InBvcHVwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcInBvcHVwXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goW1wiLi9zcmMvcG9wdXAudHNcIixcInZlbmRvclwiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IGNoYXJ0X2pzXzEgPSByZXF1aXJlKFwiY2hhcnQuanNcIik7XHJcbi8vRGV2IFN0dWZmc1xyXG4vLyBAdHMtaWdub3JlXHJcbmNvbnN0IGNvbnNvbGUgPSBjaHJvbWUuZXh0ZW5zaW9uLmdldEJhY2tncm91bmRQYWdlKCkuY29uc29sZTtcclxuLypcclxuQ2FjaGUgRG9tXHJcblxyXG4qL1xyXG5jb25zdCBwcm9ibGVtVGl0bGVEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2JsZW0tdGl0bGVcIik7XHJcbmNvbnN0IGRpZmZpY3VsdHlEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2JsZW0tZGlmZmljdWx0eVwiKTtcclxuY29uc3QgdGFibGVEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2JsZW0tdGFibGVcIik7XHJcbmNvbnN0IGRpZmZpY3VsdHlTZWxlY3RvckRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGlmZmljdWx0eS1zZWxlY3RvclwiKTtcclxuY29uc3QgbWlsbGlzZWNvbmRzRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtaWxpc2VjXCIpO1xyXG5jb25zdCBzZWNvbmRzRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWNcIik7XHJcbmNvbnN0IG1pbnV0ZXNEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1pblwiKTtcclxuY29uc3QgaG91cnNEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdXJcIik7XHJcbmNvbnN0IHNlYXJjaFF1ZXJ5RGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2gtdGV4dFwiKTtcclxuY29uc3QgZGF0ZVBpY2tlckRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvYmxlbS1kYXRlXCIpO1xyXG4vLyBCdXR0b25zIERpdlxyXG5jb25zdCBzdGFydEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnRcIik7XHJcbmNvbnN0IHJlc2V0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXNldFwiKTtcclxuY29uc3Qgc2F2ZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2F2ZVwiKTtcclxuY29uc3QgZXhwb3J0VG9DU1ZCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImV4cG9ydC10by1jc3ZcIik7XHJcbmNvbnN0IHNlYXJjaEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoLWJ0blwiKTtcclxuY29uc3QgY2xlYXJCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsZWFyLWJ0blwiKTtcclxuLy8gR2V0IFRpdGxlIG9mIHRoZSBDdXJyZW50IFBhZ2UgYW5kIFVSTFxyXG5jb25zdCBiYWNrZ3JvdW5kUGFnZSA9IGNocm9tZS5leHRlbnNpb24uZ2V0QmFja2dyb3VuZFBhZ2UoKTtcclxuLy8gVmFyaWFibGUgRGVjbGFyYXRpb25zXHJcbmxldCBlYXN5UHJvYmxlbXM7XHJcbmxldCBtZWRpdW1Qcm9ibGVtcztcclxubGV0IGhhcmRQcm9ibGVtcztcclxubGV0IHNlbGVjdGVkVmFsdWUgPSBcImFsbFwiO1xyXG5sZXQgc2VsZWN0ZWREYXRlID0gbnVsbDtcclxubGV0IGRhdGVTdHJpbmcgPSBcIlwiO1xyXG4vLyAgQmFja2dyb3VuZCBQYWdlXHJcbi8qXHJcbkFkZGluZyBFdmVudCBMaXN0ZW5lcnNcclxuXHJcbiovXHJcbi8vQHRzLWlnbm9yZVxyXG5zdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgLy9AdHMtaWdub3JlXHJcbiAgICBiYWNrZ3JvdW5kUGFnZS5zdGFydFN0b3AoKTtcclxufSk7XHJcbnJlc2V0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL0B0cy1pZ25vcmVcclxuICAgIGJhY2tncm91bmRQYWdlLnJlc2V0RnVuYygpO1xyXG59KTtcclxuc2F2ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgLy9AdHMtaWdub3JlXHJcbiAgICBiYWNrZ3JvdW5kUGFnZS5zYXZlRGF0YSgpO1xyXG59KTtcclxuc2VhcmNoQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBzZWFyY2goKTtcclxufSk7XHJcbmV4cG9ydFRvQ1NWQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoc2VsZWN0ZWRWYWx1ZSA9PT0gXCJhbGxcIikge1xyXG4gICAgICAgIGV4cG9ydF90YWJsZV90b19jc3YoZG9jdW1lbnQsIFwibGVldGNvZGVzdGF0cy5jc3ZcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChzZWxlY3RlZFZhbHVlID09PSBcImVhc3lcIikge1xyXG4gICAgICAgIGV4cG9ydF90YWJsZV90b19jc3YoZG9jdW1lbnQsIFwibGVldGNvZGVfZWFzeXN0YXRzLmNzdlwiKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHNlbGVjdGVkVmFsdWUgPT09IFwibWVkaXVtXCIpIHtcclxuICAgICAgICBleHBvcnRfdGFibGVfdG9fY3N2KGRvY3VtZW50LCBcImxlZXRjb2RlX21lZGl1bXN0YXRzLmNzdlwiKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHNlbGVjdGVkVmFsdWUgPT09IFwiaGFyZFwiKSB7XHJcbiAgICAgICAgZXhwb3J0X3RhYmxlX3RvX2Nzdihkb2N1bWVudCwgXCJsZWV0Y29kZV9oYXJkc3RhdHMuY3N2XCIpO1xyXG4gICAgfVxyXG59KTtcclxuZGlmZmljdWx0eVNlbGVjdG9yRGl2LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgc2VsZWN0ZWRWYWx1ZSA9XHJcbiAgICAgICAgZGlmZmljdWx0eVNlbGVjdG9yRGl2Lm9wdGlvbnNbZGlmZmljdWx0eVNlbGVjdG9yRGl2LnNlbGVjdGVkSW5kZXhdLnZhbHVlO1xyXG4gICAgY2xlYXJVSSgpO1xyXG4gICAgaWYgKHNlbGVjdGVkRGF0ZSA9PT0gbnVsbCkge1xyXG4gICAgICAgIGlmIChzZWxlY3RlZFZhbHVlID09IFwiYWxsXCIpIHtcclxuICAgICAgICAgICAgcmVuZGVyVGFibGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoc2VsZWN0ZWRWYWx1ZSA9PT0gXCJlYXN5XCIpIHtcclxuICAgICAgICAgICAgcmVuZGVySXRlbShlYXN5UHJvYmxlbXMsIHNlbGVjdGVkVmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChzZWxlY3RlZFZhbHVlID09PSBcIm1lZGl1bVwiKSB7XHJcbiAgICAgICAgICAgIHJlbmRlckl0ZW0obWVkaXVtUHJvYmxlbXMsIHNlbGVjdGVkVmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChzZWxlY3RlZFZhbHVlID09IFwiaGFyZFwiKSB7XHJcbiAgICAgICAgICAgIHJlbmRlckl0ZW0oaGFyZFByb2JsZW1zLCBzZWxlY3RlZFZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZW5kZXJXaXRoUmVzcGVjdFRvRGF0ZSgpO1xyXG4gICAgfVxyXG59KTtcclxuZGF0ZVBpY2tlckRpdi5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIHNlbGVjdGVkRGF0ZSA9IGRhdGVQaWNrZXJEaXYudmFsdWU7XHJcbiAgICBzZWxlY3RlZERhdGUgPSBuZXcgRGF0ZShzZWxlY3RlZERhdGUpO1xyXG4gICAgbGV0IGRkID0gU3RyaW5nKHNlbGVjdGVkRGF0ZS5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgbGV0IG1tID0gU3RyaW5nKHNlbGVjdGVkRGF0ZS5nZXRNb250aCgpICsgMSkucGFkU3RhcnQoMiwgXCIwXCIpOyAvL0phbnVhcnkgaXMgMCFcclxuICAgIGxldCB5eXl5ID0gc2VsZWN0ZWREYXRlLmdldEZ1bGxZZWFyKCk7XHJcbiAgICBkYXRlU3RyaW5nID0gZGQgKyBcIi9cIiArIG1tICsgXCIvXCIgKyB5eXl5O1xyXG4gICAgcmVuZGVyV2l0aFJlc3BlY3RUb0RhdGUoKTtcclxufSk7XHJcbmZ1bmN0aW9uIHJlbmRlcldpdGhSZXNwZWN0VG9EYXRlKCkge1xyXG4gICAgbGV0IGVhc3lQcm9ibGVtc1JlbmRlciA9IGVhc3lQcm9ibGVtcy5maWx0ZXIoKGl0ZW0pID0+IHtcclxuICAgICAgICByZXR1cm4gaXRlbS5kYXRlID09PSBkYXRlU3RyaW5nO1xyXG4gICAgfSk7XHJcbiAgICBsZXQgbWVkaXVtUHJvYmxlbXNSZW5kZXIgPSBtZWRpdW1Qcm9ibGVtcy5maWx0ZXIoKGl0ZW0pID0+IHtcclxuICAgICAgICByZXR1cm4gaXRlbS5kYXRlID09PSBkYXRlU3RyaW5nO1xyXG4gICAgfSk7XHJcbiAgICBsZXQgaGFyZFByb2JsZW1zUmVuZGVyID0gaGFyZFByb2JsZW1zLmZpbHRlcigoaXRlbSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBpdGVtLmRhdGUgPT09IGRhdGVTdHJpbmc7XHJcbiAgICB9KTtcclxuICAgIGNsZWFyVUkoKTtcclxuICAgIGlmIChzZWxlY3RlZFZhbHVlID09PSBcImFsbFwiKSB7XHJcbiAgICAgICAgcmVuZGVySXRlbShlYXN5UHJvYmxlbXNSZW5kZXIsIFwiZWFzeVwiKTtcclxuICAgICAgICByZW5kZXJJdGVtKG1lZGl1bVByb2JsZW1zUmVuZGVyLCBcIm1lZGl1bVwiKTtcclxuICAgICAgICByZW5kZXJJdGVtKGhhcmRQcm9ibGVtc1JlbmRlciwgXCJoYXJkXCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoc2VsZWN0ZWRWYWx1ZSA9PT0gXCJlYXN5XCIpIHtcclxuICAgICAgICByZW5kZXJJdGVtKGVhc3lQcm9ibGVtc1JlbmRlciwgXCJlYXN5XCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoc2VsZWN0ZWRWYWx1ZSA9PT0gXCJtZWRpdW1cIikge1xyXG4gICAgICAgIHJlbmRlckl0ZW0obWVkaXVtUHJvYmxlbXNSZW5kZXIsIFwibWVkaXVtXCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoc2VsZWN0ZWRWYWx1ZSA9PT0gXCJoYXJkXCIpIHtcclxuICAgICAgICByZW5kZXJJdGVtKGhhcmRQcm9ibGVtc1JlbmRlciwgXCJoYXJkXCIpO1xyXG4gICAgfVxyXG59XHJcbi8vIFNlYXJjaCBUcmlnZ2VycyB3aGVuIGVudGVyIGtleSBpcyBwcmVzc2VkXHJcbnNlYXJjaFF1ZXJ5RGl2LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlwcmVzc1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgaWYgKGUua2V5ID09PSBcIkVudGVyXCIpIHtcclxuICAgICAgICBpZiAoc2VhcmNoUXVlcnlEaXYudmFsdWUpIHtcclxuICAgICAgICAgICAgc2VhcmNoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuY2xlYXJCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIHNlbGVjdGVkRGF0ZSA9IG51bGw7XHJcbiAgICBkYXRlUGlja2VyRGl2LnZhbHVlID0gbnVsbDtcclxuICAgIHNlbGVjdGVkVmFsdWUgPSBcImFsbFwiO1xyXG4gICAgZGlmZmljdWx0eVNlbGVjdG9yRGl2LnZhbHVlID0gXCJhbGxcIjtcclxuICAgIGNsZWFyVUkoKTtcclxuICAgIHJlbmRlclRhYmxlKCk7XHJcbn0pO1xyXG4vKlxyXG5SZW5kZXJpbmcgRE9NXHJcblxyXG4qL1xyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICByZW5kZXJUaW1lclBhZ2UoKTtcclxuICAgIHJlbmRlckNoYXJ0KCk7XHJcbiAgICByZW5kZXJUYWJsZSgpO1xyXG59KTtcclxuLy8gUmVuZGVycyBUaW1lclxyXG5mdW5jdGlvbiByZW5kZXJUaW1lclBhZ2UoKSB7XHJcbiAgICBsZXQgcHJvYmxlbURpY3QgPSB7fTtcclxuICAgIC8vIEdldCB0aGUgUHJvYmxlbSdzIE5hbWUgYW5kIHVwZGF0ZSBET01NXHJcbiAgICBjb25zdCBhY3Rpb24gPSB7XHJcbiAgICAgICAgYWN0aW9uOiBcImdldFByb2JsZW1cIixcclxuICAgIH07XHJcbiAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShhY3Rpb24sIGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgIHByb2JsZW1EaWN0LnByb2JsZW1OYW1lID0gcmVzcG9uc2UucHJvYmxlbU5hbWU7XHJcbiAgICAgICAgcHJvYmxlbURpY3QuZGlmZmljdWx0eSA9IHJlc3BvbnNlLmRpZmZpY3VsdHk7XHJcbiAgICAgICAgY29uc29sZS5sb2cocHJvYmxlbURpY3QpO1xyXG4gICAgICAgIGlmIChwcm9ibGVtRGljdC5wcm9ibGVtTmFtZSkge1xyXG4gICAgICAgICAgICBsZXQgbmFtZSA9IHByb2JsZW1EaWN0LnByb2JsZW1OYW1lLnNwbGl0KFwiLlwiKVsxXTtcclxuICAgICAgICAgICAgbGV0IGRpZmZpY3VsdHkgPSBwcm9ibGVtRGljdC5kaWZmaWN1bHR5O1xyXG4gICAgICAgICAgICBwcm9ibGVtVGl0bGVEaXYuaW5uZXJUZXh0ID0gbmFtZTtcclxuICAgICAgICAgICAgZGlmZmljdWx0eURpdi5pbm5lclRleHQgPSBkaWZmaWN1bHR5O1xyXG4gICAgICAgICAgICBkaWZmaWN1bHR5RGl2LmNsYXNzTGlzdC5hZGQoZGlmZmljdWx0eS50b0xvd2VyQ2FzZSgpKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIC8vIEdldCB0aGUgQ3VycmVudCBTdGF0ZSBhbmQgdXBkYXRlIERPTVxyXG4gICAgY29uc3QgdGltZXJBY3Rpb24gPSB7XHJcbiAgICAgICAgYWN0aW9uOiBcImdldFRpbWVyXCIsXHJcbiAgICB9O1xyXG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UodGltZXJBY3Rpb24sIGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGFydHN0b3AgPT0gMSkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0XCIpLmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cIm1hdGVyaWFsLWljb25zIG1hdGVyaWFsLWljb25zLW91dGxpbmVkXCI+cGF1c2U8L3NwYW4+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJidG4tdHh0XCI+UGF1c2U8L3NwYW4+YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAocmVzcG9uc2Uuc3RhcnRzdG9wID09IDIpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydFwiKS5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1pY29ucyBtYXRlcmlhbC1pY29ucy1vdXRsaW5lZFwiPmFycm93X2ZvcndhcmRfaW9zIDwvc3Bhbj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImJ0bi10eHRcIj5TdGFydDwvc3Bhbj5gO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgLy8gIEdldCBob3cgbXVjaCB0aW1lIGhhcyBlbGFwc2VkXHJcbiAgICBjb25zdCBnZXRDdXJyZW50VGltZUFjdGlvbiA9IHtcclxuICAgICAgICBhY3Rpb246IFwiZ2V0Q3VycmVudFRpbWVcIixcclxuICAgIH07XHJcbiAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShnZXRDdXJyZW50VGltZUFjdGlvbiwgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gc3BlY2lhbENhc2UocmVzcG9uc2UubWlsaVNlY091dCwgcmVzcG9uc2Uuc2VjT3V0LCByZXNwb25zZS5taW5PdXQsIHJlc3BvbnNlLmhvdXJPdXQpO1xyXG4gICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgbWlsbGlzZWNvbmRzRGl2LmlubmVyVGV4dCA9IFwiMDBcIjtcclxuICAgICAgICAgICAgc2Vjb25kc0Rpdi5pbm5lclRleHQgPSBcIjAwXCI7XHJcbiAgICAgICAgICAgIG1pbnV0ZXNEaXYuaW5uZXJUZXh0ID0gXCIwMFwiO1xyXG4gICAgICAgICAgICBob3Vyc0Rpdi5pbm5lclRleHQgPSBcIjAwXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBtaWxsaXNlY29uZHNEaXYuaW5uZXJUZXh0ID0gcmVzcG9uc2UubWlsaVNlY091dC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICBzZWNvbmRzRGl2LmlubmVyVGV4dCA9IHJlc3BvbnNlLnNlY091dC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICBtaW51dGVzRGl2LmlubmVyVGV4dCA9IHJlc3BvbnNlLm1pbk91dC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICBob3Vyc0Rpdi5pbm5lclRleHQgPSByZXNwb25zZS5ob3VyT3V0LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuZnVuY3Rpb24gc3BlY2lhbENhc2UobWlsaXNlYywgc2Vjb25kLCBtaW51dGUsIGhvdXIpIHtcclxuICAgIGlmIChtaWxpc2VjID09PSAwICYmIHNlY29uZCA9PT0gMCAmJiBtaW51dGUgPT09IDAgJiYgaG91ciA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcbi8vIExpc3RlbmVyc1xyXG4vLyBMaXN0ZW5zIGZvciBDaGFuZ2VzIGFuZCB1cGRhdGUgVUkgIEFjY29yZGluZ2x5XHJcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbiAocmVxdWVzdCkge1xyXG4gICAgaWYgKHJlcXVlc3Quc2hvd0dyYXBoKSB7XHJcbiAgICAgICAgcmVuZGVyQ2hhcnQoKTtcclxuICAgICAgICBjbGVhclVJKCk7XHJcbiAgICAgICAgcmVuZGVyVGFibGUoKTtcclxuICAgIH1cclxufSk7XHJcbi8qXHJcbkNsZWFyJ3MgVUlcclxuKi9cclxuZnVuY3Rpb24gY2xlYXJVSSgpIHtcclxuICAgIHRhYmxlRGl2LmlubmVySFRNTCA9IG51bGw7XHJcbn1cclxuLypcclxuUmVuZGVycyBDaGFydFxyXG5cclxuKi9cclxuLy9AdHMtaWdub3JlXHJcbmZ1bmN0aW9uIHJlbmRlckNoYXJ0KCkge1xyXG4gICAgbGV0IGVhc3lDb3VudCA9IDA7XHJcbiAgICBsZXQgbWVkaXVtQ291bnQgPSAwO1xyXG4gICAgbGV0IGhhcmRDb3VudCA9IDA7XHJcbiAgICBjb25zdCBpdGVtcyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibGVldENvZGVFeHRlbnNpb25EZXRhaWxzXCIpO1xyXG4gICAgaWYgKGl0ZW1zKSB7XHJcbiAgICAgICAgY29uc3QgcGFyc2VkSXRlbSA9IEpTT04ucGFyc2UoaXRlbXMpO1xyXG4gICAgICAgIGVhc3lDb3VudCA9IHBhcnNlZEl0ZW0uZWFzeS5maWx0ZXIoKGl0ZW0pID0+IHR5cGVvZiBpdGVtLmR1cGxpY2F0ZUluZGV4ID09IFwibnVtYmVyXCIpLmxlbmd0aDtcclxuICAgICAgICBtZWRpdW1Db3VudCA9IHBhcnNlZEl0ZW0ubWVkaXVtLmZpbHRlcigoaXRlbSkgPT4gdHlwZW9mIGl0ZW0uZHVwbGljYXRlSW5kZXggPT0gXCJudW1iZXJcIikubGVuZ3RoO1xyXG4gICAgICAgIGhhcmRDb3VudCA9IHBhcnNlZEl0ZW0uaGFyZC5maWx0ZXIoKGl0ZW0pID0+IHR5cGVvZiBpdGVtLmR1cGxpY2F0ZUluZGV4ID09IFwibnVtYmVyXCIpLmxlbmd0aDtcclxuICAgIH1cclxuICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgdmFyIGN0eCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlDaGFydFwiKS5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICB2YXIgbXlDaGFydCA9IG5ldyBjaGFydF9qc18xLkNoYXJ0KGN0eCwge1xyXG4gICAgICAgIHR5cGU6IFwiZG91Z2hudXRcIixcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIGxhYmVsczogW1wiRWFzeVwiLCBcIk1lZGl1bVwiLCBcIkhhcmRcIl0sXHJcbiAgICAgICAgICAgIGRhdGFzZXRzOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiIyBvZiBWb3Rlc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtlYXN5Q291bnQsIG1lZGl1bUNvdW50LCBoYXJkQ291bnRdLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInJnYig2OCwxNjAsNzIpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmdiKDIzOSwxMTMsOSlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZ2IoMjMzLDMyLDk5KVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb3B0aW9uczoge30sXHJcbiAgICB9KTtcclxufVxyXG4vKlxyXG5SZW5kZXJzIFRhYmxlXHJcbiovXHJcbmZ1bmN0aW9uIHJlbmRlclRhYmxlKCkge1xyXG4gICAgY29uc3QgaXRlbXMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImxlZXRDb2RlRXh0ZW5zaW9uRGV0YWlsc1wiKTtcclxuICAgIGlmIChpdGVtcykge1xyXG4gICAgICAgIGNvbnN0IHBhcnNlZCA9IEpTT04ucGFyc2UoaXRlbXMpO1xyXG4gICAgICAgIGVhc3lQcm9ibGVtcyA9IHBhcnNlZC5lYXN5O1xyXG4gICAgICAgIG1lZGl1bVByb2JsZW1zID0gcGFyc2VkLm1lZGl1bTtcclxuICAgICAgICBoYXJkUHJvYmxlbXMgPSBwYXJzZWQuaGFyZDtcclxuICAgICAgICByZW5kZXJJdGVtKGVhc3lQcm9ibGVtcywgXCJlYXN5XCIpO1xyXG4gICAgICAgIHJlbmRlckl0ZW0obWVkaXVtUHJvYmxlbXMsIFwibWVkaXVtXCIpO1xyXG4gICAgICAgIHJlbmRlckl0ZW0oaGFyZFByb2JsZW1zLCBcImhhcmRcIik7XHJcbiAgICB9XHJcbn1cclxuLypcclxuUmVuZGVycyBFYWNoIEluZGl2aWR1YWwgVGFibGUgaXRlbVxyXG5cclxuKi9cclxuZnVuY3Rpb24gcmVuZGVySXRlbShpdGVtcywgY2xhc3NuYW1lKSB7XHJcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcclxuICAgICAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XHJcbiAgICAgICAgY29uc3QgdGltZVRha2VuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG4gICAgICAgIGNvbnN0IHByb2JsZW1MaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XHJcbiAgICAgICAgY29uc3QgcHJvYmxlbU5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgY29uc3QgZGlmZmljdWx0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgICAgICBjb25zdCBkYXRlU29sdmVkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG4gICAgICAgIHByb2JsZW1MaW5rLmlubmVyVGV4dCA9IGl0ZW0ucHJvYmxlbU5hbWU7XHJcbiAgICAgICAgcHJvYmxlbUxpbmsuaHJlZiA9IGl0ZW0ucHJvYmxlbVVybDtcclxuICAgICAgICBwcm9ibGVtTGluay5zZXRBdHRyaWJ1dGUoXCJ0YXJnZXRcIiwgXCJibGFua1wiKTtcclxuICAgICAgICBwcm9ibGVtTmFtZS5hcHBlbmRDaGlsZChwcm9ibGVtTGluayk7XHJcbiAgICAgICAgZGlmZmljdWx0eS5pbm5lclRleHQgPSBpdGVtLmRpZmZpY3VsdHk7XHJcbiAgICAgICAgZGlmZmljdWx0eS5jbGFzc0xpc3QuYWRkKGNsYXNzbmFtZSAhPT0gdW5kZWZpbmVkID8gY2xhc3NuYW1lIDogaXRlbS5kaWZmaWN1bHR5LnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgICAgIHRpbWVUYWtlbi5pbm5lclRleHQgPSBpdGVtLnRpbWVUYWtlbjtcclxuICAgICAgICBkYXRlU29sdmVkLmlubmVyVGV4dCA9IGl0ZW0uZGF0ZTtcclxuICAgICAgICAvLyBBcHBlbmRpbmcgdG8gdGhlIFJvd1xyXG4gICAgICAgIHJvdy5hcHBlbmRDaGlsZChwcm9ibGVtTmFtZSk7XHJcbiAgICAgICAgcm93LmFwcGVuZENoaWxkKGRpZmZpY3VsdHkpO1xyXG4gICAgICAgIHJvdy5hcHBlbmRDaGlsZCh0aW1lVGFrZW4pO1xyXG4gICAgICAgIHJvdy5hcHBlbmRDaGlsZChkYXRlU29sdmVkKTtcclxuICAgICAgICB0YWJsZURpdi5hcHBlbmRDaGlsZChyb3cpO1xyXG4gICAgfVxyXG59XHJcbi8qXHJcbkNTViBIZWxwZXJzXHJcbkNyZWRpdHMgOiBodHRwczovL2pzZmlkZGxlLm5ldC9nZW5nbnMvajFqbTJ0angvXHJcblxyXG4qL1xyXG5mdW5jdGlvbiBkb3dubG9hZF9jc3YoY3N2LCBmaWxlbmFtZSkge1xyXG4gICAgbGV0IGNzdkZpbGU7XHJcbiAgICBsZXQgZG93bmxvYWRMaW5rO1xyXG4gICAgLy8gQ1NWIEZJTEVcclxuICAgIGNzdkZpbGUgPSBuZXcgQmxvYihbY3N2XSwgeyB0eXBlOiBcInRleHQvY3N2XCIgfSk7XHJcbiAgICAvLyBEb3dubG9hZCBsaW5rXHJcbiAgICBkb3dubG9hZExpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcclxuICAgIC8vIEZpbGUgbmFtZVxyXG4gICAgZG93bmxvYWRMaW5rLmRvd25sb2FkID0gZmlsZW5hbWU7XHJcbiAgICAvLyBXZSBoYXZlIHRvIGNyZWF0ZSBhIGxpbmsgdG8gdGhlIGZpbGVcclxuICAgIGRvd25sb2FkTGluay5ocmVmID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoY3N2RmlsZSk7XHJcbiAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGUgbGluayBpcyBub3QgZGlzcGxheWVkXHJcbiAgICBkb3dubG9hZExpbmsuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgLy8gQWRkIHRoZSBsaW5rIHRvIHlvdXIgRE9NXHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRvd25sb2FkTGluayk7XHJcbiAgICAvLyBMYW56YW1vc1xyXG4gICAgZG93bmxvYWRMaW5rLmNsaWNrKCk7XHJcbn1cclxuZnVuY3Rpb24gZXhwb3J0X3RhYmxlX3RvX2NzdihodG1sLCBmaWxlbmFtZSkge1xyXG4gICAgdmFyIGNzdiA9IFtdO1xyXG4gICAgbGV0IHRSb3dzTGVuZ3RoID0gdGFibGVEaXYucXVlcnlTZWxlY3RvckFsbChcInRyXCIpLmxlbmd0aDtcclxuICAgIHZhciByb3dzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInRhYmxlIHRyXCIpO1xyXG4gICAgaWYgKHRSb3dzTGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm93cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgcm93ID0gW10sIGNvbHMgPSByb3dzW2ldLnF1ZXJ5U2VsZWN0b3JBbGwoXCJ0ZCwgdGhcIik7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY29scy5sZW5ndGg7IGorKylcclxuICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgcm93LnB1c2goY29sc1tqXS5pbm5lclRleHQpO1xyXG4gICAgICAgICAgICBjc3YucHVzaChyb3cuam9pbihcIixcIikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBEb3dubG9hZCBDU1ZcclxuICAgICAgICBkb3dubG9hZF9jc3YoY3N2LmpvaW4oXCJcXG5cIiksIGZpbGVuYW1lKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KFwiTm90aGluZyB0byBFeHBvcnRcIik7XHJcbiAgICB9XHJcbn1cclxuLy8gU2VhcmNoIExvZ2ljXHJcbmZ1bmN0aW9uIHNlYXJjaCgpIHtcclxuICAgIC8vICBTcHJlYWRpbmcgcHJvYmxlbXNcclxuICAgIGxldCBwcm9ibGVtcyA9IFsuLi5lYXN5UHJvYmxlbXMsIC4uLm1lZGl1bVByb2JsZW1zLCAuLi5oYXJkUHJvYmxlbXNdO1xyXG4gICAgbGV0IHF1ZXJ5ID0gc2VhcmNoUXVlcnlEaXYudmFsdWU7XHJcbiAgICBxdWVyeSA9IHF1ZXJ5LnRvTG93ZXJDYXNlKCk7XHJcbiAgICBsZXQgc2VhcmNoZXMgPSBwcm9ibGVtcy5maWx0ZXIoKGl0ZW0pID0+IHtcclxuICAgICAgICByZXR1cm4gaXRlbS5wcm9ibGVtTmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHF1ZXJ5KTtcclxuICAgIH0pO1xyXG4gICAgY2xlYXJVSSgpO1xyXG4gICAgaWYgKHNlYXJjaGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICByZW5kZXJJdGVtKHNlYXJjaGVzKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IHNwYW5FbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgc3BhbkVsZW0uaW5uZXJUZXh0ID0gXCJPb3BzICEgTm90aGluZyBmb3VuZFwiO1xyXG4gICAgICAgIHRhYmxlRGl2LmFwcGVuZENoaWxkKHNwYW5FbGVtKTtcclxuICAgIH1cclxuICAgIHNlYXJjaFF1ZXJ5RGl2LnZhbHVlID0gXCJcIjtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9