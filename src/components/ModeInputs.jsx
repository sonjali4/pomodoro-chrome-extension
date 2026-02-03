function ModeInputs({ containerId, text, mode, times, onMinutesChange, onSecondsChange }) {
    return (
        <div className="edit-form-line-container" id={containerId}>
            <label htmlFor={mode}>{text}</label>

            <div className="edit-form-input-container">
                <input 
                    type="number"
                    min="0"
                    max="99"
                    value={times.minutes}
                    onChange={onMinutesChange}
                />
                <p>min</p>
            </div>

            <div className="edit-form-input-container">
                <input
                    type="number"
                    min="0"
                    max="59"
                    value={times.seconds}
                    onChange={onSecondsChange}
                />
                <p>sec</p>
            </div>
        </div>
    );
}

export { ModeInputs }