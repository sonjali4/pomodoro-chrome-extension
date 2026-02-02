function ModeInputs({ text, mode, times, onMinutesChange, onSecondsChange }) {
    return (
        <div className="edit-form-line-container">
            <label htmlFor={mode}>{text}</label>

            <div className="edit-form-input-container">
                <input 
                    type="number"
                    value={times.minutes} 
                    onChange={onMinutesChange} 
                />
                <p>min</p>
            </div>

            <div className="edit-form-input-container">
                <input
                    type="number"
                    value={times.seconds}
                    onChange={onSecondsChange}
                />
                <p>sec</p>
            </div>
        </div>
    );
}

export { ModeInputs }