 
import { Chart } from "chart.js";

function renderChart() {
    alert("hi")
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

document.addEventListener('DOMContentLoaded',renderChart);