const studyTimeBtn = document.getElementById('study-time-btn');
const shortBreakBtn = document.getElementById('short-break-btn');
const longBreakBtn = document.getElementById('long-break-btn');

const editBtn = document.getElementById('edit-btn');
const editContainer = document.getElementById('timer-edit-container');
const editForm = document.getElementById('timer-edit-form');

const startPauseBtn = document.getElementById('start-pause-btn');
const resetBtn = document.getElementById('reset-btn');

const timerContainer = document.getElementById('timer-container');
const timeDisplay = document.getElementById('timer-display');

const timeMinute1 = document.getElementById('timer-number-minute-1')
const timeMinute2 = document.getElementById('timer-number-minute-2')
const timeSecond1 = document.getElementById('timer-number-second-1')
const timeSecond2 = document.getElementById('timer-number-second-2')


// functions
function setTimeDisplay(secondsRemaining) {
    let minutes = Math.floor(secondsRemaining / 60);
    let seconds = secondsRemaining % 60;

    // let timeString = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    // timeDisplay.innerText = timeString;

    let minuteString = `${minutes.toString().padStart(2, "0")}`;
    let minuteImg1 = '../images/images-numbers/time-' + minuteString.charAt(0) + '.png';
    let minuteImg2 = '../images/images-numbers/time-' + minuteString.charAt(1) + '.png';

    let secondString = `${seconds.toString().padStart(2, "0")}`;
    let secondImg1 = '../images/images-numbers/time-' + secondString.charAt(0) + '.png';
    let secondImg2 = '../images/images-numbers/time-' + secondString.charAt(1) + '.png';

    timeMinute1.src = minuteImg1;
    timeMinute2.src = minuteImg2;
    timeSecond1.src = secondImg1;
    timeSecond2.src = secondImg2;
}

function changeDisplay(index) {
    chrome.runtime.sendMessage({action: "change-display", index: index});
}

function updateStartPauseBtn(state) {
    if (state === 'start') {
            startPauseBtn.textContent = 'Start';
        } else {
            startPauseBtn.textContent = 'Pause';
        }
}


// listener
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.action) {
        case "update-time-display":
            setTimeDisplay(message.time);
            break;
        case "update-start-pause-btn":
            updateStartPauseBtn(message.state);
            break;
        default:
            break;
    }
});


// set btn functions
studyTimeBtn.addEventListener('click', () => changeDisplay(0));
shortBreakBtn.addEventListener('click', () => changeDisplay(1));
longBreakBtn.addEventListener('click', () => changeDisplay(2));

editBtn.addEventListener('click', () => {
    editContainer.style.display = 'block';
    timeDisplay.style.display = 'none';
})

editForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(editForm);

    const newPomodoroTime = parseInt(formData.get('pomodoro-time'));
    const newShortBreakTime = parseInt(formData.get('short-break-time'));
    const newLongBreakTime = parseInt(formData.get('long-break-time'));

    chrome.runtime.sendMessage({action: "edit-time-values", 
        newPomodoroTime: newPomodoroTime, 
        newShortBreakTime: newShortBreakTime, 
        newLongBreakTime: newLongBreakTime
    })

    editContainer.style.display = 'none';
    timeDisplay.style.display = 'block';
});

startPauseBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({action: "start-pause"});
});
resetBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({action: "reset"});
});


// onload
window.onload = () => {
    chrome.runtime.sendMessage({action: "set-display-onload"});
}