import { Problem, Action } from "./types";
let windowObj = <any>window;
// Setting Popup dynamically

chrome.tabs.onActivated.addListener(function (activeInfo) {
  let urlRegex: RegExp = new RegExp("https://leetcode.com/problems/*");
  const activeTabId = activeInfo.tabId;

  chrome.tabs.get(activeTabId, function (tab) {
    const currentUrl = tab.url;
    if (urlRegex.test(currentUrl)) {
      chrome.browserAction.setPopup({ popup: "popup.html" });
    } else {
      chrome.browserAction.setPopup({ popup: "invalid.html" });
    }
  });
});

// Persisting Data Stuffst

const problem: Problem = {};
chrome.runtime.onMessage.addListener(function (
  request: Action,
  sender,
  sendResponse
) {
  if (request) {
    if (request.action == "setProblem") {
      problem.problemName = request.payload.problemName;
      problem.difficulty = request.payload.difficulty;
    } else if (request.action == "getProblem") {
      sendResponse(problem);
    } else if (request.action == "setTimer") {
      startStop();
    }
  }
});

// Updating Timer Stuffs
let startstop = 0;
let x;

function startStop() {
  /* Toggle StartStop */
  startstop = startstop + 1;
  let document = chrome.extension.getViews({ type: "popup" })[0].document;

  if (startstop == 1) {
    startTimer();
    document.getElementById("start").innerHTML = "Stop";
  } else if (startstop == 2) {
    document.getElementById("start").innerHTML = "Start";
    startstop = 0;
    stopTimer();
  }
}

windowObj.startStop = startStop;
windowObj.resetFunc = reset;
function startTimer() {
  x = setInterval(timer, 10);
}

function stopTimer() {
  clearInterval(x);
} /* Stop */

var milisec = 0;
var sec = 0; /* holds incrementing value */
var min = 0;
var hour = 0;

/* Contains and outputs returned value of  function checkTime */

var miliSecOut = 0;
var secOut = 0;
var minOut = 0;
var hourOut = 0;

/* Output variable End */

function timer() {
  let document = chrome.extension.getViews({ type: "popup" })[0].document;
  /* Main Timer */

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

  document.getElementById("milisec").innerHTML = miliSecOut.toString();
  document.getElementById("sec").innerHTML = secOut.toString();
  document.getElementById("min").innerHTML = minOut.toString();
  document.getElementById("hour").innerHTML = hourOut.toString();
}

var milisec = 0;
var sec = 0; /* holds incrementing value */
var min = 0;
var hour = 0;

/* Contains and outputs returned value of  function checkTime */

var miliSecOut = 0;
var secOut = 0;
var minOut = 0;
var hourOut = 0;

/* Output variable End */

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function reset() {
  console.log("hey");
  stopTimer();

  let document = chrome.extension.getViews({ type: "popup" })[0].document;
  /*Reset*/
  startstop  = 0;
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
