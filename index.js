
const counter = document.querySelector("#counter");
const resetBtn = document.querySelector("#resetBtn");
const startBtn = document.querySelector("#startBtn");
const stopBtn = document.querySelector("#stopBtn");


//change these terrible variable names so that they make more sense. Think tens and units.

let seconds = 0;

let minutes = 0;

let hours = 0;

let hoursTwo = 0;
counter.innerHTML = hoursTwo + hours + "." + minutes + seconds;
let interval;

startBtn.addEventListener("click", startCounter);
stopBtn.addEventListener("click", stopCounter);
resetBtn.addEventListener("click", resetCounter);

// refactor resets. Maybe have only one reset function and pass in values



function secondsReset() {
  seconds = 0;
  minutes++;
  counter.innerHTML = hoursTwo + hours + "." + minutes + seconds;
}

function minutesReset() {
  seconds = 0;
  minutes = 0;
  hours++;
  counter.innerHTML = hoursTwo + hours + "." + minutes + seconds;
}

function hoursReset() {
  seconds = 0;
  minutes = 0;
  hours = 0;
  hoursTwo++;
  counter.innerHTML = hoursTwo + hours + "." + minutes + seconds;
}

function startCounter() {
  interval = setInterval(function () {
    seconds = seconds + 1;

    if (hours == 59 && minutes == 5 && seconds == 10) {
      hoursReset();
    }

    if (minutes == 5 && seconds == 10) {
      minutesReset();
    }

    if (seconds < 10) {
      counter.innerHTML = hours + "." + minutes + seconds;
    }

    if (seconds == 10) {
      secondsReset();
    }
  }, 1000);
}

function stopCounter() {
  clearInterval(interval);
}

function resetCounter() {
  clearInterval(interval);
  seconds = 0;
  minutes = 0;

  hours = 0;
  counter.innerHTML = hours + "." + minutes + seconds;
}


// functionality to create a new time stamp.
// If program is any good then save data in local storage

const stampContainer = document.querySelector(".stamp-container");

const generateButton = document.querySelector(".generate-button");

const textBox = document.querySelector(".text-box");

generateButton.addEventListener("click", function () {
  const placeHolder = document.getElementById("text-box");
  if (textBox.value == "") {
    placeHolder.placeholder = "Enter a Description!";
    textBox.style.borderColor = "red";
  } else {
    textBox.style.borderColor = "initial";
    placeHolder.placeholder = "";
    stampContainer.innerHTML += `<div class="stamps"> <div class="title">${textBox.value}</div><div class="time">${counter.textContent}</div> </div>`;

    textBox.value = "";
  }
});
