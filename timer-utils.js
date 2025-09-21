// let timesArray = [25, 5, 15];
let timesArray = [1, 2, 3];  // test array
let currentIndex = 0;
// let displayIndex = 0;


export function changeDisplay(index) {  // maybe move this function to popup.js ?
    // displayIndex = index;
    chrome.storage.local.set({ displayIndex: index });

    // update display
    updateTimeDisplay();
}

export function startTimer() {
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
        
        // update chrome storage
        chrome.storage.local.set({ activeTimerIndex: currentIndex });
        chrome.storage.local.set({ timerStatus: 'ON' }); // <-- new
        chrome.storage.local.remove('remainingSeconds');

        // update UI
        chrome.action.setBadgeText({ text: 'ON' });
        // document.getElementById("start-btn").innerText = "Pause";
    });
}

export async function pauseTimer() {
    // save current alarm info
    const totalSeconds = await getRemainingTime();
    chrome.storage.local.set({ remainingSeconds : totalSeconds });

    // clear alarm
    chrome.alarms.clear('timer');

    // update display
    chrome.action.setBadgeText({ text: '' });
    chrome.storage.local.set({ timerStatus: 'OFF' }); // <-- new
    // document.getElementById("start-btn").innerText = "Start";
    updateTimeDisplay();
}

export function resetTimer() {
    chrome.action.setBadgeText({ text: '' });
    chrome.alarms.clearAll();

    chrome.storage.local.remove('remainingSeconds');

    // update display
    chrome.storage.local.set({ timerStatus: 'OFF' }); // <-- new
    // document.getElementById("start-btn").innerText = "Start";
    updateTimeDisplay();
}

export function startNextTimer() {
    resetTimer();
    setNextIndex();
    startTimer();
    updateTimeDisplay();
}

function setNextIndex() {
    currentIndex = (getCurrentIndex() + 1) % timesArray.length;
    // displayIndex = currentIndex;
    chrome.storage.local.set({ displayIndex: currentIndex });
}

function getCurrentIndex() {
    return currentIndex;
}

export async function updateTimeDisplay() {
    const displayText = document.getElementById("time");

    const display = await chrome.storage.local.get(['displayIndex']); // <--- new
    const displayIndex = display.displayIndex; // <--- new

    const active = await chrome.storage.local.get(['activeTimerIndex']);
    const activeIndex = active.activeTimerIndex;

    let totalSeconds, remainingMinutes, remainingSeconds;

    if (activeIndex == displayIndex) {
        totalSeconds = await getRemainingTime();
    } else {  // use default time
        totalSeconds = timesArray[displayIndex] * 60
    }

    remainingMinutes = Math.floor(totalSeconds / 60);
    remainingSeconds = totalSeconds % 60;

    displayText.innerText = remainingMinutes + ":" + remainingSeconds;
}

export async function getRemainingTime() {
    const result = await chrome.storage.local.get(['remainingSeconds']);  // check for paused time

    const display = await chrome.storage.local.get(['displayIndex']); // <--- new
    const displayIndex = display.displayIndex; // <--- new

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
                resolve(timesArray[displayIndex] * 60);
            }
        });
    });
}

// start next timer when current timer runs out
chrome.runtime.onMessage.addListener((message) => {
    if (message == 'startNextTimer') {
        startNextTimer();
    }
});