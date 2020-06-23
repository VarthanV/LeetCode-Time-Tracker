import { Problem, Action } from "./types";


// Overriding Custom Window Object Since cannot am unable to extend the default window obj
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
  /* Toggle StartStop */
function startStop() {

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
  let document = chrome.extension.getViews({ type: "popup" })[0].document;
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
  document.getElementById("milisec").innerHTML = miliSecOut.toString();
  document.getElementById("sec").innerHTML = secOut.toString();
  document.getElementById("min").innerHTML = minOut.toString();
  document.getElementById("hour").innerHTML = hourOut.toString();
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
