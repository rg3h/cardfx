/**
 * @fileoverview index.js entry point into javascript
/**                           _  __
 ---         ___ __ _ _ __ __| |/ _|_  __
|   |/\     / __/ _` | '__/ _` | |_\ \/ /
|   |  \   | (_| (_| | | | (_| |  _|>  <
|___| /     \___\__,_|_|  \__,_|_| /_/\_\
    \/            project cardfx
**/
import {formatDate, updateOnTheMinute} from './modules/date/date.js';

window.addEventListener('load', main);
async function main() {
  return init();
} // main

async function init() {
  updateOnTheMinute(updateTitleDateEle);
  return 1;
}

function updateTitleDateEle() {
  let dateEle = document.getElementsByClassName('topDate');
  dateEle.length > 0 ? dateEle[0].innerText = formatDate('DD MMMM YYYY') : null;
}
