// const timeleft=document.getElementById("timeleft");



const timeLeft = document.getElementById("timeleft");
const timeLeft0 = document.getElementById("timeleft0");
// const t= htmlToText(document.getElementById("timeleft"));
// console.log(t);
timeLeft.innerHTML="19 November, 2022 12:00:00";
const t=timeLeft.innerText;
// var wrapper=document.createElement("div");
// wrapper.appendChild(timeLeft0);
console.log(t);

  const event = new Date(t);

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
let timerId;

function countDown() {
  const today = new Date();
  const timeSpan = event - today;
  //milliseconds
  console.log(timeSpan);

  if (timeSpan <= -day) {
    timeLeft0.innerHTML = "Hope you had enjoyed the event!!";
    clearInterval(timerId);
    return;
  }

  if (timeSpan <= 0) {
    timeLeft0.innerHTML = "Event Ongoing";
    clearInterval(timerId);
    return;
  }

  const days = Math.floor(timeSpan / day);
  const hours = Math.floor((timeSpan % day) / hour);
  const minutes = Math.floor((timeSpan % hour) / minute);
  const seconds = Math.floor((timeSpan % minute) / second);

  timeLeft0.innerHTML =
    days +
    "Days" +
    " : " +
    hours +
    "Hrs" +
    " : " +
    minutes +
    "Mins" +
    " : " +
    seconds +
    "Secs";
}

timerId = setInterval(countDown, second);