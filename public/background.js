// let modes = {
//     pomodoro: 25 * 60,
//     shortBreak: 5 * 60,
//     longBreak: 15 * 60
// };

let modes = {  // test values
    pomodoro: 2,
    shortBreak: 3,
    longBreak: 4
};

let currentMode = 'pomodoro';
let interval = null;
let remainingTime = modes[currentMode];
let timerRunning = false;

const maxPomodoros = 4;
let pomodoroCounter = 0;


// timer functions
function startTimer() {
    if (interval != null) return;

    timerRunning = true;
    updateTimeDisplay();

    interval = setInterval(() => {
        if (remainingTime <= 0) {
            clearInterval(interval);
            interval = null;
            startNextTimer();
            return;
        }

        remainingTime--;
        updateTimeDisplay();
    }, 1000);
}

function pauseTimer() {
    timerRunning = false;
    clearInterval(interval);
    interval = null;

    updateTimeDisplay();
}

function resetTimer() {
    timerRunning = false;
    clearInterval(interval);
    interval = null;

    remainingTime = modes[currentMode];
    pomodoroCounter = 0;

    updateTimeDisplay();
}

function startNextTimer() {
    if (currentMode == 'pomodoro') {
        if (pomodoroCounter == 3) {
            currentMode = 'longBreak';
            pomodoroCounter = 0;
        } else {
            currentMode = 'shortBreak';
            pomodoroCounter++;
        }
    } else {
        currentMode = 'pomodoro';
    }

    remainingTime = modes[currentMode];
    startTimer();
}

function updateTimeDisplay() {
    chrome.runtime.sendMessage({action: "update-time-display", 
        state: {modes, currentMode, remainingTime, timerRunning}}, 
        () => {
            if (chrome.runtime.lastError) {
                return;
            }
    });
}


// listener
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.action) {
        case "start":
            startTimer();
            break;
        case "pause":
            pauseTimer();
            break;
        case "reset":
            resetTimer();
            break;
        case "get-state":
            sendResponse({modes, currentMode, remainingTime, timerRunning});
            return true;
        default:
            break;
    }
})