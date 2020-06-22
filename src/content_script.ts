import { Action } from "./types";

const getDifficulty = () => {
  let diffDiv: HTMLDivElement = document.querySelector("div[diff]");
  if (diffDiv == null) {
    setTimeout(getDifficulty, 3000);
  } else {
    let difficulty = diffDiv.innerText;
    return difficulty;
  }
};

const getProblemName = () => {
  let problemTitleDiv: HTMLDivElement = document.querySelector(
    'div[data-cy="question-title"]'
  );

  if (problemTitleDiv == null) {
    setTimeout(getProblemName, 3000);
  } else {
    const problemName = problemTitleDiv.innerText;
    return problemName;
  }
};

const getDetails = () => {
  let problemName = getProblemName();
  let difficulty = getDifficulty();
  if (problemName && difficulty) {
    const action: Action = {
      action: "setProblem",
      payload: {
        //@ts-ignore
        difficulty: difficulty,
        problemName: problemName,
      },
    };
    //Send Extracted Data
    chrome.runtime.sendMessage(action);
  } else {
    setTimeout(getDetails, 3000);
  }
};
//Get Details
chrome.runtime.onMessage.addListener(function (request, sender, response) {
  getDetails();
});
getDetails();
