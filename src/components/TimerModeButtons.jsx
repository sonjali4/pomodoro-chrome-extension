import { TimerButton } from './TimerButton';
import { TimeEditButton } from './TimeEditButton';

function TimerModeButtons({ modes }) {
    return (
        <div id="timer-btns-container">
            <TimerButton buttonText="pomodoro" className="timer-btn" />
            <TimerButton buttonText="short break" className="timer-btn" />
            <TimerButton buttonText="long break" className="timer-btn" />
            
            <TimeEditButton modes={modes} />
        </div>
    );
}

export { TimerModeButtons };