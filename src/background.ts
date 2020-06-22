import { Problem, Action } from "./types";
// chrome.tabs.onRemoved.addListener(function(tabId,removed){
//   const closedTab = chrome.tabs.get(tabId,function(tab){

//   });

// })

// Gets Problem Name and Difficulty from the Content Script and Persits data
const app = (function () {
  const problem: Problem = {};
  chrome.runtime.onMessage.addListener(function (
    request:Action,
    sender,
    sendResponse
  ) {
    

    if (request) {
        console.log(request);
        
      if (request.action == "setProblem") {
        problem.problemName = request.payload.problemName;
        problem.difficulty = request.payload.difficulty;
      } else if (request.action == "getProblem") {
          console.log(problem);
          
        sendResponse(problem);
      }
    }
  });
})();
