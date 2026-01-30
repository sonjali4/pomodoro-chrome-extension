import { TimerButton } from './TimerButton';

function TimerModeButtons() {
    return (
        <div id="timer-btns-container">
            <TimerButton buttonText="pomodoro" className="timer-btn" />
            <TimerButton buttonText="short break" className="timer-btn" />
            <TimerButton buttonText="long break" className="timer-btn" />
            <TimerButton buttonText="edit" className="timer-btn" />
        </div>
    );
}

export { TimerModeButtons };