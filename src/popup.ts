import { Problem, Action } from "./types";
import { Chart } from "chart.js";
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

// Buttons Div

const startBtn = document.getElementById("start") as HTMLButtonElement;
const resetBtn = document.getElementById("reset") as HTMLButtonElement;
const saveBtn = document.getElementById("save") as HTMLButtonElement;
// Get Title of the Current Page and URL
const backgroundPage = chrome.extension.getBackgroundPage();

//  Background Page

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

renderTimerPage();

document.addEventListener("DOMContentLoaded", renderChart);

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

//@ts-ignore

function renderChart() {
  let easyCount = 0;
  let mediumCount = 0;
  let hardCount = 0;
 
const items  = localStorage.getItem("leetCodeExtensionDetails");
if(items){
const parsedItem = JSON.parse(items);
easyCount = parsedItem.easy.length;
mediumCount = parsedItem.medium.length;
hardCount = parsedItem.hard.length

}
 //@ts-ignore
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Easy", "Medium", "Hard"],
      datasets: [
        {
          label: "# of Votes",
          data: [easyCount,mediumCount,hardCount],
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
