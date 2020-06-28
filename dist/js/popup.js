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
        spanElem.className = "no-items";
        spanElem.innerText = "Oops ! Nothing found";
        tableDiv.appendChild(spanElem);
    }
    searchQueryDiv.value = "";
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BvcHVwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLFFBQVEsb0JBQW9CO1FBQzVCO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsaUJBQWlCLDRCQUE0QjtRQUM3QztRQUNBO1FBQ0Esa0JBQWtCLDJCQUEyQjtRQUM3QztRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGdCQUFnQix1QkFBdUI7UUFDdkM7OztRQUdBO1FBQ0E7UUFDQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDdkphO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsbUJBQW1CLG1CQUFPLENBQUMsdURBQVU7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRUFBa0U7QUFDbEU7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7QUFDVCxtQkFBbUI7QUFDbkIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLG1CQUFtQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsaUJBQWlCO0FBQ3hDO0FBQ0EsMkJBQTJCLGlCQUFpQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoicG9wdXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwicG9wdXBcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbXCIuL3NyYy9wb3B1cC50c1wiLFwidmVuZG9yXCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgY2hhcnRfanNfMSA9IHJlcXVpcmUoXCJjaGFydC5qc1wiKTtcclxuLy9EZXYgU3R1ZmZzXHJcbi8vIEB0cy1pZ25vcmVcclxuY29uc3QgY29uc29sZSA9IGNocm9tZS5leHRlbnNpb24uZ2V0QmFja2dyb3VuZFBhZ2UoKS5jb25zb2xlO1xyXG4vKlxyXG5DYWNoZSBEb21cclxuXHJcbiovXHJcbmNvbnN0IHByb2JsZW1UaXRsZURpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvYmxlbS10aXRsZVwiKTtcclxuY29uc3QgZGlmZmljdWx0eURpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvYmxlbS1kaWZmaWN1bHR5XCIpO1xyXG5jb25zdCB0YWJsZURpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvYmxlbS10YWJsZVwiKTtcclxuY29uc3QgZGlmZmljdWx0eVNlbGVjdG9yRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkaWZmaWN1bHR5LXNlbGVjdG9yXCIpO1xyXG5jb25zdCBtaWxsaXNlY29uZHNEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1pbGlzZWNcIik7XHJcbmNvbnN0IHNlY29uZHNEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlY1wiKTtcclxuY29uc3QgbWludXRlc0RpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWluXCIpO1xyXG5jb25zdCBob3Vyc0RpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG91clwiKTtcclxuY29uc3Qgc2VhcmNoUXVlcnlEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaC10ZXh0XCIpO1xyXG5jb25zdCBkYXRlUGlja2VyRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9ibGVtLWRhdGVcIik7XHJcbi8vIEJ1dHRvbnMgRGl2XHJcbmNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydFwiKTtcclxuY29uc3QgcmVzZXRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlc2V0XCIpO1xyXG5jb25zdCBzYXZlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzYXZlXCIpO1xyXG5jb25zdCBleHBvcnRUb0NTVkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXhwb3J0LXRvLWNzdlwiKTtcclxuY29uc3Qgc2VhcmNoQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2gtYnRuXCIpO1xyXG5jb25zdCBjbGVhckJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xlYXItYnRuXCIpO1xyXG4vLyBHZXQgVGl0bGUgb2YgdGhlIEN1cnJlbnQgUGFnZSBhbmQgVVJMXHJcbmNvbnN0IGJhY2tncm91bmRQYWdlID0gY2hyb21lLmV4dGVuc2lvbi5nZXRCYWNrZ3JvdW5kUGFnZSgpO1xyXG4vLyBWYXJpYWJsZSBEZWNsYXJhdGlvbnNcclxubGV0IGVhc3lQcm9ibGVtcztcclxubGV0IG1lZGl1bVByb2JsZW1zO1xyXG5sZXQgaGFyZFByb2JsZW1zO1xyXG5sZXQgc2VsZWN0ZWRWYWx1ZSA9IFwiYWxsXCI7XHJcbmxldCBzZWxlY3RlZERhdGUgPSBudWxsO1xyXG5sZXQgZGF0ZVN0cmluZyA9IFwiXCI7XHJcbi8vICBCYWNrZ3JvdW5kIFBhZ2VcclxuLypcclxuQWRkaW5nIEV2ZW50IExpc3RlbmVyc1xyXG5cclxuKi9cclxuLy9AdHMtaWdub3JlXHJcbnN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL0B0cy1pZ25vcmVcclxuICAgIGJhY2tncm91bmRQYWdlLnN0YXJ0U3RvcCgpO1xyXG59KTtcclxucmVzZXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgYmFja2dyb3VuZFBhZ2UucmVzZXRGdW5jKCk7XHJcbn0pO1xyXG5zYXZlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL0B0cy1pZ25vcmVcclxuICAgIGJhY2tncm91bmRQYWdlLnNhdmVEYXRhKCk7XHJcbn0pO1xyXG5zZWFyY2hCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIHNlYXJjaCgpO1xyXG59KTtcclxuZXhwb3J0VG9DU1ZCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIGlmIChzZWxlY3RlZFZhbHVlID09PSBcImFsbFwiKSB7XHJcbiAgICAgICAgZXhwb3J0X3RhYmxlX3RvX2Nzdihkb2N1bWVudCwgXCJsZWV0Y29kZXN0YXRzLmNzdlwiKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHNlbGVjdGVkVmFsdWUgPT09IFwiZWFzeVwiKSB7XHJcbiAgICAgICAgZXhwb3J0X3RhYmxlX3RvX2Nzdihkb2N1bWVudCwgXCJsZWV0Y29kZV9lYXN5c3RhdHMuY3N2XCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoc2VsZWN0ZWRWYWx1ZSA9PT0gXCJtZWRpdW1cIikge1xyXG4gICAgICAgIGV4cG9ydF90YWJsZV90b19jc3YoZG9jdW1lbnQsIFwibGVldGNvZGVfbWVkaXVtc3RhdHMuY3N2XCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoc2VsZWN0ZWRWYWx1ZSA9PT0gXCJoYXJkXCIpIHtcclxuICAgICAgICBleHBvcnRfdGFibGVfdG9fY3N2KGRvY3VtZW50LCBcImxlZXRjb2RlX2hhcmRzdGF0cy5jc3ZcIik7XHJcbiAgICB9XHJcbn0pO1xyXG5kaWZmaWN1bHR5U2VsZWN0b3JEaXYuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBzZWxlY3RlZFZhbHVlID1cclxuICAgICAgICBkaWZmaWN1bHR5U2VsZWN0b3JEaXYub3B0aW9uc1tkaWZmaWN1bHR5U2VsZWN0b3JEaXYuc2VsZWN0ZWRJbmRleF0udmFsdWU7XHJcbiAgICBjbGVhclVJKCk7XHJcbiAgICBpZiAoc2VsZWN0ZWREYXRlID09PSBudWxsKSB7XHJcbiAgICAgICAgaWYgKHNlbGVjdGVkVmFsdWUgPT0gXCJhbGxcIikge1xyXG4gICAgICAgICAgICByZW5kZXJUYWJsZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChzZWxlY3RlZFZhbHVlID09PSBcImVhc3lcIikge1xyXG4gICAgICAgICAgICByZW5kZXJJdGVtKGVhc3lQcm9ibGVtcywgc2VsZWN0ZWRWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHNlbGVjdGVkVmFsdWUgPT09IFwibWVkaXVtXCIpIHtcclxuICAgICAgICAgICAgcmVuZGVySXRlbShtZWRpdW1Qcm9ibGVtcywgc2VsZWN0ZWRWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHNlbGVjdGVkVmFsdWUgPT0gXCJoYXJkXCIpIHtcclxuICAgICAgICAgICAgcmVuZGVySXRlbShoYXJkUHJvYmxlbXMsIHNlbGVjdGVkVmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJlbmRlcldpdGhSZXNwZWN0VG9EYXRlKCk7XHJcbiAgICB9XHJcbn0pO1xyXG5kYXRlUGlja2VyRGl2LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgc2VsZWN0ZWREYXRlID0gZGF0ZVBpY2tlckRpdi52YWx1ZTtcclxuICAgIHNlbGVjdGVkRGF0ZSA9IG5ldyBEYXRlKHNlbGVjdGVkRGF0ZSk7XHJcbiAgICBsZXQgZGQgPSBTdHJpbmcoc2VsZWN0ZWREYXRlLmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG4gICAgLy9AdHMtaWdub3JlXHJcbiAgICBsZXQgbW0gPSBTdHJpbmcoc2VsZWN0ZWREYXRlLmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCBcIjBcIik7IC8vSmFudWFyeSBpcyAwIVxyXG4gICAgbGV0IHl5eXkgPSBzZWxlY3RlZERhdGUuZ2V0RnVsbFllYXIoKTtcclxuICAgIGRhdGVTdHJpbmcgPSBkZCArIFwiL1wiICsgbW0gKyBcIi9cIiArIHl5eXk7XHJcbiAgICByZW5kZXJXaXRoUmVzcGVjdFRvRGF0ZSgpO1xyXG59KTtcclxuZnVuY3Rpb24gcmVuZGVyV2l0aFJlc3BlY3RUb0RhdGUoKSB7XHJcbiAgICBsZXQgZWFzeVByb2JsZW1zUmVuZGVyID0gZWFzeVByb2JsZW1zLmZpbHRlcigoaXRlbSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBpdGVtLmRhdGUgPT09IGRhdGVTdHJpbmc7XHJcbiAgICB9KTtcclxuICAgIGxldCBtZWRpdW1Qcm9ibGVtc1JlbmRlciA9IG1lZGl1bVByb2JsZW1zLmZpbHRlcigoaXRlbSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBpdGVtLmRhdGUgPT09IGRhdGVTdHJpbmc7XHJcbiAgICB9KTtcclxuICAgIGxldCBoYXJkUHJvYmxlbXNSZW5kZXIgPSBoYXJkUHJvYmxlbXMuZmlsdGVyKChpdGVtKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW0uZGF0ZSA9PT0gZGF0ZVN0cmluZztcclxuICAgIH0pO1xyXG4gICAgY2xlYXJVSSgpO1xyXG4gICAgaWYgKHNlbGVjdGVkVmFsdWUgPT09IFwiYWxsXCIpIHtcclxuICAgICAgICByZW5kZXJJdGVtKGVhc3lQcm9ibGVtc1JlbmRlciwgXCJlYXN5XCIpO1xyXG4gICAgICAgIHJlbmRlckl0ZW0obWVkaXVtUHJvYmxlbXNSZW5kZXIsIFwibWVkaXVtXCIpO1xyXG4gICAgICAgIHJlbmRlckl0ZW0oaGFyZFByb2JsZW1zUmVuZGVyLCBcImhhcmRcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChzZWxlY3RlZFZhbHVlID09PSBcImVhc3lcIikge1xyXG4gICAgICAgIHJlbmRlckl0ZW0oZWFzeVByb2JsZW1zUmVuZGVyLCBcImVhc3lcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChzZWxlY3RlZFZhbHVlID09PSBcIm1lZGl1bVwiKSB7XHJcbiAgICAgICAgcmVuZGVySXRlbShtZWRpdW1Qcm9ibGVtc1JlbmRlciwgXCJtZWRpdW1cIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChzZWxlY3RlZFZhbHVlID09PSBcImhhcmRcIikge1xyXG4gICAgICAgIHJlbmRlckl0ZW0oaGFyZFByb2JsZW1zUmVuZGVyLCBcImhhcmRcIik7XHJcbiAgICB9XHJcbn1cclxuLy8gU2VhcmNoIFRyaWdnZXJzIHdoZW4gZW50ZXIga2V5IGlzIHByZXNzZWRcclxuc2VhcmNoUXVlcnlEaXYuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBpZiAoZS5rZXkgPT09IFwiRW50ZXJcIikge1xyXG4gICAgICAgIGlmIChzZWFyY2hRdWVyeURpdi52YWx1ZSkge1xyXG4gICAgICAgICAgICBzZWFyY2goKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5jbGVhckJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgc2VsZWN0ZWREYXRlID0gbnVsbDtcclxuICAgIGRhdGVQaWNrZXJEaXYudmFsdWUgPSBudWxsO1xyXG4gICAgc2VsZWN0ZWRWYWx1ZSA9IFwiYWxsXCI7XHJcbiAgICBkaWZmaWN1bHR5U2VsZWN0b3JEaXYudmFsdWUgPSBcImFsbFwiO1xyXG4gICAgY2xlYXJVSSgpO1xyXG4gICAgcmVuZGVyVGFibGUoKTtcclxufSk7XHJcbi8qXHJcblJlbmRlcmluZyBET01cclxuXHJcbiovXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIHJlbmRlclRpbWVyUGFnZSgpO1xyXG4gICAgcmVuZGVyQ2hhcnQoKTtcclxuICAgIHJlbmRlclRhYmxlKCk7XHJcbn0pO1xyXG4vLyBSZW5kZXJzIFRpbWVyXHJcbmZ1bmN0aW9uIHJlbmRlclRpbWVyUGFnZSgpIHtcclxuICAgIGxldCBwcm9ibGVtRGljdCA9IHt9O1xyXG4gICAgLy8gR2V0IHRoZSBQcm9ibGVtJ3MgTmFtZSBhbmQgdXBkYXRlIERPTU1cclxuICAgIGNvbnN0IGFjdGlvbiA9IHtcclxuICAgICAgICBhY3Rpb246IFwiZ2V0UHJvYmxlbVwiLFxyXG4gICAgfTtcclxuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKGFjdGlvbiwgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgcHJvYmxlbURpY3QucHJvYmxlbU5hbWUgPSByZXNwb25zZS5wcm9ibGVtTmFtZTtcclxuICAgICAgICBwcm9ibGVtRGljdC5kaWZmaWN1bHR5ID0gcmVzcG9uc2UuZGlmZmljdWx0eTtcclxuICAgICAgICBjb25zb2xlLmxvZyhwcm9ibGVtRGljdCk7XHJcbiAgICAgICAgaWYgKHByb2JsZW1EaWN0LnByb2JsZW1OYW1lKSB7XHJcbiAgICAgICAgICAgIGxldCBuYW1lID0gcHJvYmxlbURpY3QucHJvYmxlbU5hbWUuc3BsaXQoXCIuXCIpWzFdO1xyXG4gICAgICAgICAgICBsZXQgZGlmZmljdWx0eSA9IHByb2JsZW1EaWN0LmRpZmZpY3VsdHk7XHJcbiAgICAgICAgICAgIHByb2JsZW1UaXRsZURpdi5pbm5lclRleHQgPSBuYW1lO1xyXG4gICAgICAgICAgICBkaWZmaWN1bHR5RGl2LmlubmVyVGV4dCA9IGRpZmZpY3VsdHk7XHJcbiAgICAgICAgICAgIGRpZmZpY3VsdHlEaXYuY2xhc3NMaXN0LmFkZChkaWZmaWN1bHR5LnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgLy8gR2V0IHRoZSBDdXJyZW50IFN0YXRlIGFuZCB1cGRhdGUgRE9NXHJcbiAgICBjb25zdCB0aW1lckFjdGlvbiA9IHtcclxuICAgICAgICBhY3Rpb246IFwiZ2V0VGltZXJcIixcclxuICAgIH07XHJcbiAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh0aW1lckFjdGlvbiwgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXJ0c3RvcCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnRcIikuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgbWF0ZXJpYWwtaWNvbnMtb3V0bGluZWRcIj5wYXVzZTwvc3Bhbj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImJ0bi10eHRcIj5QYXVzZTwvc3Bhbj5gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChyZXNwb25zZS5zdGFydHN0b3AgPT0gMikge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0XCIpLmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cIm1hdGVyaWFsLWljb25zIG1hdGVyaWFsLWljb25zLW91dGxpbmVkXCI+YXJyb3dfZm9yd2FyZF9pb3MgPC9zcGFuPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYnRuLXR4dFwiPlN0YXJ0PC9zcGFuPmA7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAvLyAgR2V0IGhvdyBtdWNoIHRpbWUgaGFzIGVsYXBzZWRcclxuICAgIGNvbnN0IGdldEN1cnJlbnRUaW1lQWN0aW9uID0ge1xyXG4gICAgICAgIGFjdGlvbjogXCJnZXRDdXJyZW50VGltZVwiLFxyXG4gICAgfTtcclxuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKGdldEN1cnJlbnRUaW1lQWN0aW9uLCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBzcGVjaWFsQ2FzZShyZXNwb25zZS5taWxpU2VjT3V0LCByZXNwb25zZS5zZWNPdXQsIHJlc3BvbnNlLm1pbk91dCwgcmVzcG9uc2UuaG91ck91dCk7XHJcbiAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBtaWxsaXNlY29uZHNEaXYuaW5uZXJUZXh0ID0gXCIwMFwiO1xyXG4gICAgICAgICAgICBzZWNvbmRzRGl2LmlubmVyVGV4dCA9IFwiMDBcIjtcclxuICAgICAgICAgICAgbWludXRlc0Rpdi5pbm5lclRleHQgPSBcIjAwXCI7XHJcbiAgICAgICAgICAgIGhvdXJzRGl2LmlubmVyVGV4dCA9IFwiMDBcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIG1pbGxpc2Vjb25kc0Rpdi5pbm5lclRleHQgPSByZXNwb25zZS5taWxpU2VjT3V0LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIHNlY29uZHNEaXYuaW5uZXJUZXh0ID0gcmVzcG9uc2Uuc2VjT3V0LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIG1pbnV0ZXNEaXYuaW5uZXJUZXh0ID0gcmVzcG9uc2UubWluT3V0LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIGhvdXJzRGl2LmlubmVyVGV4dCA9IHJlc3BvbnNlLmhvdXJPdXQudG9TdHJpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5mdW5jdGlvbiBzcGVjaWFsQ2FzZShtaWxpc2VjLCBzZWNvbmQsIG1pbnV0ZSwgaG91cikge1xyXG4gICAgaWYgKG1pbGlzZWMgPT09IDAgJiYgc2Vjb25kID09PSAwICYmIG1pbnV0ZSA9PT0gMCAmJiBob3VyID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuLy8gTGlzdGVuZXJzXHJcbi8vIExpc3RlbnMgZm9yIENoYW5nZXMgYW5kIHVwZGF0ZSBVSSAgQWNjb3JkaW5nbHlcclxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmN0aW9uIChyZXF1ZXN0KSB7XHJcbiAgICBpZiAocmVxdWVzdC5zaG93R3JhcGgpIHtcclxuICAgICAgICByZW5kZXJDaGFydCgpO1xyXG4gICAgICAgIGNsZWFyVUkoKTtcclxuICAgICAgICByZW5kZXJUYWJsZSgpO1xyXG4gICAgfVxyXG59KTtcclxuLypcclxuQ2xlYXIncyBVSVxyXG4qL1xyXG5mdW5jdGlvbiBjbGVhclVJKCkge1xyXG4gICAgdGFibGVEaXYuaW5uZXJIVE1MID0gbnVsbDtcclxufVxyXG4vKlxyXG5SZW5kZXJzIENoYXJ0XHJcblxyXG4qL1xyXG4vL0B0cy1pZ25vcmVcclxuZnVuY3Rpb24gcmVuZGVyQ2hhcnQoKSB7XHJcbiAgICBsZXQgZWFzeUNvdW50ID0gMDtcclxuICAgIGxldCBtZWRpdW1Db3VudCA9IDA7XHJcbiAgICBsZXQgaGFyZENvdW50ID0gMDtcclxuICAgIGNvbnN0IGl0ZW1zID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJsZWV0Q29kZUV4dGVuc2lvbkRldGFpbHNcIik7XHJcbiAgICBpZiAoaXRlbXMpIHtcclxuICAgICAgICBjb25zdCBwYXJzZWRJdGVtID0gSlNPTi5wYXJzZShpdGVtcyk7XHJcbiAgICAgICAgZWFzeUNvdW50ID0gcGFyc2VkSXRlbS5lYXN5LmZpbHRlcigoaXRlbSkgPT4gdHlwZW9mIGl0ZW0uZHVwbGljYXRlSW5kZXggPT0gXCJudW1iZXJcIikubGVuZ3RoO1xyXG4gICAgICAgIG1lZGl1bUNvdW50ID0gcGFyc2VkSXRlbS5tZWRpdW0uZmlsdGVyKChpdGVtKSA9PiB0eXBlb2YgaXRlbS5kdXBsaWNhdGVJbmRleCA9PSBcIm51bWJlclwiKS5sZW5ndGg7XHJcbiAgICAgICAgaGFyZENvdW50ID0gcGFyc2VkSXRlbS5oYXJkLmZpbHRlcigoaXRlbSkgPT4gdHlwZW9mIGl0ZW0uZHVwbGljYXRlSW5kZXggPT0gXCJudW1iZXJcIikubGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgLy9AdHMtaWdub3JlXHJcbiAgICB2YXIgY3R4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteUNoYXJ0XCIpLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgIHZhciBteUNoYXJ0ID0gbmV3IGNoYXJ0X2pzXzEuQ2hhcnQoY3R4LCB7XHJcbiAgICAgICAgdHlwZTogXCJkb3VnaG51dFwiLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgbGFiZWxzOiBbXCJFYXN5XCIsIFwiTWVkaXVtXCIsIFwiSGFyZFwiXSxcclxuICAgICAgICAgICAgZGF0YXNldHM6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCIjIG9mIFZvdGVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW2Vhc3lDb3VudCwgbWVkaXVtQ291bnQsIGhhcmRDb3VudF0sXHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmdiKDY4LDE2MCw3MilcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZ2IoMjM5LDExMyw5KVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInJnYigyMzMsMzIsOTkpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBvcHRpb25zOiB7fSxcclxuICAgIH0pO1xyXG59XHJcbi8qXHJcblJlbmRlcnMgVGFibGVcclxuKi9cclxuZnVuY3Rpb24gcmVuZGVyVGFibGUoKSB7XHJcbiAgICBjb25zdCBpdGVtcyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibGVldENvZGVFeHRlbnNpb25EZXRhaWxzXCIpO1xyXG4gICAgaWYgKGl0ZW1zKSB7XHJcbiAgICAgICAgY29uc3QgcGFyc2VkID0gSlNPTi5wYXJzZShpdGVtcyk7XHJcbiAgICAgICAgZWFzeVByb2JsZW1zID0gcGFyc2VkLmVhc3k7XHJcbiAgICAgICAgbWVkaXVtUHJvYmxlbXMgPSBwYXJzZWQubWVkaXVtO1xyXG4gICAgICAgIGhhcmRQcm9ibGVtcyA9IHBhcnNlZC5oYXJkO1xyXG4gICAgICAgIHJlbmRlckl0ZW0oZWFzeVByb2JsZW1zLCBcImVhc3lcIik7XHJcbiAgICAgICAgcmVuZGVySXRlbShtZWRpdW1Qcm9ibGVtcywgXCJtZWRpdW1cIik7XHJcbiAgICAgICAgcmVuZGVySXRlbShoYXJkUHJvYmxlbXMsIFwiaGFyZFwiKTtcclxuICAgIH1cclxufVxyXG4vKlxyXG5SZW5kZXJzIEVhY2ggSW5kaXZpZHVhbCBUYWJsZSBpdGVtXHJcblxyXG4qL1xyXG5mdW5jdGlvbiByZW5kZXJJdGVtKGl0ZW1zLCBjbGFzc25hbWUpIHtcclxuICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xyXG4gICAgICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcclxuICAgICAgICBjb25zdCB0aW1lVGFrZW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgY29uc3QgcHJvYmxlbUxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcclxuICAgICAgICBjb25zdCBwcm9ibGVtTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgICAgICBjb25zdCBkaWZmaWN1bHR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG4gICAgICAgIGNvbnN0IGRhdGVTb2x2ZWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgcHJvYmxlbUxpbmsuaW5uZXJUZXh0ID0gaXRlbS5wcm9ibGVtTmFtZTtcclxuICAgICAgICBwcm9ibGVtTGluay5ocmVmID0gaXRlbS5wcm9ibGVtVXJsO1xyXG4gICAgICAgIHByb2JsZW1MaW5rLnNldEF0dHJpYnV0ZShcInRhcmdldFwiLCBcImJsYW5rXCIpO1xyXG4gICAgICAgIHByb2JsZW1OYW1lLmFwcGVuZENoaWxkKHByb2JsZW1MaW5rKTtcclxuICAgICAgICBkaWZmaWN1bHR5LmlubmVyVGV4dCA9IGl0ZW0uZGlmZmljdWx0eTtcclxuICAgICAgICBkaWZmaWN1bHR5LmNsYXNzTGlzdC5hZGQoY2xhc3NuYW1lICE9PSB1bmRlZmluZWQgPyBjbGFzc25hbWUgOiBpdGVtLmRpZmZpY3VsdHkudG9Mb3dlckNhc2UoKSk7XHJcbiAgICAgICAgdGltZVRha2VuLmlubmVyVGV4dCA9IGl0ZW0udGltZVRha2VuO1xyXG4gICAgICAgIGRhdGVTb2x2ZWQuaW5uZXJUZXh0ID0gaXRlbS5kYXRlO1xyXG4gICAgICAgIC8vIEFwcGVuZGluZyB0byB0aGUgUm93XHJcbiAgICAgICAgcm93LmFwcGVuZENoaWxkKHByb2JsZW1OYW1lKTtcclxuICAgICAgICByb3cuYXBwZW5kQ2hpbGQoZGlmZmljdWx0eSk7XHJcbiAgICAgICAgcm93LmFwcGVuZENoaWxkKHRpbWVUYWtlbik7XHJcbiAgICAgICAgcm93LmFwcGVuZENoaWxkKGRhdGVTb2x2ZWQpO1xyXG4gICAgICAgIHRhYmxlRGl2LmFwcGVuZENoaWxkKHJvdyk7XHJcbiAgICB9XHJcbn1cclxuLypcclxuQ1NWIEhlbHBlcnNcclxuQ3JlZGl0cyA6IGh0dHBzOi8vanNmaWRkbGUubmV0L2dlbmducy9qMWptMnRqeC9cclxuXHJcbiovXHJcbmZ1bmN0aW9uIGRvd25sb2FkX2Nzdihjc3YsIGZpbGVuYW1lKSB7XHJcbiAgICBsZXQgY3N2RmlsZTtcclxuICAgIGxldCBkb3dubG9hZExpbms7XHJcbiAgICAvLyBDU1YgRklMRVxyXG4gICAgY3N2RmlsZSA9IG5ldyBCbG9iKFtjc3ZdLCB7IHR5cGU6IFwidGV4dC9jc3ZcIiB9KTtcclxuICAgIC8vIERvd25sb2FkIGxpbmtcclxuICAgIGRvd25sb2FkTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xyXG4gICAgLy8gRmlsZSBuYW1lXHJcbiAgICBkb3dubG9hZExpbmsuZG93bmxvYWQgPSBmaWxlbmFtZTtcclxuICAgIC8vIFdlIGhhdmUgdG8gY3JlYXRlIGEgbGluayB0byB0aGUgZmlsZVxyXG4gICAgZG93bmxvYWRMaW5rLmhyZWYgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChjc3ZGaWxlKTtcclxuICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBsaW5rIGlzIG5vdCBkaXNwbGF5ZWRcclxuICAgIGRvd25sb2FkTGluay5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAvLyBBZGQgdGhlIGxpbmsgdG8geW91ciBET01cclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZG93bmxvYWRMaW5rKTtcclxuICAgIC8vIExhbnphbW9zXHJcbiAgICBkb3dubG9hZExpbmsuY2xpY2soKTtcclxufVxyXG5mdW5jdGlvbiBleHBvcnRfdGFibGVfdG9fY3N2KGh0bWwsIGZpbGVuYW1lKSB7XHJcbiAgICB2YXIgY3N2ID0gW107XHJcbiAgICBsZXQgdFJvd3NMZW5ndGggPSB0YWJsZURpdi5xdWVyeVNlbGVjdG9yQWxsKFwidHJcIikubGVuZ3RoO1xyXG4gICAgdmFyIHJvd3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwidGFibGUgdHJcIik7XHJcbiAgICBpZiAodFJvd3NMZW5ndGggPiAwKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3dzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciByb3cgPSBbXSwgY29scyA9IHJvd3NbaV0ucXVlcnlTZWxlY3RvckFsbChcInRkLCB0aFwiKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjb2xzLmxlbmd0aDsgaisrKVxyXG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICByb3cucHVzaChjb2xzW2pdLmlubmVyVGV4dCk7XHJcbiAgICAgICAgICAgIGNzdi5wdXNoKHJvdy5qb2luKFwiLFwiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIERvd25sb2FkIENTVlxyXG4gICAgICAgIGRvd25sb2FkX2Nzdihjc3Yuam9pbihcIlxcblwiKSwgZmlsZW5hbWUpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoXCJOb3RoaW5nIHRvIEV4cG9ydFwiKTtcclxuICAgIH1cclxufVxyXG4vLyBTZWFyY2ggTG9naWNcclxuZnVuY3Rpb24gc2VhcmNoKCkge1xyXG4gICAgLy8gIFNwcmVhZGluZyBwcm9ibGVtc1xyXG4gICAgbGV0IHByb2JsZW1zID0gWy4uLmVhc3lQcm9ibGVtcywgLi4ubWVkaXVtUHJvYmxlbXMsIC4uLmhhcmRQcm9ibGVtc107XHJcbiAgICBsZXQgcXVlcnkgPSBzZWFyY2hRdWVyeURpdi52YWx1ZTtcclxuICAgIHF1ZXJ5ID0gcXVlcnkudG9Mb3dlckNhc2UoKTtcclxuICAgIGxldCBzZWFyY2hlcyA9IHByb2JsZW1zLmZpbHRlcigoaXRlbSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBpdGVtLnByb2JsZW1OYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocXVlcnkpO1xyXG4gICAgfSk7XHJcbiAgICBjbGVhclVJKCk7XHJcbiAgICBpZiAoc2VhcmNoZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHJlbmRlckl0ZW0oc2VhcmNoZXMpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29uc3Qgc3BhbkVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICBzcGFuRWxlbS5jbGFzc05hbWUgPSBcIm5vLWl0ZW1zXCI7XHJcbiAgICAgICAgc3BhbkVsZW0uaW5uZXJUZXh0ID0gXCJPb3BzICEgTm90aGluZyBmb3VuZFwiO1xyXG4gICAgICAgIHRhYmxlRGl2LmFwcGVuZENoaWxkKHNwYW5FbGVtKTtcclxuICAgIH1cclxuICAgIHNlYXJjaFF1ZXJ5RGl2LnZhbHVlID0gXCJcIjtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9
