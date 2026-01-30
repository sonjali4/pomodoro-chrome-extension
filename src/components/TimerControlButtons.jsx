import { TimerButton } from "./TimerButton";

function TimerControlButtons() {
    return (
        <div id="timer-control-btn-container">
            <TimerButton buttonText="start" />
            <TimerButton buttonText="pause" />
            <TimerButton buttonText="reset" />
        </div>
    );
}

export { TimerControlButtons }