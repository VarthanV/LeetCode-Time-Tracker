import { Problem, Action } from "./types";
import { getTimeasString } from "./helpers";

// Overriding Custom Window Object Since cannot am unable to extend the default window obj
let windowObj = <any>window;
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
    } else if (request.action == "getTimer") {
      sendResponse({ startstop: startstop });
    }
    else if (request.action === 'getCurrentTime') {

      sendResponse({
        miliSecOut: miliSecOut,
        hourOut: hourOut,
        secOut: secOut,
        minOut: minOut
      })
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
  } else if (startstop == 2) {
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
  timeString = getTimeasString(secOut, minOut, hourOut);

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
  const dataMap: any = {
    problemName: problemName,
    difficulty: problem.difficulty,
    timeTaken: timeString,
    date: todayString,
    problemUrl: currentUrl,
  };
  let currentDiffProblemArray: object[] =
    data[problem.difficulty.toLowerCase()];

  let exists = currentDiffProblemArray.filter((item: any) => {
    return item.problemName === problemName;
  });
  let problemObj: any = exists[0];

  if (exists.length > 0) {
    // dataMap.problemName +=  problemObj.duplicateIndex.toString();
    problemObj.duplicateIndex += 1;
    const itemToFind = (item) => item.problemName == dataMap.problemName;
    let idx = currentDiffProblemArray.findIndex(itemToFind);
    data[problem.difficulty.toLowerCase()][idx] = problemObj;

    dataMap.problemName += ` (${problemObj.duplicateIndex})`;

    data[problemObj.difficulty.toLowerCase()].push(dataMap);
    localStorage.setItem("leetCodeExtensionDetails", JSON.stringify(data));
  } else {
    dataMap.duplicateIndex = 0;
    data[dataMap.difficulty.toLowerCase()].push(dataMap);
    let dataToSet = JSON.stringify(data);

    localStorage.setItem("leetCodeExtensionDetails", dataToSet);
  }
  alert("Saved!");
  chrome.runtime.sendMessage({ showGraph: true });
}

async function saveData() {
  await reset();
  if (!localStorage.getItem("leetCodeExtensionDetails")) {
    setInitialData();
    setData();
  } else {
    setData();
  }
}

function setInitialData() {
  var problemDetails = JSON.stringify({
    easy: [],
    medium: [],
    hard: [],
  });
  localStorage.setItem("leetCodeExtensionDetails", problemDetails);
}
