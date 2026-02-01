import { TimerButton } from './TimerButton';
import { TimeEditButton } from './TimeEditButton';

function TimerModeButtons({ modes, currentMode }) {
    const changeMode = (newMode) => {
        chrome.runtime.sendMessage({action: 'change-mode', newMode: newMode});
    }

    return (
        <div id="timer-mode-btns-container">
            <TimerButton
                buttonText="pomodoro"
                buttonId="pomodoro-mode-btn"
                className={ `timer-mode-btn ${currentMode === 'pomodoro' ? 'active-timer-btn' : ''}` }
                onClick={() => changeMode('pomodoro')}
            />
            <TimerButton
                buttonText="short break"
                buttonId="short-break-mode-btn"
                className={ `timer-mode-btn ${currentMode === 'shortBreak' ? 'active-timer-btn' : ''}` }
                onClick={() => changeMode('shortBreak')}
            />
            <TimerButton
                buttonText="long break"
                buttonId="long-break-mode-btn"
                className={ `timer-mode-btn ${currentMode === 'longBreak' ? 'active-timer-btn' : ''}` }
                onClick={() => changeMode('longBreak')}
            />
            
            <TimeEditButton modes={modes} />
        </div>
    );
}

export { TimerModeButtons };