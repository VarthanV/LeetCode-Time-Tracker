import { Problem, Action } from "./types";

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

// Persisting Data Stuffs

const app = (function () {
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
      }
    }
  });
})();


// Updating Timer Stuffs

