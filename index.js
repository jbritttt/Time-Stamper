const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

let currentDate = `${day}-${month}-${year}`;

// This arrangement can be altered based on how we want the date's format to appear.

let todaysDate = document.querySelector(".todays-date");

todaysDate.textContent = currentDate;

let secondsHtml = document.querySelector("#sec-count");
let minutessHtml = document.querySelector("#min-count");
let hoursHtml = document.querySelector("#hour-count");
let hours2Html = document.querySelector("#hour-2-count");

const counter = document.querySelector("#counter");
const resetBtn = document.querySelector("#resetBtn");
const startBtn = document.querySelector("#startBtn");
const stopBtn = document.querySelector("#stopBtn");

//change variable names so that they make more sense. Think in terms of tens and units when renaming.

let seconds = 0;

let minutes = 0;

let hours = 0;

let hoursTwo = 0;

let compareCounterWithTitle = hoursTwo + ":" + hours + ":" + minutes + seconds;

let interval;

startBtn.addEventListener("click", startCounter);
stopBtn.addEventListener("click", stopCounter);
resetBtn.addEventListener("click", resetCounter);

function secondsReset() {
  seconds = 0;
  minutes++;
}

function minutesReset() {
  seconds = 0;
  minutes = 0;
  hours++;
}

function hoursReset() {
  seconds = 0;
  minutes = 0;
  hours = 0;
  hoursTwo++;
}

function startCounter() {
  startBtn.style.pointerEvents = "none";
  modal.style.display = "none";

  seconds = Number(secondsHtml.value);

  minutes = Number(minutessHtml.value);

  hours = Number(hoursHtml.value);

  hoursTwo = Number(hours2Html.value);

  interval = setInterval(function () {
    seconds = seconds + 1;

    if (hours == 59 && minutes == 5 && seconds == 10) {
      hoursReset();
    }

    if (minutes == 5 && seconds == 10) {
      minutesReset();
    }

    if (seconds == 10) {
      secondsReset();
    }

    compareCounterWithTitle = hoursTwo + ":" + hours + ":" + minutes + seconds;
    setTimerInputValues();
  }, 1000);
}

function stopCounter() {
  clearInterval(interval);
  startBtn.style.pointerEvents = "initial";
}

function resetCounter() {
  clearInterval(interval);
  startBtn.style.pointerEvents = "initial";
  seconds = 0;
  minutes = 0;

  hours = 0;
  hoursTwo = 0;
  setTimerInputValues();
}

function setTimerInputValues() {
  secondsHtml.value = seconds;

  minutessHtml.value = minutes;

  hoursHtml.value = hours;

  hours2Html.value = hoursTwo;
}

const stampContainer = document.querySelector(".stamp-container");

const generateButton = document.querySelector(".generate-button");

const textBox = document.querySelector(".text-box");

const modal = document.querySelector(".modal");

const closeModal = document.querySelector(".close-modal");

let localArray = [];

// functionality to create a new time stamp.//////////////////////////////////////////////////////////////////////

let container = document.querySelectorAll(".container");

let titleOrStamp = true;

container.forEach((item) => {
  item.addEventListener("click", function (e) {
    if (e.target.classList.contains("stamp1")) {
      console.log("Stamp input is checked");
      titleOrStamp = false;
      
    } else if (e.target.classList.contains("stamp2")){
      console.log("Title input is checked");
      titleOrStamp = true;
    }
  });
});

generateButton.addEventListener("click", function () {
  const placeHolder = document.getElementById("text-box");
  const timeStamps = document.querySelectorAll(".time");
  console.log("clicked", titleOrStamp);

  if (textBox.value == "") {
    placeHolder.placeholder = "Enter a Description!";
    textBox.style.borderColor = "red";
    return;
  }

  let my_arr = Array.from(timeStamps);

  let lastElement = my_arr.pop();

  let lastElementTime = "";

  if (lastElement !== undefined) {
    lastElementTime = lastElement.textContent;
  }

  if (!titleOrStamp) {
    // prevents user from creating duplicate timestamps when the timer is paused.
    if (compareCounterWithTitle == lastElementTime) {
      modal.style.display = "block";
      modal.innerHTML = `<span class="close-modal">x</span>
      <p>You cant create a duplicate timestamp</p>`;
      console.log("You cant create a duplicate timestamp");

      setTimeout(hide, 2000);

      function hide() {
        modal.style.display = "none";
        let deleteDataModal = document.querySelector(".delete-data-modal");
        deleteDataModal.addEventListener("click", function (e) {
          if (e.target.classList.contains("btn-del")) {
            localArray = [];
            //newLocalArray = []

            localStorage.clear();
            deleteDataModal.style.display = "none";
            stampContainer.innerHTML = "";
          }

          if (e.target.classList.contains("btn-close")) {
            deleteDataModal.style.display = "none";
          }
        });
      }
    }

    if (compareCounterWithTitle == "0:0:00") {
      console.log("The timer hasnt been started");
      modal.style.display = "block";
    } else if (modal.style.display !== "block") {
      textBox.style.borderColor = "initial";
      modal.style.display = "none";
      placeHolder.placeholder = "";

      let newsTimeStamps = {
        title: textBox.value,
        time: compareCounterWithTitle,
      };

      localArray.push(newsTimeStamps);

      //console.log(localArray)

      localStorage.clear();
      localStorage.setItem(localArray, JSON.stringify(localArray));

      stampContainer.innerHTML += `<div class="stamps"> <div class="title">${textBox.value}</div><div class="delete-modal"><span>Delete?</span> <div class="btn-wrapper"><button class="btn btn-delete">Yes</button><button class="btn btn-hide">No</button></div></div><div class="time">${compareCounterWithTitle}</div> </div>`;

      textBox.value = "";
      let stamp = document.querySelectorAll(".stamps");
      // This is repeat code invoke the one event listener
      stamp.forEach((item) => {
        item.addEventListener("click", function (e) {
          item.firstElementChild.nextElementSibling.style.display = "flex";
          console.log("fired");
        });
      });

      closeModal.addEventListener("click", function () {
        modal.style.display = "none";
      });
      // This is repeat code invoke the one event listener
      document.addEventListener("click", function (e) {
        if (e.target.classList.contains("btn-hide")) {
          e.target.parentElement.parentElement.style.display = "none";
        }
        if (e.target.classList.contains("btn-delete")) {
          let stampTitle =
            e.target.parentElement.parentElement.parentElement.firstElementChild
              .innerHTML;
          console.log(stampTitle);

          localArray.forEach((item) => {
            if (item.title == stampTitle) {
              let itemIndex = localArray.indexOf(item);
              localArray.splice(itemIndex, 1);
              localStorage.clear();
              localStorage.setItem(localArray, JSON.stringify(localArray));
              console.log(localArray);
            }
          });

          e.target.parentElement.parentElement.parentElement.style.display =
            "none";
        }
      });
    }
  } else {
    let newsTimeStamps = {
      videoTitle: textBox.value,
    };

    localArray.push(newsTimeStamps);

    //console.log(localArray)

    localStorage.clear();
    localStorage.setItem(localArray, JSON.stringify(localArray));

    stampContainer.innerHTML += `<div class="stamps stamps-title"> <div class="title vid-title">${textBox.value}</div><div class="delete-modal"><span>Delete?</span> <div class="btn-wrapper"><button class="btn btn-delete">Yes</button><button class="btn btn-hide">No</button></div></div> </div>`;

    textBox.value = "";
    let stamp = document.querySelectorAll(".stamps");

    // This is repeat code invoke the one event listener
    stamp.forEach((item) => {
      item.addEventListener("click", function (e) {
        item.firstElementChild.nextElementSibling.style.display = "flex";
        console.log("fired");
      });
    });

    // This is repeat code invoke the one event listener
    closeModal.addEventListener("click", function () {
      modal.style.display = "none";
    });

    // This is repeat code invoke the one event listener

    document.addEventListener("click", function (e) {
      if (e.target.classList.contains("btn-hide")) {
        e.target.parentElement.parentElement.style.display = "none";
      }
      if (e.target.classList.contains("btn-delete")) {
        let stampTitle =
          e.target.parentElement.parentElement.parentElement.firstElementChild
            .innerHTML;

        let stamp2Title =
          e.target.parentElement.parentElement.parentElement.firstElementChild
            .textContent;

        console.log(stamp2Title);
        localArray.forEach((item) => {
          if (item.title == stampTitle) {
            let itemIndex = localArray.indexOf(item);
            localArray.splice(itemIndex, 1);
            localStorage.clear();
            localStorage.setItem(localArray, JSON.stringify(localArray));
            console.log(localArray);
          } else if (item.videoTitle == stamp2Title) {
            let itemIndex = localArray.indexOf(item);
            localArray.splice(itemIndex, 1);
            localStorage.clear();
            localStorage.setItem(localArray, JSON.stringify(localArray));
            console.log(localArray);
          }
        });

        e.target.parentElement.parentElement.parentElement.style.display =
          "none";
      }
    });
  }
});

// fetch data from local storage on page refresh or window reopen //////////////////////////////////////////////////////////

function updatePage() {
  //object is stored in local storage as the value. I'm now accessing the object by referencing the value.

  for (const [Title, Time] of Object.entries(localStorage)) {
    localArray.push(Time);
  }

  let newLocalArray = JSON.parse(localArray);

  localArray = newLocalArray;

  console.log(localArray);

  localArray.forEach((item) => {
    stampContainer.innerHTML += `<div class="stamps stamps-title "><div id="vid-title-modal" class="delete-modal">
    <span>Delete?</span> 
    <div class="btn-wrapper">
      <button class="btn btn-delete2">Yes</button>
      <button class="btn btn-hide">No</button>
    </div>
  </div><div class="vid-title">${item.videoTitle}</div></div><div class="stamps"> 
  
    <div class="title clipboard">${item.title}</div>
  <div class="delete-modal">
    <span>Delete?</span> 
    <div class="btn-wrapper">
      <button class="btn btn-delete">Yes</button>
      <button class="btn btn-hide">No</button>
    </div>
  </div>
  
  <div class="time">${item.time}</div> 
  
</div>`;

    let videoTitle = document.querySelectorAll(".vid-title");
    let stampTitle = document.querySelectorAll(".title");
    let time = document.querySelectorAll(".time");

    videoTitle.forEach((title) => {
      if (title.textContent == "undefined") {
        title.parentElement.style.display = "none";
      }
    });

    stampTitle.forEach((title) => {
      if (title.textContent == "undefined") {
        title.parentElement.style.display = "none";
      }
    });

    time.forEach((title) => {
      if (title.textContent == "undefined") {
        title.parentElement.style.display = "none";
      }
    });

    let stampsTitle = document.querySelectorAll(".stamps-title");

    // This is repeat code invoke the one event listener

    stampsTitle.forEach((item) => {
      item.addEventListener("click", function (e) {
        item.firstElementChild.style.display = "flex";
        console.log("fired");
      });
    });
  });
}

updatePage();

//closes modal/popup
closeModal.addEventListener("click", function () {
  modal.style.display = "none";
});

let deleteDataModal = document.querySelector(".delete-data-modal");

let btn = document.querySelector(".btn");

let stamp = document.querySelectorAll(".stamps");

let clearData = document.querySelector(".clear-data");

console.log(stampContainer);

clearData.addEventListener("click", function () {
  deleteDataModal.style.display = "block";
  if(localArray.length == 0){
  
  deleteDataModal.innerHTML = `<br/><p>You dont currently have any items to delete!</p><br/> `

setTimeout(hideMessage,2000)

function hideMessage(){
  deleteDataModal.style.display = "none";
}

  
  }   
});

stamp.forEach((item) => {
  item.addEventListener("click", function (e) {
    item.firstElementChild.nextElementSibling.style.display = "flex";
  });
});

deleteDataModal.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-del")) {
    for (const [Title, Time] of Object.entries(localStorage)) {
      localArray.push(Time);
    }
    localArray = [];
    //newLocalArray = []

    localStorage.clear();
    localStorage.setItem(localArray, JSON.stringify(localArray));
    deleteDataModal.style.display = "none";
    stampContainer.innerHTML = "";
  }

  if (e.target.classList.contains("btn-close")) {
    deleteDataModal.style.display = "none";
  }
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-hide")) {
    e.target.parentElement.parentElement.style.display = "none";
  }
  if (e.target.classList.contains("btn-delete")) {
    let stampTitle =
      e.target.parentElement.parentElement.parentElement.firstElementChild
        .innerHTML;
    console.log(stampTitle);

    localArray.forEach((item) => {
      if (item.title == stampTitle) {
        let itemIndex = localArray.indexOf(item);
        localArray.splice(itemIndex, 1);
        localStorage.clear();
        localStorage.setItem(localArray, JSON.stringify(localArray));
        console.log(localArray);
        e.target.parentElement.parentElement.parentElement.style.display =
          "none";
      }
    });
  }
  if (e.target.classList.contains("btn-delete2")) {
    let stamp2Title =
      e.target.parentElement.parentElement.parentElement.lastChild.innerHTML;
    console.log(stamp2Title);

    localArray.forEach((item) => {
      if (item.videoTitle == stamp2Title) {
        let itemIndex = localArray.indexOf(item);
        localArray.splice(itemIndex, 1);
        localStorage.clear();
        localStorage.setItem(localArray, JSON.stringify(localArray));
        console.log(localArray);
        e.target.parentElement.parentElement.parentElement.style.display =
          "none";
      }
    });
  }
});
