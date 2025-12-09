const defaultTimes = [25, 5, 15];
let timesArray = [2, 3, 4];  // test array
let currentIndex = 0;
let displayIndex = 0;

const maxPomodoros = 4;
let pomodoroCounter = 0;

let interval;
let currentTime = timesArray[currentIndex];


// basic timer functions
function startTimer() {
    updateTimeDisplay(displayIndex);

    interval = setInterval(() => {
        if (currentTime <= 0) {
            startNextTimer();
            return;
        }

        currentTime--;
        updateTimeDisplay(displayIndex);
    }, 1000);
}

function pauseTimer() {
    clearInterval(interval);
    interval = null;
}

function resetTimer() {
    clearInterval(interval);
    interval = null;
    currentTime = timesArray[getCurrentIndex()];
    updateTimeDisplay(displayIndex);
}


// timer control functions
function startNextTimer() {
    resetTimer();
    setNextIndex();
    changeDisplay(currentIndex);
    startTimer();
}

function setNextIndex() {
    if (getCurrentIndex() == 0) {
        pomodoroCounter++;
        if (pomodoroCounter == maxPomodoros) {
            currentIndex = 2
            pomodoroCounter = 0;
        } else {
            currentIndex = 1
        }
    } else {
        currentIndex = 0;
    }

    currentTime = timesArray[getCurrentIndex()];
}

function getCurrentIndex() {
    return currentIndex;
}

function startPause() {
    if (interval) {
        pauseTimer();
    } else {
        startTimer();
    }

    updateStartPauseBtn();
}

function updateTimeDisplay(index) {
    let time;
    if (index == currentIndex) {
        time = currentTime;
    } else {
        time = timesArray[index];
    }

    chrome.runtime.sendMessage({action: "update-time-display", time: time}, () => {
        if (chrome.runtime.lastError) {
            return;
        }
    });
}

function changeDisplay(index) {
    displayIndex = index;
    updateTimeDisplay(displayIndex);
}

function updateStartPauseBtn() {
    let state;

    if (interval) {
        state = "pause";
    } else {
        state = "start"
    }

    chrome.runtime.sendMessage({action: "update-start-pause-btn", state: state});
}

function setTimeValues(newPomodoroTime, newShortBreakTime, newLongBreakTime) {
    timesArray = [newPomodoroTime, newShortBreakTime, newLongBreakTime];
    resetTimer();
}


// listener
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.action) {
        case "set-display-onload":
            changeDisplay(currentIndex);
            updateStartPauseBtn();
            break;
        case "edit-time-values":
            setTimeValues(
                message.newPomodoroTime, 
                message.newShortBreakTime, 
                message.newLongBreakTime
            );
            break;
        case "start-pause":
            startPause();
            break;
        case "reset":
            resetTimer();
            break;
        case "change-display":
            changeDisplay(message.index);
            break;
        default:
            break;
    }
})