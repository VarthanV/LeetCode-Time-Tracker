import { Problem } from "./types";
// chrome.tabs.onRemoved.addListener(function(tabId,removed){
//   const closedTab = chrome.tabs.get(tabId,function(tab){

//   });

// })

// Gets Problem Name and Difficulty from the Content Script and Persits data
const app = (function () {
  const problem: Problem = {};
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    

    if (request) {
      if (request.action == "setProblem") {
        problem.problemName = request.problemName;
        problem.difficulty = request.difficulty;
      } else if (request.action == "getProblem") {
          console.log(problem);
          
        sendResponse(problem);
      }
    }
  });
})();
