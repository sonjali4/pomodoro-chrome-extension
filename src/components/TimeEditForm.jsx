import { useState } from "react";

function TimeEditForm({ modes, onClose }) {
    const [times, setTimes] = useState(() =>
        Object.fromEntries(
            Object.entries(modes).map(([mode, totalSeconds]) => [
                mode, {
                    minutes: Math.floor(totalSeconds / 60),
                    seconds: totalSeconds % 60
                }
            ])
        )
    );

    const handleMinutesChange = (mode, minutes) => {
        setTimes(prev => ({
            ...prev,
            [mode]: {
                ...prev[mode],
                minutes: minutes
            }
        }));
    }

    const handleSecondsChange = (mode, seconds) => {
        setTimes(prev => ({
            ...prev,
            [mode]: {
                ...prev[mode],
                seconds: seconds
            }
        }));
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const updatedTimes = Object.fromEntries(
            Object.entries(times).map(([mode, {minutes, seconds}]) => [
                mode,
                Number(minutes) * 60 + Number(seconds)
            ])
        );

        chrome.runtime.sendMessage({ action: 'update-times', times: updatedTimes });

        onClose();
    }

    return (
        <div id="timer-edit-container">
            <h1 id="edit-form-heading">Edit</h1>

            <form id="timer-edit-form" onSubmit={onSubmit}>
                <div className="edit-form-line-container">
                    <label htmlFor="pomodoro-time">pomodoro</label>
                    <div className="edit-form-input-container">
                        <input 
                            type="number"
                            value={times.pomodoro.minutes} 
                            onChange={(e) => handleMinutesChange('pomodoro', e.target.value)} 
                        />
                        <p>min</p>
                    </div>
                    <div className="edit-form-input-container">
                        <input
                            type="number"
                            value={times.pomodoro.seconds}
                            onChange={(e) => {
                                handleSecondsChange('pomodoro', e.target.value);
                            }}
                        />
                        <p>sec</p>
                    </div>
                </div>

                <div className="edit-form-line-container">
                    <label htmlFor="short-break-time">short break</label>
                    <div className="edit-form-input-container">
                        <div className="edit-form-input-container">
                        <input 
                            type="number"
                            value={times.shortBreak.minutes} 
                            onChange={(e) => handleMinutesChange('shortBreak', e.target.value)} 
                        />
                        <p>min</p>
                    </div>
                    <div className="edit-form-input-container">
                        <input
                            type="number"
                            value={times.shortBreak.seconds}
                            onChange={(e) => {
                                handleSecondsChange('shortBreak', e.target.value);
                            }}
                        />
                        <p>sec</p>
                    </div>
                    </div>
                </div>

                <div className="edit-form-line-container">
                    <label htmlFor="long-break-time">long break</label>
                    <div className="edit-form-input-container">
                        <input 
                            type="number"
                            value={times.longBreak.minutes} 
                            onChange={(e) => handleMinutesChange('longBreak', e.target.value)} 
                        />
                        <p>min</p>
                    </div>
                    <div className="edit-form-input-container">
                        <input
                            type="number"
                            value={times.longBreak.seconds}
                            onChange={(e) => {
                                handleSecondsChange('longBreak', e.target.value);
                            }}
                        />
                        <p>sec</p>
                    </div>
                </div>

                <input type="submit" value="save" />
                <input type="reset" value="reset" />
                <input type="button" id="edit-close-btn" value="close" onClick={onClose} />
            </form>
        </div>
    );
}

export { TimeEditForm }