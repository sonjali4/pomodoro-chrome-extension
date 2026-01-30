function TimeEditForm({ onClose }) {
    return (
        <div id="timer-edit-container">
            <form id="timer-edit-form">
                <label htmlFor="pomodoro-time">pomodoro</label>
                <input type="number" name="pomodoro" value="25" />
                <br />

                <label htmlFor="short-break-time">short break</label>
                <input type="number" name="short-break-time" value="25" />
                <br />

                <label htmlFor="long-break-time">long break</label>
                <input type="number" name="long-break-time" value="25" />
                <br />

                <input type="submit" value="save" />
                <input type="reset" value="reset" />
                <input type="button" id="edit-close-btn" value="close" onClick={onClose} />
            </form>
        </div>
    );
}

export { TimeEditForm }