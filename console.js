



// test
// before recording starts
// paste code below into console on teams meeting to display recording start / end, and video number.


let videoNum = 0

let seconds = 0;

let minutes = 0;

let hours = 0;

let hoursTwo = 0;

let compareCounterWithTitle = hoursTwo + ":" + hours + ":" + minutes + seconds;

let interval;




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
    console.clear()
    console.log('This is video number: ', videoNum)
    console.log(compareCounterWithTitle)
   
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
  hoursTwo = 0;
  
}


const observer2 = new MutationObserver(function(mutations_list) {
	mutations_list.forEach(function(mutation) {
		mutation.addedNodes.forEach(function(added_node) {
			if(added_node.id == 'recording-indicator-custom') {
                resetCounter()
                startCounter();
                videoNum = videoNum + 1
				console.log('Recording started at ',compareCounterWithTitle);
                console.log(compareCounterWithTitle)
				observer2.disconnect();
			}
		});
	});
});

observer2.observe(document.querySelector(".ms-FocusZone"), { subtree: false, childList: true });


const observer = new MutationObserver(function(mutations_list) {
	mutations_list.forEach(function(mutation) {
		mutation.removedNodes.forEach(function(removed_node) {
			if(removed_node.id == 'recording-indicator-custom') {
                stopCounter()
                
             
				console.log('Recording ended at ',compareCounterWithTitle);
				observer.disconnect();
			}
		});
	});
});

observer.observe(document.querySelector(".ms-FocusZone"), { subtree: false, childList: true });
