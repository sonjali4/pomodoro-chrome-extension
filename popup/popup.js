import { 
    changeDisplay, 
    startTimer, 
    pauseTimer, 
    resetTimer, 
    updateTimeDisplay 
} from '../timer-utils.js';

function startPauseTimer() {
    chrome.alarms.get('timer', function(alarm) {
        if (alarm) {
            pauseTimer();
        } else {
            startTimer();
        }
    });
}

async function setUpDisplay() {
    chrome.storage.local.set({ displayIndex: 0 });

    await updateTimeDisplay();
    setInterval(updateTimeDisplay, 1000);

    updateStartPauseBtn();
}

async function updateStartPauseBtn() {
    chrome.alarms.get('timer', function(alarm) {
        if (alarm) {
            document.getElementById("start-btn").innerText = "Pause";
        } else {
            document.getElementById("start-btn").innerText = "Start";
        }
    });
}

// set button functions
document.getElementById("start-btn").addEventListener('click', startPauseTimer);
document.getElementById("reset-btn").addEventListener('click', resetTimer);

document.getElementById("study-time-btn").addEventListener('click', () => changeDisplay(0));
document.getElementById("short-break-btn").addEventListener('click', () => changeDisplay(1));
document.getElementById("long-break-btn").addEventListener('click', () => changeDisplay(2));

// continuously update timer display
window.onload = setUpDisplay();

// update UI if display index changed
chrome.storage.onChanged.addListener((changes, area) => {
    if (area == 'local' && changes.nextDisplayIndex) {
        const index = changes.nextDisplayIndex.newValue;
        changeDisplay(index);
    } else if (area == 'local' && changes.timerStatus) {
        updateStartPauseBtn();
    }
});