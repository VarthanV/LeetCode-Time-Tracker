import { Problem, Action } from "./types";

// Gets Problem Name and Difficulty from the Content Script and Persits data
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
