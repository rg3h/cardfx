/**
 * @fileoverview index.js entry point into javascript
/**                           _  __
 ---         ___ __ _ _ __ __| |/ _|_  __
|   |/\     / __/ _` | '__/ _` | |_\ \/ /
|   |  \   | (_| (_| | | | (_| |  _|>  <
|___| /     \___\__,_|_|  \__,_|_| /_/\_\
    \/            project cardfx
**/
window.addEventListener('load', main);

async function main() {
  updateDateOnTheMinute();
} // main


function updateDateOnTheMinute() {
  // update the date and time
  const now = Temporal.Now.zonedDateTimeISO();
  let formattedDate = now.toLocaleString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  formattedDate = formattedDate.replace(' at ', '<br>');
  const dateEle = document.getElementsByClassName('topRightSectionDate')[0];
  dateEle.innerHTML = formattedDate;

  // compute the time until the next update
  let theDate = new Date();
  let secondsLeft = 60 - theDate.getSeconds(); // secs until minute mark
  let ms = secondsLeft < 0 ? 0 : secondsLeft * 1000;
  setTimeout(updateDateOnTheMinute, ms);
}
