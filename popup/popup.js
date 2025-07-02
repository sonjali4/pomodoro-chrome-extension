let timesArray = [25, 5, 15];
let currentIndex = 0;
let displayIndex = 0;
// let intervalID;

function changeDisplay(index) {
    displayIndex = index;

    // update display
    updateTimeDisplay();
}

function startPauseTimer() {
    chrome.alarms.get('timer', function(alarm) {
        if (alarm) {
            // clearInterval(intervalID);
            pauseTimer();
        } else {
            // intervalID = setInterval(updateTimeDisplay, 1000);
            startTimer();
        }
    });
}

function startTimer() {
    chrome.storage.local.get(['remainingSeconds'], function(result) {  // check for existing timer
        const totalSeconds = result.remainingSeconds;
        let minutes = 0;

        if (totalSeconds && totalSeconds > 0) {  // use existing time remaining
            minutes = totalSeconds / 60;
        } else {  // use default time
            minutes = timesArray[currentIndex];
        }

        // create alarm
        chrome.alarms.create('timer', { delayInMinutes: minutes });
        
        chrome.action.setBadgeText({ text: 'ON' });
        chrome.storage.local.set({ minutes: minutes });
        chrome.storage.local.set({ activeTimerIndex: currentIndex });

        // update display
        document.getElementById("start-btn").innerText = "Pause";
        chrome.storage.local.remove('remainingSeconds');
    });
}

async function pauseTimer() {
    // save current alarm info
    const totalSeconds = await getRemainingTime();
    chrome.storage.local.set({ remainingSeconds : totalSeconds });

    // clear alarm
    chrome.alarms.clear('timer');

    // update display
    chrome.action.setBadgeText({ text: '' });
    document.getElementById("start-btn").innerText = "Start";
    updateTimeDisplay();
}

function resetTimer() {
    chrome.action.setBadgeText({ text: '' });
    chrome.alarms.clearAll();

    chrome.storage.local.remove('remainingSeconds');

    // update display
    document.getElementById("start-btn").innerText = "Start";
    updateTimeDisplay();
}

async function updateTimeDisplay() {
    const displayText = document.getElementById("time");

    // calculate values
    const totalSeconds = await getRemainingTime();

    const remainingMinutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;

    // update text
    displayText.innerText = remainingMinutes + ":" + remainingSeconds;
}

async function getRemainingTime() {
    const result = await chrome.storage.local.get(['remainingSeconds']);  // check for paused time
    const active = await chrome.storage.local.get(['activeTimerIndex']);
    const activeIndex = active.activeTimerIndex;

    return new Promise((resolve) => {
        chrome.alarms.get('timer', function(alarm) { 
            if (alarm && activeIndex == displayIndex) {  // current alarm time
                const now = Date.now();
                const remainingTimeMilliseconds = alarm.scheduledTime - now;
                const totalSeconds = Math.max(0, Math.floor(remainingTimeMilliseconds / 1000));

                resolve(totalSeconds);
            } else if (result.remainingSeconds != undefined && activeIndex == displayIndex) {  // existing paused time
                resolve(result.remainingSeconds);
            } else {  // default time
                resolve(timesArray[displayIndex] * 60);
            }
        });
    });
}

document.getElementById("start-btn").addEventListener('click', startPauseTimer);
document.getElementById("reset-btn").addEventListener('click', resetTimer);

document.getElementById("study-time-btn").addEventListener('click', () => changeDisplay(0));
document.getElementById("short-break-btn").addEventListener('click', () => changeDisplay(1));
document.getElementById("long-break-btn").addEventListener('click', () => changeDisplay(2));

window.onload = updateTimeDisplay();
setInterval(updateTimeDisplay, 1000);