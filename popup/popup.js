let timesArray = [25, 5, 15];
let currentIndex = 0;

function startTimer() {
    const minutes = timesArray[currentIndex];
    chrome.action.setBadgeText({ text: 'ON' });
    chrome.alarms.create('timer', { delayInMinutes: minutes });
    chrome.storage.sync.set({ minutes: minutes });
}

function resetTimer() {
    chrome.action.setBadgeText({ text: '' });
    chrome.alarms.clearAll();
    document.getElementById("time").innerText = timesArray[currentIndex] + ":00";
}

function updateTimeDisplay() {
    chrome.alarms.get('timer', function(alarm) {
        if (alarm) {
            const now = Date.now();
            const remainingTimeMilliseconds = alarm.scheduledTime - now;
            const totalSeconds = Math.max(0, Math.floor(remainingTimeMilliseconds / 1000));

            const remainingMinutes = Math.floor(totalSeconds / 60);
            const remainingSeconds = totalSeconds % 60;
            document.getElementById("time").innerText = remainingMinutes + ":" + remainingSeconds;
        } else {
            document.getElementById("time").innerText = timesArray[currentIndex] + ":00";
        }
    });
}

document.getElementById("start-btn").addEventListener('click', startTimer);
document.getElementById("reset-btn").addEventListener('click', resetTimer);

window.onload = updateTimeDisplay();
setInterval(updateTimeDisplay, 1000);