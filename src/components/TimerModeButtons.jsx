import { TimerButton } from './TimerButton';
import { TimeEditButton } from './TimeEditButton';

function TimerModeButtons({ modes, currentMode }) {
    const changeMode = (newMode) => {
        chrome.runtime.sendMessage({action: 'change-mode', newMode: newMode});
    }

    return (
        <div id="timer-btns-container">
            <TimerButton
                buttonText="pomodoro"
                className={currentMode === 'pomodoro' ? 'active-timer' : 'timer-mode-btn'}
                onClick={() => changeMode('pomodoro')}
            />
            <TimerButton
                buttonText="short break"
                className={currentMode === 'shortBreak' ? 'active-timer' : 'timer-mode-btn'}
                onClick={() => changeMode('shortBreak')}
            />
            <TimerButton
                buttonText="long break"
                className={currentMode === 'longBreak' ? 'active-timer' : 'timer-mode-btn'}
                onClick={() => changeMode('longBreak')}
            />
            
            <TimeEditButton modes={modes} />
        </div>
    );
}

export { TimerModeButtons };