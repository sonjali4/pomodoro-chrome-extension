const startPauseBtn = document.getElementById('start-pause-btn');
const resetBtn = document.getElementById('reset-btn');

const timeDisplay = document.getElementById('time-display');

startPauseBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({action: "start-pause"});
});
resetBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({action: "reset"});
});

function setTimeDisplay(secondsRemaining) {
    let minutes = Math.floor(secondsRemaining / 60);
    let seconds = secondsRemaining % 60;

    let timeString = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    timeDisplay.innerText = timeString;
}

document.getElementById("study-time-btn").addEventListener('click', () => changeDisplay(0));
document.getElementById("short-break-btn").addEventListener('click', () => changeDisplay(1));
document.getElementById("long-break-btn").addEventListener('click', () => changeDisplay(2));

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "update-time-display") {
        setTimeDisplay(message.time);
    }
});