import * as moment from "moment";
//Cache Dom
const titleDiv = document.querySelector("#title") as HTMLSpanElement;
const urDiv = document.querySelector("#time") as HTMLSpanElement;
// Get Title of the Current Page and URL 

chrome.tabs.query({ active: true }, function (tabs) {
  let tab: chrome.tabs.Tab = tabs[0];
  let title: string = tab.title;
  let url = tab.url;
  let cleanedTitle = title.split("-")[0];
  titleDiv.innerText = cleanedTitle;
  urDiv.innerText = url;

});
