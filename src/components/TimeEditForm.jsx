import { useState } from "react";

import { ModeInputs } from './ModeInputs.jsx';

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
        if (minutes.length > 2) return;

        setTimes(prev => ({
            ...prev,
            [mode]: {
                ...prev[mode],
                minutes: minutes
            }
        }));
    }

    const handleSecondsChange = (mode, seconds) => {
        if (seconds.length > 2) return;

        setTimes(prev => ({
            ...prev,
            [mode]: {
                ...prev[mode],
                seconds: seconds
            }
        }));
    }

    const setDefault = () => {
        setTimes({
            pomodoro: {
                minutes: 25,
                seconds: 0
            },
            shortBreak: {
                minutes: 5,
                seconds: 0
            },
            longBreak: {
                minutes: 15,
                seconds: 0
            },
        });
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
                <ModeInputs 
                    text="pomodoro"
                    mode="pomodoro"
                    times={times.pomodoro}
                    onMinutesChange={(e) => handleMinutesChange('pomodoro', e.target.value)}
                    onSecondsChange={(e) => handleSecondsChange('pomodoro', e.target.value)}
                />

                <ModeInputs 
                    text="short break"
                    mode="shortBreak"
                    times={times.shortBreak}
                    onMinutesChange={(e) => handleMinutesChange('shortBreak', e.target.value)}
                    onSecondsChange={(e) => handleSecondsChange('shortBreak', e.target.value)}
                />

                <ModeInputs 
                    text="long break"
                    mode="longBreak"
                    times={times.longBreak}
                    onMinutesChange={(e) => handleMinutesChange('longBreak', e.target.value)}
                    onSecondsChange={(e) => handleSecondsChange('longBreak', e.target.value)}
                />

                <input type="submit" value="save" />
                <input type="button" id="default-btn" value="default" onClick={setDefault} />
                <input type="button" id="edit-close-btn" value="close" onClick={onClose} />
            </form>
        </div>
    );
}

export { TimeEditForm }