import { useState } from "react";

function TimeEditForm({ modes, onClose }) {
    const [times, setTimes] = useState(modes);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTimes(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const onSubmit = (e) => {
        e.preventDefault();

        chrome.runtime.sendMessage({ action: 'update-times', times: times });

        onClose();
    }

    return (
        <div id="timer-edit-container">
            <h1 id="edit-form-heading">Edit</h1>

            <form id="timer-edit-form" onSubmit={onSubmit}>
                <div className="edit-form-line-container">
                    <label htmlFor="pomodoro-time">pomodoro</label>
                    <div className="edit-form-input-container">
                        <input type="number" name="pomodoro" value={times.pomodoro} onChange={handleChange} />
                        <p>min</p>
                    </div>
                </div>

                <div className="edit-form-line-container">
                    <label htmlFor="short-break-time">short break</label>
                    <div className="edit-form-input-container">
                        <input type="number" name="shortBreak" value={times.shortBreak} onChange={handleChange} />
                        <p>min</p>
                    </div>
                </div>

                <div className="edit-form-line-container">
                    <label htmlFor="long-break-time">long break</label>
                    <div className="edit-form-input-container">
                        <input type="number" name="longBreak" value={times.longBreak} onChange={handleChange} />
                        <p>min</p>
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