import { Problem, Action } from "./types";
import { Chart } from "chart.js";
//Dev Stuffs

// @ts-ignore
const console = chrome.extension.getBackgroundPage().console;
/*
Cache Dom

*/
const problemTitleDiv = document.querySelector(
  "#problem-title"
) as HTMLSpanElement;
const difficultyDiv = document.querySelector(
  "#difficulty-div"
) as HTMLSpanElement;
const tableDiv = document.querySelector("#problem-table");
const difficultySelectorDiv = document.querySelector(
  "#difficulty-selector"
) as HTMLSelectElement;

// Buttons Div

const startBtn = document.getElementById("start") as HTMLButtonElement;
const resetBtn = document.getElementById("reset") as HTMLButtonElement;
const saveBtn = document.getElementById("save") as HTMLButtonElement;
const exportToCSVButton = document.getElementById(
  "export-to-csv"
) as HTMLButtonElement;
// Get Title of the Current Page and URL
const backgroundPage = chrome.extension.getBackgroundPage();
let easyProblems;
let mediumProblems;
let hardProblems;
let selectedValue;
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

exportToCSVButton.addEventListener("click", function () {
  alert(selectedValue);
  if (selectedValue === "all") {
    export_table_to_csv(document, "leetcodestats.csv");
  } else if (selectedValue === "easy") {
    export_table_to_csv(document, "leetcode_easystats.csv");
  } else if (selectedValue === "medium") {
    export_table_to_csv(document, "leetcode_mediumstats.csv");
  } else if (selectedValue === "hard") {
    export_table_to_csv(document, "leetcode_hardstats.csv");
  }
});

difficultySelectorDiv.addEventListener("change", function () {
  selectedValue =
    difficultySelectorDiv.options[difficultySelectorDiv.selectedIndex].value;
  clearUI();
  if (selectedValue == "all") {
    renderTable();
  } else if (selectedValue === "easy") {
    renderItem(easyProblems, selectedValue);
  } else if (selectedValue === "medium") {
    renderItem(mediumProblems, selectedValue);
  } else if (selectedValue == " hard") {
    renderItem(hardProblems, selectedValue);
  }
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
  let problemDict: Problem = {};

  const action: Action = {
    action: "getProblem",
  };
  chrome.runtime.sendMessage(action, function (response: Problem) {

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
    easyCount = parsedItem.easy.filter(
      (item) => typeof item.duplicateIndex == "number"
    ).length;
    mediumCount = parsedItem.medium.filter(
      (item) => typeof item.duplicateIndex == "number"
    ).length;
    hardCount = parsedItem.hard.filter(
      (item) => typeof item.duplicateIndex == "number"
    ).length;
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
    difficulty.classList.add(classname);
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
  var csvFile;
  var downloadLink;

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
  var rows = document.querySelectorAll("table tr");

  for (var i = 0; i < rows.length; i++) {
    var row = [],
      cols = rows[i].querySelectorAll("td, th");

    for (var j = 0; j < cols.length; j++)
      //@ts-ignore
      row.push(cols[j].innerText);

    csv.push(row.join(","));
  }

  // Download CSV
  download_csv(csv.join("\n"), filename);
}
