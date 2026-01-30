import { TimerButton } from "./TimerButton";

function TimerControlButtons({ start, pause, reset, timerRunning }) {
    return (
        <div id="timer-control-btn-container">
            {!timerRunning && <TimerButton buttonText="start" onClick={start} />}
            {timerRunning && <TimerButton buttonText="pause" onClick={pause} />}
            <TimerButton buttonText="reset" onClick={reset} />
        </div>
    );
}

export { TimerControlButtons }