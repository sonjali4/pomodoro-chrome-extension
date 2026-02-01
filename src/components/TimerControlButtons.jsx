import { TimerButton } from "./TimerButton";

function TimerControlButtons({ start, pause, reset, timerRunning }) {
    return (
        <div id="timer-control-btn-container">
            {!timerRunning && <TimerButton buttonText="start" className="timer-control-btn start-pause-btn" onClick={start} />}
            {timerRunning && <TimerButton buttonText="pause" className="timer-control-btn start-pause-btn" onClick={pause} />}
            <TimerButton buttonText="reset" className="timer-control-btn" id="reset-btn" onClick={reset} />
        </div>
    );
}

export { TimerControlButtons }