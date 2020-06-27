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
  "#problem-difficulty"
) as HTMLSpanElement;
const tableDiv = document.querySelector("#problem-table");
const difficultySelectorDiv = document.querySelector(
  "#difficulty-selector"
) as HTMLSelectElement;
const millisecondsDiv = document.getElementById("milisec") as HTMLSpanElement;
const secondsDiv = document.getElementById("sec") as HTMLSpanElement;
const minutesDiv = document.getElementById("min") as HTMLSpanElement;
const hoursDiv = document.getElementById("hour") as HTMLSpanElement;
const searchQueryDiv = document.getElementById(
  "search-text"
) as HTMLInputElement;

const datePickerDiv = document.querySelector(
  "#problem-date"
) as HTMLInputElement;

// Buttons Div

const startBtn = document.getElementById("start") as HTMLButtonElement;
const resetBtn = document.getElementById("reset") as HTMLButtonElement;
const saveBtn = document.getElementById("save") as HTMLButtonElement;
const exportToCSVButton = document.getElementById(
  "export-to-csv"
) as HTMLButtonElement;
const searchBtn = document.getElementById("search-btn") as HTMLButtonElement;
const clearBtn = document.getElementById("clear-btn") as HTMLButtonElement;
// Get Title of the Current Page and URL
const backgroundPage = chrome.extension.getBackgroundPage();
// Variable Declarations

let easyProblems;
let mediumProblems;
let hardProblems;
let selectedValue = "all";
let selectedDate = null;

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

searchBtn.addEventListener("click", function () {
  search();
});
exportToCSVButton.addEventListener("click", function () {
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
  if (selectedDate === null) {
    if (selectedValue == "all") {
      renderTable();
    } else if (selectedValue === "easy") {
      renderItem(easyProblems, selectedValue);
    } else if (selectedValue === "medium") {
      renderItem(mediumProblems, selectedValue);
    } else if (selectedValue == "hard") {
      renderItem(hardProblems, selectedValue);
    }
  }
});
datePickerDiv.addEventListener("change", function () {
  selectedDate = datePickerDiv.value;
  selectedDate = new Date(selectedDate);
  let dd = String(selectedDate.getDate()).padStart(2, "0");
  //@ts-ignore
  let mm = String(selectedDate.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = selectedDate.getFullYear();

  const dateString = dd + "/" + mm + "/" + yyyy;
  let easyProblemsRender = easyProblems.filter((item) => {
    return item.date === dateString;
  });
  let mediumProblemsRender = mediumProblems.filter((item) => {
    return item.date === dateString;
  });

  let hardProblemsRender = hardProblems.filter((item) => {
    return item.date === dateString;
  });
  clearUI();
  if (selectedValue === "all") {
    renderItem(easyProblemsRender, "easy");
    renderItem(mediumProblemsRender, "medium");
    renderItem(hardProblemsRender, "hard");
  } else if (selectedValue === "easy") {
    renderItem(easyProblemsRender, "easy");
  } else if (selectedValue === "medium") {
    renderItem(mediumProblemsRender, "medium");
  } else if (selectedValue === "hard") {
    renderItem(hardProblemsRender, "hard");
  }
});
// Search Triggers when enter key is pressed
searchQueryDiv.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    if (searchQueryDiv.value) {
      search();
    }
  }
});
clearBtn.addEventListener("click", function () {
  selectedDate = null;
  datePickerDiv.value = null;
  selectedValue = "all";
  difficultySelectorDiv.value = 'all';
  clearUI();
  renderTable();
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

  // Get the Problem's Name and update DOMM
  const action: Action = {
    action: "getProblem",
  };
  chrome.runtime.sendMessage(action, function (response: Problem) {
    problemDict.problemName = response.problemName;
    problemDict.difficulty = response.difficulty;
    console.log(problemDict);

    if (problemDict.problemName) {
      let name = problemDict.problemName.split(".")[1];
      let difficulty = problemDict.difficulty;
      problemTitleDiv.innerText = name;
      difficultyDiv.innerText = difficulty;

      difficultyDiv.classList.add(difficulty.toLowerCase());
    }
  });

  // Get the Current State and update DOM
  const timerAction: Action = {
    action: "getTimer",
  };
  chrome.runtime.sendMessage(timerAction, function (response) {
    if (response.startstop == 1) {
      document.getElementById(
        "start"
      ).innerHTML = `<span class="material-icons material-icons-outlined">pause</span>
        <span class="btn-txt">Pause</span>`;
    } else if (response.startstop == 2) {
      document.getElementById(
        "start"
      ).innerHTML = `<span class="material-icons material-icons-outlined">arrow_forward_ios </span>
        <span class="btn-txt">Start</span>`;
    }
  });

  //  Get how much time has elapsed
  const getCurrentTimeAction: Action = {
    action: "getCurrentTime",
  };
  chrome.runtime.sendMessage(getCurrentTimeAction, function (response) {
    const result = specialCase(
      response.miliSecOut,
      response.secOut,
      response.minOut,
      response.hourOut
    );
    if (result) {
      millisecondsDiv.innerText = "00";
      secondsDiv.innerText = "00";
      minutesDiv.innerText = "00";
      hoursDiv.innerText = "00";
    } else {
      millisecondsDiv.innerText = response.miliSecOut.toString();
      secondsDiv.innerText = response.secOut.toString();
      minutesDiv.innerText = response.minOut.toString();
      hoursDiv.innerText = response.hourOut.toString();
    }
  });
}

function specialCase(
  milisec: number,
  second: number,
  minute: number,
  hour: number
) {
  if (milisec === 0 && second === 0 && minute === 0 && hour === 0) {
    return true;
  }
  return false;
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
function renderItem(items, classname?) {
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
    difficulty.classList.add(
      classname !== undefined ? classname : item.difficulty.toLowerCase()
    );

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
  let csvFile;
  let downloadLink;

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
  let tRowsLength = tableDiv.querySelectorAll("tr").length;
  var rows = document.querySelectorAll("table tr");
  if (tRowsLength > 0) {
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
  } else {
    alert("Nothing to Export");
  }
}

// Search Logic

function search() {
  //  Spreading problems

  let problems = [...easyProblems, ...mediumProblems, ...hardProblems];
  let query = searchQueryDiv.value;
  query = query.toLowerCase();

  let searches = problems.filter((item) => {
    return item.problemName.toLowerCase().includes(query);
  });
  clearUI();
  if (searches.length > 0) {
    renderItem(searches);
  } else {
    const spanElem = document.createElement("span");
    spanElem.innerText = "Oops ! Nothing found";
    tableDiv.appendChild(spanElem);
  }
  searchQueryDiv.value = "";
}
