import * as moment from "moment";
//Cache Dom
const titleDiv = document.querySelector("#title") as HTMLSpanElement;
const urDiv = document.querySelector("#time") as HTMLSpanElement;
// Get Title of the Current Page and URL

chrome.tabs.query({ active: true }, function (tabs: chrome.tabs.Tab[]) {
  renderTimerPage(tabs[0]);
});

function renderTimerPage(tab: chrome.tabs.Tab) {
  let urlRegex: RegExp = new RegExp("https://leetcode.com/problems/*");
  let url = tab.url;
  if (urlRegex.test(url)) {
    let title: string = tab.title;
    console.log(title);
  
  }
}

function createElement(): HTMLElement {
  const div: HTMLElement = document.createElement("div");
  return div;
}
