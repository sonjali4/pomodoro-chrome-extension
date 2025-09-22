// let timesArray = [25, 5, 15];
let timesArray = [10, 20, 30];  // test array
let currentIndex = 0;
// let displayIndex = 0;

let interval;
let currentTime = timesArray[currentIndex];

// basic timer functions
function startTimer() {
    updateTimeDisplay()

    interval = setInterval(() => {
        if (currentTime <= 0) {
            startNextTimer();
            return;
        }

        currentTime--;
        updateTimeDisplay();
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
    updateTimeDisplay();
}

// timer control functions
function startNextTimer() {
    resetTimer();
    setNextIndex();
    startTimer();
}

function setNextIndex() {
    currentIndex = (getCurrentIndex() + 1) % timesArray.length;
    currentTime = timesArray[currentIndex];
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
}

function updateTimeDisplay() {
    chrome.runtime.sendMessage({action: "update-time-display", time: currentTime}, () => {
        if (chrome.runtime.lastError) {
            return;
        }
    });
}

// listeners
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "start-pause") {
        startPause();
    } else if (message.action === "reset") {
        resetTimer();
    }
})