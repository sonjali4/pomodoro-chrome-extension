const studyTimeBtn = document.getElementById("study-time-btn");
const shortBreakBtn = document.getElementById("short-break-btn");
const longBreakBtn = document.getElementById("long-break-btn");

const startPauseBtn = document.getElementById('start-pause-btn');
const resetBtn = document.getElementById('reset-btn');

const timeDisplay = document.getElementById('time-display');

// functions
function setTimeDisplay(secondsRemaining) {
    let minutes = Math.floor(secondsRemaining / 60);
    let seconds = secondsRemaining % 60;

    let timeString = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    timeDisplay.innerText = timeString;
}

function changeDisplay(index) {
    chrome.runtime.sendMessage({action: "change-display", index: index});
}

// listener
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.action) {
        case "update-time-display":
            setTimeDisplay(message.time);
            break;
        default:
            break;
    }
});

// set btn functions
studyTimeBtn.addEventListener('click', () => changeDisplay(0));
shortBreakBtn.addEventListener('click', () => changeDisplay(1));
longBreakBtn.addEventListener('click', () => changeDisplay(2));

startPauseBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({action: "start-pause"});
});
resetBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({action: "reset"});
});