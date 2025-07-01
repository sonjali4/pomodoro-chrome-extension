let timesArray = [25, 5, 15];
let currentIndex = 0;

function startPauseTimer() {
    chrome.alarms.get('timer', function(alarm) {
        if (alarm) {
            pauseTimer();
        } else {
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
        chrome.alarms.create('timer', { delayInMinutes: minutes });  // NOTE: 'timer' is the name of the alarm, maybe change name later ?
        
        chrome.action.setBadgeText({ text: 'ON' });
        chrome.storage.local.set({ minutes: minutes });

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
    document.getElementById("start-btn").innerText = "Start";
    updateTimeDisplay();
}

function resetTimer() {
    chrome.action.setBadgeText({ text: '' });
    chrome.alarms.clearAll();

    chrome.storage.local.remove('remainingSeconds');

    // update display
    document.getElementById("start-btn").innerText = "Pause";
    updateTimeDisplay();
}

async function updateTimeDisplay() {
    // calculate values
    const displayText = document.getElementById("time");
    const totalSeconds = await getRemainingTime();

    const remainingMinutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;

    // update text
    displayText.innerText = remainingMinutes + ":" + remainingSeconds;
}

async function getRemainingTime() {
    const result = await chrome.storage.local.get(['remainingSeconds']);  // check for paused time

    return new Promise((resolve) => {
        chrome.alarms.get('timer', function(alarm) { 
            if (alarm) {  // current alarm time
                const now = Date.now();
                const remainingTimeMilliseconds = alarm.scheduledTime - now;
                const totalSeconds = Math.max(0, Math.floor(remainingTimeMilliseconds / 1000));

                resolve(totalSeconds);
            } else if (result.remainingSeconds != undefined) {  // existing paused time
                resolve(result.remainingSeconds);
            } else {  // default time
                resolve(timesArray[currentIndex] * 60);
            }
        });
    });
}

document.getElementById("start-btn").addEventListener('click', startPauseTimer);
document.getElementById("reset-btn").addEventListener('click', resetTimer);

window.onload = updateTimeDisplay();
setInterval(updateTimeDisplay, 1000);