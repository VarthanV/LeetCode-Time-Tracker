import { Problem, Action } from "./types";
//Dev Stuffs
// @ts-ignore
const console = chrome.extension.getBackgroundPage().console;
//Cache Dom
const problemTitleDiv = document.querySelector(
  "#problem-title"
) as HTMLSpanElement;
const difficultyDiv = document.querySelector(
  "#difficulty-div"
) as HTMLSpanElement;
// Get Title of the Current Page and URL
  renderTimerPage();


function renderTimerPage() {
  

 
    let problemDict: Problem = {};

    const action: Action = {
      action: "getProblem",
    };
    chrome.runtime.sendMessage({ action: "getProblem" }, function (
      response: Problem
    ) {
      console.log(response);
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
  
 
}

function createElement(): HTMLElement {
  const div: HTMLElement = document.createElement("div");
  return div;
}
