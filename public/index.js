/**
 * @fileoverview index.js entry point into javascript
 *  _____________________     _                       _       _
 / \                     \   | |_ ___ _ __ ___  _ __ | | __ _| |_ ___
|   |                    |   | __/ _ \ '_ ` _ \| '_ \| |/ _` | __/ _ \
 \_ |                    |   | ||  __/ | | | | | |_) | | (_| | ||  __/
    |                    |    \__\___|_| |_| |_| .__/|_|\__,_|\__\___|
    |                    |                     |_|
    |                    |
    |  __________________|__   project cardfx
    |  \                    \
    |  /                    /
    \_/____________________/
*/

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
