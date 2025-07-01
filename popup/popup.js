let timesArray = [25, 5, 15];
let currentIndex = 0;

function startTimer() {
    const minutes = timesArray[currentIndex];
    chrome.action.setBadgeText({ text: 'ON' });
    chrome.alarms.create('timer', { delayInMinutes: minutes });  // NOTE: 'timer' is the name of the alarm
    chrome.storage.sync.set({ minutes: minutes });
}

function resetTimer() {
    chrome.action.setBadgeText({ text: '' });
    chrome.alarms.clearAll();
    document.getElementById("time").innerText = timesArray[currentIndex] + ":00";
}

async function pauseTimer() {
    // save current alarm info
    const totalSeconds = await getRemainingTime();
    

    // clear alarm

}

async function updateTimeDisplay() {
    const totalSeconds = await getRemainingTime();
    const displayText = document.getElementById("time");

    const remainingMinutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;

    displayText.innerText = remainingMinutes + ":" + remainingSeconds;
}

function getRemainingTime() {
    return new Promise((resolve) => {
        chrome.alarms.get('timer', function(alarm) { 
            if (alarm) {
                const now = Date.now();
                const remainingTimeMilliseconds = alarm.scheduledTime - now;
                const totalSeconds = Math.max(0, Math.floor(remainingTimeMilliseconds / 1000));

                resolve(totalSeconds);
            } else { 
                resolve(timesArray[currentIndex] * 60);
            }
        });
    });
}

document.getElementById("start-btn").addEventListener('click', startTimer);
document.getElementById("reset-btn").addEventListener('click', resetTimer);

window.onload = updateTimeDisplay();
setInterval(updateTimeDisplay, 1000);